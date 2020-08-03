---
title: Resources
menus:
  main:
    title: Resources
    weight: 2
template: resources
---

Creating applications with the CardSavr API involves working with the API, user and card credentials, PCI compliance, 
environments, the Partner Portal, and additional components. These resources are intended to provide the information 
you'll need to successfully integrate the CardSavr API with your system.

# Software Development Phases
Application development is more than just code. The CardSavr platform is designed to support your entire software 
development process. From intial setup to operations and everything in between, you'll find the information you need 
here.
![image summary](/images/ProcessSummary.png)

## Environments
Development organizations often utilize multiple environments when developing applications. The environments typically
consist of dev, test, and production. The CardSavr platform supports multiple environments through the use of AWS VPCs.

(Use the Quickstart guide to start placing cards at merchant sites with minimal effort.)

## Partner Portal
Each environment is administrated via the Partner Portal. This administration portal is essentially a custom application
built using the same APIs that you utilize. This administration portal allows you to create users, register applications,
get reporting data, and create the financial institutions that will use your application.

## Data Model
The CardSavr API allows the placement of cards as the default payment method at merchant sites. These card placement
jobs require four objects - billing address (address), card details (card), merchant credentials (account), and user.

## Testing - Live and Synthetic Sites
Application development requires a lot of testing. While non-production CardSavr environments have access all 
merchant sites you may not want to test against real merchants. CardSavr provides synthetic sites that mimic the 
use cases that you will encounter on real merchant sites. The behavior of the synthetic sites is controlled by the 
data provided so you can write automation tests of your uses cases.

## Credentials
Learn about both user credentials (username/password and TFA) as well as payment card credentials.

***
