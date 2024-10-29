<?php
// database/migrations/2024_10_28_065440_create_meetings_table.php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('meetings', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('description')->nullable();
            // 管理者（admin）
            $table->foreignId('admin_id')
                  ->constrained('users')
                  ->where('type', 'admin');
            // 一般ユーザー（user）
            $table->foreignId('user_id')
                  ->constrained('users')
                  ->where('type', 'user');
            // FP（fp）
            $table->foreignId('fp_id')
                  ->constrained('users')
                  ->where('type', 'fp');
            $table->timestamps();
            $table->softDeletes();

            // インデックスの追加
            $table->index('admin_id');
            $table->index('user_id');
            $table->index('fp_id');
        });

        Schema::create('meeting_dates', function (Blueprint $table) {
            $table->id();
            $table->foreignId('meeting_id')
                  ->constrained()
                  // ->onDelete('cascade') // この行をコメントアウトまたは削除
                  ->onDelete('restrict'); // 代わりに制限を設定（オプション）
            $table->dateTime('proposed_datetime');
            $table->enum('status', ['pending', 'confirmed', 'cancelled'])->default('pending');
            $table->boolean('is_selected')->default(false);
            $table->text('note')->nullable();
            $table->timestamps();
            $table->softDeletes();

            // インデックスの追加
            $table->index('meeting_id');
            $table->index('proposed_datetime');
            $table->index('status');
            $table->index('is_selected');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('meeting_dates');
        Schema::dropIfExists('meetings');
    }
};