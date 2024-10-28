<?php

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
            $table->enum('status', ['pending', 'confirmed', 'cancelled'])->default('pending');
            $table->timestamps();
            $table->softDeletes();

            // インデックスの追加
            $table->index('admin_id');
            $table->index('user_id');
            $table->index('fp_id');
            $table->index('status');
        });

        Schema::create('meeting_dates', function (Blueprint $table) {
            $table->id();
            $table->foreignId('meeting_id')
                  ->constrained()
                  ->onDelete('cascade');
            $table->dateTime('proposed_datetime');
            $table->boolean('is_selected')->default(false);
            $table->text('note')->nullable();
            $table->timestamps();

            // インデックスの追加
            $table->index('meeting_id');
            $table->index('proposed_datetime');
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