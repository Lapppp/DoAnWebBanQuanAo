<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;// api
use Illuminate\Validation\Rule;
class ApiCategoryController extends Controller
{


    public function getCategory()
{
    // Lấy dữ liệu từ cơ sở dữ liệu
    $categories = Category::where('category_id', null)->get();

    $result = $categories->map(function ($parentCategory) {
        $childrenCategories = Category::where('category_id', $parentCategory->id)->get();

        // Chuyển đổi dữ liệu thành mảng
        $childrenArray = $childrenCategories->map(function ($childCategory) {
            return [
                'id'=>$childCategory->id,
                'cate' => $childCategory->name,
            ];
        });

        return [
            'id' => $parentCategory->id,
            'parent_category_name' => $parentCategory->name,
            
            'children_name' => $childrenArray->toArray(),
        ];
    });

    // Trả về dữ liệu dưới dạng JSON
    return response()->json(['categories' => $result]);
}


   

    public function getCategoryData()
    {
        // Lấy dữ liệu từ cơ sở dữ liệu
        $categories = Category::where('category_id', null)->get();

        $result = $categories->map(function ($parentCategory) {
            $childrenCategories = Category::where('category_id', $parentCategory->id)->get();
    
            // Chuyển đổi dữ liệu thành mảng
            $childrenArray = $childrenCategories->map(function ($childCategory) {
                return [
                    'id'=>$childCategory->id,
                    'category_name' => $childCategory->name,
                ];
            });
    
            return [
                'id' => $parentCategory->id,
                'parent_category_name' => $parentCategory->name,
                
                'children_name' => $childrenArray->toArray(),
            ];
        });
    
        // Trả về dữ liệu dưới dạng JSON
        return response()->json(['categories' => $result]);
    }

    public function index()
    {

        
        $category= Category::with('products')->get();
        return response()->json(['category'=>$category],200);   
        
    }

    public function getallnamecategory()
    {

        
        $category= Category::where('category_id',null)->get('name');
        return response()->json(['parent_category_name'=>$category],200);   
        
    }
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
{
    $validator = Validator::make($request->all(), [
        'name' => [
            'required',
            // hàm closure sửa dụng biến bên ngoài scope 
           Rule::unique('categories','name')->where(function($query) use ($request) {
            return $query->where('category_id',$request->input('category_id'));

           })
          
        ],
        'category_id' => 'nullable|exists:categories,id',
    ], [
        'name.required' => 'Tên không được bỏ trống',
        'name.unique' => 'Tên đã tồn tại trong danh mục này',
    ]);

    if ($validator->fails()) {
        return response()->json(['validate_err' => $validator->errors()], 422);
    }

    Category::create([
        'name' => $request->input('name'),
        'category_id' => $request->input('category_id'),
    ]);

    return response()->json(['message' => 'Thành Công'], 200);
}

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
{
   
        try {
            $categoriesData = $request->input('categories');

            foreach ($categoriesData as $categoryData) {
                $parentId = $categoryData['id'];
                $parentCategoryName = $categoryData['parent_category_name'];

                // Update the parent category
                Category::where('id', $parentId)->update(['name' => $parentCategoryName]);

                // Update child categories
                foreach ($categoryData['children_name'] as $child) {
                    $childId = $child['id'];
                    $childName = $child['cate'];

                    Category::where('id', $childId)->update(['name' => $childName]);
                }
            }

            return response()->json(['message' => 'Categories updated successfully']);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    
}


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
