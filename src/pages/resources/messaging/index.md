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
Endpoint: GET /messages/place\_card\_on\_single\_site\_jobs/:job\_id/broadcasts

In order to receive broadcast messaages, you must first register and set up a dedicated channel.

Endpoint: GET /messages/place\_card\_on\_single\_site\_jobs/:job\_id/broadcasts/registrations

This endpoint returns an access key that needs to be included with status queries.  You must include the cardsavr-messaging-access-key header as part of the request (also avaialble as a parameter in the [SDK](https://swch.github.io/slate)).

The broadcast response message contains several fields. They may simply serve as a heartbeat to the client to ascertain that the job is still running, changes in status, and also a helpful “percent\_complete”. When a job completes, the message will include a termination\_type which indicates how the job completed.  There is also a job_timeout value that lets the client know when a job is about to end, usually a result of waiting for credentials from the user.

type | description
---- | ------------
type | the type of message - this is currently always job\_status
job\_id | the job id for this message channel
job\_timeout | time left before this job times out (in seconds), it is appropriate to alert the cardholder a minute before their session expires. There is an initial timeout of 5 minutes for a job, but if additional information is required from the user, additional time is added to the length of the job. It is important to alert the user that time is about to expire while prompting for new credentials or a TFA code.
percent\_complete | approximate percentage of the job that is completed.
status | the status for this job (AUTH, UPDATING or DUPLICATE\_CARD)
termination_type | (only on the final message) - the exit state for this job (BILLABLE, USER\_DATA\_FAILURE, SITE\_INTERACTION\_FAILURE, PROCESS\_FAILURE). The application should alert the clent upon receipt of one of these messages.

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

#### Credential Request and Response Messages
Request messages adhere to a slightly different format. 

Endpoint: GET /messages/place\_card\_on\_single\_site\_jobs/:job\_id/credential\_requests

type | description
---- | ------------
type | the type of message - tfa\_request or credential\_request
job\_id | the job\_id for this message channel, this is important to know which merchant is requesting
envelope\_id | a guid which must be included in the response

The response contains the type of message, the job\_id, and an envelope_id which needs to be included in the response.

```json
{
  type: "tfa_request",
  job_id: 101,
  envelope_id: “<GUID>”
}
```

The response contains the envelope_id and the user submitted tfa code.

```json
{
  type: "tfa_response",
  envelope_id: “<GUID>”,
  message: "123"
}
```

Since all merchant credentials go directly into the job safe, there is no need to put them into the message itself. When the virtual browser session receives a credential_response, it simply needs to fetch the actual credentials from the job safe, so when a client application posts a credential response, it is essential to update the account.

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

### Termination types

All jobs end with a termination_type.  Termination types are meant to be broad and encompass multiple exit statuses.  

Termination Type | Notes
|-----------|--------
BILLABLE | Success
USER\_DATA\_FAILURE | Generally a credential/card problem
SITE\_INTERACTION\_FAILURE | Cardsavr is unable to navigate the site successfully
PROCESS\_FAILURE | A unknown backend failure - should be reported as unsuccessful

The job\_status list is frequently updated; it is advised to use the job\_status\_message for 
unknown job\_status values.  The job\_status\_message accompanies the job\_status messages in both the messages, single\_site\_job entity,
and the [notifications](../notifcations/).

Note that some statuses do not have termination types, those statuses are set/modified during the course of a job.

Status | Termination Type | Description
|------|------------------|-------------
SUCCESSFUL | BILLABLE | Job completed successfully
UNSUCCESSFUL | SITE\_INTERACTION\_FAILURE | Cardsavr was unable to place the card -- generally due to the inability to locate the next element
TIMEOUT_CAPTCHA | SITE\_INTERACTION\_FAILURE | A timeout was encountered attempting to solve a captcha
NETWORK_ISSUE | SITE\_INTERACTION\_FAILURE | Job has encountered an issue connecting to the merchant site, after the third failure, the job exits
PREPAID_ACCOUNT | USER\_DATA\_FAILURE | Prepaid accounts don't have cards on file
INACTIVE_ACCOUNT | USER\_DATA\_FAILURE | Account is inactive due to an unpaid bill or closed account
INVALID_CARD | USER\_DATA\_FAILURE | Card is detected as invalid by the merchant
INVALID_ADDRESS | USER\_DATA\_FAILURE | Some sites require accurate addresses
PASSWORD_RESET_REQUIRED | USER\_DATA\_FAILURE | Account is in a state that requires a password reset that must be done by the user
BUNDLED_SUBSCRIPTION | USER\_DATA\_FAILURE | No card on file and billed through another subscription (e.g. Disney+)
FREE_ACCOUNT | USER\_DATA\_FAILURE | Free accounts don't have a card on file and no paid subscrption
ACCOUNT_LOCKED | USER\_DATA\_FAILURE | Account has been locked by previous failed login attempts
DUPLICATE_CARD | USER\_DATA\_FAILURE | Some sites don't allow the same card placed twice
EXPIRED_CARD | USER\_DATA\_FAILURE | 
INVALID_CVV | USER\_DATA\_FAILURE | 
INVALID_NETWORK | USER\_DATA\_FAILURE | Some sites only accept one brand of card (no Amex, only VISA, etc.)
MAX_LIMIT_OF_STORED_CARDS | USER\_DATA\_FAILURE | Some sites only allow a certain number of cards
TIMEOUT_CREDENTIALS | USER\_DATA\_FAILURE | User failed to provide new credentials in a timely manner (~4 minutes)
TIMEOUT_TFA | USER\_DATA\_FAILURE | User failed to provide a new TFA code in a timely mannger (~4 minutes)
TOO_MANY_LOGIN_FAILURES | USER\_DATA\_FAILURE | Only two failed logins are allowed
TOO_MANY_TFA_FAILURES | USER\_DATA\_FAILURE | Only one failed TFA code is allowed
REQUESTED | | Initial state of a job (and the default)
QUEUED | | Jobs are immediately queued upon being requested
IN_PROGRESS | | Task has started
AUTH | | Task is attempting to authenticate
PENDING_CREDS | | Initial set of credentials have not been received - starting the job early, and adding credentials after the job is already running can save time
CREDS_RECEVIED | | Initial set of credentials have been received - starting the job early, and adding credentials after the job is already running can save time
LOGIN_SUBMITTED | | Login form has been submitted
PENDING_NEWCREDS | | Task is awaiting new credentials because the initial set was invalid
NEWCREDS_RECEIVED | | Task has received new credentials because the initial set was invalid
LOGIN_RESUBMITTED | | Login form has been resubmitted after new credentials
PENDING_TFA | | Task awaiting a TFA response
TFA_RECEIVED | | Task has received a TFA response
TFA_SUBMITTED | | TFA code has been received
UPDATING | | Task is successfully authenticated and is placing the card
PENDING_CARD | | Task is awaiting a card - this only occurs if a job and account are created before the card is added (uncommon implementation)
CANCEL_REQUESTED | | Job is cancelled by the client, but not yet acknowledged by the task
INITIATED | | Job should be created, but not queued yet (uncommon implementation)
CANCELLED_QUICKSTART | NEVER_STARTED | A job that was requested before initial credentails were received is cancelled by the client
ABANDONED_QUICKSTART | NEVER_STARTED | A job that was requested before initial credentials were received is abandonded
KILLED | NEVER_STARTED | A job encounters an issue where it gets stuck and needs to be stopped by a remote process (uncommon)
CANCELLED | NEVER_STARTED | A job in an INITIATED state is cancelled (uncommon implementation)
ABANDONED | NEVER_STARTED | A job in an INITIATED state is abandoned and credentials are never provided (uncommon implementation)
PROXY_PROBE_FAILED | PROCESS_FAILURE | Unable to connect through the primary and backup proxy
VBS_TIMEOUT | PROCESS_FAILURE | Task took too long to run (uncommon)
VBS_ERROR | PROCESS_FAILURE | Task encountered an unhandled exception (uncommon)
