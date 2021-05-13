---
title: Credential Grants
template: resources
---

CardSavr offers credential grants for login authentication of card holder users \(in addition to password keys\). Credential grants are intended for cardholders who have been authenticated by the financial institution \(FI\) infrastructure and are using the FI application. By implementing credential grants, these users do not have to have a CardSavr password when using the FI application; they will only need to log in to the FI infrastructure.

## OAuth JWT Tokens

Credential grants are issued by CardSavr acting as its own OAuth server.  They are implemented using the industry standard Java Web Tokens \(JWT\) \[RFC-7519\] using the HMAC-256 signing algorithm. 

#### Token Security

Credential grants must be properly secured to protect them from unauthorized use. CardSavr employs the following mechanisms to secure credential grants:

1. Credential grants have a short lifetime for use.  They are currently limited to 3 minutes before expiring.

2. A credential grant issued by CardSavr is limited in scope to the DNS domain it was issued from.

3. Requests to login with the credential grant requires providing the username the grant belongs to, where the grant does not encode the username.

4. The credential grant is HMAC-SHA256 signed by CardSavr. When a credential grant is submitted on login, CardSavr verifies the signature to ensure integrity and authenticity.

## Typical Grant Scenario

A typical implementation of the credential grant would be:

1. An agent (e.g. customer_agnet) creates a new cardholder in CardSavr. Agents that create cardholders automatically assume the ability to manage these newly created cardholders (add cards, post jobs, etc).  
1. Often times we wish to pass the responbility of this cardholder to a lesser privileged agent (e.g. cardholder_agent). This requires a grant.  Grants are created upon the creation of a cardholder and can be passed to the client application.  
1. The FI infrastructure makes a POST to `/cardholders', which creates the cardholder and returns the grant.
1. The FI infrastructure provides the token to the FI application.
1. The FI application then posts to `/cardholders/authorize` with the grant token.
1. The cardholder can now be managed by the FI application. The credential grant will expire 60 seconds after being issued. 

## Cardholder Authentication Best Practice

Strivve recommends that client applications run as cardholder_agents given the reduced permissions.  Infrastructure applications that procure cardholders and may want to do more privileged activities can run as customer_agents, but since the credentials are exposed in client applications, least privileged users should be used.
