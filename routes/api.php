<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

//login nad Register
Route::post('/register', 'UsersController@register');
Route::post('/login', 'UsersController@authenticate');
Route::get('/logout', 'UsersController@logout');

//Guests
Route::get('/cars', 'CarsController@index');
Route::get('/car/{id}', 'CarsController@show');
/*
 * Admin/Supervisor things
 * */
Route::middleware(['jwt.verify:admin|supervisor'])->group(function () {
    Route::get('/subsidiaries', 'SubsidiaryController@index');
    Route::get('/subsidiary/{id}', 'SubsidiaryController@show');
});
/*
 * Admin things
 * */
Route::middleware(['jwt.verify:admin'])->group(function () {
    Route::put('/subsidiary/{id}', 'SubsidiaryController@update');
    Route::post('/subsidiary', 'SubsidiaryController@store');
    Route::delete('/subsidiary/{id}', 'SubsidiaryController@destroy');
    Route::get('/employees', 'EmployeesController@index');
    Route::get('/employee/{id}', 'EmployeesController@show');
    Route::put('/employee/{id}', 'EmployeesController@update');
    Route::post('/employee', 'EmployeesController@store');
    Route::delete('/employee/{id}', 'EmployeesController@destroy');
});
Route::middleware(['jwt.verify:worker'])->group(function () {
    Route::post('/car', 'CarsController@store');
    Route::delete('/car/{id}', 'CarsController@destroy');
    Route::get('/orders', 'CarsController@ordersIndex');
});
Route::middleware(['jwt.verify:supervisor'])->group(function () {
    Route::get('/subsidiary/{id}/workers', 'SupervisorController@indexWorkers');
    Route::get('/subsidiary/{idsub}/worker/{idwork}', 'SupervisorController@showWorker');
    Route::get('/subsidiary/{idsub}/worker/{idwork}/cars', 'SupervisorController@indexCars');//only confirmed
    Route::get('/subsidiary/{idsub}/worker/{idwork}/car/{idcar}', 'SupervisorController@showUser');//only confirmed
    Route::get('/search', 'SupervisorController@search');
});
Route::middleware(['jwt.verify:user|worker'])->group(function () {
    Route::put('/car/{id}', 'CarsController@update');
});


