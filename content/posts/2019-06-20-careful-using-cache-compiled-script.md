---
template: post
title: Careful while using Cache compiled script in JSR223
slug: /posts/careful-using-cache-compiled-script
draft: false
date: 2018-05-02T03:06:35.377Z
description: >-
  The JSR223 test elements have a feature (compilation) that can significantly increase performance. 
  However, there's a catch!
category: performance-testing
tags:
  - performance-testing
  - jmeter
  - jsr223
---
> The JSR223 test elements have a feature (compilation) that can significantly increase performance. To benefit from this feature, When using this feature, ensure your script code does not use JMeter variables directly in script code as caching would only cache first replacement. Instead use script parameters.
>
>-JMeter Docs

As you can see in the following experiment, when the variable is directly used in the script and cached, the value is not getting updated each iteration. What happens is the very first time when the script is interpreted by JMeter, it replaces the values of JMeter variables with values and caches them. Be very careful when using the variables directly in the script when you are caching the compiled script.

```groovy
// C is a counter which increases every iteration 
// independently for each user

log.info(
  "JMeter Variable used directly in the script: ${C}"
  )
log.info(
  "JMeter Variable resolved from vars object: ${vars.get('C')}"
  )
log.info(
  "JMeter Variable passed in the Parameters: ${Parameters}"
  )

/* in the log

iteration 1

JMeter Variable used directly in the script: 1
JMeter Variable resolved from vars object: 1
JMeter Variable passed in the Parameters: 1

iteration 2 (the value of ${C} doesn't change 
as it is cached during compilation of groovy script)

JMeter Variable used directly in the script: 1
JMeter Variable resolved from vars object: 2
JMeter Variable passed in the Parameters: 2

iteration 3

JMeter Variable used directly in the script: 1
JMeter Variable resolved from vars object: 3
JMeter Variable passed in the Parameters: 3

iteration 4

JMeter Variable used directly in the script: 1
JMeter Variable resolved from vars object: 4
JMeter Variable passed in the Parameters: 4

iteration 5

JMeter Variable used directly in the script: 1
JMeter Variable resolved from vars object: 5
JMeter Variable passed in the Parameters: 5
*/
```