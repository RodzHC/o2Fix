const args = ["server.js"];

const opts = { stdio: "inherit", cwd: "API", shell: true };

require("child_process").spawn("node", args, opts);
