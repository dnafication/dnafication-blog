---
template: post
title: Introducing saz2jmx
slug: /posts/introducing-saz2jmx
draft: false
date: 2019-08-04T14:36:45.694Z
description: >-
  There were times when I wished I could convert HTTP sessions captured in fiddler
  to JMeter scripts. It was all manual. So, I built a tool to automate that.
category: performance-testing
tags:
  - performance-testing
  - web-dev
  - jmeter
  - fiddler
---
*There were times when I wished I could convert HTTP sessions captured in fiddler
to JMeter scripts. It was all manual. So, I built a tool to automate that.*

## Introducing saz2jmx
![Banner for saz2jmx](/../../static/media/saz2jmx.png)

A utility to convert fiddler capture archive (saz) to jmeter script (jmx). It creates the jmx with defaults and boilerplate.

## Motivation
As a Performance tester (or "http hacker") we quite regularly play with tools like [Fiddler](https://www.telerik.com/fiddler) which helps us to log/inspect/edit/save all http(s) traffic between the client and the server. Another favorite tool is [Apache JMeter](https://jmeter.apache.org) which is used for generating high number of http and all kinds of traffic and measuring transaction attributes. This CLI tool/library attempts to bridge the gap between the two by enabling users to generate a jmeter script from a fiddler capture archive.

### Alternatives and their pain points
There are many ways/tools of recording http traffic, however I was not entirely happy with the experience:

* [HTTP(S) Test Script Recorder](https://jmeter.apache.org/usermanual/jmeter_proxy_step_by_step.html): JMeter's very own http traffic recorder. The interface is hard to use and does not allow you to save the recorded data (easily 😉)
* [Blazemeter Chrome Extension](https://www.blazemeter.com/blog/the-new-blazeMeter-chrome-extension-v4-easily-script-jmeter-and-selenium): doesn't save the responses which is crucial for the process of correlation and enhancement of the JMeter scripts.
* [Blazemeter's Online converter](http://converter.blazemeter.com) does not support converting fiddler archive files and only small files are allowed.

## Features
Features of saz2jmx:

- Ability to convert a Fiddler archive (`.saz`) file to JMeter script
- Map the comments in Fiddler archive to Comments in the JMeter Samplers
- Assist with HTTP redirection `HTTP302`: it is very important enhancing the scripts
- Simple to use interface
- Pacing code already in the template


If you are just after parsing the fiddler archive (saz) file. You can have a look at [saz2js](https://www.npmjs.com/package/saz2js), the library for parsing the fiddler archive into js objects/JSON.

## How to use?
Make sure you have Nodejs and npm installed. [Latest LTS Version: 10.16.0 (includes npm 6.9.0)](https://nodejs.org/en/download/). 

### Easiest: as an npm executable
Run following in command prompt or terminal to execute directly without installing the package

```shell
npx saz2jmx -s source.saz -d destination.jmx
```

### Easier: as a CLI
Install the package by running `npm i -g saz2jmx`. Then run the program as a CLI (command line interface)

```shell
saz2jmx -s source.saz -d destination.jmx

Options:
  -v, --version                    output the version number
  -s, --source <source>            source .saz file
  -d, --destination <destination>  destination .jmx file
  -h, --help                       output usage information
```

### Easy: as a JavaScript module in your program
1. Initialize your node app `npm init`
2. Install the package `npm i saz2jmx`
3. Use it as a module in your nodejs program (eg. CI/CD, automation etc), say `script.js`

```javascript
let saz2jmx = require('saz2jmx');
saz2jmx('c:/path/to/imported.saz', 'exports/exported.jmx');
```
3. Execute `node script.js`

## Contributors welcome!
Just send pull requests with feature/bug description. We can discuss about the approach through comments in [issues page](https://github.com/dnafication/saz2jmx/issues). 

* [NPM Release](https://www.npmjs.com/package/saz2jmx)
* [Github Repository](https://github.com/dnafication/saz2jmx)

## Features/Issues/Bugs?
If you have any feature requests or have faced any bugs while using this tool, [Click here](https://github.com/dnafication/saz2jmx/issues/new) to create new issue.

## Future?
This is an open source project and you are free to fork this to add other functionalities. I would be happy 
if you could help me with new features or re-write this to make it a better tool.
- ability make samplers configurable (pass in a json maybe?)
- ability add additional jmeter components
- create `jmx` from bzt configs (`yml`) 
- add tests

