---
title: User Experience
weight: 2
template: guides
---

Updating the payment method at a merchant with a new card is a multi-step process. Generally, these steps can be 
separated into two phases.  Authentication and updating.  In the authentication phase, the CardSavr platform attempts 
to authenticates against the merchant site.  Once authenticated, the CardSavr platform moves to the updating phase 
where it places the new card as the default payment on the merchant site. While the updating phases is completely 
automatic, the authentication phase may require user interaction in cases where incorrect credentials have been 
supplied or the merchant provides a challenge response to the user. 

In general, a more detailed look at the authentication phase involves:

1.	Acquiring the merchants to update from the user, your backend system, or those stored in CardSavr.
2.	Acquiring the credentials for each merchant if they are not already stored in CardSavr.
3.	Allowing CardSavr to authentication against each merchant site and either succeed or responded with a challenge 
request (invalid credentials, MFA)
4.	Informing the user of any merchant specific notifications that may occur (merchants may provide a separate 
notification directly to their user letting them know that their payment method has been updated)
5.	Once authenticated, informing the user that the account has been linked and there is no further action on their 
part for that merchant
6.	When the updating phase is complete, the CardSavr platform will provide an update via webhook that can be used to 
notify the user of the final status.

CardSavr handles of the complexity associated with authentication and provides a process indicator but the user 
experience should account for the various scenarios that can happen.  

![CardSavr API Integration Paths](/images/CardSavrSDK.jpg)
Additionally, notification of the final status can be done out of band using existing notification patterns.

![CardSavr API Integration Paths](/images/CardSavrSDK.jpg)
