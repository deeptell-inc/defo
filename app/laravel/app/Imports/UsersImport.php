<?php

namespace App\Imports;

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class UsersImport implements ToModel, WithHeadingRow
{
    /**
     * CSV/Excel の各行を User モデルへ変換する
     *
     * ヘッダー名は小文字・スネークケース（例: type, name, email, ...）である前提です。
     *
     * @param array $row
     * @return \Illuminate\Database\Eloquent\Model|null
     */
    public function model(array $row)
    {
        return new User([
            'type'                   => $row['type'] ?? null,
            'name'                   => $row['name'] ?? null,
            'email'                  => $row['email'] ?? null,
            // CSV に平文パスワードが含まれている場合はハッシュ化
            'password'               => isset($row['password']) ? Hash::make($row['password']) : null,
            'status'                 => isset($row['status']) ? (bool)$row['status'] : false,
            'address'                => $row['address'] ?? null,
            'region'                 => $row['region'] ?? null,
            'phone_number'           => $row['phone_number'] ?? null,
            'profile_photo_path'     => $row['profile_photo_path'] ?? null,
            'contact_person_name'    => $row['contact_person_name'] ?? null,
            'contact_person_phone'   => $row['contact_person_phone'] ?? null,
            'contact_person_email'   => $row['contact_person_email'] ?? null,
            'position'               => $row['position'] ?? null,
            'memo'                   => $row['memo'] ?? null,
        ]);
    }
}
