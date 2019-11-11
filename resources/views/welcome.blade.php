<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>{{config('app.name','Car')}}</title>
        <script src="/js/app.js"></script>
        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css?family=Nunito:200,600" rel="stylesheet">
        <!-- Style -->
        <link rel="stylesheet" href="{{asset('css/app.css')}}">
        <link href = {{ asset('bootstrap/css/bootstrap.css') }} rel="stylesheet" />
    </head>
    <body>
    @include('nav.navbar')
    <div name="container">
        @yield('content')
    </div>
    </body>
</html>
