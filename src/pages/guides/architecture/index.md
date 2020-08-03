---
title: Architecture
template: guides
---

Strivve’s CardSavr Service is a Software As A Service (SaaS) which securely places payment cards on merchant sites on behalf of; and with explicit authorization of; Card Issuers and their cardholders. It uses Remote Process Automation to perform this task.  CardSavr is PCI-DSS 3.1 compliant.  

## Simplified View of the CardSavr Service Architecture

CarSavr systems architecture utilizes a modern Cloud architecture.  It is implemented on the PCI-DSS compliant Amazon Web Services (AWS) public cloud and relies on underlying AWS services for portions of its overall security. It provides multi-tenancy infrastructure to meet the needs of Financial Institution isolation.  At a minimum this isolation is provided by AWS Virtual Private Clouds (VPC) and depending upon the isolation requirements of a Financial Institution; within dedicated AWS sub accounts. Every PCI-DSS Cardholder Data Environment (CDE) is encapsulated within a VPC.  A Financial Institution can optionally have multiple CDE’s and often do in order to segment their application development from their production environment. The following diagram illustrates a simplified view of a VPC/CDE.

![Simplified CardSavr Architecture](/images/cardSavrSimpleArchitecture.jpg) 

In this illustration, the CDE boundary is defined by the VPC.  Every CDE is replicated across multiple AWS availability zones in a AWS Region, including multiple instances of each component in order to provide  high availability and scalability.  Each CDE has its own exclusive AWS RDS database to store Personal Identifiable Information \(PII\), Cardholder Data \(CHD\), Sensitive Authentication Data \(SAD\) and Merchant Credentials \(MC\), All Strivve developed components are single purpose servers encapsulated in hardened Docker containers and run as a cluster of tasks under the AWS Fargate orchestration management service on AWS EC2 virtual machines.

All CDEs run under the CardSavr top level domain **cardsavr.io**. Each CDE has its own subdomain environment name. CardSavr API is accessed  as the subdomain **api** in the invidual CDE subdomain. Example api url takes the form: https://api.<*cde-environment-name*>.cardsavr.io/*endpoint*.

### CardSavr API Server

CardSavr API Server is the central coordinator of the whole service.  All temporary and persistent data is managed by this server and stored in a AWS RDS database.  All card placement jobs are dispatched and managed by this server as well.

### Autonomous Browser

CardSavrAutonomous Browser interacts with merchant sites acting as a Remote Process Automation agent to place payment cards on behalf of cardholders on their merchant accounts.  It processes job requests dispatched to it via AWS SQS queues.

### Portal Web Server & WebApp

CardSavr Portal Web Server hosts the Portal WebApp  that is used by the Financial Institution as an administration tool for their CDE. The Portal WebApp interacts with the CardSavr Server using the CardSavr RESTful API.

### Financial Institution Applications

Financial Institution applications interact with the CardSavr Server using the CardSavr RESTful API. Optional Software Developmemt Kits are available for select programming lanuguages to simplify integration with the RESTful API.

## Application Integration with CardSavr

CardSavr provides a RESTful API at the protocol level.  Like other RESTful API’s it utilizes HTTPS as the base construct protocol and layers in the API with a combination of HTTP headers and JSON bodies. This API has a number of endpoints, each with its own URL path and supports the standard REST Create Read Update Delete (CRUD) paradigm in which the following HTTP methods are utilized:

- **Create** is implemented with the POST method
- **Read** is implemented with the GET method
- **Update** is implemented with the PUT method
- **Delete** is implemented with the DELETE method

Given the sensitive nature of PCI CHD/SAD data and the cardholder’s merchant credentials; CardSavr implements a number of security mechanisms  not typically found with RESTful APIs and can be more difficult to implement than many developers are used to.  A Software Development Kit \(SDK\) is available for select  programming languages which takes care of this complexity and enables the application developer to simplify interaction with the RESTful methods and JSON bodies of each endpoint.  The following diagram illustrates the two API integration paths.

![CardSavr API Integration Paths](/images/CardSavrSDK.jpg)

These security mechanisms include digital signing of all requests and responses, encryption of all request and response bodies, nonce replay attack prevention and ephemeral elliptic curve key exchange. Applications that integrate directly with this API must implement these capabilities.  Applications that integrate using a language specific SDK do not have to implement these security mechanisms as they are performed by the SDK itself.

## System Security

CardSavr utilizes a Defense-in-Depth  best practice model combined with strong cryptography rather than a hard shell and soft center strategy.  Network and compute infrastructure isolation is achieved through separate Cardholder Data Environment (CDE) environments, subnets within a CDE and compute resource access schemes; implemented through the use of AWS Account, AWS Virtual Private Cloud (VPC), AWS Security Groups/Identity and Access Management (IAM) and AWS Network Access Control (NACLs) respectively.  Within the CardSavr service all servers are single purpose and encapulated within hardened docker containerization; along with additional controls and cryptography  to provide finer grain authentication, authorization access and protection of PII, PCI CHD/SAD and merchant credentials. 

### Network Security  Layers

These  layers are designed to protect authorized card holder data in flight between financial institution applications and the API server; data in flight between services  within the CDE and data in flight between the CDE and external systems such merchant sites and operational support systems.  

