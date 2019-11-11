@extends('welcome')

@section('content')
    <h3 class="h3">{{$car->brand}}</h3>
    <a href="/cars" class="btn btn-primary">Back</a>
    <table class="table">
        <tr>
            <th scope="col">Model</th>
            <th scope="col">Year</th>
            <th scope="col">Price €</th>
        </tr>
    <tr>
        <th>{{$car->model}}</th>
        <th>{{$car->year}}</th>
        <th>{{$car->price}}</th>
    </tr>
    </table>
@endsection()
