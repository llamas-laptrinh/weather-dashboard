<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class WeatherController extends Controller
{
   public function index(){
      $products = \App\Models\Weather::all();
      $arr = [
      'status' => true,
      'message' => "Danh sách Thời tiết",
      'data'=>($products)
      ];
       return response()->json($arr, 200);
   }
   public function create() {}
   public function store(Request $request) {
      $input = $request->all(); 
 $validator = \Validator::make($input, [
   'city' => 'required', 'icon' => 'required'
 ]);
 if($validator->fails()){
    $arr = [
      'success' => false,
      'message' => 'Lỗi kiểm tra dữ liệu Thời tiết',
      'data' => $validator->errors()
    ];
    return response()->json($arr, 200);
 }
 $product = \App\Models\Weather::create($input);
 $arr = ['status' => true,
    'message'=>"Thời tiết đã lưu thành công",
    'data'=>($product)
 ];
 return response()->json($arr, 201);
   }
   public function show($id) {
      $product = \App\Models\Weather::find($id);
      if (is_null($product)) {
         $arr = [
           'success' => false,
           'message' => 'Không có Thời tiết này',
           'dara' => []
         ];
         return response()->json($arr, 200);
      }
      $arr = [
        'status' => true,
        'message' => "Chi tiết Thời tiết ",
        'data'=> ($product)
      ];
      return response()->json($arr, 201);
   }
   public function edit($id) { }
   public function update(Request $request, \App\Models\Weather $product){
      $input = $request->all();
      $validator = \Validator::make($input, [
         'city' => 'required', 
         'icon' => 'required'
      ]);
      if($validator->fails()){
         $arr = [
           'success' => false,
           'message' => 'Lỗi kiểm tra dữ liệu Thời tiết',
           'data' => $validator->errors()
         ];
         return response()->json($arr, 200);
      }
      $product->city = $input['city'];
      $product->icon = $input['icon'];
      $product->save();
      $arr = [
         'status' => true,
         'message' => 'Thời tiết cập nhật thành công',
         'data' =>($product)
      ];
      return response()->json($arr, 200);
    }
    public function destroy( $id ){
      $product = \App\Models\Weather::find($id); 
      $product->delete();
      $arr = [
         'status' => true,
         'message' =>'Thời tiết đã được xóa',
         'data' => [$id,$product],
      ];
      return response()->json($arr, 200);
   }

   //--------------------------
//     public function index(){
//       $products = \App\Models\Weather::all();
//   $arr = [
//   'status' => true,
//   'message' => "Danh sách sản phẩm",
//   'data'=> \App\Http\Resources\Weather::collection($products)
//   ];
//    return response()->json($arr, 200);
//     }
//     public function create() {}
//     public function store(Request $request) {
//         $input = $request->all(); 
//  $validator = \Validator::make($input, [
//    'city' => 'required', 'icon' => 'required'
//  ]);
//  if($validator->fails()){
//     $arr = [
//       'success' => false,
//       'message' => 'Lỗi kiểm tra dữ liệu',
//       'data' => $validator->errors()
//     ];
//     return response()->json($arr, 200);
//  }
//  $product = \App\Models\Weather::create($input);
//  $arr = ['status' => true,
//     'message'=>"Sản phẩm đã lưu thành công",
//     'data'=> new \App\Http\Resources\Weather ($product)
//  ];
//  return response()->json($arr, 201);
//     }
//     public function show($id) {
//       $product = \App\Models\Weather::find($id);
//  if (is_null($product)) {
//     $arr = [
//       'success' => false,
//       'message' => 'Không có sản phẩm này',
//       'dara' => []
//     ];
//     return response()->json($arr, 200);
//  }
//  $arr = [
//    'status' => true,
//    'message' => "Chi tiết sản phẩm ",
//    'data'=> new \App\Http\Resources\Weather($product)
//  ];
//  return response()->json($arr, 201);
//     }
//     public function edit($id) { }
//     public function update(Request $request, \App\Models\Weather $product){
//       $input = $request->all();
//       $validator = \Validator::make($input, [
//          'city' => 'required', 
//          'icon' => 'required'
//       ]);
//       if($validator->fails()){
//          $arr = [
//            'success' => false,
//            'message' => 'Lỗi kiểm tra dữ liệu',
//            'data' => $validator->errors()
//          ];
//          return response()->json($arr, 200);
//       }
//       $product->city = $input['city'];
//       $product->icon = $input['icon'];
//       $product->save();
//       $arr = [
//          'status' => true,
//          'message' => 'Sản phẩm cập nhật thành công',
//          'data' => new \App\Http\Resources\Weather($product)
//       ];
//       return response()->json($arr, 200);
//     }
//     public function destroy( \App\Models\Weather $product ){
//       $product->delete();
//       $arr = [
//          'status' => true,
//          'message' =>'Sản phẩm đã được xóa',
//          'data' => [],
//       ];
//       return response()->json($arr, 200);
//    }
   
}
