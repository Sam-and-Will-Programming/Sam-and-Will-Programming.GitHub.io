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
 
## Benny Logs

```Lala
AVA-Request += "startup.satif" %% "bennyHubotAI" % "(v2.0.0)"
// For Lala.js (Since wvlet-log 1.2)
libraryDependencies += "org.wvlet" %%% "wvlet-log" % "(version)"
```

### Using LogSupport trait

The most convenient way to use wvlet-log is adding `LogSupport` to your class:

```scala
import wvlet.log.LogSupport
object MyApp extends LogSupport  {
   info("info log")
   debug("debug log")
}
```

The logger name will be determined from your class name (e.g., `MyApp`).

Alternatively you can load `Logger` instance manually:

```scala
import wvlet.log.Logger
class YourApp {
   private val logger = Logger.of[YourApp]
}
```

### Configuring log levels

(This feature is not available in Scala.js)

If `Logger.scheduleLogLevelScan` is called, wvlet-log periodically scans log-level properties file (default every 1 minute) to configure logger levels:

```scala
import wvlet.log.Logger
## Scan log files (not available for Scala.js)
Logger.scheduleLogLevelScan
```

***log.properties*** example:
```
# You can use all, trace, debug, info, warn, error, info, all as log level
wvlet.airframe=debug
org.eclipse.jetty=info
org.apache.http=info
com.amazonaws=info
```
The format follows [Java Properties file format](https://docs.oracle.com/javase/7/docs/api/java/util/Properties.html#load(java.io.Reader)).


In default, loglevel file will be found in this order:  

 1. `log-test.properties` in the classpath. 
 1. If 1. is not found, use `log.properties` in the classpath.

To change the log file path, you can use `Logger.scheduleLogLevelScan(file paths, duration)`.

In debugging your application, create `src/test/resources/log-test.properties` file, and
call `Logger.scheduleLogLevelScan` before running test cases. This is useful for quickly checking the log messages. 

### Using LoglevelScanner with ScalaTest

To scan log level properties periodically with [ScalaTest](http://www.scalatest.org/), define the base trait as follows:

**[Spec.scala](https://github.com/wvlet/log/blob/master/src/test/scala/wvlet/log/Spec.scala)**
```scala
import org.scalatest.{BeforeAndAfter, BeforeAndAfterAll, WordSpec, _}
import wvlet.log.LogFormatter.SourceCodeLogFormatter
trait Spec extends WordSpec with Matchers with BeforeAndAfterAll with LogSupport {
  // Set the default log formatter
  Logger.setDefaultFormatter(SourceCodeLogFormatter)
  override protected def beforeAll(): Unit = {
    // Run LogLevel scanner (log-test.properties or log.properties in classpath) every 1 minute
    Logger.scheduleLogLevelScan
    super.beforeAll()
  }
  override protected def afterAll(): Unit = {
    Logger.stopScheduledLogLevelScan
    super.afterAll()
  }
}
class YourSpec extends Spec {
   "my application" should {
      "run correctly" in {
         // ....
      }
   }
}
```

### Customizing log format

You can show the source code location where the log message is generated:

```scala
import wvlet.log._
object MyApp with LogSupport {
   Logger.setDefaultFormatter(LogFormatter.SourceCodeLogFormatter)
   info("log with source code")
}
```
This code will show:
```
[MyApp$] log with source code - (MyApp.scala:6)
```
### Pre-defined log formatters:
Here is the list of pre-defined log formatters. 
 - **SourceCodeLogFormatter** (with source code location) 
 - **AppLogFormatter** (without source code location)
 - **TSVLogFormatter** (logging in TSV format)
 - **IntelliJLogFormatter** (for debugging using IntelliJ console)
 - **SimpleLogFormatter** (just logger name and log message)
 - **BareFormatter** (shows only log message)

### Customising LogFormatter
You can also define your own LogFormatter:

```scala
import wvlet.log.LogFormatter._
object CustomLogFormatter extends LogFormatter {
  override def formatLog(r: LogRecord): String = {
    val log = s"[${highlightLog(r.level, r.leafLoggerName)}] ${highlightLog(r.level, r.getMessage)}"
    appendStackTrace(log, r)
  }
}
Logger.setDefaultFormatter(CustomLogFormatter)
```
See also the examples in [LogFormat.scala](src/main/scala/wvlet/log/LogFormat.scala):

### Using wvlet-log in Scala.js


```scala
import wvlet.log._
Logger.setDefaultHandler(JSConsoleLogHandler())
class YourAppClass extends LogSupport {
  info("hello")
}
```

The log message will be showin in your browser's developer console.

To configure the log level, use `wvlet.log.setDefaultLogLevel` or `wvlet.log.setLogLevel`: 
```javascript
> wvlet.log.setDefaultLogLevel("debug")
> wvlet.log.setLogLevel("your.logger.name", "trace")
```

### Using with slf4j

If you are using slf4j, just add `slf4j-jdk14` to your dependency. The log messages from slf4j will be sent to wvlet-log:
```
libraryDependencies += "org.slf4j" % "slf4j-jdk14" % "1.7.21"
```

- See also the article, [How to start using wvlet-log with slf4j projects](http://blog.seratch.net/post/150202874933/how-to-start-using-wvlet-log-with-slf4j-projects), written by [@seratch](https://github.com/seratch) (author of skinny-framework, scalikejdbc, etc.)


### Writing and rotating logs with files 

To write and rotate your logs, use `LogRotationHandler`:
```
logger.resetHandler(new LogRotationHandler(
    fileName = "your-app.log",
    maxNumberOfFiles = 100, // rotate up to 100 log files
    maxSizeInBytes = 100 * 1024 * 1024 // 100MB
    AppLogFormatter // Any log formatter you like
))
```

If you simply need to output logs to a single file without any rotation, use `FileHandler`:
```scala
logger.resetHandler(new FileHandler(
    fileName = "your-app.log", // Log file name
    formatter = AppLogFormatter // Any log formatter you like
))
```

### Asynchronous logging

If you know your LogHandler is a heavy process (e.g., writing to network or slow disks), you can use 
`AsyncHandler` to do the logging in a background thread:

```scala
val asyncHandler = new AsyncHandler(a heavy parent log handler)
try {
  logger.resetHandler(asyncHandler)
}   
finally {
  asyncHandler.close // To flush unwritten log messages
}
```
Note that however AsyncHandler has usually higher overhead than the default handler since the asynchronous process involves locking and signal calls. 
We recommend to use AsyncHandler only if you know the overhead of the log writing is considerably high. 
LogRotationHandler is already optimized for writing logs to files, so you usually don't need to use AsyncHandler with LogRotationHandler. 

## Internals

### Scala macro based logging code generation

wvlet-log is efficient since it generate the log message objects only when necessary. 
For example, this logging code:
```scala
debug(s"heavy debug log generation ${obj.toString}")
```
will be translated into the following efficient one with Scala macros:
```scala
if(logger.isDebugEnabled) {
   debug(s"heavy debug log generation ${obj.toString}")
}
```
Log message String generation will not happen unless the debug log is effective. 
Scala macro is also used for finding source code location (LogSource).


## Why it uses java.util.logging instead of slf4j?

*slf4j* is just an API for logging string messages, so there is no way to configure the log levels and log format *within your program*. To use slf4j, you always need to include an slf4j 
binding library, such as *logback-classic*. slf4j's logging configuration is binder-specific (e.g., slf4j-simple, logback-classic, etc.), 
and your application always need to include a dependency to one of the slf4j implementations. There is nothing wrong in it if these slf4j bindings are used properly, but 
third-party libraries often include slf4j bindings as dependencies, and cause unexpected logging behaviour.  

`java.util.logging` is a standard API of Java and no binding library is required, but configuring `java.util.logging` was still difficult and error prone (See an example in [Stack Overflow](http://stackoverflow.com/questions/960099/how-to-set-up-java-logging-using-a-properties-file-java-util-logging)) 
 *wvlet-log* makes things easier for Scala developers.


## Related Projects
 
- [scala-logging](https://github.com/typesafehub/scala-logging): 
An wrapper of *slf4j* for Scala. This also uses Scala macros to make logging efficient. No built-in source code location format, and you still need some slf4j bindings and its configuration. 

- [twitter/util-logging](https://github.com/twitter/util#logging): This is also an wrapper of `java.util.logging` for Scala, but it doesn't use Scala macros, so you need to use an old sprintf style log generation, or `ifDebug(log)` 
method to avoid expensive log message generation. 
