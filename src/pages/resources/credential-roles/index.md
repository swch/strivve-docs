---
title: Credential Types & Roles
template: resources
---

There are multiple credentials involved in using CardSavr.  User credentials represent the principal identity of the person or application agent using the CardSavr platform.  Payment card credentials represent the payment card being placed on merchant sites by CardSavr.  Merchant credentials represent the principal identity of the user using an online merchant site.

## User Credentials
This represents the principal identity of the person or application agent using the CardSavr platform.

### User Crendential Properties

CardSavr User Credentials have multiple properties associated with them.

### Name

A CardSavr user must have a unique name.  This is used to identify the identity or the person or application agent using the CardSavr platform.

### Password

A password is used as one of the mechanisms to verify the authenticity of a principal identity attempting to login to the CardSavr platform.  Users without a password can not log in directly, but rather they must use a credential grant.

### Credential Grant

A OAuth token, known as a Credential Grant within the CardSavr platform is used to authenticate a principal identity during login.  Credential grants must be acquired from CardSavr by a privileged user, typically for the purpose of Single Sign On.

### Role

There are multiple roles with different access privileges for CardSavr API services.  A CardSavr User is assigned one role and only one role.  Roles can be reassigned by a a user with a role of sufficient privileges, however role reassignment will not take effect until the next time the CardSavr user logins in.  The following roles are available for partner usage:

-admin: Most privileged user. This is typically a real person.
-analyst: User with read only access to reports. This is typically a real person.
-cardholder: A cardholder end user who can access their own information and place their card(s) on merchant sites.
--cardholder_agent: A user restricted to creating cardholder users.  This is intended for front end applications performing creation of a cardholder user and acquiring a credential grant for them.
-customer_agent: The second most privileged user.  This is intended for backend applications performing a multitude of automated operations.
-customer_auditor: User with read only access to audit records.
-developer: 3rd most privileged user. This typically a real person developing applications and testing them in non production environments.

## Payment Card Credentials

These credentials represent a payment card, including authenticity information.

### PCI Sensitive Authentication Data (SAD)
Data used by card issuers of payment cards to authorize transactions. This information requires stringent security handling. CardSavr is PCI-DSS compliant and takes great care to protect this information when it is stored temporarily or persistently within the CardSavr infrastructure.

#### PCI Primary Account Number (PAN)
Currently the 16 digit card number for a payment card.  An expanded 19 digit card number is scheduled for payment cards issued in 2020.

#### PCI Card Verification Value (CVV), (CVV2)
This 3 or 4 digit number is used as the primary data to authorize a PAN for a transaction.

#### Expiration
This MM/YY is the last month and year the payment card is valid for use in authorizing transactions.

### Personal Identifiable Information (PII)
This data represents artifacts that can be used to identify a person.

#### Cardholder Name
Name of the person the payment card has been issued to.

#### Cardholder Address
Billing postal address of the person the payment card has been issued to.

### Payment Credential Persistence 
The CardSavr API provides fine grain control of storing Payment Card Credentials within the CardSavr infrastructure to meet the storage policies of integration partners.

At a minimum, Payment Card Credentials must be stored temporarily until the payment card is placed on a merchant site.  Depending on the security policies of the integrating partner, these credentials can be stored persistently as long as the partner wishes and can be updated or deleted by the partner at any time. 

## Merchant Credentials
These credentials represent the principal identity of the Cardholder user on an online merchant site.

### User Name
The name of the cardholder user, used to identify them with the merchant site.

### Password
The password used to verify the authenticity of a user attempting to login to the merchant site.

#### Two Factor Authentication (TFA)
Merchant sites may challenge the cardholder user for an additional artifact to be used ln conjunction with the password to verify the identity of the user.  These challenges can come in various forms, via SMS text, an email or possibly some other mechanism.  Merchants may have setup TFA themselves or the merchant site may issue a TFA to authorize a device it hasn’t seen before.  CardSavr uses Robotic Process Automation to interact with merchant sites and its virtual browsers may need to be registered with the merchant site via TFA.  CardSavr will message the TFA challenge to the partner application and require the cardholder user to provide the TFA code during placement of the payment card on the site.

#### CAPTCHA/reCAPTCHA
This is another form of a TFA.  These are handled within the CardSavr infrastructure and do not require carholder interaction.

### Merchant Credential Persistence
The CardSavr API provides fine grain control of storing Merchant Credentials within the CardSavr infrastructure to meet the storage policies of integration partners. At a minimum, Merchant Credentials must be stored temporarily until the payment card is placed on a merchant site.  Depending on the security policies of the integrating partner, these credentials can be stored persistently as long as the partner wishes and can be updated or deleted by the partner at any time.

#### UX Convenience vs Security Threshold

The persistent storing of merchant credentials has additional considerations for user experience.  Credentials that are stored within CardSavr and still valid enable a card to be placed or updated without having the cardholder present.  This may be desirable in some use cases, for example automatically replacing a compromised card on a merchant site.  CardSavr provides a highly secure storage of Merchant Credentials that can address the security thresholds of many partners.

## Credential Data Protection

All Payment Credentials, including SAD and PII must be protected per the PCI-DSS controls. Merchant Credentials are not a concept that exists within PCI compliance. They are very sensitive information and it is incumbent upon Strivve to securely store them at or above PCI-DSS compliance mechanisms.  This is necessary to ensure cardholder trust with the partner and transitively Strivve is not compromised. Strive has designed and implemented a system that maintains both PCI SAD and Merchant Credentials with security mechanisms more stringent than PCI-DSS controls require.