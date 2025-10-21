# Logger POC (Bitfocus Companion → HTTP → EXE)

A tiny HTTP listener that receives event payloads (from **Bitfocus Companion** or any HTTP client) and writes daily log files. Built with Node.js/TypeScript and packaged into a single **Windows `.exe`** (no Node runtime required).

## What it does

- **Endpoint:** `GET /api/register/{json}` where `{json}` is a *URL-encoded* JSON object.
- **Logging (EXE only):** appends to `logs/DD-MM-YYYY.log` (folder auto-created next to the `.exe`).  
  In **dev**, it only prints to console (no files).
- **Config:** optional `config.json` next to the `.exe` (or project root in dev), e.g.:
  ```json
  { "port": 4000 }
  ```
  If missing/invalid, defaults to port **4000**.


## Run (EXE)

1. Place `logger.exe` in a folder (optionally add `config.json` with `{ "port": 4000 }`).  
2. Double-click `logger.exe` (or run from PowerShell/cmd).  
3. Logs appear in: `.\logs\DD-MM-YYYY.log`

## Quick test (curl)

```bash
curl "http://127.0.0.1:4000/api/register/%7B%22time%22%3A%2200%3A17%3A27%22%2C%22pgmSrcNum%22%3A%2227%22%2C%22pgmSrcName%22%3A%22Cam-1%22%7D"
```

## Bitfocus Companion (Generic HTTP) example

- **Module:** Generic HTTP (v2.5+)
- **Action:** HTTP: GET
- **URL:** `http://<PC-IP>:<PORT>/api/register/{"time":"$(internal:time_hms)","pgmSrcNum":"$(internal:time_s)","pgmSrcName":"Cam-1"}`  

## Scripts

```bash
npm i
npm run dev        # console only (no files)
npm run build
npm run package:win
```
Resulting EXE is created under `build/logger.exe` (your packaging script may vary).

## Sample log line

```
12:34:56 - PGM Cut to Cam-1 (Input number: 27)
```

## Notes

- If `config.json` is missing, the app falls back to defaults and logs a warning to console.
- If logging fails (e.g., write permissions), the app continues running and still prints to console.
- To create an EXE - run "npm run build" then "npm run package:win". 
