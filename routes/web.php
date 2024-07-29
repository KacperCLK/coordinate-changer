<?php

use App\Http\Controllers\HomePageController;
use Illuminate\Support\Facades\Route;

Route::get("", fn () => to_route('coord-changer.index'));
Route::resource("coord-changer", HomePageController::class)
    ->only("index");