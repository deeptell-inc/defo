<?php
// app/Filament/Resources/MeetingResource.php

namespace App\Filament\Resources;

use App\Filament\Resources\MeetingResource\Pages;
use App\Models\Meeting;
use App\Models\User;
use App\Models\MeetingDate;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use App\Mail\MeetingDeleted;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Auth;

class MeetingResource extends Resource
{
    protected static ?string $model = Meeting::class;

    protected static ?string $navigationIcon = 'heroicon-o-calendar';
    protected static ?string $navigationGroup = 'Meeting Management';

    public static function shouldRegisterNavigation(): bool
    {
        return !in_array(Auth::user()->type, ['merchant', 'fp']);
    }

    public static function form(Form $form): Form
    {
        $userType = Auth::user()->type;

        $adminFields = [
            Forms\Components\TextInput::make('title')
                ->label('タイトル')
                ->required()
                ->maxLength(255),
            Forms\Components\Textarea::make('description')
                ->label('説明')
                ->maxLength(65535),
            Forms\Components\Select::make('user_id')
                ->label('ユーザー')
                ->relationship(
                    'user',
                    'name',
                    fn (Builder $query) => $query
                        ->where('type', 'user')
                        ->where('status', true)
                )
                ->searchable()
                ->getSearchResultsUsing(
                    fn (string $search) => User::query()
                        ->where('type', 'user')
                        ->where('status', true)
                        ->where(function ($query) use ($search) {
                            $query->where('name', 'like', "%{$search}%")
                                ->orWhere('email', 'like', "%{$search}%");
                        })
                        ->limit(50)
                        ->get()
                        ->mapWithKeys(fn ($user) => [
                            $user->id => "{$user->name} ({$user->email})"
                        ])
                        ->toArray()
                )
                ->getOptionLabelUsing(
                    fn ($value): ?string => User::find($value)?->name . ' (' . User::find($value)?->email . ')'
                )
                ->required()
                ->helperText('名前またはメールで検索')
                ->columnSpanFull(),
            Forms\Components\Select::make('fp_id')
                ->label('ファイナンシャルプランナー')
                ->relationship(
                    'fp',
                    'name',
                    fn (Builder $query) => $query
                        ->where('type', 'fp')
                        ->where('status', true)
                )
                ->searchable()
                ->getSearchResultsUsing(
                    fn (string $search) => User::query()
                        ->where('type', 'fp')
                        ->where('status', true)
                        ->where(function ($query) use ($search) {
                            $query->where('name', 'like', "%{$search}%")
                                ->orWhere('email', 'like', "%{$search}%");
                        })
                        ->limit(50)
                        ->get()
                        ->mapWithKeys(fn ($user) => [
                            $user->id => "{$user->name} ({$user->email})"
                        ])
                        ->toArray()
                )
                ->getOptionLabelUsing(
                    fn ($value): ?string => User::find($value)?->name . ' (' . User::find($value)?->email . ')'
                )
                ->required()
                ->helperText('名前またはメールで検索')
                ->columnSpanFull(),
            Forms\Components\Section::make('ミーティング日程')
                ->schema([
                    Forms\Components\Repeater::make('dates')
                        ->relationship()
                        ->schema([
                            Forms\Components\DateTimePicker::make('proposed_datetime')
                                ->required()
                                ->label('提案日時')
                                ->timezone('Asia/Tokyo')
                                ->displayFormat('Y/m/d H:i')
                                ->columnSpan(1),
                            Forms\Components\Select::make('status')
                                ->label('ステータス')
                                ->options([
                                    MeetingDate::STATUS_PENDING => '保留中',
                                    MeetingDate::STATUS_CONFIRMED => '確定',
                                    MeetingDate::STATUS_CANCELLED => 'キャンセル'
                                ])
                                ->default(MeetingDate::STATUS_PENDING)
                                ->reactive()
                                ->afterStateUpdated(function ($state, callable $set) {
                                    if ($state === MeetingDate::STATUS_CONFIRMED) {
                                        $set('is_selected', true);
                                    } else {
                                        $set('is_selected', false);
                                    }
                                })
                                ->visible(fn () => Auth::user()->type === 'fp')
                                ->columnSpan(1),
                            Forms\Components\Hidden::make('is_selected')
                                ->default(false),
                            Forms\Components\Textarea::make('note')
                                ->label('メモ')
                                ->maxLength(65535)
                                ->columnSpan(1),
                        ])
                        ->defaultItems(1)
                        ->minItems(1)
                        ->columns(2),
                ])
                ->columnSpanFull(),
        ];

        return $form
            ->schema($userType === 'admin' ? $adminFields : []);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('title')
                    ->label('タイトル')
                    ->searchable()
                    ->sortable(),
                Tables\Columns\TextColumn::make('user.name')
                    ->label('ユーザー')
                    ->description(fn (Meeting $record): string => $record->user?->email ?? '')
                    ->searchable(query: function (Builder $query, string $search): Builder {
                        return $query->whereHas('user', function (Builder $query) use ($search) {
                            $query->where('name', 'like', "%{$search}%")
                                ->orWhere('email', 'like', "%{$search}%");
                        });
                    }),
                Tables\Columns\TextColumn::make('fp.name')
                    ->label('ファイナンシャルプランナー')
                    ->description(fn (Meeting $record): string => $record->fp?->email ?? '')
                    ->searchable(query: function (Builder $query, string $search): Builder {
                        return $query->whereHas('fp', function (Builder $query) use ($search) {
                            $query->where('name', 'like', "%{$search}%")
                                ->orWhere('email', 'like', "%{$search}%");
                        });
                    }),
                Tables\Columns\TextColumn::make('status')
                    ->label('日程ステータス')
                    ->badge()
                    ->color(function (string $state) {
                        return match ($state) {
                            'confirmed' => 'success',
                            'pending' => 'warning',
                            'cancelled' => 'danger',
                            default => 'secondary',
                        };
                    })
                    ->getStateUsing(function (Meeting $record) {
                        $confirmedDate = $record->confirmedDate();
                        if ($confirmedDate) {
                            return 'confirmed';
                        }
                        $hasPending = $record->dates()->where('status', MeetingDate::STATUS_PENDING)->exists();
                        if ($hasPending) {
                            return 'pending';
                        }
                        return 'cancelled';
                    })
                    ->formatStateUsing(function (string $state, Meeting $record) {
                        if ($state === 'confirmed') {
                            $confirmedDate = $record->confirmedDate();
                            return '確定: ' . $confirmedDate->proposed_datetime->format('Y/m/d H:i');
                        } elseif ($state === 'pending') {
                            return "保留中";
                        } else {
                            return 'すべてキャンセル';
                        }
                    }),
                Tables\Columns\TextColumn::make('created_at')
                    ->label('作成日')
                    ->dateTime('Y/m/d H:i')
                    ->sortable(),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('meeting_status')
                    ->label('ステータス')
                    ->options([
                        'confirmed' => '確定済み',
                        'pending' => '保留中',
                        'cancelled' => 'すべてキャンセル',
                    ])
                    ->query(function (Builder $query, array $data) {
                        if (!$data['value']) {
                            return $query;
                        }
                        
                        return match ($data['value']) {
                            'confirmed' => $query->whereHas('dates', fn ($q) => 
                                $q->where('status', MeetingDate::STATUS_CONFIRMED)
                                  ->where('is_selected', true)
                            ),
                            'pending' => $query->whereHas('dates', fn ($q) => 
                                $q->where('status', MeetingDate::STATUS_PENDING)
                            ),
                            'cancelled' => $query->whereDoesntHave('dates', fn ($q) => 
                                $q->whereIn('status', [MeetingDate::STATUS_CONFIRMED, MeetingDate::STATUS_PENDING])
                            ),
                            default => $query,
                        };
                    }),
            ])
            ->actions([
                Tables\Actions\EditAction::make()
                    ->label('編集')
                    ->visible(fn (Meeting $record) => 
                        (Auth::user()->type === 'admin') || 
                        (Auth::user()->type === 'fp' && $record->dates()->where('status', MeetingDate::STATUS_PENDING)->exists())
                    ),
                Tables\Actions\DeleteAction::make()
                    ->label('削除')
                    ->visible(fn () => Auth::user()->type === 'admin')
                    ->requiresConfirmation()
                    ->modalHeading('ミーティングの削除')
                    ->modalDescription('このミーティング提案を削除してもよろしいですか？FPに通知メールが送信されます。')
                    ->modalSubmitActionLabel('はい、削除します')
                    ->action(function (Meeting $record) {
                        $fp = $record->fp;
                        
                        DB::beginTransaction();
                        
                        try {
                            $record->forceDelete();
                            DB::commit();

                            if ($fp) {
                                Mail::to($fp->email)->send(new MeetingDeleted($record));
                            }
                        } catch (\Exception $e) {
                            DB::rollBack();
                            throw $e;
                        }
                    }),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make()
                        ->label('一括削除')
                        ->visible(fn () => Auth::user()->type === 'admin')
                        ->modalHeading('複数のミーティングを削除')
                        ->modalDescription('選択したミーティング提案を削除してもよろしいですか？各FPに通知メールが送信されます。')
                        ->modalSubmitActionLabel('はい、すべて削除します')
                        ->action(function (Collection $records) {
                            DB::beginTransaction();
                            
                            try {
                                $records->each(function ($record) {
                                    $fp = $record->fp;
                                    $record->forceDelete();

                                    if ($fp) {
                                        Mail::to($fp->email)->send(new MeetingDeleted($record));
                                    }
                                });

                                DB::commit();
                            } catch (\Exception $e) {
                                DB::rollBack();
                                throw $e;
                            }
                        }),
                ]),
            ]);
    }

    public static function getEloquentQuery(): Builder
    {
        $query = parent::getEloquentQuery()
            ->withoutGlobalScopes([
                SoftDeletingScope::class,
            ]);

        $user = Auth::user();

        return match ($user->type) {
            'admin' => $query->where('admin_id', $user->id),
            'fp' => $query->where('fp_id', $user->id),
            default => $query->whereNull('id'),
        };
    }

    public static function getRelations(): array
    {
        return [];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListMeetings::route('/'),
            'create' => Pages\CreateMeeting::route('/create'),
            'edit' => Pages\EditMeeting::route('/{record}/edit'),
        ];
    }
}
