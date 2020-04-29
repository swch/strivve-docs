---
title: Installation
weight: 1
template: docs
---

<div class="note">
  <strong>Note:</strong> 
  This is the demo content for demonstration purpose only. The primary function of this content is to show you what this theme can do. There is a more detailed explanation in the <strong>Getting Started</strong> section.
</div>

## Installation

Beging by cloning the repository

```bash
git clone https://github.com/swch/Strivve-SDK.git
```

To try out the SDK, cd to the sample directory, and:

```bash
npm install
```

This will install the SDK from npmjs.org as well as download the necessar dependencies.

The SDK is a typescript wrapper around the Strivve Cardsavr REST API.  Although there are several api calls you can make to manage your financial institutions users, cards and merchants, the CardsavrHelper of the SDK makes it easy to do the most common functions:  add credit cards to a user, and then post a job that can update that card on one or more merchant sites.  

For this sample, there are two applications.  The first is a simple node app that provisions a user and adds a credit card to their profile.  This card is encrypted and saved in the Cardsavr database, and only accessible by the updating process.  The second application is a simple web application written in javascript that collects a merchant site's credentails, posts a job to place that card, and then provides basic feedback to the cardholder:  status messages, and potentially additional security information like two-factor authentication codes, and even a chance to update the username or password.

If you are building your own application, you can also simply install the npm module into your own node or react application:

```bash
npm install @strivve/strivve-sdk
```
