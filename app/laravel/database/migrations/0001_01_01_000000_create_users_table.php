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
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('type')->default('user'); // 'user' or 'admin' or 'fp' or 'merchant'
            $table->string('name');
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->rememberToken();
            $table->foreignId('current_team_id')->nullable();
            $table->string('profile_photo_path', 2048)->nullable();
            $table->timestamps();
            //追加1
            $table->boolean('status')->default(true); // 管理者系はこちらのカラムで制限
            $table->string('address')->nullable();
            $table->string('region')->nullable();
            $table->string('phone_number')->nullable();
            //追加2
            $table->string('contact_person_name')->nullable(); // 担当者者指名
            $table->string('contact_person_phone')->nullable(); // 担当者の電話番号
            $table->string('contact_person_email')->nullable(); // 担当者のメールアドレス
            $table->string('position')->nullable(); // 役職
            //追加3
            $table->text('memo')->nullable(); // メモカラムを追加
        });

        Schema::create('password_reset_tokens', function (Blueprint $table) {
            $table->string('email')->primary();
            $table->string('token');
            $table->timestamp('created_at')->nullable();
        });

        Schema::create('sessions', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->foreignId('user_id')->nullable()->index();
            $table->string('ip_address', 45)->nullable();
            $table->text('user_agent')->nullable();
            $table->longText('payload');
            $table->integer('last_activity')->index();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
        Schema::dropIfExists('password_reset_tokens');
        Schema::dropIfExists('sessions');
    }
};
