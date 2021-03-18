<?php

namespace App\Http\Controllers;


use App\Models\Word;
use App\Models\Later;

use Illuminate\Http\Request;

class ComentCont extends Controller
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
    public function post(Request $request)
    {
        $string = $request->input('text');

        $str_arr = array();
        for ($i = 0; $i <= strlen($string) - 1; $i++) {

            $leters = Later::where('lat', $string[$i])->first();
            if (!$leters) {
                $leter = new Later;
                $leter->lat = $string[$i];
                $leter->save();
            }
            array_push($str_arr, $string[$i]);
        }

        $matches = explode(' ', $string);
        foreach ($matches as $wor) {
            $words = Word::where('word', $wor)->first();
            if (!$words) {
                $word = new Word;
                $word->word = $wor;
                $word->save();
            }
        }
        return response()->json(Word::all(), 200);
    }

    //
}
