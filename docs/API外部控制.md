# External Control

In addition to automating software operations, the external control feature enables automation of pbottleRPA itself.

External control provides a series of **HTTP interfaces** to control pbottleRPA itself, which can be issued by third-party systems or RPA cluster controllers.

External control features are only available for the Enterprise Edition. See pbottleRPA software license for details: https://officetool.online/pbottle-rpa/

## External Start Flow

Start a custom task in pbottleRPA from an external controller.

Usage:
http://ip:49888/?action=pbottleRPA_run&path=ScriptPath

- Successful task start returns: ok
- Previous task not yet finished: isRunning


## External Stop Flow

Stop a running task in pbottleRPA from an external controller.

Usage:

http://ip:49888/?action=pbottleRPA_stop


## Current Running Status

Query the running status of pbottleRPA from an external controller.

Usage:

http://ip:49888/?action=pbottleRPA_state

- Idle status returns: ready
- Running status returns: isRunning


## External Control Buffer Access

Buffer is the cross-script global state variable storage and access management mechanism of pbottleRPA.

#### bufferSet Command

Set buffer stored content.

This buffer can be accessed across scripts, only resets on RPA restart, thread-safe for read/write.

@param {*} n buffer index, 0-9 (10 total)  default: 0 first buffer

@returns "ok" indicates success

(POST method): http://ip:49888/action=bufferSet&n=0, content set in POST body, typically a JSON string.

#### bufferGet Command

Get buffer stored content.

This buffer can be accessed across scripts, only resets on RPA restart, thread-safe for read/write.

External HTTP access: http://ip:49888/action=bufferGet&n=0

@param {*} n buffer index, 0-9 (10 total)  default: 0 first buffer

@returns string

http://ip:49888/action=bufferGet&n=0


## External Set Scheduled Task

Modify pbottleRPA scheduled tasks (timers) from an external controller.

Usage:

http://ip:49888/?action=pbottleRPA_plan&plan=* *

Timer rule reference: https://www.pbottle.com/a-13868.html


## External Get Device Unique ID

Get the current device RPA unique ID from an external controller.

Usage:
http://ip:49888/?action=pbottleRPA_deviceID

Often used for distribution control and verification of commercial encrypted scripts.


## External Get Running Log

Get the running log of the last task from an external controller.

Usage:
http://ip:49888/?action=pbottleRPA_lastLog

Typically used to inspect detailed execution process.

---

Get the second-to-last running log:
`http://ip:49888/?action=pbottleRPA_lastLog2`


## delaySet Set Chained Task


`pbottle.delaySet(scriptPath)`

Set a chained execution script.

When the current script ends (whether normally or with an error), this script will be launched automatically.

External HTTP set (GET method): http://ip:49888/action=pbottleRPA_delay&path=MyPATH

@param {string} scriptPath path to the chained script  e.g.: 'D:/test.mjs'  If empty, clears the currently set chained task.

@returns {string} "ok" indicates success


- Supervise task execution
Task A is a complex long flow. During execution, various issues and errors may cause a certain probability of not completing the task.
In this case, set a chained task B at the beginning of task A. B acts as a supervisor for A, and can verify whether A's key indicators were achieved when A exits. Based on the verification results, it can notify a human or even restart task A.
