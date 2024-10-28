<?php

namespace App\Filament\Resources;

use App\Filament\Resources\MeetingResource\Pages;
use App\Models\Meeting;
use App\Models\User;
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
                    ->label('ステータス')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'pending' => 'warning',
                        'confirmed' => 'success',
                        'cancelled' => 'danger',
                    }),
                Tables\Columns\TextColumn::make('created_at')
                    ->label('作成日')
                    ->dateTime('Y/m/d H:i')
                    ->sortable(),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('status')
                    ->label('ステータス')
                    ->options([
                        'pending' => '保留中',
                        'confirmed' => '確認済み',
                        'cancelled' => 'キャンセル済み',
                    ]),
            ])
            ->actions([
                Tables\Actions\EditAction::make()
                    ->label('編集')
                    ->visible(fn (Meeting $record) => 
                        (Auth::user()->type === 'admin') || 
                        (Auth::user()->type === 'fp' && $record->status === 'pending')
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
                        
                        // トランザクション開始
                        DB::beginTransaction();
                        
                        try {
                            // ミーティングを強制削除（ハードデリート）
                            $record->forceDelete();

                            // トランザクションコミット
                            DB::commit();

                            // FPへメール送信
                            if ($fp) {
                                Mail::to($fp->email)->send(new MeetingDeleted($record));
                            }
                        } catch (\Exception $e) {
                            // エラー時はロールバック
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
                            // トランザクション開始
                            DB::beginTransaction();
                            
                            try {
                                $records->each(function ($record) {
                                    $fp = $record->fp;
                                    
                                    // ミーティングを強制削除（ハードデリート）
                                    $record->forceDelete();

                                    // FPへメール送信
                                    if ($fp) {
                                        Mail::to($fp->email)->send(new MeetingDeleted($record));
                                    }
                                });

                                // トランザクションコミット
                                DB::commit();
                            } catch (\Exception $e) {
                                // エラー時はロールバック
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
