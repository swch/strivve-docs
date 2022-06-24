GET /place_card_on_single_site_jobs/messages/cardholders/{{CARDHOLDER_ID}}
or
GET /place_card_on_single_site_jobs/messages/place_card_on_single_site_jobs/{{JOB_ID}}
[
    {
        "job_id": 4319,
        "type": "job_status",
        "message": {
            "status": "AUTH",
            "job_timeout": 835815,
            "percent_complete": 0
        }
    }
]

GET /place_card_on_single_site_jobs/messages/cardholders/{{CARDHOLDER_ID}}
[
    {
        "job_id": 4319,
        "type": "tfa_request",
        "message": "this is not used",
        "envelope_id": "bdNruAXhrc3jhLfmpD5naA=="
    },
    {
        "job_id": 4319,
        "type": "job_status",
        "message": {
            "status": "AUTH",
            "job_timeout": 833602,
            "percent_complete": 1.5
        }
    },
    {
        "job_id": 4319,
        "type": "job_status",
        "message": {
            "status": "AUTH",
            "job_timeout": 833483,
            "percent_complete": 3
        }
    },
    {
        "job_id": 4319,
        "type": "job_status",
        "message": {
            "status": "AUTH",
            "job_timeout": 833392,
            "percent_complete": 4.5
        }
    },
    {
        "job_id": 4319,
        "type": "job_status",
        "message": {
            "status": "AUTH",
            "job_timeout": 832983,
            "percent_complete": 6
        }
    },
    {
        "job_id": 4319,
        "type": "job_status",
        "message": {
            "status": "AUTH",
            "job_timeout": 832881,
            "percent_complete": 7.5
        }
    },
    {
        "job_id": 4319,
        "type": "job_status",
        "message": {
            "status": "AUTH",
            "job_timeout": 832016,
            "percent_complete": 9
        }
    },
    {
        "job_id": 4319,
        "type": "job_status",
        "message": {
            "status": "AUTH",
            "job_timeout": 831931,
            "percent_complete": 10.5
        }
    },
    {
        "job_id": 4319,
        "type": "job_status",
        "message": {
            "status": "AUTH",
            "job_timeout": 831511,
            "percent_complete": 12
        }
    },
    {
        "job_id": 4319,
        "type": "job_status",
        "message": {
            "status": "AUTH",
            "job_timeout": 831473,
            "percent_complete": 13.5
        }
    },
    {
        "job_id": 4319,
        "type": "job_status",
        "message": {
            "status": "LOGIN_SUBMITTED",
            "job_timeout": 831339,
            "percent_complete": 15
        }
    },
    {
        "job_id": 4319,
        "type": "job_status",
        "message": {
            "status": "LOGIN_SUBMITTED",
            "job_timeout": 828982,
            "percent_complete": 16.5
        }
    },
    {
        "job_id": 4319,
        "type": "job_status",
        "message": {
            "status": "LOGIN_SUBMITTED",
            "job_timeout": 828942,
            "percent_complete": 18
        }
    },
    {
        "job_id": 4319,
        "type": "job_status",
        "message": {
            "status": "LOGIN_SUBMITTED",
            "job_timeout": 827792,
            "percent_complete": 19.5
        }
    },
    {
        "job_id": 4319,
        "type": "job_status",
        "message": {
            "status": "LOGIN_SUBMITTED",
            "job_timeout": 827692,
            "percent_complete": 21
        }
    },
    {
        "job_id": 4319,
        "type": "job_status",
        "message": {
            "status": "PENDING_TFA",
            "job_timeout": 827557,
            "percent_complete": 21
        }
    }
]

PUT /place_card_on_single_site_jobs/{{JOB_ID}}
"x-cardsavr-envelope-id" : "bdNruAXhrc3jhLfmpD5naA=="
{
    "account": {
        "tfa": "1234"
    }
}
or
POST /messages/place_card_on_single_site_jobs/{{JOB_ID}}/credential_responses
{
    "job_id": 4319,
    "envelope_id" : "bdNruAXhrc3jhLfmpD5naA==",
    "message": "1234"
}


