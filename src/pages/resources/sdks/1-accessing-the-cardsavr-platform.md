---
title: Accessing The CardSavr Platform
weight: 6
template: resources
---

# Accessing the CardSavr Platform

The CardSavr platform provides a set of API that enables financial institutions
to place cards as the default payment method at a merchant.

Accessing the API endpoints requires four items:

1. The URL of the CardSavr API 
2. A user 
3. An Integrator (application) key

There are two ways to obtain the three required components.  

1. Access to a dedicated CardSavr environment
2. Access to a sandbox

For dedicated CardSavr environments, you will use the Partner Portal to setup the 
initial configuration (user, app, integrator key, and financial institution). Initial 
configuration of your dedicated CardSavr environment is shown here (<link_to_steps_below>)

For sandbox environments, you can request access [here](/sandboxrequest)
and the URL, user, financial institution name, and integrator (application) key will be provided to you.

### 1 - Partner Portal Access

The CardSavr platform supports multiple environments that can be used to separate functional 
needs.  For example, it is common to have a development environment and a completely 
separate production environment.  This section walks through the steps needed to 
enable development in your first CardSavr environment.  These steps include:

1. Partner Portal Access
2. Creating a second admin user
3. Creating your integrator (application) key
4. Creating your first financial institution

The Partner Portal provides administrative functions for a CardSavr environment and 
each CardSavr environment has it's own dedicated Partner Portal.

The Partner Portal is accessed at: `https://portal.<YOUR_ENVIRONMENT_NAME>.cardsavr.io` 
where <YOUR\_ENVIRONMENT\_NAME> is typically your organization name followed by "-" and 
the environment purpose.
        
For example, our internal development environment Portal is located at 
`https://portal.strivve-dev.cardsavr.io`

Credentials are provided during the initial environment hand-off with Strivve.

### 2 - Creating a second admin user

It is recommended that each environment have at least two administrators so that, 
 in the event an administrator is locked out, the organization can still administer 
 the CardSavr environment.

To create a second administration, select "User Admin" from the top menu, then "Add User", and finally select the
"admin" options from the roles dropdown.

### 3 - Configuring application access

Like administrators, each application that connects to the CardSavr environment must have 
its own user account.  These applications utilize specific roles within CarSavr referred to
as agent roles.  

To create an application account, select "User Admin" from the top menu, then "Add User", and finally select the
                             "customer agent" options from the roles dropdown.  Users are required to change
                             their password at first use, so you'll want to change the password again as soon
                             as you've created the user. If this is not done, the API will return an error
                             stating that the password has expired and must be changed.

In addition to the user account, an application has to have an application key referred to as an 
Integrator key.

To create an Integrator key, select "App Keys" from the top menu, then "Add App", and finally select 
the role (see below) to create the Integrator key.

| Role | Description
-----------------|--------------
application | Applications that create card placement jobs on behalf of cardholders
cust_internal | Internal tooling like provisioning systems

<!-- INSERT SCREENSHOT 1.3 HERE -->

### 4 - Financial Institutions

The CardSavr platform provides multi-tenant capabilities for those organizations that serve multiple financial
institutions.  Before using CardSavr you'll need to create a financial institution.  

To create a finanaicl instituion, select "Financial Institution" from the top menu, then "Add Financial Institution", 
and finally fill out the Name andand alternate lookup fields before saving.