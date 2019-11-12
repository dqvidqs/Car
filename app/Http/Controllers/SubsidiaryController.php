<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Subsidiary;
use JWTAuth;
use App\User;

class SubsidiaryController extends Controller
{
    public function index()
    {
        $subsidiary = Subsidiary::All();
        return response()->json(['value' => $subsidiary],200);
    }

    public function show($id)
    {
        $subsidiary = Subsidiary::find($id);
        $workers = User::select('users.*')->where('working', $id)->get();
        return response()->json([
            'Subsidiary' => $subsidiary,
            'Workers' => $workers
        ],200);
    }

    public function store(Request $request)
    {
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

    public function update(Request $request, $id)
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

    public function destroy($id)
    {
        $subsiniary = Subsidiary::find($id);
        $workers = User::select('users.*')->where('working', $id)->get();
        if(empty($workers)){
            $subsiniary->delete();
            return response('Deleted', 200);
        }else{
            return response('Remove first workers', 200);
        }
    }
}
