<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Car;
use JWTAuth;

class CarsController extends Controller
{

    public function getAll()
    {
        $cars = Car::orderBy('id','desc')->paginate(5);
        return response()->json(['value' => $cars],200);
    }

    public function post(Request $request)
    {
        $user = JWTAuth::parseToken()->authenticate();
        if($user['role'] != 'worker'){
            return "no permissions";
        };
        $validator = Validator::make($request->all(), [
            'brand' => 'required|string|max:50',
            'model' => 'required|string|max:50',
            'year' => 'required|integer|max:4',
            'price' => 'required|double|max:10',
            'run' => 'required|double|max:10',
            'power' => 'required|integer|max:5',
            'fuel' => 'required|string|max:50',
            'body' => 'required|string|max:50'
        ]);
        if ($validator->fails()) {
            $error = 'not valid information';
            return response()->json(['value' => $error],200);
        }
        $car = new Car([
            'brand' => $request['brand'],
            'model' => $request['model'],
            'year' => $request['year'],
            'price'=> $request['price'],
            'run'=> $request['run'],
            'power'=> $request['power'],
            'fuel'=> $request['fuel'],
            'body'=> $request['body']
        ]);
        $car->save();
        return response()->json(['value' => $car],200);
    }

    public function get($id)
    {
        $car = Car::find($id);
        return response()->json(['value' => $car],200);
    }


    public function put(Request $request, $id)
    {
        $user = JWTAuth::parseToken()->authenticate();
        if ($user['role'] != 'worker') {
            return "no permissions";
        };
        $validator = Validator::make($request->all(), [
            'brand' => 'required|string|max:50',
            'model' => 'required|string|max:50',
            'year' => 'required|integer|max:4',
            'price' => 'required|double|max:10',
            'run' => 'required|double|max:10',
            'power' => 'required|integer|max:5',
            'fuel' => 'required|string|max:50',
            'body' => 'required|string|max:50'
        ]);
        if ($validator->fails()) {
            $error = 'not valid information';
            return response()->json(['value' => $error], 200);
        }
        $car = Car::find($id);
        $car->brand = $request['brand'];
        $car->model = $request['model'];
        $car->year = $request['year'];
        $car->price = $request['price'];
        $car->run = $request['run'];
        $car->power = $request['power'];
        $car->fuel = $request['fuel'];
        $car->body = $request['body'];

        $car->save();
        return response()->json(['value' => $car], 200);
    }


    public function delete($id)
    {
        $user = JWTAuth::parseToken()->authenticate();
        if ($user['role'] != 'worker') {
            return "no permissions";
        };
        $car = Car::find($id);
        $car->delete();
        return response('Deleted',200);
    }
}
