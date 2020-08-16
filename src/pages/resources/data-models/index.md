---
title: Data Model
excerpt: >-
  Data Objects and Models.
template: resources
---

The data model for the CardSavr platform is shown below. 
![Data Model](/images/data_object.jpeg "Data Model")


To create a card placement job, there are three data objects that must be created first. In 
order, these are:

* User - 
Represents the cardholder
[Users Endpoint](/api-sdk "Users Endpoint")

* Card - 
Represents a card
[Cards Endpoint](/api-sdk "Cards Endpoint")

* Account - 
Represents the credentials for a merchant and is linked to a merchant
[Accounts Endpoint](/api-sdk "Accounts Endpoint")

* (Optional) Address - 
Represents the billing address of a card
[Addresses Endpoint](/api-sdk "Addresses Endpoint")

Once these resources have been created, a card placement job can be create:

* Job - 
Represents the push-provisioning request to place a card as the default payment method at a merchant
[Jobs Endpoint](/api-sdk "Jobs Endpoint")


