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
            'name' => '管理者のフリーレン',
            'type' => 'admin',
            'email' => 'tankourou800@gmail.com',
            'password' => Hash::make('Runrun831@'),
            'address' => '522-0002',
            'region' => 'ヴァイゼ地方',
            'phone_number' => '07043323039',
            'status' => true,
        ]);

        // ユーザー2
        User::create([
            'name' => '一般ユーザーのフリーレン',
            'type' => 'user',
            'email' => 'user@example.com',
            'password' => Hash::make('Runrun831@'),
            'address' => '522-0002',
            'region' => 'ヴァイゼ地方',
            'phone_number' => '07043323039',
            'status' => true,
        ]);

        // ユーザー3
        User::create([
            'name' => 'FPのフリーレン',
            'type' => 'fp',
            'email' => 'fp@example.com',
            'password' => Hash::make('Runrun831@'),
            'address' => '522-0002',
            'region' => 'ヴァイゼ地方',
            'phone_number' => '07043323039',
            'status' => true,
        ]);

        // ユーザー4
        User::create([
            'name' => '加盟店のフリーレン',
            'type' => 'merchant',
            'email' => 'store@example.com',
            'password' => Hash::make('Runrun831@'),
            'address' => '522-0002',
            'region' => 'ヴァイゼ地方',
            'phone_number' => '07043323039',
            'status' => true,
        ]);
    }
}