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

It is essential to maintain user contact until the job status changes to AUTH, which occurs after the VBS has successfully authenticated with the merchant site.  

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
  "status_message": null,  
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
  "status_message": null,  
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

Credential requests occur when additional information is required from the user, and they persist until responded to.  Each request has a type, and an envelope\_id.  This envelope\_id must accompany each response.  Credential requests have two types: tfa\_request and credential_request.  When a request is retrieved by the client, the user should either enter in new credentials or get a tfa response from their email, text message or sometimes even mobile apps.  Once the server receives the credential response, the request is removed, and the job continues.

type | description
---- | ------------
type | the type of message - tfa\_request or credential\_request
job\_id | the job\_id for this message channel, this is important to know which merchant is requesting
envelope\_id | a guid which must be included in the response

Endpoint: GET /place\_card\_on\_single\_site\_jobs/:job\_id

Examples: 

```json
{ 
  ...
  "created_on": "2021-09-16T00:06:00.264Z",
  "last_updated_on": "2021-09-16T00:07:25.975Z",
  "credential_requests": [
    {
      "job_id": 1587,
      "type": "credential_request",
      "message": "There was a problem with login credentials, please re-submit.",
      "envelope_id": "2kRDNRFbPlf98X5S917d4w=="
    }
  ]
}
```

### Credential responses

All the SDKs provide simple interfaces for ensuring the correct data is PUT in the response.  The response format is the same as when using the [messaging endpoints](../progress-messages/#credential_responses).
