---
title: Creating Resources
weight: 7
template: resources
---

The following steps walk through the creation of the user, card, address, 
and account objects.  Once these four objects have been created, a card 
placement job is created.

Before creating the objects, we must first start a session with CardSavr.
The following examples are in cURL but a Postman collection for these same 
 commands if available in the [API/SDK](https://github.com/swch/Strivve-SDK/tree/master/postman-samples).
 
Postman or cURL must be run against a development version of CardSavr that has 
signing disable. Check to ensure your environment has signing disable before 
using these commands.

Before starting, you'll need to define values for the followig items:

| Data | Source
-----------------|--------------
FINANCIAL_INSTITUTION | Created on the Partner Portal or provided for Sandbox environments
INSTANCE_NAME | The CardSavr API URL or provided for Sanbox environments
USERNAME | Created on the Partner Portal or provided for Sandbox environments
PASSWORD | Created on the Partner Portal or provided for Sandbox environments
APP_NAME | Created on the Partner Portal or provided for Sandbox environments
INTEGRATOR_KEY | Created on the Partner Portal or provided for Sandbox environments
SAFE_KEY | Used to encrypt the user's sensitive data

<!-- cURL COMMAND TO START SESSION -->
## cURL Commands
### Start Session
    
    curl "https://api.INSTANCE_NAME.cardsavr.io/session/start" 
    -H "trace: {\"key\": \"my_trace\"}" -c ~/_cookies

Response:
    
    {
      "sessionSalt": "kz2R3qexAkZqhoCalnNX9+6CLAMZ+"
    }

<!-- cURL COMMAND TO LOGIN -->
### Start Login 

    curl -iv -d "{\"password\": \"PASSWORD\", \"userName\": \"USERNAME\"}" 
    -H "Content-Type: application/json" 
    "https://api.INSTANCE_NAME.cardsavr.io/session/login" 
    -H "trace: {\"key\": \"my_trace\"}" -b ~/_cookies -c ~/_cookies

<!-- Postman COMMAND TO LOGIN -->

Response:
    
    {
        "status": "valid_cleartext",
        "success": true,
        "user_id": 2030,
        "user": {
            "id": 2030,
            "financial_institution_id": 2,
            "username": "sample_customer_agent",
            "email": "placeholder",
            "first_name": "placeholder",
            "last_name": "placeholder",
            "role": "customer_agent",
            "phone_number": "9999999999",
            "password_lifetime": 90,
            "is_locked": false,
            "is_password_update_required": false,
            "last_login_time": "2020-08-10T20:40:20.250Z",
            "next_rotation_on": "2020-10-12T01:55:39.809Z",
            "created_on": "2020-08-10T20:40:20.250Z",
            "last_updated_on": "2020-08-28T01:55:39.809Z"
        }
    }

<!-- cURL COMMAND TO CREATE USER -->

### Create User
    curl -d "{"username":"username1","first_name": "FirstName", "last_name":"LastName","phone_number":"555-555-1212","email": "test@strivve.com","cardholder_safe_key":"KQY1TrLsywrPWEg65VcCn8Ww8F4/G3Z6kGc2wxsCjaQ=","role":"cardholder"}"
    -X POST -H "Content-Type: application/json"
    -H "new-cardholder-safe-key: NEW_CARDHODLER_SAFE_KEY"
    -H "trace:{\"key\": \"my_trace\"}" -b ~/_cookies -c ~/_cookies
    https://api.INSTANCE_NAME.cardsavr.io/cardsavr_users/

Response: 

    {
        "id": 2873,
        "financial_institution_id": 41,
        "username": "username1",
        "email": "test@strivve.com",
        "first_name": "FirstName",
        "last_name": "LastName",
        "role": "cardholder",
        "phone_number": "555-555-1212",
        "custom_data": null,
        "password_lifetime": 90,
        "is_locked": false,
        "is_password_update_required": false,
        "last_login_time": "2020-08-29T03:46:04.376Z",
        "next_rotation_on": "2020-11-27T03:46:04.381Z",
        "created_on": "2020-08-29T03:46:04.376Z",
        "last_updated_on": "2020-08-29T03:46:04.381Z",
        "credential_grant": "*CREDENTIAL_GRANT_REMOVED*"
    }

* Note the id and financial\_institution\_id from the response.  You'll need these for 
the next step.

Now that we have a user created, we need to end this session and login as the user as only 
users with the cardholder role can create card placement jobs.

<!-- cURL COMMAND TO END SESSION -->
### End Session
    curl -iv -d -H "Content-Type: application/json" 
    "https://api.INSTANCE_NAME.cardsavr.io/session/end" 
    -H "trace: {\"key\": \"my_trace\"}" -b ~/_cookies -c ~/_cookies
    
## cURL Commands
### Start Session
    
    curl "https://api.INSTANCE_NAME.cardsavr.io/session/start" 
    -H "trace: {\"key\": \"my_trace\"}" -c ~/_cookies

Response:
    
    {
      "sessionSalt": "kz2R3qexAkZqhoCalnNX9+6CLAMZ+"
    }

<!-- cURL COMMAND TO LOGIN -->
### Start Login 

    curl -iv -d "{\"password\": \"PASSWORD\", \"userName\": \"USERNAME\"}" 
    -H "Content-Type: application/json" 
    "https://api.INSTANCE_NAME.cardsavr.io/session/login" 
    -H "trace: {\"key\": \"my_trace\"}" -b ~/_cookies -c ~/_cookies

<!-- Postman COMMAND TO LOGIN -->

Response:
    
    {
        "status": "valid_cleartext",
        "success": true,
        "user_id": 2030,
        "user": {
            "id": 2030,
            "financial_institution_id": 2,
            "username": "sample_customer_agent",
            "email": "placeholder",
            "first_name": "placeholder",
            "last_name": "placeholder",
            "role": "customer_agent",
            "phone_number": "9999999999",
            "password_lifetime": 90,
            "is_locked": false,
            "is_password_update_required": false,
            "last_login_time": "2020-08-10T20:40:20.250Z",
            "next_rotation_on": "2020-10-12T01:55:39.809Z",
            "created_on": "2020-08-10T20:40:20.250Z",
            "last_updated_on": "2020-08-28T01:55:39.809Z"
        }
    }

    
<!-- cURL COMMAND TO CREATE ADDRESS -->
### Create Address

    curl -d "{\"user_id\":2081302826,\"address1\":\"SGTClNSCCMqlfjuzTmJuepDyFgvWhlCMRycXlKGiRIooOJJkoXeObOcAwJMGeqjSDWfhTHobAWMimcCynMIQcvlBFSbMQlwUFyJ\",\"address2\":\"AyFgoCTjCLXUQVylBAfkHJOtqkkKJjuaLHnmJpSctqBOQueIvciyAUPqYoFpkiAPlkGjgPuabhAPCHFPvaxciObOmIBvBUWpngD\",\"city\":\"Seattle\",\"subnational\":\"WA\",\"postal_code\":\"98177\",\"postal_other\":\"98177-0124\",\"country\":\"USA\",\"is_primary\":true}"
    -X POST -H "Content-Type: application/javascript"
    -H "trace:{\"key\": \"my_trace\"}" -b ~/_cookies -c ~/_cookies
    https://api.INSTANCE_NAME.cardsavr.io/cardsavr_addresses/
    
Response:

    {
        "id": 1894,
        "user_id": 2873,
        "is_primary": true,
        "address1": "SGTClNSCCMqlfjuzTmJuepDyFgvWhlCMRycXlKGiRIooOJJkoXeObOcAwJMGeqjSDWfhTHobAWMimcCynMIQcvlBFSbMQlwUFyJ",
        "address2": "AyFgoCTjCLXUQVylBAfkHJOtqkkKJjuaLHnmJpSctqBOQueIvciyAUPqYoFpkiAPlkGjgPuabhAPCHFPvaxciObOmIBvBUWpngD",
        "city": "Seattle",
        "subnational": "WA",
        "country": "USA",
        "postal_code": "98177",
        "postal_other": "98177-0124",
        "created_on": "2020-08-29T03:57:20.372Z",
        "last_updated_on": null
    }

* Note the address ID for the next step.

<!-- cURL COMMAND TO CREATE CARD -->
### Create Card

    curl -d "{\"cardholder_id\":2873,\"address_id\":1894,\"par\":\"abc\",\"pan\":\"abc\",\"cvv\":\"oAc\",\"expiration_month\":12,\"expiration_year\":24,\"name_on_card\":\"FirstName LastName\",\"first_name\":\"FirstName\",\"last_name\":\"LastName\"}"
    -X POST -H "Content-Type: application/json"
    -H "cardholder-safe-key: CARDHOLDER_SAFE_KEY"
    -H "trace:{\"key\": \"my_trace\"}" -b ~/_cookies -c ~/_cookies
    https://api.INSTANCE_NAME.cardsavr.io/cardsavr_cards/
    
Response:

    {
        "id": 536,
        "cardholder_id": 2874,
        "merchant_site_id": 1,
        "last_card_placed_id": null,
        "site_credential_grant": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJhcGkubWJ1ZG9zLmNhcmRzYXZyLmlvIiwic3ViIjoiU2l0ZS1DcmVkZW50aWFsLUdyYW50OzI4NzQ7NTM2IiwiYXVkIjoiYXBpLm1idWRvcy5jYXJkc2F2ci5pbyIsImV4cCI6IjE1OTg3NjAxOTYxODAiLCJpYXQiOjE1OTg3NjAxOTZ9.R1ulyUur8QN+jEoj4hDkDzAvxEYE9C3l0M4g0fuMvYk=",
        "last_login": null,
        "last_password_update": null,
        "last_saved_card": null,
        "created_on": "2020-08-30T04:03:15.952Z",
        "last_updated_on": null
    }
    
<!-- cURL COMMAND TO CREATE ACCOUNT -->
### Create Account

We'll use one of the synthetic merchant sites for testing (merchant\_site\_id = 1).

    curl -d "{\"cardholder_id\":CARDHOLDER_ID,\"merchant_site_id\":1,\"username\":\"USER_NAME\",\"password\":\"PASSWORD\"}"
    -X POST -H "Content-Type: application/json"
    -H "cardholder-safe-key: CARDHOLDER_SAFE_KEY"
    -H "trace:{\"key\": \"my_trace\"}" -b ~/_cookies -c ~/_cookies
    https://api.INSTANCE_NAME.cardsavr.io/cardsavr_accounts/

Response:



<!-- cURL COMMAND TO CREATE JOB -->
### Create Job

    curl -d "{\"user_id\":USER_ID,\"card_id\":CARD_ID,\"account_id\":ACCOUNT_ID}"
    -X POST -H "Content-Type: application/json"
    -H "cardholder-safe-key: CARDHOLDER_SAFE_KEY"
    -H "trace:{\"key\": \"my_trace\"}" -b ~/_cookies -c ~/_cookies
    https://api.INSTANCE_NAME.cardsavr.io/place_card_on_single_site_jobs/

Response:


<!-- cURL COMMAND TO END SESSION -->
### End Session
    curl -iv -d -H "Content-Type: application/json" 
    "https://api.INSTANCE_NAME.cardsavr.io/session/end" 
    -H "trace: {\"key\": \"my_trace\"}" -b ~/_cookies -c ~/_cookies


__That's it!__     You've just placed your first card.

Next we'll walk through job status and notification.