GET /place_card_on_single_site_jobs/messages/cardholders/{{CARDHOLDER_ID}}
[
    {
        "job_id": 4319,
        "type": "job_status",
        "message": {
            "status": "TFA_CODE_RECEIVED",
            "job_timeout": 795185,
            "percent_complete": 22.5
        }
    },
    {
        "job_id": 4319,
        "type": "job_status",
        "message": {
            "status": "TFA_CODE_RECEIVED",
            "job_timeout": 794710,
            "percent_complete": 24
        }
    },
    {
        "job_id": 4319,
        "type": "job_status",
        "message": {
            "status": "TFA_CODE_RECEIVED",
            "job_timeout": 794191,
            "percent_complete": 25.5
        }
    },
    {
        "job_id": 4319,
        "type": "job_status",
        "message": {
            "status": "TFA_CODE_RECEIVED",
            "job_timeout": 794145,
            "percent_complete": 27
        }
    },
    {
        "job_id": 4319,
        "type": "job_status",
        "message": {
            "status": "TFA_SUBMITTED",
            "job_timeout": 793655,
            "percent_complete": 28.5
        }
    },
    {
        "job_id": 4319,
        "type": "job_status",
        "message": {
            "status": "TFA_SUBMITTED",
            "job_timeout": 790889,
            "percent_complete": 30
        }
    },
    {
        "job_id": 4319,
        "type": "job_status",
        "message": {
            "status": "TFA_SUBMITTED",
            "job_timeout": 790823,
            "percent_complete": 31.5
        }
    },
    {
        "job_id": 4319,
        "type": "job_status",
        "message": {
            "status": "TFA_SUBMITTED",
            "job_timeout": 790739,
            "percent_complete": 33
        }
    },
    {
        "job_id": 4319,
        "type": "job_status",
        "message": {
            "status": "TFA_SUBMITTED",
            "job_timeout": 790471,
            "percent_complete": 34.5
        }
    },
    {
        "job_id": 4319,
        "type": "job_status",
        "message": {
            "status": "TFA_SUBMITTED",
            "job_timeout": 790425,
            "percent_complete": 36
        }
    },
    {
        "job_id": 4319,
        "type": "job_status",
        "message": {
            "status": "UPDATING",
            "job_timeout": 789918,
            "percent_complete": 50
        }
    },
    {
        "job_id": 4319,
        "type": "job_status",
        "message": {
            "status": "UPDATING",
            "job_timeout": 787889,
            "percent_complete": 51.5
        }
    },
    {
        "job_id": 4319,
        "type": "job_status",
        "message": {
            "status": "UPDATING",
            "job_timeout": 787764,
            "percent_complete": 53
        }
    },
    {
        "job_id": 4319,
        "type": "job_status",
        "message": {
            "status": "UPDATING",
            "job_timeout": 787360,
            "percent_complete": 54.5
        }
    },
    {
        "job_id": 4319,
        "type": "job_status",
        "message": {
            "status": "UPDATING",
            "job_timeout": 786153,
            "percent_complete": 56
        }
    },
    {
        "job_id": 4319,
        "type": "job_status",
        "message": {
            "status": "UPDATING",
            "job_timeout": 785761,
            "percent_complete": 57.5
        }
    },
    {
        "job_id": 4319,
        "type": "job_status",
        "message": {
            "status": "UPDATING",
            "job_timeout": 784679,
            "percent_complete": 59
        }
    }
]

