<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Model;


class Later extends Model
{
    protected $table = 'later';
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'lat'
    ];
}
