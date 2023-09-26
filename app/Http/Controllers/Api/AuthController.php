<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\SignupRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{

    /**
     * Handle an incoming signup request.
     * @param \App\Http\Requests\SignupRequest $request
     * @return \Illuminate\Http\Response
     */
    function signup(SignupRequest $request) : Response
    {
        
        $data = $request->validated();

        /** @var User $user */
        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => bcrypt($data['password'])
        ]);

        $token = $user->createToken('main')->plainTextToken;

        return response([
            'user' => $user,
            'token' => $token
        ]);
    }

    /**
     * Handle an incoming login request.
     * @param \App\Http\Requests\LoginRequest $request
     * @return \Illuminate\Http\Response
     */
    function login(LoginRequest $request) : Response
    {
        
        $credentials = $request->validated();
        
        if (!Auth::attempt($credentials)) {
            
            return response([
                'message' => 'Provided email address or password is incorrect'
            ], 422);
        }

        /** @var User $user */
        $user = Auth::user();

        $token = $user->createToken('main')->plainTextToken;

        return response([
            'user' => $user,
            'token' => $token
        ]);
    }

    /**
     * Handle an incoming logout request.
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    function logout(Request $request) : Response 
    {
        /** @var User $user */
        $user = $request->user();

        $user->currentAccessToken()->delete();

        return response('', 204);
    }
}