GET /place_card_on_single_site_jobs/messages/cardholders/{{CARDHOLDER_ID}}
[
    {
        "job_id": 4319,
        "type": "job_status",
        "message": {
            "status": "UPDATING",
            "job_timeout": 781306,
            "percent_complete": 60.5
        }
    },
    {
        "job_id": 4319,
        "type": "job_status",
        "message": {
            "status": "UPDATING",
            "job_timeout": 780909,
            "percent_complete": 62
        }
    },
    {
        "job_id": 4319,
        "type": "job_status",
        "message": {
            "status": "UPDATING",
            "job_timeout": 780830,
            "percent_complete": 63.5
        }
    },
    {
        "job_id": 4319,
        "type": "job_status",
        "message": {
            "status": "UPDATING",
            "job_timeout": 780409,
            "percent_complete": 65
        }
    },
    {
        "job_id": 4319,
        "type": "job_status",
        "message": {
            "status": "UPDATING",
            "job_timeout": 780325,
            "percent_complete": 66.5
        }
    },
    {
        "job_id": 4319,
        "type": "job_status",
        "message": {
            "status": "UPDATING",
            "job_timeout": 780278,
            "percent_complete": 68
        }
    },
    {
        "job_id": 4319,
        "type": "job_status",
        "message": {
            "status": "UPDATING",
            "job_timeout": 779884,
            "percent_complete": 69.5
        }
    },
    {
        "job_id": 4319,
        "type": "job_status",
        "message": {
            "status": "UPDATING",
            "job_timeout": 779518,
            "percent_complete": 71
        }
    },
    {
        "job_id": 4319,
        "type": "job_status",
        "message": {
            "status": "UPDATING",
            "job_timeout": 779477,
            "percent_complete": 72.5
        }
    },
    {
        "job_id": 4319,
        "type": "job_status",
        "message": {
            "status": "UPDATING",
            "job_timeout": 776111,
            "percent_complete": 74
        }
    },
    {
        "job_id": 4319,
        "type": "job_status",
        "message": {
            "status": "UPDATING",
            "job_timeout": 776059,
            "percent_complete": 75.5
        }
    }
]

GET /place_card_on_single_site_jobs/messages/cardholders/{{CARDHOLDER_ID}}
[
    {
        "job_id": 4319,
        "type": "job_status",
        "message": {
            "status": "UPDATING",
            "job_timeout": 772685,
            "percent_complete": 77
        }
    },
    {
        "job_id": 4319,
        "type": "job_status",
        "message": {
            "status": "UPDATING",
            "job_timeout": 769313,
            "percent_complete": 78.5
        }
    },
    {
        "job_id": 4319,
        "type": "job_status",
        "message": {
            "status": "UPDATING",
            "job_timeout": 765931,
            "percent_complete": 80
        }
    }
]

GET /place_card_on_single_site_jobs/messages/cardholders/{{CARDHOLDER_ID}}
[
    {
        "job_id": 4319,
        "type": "job_status",
        "message": {
            "status": "UPDATING",
            "job_timeout": 762486,
            "percent_complete": 81.5
        }
    },
    {
        "job_id": 4319,
        "type": "job_status",
        "message": {
            "status": "UPDATING",
            "job_timeout": 759083,
            "percent_complete": 83
        }
    }
]

GET /place_card_on_single_site_jobs/messages/cardholders/{{CARDHOLDER_ID}}
[
    {
        "job_id": 4319,
        "type": "job_status",
        "message": {
            "status": "UPDATING",
            "job_timeout": 755603,
            "percent_complete": 84.5
        }
    },
    {
        "job_id": 4319,
        "type": "job_status",
        "message": {
            "status": "UPDATING",
            "job_timeout": 752237,
            "percent_complete": 86
        }
    },
    {
        "job_id": 4319,
        "type": "job_status",
        "message": {
            "status": "UPDATING",
            "job_timeout": 751163,
            "percent_complete": 87.5
        }
    },
    {
        "job_id": 4319,
        "type": "job_status",
        "message": {
            "status": "UPDATING",
            "job_timeout": 750750,
            "percent_complete": 89
        }
    }
]

GET /place_card_on_single_site_jobs/messages/cardholders/{{CARDHOLDER_ID}}
[
    {
        "job_id": 4319,
        "type": "job_status",
        "message": {
            "status": "UPDATING",
            "job_timeout": 748646,
            "percent_complete": 90.5
        }
    },
    {
        "job_id": 4319,
        "type": "job_status",
        "message": {
            "status": "UPDATING",
            "job_timeout": 748068,
            "percent_complete": 92
        }
    },
    {
        "job_id": 4319,
        "type": "job_status",
        "message": {
            "status": "UPDATING",
            "job_timeout": 748025,
            "percent_complete": 93.5
        }
    },
    {
        "job_id": 4319,
        "type": "job_status",
        "message": {
            "status": "SUCCESSFUL",
            "termination_type": "BILLABLE",
            "job_timeout": 745908,
            "percent_complete": 100,
            "termination_status_message": "Successful"
        }
    }
]

