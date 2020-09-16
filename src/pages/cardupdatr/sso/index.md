---
title: Single Sign On
weight: 1
template: cardupdatr
---

CardUpdatr is a simple way for cardholders to select the merchants they'd like to update, and then monitor the jobs as they progress. The challenge with CardUpdatr is there is a significant barrier where the cardholder must enter their entire credit card form, address, and contact info.  Many financial institutions would prefer a CardSavr integration to streamline this process, but may not want to invest the initial effort to build a user interface.

With CardUpdatr SSO, you can make some simple API calls to set up the cardholder, and then hand over a token to CardUpdatr to handle the user interaction using [CardUpdatr Embedded](/cardupdatr/embed).

## Server Component

A server component is required to create the cardholder, card and address.  There are two SDKs that support this functionality.  Node and C#.  The javaascript library can also be used within a client to create the user.

The data format for the data objects can be found on the (API/SDK reference guide)[https://swch.github.io/slate]. 

### Node

The [strivve-sdk github repository](https://github.com/swch/strivve-sdk) has instructions for setup and execution. There is a CardsavrHelper class that makes creating the token extremely simple:

```javascript
const { CardsavrHelper } = require("@strivve/strivve-sdk/lib/cardsavr/CardsavrHelper");

try {
    const ch = CardsavrHelper.getInstance();
    const financial_institution = "default"; //all cardsavr instances come with a "default" fi
    //Setup the settings for the application
    ch.setAppSettings(cardsavr_server, app_name, app_key); 
    //Create a session for the application user (cardholder agent)
    if (await ch.loginAndCreateSession(app_username, app_password)) {
        //Save the card on a behalf of a temporary cardholder - return their username, grant, card par
        const data = await ch.createCard(app_username, 
                                         financial_institution, 
                                         cardholder_data, 
                                         address_data, 
                                         card_data);
        const handoff = { grant : data.grant, 
                          username : data.cardholder.username, 
                          card_id : data.card.id };
    }
} catch (err) {
    console.log(err);
}
 
```

Every cardsavr app requires a cardsavr server and an integrator name and key.  These can be obtained by [contacting developer support](https://developers.strivve.com/sandboxrequest).  You will also need an app username and password that the application uses to log onto the cardsavr platform using the integrator key to encrypt its payloads.

This is accomplished within the loginAndCreateSession call.  Once logged in, the application can call createCard which creates a user and card with an attached address.  The response object contains three imporant pieces of data:

* The ephemeral username that was created for this cardholer (attached to the cardholder object that is part of the response)
* A one-time credential grant that can be issued to different application (usually a frontend app) to assume the role of the cardholder -- this grant expires in three minutes
* The card_id for the created card, so the virtual browser knows which card to place

Many cardsavr functions are __asyncronous__ and require await to extract the return data from the Promise.

### Microsoft C Sharp

There is a corresponding [C# SDK](https://github.com/swch/metro_sdk_c_sharp) that accomplishes the same function:

```cs
using Switch.CardSavr.Http;
using Newtonsoft.Json;

CardsavrHelper helper = new CardsavrHelper();
helper.SetAppSettings(Context.accountBaseUrl, Context.accountCardholderAgentAppID, Context.accountCardholderAgentStaticKey);
await helper.LoginAndCreateSession(Context.accountCardholderAgentUserName, Context.accountCardholderAgentPassword, null, "{\"key\": \"my_trace\"}");

PropertyBag cd = new PropertyBag(){{"default", new PropertyBag(){{"token", "123"}}}};

ClientLogin login = await helper.CreateCard(Context.accountCardholderAgentUserName, "default", 
    new User(){ email = "foo@foo.com", 
                phone_number = "5555555555", 
                custom_data = cd },
    new Card(){ first_name="Strivve", 
                last_name="User", 
                pan="4111111111111111", 
                cvv="111", 
                expiration_month="01", 
                expiration_year="25" },
    new Address(){ is_primary=true, 
                address1="1234 1st ave", 
                city="Seattle", 
                subnational="WA", 
                postal_code="98006", 
                country="USA" }
);
await helper.CloseSession(Context.accountCardholderAgentUserName);
log.Info("username: " + login.cardholder.username + ", grant: " + login.userCredentialGrant + ", card_id: " + login.card.id);

```

It's a very similar pattern and requires the same developer integrator and user credentials to set up.  You'll also notice the usage of "custom\_data", which is a gneric object that can be passed into a user object. This custom_data atribute will appear in downstrem reporting and as part of [webhook notifications](/resources/notifications/).

## CardUpdatr

Once your application has the necessary information from the Cardsavr server, the application can hand off the credentials to CardUpdatr.  There are two ways to accomplish this.

### Redirection 

By supplying the parameters in the hash value of the url, CardUpdatr will automatically log in as the cardholder, and the cardholder can then select their merchants and corresponding credentials.  

```
https://acmebank.cardupdatr.app/#username=USERNAME&grant=GRANT&card_id=CARD_ID
```

### Embedding

For more information, see the [embedded CardUpdatr](/cardupdatr/embed/) integration to see how to embed CardUpdatr in an iframe and logging them in using the username and grant.

