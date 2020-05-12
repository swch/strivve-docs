---
title: GitHub - Strivve
excerpt: >-
  To make it easy to write documentation in plain Markdown, most UI components
  are styled using Markdown elements with few additional CSS classes.
template: docs
---

# Credential Types and Management

## Purpose
The purpose of this document is to provide developers and technical product
managers an overview of the data required by CardSavr. This document covers the
data required by the CardSavr platform and considerations regarding the safe
handling of this data from the CardSavr perspective. It does not address the
developer’s or integrator’s own security policy, compliance, or other regulatory
considerations.

## Background
Like many current account aggregators, the CardSavr platform requires credential
data for its operation.  However, CardSavr never uses this data to access
financial institution accounts.  Instead, the credential information allows
CardSavr’s autonomous browser technology to update the card on file at merchant
sites. This document will review the credential data types, where and when this
data is required by CardSavr, data retention, and data security considerations.
It is expected that developers and integrators of CardSavr will adhere to their
own security policies when handling this data. CardSavr requires three distinct
types of credential data: card payment credential data, merchant site credential
data, and safe key credentials. For readability, this document will refer to
merchant credential data as merchant authentication data.

## Customer Site Profile Access Considerations
There are choices an integrator must make as it pertains to the handling and
potential storage of merchant authentication data. Site credentials can be
changed at any time and customer involvement is necessary to maintain up-to-date
credentials if they are retained or they must be provided each and every time if
they are not retained.

Another factor to consider is the use of credential storage solutions, like
password managers, by the target customers.  These solutions come in many forms,
with varying features, which can all be used and are independent of the CardSavr
platform.  For instance, many people store card data and password data within
their desktop and the mobile browsers.  Others choose to make use of desktop and
mobile applications such as Dashlane or Lastpass for ease of use and security.
CardSavr is built to work in combination with any of these existing solutions
and by design does not dictate or limit the use or design of application
workflows.

# Data Types

## Merchant Authentication Data
Merchant authentication data provides cardholders access to their account at
that merchant.  CardSavr stores this data in a SwitchSafe which requires the
integrator’s safe key portion to decrypt at the time of a card on file update.

### Acquiring Options

Merchant authentication data is acquired from the cardholder during the initial
push provisioning workflow, either one-time initially or every time depending on
the data retention policy.

Integrated applications can choose to either directly acquire merchant
authentication data from cardholders or use CardSavr components in the SDK to
acquire merchant authentication data directly and store this data in the
CardSavr platform.  The benefit of using CardSavr for acquisition is that
merchant authentication data never transverses the integrator’s infrastructure.

Be aware that this data stored in CardSavr for future use may require real-time
cardholder interaction in the event of invalid authentication data
(bad password) or authentication challenge (MFA code).

## Data Retention Options

The merchant authentication data is sensitive information and should be handled
as such.  Integrators have a number of options available to them when using the
CardSavr platform. The integrator’s data retention policy should be balanced
against the cardholder experience. Removing merchant authentication data too
quickly or not storing it for use again later increases the need for real-time
cardholder authentication data when updating cards on file.

Using a simple Username and Password credential example, integrators have the
following options:

Never save and always ask users for authentication data
Save authentication data in CardSavr
Save authentication data outside CardSavr

Never Save and Always Ask Users for Authentication Data - Merchant
authentication data can be acquired from users and provided to CardSavr on
demand, use it for a single push provisioning transaction, and then remove it
immediately after completion of the push provisioning transaction.

Save Authentication Data in CardSavr - Merchant authentication data can be
safely stored in the CardSavr platform according to the integrator’s data
retention policy. This allows for future card on file updates without asking
for and acquiring merchant site authentication data.

Save Authentication Data outside CardSavr - Merchant authentication data can be
acquired and stored outside of the CardSavr platform. The Merchant authentication data is then provided to CardSavr for a one-time use, or stored persistently for future use, depending on integrator’s data retention policies.

## Card Payment Credentials

Online card payment credentials represent the card on file at merchants.
CardSavr can store the card information for merchant site updates in a
SwitchSafe which requires the integrator’s safe key portion to decrypt at the
time of a card on file update.

### Card Payment Credential Acquiring Options

Online card payment credentials can be sourced directly from the financial
institution’s existing infrastructure. This data can be stored by CardSavr
before or during a card on file action.

### Card Payment Credential Data Retention

The card payment credenials can be stored according to the integrator’s data
retention policy.

## SwitchSafe Key

### Acquiring Options

CardSavr holds sensitive data in a SwitchSafe object both in memory and at rest,
which is encrypted by using two separate keys. CardSavr stores one of the
required keys while the integrator or issuer holds the second key. Any card
update action requires the integrator to provide their safe key so that, when
combined with the second key held by CardSavr, the platform can decrypt the
sensitive information that will be placed on the cardholder’s merchant or
biller payment account. The integrator is required to generate and provide
this safe key when creating user or card objects within the CardSavr API and
the key must be provided when accessing or updating those objects in the future.

### Data Retention

The CardSavr platform requires the SwitchSafe key when acting upon objects
within the platform. The integrator must retain the SwitchSafe key until all
objects that utilize that key are deleted or that key is rotated and retired by
the integrator.

![image info](/images/cred_mgmt-data_storage.png)

# Cardholder Experience vs Security Considerations
Issuing cards does not stop at activation; in today’s competitive landscape,
you must provide a frictionless cardholder experience that inspires card loyalty
and increases transaction volume and card revenue by getting cards into
circulation faster and on more sites. With CardSavr, you gain insight into where
cardholders store your card online while making it easier for them to manage
card issue or reissue events.

The account aggregator market has shown that account holders are willing to share
their most sensitive credentials by the millions. When integrating CardSavr into
your digital banking experience, you must consider the trade-off between the
cardholder experience and security considerations. In the end, the best
cardholder experience (design) must be balanced with the integrator’s security
practices appropriate for the business.

***

### Here are the articles in this section:
