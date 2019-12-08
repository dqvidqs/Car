<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use Illuminate\Support\Arr;
use Tymon\JWTAuth\PayloadFactory;
use JWTFactory;
use Carbon\Carbon;
use Tymon\JWTAuth\Claims\Issuer;
use Tymon\JWTAuth\Claims\IssuedAt;
use Tymon\JWTAuth\Claims\Expiration;
use Tymon\JWTAuth\Claims\NotBefore;
use Tymon\JWTAuth\Claims\JwtId;
use Tymon\JWTAuth\Claims\Subject;
class UsersController extends Controller
{
    public function authenticate(Request $request)
    {
        $user = User::select('users.*')
        ->where('email', $request->get('email'))
        ->first();
        if($user == null){
            return response()->json([
                'user' => 'user does not exist!']);
        }
        $data = [
            'role' => $user['role'],
            'name' => $user['name'],
            'surname' => $user['surname'],
            'iss' => new Issuer('faker'),
            'iat' => new IssuedAt(Carbon::now('UTC')) ,
            'exp' => new Expiration(Carbon::now('UTC')->addDays(1)),
            'nbf' => new NotBefore(Carbon::now('UTC')),
            'sub' => new Subject('faker'),
            'jti' => new JwtId('faker'),
        ];
        JWTFactory::customClaims($data);
        JWTFactory::make($data);

        $credentials = $request->only('email', 'password');

        try {
            if (!$token = JWTAuth::attempt($credentials)) {
                return response()->json(['error' => 'invalid_credentials'], 400);
            }
        } catch (JWTException $e) {
            return response()->json(['error' => 'could_not_create_token'], 500);
        }
        return response()->json(compact('token'));
    }

    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'surname' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6|confirmed',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors()->toJson(), 400);
        }

        $user = User::create([
            'name' => $request->get('name'),
            'surname' => $request->get('surname'),
            'email' => $request->get('email'),
            'password' => Hash::make($request->get('password')),
        ]);

        $token = JWTAuth::fromUser($user);

        return response()->json(compact('token'), 200);
    }

    public function logout(){
        JWTAuth::invalidate(JWTAuth::getToken());
        return response()->json([
            'logout'=> 'ok',
        ], 200);
    }

    public function getAuthenticatedUser()
    {
        try {

            if (!$user = JWTAuth::parseToken()->authenticate()) {
                return response()->json(['user_not_found'], 404);
            }

        } catch (Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {

            return response()->json(['token_expired'], $e->getStatusCode());

        } catch (Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {

            return response()->json(['token_invalid'], $e->getStatusCode());

        } catch (Tymon\JWTAuth\Exceptions\JWTException $e) {

            return response()->json(['token_absent'], $e->getStatusCode());

        }

        return response()->json([
            'user' => 'found'
        ], 200);
    }
}
