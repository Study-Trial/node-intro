import EventEmitter from "events";
import config from 'config';

export type LogLevel = "severe"|"warn"|"info"|"debug"|"trace"
class Logger extends EventEmitter {
     addHandlerLevel(level: LogLevel, handler: (message: string)=>void): void {
        this.on(level, handler);
     }
     addHandlerMessage(handler:(obj: {level: LogLevel, message: string})=>void):void {
        this.on("message", handler);
     }
     log(level: LogLevel = "info", message: string): void {
        const logLevel = config.get<LogLevel>("log_level");
        const logLevelArray = ['severe', 'warn', 'info', 'debug', 'trace']
        const logLevelIndex = logLevelArray.indexOf(logLevel)
        const levelIndex = logLevelArray.indexOf(level)
        if (levelIndex <= logLevelIndex) {
         this.emit(level, message);
         this.emit("message", {level, message});
        }
      }
}
export default Logger;