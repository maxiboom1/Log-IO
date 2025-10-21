import path from "path";
import fs from "fs";
import MessageModel from "../2-models/message-model";

// Detect pkg single-file runtime
const isPkg = typeof (process as any).pkg !== "undefined";

// When packaged: logs live in "<exe folder>/logs"
const exeDir = isPkg ? path.dirname(process.execPath) : "";
const logsDir = isPkg ? path.join(exeDir, "logs") : "";

// Ensure logs directory exists when packaged
if (isPkg) {try { fs.mkdirSync(logsDir, { recursive: true }); } catch {}}

// Build today's log file name: DD-MM-YYYY.log
function getTodayLogPath(): string {
  const now = new Date();
  const dd = String(now.getDate()).padStart(2, "0");
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const yyyy = now.getFullYear();
  return path.join(logsDir, `${dd}-${mm}-${yyyy}.log`);
}

// Log activity (console in dev; file + console in exe)
function logActivity(message: MessageModel): void {
  const line = `${message.time} - PGM Cut to ${message.pgmSrcName} (Input number: ${message.pgmSrcNum})`;
  console.log(line); // always print to console

  if (!isPkg) return; // dev: no file writes

  const filePath = getTodayLogPath();

  try {
    // Touch file if it doesn't exist (append would create it anyway; this is explicit)
    if (!fs.existsSync(filePath)) {
      try { fs.writeFileSync(filePath, ""); } catch {}
    }
    fs.appendFileSync(filePath, line + "\n");
  } catch {}

}

export default { logActivity };
