<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('articles', function (Blueprint $table) {
            $table->id();
            $table->string('title', 500);
            $table->text('content');
            $table->string('url', 1000)->nullable();
            $table->string('author', 255)->nullable();
            $table->timestamp('published_at')->nullable();
            $table->boolean('is_updated')->default(false);
            $table->json('citations')->nullable();
            $table->timestamps();
            
            // Indexes for better query performance
            $table->index('created_at');
            $table->index('is_updated');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('articles');
    }
};
