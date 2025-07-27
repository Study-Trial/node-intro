import Logger from "./Logger.ts";
import fs from "node:fs"

const logger = new Logger();

console.log("test 1 - log level is warn, message is debug, expected output: nothing")
logger.addHandlerMessage((obj) => console.log(obj.message));
logger.addHandlerLevel("debug", (message) => fs.writeFileSync("logs.txt", '\n' + message, {flag:"a"}))
logger.log("debug", "kukureku");
logger.removeAllListeners();

console.log("test 2 - log level is warn, message is info, expected output: nothing")
logger.addHandlerMessage((obj) => console.log(obj.message));
logger.addHandlerLevel("info", (message) => fs.writeFileSync("logs.txt", '\n' + message, {flag:"a"}))
logger.log("info", "kukureku");
logger.removeAllListeners();

console.log("test 3 - log level is warn, message is warn, expected output: warn message")
logger.addHandlerMessage((obj) => console.log(obj.message));
logger.addHandlerLevel("warn", (message) => fs.writeFileSync("logs.txt", '\n' + message, {flag:"a"}))
logger.log("warn", "kukureku");
logger.removeAllListeners();

console.log("test 4 - log level is warn, message is trace, expected output: nothing")
logger.addHandlerMessage((obj) => console.log(obj.message));
logger.addHandlerLevel("trace", (message) => fs.writeFileSync("logs.txt", '\n' + message, {flag:"a"}))
logger.log("trace", "kukureku");
logger.removeAllListeners();

console.log("test 5 - log level is warn, message is severe, expected output: severe message")
logger.addHandlerMessage((obj) => console.log(obj.message));
logger.addHandlerLevel("severe", (message) => fs.writeFileSync("logs.txt", '\n' + message, {flag:"a"}))
logger.log("severe", "kukureku");
logger.removeAllListeners();