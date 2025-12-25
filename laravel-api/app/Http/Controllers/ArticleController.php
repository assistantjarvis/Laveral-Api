<?php

namespace App\Http\Controllers;

use App\Models\Article;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Validator;

class ArticleController extends Controller
{
    /**
     * Display a listing of articles.
     *
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        $articles = Article::orderBy('created_at', 'desc')->get();
        
        return response()->json([
            'success' => true,
            'data' => $articles,
            'count' => $articles->count()
        ]);
    }

    /**
     * Get the latest article.
     *
     * @return JsonResponse
     */
    public function latest(): JsonResponse
    {
        $article = Article::orderBy('created_at', 'desc')->first();
        
        if (!$article) {
            return response()->json([
                'success' => false,
                'message' => 'No articles found'
            ], 404);
        }
        
        return response()->json([
            'success' => true,
            'data' => $article
        ]);
    }

    /**
     * Store a newly created article.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:500',
            'content' => 'required|string',
            'url' => 'nullable|string|max:1000',
            'author' => 'nullable|string|max:255',
            'published_at' => 'nullable|date',
            'is_updated' => 'nullable|boolean',
            'citations' => 'nullable|json',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        $article = Article::create($request->all());

        return response()->json([
            'success' => true,
            'message' => 'Article created successfully',
            'data' => $article
        ], 201);
    }

    /**
     * Display the specified article.
     *
     * @param int $id
     * @return JsonResponse
     */
    public function show($id): JsonResponse
    {
        $article = Article::find($id);

        if (!$article) {
            return response()->json([
                'success' => false,
                'message' => 'Article not found'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $article
        ]);
    }

    /**
     * Update the specified article.
     *
     * @param Request $request
     * @param int $id
     * @return JsonResponse
     */
    public function update(Request $request, $id): JsonResponse
    {
        $article = Article::find($id);

        if (!$article) {
            return response()->json([
                'success' => false,
                'message' => 'Article not found'
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'title' => 'sometimes|string|max:500',
            'content' => 'sometimes|string',
            'url' => 'nullable|string|max:1000',
            'author' => 'nullable|string|max:255',
            'published_at' => 'nullable|date',
            'is_updated' => 'nullable|boolean',
            'citations' => 'nullable',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        $article->update($request->all());

        return response()->json([
            'success' => true,
            'message' => 'Article updated successfully',
            'data' => $article
        ]);
    }

    /**
     * Remove the specified article.
     *
     * @param int $id
     * @return JsonResponse
     */
    public function destroy($id): JsonResponse
    {
        $article = Article::find($id);

        if (!$article) {
            return response()->json([
                'success' => false,
                'message' => 'Article not found'
            ], 404);
        }

        $article->delete();

        return response()->json([
            'success' => true,
            'message' => 'Article deleted successfully'
        ]);
    }
}
