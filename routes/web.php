<?php

use App\Http\Controllers\HomePageController;
use App\Http\Controllers\ZoneExplanationController;
use Illuminate\Support\Facades\Route;

Route::get("", fn() => to_route('coord-changer.index'));
Route::resource("coord-changer", HomePageController::class)
    ->only("index");

Route::get("coord-changer/zone-explanation", [ZoneExplanationController::class, 'show'])->name('coord-changer.zone-explanation');