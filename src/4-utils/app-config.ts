// 4-utils/appConfig.ts
import fs from "fs";
import path from "path";

type RawConfig = {port?: number;};

const isPkg = typeof (process as any).pkg !== "undefined";
const rootDir = isPkg ? path.dirname(process.execPath) : process.cwd();
const CONFIG_PATH = path.join(rootDir, "config.json");

class AppConfig {
  // Defaults
  public port = 4000;
  public version = "1.0";
  public exampleMessage = {time:"$(internal:time_hms)",pgmSrcNum:10,pgmSrcName:"Cam-1"}
}

const appConfig = new AppConfig();

// Load once at module import:
(function loadConfigOnce() {
  try {
    if (!fs.existsSync(CONFIG_PATH)) {
      console.warn(`[appConfig] No config.json found at: ${CONFIG_PATH} (using defaults)`);
      return;
    }

    const raw = fs.readFileSync(CONFIG_PATH, "utf8").trim();
    const json: RawConfig = JSON.parse(raw);

    if (typeof json.port === "number" && json.port > 0 && json.port <= 65535) {
      appConfig.port = json.port;
    } else if (json.port !== undefined) {
      console.warn(`[appConfig] Invalid "port" in config.json, using default: ${appConfig.port}`);
    }
  } catch (err: any) {
    console.error(`[appConfig] Failed to load config.json at ${CONFIG_PATH}:`, err?.message || err);
    // Keep defaults on error
  }
})();

export default appConfig;
export const appConfigPath = CONFIG_PATH; // handy for diagnostics
