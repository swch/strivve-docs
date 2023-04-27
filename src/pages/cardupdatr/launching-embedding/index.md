---
title: Launching and Configuration
weight: 2
template: cardupdatr-embed
---

CardUpdatr can be run as a standalone application simply launched as a url and configured within the Strivve Partner Portal (e.g. (https://acmebank.customer-dev.carupdatr.app))  However, CardUpdatr can also be embedded directly within a website, or launched from a configured link using a bootstrap library available on your CardUpdatr instance.  By using this bootstrap library, you can configure the look and feel and define custom FI parameters.  By using the CardUpdatr SSO product, you can even launch or embed CardUpdatr using an access grant created by a custom application that enables cardholders to avoid having to provide their card information. 

This section outlines four possiblities for launching CardUpdatr, how to configure the settings, and pros and cons for each.

## CardUpdatr launch modes

In the examples below, simply replace CARDUPDATR_HOSTNAME with the hostname provided via the following [form](https://strivve.com/cardupdatr/#cardupdatr-form).

### Launch with a Link

Launching CardUpdatr in a dedicated window is frequently the easiest experience for Cardholders.  Scrolling is simply achieved using a browser scrollbar, and when the user is finished, they can simply close the window.  

```html
    <script src="https://CARDUPDATR_HOSTNAME.cardupdatr.app/cardupdatr-client-v2.js"></script>
    <a href="#" onclick='launchCardUpdatr(
      {
        config: { 
          hostname : "CARDUPDATR_HOSTNAME.cardupdatr.app" 
        }, 
        user: {
          ...
        },
        style : { 
          ...
        } 
      }, target, options); return false;'>LAUNCH</a>
```

launchCardUpdatr can be called as a click handler from an anchor, a button or any other clickable element.

### Embedded

Embedding works well for embedding within a desktop experience.  It can provide the CardUpdatr app with supporting instructions and may fit more seamlessly into the application or browser experience.  Although inserted as an iframe, once again the boostrap library makes the insertion much more seamless.   Use the code below in your page to host the CardUpdatr within an iframe.  You must create a div that has the correct height, and then pass the id of the div into the initCardupdatr function. 

```javascript
    <div class="container" style="background-color: deepskyblue; width: 100%; text-align: center; padding-top: 3vh; min-height: 100vh;">
    <!-- This script loads in from a .cardupdatr.app domain. -->
    <script src="https://CARDUPDATR_HOSTNAME.cardupdatr.app/cardupdatr-client.js"></script>
    <!-- Empty div to initialize the iFrame which loads CardUpdatr. -->
    <div class="cardupdatr-frame" id="cardupdatr-frame"></div>
    </div>
    <script>
      window.initCardupdatr(settings = { 
        config: { 
          app_container_id: "cardupdatr-frame", 
          hostname: "https://CARDUPDATR_HOSTNAME.cardupdatr.app/" 
        } 
      });
</script>
```

### Launch from a Mobile Application

Similar to launching from a link, you can just as easily construct the web window url.  Both iOS and Android have simple mechanims for launching webviews within apps, but generally are launched using native parameters to control the containing child window.  This is not difficult, but it does require the application to assemble the url itself.

https://CARDUPDATR_HOSTNAME.cardupdatr.app/#settings={ ENDCODED\_SETTINGS\_JSON }

ENCODED\_SETTINGS\_JSON is simply the same json object passed in as the first parameter to launchCardUpdatr and embedCardUpdatr, only it must be url encoded.

[Here](https://github.com/swch/Strivve-SDK/tree/master/CU-iOS) is a sample iOS application that demonstrates this launching option.

### Launch as a standalone link

If configured entirely within the Strivve Partner Portal, cardholder can launch using their CardUpdatr url:  https://CARDUPDATR_HOSTNAME.cardupdatr.app/.

## Configuration Settings

There are three sets of settings that can be used to customize your CardUpdatr experience, separated into different configuration objects.  The "user" object is for customer specific data required to authenticate SSO users and also to provide customer specific logging.  The "config" object (some settings required) configures the FI for which CardUpdatr should run, how sites should be sorted, and which countries should be supported.  "style_template" is used to dynamically configured messages, colors and background images.

### config

```javascript
{
  config : {
    app\_container\_id: "APP_CONTAINER_ID", 
    hostname: "CARDUPDATR_HOSTNAME",  
    financial_institution: "acmecu", 
    top_sites: ["amazon.com", "apple.com", "audible.com", "hulu.com", "netflix.com", "spotify.com", "target.com", "uber.com", "venmo.com", "walgreens.com", "walmart.com"],  
    merchant\_site\_tags: ["usa,canada", "prod"],    
    countries_supported: ["Canada", "USA"] 
  },
```         

Property | Required | Default | Description 
-------- | -------- | ------- | -----------
app\_container_id | yes | | HTML element id that CardUpdatr is attached to
hostname | yes | | hostname of CardUpdatr (e.g. acmebank.customer-dev.cardupdatr.app)
financial_institution | no | first element of host, or "default" | Override the value in the hostname (recommended for embedded)
top_sites | no | [] | These sites are listed first on the "select-merchants" page
exclude_sites | no | [] | List of sites to be excluded (hostnames)
merchant\_site_tags | no | ["usa", "prod"] | usa AND prod -- to provide "OR" functionality, tags must be listed differently. "prod", "canada,usa" means prod AND (usa OR canada) 
coutnries_supported | no | ["USA"] | Populated in the country field of the address - if only one country, the country is assumed

### user

The user properties are unique to this partiular cardholder, and generally provide login and other customer specific properties necessary to assume a session.

```javascript
  },
  user : { 
    grant: "redacted", 
    card_id: "redacted",
    selected_sites: "12,14,15",
    custom_data: {
      SCOPE: { //customer defined SCOPE is optional, but recommended to avoid collisions
        CUSTOMER_KEY: "000000000000" 
      }
    }
  },
```

Property | Required | Default | Description 
-------- | -------- | ------- | -----------
username | no | | When using SSO, this value is generated by CardSavr and required to continue the session
grant | no | | Also returned by CardSavr and required for SSO
card_id | no | user's first card | When using SSO, this is the card_id to be used for this session
selected_sites | no |  | Pre-selected site ids collected from the user using a non-CardUpdatr component
custom_data | no | | Data that identifies this cardholder/session.  It is posted via webhooks when the session is terminated.

### style_template

style_template attributes can be dynamically configured with CardUpdatr's carduupdatr-client-v2.js.  They can optionally be configured in the Partner Portal, but dynamic flexibilty is sometimes preferred if running multiple brands under the same Financial Institution.

```javascript
  },
  style_template : { 
    name: "ACME Bank", 
    page_title: "Update your card!", 
    card_description: "ACME Bank Debit Card"  
    //By default, a message that will be appended and link to the select-merchants page: "Add your $card_description to more sites"
    final_message: "Thank you for updating your card, no further action is needed. Sites may notify you that your payment ",
    invalid\_session_url: "URL",  
    link_color: "#5e35b1",
    button_color: "#5e35b1",
    border_color: "#5e35b1",
    drop_shadow: false,
    dynamic_height: true
  },
```

Property | Required | Default | Description 
-------- | -------- | ------- | -----------
name | no | The FI name | The name of the issuer
page_title | no | The FI name | The title of the page
card_description | no | Set in the Partner Portal | included in the copy 
final_message | no | Set in the Partner Portal | A thank you message that appears after all accounts are linked
invalid\_session\_url | no | select-merchants | Once a session ends, the user can be directed to a new page to re-authenticate
link_color | no | #000000 | color of links (can also be configured in Partner Portal)
button_color | no | #000000 | color of buttons (can also be configured in Partner Portal)
border_color | no | #000000 | color of box borders (can also be configured in Partner Portal)
drop_shadow | no | true | draws a dropshadow around the visible area
dynamic_height | no | false | creates a fixed height on the credit card form and the merchant credential page - this breaks the sticky notification box


## Requesting a Sandbox Environment 

To request your own CardUpdatr preview instance, fill out the free preview form:  <a href="https://strivve.com/cardupdatr/#cardupdatr-form" target="_blank">Request Preview Now</a>  (NOTE: access-control frame-ancestors are used, so please include the hosting domain in your request.

***
