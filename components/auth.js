import inquirer from "inquirer";
import open from "open";
import { saveToken } from "./config.js"; // Adjust the import path as necessary

async function login() {
  console.log("🌐 Opening dashboard for login...");
  await open("https://dashboard.yourdomain.com/login");

  const answers = await inquirer.prompt([
    { type: "input", name: "token", message: "Paste your API token here:" },
    { type: "input", name: "email", message: "Your email:" },
  ]);

  saveToken(answers.token, answers.email);
  console.log(`✅ Token saved for user ${answers.email}`);
}

export {
  login,
};
