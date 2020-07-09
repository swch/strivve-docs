---
title: CardUpdatr iFrame Sample
template: cardupdatr
---


## CardUpdatr iFrame Sample

Insert this code below into your page to host the CardUpdatr iFrame.

```javascript
<div class="container" style="background-color: deepskyblue; width: 100%; text-align: center; padding-top: 3vh; min-height: 100vh;">
    <!-- This script loads in from a .cardupdatr.app domain. -->
    <script src="https://HOSTNAME.cardupdatr.app/cardupdatr-client.js"></script>
    <!-- Empty div to initialize the iFrame which loads CardUpdatr. -->
    <div class="cardupdatr-frame" id="cardupdatr-frame"></div>
</div>
<script>
    // Parameters: blank, container div id to load in iframe, hostname of CardUpdatr instance.
    window.initCardupdatr("cardupdatr-frame", "https://HOSTNAME.cardupdatr.app/");
</script>
```


***
