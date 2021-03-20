<?php

namespace App\Http\Controllers;

use App\Models\Word;
use Illuminate\Http\Request;

class TestCont extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    public function test(Request $request)
    {
        $string = $request->input('text');

        $word = new Word;
        $word->word = $string;
        $word->save();
    }
    //
}
