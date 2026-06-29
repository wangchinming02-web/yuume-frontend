const SITE_BASE = '/yuume-frontend';
const API_BASE = 'https://yuume-backend.onrender.com/api';

function siteUrl(path) {
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${SITE_BASE}/${cleanPath}`;
}

function getAdminToken() {
  return localStorage.getItem('admin_token');
}

function getAuthHeaders(json = true) {
  const headers = {
    'Accept': 'application/json',
    'Authorization': 'Bearer ' + getAdminToken()
  };
  if (json) {
    headers['Content-Type'] = 'application/json';
  }
  return headers;
}

async function checkAdminAuth() {
  const token = getAdminToken();
  if (!token) return false;
  try {
    const response = await fetch(`${API_BASE}/check-auth`, {
      headers: { 'Authorization': 'Bearer ' + token }
    });
    return response.ok;
  } catch (error) {
    return false;
  }
}

function redirectToLogin(message) {
  if (message) alert(message);
  window.location.href = siteUrl('login.html');
}