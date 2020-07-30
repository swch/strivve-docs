---
title: CardUpdatr iFrame Sample
template: cardupdatr-embed
---


## CardUpdatr iFrame Sample

Insert this code below into your page to host the CardUpdatr iFrame and replace __HOSTNAME__ with the hostname of your cardupdatr environment instance.

```javascript
<div class="container" style="background-color: deepskyblue; width: 100%; text-align: center; padding-top: 3vh; min-height: 100vh;">
    <!-- This script loads in from a .cardupdatr.app domain. -->
    <script src="https://HOSTNAME.cardupdatr.app/cardupdatr-client.js"></script>
    <!-- Empty div to initialize the iFrame which loads CardUpdatr. -->
    <div class="cardupdatr-frame" id="cardupdatr-frame"></div>
</div>
<script>
    // Parameters: app_container_id, id of a div id load iframe within, URL of CardUpdatr instance.
    window.initCardupdatr({ "app_container_id": 'cardupdatr-frame', "hostname": 'https://HOSTNAME.cardupdatr.app/');
</script>
```

To request your own CardUpdatr preview instance, fill out the free preview form:  <a href="https://strivve.com/cardupdatr/#cardupdatr-form" target="_blank">Request Preview Now</a>

***
