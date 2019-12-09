<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Subsidiary;
use App\User;
use App\Car;

class SupervisorController extends Controller
{
    public function indexWorkers($idsub)
    {
        $subsidiary = Subsidiary::find($idsub);
        $worker = User::select('users.*')
            ->where('working', '=', $idsub)
            ->get();
        return response()->json([
            'sub' => $subsidiary,
            'workers' => $worker,
        ], 200);
    }

    public function showWorker($idsub, $idwork)
    {
        $worker = User::join('subsidiaries', 'users.working', '=', 'subsidiaries.id')
            ->where('subsidiaries.id', '=', "$idsub")
            ->Where('users.id', '=', "$idwork")
            ->select('subsidiaries.name as subname', 'subsidiaries.*', 'users.*')
            ->first();
        return response()->json([
            'worker' => $worker,
        ], 200);
    }

    public function indexCars($idsub, $idwork)
    {
        $worker = $this::getWorker($idsub, $idwork);
        $cars = Car::join('users', 'cars.created', '=', 'users.id')
            ->join('subsidiaries', 'users.working', '=', 'subsidiaries.id')
            ->where('subsidiaries.id', '=', "$idsub")
            ->where('users.id', '=', "$idwork")
            ->where('cars.confirm', '=', '1')
            ->select('cars.*')
            ->get();
        return response()->json([
            'worker' => $worker,
            'cars' => $cars,
        ], 200);
    }

    public function showUser($idsub, $idwork, $idcar)
    {
        $worker = $this::getWorker($idsub, $idwork);
        $user = [];
        if ($worker->exists()) {
            $user = User::join('cars', 'cars.ordered', '=', 'users.id')
                ->where('cars.created', '=', "$idwork")
                ->where('cars.id', '=', "$idcar")
                ->where('cars.confirm', '=', '1')
                ->select('users.*', 'cars.*')
                ->first();
        } else {
            $user = [];
        }
        return response()->json([
            'worker' => $worker,
            'user' => $user,
        ], 200);
    }

    public function getWorker($idsub, $idwork)
    {
        $account = User::join('subsidiaries','subsidiaries.id','=','users.working')
            ->where('users.id','=', $idwork)
            ->where('subsidiaries.id','=', $idsub)
            ->select('users.*','subsidiaries.name as workingid')
            ->first();
        return $account;
    }

    public function search(Request $request)
    {
        $user = User::join('cars', 'cars.ordered', '=', 'users.id')
            ->where('name', 'LIKE', '%' . $request['value'] . '%')
            ->orWhere('email', 'LIKE', '%' . $request['value'] . '%')
            ->select('users.*', 'cars.*')
            ->get();
        if (count($user) == 0) {
            $cars = Car::join('users', 'users.id', '=', 'cars.ordered')
                ->where('brand', 'LIKE', '%' . $request['value'] . '%')
                ->orWhere('model', 'LIKE', '%' . $request['value'] . '%')
                ->select('users.*', 'cars.*')
                ->get();
            return response()->json([
                'cars' => $cars,
            ], 200);
        }
        return response()->json([
            'user' => $user,
        ], 200);
    }
}
