---
title: Messaging
template: resources
---

### Strivve Messaging Usage and Endpoints
Messages are an important part of the card updating experience. Ideally, a job can process without any participation from the user, but occasionally some additional user input may be necessary. In these situations, client applications may need to acquire additional security credentials (MFA codes), they may need to fix incorrect credentials, and they may wish to be notified when jobs complete, pass authentication, or even fail.  There are two kinds of messages.

![Messaging Architecture](/images/7aba641-Messaging_Diagram.png "Messaging Architecture") 

### Message types
There are two types of messages, and they are both handled differently.

Job Status messages are meant to be consumed by multiple clients. This requires additional infrastructure to support multiple channels per client. A user subscribes to a channel after starting the job, and then will receive broadcast messages during the session. Those messages may include information about when the virtual browser job is authenticated with the merchant, when the job has completed, or if the job has failed. For example, a virtual browser session will timeout after 4 minutes waiting for the user to provide a TFA code. In this example, the client application should tell the user they can no longer supply the TFA code. Other messages may not be necessary to surface to the user.

Job Requests and Job Responses are single instance per job. Only the client that created the job can receive job requests for that job. There are currently two job requests: requests for new credentials, and requests for TFA codes. Both of these requests require a response from the user (new credentials or a TFA code) and get sent back to the virtual browser by posting a response message to the same channel. If a request message isn’t responded to in a timely manner (within 4 minutes), the virtual browser session will time out, exit, and the job will exit in an unsuccessful state.

### Message Format and Endpoints

#### Broadcast Messages
Endpoint: GET "/messages/place_card_on_single_site_jobs/:job_id/broadcasts"

In order to receive broadcast messaages, you must first register and set up a dedicated channel.

Endpoint: GET "/messages/place_card_on_single_site_jobs/:job_id/broadcasts/registrations"

This endpoint returns an access key that needs to be included with status queries.  You must include the cardsavr-messaging-access-key header as part of the request (also avaialble as a parameter in the [SDK](/api-sdk)).

The broadcast message format contains several fields. They may simply serve as a heartbeat to the client to ascertain that the job is still running, and also include a helpful “percent_complete”. When a job completes, the message will include a final_status which indicates how the job completed.

type | description
---- | ------------
type | the type of message - this is currently always job_status
job_id | the job_id for this message channel
job_timeout | time left before this job times out (in seconds), it is appropriate to alert the cardholder a minute before their session expires. There is an initial timeout of 5 minutes for a job, but if additional information is required from the user, additional time is added to the length of the job. It is important to alert the user that time is about to expire while prompting for new credentials or a TFA code.
percent_complte | approximate percentage of the job that is completed.
status | the status for this job (AUTH, UPDATING or DUPLICATE_CARD)
termination_type | (only on the final message) - the exit state for this job (BILLABLE, USER_DATA_FAILURE, SITE_INTERACTION_FAILURE, PROCESS_FAILURE). The application should alert the clent upon receipt of one of these messages.

Examples:

```json
{
  type: "job_status",
  job_id: 101,
  message: {
    status: "UPDATING",
    percent_complete: 80,
    job_timeout: 300
  }
}
```

```json
{
  type: "job_status",
  job_id: 101,
  message: {
    status: "TIMEOUT_TFA",
    percent_complete: 100,
    job_timeout: 150,
    termination_type: "USER_DATA_FAILURE"
  }
}
```

#### Response and Request Messages
Request messages adhere to a slightly different format.

type | description
---- | ------------
type | the type of message - tfa_request or credential_request
job_id | the job_id for this message channel, this is important to know which merchant is requesting
envelope_id | a guid which must be included in the response

```json
{
  type: "tfa_request",
  job_id: 101,
  envelope_id: “random guid”
}
```

The response has a similar format, only value is used to hold the client response. Note that the envelope_id needs to be included.

```json
{
  type: "tfa_response",
  message: “123”,
  envelope_id: “<GUID>”
}
```

Since all merchant credentials go directly into the job safe, there is no need to put them into the message itself. When the virtual browser session receives a credential_response, it still needs to fetch the actual credentials from the job safe.

```json
{
  type: "credential_request",
  job_id: 101,
  envelope_id: “<GUID>”
}
```
The response has a similar format, only "submitted" is used since the values are held in the safe.

```json
{
  type: "credential_response",
  envelope_id: “<GUID>”,
  message: “submitted”
}
```