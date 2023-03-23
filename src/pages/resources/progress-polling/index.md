---
title: Job progress via polling
template: resources
---

### Overview

CardSavr persistently stores the status of a job as it changes throughout its progress.  Ideally, a job can process without any participation from the user, but occasionally some additional user input may be necessary. In these situations, client applications may need to acquire additional security credentials (MFA codes), they may need to fix incorrect credentials, and they may wish to be notified when jobs complete, pass authentication, or even fail.  There are two kinds of messages.

Although not as efficient as the [messaging system](../progress-messages/), polling the jobs endpoint directly provides a bit more statelessness.

### Status updates

Once a job has been requested, the [current status](../job-progress/#job_statuses) can be queried using the jobs endpoint.

Endpoint: GET /place\_card\_on\_single\_site\_jobs/:job\_id

These calls should be accompanied by a credential-request [hydration header](https://swch.github.io/slate/?java#hydration) so that credential requests are returned on every job request.  

It is essential to maintain user contact until the job status changes to UPDATING, which occurs after the VBS has successfully authenticated with the merchant site.  

Examples:

```json
{
  ...
  "id": 1676,
  "cardholder_id": 1262,
  "card_id": 1195,
  "account_id": 1679,
  "type": "CARD_PLACEMENT",
  "status": "AUTH",
  "termination_type": null,
  "status_message": "Linking account.",  
  ...
}
```

```json
{
  ...
  "id": 1676,
  "cardholder_id": 1262,
  "card_id": 1195,
  "account_id": 1679,
  "type": "CARD_PLACEMENT",
  "status": "PENDING_TFA",
  "termination_type": null,
  "status_message": "Additional information required, this code may be sent to your phone or email address.",  
  ...
}
```

Once jobs complete they have a [termination type](../job-progress/#termination_types) which defines the final state of the job.

Example:

```json
{
  ...
  "id": 1676,
  "cardholder_id": 1262,
  "card_id": 1195,
  "account_id": 1679,
  "type": "CARD_PLACEMENT",
  "status": "SUCCESSFUL",
  "termination_type": "BILLABLE",
  "status_message": "Your card has been placed successfully.",  
  ...
}
```

### Credential requests

Credential requests occur when additional information is required from the user, and they persist until responded to.  Each request has a type, an envelope\_id and an account\_link property which contains the required properties for the response.  This envelope\_id must accompany each response. When a request is retrieved by the client, the user must complete some sort of action such as entering in new credentials, getiing a tfa text from their email or text message, or even answer securty questions.  Once the server receives the credential response, the request is removed, and the job continues.

type | description
---- | ------------
type | the type of message - tfa or initial\_account\_link or others
job\_id | the job\_id for this message channel, this is important to know which merchant is requesting
message | detailed status information about this request, it includes the same properties as a standard status message (percent_complete, status, and a status_message) -- the status_message should be shown to the users to indicate the status of each job
envelope\_id | a guid which must be included in the response
account\_link | a list of proprerties that need to be collected from the client -- note that some properties are marked as secret and should be obscured when entered

Endpoint: GET /place\_card\_on\_single\_site\_jobs/:job\_id

Note - A credential_request [hydration header](https://swch.github.io/slate/#hydration) must be included with the job GET request.

Bad Credentials Example: 

```json
{ 
  ...
  "created_on": "2021-09-16T00:06:00.264Z",
  "last_updated_on": "2021-09-16T00:07:25.975Z",
  "credential_requests": [
    {
      "job_id": 1587,
      "type": "initial_account_link",
      "envelope_id": "2kRDNRFbPlf98X5S917d4w==",
      "message": {
        "status": "PENDING_NEWCREDS",
        "job_timeout": 769392,
        "percent_complete": 45,
        "status_message": "The initial credentials provided were incorrect."
      },
      "account_link": [
        {
          "key_name": "username",
          "label": "Username",
          "secret": false
        },
        {
          "key_name": "password",
          "label": "Password",
          "secret": true
        }
      ]
    }
  ]
}
```

TFA Request Example:

```json
{ 
  ...
  "created_on": "2021-09-16T00:06:00.264Z",
  "last_updated_on": "2021-09-16T00:07:25.975Z",
  "credential_requests": [
    {
      "job_id": 1587,
      "type": "tfa",
      "envelope_id": "2kRDNRFbPlf98X5S917d4w==",
      "message": {
        "status": "PENDING_TFA",
        "job_timeout": 769392,
        "percent_complete": 55,
        "status_message": "Additional information required, this code may be sent to your phone or email address."
      },
      "account_link": [
        {
          "key_name": "tfa",
          "label": "Please enter the code sent to your device",
          "secret": false
        }
      ]
    }
  ]
}
```

### Credential responses

All the SDKs provide simple interfaces for ensuring the correct data is PUT in the response.  The response format is the same as when using the [messaging endpoints](../progress-messages/#credential_responses).

