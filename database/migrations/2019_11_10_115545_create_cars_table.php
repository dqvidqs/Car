<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCarsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('cars', function (Blueprint $table) {
            $table->increments('id');
            $table->string('brand');
            $table->string('codename')->nullable();
            $table->string('model');
            $table->integer('year');
            $table->double('price');
            $table->double('run')->nullable();
            $table->integer('power')->nullable();
            $table->enum('fuel',['petrol','diesel','electric','gas','petrol/gas','petrol/gas/electric'])->nullable();
            $table->enum('body',['sedan','wagon','hatchback','suv','coupe'])->nullable();
            $table->string('vin')->unique();;
            $table->boolean('confirm')->nullable();
            $table->unsignedInteger('created')->nullable();
            $table->unsignedInteger('ordered')->nullable();
            $table->foreign('created')->references('id')->on('users');
            $table->foreign('ordered')->references('id')->on('users');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('cars');
    }
}
