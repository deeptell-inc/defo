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
        User::create([
            'name' => '葬送のフリーレン',
            'type' => 'admin',
            'email' => 'tankourou800@gmail.com',
            'password' => Hash::make('Runrun831@'),
            'address' => '522-0002',
            'region' => 'ヴァイゼ地方',
            'phone_number' => '07043323039',
            'status' => true,
        ]);
    }
}


