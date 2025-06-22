import fs from "fs";
import os from "os";
import path from "path";

function getUserConfigPath(userEmail) {
  const safeEmail = userEmail.replace(/[^a-zA-Z0-9]/g, "_");
  return path.join(os.homedir(), `.meetclirc-${safeEmail}`);
}

function saveToken(token, email) {
  const configPath = getUserConfigPath(email);
  const data = `[auth]\ntoken=${token}\n[user]\nemail=${email}\n`;
  fs.writeFileSync(configPath, data);
}

function loadToken(userEmail) {
  const configPath = getUserConfigPath(userEmail);
  if (!fs.existsSync(configPath)) {
    throw new Error(
      `❌ Token for ${userEmail} not found — run \`meet-cli login\` first.`
    );
  }
  const content = fs.readFileSync(configPath, "utf-8");
  const match = content.match(/token=(.*)/);
  if (!match) throw new Error("❌ Invalid token config.");
  return match[1].trim();
}

export {
  saveToken,
  loadToken,
  getUserConfigPath,
};
