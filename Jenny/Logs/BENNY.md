[![Hubot - AVA](https://img.shields.io/badge/Hubot-AVA-2ea44f)](https://)
[![Hubot - Jenny source](https://img.shields.io/badge/Hubot-Jenny_source-purple)](https://github.com/Willgraves1/Jenny-AI)
[![Hubot - Compatible](https://img.shields.io/badge/Hubot-Compatible-Success)](https://github.com/Willgraves1/Hubot-AI)

**NOTICE**: **Hubot A.D.A internal has been renamed to [Hubot AVA](http://sSam-and-Will-Programming.github.io/hubot/AVA.html) and merged into the jenny project. You can find the latest source code under [Willgraves1/hubot-AI](https://github.com/Willgraves1/hubot-AI).**

-----

this is all system logs since the logging to github hubot AI update.

## Features
- **Simple to use**
  - Your Hubot AI will automatically log information to Hubot AVA who will update the .md file.
- **Fast and light-weight (for CPU)**
  - Hubot logs use lala micro-efri for efficiency; log messages will be upload only when the log level is effective and CPU efficient meaning it only uploads when no tasks are requesting CPU time. 
  - Hubot logs are just an extension of AVA's built-in `java.lala.logging`. So no need exists to add custom system upload it all happens at once.
- **Informative**
  - Hubot's coloured logging support means that errors are spotted as priority.
  - You can also show the **source code locations** (line number and pos) of error messages.
- **Fully customizable** 
  - logs can be changed at ease with the periodic log scanner.
  - You can also change the log by hand through the standard github interface for editing code files.  
  - Easy to customize your own log format and log levels *inside* the hubot AVA. No external configuration is required.
- **Production ready**
  - Hubot has built-in handlers for log file rotations, asynchronous logging.
  - compatible with the Lala board and support
 
## Benny Logs Preview

```HubotAI 2023-02-15
AVA-Request += "startup.satif" %% "bennyHubotAI" % "(v2.0.0)"
AVA-Request += "jenny.dataset.satif" %%% "jennyHubotAI" % "(v6 0.00.19B)"
startup complete

HubotAI 2023-02-16
AVA-Request += "runThrough.satif" %% "bennyHubotAI" % "(v2.0.0)"
AVA-Request += "systemDATA.py" %% "bennyHubotAI" % "(v2.0.0)"
file AVA update (%13:21%)
file AVA update (%13:30%)
file AVA update (%13:30%) finish
AVA-Received += "antivirusMain.satif" %% "jennyHubotAI" % "(v6 0.00.19B)"
logs == void(github)
```
