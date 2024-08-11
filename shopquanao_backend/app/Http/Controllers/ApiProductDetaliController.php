<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Color;
use App\Models\Image;
    use App\Models\Product;
    use App\Models\ProductDetail;
use App\Models\Size;
use Illuminate\Http\Request;
    use Illuminate\Support\Facades\Validator;
    use Illuminate\Support\Str;
    class ApiProductDetaliController extends Controller
    {
        /**
         * Display a listing of the resource.
         */

         public function handlecolorprodetail($color_id)
         {
             $colorDetail = Color::where('id', $color_id)->get();
            return response()->json(['colors' => $colorDetail],200);
         }

         public function handlesizeprodetail($color_id, $product_id)
         {
             $sizeDetail = ProductDetail::where('color_id', $color_id)
                 ->where('product_id', $product_id)
                 ->get(['size_id'])
                 ->map(function ($size) {
                     return ['size_id' => $size->size_id];
                 });
         
             return response()->json(['sizes' => $sizeDetail->toArray()],200);
         }
         
    public function categoryproducts($categoryId)
        {
            if ($categoryId) {
            // Check if the category exists
            $category = Category::find($categoryId);

            if (!$category) {
                return response()->json(['message' => 'Không tìm thấy loại sản phẩm'], 404);
            }

            $products = Product::with(['productdetails', 'image'])
                ->where('status', 1)
                ->where('category_id', $categoryId)
                ->get();

            $result = $products->map(function ($product) {
            $images = Image::where('product_id', $product->id)->get();
            $firstImage = $images->first();
            $firstProductDetail = $product->productdetails->first();

            if ($firstImage) {
                $imagePath = url("/upload/images/{$firstImage->path}");
            } else {
                $imagePath = null;
            }

            return [
                'id' => $product->id,
                'slug' => $product->slug,
                'price' => optional($firstProductDetail)->price,
                'category_id' => $product->category_id,
                'product_id' => $product->id,
                'product_name' => $product->name,
                'image_path' => $imagePath,
            ];
        })->filter(function ($item) {
            // Lọc bỏ các mục với image_path là null
            return $item['image_path'] !== null;
        });

        // Trả về dữ liệu JSON
        return response()->json(['categoryproduct' => $result], 200);
    } else {
        return response()->json(['message' => 'Vui lòng cung cấp id loại sản phẩm'], 400);
    }
}

         

public function imgproduct()
{
    $products = Product::with(['productdetails', 'image'])->where('status', 1)->get();

    $result = $products->map(function ($product) {
        $images = Image::where('product_id', $product->id)->get();
        $firstImage = $images->first();
        $firstProductDetail = $product->productdetails->first();

        if ($firstImage) {
            $imagePath = url("/upload/images/{$firstImage->path}");
        } else {
            $imagePath = null;
        }

        return [
            'id' => $product->id,
            'slug' => $product->slug,
            'price' => optional($firstProductDetail)->price,
            'category_id' => $product->category_id,
            'product_id' => $product->id,
            'product_name' => $product->name,
            'image_path' => $imagePath,
        ];
    })->filter(function ($item) {
        // Lọc bỏ các mục với image_path là null
        return $item['image_path'] !== null;
    });

    // Trả về dữ liệu JSON dưới dạng mảng
    return response()->json(['productImage' => $result->values()->all()], 200);
}


        public function index()
        {
            
           
            
        }

        /**
         * Store a newly created resource in storage.
         */
        public function store(Request $request)
        {
            try {
                $validator = Validator::make($request->all(), [
                    'quantity' => 'required',
                    'price' => 'required',
                    'color_id' => 'required',
                    'size_ids' => 'required|array',
                    //'path.*' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
                ]);
        
                if ($validator->fails()) {
                    return response()->json(['message' => $validator->errors()], 422);
                }
        
                $colors = $request->color_id;
                $sizes = $request->size_ids;
                $quantity = $request->quantity;
                $price = $request->price;
                $product_id = $request->product_id;
                
                // Lặp qua mảng kích thước
                foreach ($sizes as $size) {
                    $productDetail = new ProductDetail;
                    $productDetail->quantity = $quantity;
                    $productDetail->price = $price;
                    $productDetail->color_id = $colors;
                    $productDetail->size_id = $size;
                    $productDetail->product_id = $product_id;
                    $productDetail->save();       
                }

                $findColor = Color::Find($colors);
                $colorName = $findColor->name;
                //use Illuminate\Support\Str;
                $slugColors=Str::slug($colorName);

                if ($request->hasFile('path')) {
                    $images = $request->file('path');

                    $count=1;
                    // Sử dụng chỉ số để xác định mảng màu và kích thước
                    foreach ($images as $image) {
                       
                        // $path = $image->store('images', 'public');
                        $path = 'hinh-'.$slugColors.'-'.$product_id.'-'.$count.'.'.$image->getClientOriginalExtension();
                        // lấy  đuôi file mở rộng 
                        $image->move(public_path('upload/images'),$path); 
                        
                        $imageModel = new Image;
                        $imageModel->path = $path;
                        $imageModel->color_id = $colors;
                        $imageModel->product_id =$product_id;
                        $imageModel->product_details_id=$productDetail->id;
                        $imageModel->save();
                        $count ++;
                    }
                }
                return response()->json(['product' => 'thành công'], 200);
            } catch (\Throwable $th) {
                return response()->json(['messageB' => $th->getMessage()], 500);
            }
        }
        
        

        

        

        public function showadmin(string $id)
        {
            $productdetails=ProductDetail::find($id);

            if(!$productdetails)
            {
                return  response()->json(['message'=>'không tồn tại']);
            }
          //
            return  response()->json(['productdetail'=>$productdetails,
           ]);
        }

        /**
         * Display the specified resource.
         */
        public function show(string $id)
        {
            $product = Product::with('productdetails', 'productdetails.color', 'productdetails.size')->where('id', $id)->get();

            $products = $product->map(function ($pro) {
                $category = Category::find($pro->category_id);
            
                // Iterate over the collection of product details
                $productDetails = $pro->productdetails->map(function ($detail) {
                    // Access the 'id' property for each product detail
                    $productDetailId = $detail->id;
                    
                    $images = Image::where('product_details_id', $productDetailId)->get();
            
                    // lấy 1 hình ảnh
                    $firstImage = $images->first();
            
                    // lấy tất cả hình ảnh
                    $allImages = $images->map(function ($image) {
                        return ['image' => url("upload/images/{$image['path']}")];
                    })->all();
            
                  
                    if (empty($firstImage) && empty($allImages)) {
                        return null; // Skip this product detail
                    }
            
                  
            
                    return [
                        'detail_id' => $productDetailId,
                        'color_id'=>$detail->color_id,
                        'allImages' => empty($allImages) ? [] : $allImages,
                        'images' => empty($firstImage) ? '' : url("upload/images/{$firstImage->path}"),
                    ];
                })->filter(); // Remove null values
            
                return [
                    'category_id' => $category->id,
                    'product_id' => $pro->id,
                    'category_name' => $category->name,
                    'product_name' => $pro->name,
                    'product_Details' => array_values($productDetails->toArray()), // Convert the collection to an array
                ];
            });
            
            return response()->json(['products' => $products], 200);
        }
        

        /**
         * Update the specified resource in storage.
         */
        public function update(Request $request, string $id)
        {
            try {
                
            $productdetail=ProductDetail::Find($id);
            if(!$productdetail)
            {
                return response()->json(['message'=>'Không tìm thấy','Id'=>$id]);
            }
            $validate=$request->validate([
                'quantity'=>$request->quantity,
                'price'=>$request->price,
                'color_id'=>$request->color_id,
                'size_id'=>$request->size_id,
                'product_id'=>$request->product_id,
            ]);
            $productdetail->fill($validate);
            $productdetail->save();
            return response()->json(['message'=>'thành công','productdetail'=>$productdetail],200);


            } catch (\Throwable $th) {
                return response()->json(['message1'=>$th->getMessage()],500);
            }
        }

        /**
         * Remove the specified resource from storage.
         */
        public function destroy(string $id)
        {
            $productdetail=ProductDetail::Find($id);
            if(!$productdetail)
            {
                response()->json(['message'=>'Id khôn tồn tại','product'=>$productdetail]);
            }
            $productdetail->delete();
            return response()->json(['message'=>'Xóa thành công','id'=>$id]);
        }
    }
