import axios from "axios";
import { login} from "./auth.js"; 

const apiClient = axios.create({
  baseURL: process.env.API_URL,
});

function authHeaders(userEmail) {
  return {
    Authorization: `Bearer ${login(userEmail)}`,
  };
}

async function sendLogs(userEmail, logData) {
  const res = await apiClient.post("/logs", logData, {
    headers: authHeaders(userEmail),
  });
  return res.data;
}

async function fetchAttendance(userEmail) {
  const res = await apiClient.get("/attendance", {
    headers: authHeaders(userEmail),
  });
  return res.data;
}

async function fetchSummaries(userEmail) {
  const res = await apiClient.get("/summaries", {
    headers: authHeaders(userEmail),
  });
  return res.data;
}

async function manageAlerts(userEmail, enable, targetEmail) {
  const res = await apiClient.post(
    "/alerts",
    { enable, targetEmail },
    { headers: authHeaders(userEmail) }
  );
  return res.data;
}

async function calendarSync(userEmail) {
  const res = await apiClient.post(
    "/calendar/sync",
    {},
    { headers: authHeaders(userEmail) }
  );
  return res.data;
}

export {
  sendLogs,
  fetchAttendance,
  fetchSummaries,
  manageAlerts,
  calendarSync,
};
