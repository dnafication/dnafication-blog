---
template: post
title: Interval Pacing Simplified
slug: /posts/interval-pacing-simplified
draft: false
date: 2019-05-20T12:36:45.694Z
description: >-
  Think time and pacing are a very important concept for a performance test engineer.
  Workload modeling depends on the correct application of concurrency and pacing. In short, 
  pacing controls the time between iterations.
category: performance-testing
tags:
  - performance-testing
  - web-dev
  - jmeter
  - loadrunner
---
The pace tells the scripted users how long to wait between iterations of your actions. With multiple think times that are random (in real-life scenarios), it is very important to calculate or have correct pacing to achieve the target throughput.

<figure>
    <blockquote>
        <p>Performance Testing: Do it right, or don't do it at all</p>
        <footer>
            <cite>— Anonymous</cite>
        </footer>
    </blockquote>
</figure>

### The store example
>Little's Law tells us that the average number of customers in the store L, is the effective arrival rate λ, times the average time that a customer spends in the store W, or simply:
>
>$$
>L = \lambda \times W
>$$
<cite>— [Wikipedia](https://en.wikipedia.org/wiki/Little%27s_law)</cite>

Wikipedia's store example is a good basis to understand how virtual user scripts work. Simple execution flow of a virtual user looks like below 

```python
# pseudo-code
# Iteration 1
do_transaction_1()
think_time()

do_transaction_2()
think_time()

do_transaction_3()
think_time()
...

pacing()

# Iteration 2
do_transaction_1()
think_time()

do_transaction_3()
think_time()

do_transaction_4()
think_time()
...

pacing()
...

```
From the above pseudo-code, it is clear that the total execution time of an iteration depends mainly on three things: actual execution of the code (HTTP request, client code, etc.), think-time in between user actions and the pacing. In real-life scenarios, all three can be unpredictable or dynamic but when you need to achieve a particular throughput of transactions i.e. achieve some transactions per hour or second, you would need to have predictable total execution time. Calculating right amount of pacing is key in this kind of situation.

![Interval Pacing breakdown](//images.ctfassets.net/yvcmf0lc3wc3/4qkbBtZMNlQGKZEXCT9Vhd/b8247256add00bc2711a971665bb2295/interval_pacing-Interval_Pacing_breakdown.png)

If we apply above formula (Little's law) in performance test scripts, here is what it would look like:

$$
threads = tps \times (ce + tt + p)
$$

where:
  - `threads`, number of threads or virtual users
  - `tps`, transactions per second
  - `ce`, total code execution time in seconds
  - `tt`, total think time in seconds
  - `p`, pacing in seconds

### Achieve interval pacing
In **LoadRunner**, you can use interval pacing (it allows you to choose a fixed interval or random withing a range) in run time settings. Easy-peasy in loadrunner. Following snapshot gets it right down to business:

![Interval pacing in LoadRunner](https://i.imgur.com/ARnzdTF.png)

Loadrunner allows two different flavors of interval pacing: 
1. Fixed, which means it will calculate remainder of the specified iteration time, and 
2. Random between a range. Same as number 1 but random!

In **JMeter**, there is no simple way of doing it without getting your hands dirty with some groovy or other supported scripting language. There have been some solutions where you specify a start time at the beginning of the script and then calculate the remainder of the pacing at the end of the script. After spending some time experimenting with different ways of doing this, I found following to be the best and I have standardized it in my test suites. This controller can be dropped in to any jmx file and it will enable interval pacing for withing the scope. This expects a JMeter variable '<ThreadGroup Name>_Pacing' in milliseconds.

1. Create a Test Action, call it may be 'Pacing'
2. Add a JSR223 Timer with groovy (2.4 or above) as language. Check cache compiled script and paste the following code:

```groovy
/**
 * PACING
 * the interval pacing solution.
 * 
 * @author dinanathbasumatary
 */

// initialize current date
def d = new Date() 
def thread = ctx.getThreadGroup().getName()

if (vars.get("${thread}_Pacing") != null){
  //parse the pacing from variable
	pacing = Long.parseLong(vars.get("${thread}_Pacing")) 
	
	try {
		String startTime = vars.get("pacingStartTime")
		
		if (startTime != null) {
			def diff = d.getTime() - Long.parseLong(startTime)
      // logic to calculate pacing
			def sleep = pacing > diff ? pacing - diff : 0 
			log.info("[ ${thread} - Pacing: ${pacing}ms, Remaining time: ${sleep}ms ]")
			
			return sleep
		}
		else {
			log.info("[ ${thread} - Pacing: initialized! ]")
		}
		return 0
	}
	catch (NumberFormatException e) {
		return 1000
		log.warn("[ ${thread} - Pacing: unable to parse start time ]", e)
		throw e
	}
	catch (Exception e) {
		return 1000
		log.warn("[ ${thread} - Pacing: Failed to calculate pacing ]", e)
		
    		throw e
		//SampleResult.setSuccessful(false)
	}
}
else {
	log.error("[ ${thread} - Pacing: a jmeter variable named '<ThreadGroupName>_Pacing' is expected. eg: '${thread}_Pacing'. Please add it before proceeding! ]")
	log.error("[ ${thread} - Pacing: Stopping the test. ]")
  
  // stop test if its not defined.
	ctx.getEngine().askThreadsToStop() 
	return 0
}

```
3. Add another JSR223 Sampler and paste the code below:

```groovy
SampleResult.setIgnore()
def d = new Date()
vars.put("pacingStartTime", "${d.getTime()}")  // reset pacing start time to current time
```
4. You can add a parent `Simple Controller` to combine them all together. Let's call it pacing controller.
5. This `Simple Controller` needs to be added to the beginning of the script. Tree in the figure below:

![Pacing Tree](https://i.imgur.com/UEV6vEa.png)

**Note**: This script expects `<ThreadGroup Name>_Pacing` to be defined somewhere before the pacing code gets executed. Otherwise, it will kill the test.

[Download the example script here.](//assets.ctfassets.net/yvcmf0lc3wc3/1Nc4HPpl83q1ab1wRDxBEf/85b7cc088bdf345e911e1e3722351ff9/pacing.jmx)

Please write to me in the comments below or contact me to learn more about the code.