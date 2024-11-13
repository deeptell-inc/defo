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
        Schema::create('user_surveys', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('fp_name');
            $table->date('interview_date');
            $table->time('interview_time');
            $table->string('interview_location');
            $table->string('residence_area');
            $table->string('phone_number');
            $table->integer('interview_count');
            $table->integer('interview_evaluation');
            $table->text('explanation_clarity');
            $table->text('fp_attitude');
            $table->text('reason_for_fp_att');
            $table->text('reaction_to_questions');
            $table->text('topics_discussed');
            $table->text('purpose_of_insurance');
            $table->text('expectations_for_next_meeting');
            $table->text('thoughts_on_guarantee_and_payment');
            $table->boolean('is_next_meeting_decided')->default(false);
            $table->text('info_wanted_next_time');
            $table->text('overall_impression_and_improvements');
            $table->boolean('wish_to_change_fp')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_surveys');
    }
};
