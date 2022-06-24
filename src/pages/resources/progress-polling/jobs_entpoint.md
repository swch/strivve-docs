
GET /place_card_on_single_site_jobs/{{JOB_ID}}
{
    "id": 4189,
    "cardholder_id": 3288,
    "card_id": 2880,
    "account_id": 4476,
    "status": "AUTH",
    "termination_type": null,
    "custom_data": {
        "job_foo": "foo",
        "job_bar": "job_bar"
    },
    ...,
    "credential_requests": []
}

GET /place_card_on_single_site_jobs/{{JOB_ID}}
{
    "id": 4189,
    "cardholder_id": 3288,
    "card_id": 2880,
    "account_id": 4476,
    "status": "LOGIN_SUBMITTED",
    "termination_type": null,
    "custom_data": {
        "job_foo": "foo",
        "job_bar": "job_bar"
    },
    ...,
    "credential_requests": []
}

GET /place_card_on_single_site_jobs/{{JOB_ID}}
{
    "id": 4189,
    "cardholder_id": 3288,
    "card_id": 2880,
    "account_id": 4476,
    "status": "PENDING_NEWCREDS",
    "termination_type": null,
    "custom_data": {
        "job_foo": "foo",
        "job_bar": "job_bar"
    },
    ...,
    "credential_requests": [
        {
            "job_id": 4190,
            "type": "credential_request",
            "message": "this is not used",
            "envelope_id": "xnY/FN6i74V/iURG6mjFfg=="
        }
    ]
}

PUT /place_card_on_single_site_jobs/{{JOB_ID}}
"x-cardsavr-envelope-id" : "xnY/FN6i74V/iURG6mjFfg=="
{
    "account": {
        "account_identification": {
            "username": "good_email",
            "password": "password"
        }
    }
}

GET /place_card_on_single_site_jobs/{{JOB_ID}}
{
    "id": 4189,
    "cardholder_id": 3288,
    "card_id": 2880,
    "account_id": 4476,
    "status": "LOGIN_RESUBMITTED",
    "termination_type": null,
    "custom_data": {
        "job_foo": "foo",
        "job_bar": "job_bar"
    },
    ...,
    "credential_requests": []
}

GET /place_card_on_single_site_jobs/{{JOB_ID}}
{
    "id": 4189,
    "cardholder_id": 3288,
    "card_id": 2880,
    "account_id": 4476,
    "status": "PENDING_TFA",
    "termination_type": null,
    "custom_data": {
        "job_foo": "foo",
        "job_bar": "job_bar"
    },
    ...,
    "credential_requests": [
        {
            "job_id": 4191,
            "type": "tfa_request",
            "message": "this is not used",
            "envelope_id": "xjFqcn4NQK5cntB3V2z46A=="
        }
    ]
}

PUT /place_card_on_single_site_jobs/{{JOB_ID}}
"x-cardsavr-envelope-id" : "xjFqcn4NQK5cntB3V2z46A=="
{
    "account": {
        "tfa": "1234"
    }
}

GET /place_card_on_single_site_jobs/{{JOB_ID}}
{
    "id": 4189,
    "cardholder_id": 3288,
    "card_id": 2880,
    "account_id": 4476,
    "status": "TFA_SUBMITTED",
    "termination_type": null,
    "custom_data": {
        "job_foo": "foo",
        "job_bar": "job_bar"
    },
    ...,
    "credential_requests": []
}


GET /place_card_on_single_site_jobs/{{JOB_ID}}
{
    "id": 4189,
    "cardholder_id": 3288,
    "card_id": 2880,
    "account_id": 4476,
    "status": "UPDATING",
    "termination_type": null,
    "custom_data": {
        "job_foo": "foo",
        "job_bar": "job_bar"
    },
    ...,
    "credential_requests": []
}

GET /place_card_on_single_site_jobs/{{JOB_ID}}
{
    "id": 4191,
    "cardholder_id": 3290,
    "card_id": 2882,
    "account_id": 4478,
    "status": "SUCCESSFUL",
    "status_message": "Successful",
    "termination_type": "BILLABLE",
    "custom_data": {
        "job_foo": "foo",
        "job_bar": "job_bar"
    },
    ...,
    "credential_requests": []
}