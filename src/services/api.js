import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
});

export async function analyzeWebsite(url) {
  const response = await api.post("/convert/analyze", {
    url,
  });

  return response.data;
}

export async function createConversion({
  url,
  appName,
  permission,
  logo,
}) {
  const formData = new FormData();

  formData.append("url", url);
  formData.append("appName", appName);
  formData.append("permission", String(permission));

  if (logo) {
    formData.append("logo", logo);
  }

  const response = await api.post("/convert/create", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    timeout: 120000,
  });

  return response.data;
}

export async function getBuildStatus(buildId) {
  const response = await api.get(`/builds/${buildId}`);

  return response.data;
}

export function getDownloadUrl(buildId, type) {
  return `${API_BASE_URL}/builds/${buildId}/download/${type}`;
}

export default api;