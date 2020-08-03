---
title: Environments
template: resources
---

Every PCI-DSS Cardholder Data Envrionment \(CDE\) in CardHolder is instantiated in an isolated AWS Virtual Private Cloud \(VPC\) and is accessible by a unique DNS namespace.

## Per VPC CDE

Each CDE is considered a seperate isolated tenant.  A partnering Financial Institution \(FI\) may have multiple CDEs in order to meet thier needs.  Typically an FI will have a minimum of two CDEs, one for development/quality assurance and another for production. The following diagram illustrates a simplified view of a VPC/CDE.

![Simplified CardSavr Architecture](/images/cardSavrSimpleArchitecture.jpg "Simplified CardSavr Architecture") 

### CDE DNS Name Space

All CDEs run under the CardSavr top level domain **cardsavr.io**. Each CDE has its own subdomain name . CardSavr API is accessed  as the subdomain **api** in the invidual CDE subdomain. Example api url takes the form: api.*cde*.cardsavr.io/*endpoint*.

### Optional Non-Production CDE API Cryptography Relaxation

In order to simplify development debugging of applications, non production CDE instances can be configured to accept both API digitallly signed and encrypted requests/response as well as plaintext \(non digitally signed and encrypted requests/responses\) over TLS secured connections.  This enables the use of tools such as Postman to experiment with the CardSavr API along with easy dumpting of network traffic for analysis and debugging.  This API capability is restricted to non production CDE instances and can be requested for these types of CDE environments. 

## CDE Administration

Each CDE nas a Partner Portal for the partnering FI to utilize in administering thier CDE.