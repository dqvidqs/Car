<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Car extends Model
{
    //
    protected $table = 'cars';
    protected $primaryKey = 'id';
    protected $fillable  = [
        'brand',
        'codename',
        'model',
        'year',
        'price',
        'run',
        'power',
        'fuel',
        'body',
        'vin',
        'confirm',
        'ordered',
        'created',
    ];
    public $timestamps = true;
}
