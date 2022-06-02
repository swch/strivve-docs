---
title: Job progress
template: resources
---

### Overview

As single\_site\_jobs are not transactional, CardSavr clients need a way to monitor jobs as they progress.  For example, if additional information is required from the client (like a new password or tfa code), there needs to be a mechanism for the virtual browser (VBS) to make the request to the individual cardholder running the job.  There are a couple of recommended methodologies for communicating with the virtual browser: polling the job entities [directly](./progress-polling) and by subscribing to ephemeral [job and cardholder messages](./progress-messages).

### Job statuses

As a job transitions from one status to the next, applications can query the jobs api to see the current status.  The single\_site\_job status is returned as part of a GET response, as well as within a job\_status message.  Some statuses indicate that action by the user must be taken, other statuses are simply informational and can provide important feedback to the user.  Most status changes are made by the VBS.

This is a list of in-progress status messages that occur before a job terminates. 

Status | Can be set by agent | Description
|------|---------------------|------------
REQUESTED | Yes (this is the default) | Job is created, but has not been queued to be run.
QUEUED    | No | Job is queued and ready to be processed by the VBS.
IN-PROGRESS | No | Job has been picked up by a VBS.
PENDING\_CREDS | No | Accounts without credentials can be created and attached to jobs, however once they VBS gets to the login page, the job pauses until it receives creds.
AUTH | No | Job is authenticating with user credentials.
PENDING\_NEWCREDS | No | New credentials are required to conintue.
PENDING\_TFA | No | TFA required for job to continue.
NEWCREDS\_RECEIVED | No | VBS has acknowledged receipt of new credentials.
TFA\_RECEIVED | No | VBS has acknowledged receipt of tfa code.
UPDATING | No | VBS is authenticated with merchant site, client application may choose to let the user navigate away.
CANCEL\_REQUESTED | Yes | Job is not longer needed by the user, and can be safely deleted.

There are other statuses that may be returned, but they are mostly informational.  IMPORTANT: "PENDING_NEWCREDS" and "PENDING_TFA" indicates that a request message has been posted for that job, and the envelope_id included in the message will be required for a response. 

### Termination types

Termination types are set on jobs when the complete.  A single\_site\_job can't be considered finished until a termination type is set, and once a terrmination type is set, the job cannot be resurrected (although it can be re-run using an existing cardholder, card and account credentials).  Only the first four termination types should be processed, others should be ignored in webhooks and reporting.  

Termination Type | Notes
|-----------|--------
BILLABLE | Success
USER\_DATA\_FAILURE | Generally a credential/card problem
SITE\_INTERACTION\_FAILURE | CardSavr is unable to navigate the site successfully
PROCESS\_FAILURE | An unknown backend failure - should be reported as unsuccessful
NEVER\_STARTED | This will occur when a job is cancelled or never fully requested, but these should be ignored in webhooks and reeporting.

There are a large number of job statuses for USER\_DATA\_FAILURE termination types.  This value provides important information to the client as to why a job failed. These are included in the status of the [single\_site\_job](https://swch.github.io/slate/#single-site-jobs), the status field of the final [job update](../progress-messages/), any final webhook [notifications](../notifcations/), as well as any billing reports.  Since these are constantly updated, customers should provide the status\_message to users rather than use a static list. 

Status | Termination Type | Description
|------|------------------|-------------
PREPAID_ACCOUNT | USER\_DATA\_FAILURE | Prepaid accounts don't have cards on file
INACTIVE_ACCOUNT | USER\_DATA\_FAILURE | Account is inactive due to an unpaid bill or closed account
INVALID_CARD | USER\_DATA\_FAILURE | Card is detected as invalid by the merchant
INVALID_ADDRESS | USER\_DATA\_FAILURE | Some sites require accurate addresses
PASSWORD\_RESET\_REQUIRED | USER\_DATA\_FAILURE | Account is in a state that requires a password reset that must be done by the user
BUNDLED_SUBSCRIPTION | USER\_DATA\_FAILURE | No card on file and billed through another subscription (e.g. Disney+)
FREE_ACCOUNT | USER\_DATA\_FAILURE | Free accounts don't have a card on file and no paid subscrption
ACCOUNT_LOCKED | USER\_DATA\_FAILURE | Account has been locked by previous failed login attempts
DUPLICATE_CARD | USER\_DATA\_FAILURE | Some sites don't allow the same card placed twice
EXPIRED_CARD | USER\_DATA\_FAILURE | 
INVALID_CVV | USER\_DATA\_FAILURE | 
INVALID_NETWORK | USER\_DATA\_FAILURE | Some sites only accept one brand of card (no Amex, only VISA, etc.)
MAX\_LIMIT\_OF\_STORED\_CARDS | USER\_DATA\_FAILURE | Some sites only allow a certain number of cards
TIMEOUT_CREDENTIALS | USER\_DATA\_FAILURE | User failed to provide new credentials in a timely manner (~4 minutes)
TIMEOUT_TFA | USER\_DATA\_FAILURE | User failed to provide a new TFA code in a timely mannger (~4 minutes)
TOO\_MANY\_LOGIN\_FAILURES | USER\_DATA\_FAILURE | Only one failed login is allowed
TOO\_MANY\_TFA\_FAILURES | USER\_DATA\_FAILURE | Only one failed TFA code is allowed
CANCELLED | NEVER_STARTED | When an application explicitly sets the status to "CANCELLED_REQUESTED".
ABANDONED | NEVER_STARTED | When an application never receives an initial set of credentials.

