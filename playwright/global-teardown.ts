import fs from "fs";

// Remove the .sessions directory and all its contents
function globalTeardown() {
  fs.rmSync("./playwright/.sessions", { recursive: true, force: true });
}

export default globalTeardown;
