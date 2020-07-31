---
title: Credential Grants
template: resources
---

CardSavr offers credential grants for login authentication of card holder users \(in addition to password keys\). Credential grants are intended for cardholders who have been authenticated by the financial institution \(FI\) infrastructure and are using the FI application. By implementing credential grants, these users do not have to have a CardSavr password when using the FI application; they will only need to log in to the FI infrastructure.

## Oauth JWT Tokens

Credential grants are issued by CardSavr acting as its own OAuth server.  They are implemented using the industry standard Java Web Tokens \(JWT\) \[RFC-7519\] using the HMAC-256 signing algorithm. 

#### Token Security

Credential grants must be properly secured to protect them from unauthorized use. CardSavr employs the following mechanisms to secure credential grants:

1. Crenential grants have a short lifetime for use.  They are currently limited to 3 minutes before expiring.

2. A credential grant issued by CardSavr is limited in scope to the DNS domain it was issued from.

3. Requests to login with the credential grant requires providing the username the grant belongs to, where the grant does not encode the username.

4. The credential grant is HMAC-SHA256 signed by CardSavr. When a credential grant is submitted on login, CardSavr verifies the signature to ensure integrity and authenticity.

## Typical Grant Scenario

A typical implementation of the credential grant would be:

1. An FI admin or customer agent creates a new cardholder in CardSavr without a password. This restricts login authentication for this cardholder to the credential grant.
2. The cardholder logs into the FI infrastructure and begins using the FI application.
3. The FI infrastructure makes a GET request to `/cardsavr_users/:username/credential_grant', which creates and assigns a JWT OAuth credential grant token for the user.
4. The FI infrastructure provides the token returned by `/cardsavr_users/:id/credential_grant' to the FI application.
5. The FI application submits the token in the request body to /session/login when the user is being logged in to CardSavr.
6. The user is now logged into CardSavr. The credential grant will expire 60 seconds after being issued. 

## Cardholder Authentication Best Practice

Strivve recommends not using passwords with cardholders and strictly rely on using credential grants for authentication of them.  Doing so eliminates the password attack vector for cardholders.  