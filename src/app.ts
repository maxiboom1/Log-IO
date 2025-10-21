import express from "express";
import dataRoutes from "./6-routes/data-routes";
import routeNotFound from "./3-middleware/route-not-found";
import catchAll from "./3-middleware/catch-all";
import appConfig from "./4-utils/app-config";

const server = express();

server.use("/api", dataRoutes);
server.use(routeNotFound);
server.use(catchAll);
console.log(`-------------------------------------------------------------------------`);
console.log(`[SYSTEM] Super-Logger, App Version: ${appConfig.version}, Created By I/O Systems, Alex.`);
console.log(`[SYSTEM] Now loading...`);
console.log(`[SYSTEM] Valid expected message example:`);
console.log(`[SYSTEM] ${JSON.stringify(appConfig.exampleMessage)}`);

console.log(`-------------------------------------------------------------------------\n`);


server.listen(appConfig.port, () => console.log("[SYSTEM]Listening on http://localhost:" + appConfig.port));
