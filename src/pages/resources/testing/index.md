---
title: Testing
excerpt: >-
  Tesing with synthetic sites within CardSavr.
template: resources
---

# Overview
CardSavr provides synthetic merchant sites within non-production environments .  
These sites allow you to test your CardSavr integration without using live merchant sites.

## Synthetic Sites
Synthetic sites are simple responsive web applications that support a number of 
different interactive use cases.  For example, you can emulate a TFA 
(One-Time-Password) within your system.



The following table shows the interactions support by synthetic sites:

| Synthetic Site | Capabilities | Reference
-----------------|--------------|---------------
Basic Login | Mimics a site with only username/password login capabilities | "site_hostname": "Synthetic-Basic Login"
Multi-Factor-Authentication Login | Mimics a site that requires MFA as part of the login process | "site_hostname": "Synthetic-MFA Login"


### How To Use
You can post jobs to the synthetic site just like you would to a live merchant site.

First, ensure that you have all the objects need to post a job to the CardSavr API:

* User (must be created before the card or account object)
```json
{
  "username": "john_doe_123",
  "cardholder_safe_key": "sample_key",
  "first_name": "John",
  "last_name": "Smith",
  "email": "jsmith@email.com",
  "role": "dev"
}
```
* Card
```json
{
"cardholder_id": 3,
"address_id": 2,
"pan": 4111111111111111,
"par": "Q1J4AwSWD4Dx6q1DTo0MB21XDAV76",
"cvv": "123",
"expiration_month": "05",
"expiration_year": "24"
}
```  
* Account (site_hostname=synthetic.site)
```json
{
"cardholder_id": 11,
"site_hostname": "synthetic.site",
"username": "john_smith123",
"password": "sample_password"
}
```

Once these three objects exist in the CardSavr platform, you can 
post a job with the user_id, card_id, and account_id, and 
a site_hostname=synthetic.site
```json
{
"user_id": 1,
"card_id": 1,
"account_id": 1,
"site_hostname": "Synthetic-Basic Login",
"requesting_brand": "abc"
}
``` 

Using the synthetic sites, you can test the user interactions 
within your application 

## Explore CardSavr API With Postman

CardSavr environments can be configured to work with tools such as Postman, curl, etc.  A Postman template collection of requests is available along with usage instructions at GitHub for the [Strive-SDK](https://github.com/swch/Strivve-SDK/tree/master/postman-samples "Strivve-SDK") to aide in exploring the CardSavr API.