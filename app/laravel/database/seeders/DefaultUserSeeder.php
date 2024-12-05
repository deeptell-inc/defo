<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class DefaultUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // ユーザー1
        User::create([
            'name' => '管理者テストユーザー',
            'type' => 'admin',
            'email' => 'admin@example.com',
            'password' => Hash::make('Aa123456'),
            'address' => '123-1234',
            'region' => 'ヴァイゼ地方',
            'phone_number' => '08000000000',
            'status' => true,
        ]);

        // ユーザー2
        User::create([
            'name' => '一般テストユーザー',
            'type' => 'user',
            'email' => 'user@example.com',
            'password' => Hash::make('Aa123456'),
            'address' => '123-1234',
            'region' => 'ヴァイゼ地方',
            'phone_number' => '08000000000',
            'status' => true,
        ]);

        // ユーザー3
        User::create([
            'name' => 'FPテストユーザー',
            'type' => 'fp',
            'email' => 'fp@example.com',
            'password' => Hash::make('Aa123456'),
            'address' => '123-1234',
            'region' => 'ヴァイゼ地方',
            'phone_number' => '08000000000',
            'status' => true,
        ]);

        // ユーザー4
        User::create([
            'name' => '加盟店テストユーザー',
            'type' => 'merchant',
            'email' => 'merchant@example.com',
            'password' => Hash::make('Aa123456'),
            'address' => '123-1234',
            'region' => 'ヴァイゼ地方',
            'phone_number' => '08000000000',
            'status' => true,
        ]);
    }
}
