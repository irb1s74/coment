<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Model;


class Coment extends Model
{
    protected $table = 'coment';
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'coment'
    ];
}
