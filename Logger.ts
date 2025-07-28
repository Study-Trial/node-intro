import EventEmitter from "events";
import config from 'config';

export type LogLevel = "severe"|"warn"|"info"|"debug"|"trace"

const LOG_LEVELS = ["severe", "warn", "info", "debug", "trace"];
const DEFAULT_LOG_LEVEL = "info";
const logLevelConfig = config.get<string>("log_level");
const logLevelConfigIndex = LOG_LEVELS.indexOf(logLevelConfig);
const LOG_LEVEL_INDEX = logLevelConfigIndex > -1 ? logLevelConfigIndex : 2;

class Logger extends EventEmitter {
     addHandlerLevel(level: LogLevel, handler: (message: string)=>void): void {
        this.on(level, handler);
     }
     addHandlerMessage(handler:(obj: {level: LogLevel, message: string})=>void):void {
        this.on("message", handler);
     }
     log(level: LogLevel, message: string): void {
        level = level ?? DEFAULT_LOG_LEVEL;
        if (LOG_LEVELS.indexOf(level) <= LOG_LEVEL_INDEX) {
         this.emit(level, message);
         console.log(level.toUpperCase());
         this.emit("message", {level, message});
        }
      }
}
export default Logger;