<?php

namespace App\Http\Controllers;

use App\Car;
use App\User;
use Illuminate\Support\Facades\Hash;
use JWTAuth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class EmployeesController extends Controller
{
    /*
     * ADMIN
     *
     * */
    public function index()
    {
        $account = User::select('users.*')
        ->where(function ($query) {
            $query->where('role', '=', 'supervisor')
                ->orWhere('role', '=', 'worker');
        })->get();
        return response()->json(['employees' => $account], 200);
    }

    public function show($id)
    {
        $account = User::find($id);
        if($account['role'] == 'user'|| $account['role'] == 'admin'){
            return "access denied";
        }
        $user = JWTAuth::parseToken()->authenticate();
        $cars = [];
        if($user['role'] == 'supervisor'){
            $cars = Car::select('cars.*')->where('created', $id)->get();
        };
        return response()->json([
            'employees' => $account,
            'cars' => $cars,
            'role' => $user['role']
            ], 200);
    }
    public function store(Request $request){
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:50',
            'surname' => 'sometimes|string|max:50',
            'email' => 'required|string|email|max:50|unique:users',
            'password' => 'required|string|min:6|confirmed',
            'role' => 'required|string|max:50',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors()->toJson(), 400);
        }

        $account = new User([
            'name' => $request['name'],
            'surname' => $request['surname'],
            'email' => $request['email'],
            'password' => Hash::make($request->get('password')),
            'role'=> $request['role']
        ]);
        $account->save();
        return response()->json(['employees' => $account],200);
    }
    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:50',
            'surname' => 'sometimes|string|max:50',
            'email' => 'required|string|email|max:50|unique:users',
            'password' => 'required|string|min:6|confirmed',
            'role' => 'required|string|max:50',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors()->toJson(), 400);
        }
        $account = User::find($id);
        if($account['role'] == 'user'|| $account['role'] == 'admin')
        {
            return "access denied";
        }
        $account->name = $request['name'];
        $account->surname = $request['surname'];
        $account->email = $request['email'];
        $account->password = Hash::make($request->get('password'));
        $account->role = $request['role'];
        $account->save();
        return response()->json(['employees' => $account],200);
    }

    public function destroy($id)
    {
        $account = User::find($id);
        if($account['role'] == 'user'|| $account['role'] == 'admin')
        {
            return "access denied";
        }
        $cars = Car::select('cars.*')->where('created',$id);
        if(!empty($cars)){
            $cars->delete();
        }
        $account->delete();
        return response('Deleted',200);
    }
}
