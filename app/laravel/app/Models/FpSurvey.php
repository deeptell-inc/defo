<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FpSurvey extends Model
{
    use HasFactory;

    protected $fillable = [
        'company_name',
        'fp_name',
        'phone_number',
        'interview_count',
        'interview_date',
        'interview_location',
        'interviewee',
        'discussion_content',
        'interview_feedback',
        'interview_result',
        'application_insurance_company',
        'application_product',
        'contracts',
        'ac_total',
        'first_year_fee',
        'next_year_fee',
        'has_next_meeting',
        'next_meeting_scheduled',
        'next_meeting_date',
        'next_meeting_content',
        'consideration_content',
        'future_response_content',
        'on_hold_reason',
        'on_hold_deadline',
        'cancellation_reason',
        'our_representative_name'
    ];
}
