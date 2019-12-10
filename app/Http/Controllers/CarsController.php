<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Car;
use JWTAuth;
use Illuminate\Support\Facades\Validator;

class CarsController extends Controller
{
    public function index()
    {
        $cars = Car::select('cars.*')
            ->where('cars.confirm','=', null)
            ->where('cars.ordered','=', null)
            ->orderBy('id','des')
            ->get();
        return response()->json([
            'cars' => $cars
        ], 200);
    }

    public function ordersIndex()
    {
        $user = JWTAuth::parseToken()->authenticate();
        $cars = Car::join('users','users.id','=','cars.ordered')
            ->where('cars.created','=', $user['id'])
            ->where('cars.confirm','=',null)
            ->select('cars.*','users.name as username','users.surname as usersurname')
            ->get();
        return response()->json([
            'cars' => $cars
        ], 200);
    }

    public function show($id)
    {
        $car = Car::find($id);
        return response()->json([
            'car' => $car
        ], 200);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'brand' => 'required|string|max:50',
            'codename' => 'sometimes|string|max:255',
            'model' => 'required|string|max:50',
            'year' => 'required|integer|max:3000',
            'price' => 'required|regex:/^[0-9]+(\.[0-9][0-9]?)?$/',
            'run' => 'sometimes|regex:/^[0-9]+(\.[0-9][0-9]?)?$/',
            'power' => 'sometimes|integer|max:10000',
            'vin' => 'required|string|max:255|unique:cars',
            'fuel' => 'sometimes|string|max:255',
            'body' => 'sometimes|string|max:255',
        ]);
        if ($validator->fails()) {
            return response()->json($validator->errors()->toJson(), 400);
        }
        $user = JWTAuth::parseToken()->authenticate();
        $car = new Car([
            'brand' => $request['brand'],
            'codename' => $request['codename'],
            'model' => $request['model'],
            'year' => $request['year'],
            'price' => $request['price'],
            'run' => $request['run'],
            'power' => $request['power'],
            'vin' => $request['vin'],
            'fuel' => $request['fuel'],
            'body' => $request['body'],
            'created' => $user['id'],
            'ordered' => null,
            'confirmed' => false
        ]);
        $car->save();
        return response()->json(['car' => $car], 200);
    }

    public function update(Request $request, $id)
    {
        $user = JWTAuth::parseToken()->authenticate();
        $car = Car::find($id);

        if ($request['ordered'] != null && $user['role'] == 'user') {
            $validator = Validator::make($request->all(), [
                'ordered' => 'required|boolean'
            ]);
            if ($validator->fails()) {
                return response()->json($validator->errors()->toJson(), 400);
            }
            if ($request['ordered'] == "1")
                $car->ordered = $user['id'];
            else
                $car->ordered = null;
        }
        else if ($request['confirm'] != null && $user['id'] == $car['created']) {
            $validator = Validator::make($request->all(), [
                'confirm' => 'required|boolean'
            ]);
            if ($validator->fails()) {
                return response()->json($validator->errors()->toJson(), 400);
            }
            if ($request['confirm'] == "1")
                $car->confirm = "1";
            else
                $car->confirm = "0";
        } elseif ($user['role'] == 'worker') {
            $validator = Validator::make($request->all(), [
                'brand' => 'required|string|max:50',
                'codename' => 'sometimes|string|max:255',
                'model' => 'required|string|max:50',
                'year' => 'required|integer|max:3000',
                'price' => 'required|regex:/^[0-9]+(\.[0-9][0-9]?)?$/',
                'run' => 'sometimes|regex:/^[0-9]+(\.[0-9][0-9]?)?$/',
                'power' => 'sometimes|integer|max:10000',
                'vin' => "required|string|unique:cars,vin,$id|max:255",
                'fuel' => 'sometimes|string|max:255',
                'body' => 'sometimes|string|max:255',
            ]);
            if ($validator->fails()) {
                return response()->json($validator->errors()->toJson(), 400);
            }
            $car->brand = $request['brand'];
            $car->model = $request['model'];
            $car->year = $request['year'];
            $car->price = $request['price'];
            $car->run = $request['run'];
            $car->power = $request['power'];
            $car->fuel = $request['fuel'];
            $car->body = $request['body'];
        }
        else{
            return response('cannot update', 200);
        }
        $car->save();
        return response()->json(['car' => $car], 200);
    }

    public function destroy($id)
    {
        $car = Car::find($id);
        if ($car['confirm'] == true) {
            return response('cannot delete', 200);
        }
        else{
            $car->delete();
            return response('Deleted', 200);
        }
    }
}
