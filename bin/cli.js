#!/usr/bin/env node
import { Command } from "commander";
import { sendLogs, fetchAttendance, fetchSummaries, manageAlerts, calendarSync } from "../components/api.js";
import { connectMeetManual, connectMeetAuto, recordMeet } from "../components/meet.js";
import { login } from "../components/auth.js";

const program = new Command();
program.name("meet-cli").version("1.0.0").description("Meeting CLI");

program.command("login").description("Login (OAuth → token)").action(login);

program
  .command("send-logs")
  .requiredOption("--email <email>", "User email")
  .description("Send meeting logs")
  .action(async (options) => {
    const dummyLogs = { logs: [{ time: "12:01", msg: "Hello" }] };
    const result = await sendLogs(options.email, dummyLogs);
    console.log("✅ Logs sent:", result);
  });

program
  .command("fetch-attendance")
  .requiredOption("--email <email>", "User email")
  .description("Fetch attendance data")
  .action(async (options) => {
    const result = await fetchAttendance(options.email);
    console.log("📋 Attendance:", result);
  });

program
  .command("fetch-summaries")
  .requiredOption("--email <email>", "User email")
  .description("Fetch meeting summaries")
  .action(async (options) => {
    const result = await fetchSummaries(options.email);
    console.log("📝 Summaries:", result);
  });

program
  .command("manage-alerts")
  .requiredOption("--email <email>", "User email")
  .option("--enable")
  .option("--disable")
  .option("--target-email <targetEmail>", "Alert target email")
  .description("Manage email alerts")
  .action(async (options) => {
    const enable = options.enable ? true : false;
    const result = await manageAlerts(
      options.email,
      enable,
      options.targetEmail
    );
    console.log("🔔 Alerts updated:", result);
  });

program
  .command("calendar-sync")
  .requiredOption("--email <email>", "User email")
  .description("Sync with calendar")
  .action(async (options) => {
    const result = await calendarSync(options.email);
    console.log("📅 Calendar sync:", result);
  });

program
  .command("connect-meet")
  .option("--url <url>", "Manual URL")
  .option("--auto", "Auto-detect tab")
  .description("Connect to Google Meet")
  .action(async (options) => {
    if (options.url) {
      await connectMeetManual(options.url);
    } else if (options.auto) {
      await connectMeetAuto();
    } else {
      console.log("❌ Please specify --url or --auto");
    }
  });

program
  .command("record-meet")
  .description("Record Google Meet")
  .action(async () => {
    await recordMeet();
  });

program.parse();
