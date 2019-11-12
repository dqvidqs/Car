<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Subsidiary;
use App\User;
use App\Car;

class SupervisorController extends Controller
{
    public function indexWorkers($subid)
    {
        $subsidiary = Subsidiary::find($subid);
        $worker = User::select('users.*')->where('working', '=', $subid)
            ->get();
        return response()->json([
            'sub' => $subsidiary,
            'workers' => $worker,
        ], 200);
    }

    public function showWorker($a, $b)
    {
        return 'ok';
        /*$subsidiary = Subsidiary::find($subid);
        $worker = User::select('users.*')->where('working', '=', $subid)
            ->get();
        return response()->json([
            'sub' => $subsidiary,
            'workers' => $worker,
        ], 200);*/
        $sers = User::join('users', 'users.id', '=', 'working')
            //->where('user.id', '=', $workerid)
            ->select('users.*', 'subsidiaries.*')
            ->get();
        return response()->json([
            'sub' => $sers,
        ], 200);
    }

    public function indexCars($subid, $workerid)
    {
        return 'ok';
        //$worker = User::select('users.*')->where('working', '=', $subid)->get();
        //$cars = Car::select('cars.*')->where('created', '=', $workerid)->get();
        /*$cars = Car::Join('cars', 'users.id', '=', 'cars.created')
            ->get();
        return response()->json([
            'workers' => $worker,
 */
    }
}