First order confidentiality and integrity of authorized API data including card holder data is done utilizing Transport Layer Security with a minimum version 1.2 (TLS 1.2) protocol configured with best practice strong cryptography FIPS 140-2 Suite B ciphers and hashes.   Certificates issued by the Amazon CA using RSA 2048 bit keys are used to establish secure sessions; preferred cipher suite advanced elliptic curve ECDHE 256 bit key exchange is used for perfect forward secrecy of AES-GCM encryption for confidentiality; and SHA 256 bit hashing is used for integrity.  Additional confidentiality and integrity is provided to thwart potential Man in the Middle (MiTM) threats to TLS by the API security Layer for second order protection. 

Infiltration defense is provided by the AWS Application Load Balancer coupled with best practice AWS Security Group Policies  and Network Access Control \(NACLs\) for access to and within a CDE. Exfiltration defense is provided by  NACLs for the CDE VPC subnets. Recurring penetration tests and network scans are performed by PCI authorized vendors to verify these vulnerabilities don't creep into CardSavr.

Cardholder and MC data In flight between Autonomous Browsers \(aka Virtual Browsers\) and merchant sites is protected by TLS Version 1.2 or Version 1.3 and strong cipher suites.  Additionally the Autonomous Browsers are configured to accept only server certificates  issued by trusted Certificate Authorities(CA).  Self signed certificates are explicitly not allowed.

### API Security Layers

These layers are designed to provide authentication of applications, authentication of users,  second order confidentiality and integrity of in-flight card holder data , and authorization to access API endpoints and card holder data. 

#### Dual Identity Authentication

API Authentication of an application is employed by signing all API requests/responses to verify the authenticity of applications and prevent rogue application access. Signing uses an HMAC with 256 bit shared secret keys. Each approved application has a unique key generated by the CardSavr Partner Portal service. These application keys are rotated on a schedule configured by the Partner. The application key is used with the HMAC signing during the initialization of an API session, including authentication of the application user. Once the application user is authenticated,  a new ephemeral session key is created using a ECDHE key exchange, and this new session key is used for the remainder of the session for API HMAC signing and encryption. This strategy mitigates MiTM attacks through discovery of an application key by changing the session key to one that is not discoverable by the attacker.  The only sensitive information that can be discovered by this MiTM attack is an application's name, and a user's name. A users password is never transmitted.  CardSavr uses a zero knowledge proof method similar to Kerberos 5 for authenticity in which the password provided by the user is used by the application to generate a PBKDF2 key to sign the salt provided by the API server for the session that can be verified by the API server.  

#### Application Data Integrity and Confidentiality

API application data integrity is provided by the HMAC signature for each request/response.  API application data confidentiality is provided by AES-CBC 256 bit encryption using the current session key; initially the application key and then subsequently the ephemeral key for perfect forward secrecy (PFS) of all data for the remainder of the session.

#### Additional Exfiltration Protection

CardSavr provides additional exfiltration security for PCI-DSS SAD and Merchant Credentials. Payment card PAN and CVV are write only properties (part of a POST) and can not be read by applications.  Payment cards stored in CardSavr are referenced by the industry standard Payment Account Reference \(PAR\) mechanism.  Merchant credentials are also write only properties (part of a POST or PUT) and can not be read by applications.  These write only restrictions are in place to prevent accidental or ill intent disclosure of this sensitive information.

#### Authorization Roles

Authorization to access CardSavr services including cardholder data is done through the use of roles.  The combination of the authenticated application name coupled with the authenticated user name is mapped to a role.  Each API endpoint and specific properties of an end point, have access control restricted by role. 

## Persistent Data Security Layers

These layers provide access control, confidentiality and integrity to cardholder data at rest. 

### Data Base Security
Access control to the AWS RDS database is provided by AWS Security Group Policies and NACLs and by default is limited to only the CardSavr API Server and  Strivve tooling machinery.  Additionally deeper packet infiltration/exfiltration is controlled by NACLs at  the subnet boundary.

Confidentiality and integrity of the entire database for all card holders is provided by the RDS service utilizing AES 256 bit encryption using keys managed by AWS Key Management System \(KMS\) for each CDE VPC.

### Strivve Safe Security

In addition to AES encryption of the entire database, confidentiality and integrity of CHD/SAD and MC at a record level in the database for each card holder is provided by the Strivve Safe using 256 bit TwoFish encryption.  In addition to the PCI  critical security properties, the Strivve Safe also includes credentials for each site a card holder utilizes their card or cards with. The Strivve Safe is implemented as blob utilizing the open source Password Safe Version 3 (https://en.wikipedia.org/wiki/Password_Safe) designed by legendary cryptanalyst Bruce Schneier which intrinsically provides the credential data base necessary for merchant sites.  Proprietary custom records have been defined and implemented for payment card information including the PAN, CVV and Expiration.

Security of the Strivve Safe is provided by using a unique key for each card holder that is PBKDF2 derived by mixing a pair of keys. Strivve provides a unique key for a CDE protected by AWS KMS and the partner generates/maintains a per card holder unique key that is sent on each API transaction request needing access to the Strivve Safe.  The derived Strivve Safe key is used as passphrase input to TwoFish which in turn does a key stretch derivation that is used to protect the unique K & L keys for the data records in the safe.  Each time the safe is modified, new K & L keys are generated by TwoFish to encrypt/decrypt the data records. The per cardholder key can optionally be stored with CardSavr for short lived one and done use cases,  however for longer lived persistent use cases, it is recommened to not persistently store within the cardsavr.io infrastructure and is zeroized from memory upon the completion of the transaction it was provided for. This dual key mix provides additional security by requiring both keys be available to unlock (decrypt) the safe.