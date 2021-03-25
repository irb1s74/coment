<?php

namespace App\Http\Controllers;

use App\Models\Word;
use App\Models\Later;
use App\Models\Coment;

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
        $resp_id = '';

        $string = mb_substr($string, 0, null, 'utf-8');
        mb_regex_encoding('UTF-8');
        mb_internal_encoding("UTF-8");

        $string = trim($string);
        $string_let = preg_split('/(?<!^)(?!$)/u', $string);

        $coments = Coment::where('coment', $string)->first();
        if (!$coments) {
            $coment = new Coment;
            $coment->coment = $string;
            $coment->save();
            $resp_id = $coment->id;
        } else {
            $resp_id = $coments->id;
        }


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

        $response = array(
            'id' => $resp_id,
            'key_letters' => implode(',', $resp_leter),
            'key_words' => implode(',', $resp_word)
        );

        return response()->json($response, 200);
    }

    //

    public function one(Request $request)
    {
        $coment = Coment::where('coment', 'LIKE', '%' . $request->input('text') . '%')->first();
        if ($coment) {


            $string = $coment->coment;
            $resp_word = [];
            $resp_leter = [];

            $string = mb_substr($string, 0, null, 'utf-8');
            mb_regex_encoding('UTF-8');
            mb_internal_encoding("UTF-8");

            $string = trim($string);
            $string_let = preg_split('/(?<!^)(?!$)/u', $string);

            for ($i = 0; $i <= count($string_let) - 1; $i++) {
                $test = mb_substr($string_let[$i], 0, null, 'utf-8');
                $leters = Later::where('lat', $test)->first();
                if ($leters) {
                    array_push($resp_leter, $leters->id);
                }
            }
            $matches = explode(' ', $string);
            foreach ($matches as $wor) {
                $words = Word::where('word', $wor)->first();
                if ($words) {
                    array_push($resp_word, $words->id);
                }
            }
            $response = array(
                'id' => $coment->id,
                'сomment' => $coment->coment,
                'key_letters' => implode(',', $resp_leter),
                'key_words' => implode(',', $resp_word),
            );
            return response()->json($response, 200);
        }
    }

    public function del($id)
    {
        if ($com = Coment::find($id)) {
            $com->delete();
        }
    }

    public function all()
    {
        $coments = Coment::all();
        $resp_arr = [];
        foreach ($coments as $com) {
            $string = $com->coment;
            $resp_word = [];
            $resp_leter = [];

            $string = mb_substr($string, 0, null, 'utf-8');
            mb_regex_encoding('UTF-8');
            mb_internal_encoding("UTF-8");

            $string = trim($string);
            $string_let = preg_split('/(?<!^)(?!$)/u', $string);

            for ($i = 0; $i <= count($string_let) - 1; $i++) {
                $test = mb_substr($string_let[$i], 0, null, 'utf-8');
                $leters = Later::where('lat', $test)->first();
                if ($leters) {
                    array_push($resp_leter, $leters->id);
                }
            }
            $matches = explode(' ', $string);
            foreach ($matches as $wor) {
                $words = Word::where('word', $wor)->first();
                if ($words) {
                    array_push($resp_word, $words->id);
                }
            }
            $response = array(
                'id' => $com->id,
                'сomment' => $com->coment,
                'key_letters' => implode(', ', $resp_leter),
                'key_words' => implode(',', $resp_word),
            );
            array_push($resp_arr, $response);
        }
        return response()->json($resp_arr, 200);
    }
}
