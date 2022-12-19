const consoleCommands = {
  "up": ["./modules", "navigation", "up.js"],
  "cd": ["./modules", "navigation", "cd.js"],
  "ls": ["./modules", "navigation", "ls.js"],

  "cat": ["./modules", "operations", "cat.js"],
  "add": ["./modules", "operations", "add.js"],
  "rn": ["./modules", "operations", "rn.js"],
  "cp": ["./modules", "operations", "cp.js"],
  "mv": ["./modules", "operations", "mv.js"],
  "rm": ["./modules", "operations", "rm.js"],

  "--EOL": ["./modules", "system", "eol.js"],
  "--cpus": ["./modules", "system", "cpus.js"],
  "--homedir": ["./modules", "system", "homedir.js"],
  "--username": ["./modules", "system", "username.js"],
  "--architecture": ["./modules", "system", "architecture.js"],

  "hash": ["./modules", "hash", "hash.js"],

  "compress": ["./modules", "zip", "compress.js"],
  "decompress": ["./modules", "zip", "decompress.js"],
}

export default consoleCommands