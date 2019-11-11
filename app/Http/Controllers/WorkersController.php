<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class WorkersController extends Controller
{
    /*
     * ADMIN
     *
     * */
    public function getAll()
    {
        $user = JWTAuth::parseToken()->authenticate();
        if ($user['role'] != 'admin') {
            return "no permissions";
        };
        $account = User::all()->where('role', 'worker');
        return response()->json(['value' => $account], 200);
    }

    public function get($id)
    {
        $user = JWTAuth::parseToken()->authenticate();
        if ($user['role'] != 'admin') {
            return "no permissions";
        };
        $account = User::find($id);
        if($account['role'] == 'user'|| $account['role'] == 'admin'){
            return "access denied";
        }
        return response()->json(['value' => $account], 200);
    }
    public function post(Request $request){
        $user = JWTAuth::parseToken()->authenticate();
        if ($user['role'] != 'admin') {
            return "no permissions";
        };
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6|confirmed',
            'role' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors()->toJson(), 400);
        }

        $account = new User([
            'name' => $request['name'],
            'email' => $request['email'],
            'password' => $request['password'],
            'role'=> $request['role']
        ]);
        $account->save();
        return response()->json(['value' => $account],200);
    }
    public function put(Request $request, $id)
    {
        $user = JWTAuth::parseToken()->authenticate();
        if($user['role'] != 'admin'){
            return "no permissions";
        };
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6|confirmed',
            'role' => 'required|string|max:255',
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
        $account->email = $request['email'];
        $account->role = $request['role'];
        $account->save();
        return response()->json(['value' => $account],200);
    }

    public function delete($id)
    {
        $user = JWTAuth::parseToken()->authenticate();
        if($user['role'] != 'admin'){
            return "no permissions";
        };
        $account = User::find($id);
        if($account['role'] == 'user'|| $account['role'] == 'admin')
        {
            return "access denied";
        }
        $account->delete();
        return response('Deleted',200);
    }
}
