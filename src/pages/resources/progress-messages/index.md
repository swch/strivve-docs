---
title: Job progress via messaging
template: resources
---

### Overview

CardSavr utilitizes a messaging system to "stream" messages to clients.  Ideally, a job can process without any participation from the user, but occasionally some additional user input may be necessary. In these situations, client applications may need to acquire additional security credentials (MFA codes), they may need to fix incorrect credentials, and they may wish to be notified when jobs complete, pass authentication, or even fail.  There are two kinds of messages.

### Status messages

Job status messages can either be acquired from the /messages/place\_card\_on\_single\_site\_jobs or the /messages/cardholders endpoints. These messages contain the job\_id, the [current status](../job-progress/#job_statuses), and the percent complete of the job.  Once jobs complete they have a [termination type](../job-progress/#termination_types) which defines the final state of the job.

They may simply serve as a heartbeat to the client to ascertain that the job is still running. There is also a job_timeout value that lets the client know when a job is about to end, usually a result of waiting for credentials from the user.  When you consume status messages, they can only be consumed once.  Although you can always directly query the current status of a job via the jobs endpoint, old messages are not available.

type | description
---- | ------------
type | the type of message - this is currently always job\_status
job\_id | the job id for this message channel
message | a message containing data aboout this status
message.job\_timeout | time left before this job times out (in seconds), it is appropriate to alert the cardholder a minute before their session expires. There is an initial timeout of 5 minutes for a job, but if additional information is required from the user, additional time is added to the length of the job. It is important to alert the user that time is about to expire while prompting for new credentials or a TFA code.
message.percent\_complete | approximate percentage of the job that is completed.
message.status | the status for this job (e.g. AUTH, UPDATING or DUPLICATE\_CARD)
message.termination_type | (only on the final message) - the exit state for this job (BILLABLE, USER\_DATA\_FAILURE, SITE\_INTERACTION\_FAILURE, PROCESS\_FAILURE). The application should alert the clent upon receipt of one of these messages.
message.status_message | a status message that should be shown to the user

Examples:

```json
{
  "type": "job_status",
  "job_id": 101,
  "message": {
    "status": "UPDATING",
    "percent_complete": 80,
    "job_timeout": 827027,
    "status_message": "Updating your payment method. No further action required."
  }
}
```

```json
{
  "type": "job_status",
  "job_id": 101,
  "message": {
    "status": "TIMEOUT_TFA",
    "percent_complete": 100,
    "job_timeout": 827027,
    "status_message": "Unable to automatically update your card due to invalid or missing two-factor authentication.",
    "termination_type": "USER_DATA_FAILURE"
  }
}
```

### Credential requests

Unlike job status messages, credential requests persist until responded to.  Each request has a type, and an envelope\_id.  This envelope\_id must accompany each response.  Credential requests have two types: tfa\_request and credential\_request.  When a request is retrieved by the client, the user should either enter in new credentials or get a tfa response from their email, text message or sometimes even mobile apps.  Once the server receives the credential response, the request is removed, and the job continues.  (For backward compatibiliy, you can still key off the request_type:  'tfa_request' always requires a tfa response, and 'credential_request' always requires a username/password, but this functionality is deprecated and will not be supported after 6/1/2023)

type | description
---- | ------------
type | the type of message - tfa\_request or credential\_request (or other types, use account_link for credential request types)
job\_id | the job\_id for this message channel, this is important to know which merchant is requesting
envelope\_id | a guid which must be included in the response
account\_link | a list of proprerties that need to be collected from the client -- note that some properties are secret and should be obscured when entered

Examples: 

```json
{
  "type": "tfa_message",
  "job_id": 101,
  "envelope_id": “<GUID>”,
  "account_link": [
    {
      "key_name": "tfa_message",
      "label": "Please enter the code sent to your mobile device",
      "secret": false
    }
  ],
  "message": {
    "status": "PENDING_TFA",
    "percent_complete": 55,
    "job_timeout": 827027,
    "status_message": "Please acknowledge the link sent to your email or phone.",
  }
}
```

```json
{
  "type": "initial_account_link",
  "job_id": 101,
  "envelope_id": “<GUID>”,
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
  ],
  "message": {
    "status": "PENGING_NEWCREDS",
    "percent_complete": 45,
    "job_timeout": 827027,
    "status_message": "The credentials provided were incorrect.",
  }
}
```

```json
{
  "type": "security",
  "job_id": 101,
  "envelope_id": “<GUID>”,
  "account_link": [
    {
      "key_name": "security_1",
      "label": "What is your mother's maiden name?",
      "secret": true
    }
  ],
  "message": {
    "status": "PENGING",
    "percent_complete": 60,
    "job_timeout": 827027,
    "status_message": "The site is requiring additional information.",
  }
}
```

To reduce the amount of time required to complete the job, starting a job before credentials have been collected can reduce the overall user waiting time.  When this occurs, there will be a credential_request and a corresponding envelope_id that will need to be used to respond with the initial credentials.  Note that all messages with a status that starts with "PENDING" indicate that the message will be accompanied with an account_link parameter, and that data is required from the user and the job will block until responded to.

### Credential responses

The most common way to respond to a message request, is through request hydration and the jobs endpoint.  By simply providing a header that contains the appropriate envelope_id ("x-cardsavr-envelope-id": "<GUID>"), responses become simple account updates.  Note that credential responses aren't always username/password (although that's most common).  The [merchant site endpoint](https://swch.github.io/slate/#merchant-sites) defines the necessary values for each merchant site. (e.g. "pin" or "email")

Endpoint:  PUT /place\_card\_on\_single\_site\_jobs/:job\_id

```json
{
  "account": { 
    "account_link" : {
      "username": "my_username@foo.com",
      "password": "my_password"
    }   
  }
}
```

or for TFA responses:

```json
{
  "account": {    
    "account_link" : {
      "tfa": "123"
    }
  }
}
```

or for TFA messages - these should be respoonded to immediately with "ack", the job will simply block until the ack sent to their phone is replid to.

```json
{
  "account": {    
    "account_link" : {
      "tfa": "ack"
    }
  }
}
```

or for security questions:

```json
{
  "account": {    
    "account_link" : {
      "security_1": "Max",
      "security_2": "Smith"
    }
  }
}
```

The other mechanism is to post directly to the messaging endpoint for tfa responses:

Endpoint:  POST /messages/place\_card\_on\_single\_site\_jobs/job\_id:/credential\_responses

```json
{
  "job_id": 101,
  "envelope_id": "<ENVELOPE_ID>",
  "account_link" : {
    "tfa": "123"
  }
}
```
This method is not recommended since this can all be accmplished using the account and job endpoints.  

All the SDKs provide simple interfaces for ensuring the correct data is returned in the response.  There are also sample tests that walk through how to attach envelope_ids in responses.

#### Querying messages by cardholder

Since it is commmon for multile jobs to be running simultaneously, it is oftentimes easiest to query multiple job messages at once.  Since every job message is accompanied by its id, it's a relatively simple exercise to route the messages to the right component that manages each job.  

Endpoint: GET /messages/cardholders/:cardholder\_id

#### Querying messages by job

It is also possible to only query against a single job.  As with cardholder message queries, the credential requests remain as messages until a response is sent.

Endpoint GET /messages/place\_card\_on\_single\_site\_jobs/:job\_id

#### Broadcast Messages

The broadcast message endpoints are actually available for direct consumption as well.  These messages can be used to set up monitoring services, or applications that can receive messages across multiple channels.  As most implementation do not require such complexity, there is limited SDK support.

Endpoint: GET /messages/place\_card\_on\_single\_site\_jobs/:job\_id/broadcasts

In order to receive broadcast messaages, you must first register and set up a dedicated channel.

Endpoint: GET /messages/place\_card\_on\_single\_site\_jobs/:job\_id/broadcasts/registrations

This endpoint returns an access key that needs to be included with status queries.  You must include the cardsavr-messaging-access-key header as part of the request (also avaialble as a parameter in the [SDK](https://swch.github.io/

Request messages adhere to a slightly different format. 

Endpoint: GET /messages/place\_card\_on\_single\_site\_jobs/:job\_id/credential\_requests

### Messaging architecture

Here is a diagram of how multiple channels can be used to monitor job status.  Note that credential requests will not work across multiple channels, only status messages.

![Messaging Architecture](/images/7aba641-Messaging_Diagram.png "Messaging Architecture") 