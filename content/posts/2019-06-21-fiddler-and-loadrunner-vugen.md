---
template: post
title: Fiddler and LoadRunner Vugen
slug: /posts/fiddler-loadrunner-vugen
draft: false
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
LoadRunner can create Vugen script from any captured traffic files such as `.cap`, `.pcap`, `.saz` or `.har` which are usually captured using tools like Fiddler, HTTPWatch, Chrome DevTools etc.

## Capture traffic using Fiddler
First step is to prepare your capture archive file. If you are new to fiddler, you might want to read [it here.](/posts/fiddler-quick-starter) Anyways, let's continue with the steps:
1. Lets open up fiddler, start capturing the http traffic and launch chrome.

2. Navigate to `https://duckduckgo.com` in Chrome and search for `happy hour`. You should see something like below in fiddler: ![recorded traffic in fiddler](https://i.imgur.com/ikrMNd5.png)
3. Add comments in fiddler session by pressing __m__ or right-click for options: ![add comments in fiddler](https://i.imgur.com/aypSrbs.png)
4. Save all sessions in an fiddler archive file (`DuckDuckGo.saz`) ![click save all traffic in Telerik Fiddler](https://i.imgur.com/rzjik94.png)

## Create LR Script
When it comes to generating LR scripts out of captured file, it's fairly easy and we have couple of options

### Usual way
1. Create new test in LoadRunner VuGen: ![create new test in VuGen](https://i.imgur.com/ifomsKu.png)

2. New vuser (virtual user) script looks like following figure: ![new vuser script](https://i.imgur.com/cviec7y.png)

3. Click __Start Recording__, select __Captured Traffic File Analysis__ in Record, browse and select the `DuckDuckGo.saz` file and hit _start recording_! ![start recording](https://i.imgur.com/DwrhTkJ.png)

4. When above step is finished processing, you have a full fledged Vugen script. *Voila!* ![generated script](https://i.imgur.com/B4xM8DG.png)



### Alternate way
If your LR was installed properly, you could also right-click on any captured traffic file (`.cap, .pcap, .saz or .har`) and select **Create VuGen script.** ![LoadRunner Create VuGen script](https://i.imgur.com/Ppb0cHu.png)

**Note:** this only works with protocols: Web - HTTP/HTML, Flex, SAP - Web, and Siebel - Web.
