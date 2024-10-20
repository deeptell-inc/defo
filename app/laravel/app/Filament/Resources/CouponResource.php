<?php

namespace App\Filament\Resources;

use App\Filament\Resources\CouponResource\Pages;
use App\Models\Coupon;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\Auth;
use Filament\Tables\Actions\Action;
use Filament\Tables\Actions\DeleteBulkAction;

class CouponResource extends Resource
{
    protected static ?string $model = Coupon::class;

    protected static ?string $navigationIcon = 'heroicon-o-ticket';

    public static function form(Form $form): Form
    {
        return $form->schema([
            Forms\Components\Grid::make(2)->schema([
                // 左側の入力
                Forms\Components\Section::make('基本情報')->schema([
                    Forms\Components\TextInput::make('coupon_title')
                        ->required()
                        ->maxLength(255)
                        ->label('クーポンタイトル')
                        ->placeholder('例: 夏のセール'),
                    Forms\Components\Textarea::make('coupon_description')
                        ->required()
                        ->maxLength(1000)
                        ->label('クーポン詳細')
                        ->placeholder('例: このクーポンは夏のセール期間中に使用できます。'),
                    Forms\Components\TextInput::make('coupon_code')
                        ->required()
                        ->unique(ignoreRecord: true)
                        ->placeholder('クリックして生成')
                        ->suffixAction(
                            Forms\Components\Actions\Action::make('generate')
                                ->icon('heroicon-m-arrow-path')
                                ->action(fn (Forms\Set $set) => $set('coupon_code', Str::random(8)))
                        )
                        ->label('クーポンコード'),
                    Forms\Components\DatePicker::make('start_date')
                        ->required()
                        ->label('開始日'),
                    Forms\Components\DatePicker::make('end_date')
                        ->required()
                        ->afterOrEqual('start_date')
                        ->label('終了日'),
                    Forms\Components\Select::make('discount_type')
                        ->options([
                            'percentage' => 'パーセント割引',
                            'fixed_amount' => '固定金額割引',
                            'free_item' => '無料アイテム',
                        ])
                        ->required()
                        ->reactive()
                        ->label('割引タイプ'),
                    Forms\Components\TextInput::make('discount_value')
                        ->required()
                        ->numeric()
                        ->label(fn (Forms\Get $get) => match ($get('discount_type')) {
                            'percentage' => '割引率 (%)',
                            'fixed_amount' => '割引金額 (円)',
                            default => '無料アイテム数',
                        })
                        ->placeholder('例: 10'),
                    Forms\Components\TextInput::make('minimum_purchase')
                        ->numeric()
                        ->label('最低購入額 (円)')
                        ->helperText('任意項目です')
                        ->placeholder('例: 5000'),
                    Forms\Components\TextInput::make('usage_limit')
                        ->numeric()
                        ->label('使用制限 (回)')
                        ->helperText('任意項目です')
                        ->placeholder('例: 100'),
                    Forms\Components\TextInput::make('contact_info')
                        ->label('連絡先情報')
                        ->helperText('任意項目です')
                        ->placeholder('例: info@example.com'),
                    Forms\Components\Toggle::make('is_public')
                        ->label('公開する')
                        ->visible(fn () => Auth::user()->type === 'admin'),
                    Forms\Components\Toggle::make('is_new_customer')
                        ->label('新規顧客向け'),
                ])->columnSpan(1), // 左側のカラム設定

                // 右側の入力
                Forms\Components\Section::make('追加情報')->schema([
                    Forms\Components\FileUpload::make('image_path')
                        ->image()
                        ->maxSize(1024)
                        ->directory('coupons')
                        ->visibility('public')
                        ->label('クーポン画像'),
                    Forms\Components\Repeater::make('website_urls')
                        ->schema([
                            Forms\Components\TextInput::make('url')
                                ->url()
                                // ->required() // 任意項目？？
                                ->label('ウェブサイトURL')
                                ->placeholder('例: https://example.com'),
                        ])
                        ->label('ウェブサイトURL（複数可）')
                        ->addActionLabel('URLを追加')
                        ->helperText('任意項目です'),
                ])->columnSpan(1), // 右側のカラム設定
            ]),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table->columns([
            Tables\Columns\ImageColumn::make('image_path')
                ->label('写真')
                ->disk('public')
                ->square()
                ->width(100)
                ->height(100),
            Tables\Columns\TextColumn::make('coupon_title')
                ->label('タイトル')
                ->searchable(),
            Tables\Columns\TextColumn::make('coupon_description')
                ->label('詳細')
                ->limit(50),
            Tables\Columns\TextColumn::make('start_date')
                ->label('開始日')
                ->date(),
            Tables\Columns\TextColumn::make('end_date')
                ->label('終了日')
                ->date(),
            Tables\Columns\TextColumn::make('merchant.name')
                ->label('作成者')
                ->searchable(),
            Tables\Columns\IconColumn::make('is_public')
                ->label('公開状態')
                ->boolean()
                ->trueIcon('heroicon-o-check-circle')
                ->falseIcon('heroicon-o-x-circle')
                ->trueColor('success')
                ->falseColor('danger'),
        ])->filters([
            // フィルターを追加する場合はここに記述
        ])->actions([
            Tables\Actions\EditAction::make(),
            Action::make('toggle_public')
                ->label(fn (Coupon $record): string => $record->is_public ? '非公開にする' : '公開する')
                ->icon(fn (Coupon $record): string => $record->is_public ? 'heroicon-m-eye-slash' : 'heroicon-m-eye')
                ->action(fn (Coupon $record): bool => $record->update(['is_public' => !$record->is_public]) !== false)
                ->visible(fn () => Auth::user()->type === 'admin'),
        ])->bulkActions([
            Tables\Actions\BulkActionGroup::make([
                DeleteBulkAction::make(),
            ]),
        ]);
    }

    public static function getRelations(): array
    {
        return [
            // 関連を追加する場合はここに記述
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListCoupons::route('/'),
            'create' => Pages\CreateCoupon::route('/create'),
            'edit' => Pages\EditCoupon::route('/{record}/edit'),
        ];
    }

    public static function getEloquentQuery(): Builder
    {
        $query = parent::getEloquentQuery();

        if (Auth::user()->type === 'merchant') {
            $query->where('merchant_id', Auth::id());
        }

        return $query;
    }

    public static function canViewAny(): bool
    {
        return in_array(Auth::user()->type, ['admin', 'merchant']);
    }
}
