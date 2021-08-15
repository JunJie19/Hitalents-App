export function fetchReq(path, opt = {}) {
  const options = {
    method: opt.method || 'POST',
    headers: opt.headers || {
      'Content-Type': 'application/json',
    },
    body: opt.body || null
  }
  return fetch(path, options)
    .then(res => {
      return res.json()
    })
    .then(res => {
      if (res.success) {
        return (res.data)
      } else {
        throw (res.msg || res)
      }
    })
}

export function fetchStream(path, opt = {}) {
  const options = {
    method: opt.method || 'POST',
    headers: opt.headers || {
      'Content-Type': 'application/json',
    },
    body: opt.body || null
  }
  return fetch(path, options)
    .then(res => res.blob())
}

export function getRole() {
  return localStorage.getItem('role');
}

export function getUid() {
  return localStorage.getItem('uid');
}

export function setUserInfo(data) {
  localStorage.setItem('role', data.role);
  localStorage.setItem('uid', data.user_id);
}

export function removeUserInfo() {
  // Clear user token and profile data from localStorage
  localStorage.removeItem('role');
  localStorage.removeItem('uid');
}

export function isValidDate(d) {
  return d instanceof Date && !isNaN(d);
}