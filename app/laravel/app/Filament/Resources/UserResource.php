<?php

namespace App\Filament\Resources;

use App\Filament\Resources\UserResource\Pages;
use App\Models\User;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Support\Facades\Auth;
use Filament\Tables\Actions\Action;

class UserResource extends Resource
{
    protected static ?string $model = User::class;

    protected static ?string $navigationIcon = 'heroicon-o-users';

    protected static ?string $navigationLabel = 'ユーザー管理';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\TextInput::make('name')
                    ->required()
                    ->maxLength(255),
                Forms\Components\TextInput::make('email')
                    ->email()
                    ->required()
                    ->maxLength(255),
                Forms\Components\Select::make('type')
                    ->options([
                        'user' => 'User',
                        'admin' => 'Admin',
                        'fp' => 'FP',
                        'merchant' => 'Merchant',
                    ])
                    ->required(),
                // `status` フィールドをフォームから削除
                // Forms\Components\Toggle::make('status')
                //     ->default(true),
                // 不要なフィールドも削除
                // Forms\Components\TextInput::make('address')
                //     ->maxLength(255),
                // Forms\Components\TextInput::make('region')
                //     ->maxLength(255),
                // Forms\Components\TextInput::make('phone_number')
                //     ->tel()
                //     ->maxLength(255),
                // パスワードフィールドを削除
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('name')
                    ->searchable(),
                Tables\Columns\TextColumn::make('email')
                    ->searchable(),
                Tables\Columns\SelectColumn::make('type')
                    ->options([
                        'user' => 'User',
                        'admin' => 'Admin',
                        'fp' => 'FP',
                        'merchant' => 'Merchant',
                    ])
                    ->sortable(),
                Tables\Columns\TextColumn::make('address')
                    ->searchable(),
                Tables\Columns\TextColumn::make('region')
                    ->searchable(),
                Tables\Columns\TextColumn::make('phone_number')
                    ->searchable(),
                Tables\Columns\ToggleColumn::make('status')
                    ->sortable(),
                Tables\Columns\TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
                Tables\Columns\TextColumn::make('updated_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
                Tables\Columns\IconColumn::make('memo')
                    ->label('メモ')
                    ->boolean()
                    ->trueIcon('heroicon-o-document-text')
                    ->falseIcon('heroicon-o-document')
                    ->getStateUsing(fn (User $record): bool => !empty($record->memo))
                    ->action(
                        Action::make('memo')
                            ->icon('heroicon-o-pencil-square')
                            ->modalHeading('メモ編集')
                            ->form([
                                Forms\Components\Textarea::make('memo')
                                    ->label('メモ')
                                    ->rows(15)
                                    ->default(function (User $record) {
                                        return $record->memo;
                                    })
                            ])
                            ->action(function (User $record, array $data): void {
                                $record->update(['memo' => $data['memo']]);
                            })
                    )
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('type')
                    ->options([
                        'user' => 'User',
                        'admin' => 'Admin',
                        'fp' => 'FP',
                        'merchant' => 'Merchant',
                    ])
                    ->label('ユーザータイプ'),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListUsers::route('/'),
            'create' => Pages\CreateUser::route('/create'),
            'edit' => Pages\EditUser::route('/{record}/edit'),
        ];
    }

    public static function canViewAny(): bool
    {
        return Auth::user()->type === 'admin';
    }
}
