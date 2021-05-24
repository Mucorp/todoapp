<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use DB;
use Str;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // \App\Models\User::factory(10)->create();
        DB::table('to_dos')->insert([
            'user_id' => 1,
            'title' => Str::random(10),
            'description' => Str::random(100),
        ]);
        DB::table('users')->insert([
            'Name' => 'Ibrar',
            'email' => 'test@gmail.com',
            'password' => '$2y$10$3pQA9wdzJOsP5xev.hN/yegZuQ6UOMKShLW6hcpd6TMmcu1f1zKsW',
        ]);
    }
}
