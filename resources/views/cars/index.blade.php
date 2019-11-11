@extends('welcome')

@section('content')
    <h3 class="h3">Cars</h3>

    @if(count($cars) >= 1)
        <table class="table">
            <tr>
                <th scope="col">Brand</th>
                <th scope="col"></th>
            </tr>
        @foreach($cars as $car)
                <tr>
                    <th>{{$car->brand}}</th>
                    <th><a href="cars/{{$car->id}}" class="btn btn-primary">view</a></th>
                </tr>
        @endforeach
    </table>
        {{$cars->links()}}
    @else
    <h3>No cars found</h3>
    @endif
@endsection()
