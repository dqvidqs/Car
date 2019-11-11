<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Subsidiary extends Model
{
    protected $table = 'subsidiaries';
    public $primaryKey = 'id';
    protected $fillable  = [
        'name',
        'country',
        'city',
        'street'
    ];
   public $timestamps = true;
}
