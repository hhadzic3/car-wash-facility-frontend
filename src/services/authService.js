import jwtDecode from 'jwt-decode';

export function removeToken() {
  localStorage.removeItem('token');
}

export function setToken(token) {
  localStorage.setItem('token', token);
}

export function getToken() {
  return localStorage.getItem('token');
}

export function getDecodedToken(token) {
  return jwtDecode(token);
}

