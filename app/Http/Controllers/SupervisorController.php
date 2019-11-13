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
            ->get();
        return response()->json([
            'worker' => $worker,
        ], 200);
    }

    public function indexCars($idsub, $idwork)
    {
        $worker = $this::getWorker($idsub,$idwork);
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
        $worker = $this::getWorker($idsub,$idwork);
        if (!$worker->isEmpty()) {
            $user = User::join('cars', 'cars.ordered', '=', 'users.id')
                ->where('cars.created', '=', "$idwork")
                ->where('cars.id', '=', "$idcar")
                ->where('cars.confirm', '=', '1')
                ->select('users.*', 'cars.*')
                ->get();
        } else {
            $user = [];
        }
        return response()->json([
            'worker' => $worker,
            'user' => $user,
        ], 200);
    }

    public function getWorker($idsub , $idwork)
    {
        $worker = User::find($idwork)
            ->where('users.working', '=', "$idsub")
            ->where('users.id', '=', "$idwork")
            ->get();
        return $worker;
    }
}
