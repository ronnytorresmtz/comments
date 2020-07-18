<?php

use App\Comment;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Tool API Routes
|--------------------------------------------------------------------------
|
| Here is where you may register API routes for your tool. These routes
| are loaded by the ServiceProvider of your tool. You're free to add
| as many additional routes to this file as your tool may require.
|
*/


// Route::get('comments',[CommentController::class,'index']);

// Route::post('comments', [CommentController::class,'store']);

// Route::resource('comments', CommentController::class);

Route::get('/comments', function(Request $request) {

    $showOnlyMyComments = ($request->showOnlyMyComments == "false") ? false : true;

    $comments = Comment::join('users', 'comments.user_id', '=', 'users.id')
            ->select(['comments.id', 'users.id as userId', 'users.name as username', 'comments.text', 'comments.created_at'])
                ->where('comments.resourceId', '=', $request->resourceId)
                ->where('comments.resourceName', '=', $request->resourceName)
                ->when(!$showOnlyMyComments, function($query) use ($request) {
                    return $query->where('comments.company_id', '=', $request->company_id);
                })
                ->when($showOnlyMyComments, function($query) use ($request) {
                    return $query->where('comments.user_id', '=', auth()->user()->id);
                })
                ->orderBy('comments.created_at', 'desc')

            ->paginate($request->per_page);

    return response()->json($comments);

});

Route::post('/comments', function(Request $request) {

    Log::info([$request]);

    $now = Carbon::now();

    $comment = new Comment;
    $comment->resourceName = $request->resourceName;
    $comment->resourceId = $request->resourceId;
    $comment->text = $request->text;
    $comment->company_id = $request->company_id;
    $comment->user_id = $request->user_id;
    $comment->created_at = $now;
    $comment->updated_at = $now;
    $comment->save();

    if ($comment) {
        return response()->json(['comment' => $comment, 'success' => true], 200);
    } else {
        return response()->json(['success' => false], 400);
    }
   
});

Route::delete('/comments/{id}', function($id) {

    $comment = Comment::find($id)->delete();
    
    if ($comment) {
        return response()->json(['success' => true], 200);
    } else {
        return response()->json(['success' => false], 400);
    }

});
    