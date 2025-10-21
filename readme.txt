In Companion:
1. Open HTTP Generic module.
2. In base URL set: http://{ip_addr}:{port}/api/register
3. Leave Proxy address blank.
4. Create button with HTTP Module ==> "GET".
5. Super-Logger expects:  {"time":"time","pgmSrcNum":10,"pgmSrcName":"Cam-1"}.
As a quick test - use internal variables - like this: Paste this in "URL":
/{"time":"$(internal:time_hms)","pgmSrcNum":"$(internal:time_s)","pgmSrcName":"Cam-1"}
Leave rest of field empty.
6. Press the button.
7. In Supper-logger you should see something like: 
"01:04:12 - PGM Cut to Cam-1 (Input number: 12)"
8. In /log you should see log file with current date - and same entry.
9. If you have troubles, contact me at alex@iosystems.co.il.

10 Enjoy :)