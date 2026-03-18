import app from "./app";

process.on("unhandledRejection", (reason) => {
  console.error("[SERVER] Unhandled rejection:", reason);
});

process.on("uncaughtException", (err) => {
  console.error("[SERVER] Uncaught exception — shutting down:", err);
  process.exit(1);
});

const rawPort = process.env["PORT"] || "8080";
const parsedPort = Number(rawPort);
const port = (Number.isNaN(parsedPort) || parsedPort <= 0) ? 8080 : parsedPort;

if (Number.isNaN(parsedPort) || parsedPort <= 0) {
  console.warn(`[SERVER] Invalid PORT value: "${rawPort}", defaulting to 8080`);
}

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
