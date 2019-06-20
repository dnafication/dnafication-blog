---
template: post
title: ITEMDATA for web_submit_data in NP++
slug: /posts/itemdata-for-web-submit-data
draft: false
date: 2018-03-20T03:06:35.377Z
description: >-
  Formatting raw POST data to add to Loadrunner's web_submit_data function using
  Notepad++
category: performance-testing
tags:
  - performance-testing
  - loadrunner
  - notepad++
  - regex
---
Using the tool of your choice (Chrome dev tools, Fiddler etc.) grab the HTTP request body which is usually in format `key/name=value` pair. Example below:

``` http
appointmentEntryOption=RESERVING&appointmentBean.appointmentTimeOption=NEXT_AVAILABLE&appointmentBean.preferredTime=1&appointmentBean.startDate=&appointmentBean.endDate=&appointmentBean.referenceID=&appointmentBean.contactName=&appointmentBean.contactNumber=&appointmentBean.contactNote=&appointmentBean.alternateContactName=&appointmentBean.alternateContactNumber=&appointmentBean.alternateContactNote=&appointmentBean.accessInstructions=&appointmentBean.otherAccreditation=&appointmentBean.additionalSiteInformation=&appointmentBean.siteInfo=&appointmentBean.specialConditions=&submit=Create+Order
```

Replace `&` (ampersands) with `\n` (new line) in notepad++ which will make it look like below:

```c
appointmentEntryOption=RESERVING
appointmentBean.appointmentTimeOption=NEXT_AVAILABLE
appointmentBean.preferredTime=1
appointmentBean.startDate=
appointmentBean.endDate=
appointmentBean.referenceID=
appointmentBean.contactName=
appointmentBean.contactNumber=
appointmentBean.contactNote=
appointmentBean.alternateContactName=
appointmentBean.alternateContactNumber=
appointmentBean.alternateContactNote=
appointmentBean.accessInstructions=
appointmentBean.otherAccreditation=
appointmentBean.additionalSiteInformation=
appointmentBean.siteInfo=
appointmentBean.specialConditions=
submit=Create+Order
```

Now go the the start of the line in the text and bring up the Replace dialog box in Notepad++:

Find: `^(.\*?)=(.\*?)$` 

Replace with: `"Name=\1", "Value=\2", ENDITEM,`

Click replace all. Final output will be:


```c
"Name=appointmentEntryOption", "Value=RESERVING", ENDITEM,
"Name=appointmentBean.appointmentTimeOption", "Value=NEXT_AVAILABLE", ENDITEM,
"Name=appointmentBean.preferredTime", "Value=1", ENDITEM,
"Name=appointmentBean.startDate", "Value=", ENDITEM,
"Name=appointmentBean.endDate", "Value=", ENDITEM,
"Name=appointmentBean.referenceID", "Value=", ENDITEM,
"Name=appointmentBean.contactName", "Value=", ENDITEM,
"Name=appointmentBean.contactNumber", "Value=", ENDITEM,
"Name=appointmentBean.contactNote", "Value=", ENDITEM,
"Name=appointmentBean.alternateContactName", "Value=", ENDITEM,
"Name=appointmentBean.alternateContactNumber", "Value=", ENDITEM,
"Name=appointmentBean.alternateContactNote", "Value=", ENDITEM,
"Name=appointmentBean.accessInstructions", "Value=", ENDITEM,
"Name=appointmentBean.otherAccreditation", "Value=", ENDITEM,
"Name=appointmentBean.additionalSiteInformation", "Value=", ENDITEM,
"Name=appointmentBean.siteInfo", "Value=", ENDITEM,
"Name=appointmentBean.specialConditions", "Value=", ENDITEM,
"Name=submit", "Value=Create+Order", ENDITEM,

```

Now it can be added to `ITEMDATA` section of `web_submit_data`.
