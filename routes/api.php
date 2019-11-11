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

/*Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});*/
//login nad Register
Route::post('register', 'UsersController@register');
Route::post('login', 'UsersController@authenticate');
//Test
Route::group(['middleware' => ['jwt.verify']], function() {
    Route::get('user', 'UsersController@getAuthenticatedUser');
    Route::get('closed', 'DataController@closed');
});
//User
Route::get('/user', 'UsersController@getAuthenticatedUser');
//Guests and all
Route::get('/cars', 'CarsController@getAll');
/*
 * Admin things
 * */
//Subsidiaries list
Route::group(['middleware' => ['jwt.verify']], function() {
    Route::get('/user', 'UsersController@getAuthenticatedUser');
    Route::get('/subsidiaries', 'SubsidiaryController@getAll');//admin, supervisor
});//get
Route::group(['middleware' => ['jwt.verify']], function() {
    Route::get('/user', 'UsersController@getAuthenticatedUser');
    Route::get('/subsidiaries/{id}', 'SubsidiaryController@get');
});//put
Route::group(['middleware' => ['jwt.verify']], function() {
    Route::get('/user', 'UsersController@getAuthenticatedUser');
    Route::put('/subsidiaries/{id}', 'SubsidiaryController@put');
});//post
Route::group(['middleware' => ['jwt.verify']], function() {
    Route::get('/user', 'UsersController@getAuthenticatedUser');
    Route::post('/subsidiaries', 'SubsidiaryController@post');
});//delete
Route::group(['middleware' => ['jwt.verify']], function() {
    Route::get('/user', 'UsersController@getAuthenticatedUser');
    Route::delete('/subsidiaries/{id}', 'SubsidiaryController@delete');
});
//Worker/Supervisor list
Route::group(['middleware' => ['jwt.verify']], function() {
    Route::get('/user', 'UsersController@getAuthenticatedUser');
    Route::get('/workers', 'WorkersController@getAll');
});//get
Route::group(['middleware' => ['jwt.verify']], function() {
    Route::get('/user', 'UsersController@getAuthenticatedUser');
    Route::get('/workers/{id}', 'WorkersController@get');
});//put
Route::group(['middleware' => ['jwt.verify']], function() {
    Route::get('/user', 'UsersController@getAuthenticatedUser');
    Route::put('/workers/{id}', 'WorkersController@put');
});//post
Route::group(['middleware' => ['jwt.verify']], function() {
    Route::get('/user', 'UsersController@getAuthenticatedUser');
    Route::post('/workers', 'WorkersController@post');
});//delete
Route::group(['middleware' => ['jwt.verify']], function() {
    Route::get('/user', 'UsersController@getAuthenticatedUser');
    Route::delete('/workers/{id}', 'WorkersController@delete');
});
//CAR - WORKER
//get
Route::group(['middleware' => ['jwt.verify']], function() {
    Route::get('/user', 'UsersController@getAuthenticatedUser');
    Route::get('/car/{id}', 'CarsController@get');
});//put
Route::group(['middleware' => ['jwt.verify']], function() {
    Route::get('/user', 'UsersController@getAuthenticatedUser');
    Route::put('/car/{id}', 'CarsController@put');
});//post
Route::group(['middleware' => ['jwt.verify']], function() {
    Route::get('/user', 'UsersController@getAuthenticatedUser');
    Route::post('/car', 'CarsController@post');
});//delete
Route::group(['middleware' => ['jwt.verify']], function() {
    Route::get('/user', 'UsersController@getAuthenticatedUser');
    Route::delete('/car/{id}', 'CarsController@delete');
});
//Check orders
Route::group(['middleware' => ['jwt.verify']], function() {
    Route::get('/user', 'UsersController@getAuthenticatedUser');
    Route::get('/clientOrders', 'CarsController@clientOrders');
});
//confirm order
Route::group(['middleware' => ['jwt.verify']], function() {
    Route::get('/user', 'UsersController@getAuthenticatedUser');
    Route::post('/clientOrders/{id}', 'CarsController@confirmOrder');
});
//USER
//order
Route::group(['middleware' => ['jwt.verify']], function() {
    Route::get('/user', 'UsersController@getAuthenticatedUser');
    Route::get('/order/{id}', 'CarsController@order');
});
//remove order
Route::group(['middleware' => ['jwt.verify']], function() {
    Route::get('/user', 'UsersController@getAuthenticatedUser');
    Route::post('/order/{id}', 'CarsController@remove');
});
//check my order
Route::group(['middleware' => ['jwt.verify']], function() {
    Route::get('/user', 'UsersController@getAuthenticatedUser');
    Route::get('/orders', 'CarsController@orderAll');
});
//Supervisor
//subsidiaries
Route::group(['middleware' => ['jwt.verify']], function() {
    Route::get('/user', 'UsersController@getAuthenticatedUser');
    Route::get('/subsidiary', 'Supervisor@getSubsidiary');
});
//workers by subsidiary
Route::group(['middleware' => ['jwt.verify']], function() {
    Route::get('/user', 'UsersController@getAuthenticatedUser');
    Route::get('/subsidiary/{id}/workers', 'Supervisor@getWorkers');
});
//cars by worker by subsidiary
Route::group(['middleware' => ['jwt.verify']], function() {
    Route::get('/user', 'UsersController@getAuthenticatedUser');
    Route::get('/subsidiary/{id}/workers/{id}/Cars', 'Supervisor@getCars');//only confirmed
});
//search
Route::group(['middleware' => ['jwt.verify']], function() {
    Route::get('/user', 'UsersController@getAuthenticatedUser');
    Route::get('/search', 'Supervisor@search');
});

