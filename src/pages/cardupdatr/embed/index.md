---
title: Embedded
weight: 2
template: cardupdatr-embed
---

CardUpdatr can be run as a standalone site, or embedded into an iframe directly within your application. Running in this mechanism gives you the flexibility to control your branding, while not having to worry about interfacing with CardSavr directly for intercepting merchant messages and user feedback.

## CardUpdatr iframe Example

Insert this code below into your page to host the CardUpdatr within an iframe. Simply replace CARDUPDATR_HOSTNAME with the hostname of your cardupdatr environment instance.  You must create a div that has the correct height, and then pass the id of the div into the initCardupdatr function.


```javascript
    <div class="container" style="background-color: deepskyblue; width: 100%; text-align: center; padding-top: 3vh; min-height: 100vh;">
    <!-- This script loads in from a .cardupdatr.app domain. -->
    <script src="https://CARDUPDATR_HOSTNAME.cardupdatr.app/cardupdatr-client.js"></script>
    <!-- Empty div to initialize the iFrame which loads CardUpdatr. -->
    <div class="cardupdatr-frame" id="cardupdatr-frame"></div>
    </div>
    <script>

      /**
       * You must pass in an object to initialize CardUpdatr. The required properties in the object are app_container_id and hostname.
       * Optional object properties are:
       *  show_header (defaults to false)
       *  show_terms (defaults to false, if set to true it will show the user the T&C page)
       *  grant_object: { username, grant (optional), card_id (optional) } (grant_object is an optional object property of settings)
       * 
       * The most basic settings you can pass would look like:
       *  const settings = {
       *      app_container_id: "APP_CONTAINER_ID",
       *      hostname: "CARDUPDATR_HOSTNAME"
       *  };
       * 
       * Complete Settings Object Example: 
       *  const settings = {
       *      app_container_id: "APP_CONTAINER_ID",
       *      hostname: "CARDUPDATR_HOSTNAME",
       *      show_header: false,
       *      show_terms: false,
       *      grant_object: { username: "redacted", grant: "redacted", card_id: "redacted" }
       *  }; 
       * */
      window.initCardupdatr(settings = { app_container_id: "cardupdatr-frame", hostname: "https://CARDUPDATR_HOSTNAME.cardupdatr.app/" });
</script>
```

To request your own CardUpdatr preview instance, fill out the free preview form:  <a href="https://strivve.com/cardupdatr/#cardupdatr-form" target="_blank">Request Preview Now</a>

***
