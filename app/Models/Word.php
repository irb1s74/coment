<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Model;


class Word extends Model
{
    protected $table = 'words';
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'word'
    ];
}
