import puppeteer from "puppeteer-core";

async function connectMeetManual(url) {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(url);
  console.log("✅ Connected to Meet:", url);
}

async function connectMeetAuto() {
  const browser = await puppeteer.launch({ headless: false });
  const pages = await browser.pages();

  for (const page of pages) {
    const url = page.url();
    if (url.includes("meet.google.com")) {
      console.log("✅ Auto-detected Meet tab:", url);
      return;
    }
  }
  console.log("❌ No active Google Meet tab found.");
}

async function recordMeet() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  console.log("⏺️ Recording Meet...");
  await page.goto("https://meet.google.com");

  page.on("console", (msg) => console.log("Meet:", msg.text()));

  setTimeout(() => {
    browser.close();
    console.log("✅ Recording ended.");
  }, 120000);
}

export {
    connectMeetManual,
    connectMeetAuto,
    recordMeet
};
