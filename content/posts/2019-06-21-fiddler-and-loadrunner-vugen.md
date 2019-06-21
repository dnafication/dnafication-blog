---
template: post
title: Fiddler and LoadRunner Vugen
slug: /posts/fiddler-loadrunner-vugen
draft: true
date: 2019-06-08T23:36:45.694Z
description: >-
  Did you know Fiddler archive files can be automatically converted LoadRunner
  web scripts? Here is how.
category: performance-testing
tags:
  - performance-testing
  - web-dev
  - loadrunner
  - fiddler
---
## Capture traffic using Fiddler
First step is to prepare your capture archive file. If you are new to fiddler, you might want to read [it here.](/)



## Create LR Script

### Usual way

### Alternate way
If your LR was installed properly, you could also right-click on any captured traffic file (`.cap, .pcap, .saz or .har`) and select **Create VuGen script.**

**Note:** this only works with protocols: Web - HTTP/HTML, Flex, SAP - Web, and Siebel - Web.
