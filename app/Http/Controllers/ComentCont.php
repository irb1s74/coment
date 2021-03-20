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
        $resp_word = [];
        $resp_leter = [];

        $string = mb_substr($string, 0, null, 'utf-8');

        mb_regex_encoding('UTF-8');
        mb_internal_encoding("UTF-8");
        $string_let = preg_split('/(?<!^)(?!$)/u', $string);
        for ($i = 0; $i <= count($string_let) - 1; $i++) {
            $test = mb_substr($string_let[$i], 0, null, 'utf-8');

            $leters = Later::where('lat', $test)->first();
            if (!$leters) {
                $leter = new Later;
                $leter->lat = $test;
                $leter->save();
                array_push($resp_leter, $leter->id);
            } else {
                array_push($resp_leter, $leters->id);
            }
        }

        $matches = explode(' ', $string);
        foreach ($matches as $wor) {
            $words = Word::where('word', $wor)->first();
            if (!$words) {
                $word = new Word;
                $word->word = $wor;
                $word->save();
                array_push($resp_word, $word->id);
            } else {
                array_push($resp_word, $words->id);
            }
        }



        return response()->json(array($resp_leter, $resp_word), 200);
    }

    //
}
