import { logEvents } from "./logEvents.js";

export const errorHandler = (err, res) => {
  logEvents(`${err.name}: ${err.message}`, 'errLog.txt');
    console.error(err.stack)
    res.status(500).send(err.message);
}