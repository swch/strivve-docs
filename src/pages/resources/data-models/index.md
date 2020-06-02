---
title: Objects Models
excerpt: >-
  To make it easy to write documentation in plain Markdown, most UI components
  are styled using Markdown elements with few additional CSS classes.
template: resources
---

# Objects and Data

## Purpose
The purpose of this document is to provide developers and technical product
managers an overview of the data required by CardSavr. This document covers the
data required by the CardSavr platform and considerations regarding the safe
handling of this data from the CardSavr perspective. It does not address the
developer’s or integrator’s own security policy, compliance, or other regulatory
considerations.

## Background
Like many current account aggregators, the CardSavr platform requires credential
data for its operation.  However, CardSavr never uses this data to access
financial institution accounts.  Instead, the credential information allows
CardSavr’s autonomous browser technology to update the card on file at merchant
sites. This document will review the credential data types, where and when this
data is required by CardSavr, data retention, and data security considerations.
It is expected that developers and integrators of CardSavr will adhere to their
own security policies when handling this data. CardSavr requires three distinct
types of credential data: card payment credential data, merchant site credential
data, and safe key credentials. For readability, this document will refer to
merchant credential data as merchant authentication data.

