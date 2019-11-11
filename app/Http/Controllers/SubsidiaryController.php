<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Subsidiary;
use JWTAuth;
use App\User;

class SubsidiaryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    private function Check(){
        try{
            $user = JWTAuth::parseToken()->authenticate();
            if($user['role'] == 'admin'){
            };
        }
        catch (Exception $e){
            return "no";
        }
    }

    public function getAll()
    {
        $user = JWTAuth::parseToken()->authenticate();
        if($user['role'] != 'admin'){
            return "no permissions";
        };
        $subsidiary = Subsidiary::All();
        return response()->json(['value' => $subsidiary],200);
    }

    public function post(Request $request)
    {
        $user = JWTAuth::parseToken()->authenticate();
        if($user['role'] != 'admin'){
            return "no permissions";
        };
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:50',
            'country' => 'required|string|max:50',
            'city' => 'required|string|max:50',
            'street' => 'required|string|max:50'
        ]);
        if ($validator->fails()) {
            $error = 'not valid information';
            return response()->json(['value' => $error],200);
        }
        $subsidiary = new Subsidiary([
            'name' => $request['name'],
            'country' => $request['country'],
            'city' => $request['city'],
            'street'=> $request['street']
        ]);
        $subsidiary->save();
        return response()->json(['value' => $subsidiary],200);
    }

    public function get($id)
    {
        $user = JWTAuth::parseToken()->authenticate();
        if($user['role'] != 'admin'){
            return "no permissions";
        };
        $subsidiary = Subsidiary::find($id);
        $workers = User::select('name')->where('working', $id)->get();
        return response()->json([
            'Subsidiary' => $subsidiary,
            'Workers' => $workers
            ],200);
    }

    public function put(Request $request, $id)
    {
        $user = JWTAuth::parseToken()->authenticate();
        if($user['role'] != 'admin'){
            return "no permissions";
        };
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:50',
            'country' => 'required|string|max:50',
            'city' => 'required|string|max:50',
            'street' => 'required|string|max:50'
        ]);
        if ($validator->fails()) {
            $error = 'not valid information';
            return response()->json(['value' => $error],200);
        }
        $subsidiary = Subsidiary::find($id);
        $subsidiary->name = $request['name'];
        $subsidiary->country = $request['country'];
        $subsidiary->street = $request['street'];
        $subsidiary->city = $request['city'];
        $subsidiary->save();
        return response()->json(['value' => $subsidiary],200);
    }

    public function delete($id)
    {
        $user = JWTAuth::parseToken()->authenticate();
        if($user['role'] != 'admin'){
            return "no permissions";
        };
        $subsiniary = Subsidiary::find($id);
        $subsiniary->delete();
        return response('Deleted',200);
    }
    /*public function test($sub, $user, $car)
    {        $subsidiary = new Subsidiary([
        'city' => $user,
        'street'=> $car,
    ]);
        return response()->json(['value' => $subsidiary],200);
        //return 'TEST'.$sub.' '.$user.' '.$car;
    }*/
}
