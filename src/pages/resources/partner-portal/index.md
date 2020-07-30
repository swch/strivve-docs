---
title: Partner Portal
excerpt: >-
  Partner Portal
template: resources
---

# Overview

Each CardSavr environment includes an portal application used in the administration of
that environment.  This includes creating cardsavr users, configuring applications for use 
with CardSavr and various other tasks. This portal is known as the Partner Portal 
and is reachable over the Internet under the domain name for your environment. Strivve 
provides the initial admin account for the customer to utilize in managing their 
development environment. Per PCI-DSS requirements, password must be changed on first login 
and every 90 days after.  This requirement to change an initial password applies to 
all users who are people.  Automation users known as agents within CardSavr are not 
required to changed their password on first login but must have their have their 
passwords changed every 90 days just like all users.

# Accessing

The Partner Portal can be accessed at https://portal.<environment_name>.cardsavr.io where 
<environment_name> indicates the name for your environment.  For example, 
https://portal.strivve-dev.cardsavr.io. 

# Menu Items
The following menu items are available

| Menu Item | Functionality
--------|-----------
Admin User Panel | Create and delete users within the environment
Merchant Reporting | Generate usage reports from the environment
App Keys | Create and delete application keys
Edit My User Info | Update your user account information
Edit My Password | Change your password
Financial Institutions | Create and update financial institutions.  Associate BINs with financial institutions

# Admin User Panel
#### Creating, Editing, and Deleting

User administration is done via the Admin User Panel section of the Partner Portal.

* To add a user, select the "Add User" button.  Note that roles are described here [LINK_TO_ROLES_SECTION]

* To search for a user, select the parameter to search for [email, first name, last name, 
username, or role] and enter the search criteria

* To edit or delete a user select them from the list and update their account or select delete

# App Keys
#### Creating, Editing, and Deleting App Keys
Application keys allow your applications to access the CardSavr platform.

* To edit, select the key from the list using the edit button

* To add an application key, select the "Add App" button

# Merchant Reporting
The merchant reporting section provides and overview of the usage by success and BINs.

* You can search for a usage record by select the attribute [BIN or Status] and entering
the search paramter

* Download a CSV of your usage data by selecting the start and end dates and press "Download CSV"

# Edit My User Info
Selecting Edit My User Info allows you to update your account

# Edit My Password
Selecting Edit My Password allows you to update your password

# Financial Institutions
Financial institutions represent the organizations using the CardSavr environment. BIN information
is attached to a Financial Institution and is added to usage reporting. 

* To add, select "Add Financial Institution"

* To manage BINs, select "Add Bin" associated with the Financial Institution

    