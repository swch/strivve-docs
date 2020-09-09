---
title: Notifications
template: resources
---

### Receive event notifications with webhooks
Webhooks are particularly useful for asynchronous events like card placement jobs. CardSavr uses 
webhooks to notify your system when a card placement event completes. 

Currently, only user session completion is supported.

__Note__ that environments can also be set to purge ephemeral users upon session completion. This is 
specifically advised environments where Strivve is managing the safe_keys. This setting is 
managed by Strivve and applied globally for that environment.  

Notifications can be assigned to an event and then mapped to a notification type:
1)	Email
2)	Webhook

Each notification type has its own configuration.  For example, a webhook needs to know what 
URL to hit, and an email needs to know what address to email.

**Email notifications currently must be configured by Strivve.**

Webhooks require a URL to be saved via the notification endpoint.  This URL must contain all 
the necessary security information to connect to the customer's web service.  Webhooks are 
also currently configured by Strivve. The notification endpoint reference is available under 
the [API/SDK](/api-sdk) section.

### Job Placement Completion Event

The data format for a job placement event is:
```json
    {
        "jobs": [
            {
                "job_id": 10,
                "completed_on": "2020-06-25T22:39:47.942Z",
                "merchant_site": {
                    "host": "amazon.com",
                    "name": "Amazon",
                    "id": 10
                },
                "termination_type": "USER_DATA_FAILURE",
                "job_status": "TIMEOUT_TFA",
                "job_status_message": "Unable to automatically update your card due to invalid or missing two-factor authentication.",
                "custom_data": {
                    "meta_key": "MB9800665"
                }
            }
        ],
        "custom_data": {
            "meta_key": "MB9800665",
            "myfi": {
                "token": "1234"
            }
        },
        "trace": {
            "key": "siazwbp1c81qwoplrr66"
        },
        "financial_institution": "Acme Bank",
        "financial_institution_id": 11,
        "username": "siazwbp1c81qwoplrr66"
    }
```

The meta_key comprised of the first and last initials of the user, the postal code, and the last 
two digits of the PAN. For cardholders that have been authenticated by the customer, the CardSavr 
username is available and can easily be associated with the necessary contact information 
(email, mobile number) when the webhook is processed.

The list of termination_types is as follows:

Termination Type | Notes
|-----------|--------
BILLABLE | Success
USER\_DATA\_FAILURE | Generally a credential/card problem
SITE\_INTERACTION\_FAILURE | Cardsavr is unable to navigate the site successfully
PROCESS\_FAILURE | A unknown backend failure - should be reported as unsuccessful

The job_status list is frequently updated; it is advised to use the job_status_message for 
unknown job_status values.

### Using webhooks with your CardSavr integration
 
There are only a few steps to utilize webhooks within CardSavr:

1. Create a webhook endpoint on your server
2. Register the webhook endpoint with a CardSavr event

### Testing Webhooks

Webhook behavior in CardSavr environments is identical between production and non-production 
environments.

### Retry Logic

If the notification is not successfully delivered the CardSavr platform will retry the 
notification in intervals of 10, 20, and 40 seconds. Should the CardSavr service experience 
unexpected downtime, all the notifications will be sent for the entire service downtime upon 
service restoration. If for any reason your servers are not accessible, we recommend you to 
unsubscribe to notifications. Once your the servers are up, you can subscribe to notifications again.
