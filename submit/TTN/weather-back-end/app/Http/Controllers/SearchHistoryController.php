<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\SearchHistory;
use App\Models\User;

class SearchHistoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {    
        $user_id = $request->input('user_id', null);
         if ($user_id !== null) {
        $SearchHistorys = \App\Models\SearchHistory::where('user_id', $user_id)->get();

        $arr = [
            'status' => true,
            'message' => "Lịch sử tìm kiếm",
            'data' => $SearchHistorys
        ];

        return response()->json($arr, 200);
    } else {
        $arr = [
            'status' => false,
            'message' => "Thiếu thông tin user_id",
            'data' => []
        ];

        return response()->json($arr, 400);
    }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $input = $request->all(); 
        $validator = \Validator::make($input, [
        'search' => 'required',
        'user_id' => 'required|exists:users,id',
        ]);
        if($validator->fails()){
            $arr = [
            'success' => false,
            'message' => 'Lỗi kiểm tra dữ liệu',
            'data' => $validator->errors()
        ];
        return response()->json($arr, 200);
        }
        $SearchHistory = \App\Models\SearchHistory::create($input);
        $arr = ['status' => true,
            'message'=>"Đã lưu lịch sử thành công",
            'data'=> $SearchHistory
        ];
        return response()->json($arr, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $SearchHistory = \App\Models\SearchHistory::find($id);
        if (is_null($SearchHistory)) {
            $arr = [
            'success' => false,
            'message' => 'Không có lịch sử tìm kiếm này',
            'dara' => []
            ];
            return response()->json($arr, 200);
        }
        $arr = [
        'status' => true,
        'message' => "Chi tiết lịch sử tìm kiếm ",
        'data'=> $SearchHistory
        ];
        return response()->json($arr, 201);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $input = $request->all();
        $validator = \Validator::make($input, [
            'search' => 'required',
            'user_id' => 'required',
        ]);
        if($validator->fails()){
            $arr = [
            'success' => false,
            'message' => 'Lỗi kiểm tra dữ liệu',
            'data' => $validator->errors()
            ];
            return response()->json($arr, 200);
        }
        $SearchHistory=\App\Models\SearchHistory::find($id);
        $SearchHistory->update($request->all());
        // return $product;
        // $SearchHistory->search = $input['search'];
        // $SearchHistory->user_id = $input['user_id'];
        // $SearchHistory->save();
        $arr = [
            'status' => true,
            'message' => 'Lịch sử cập nhật thành công',
            'data' => $SearchHistory
        ];
        return response()->json($arr, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {   \App\Models\SearchHistory::destroy($id);
        $arr = [
            'status' => true,
            'message' =>'Lịch sử tìm kiếm này đã được xóa',
            'data' => [],
        ];
        return response()->json($arr, 200);
    }
}
