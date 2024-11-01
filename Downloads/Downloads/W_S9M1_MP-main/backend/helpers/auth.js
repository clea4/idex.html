// Note that md5 is not safe for hashing passwords
// This code is an insecure simplification, for educational purposes only
const md5 = require('md5')

const users = [
  { id: 1, username: 'Shakira', born: 1977, hash: 'cc673bdb0a9d25bd55660a210c9e5c4f' },
  { id: 2, username: 'Beyoncé', born: 1981, hash: '523a01c3e3940d435200634a761ea6a6' },
  { id: 3, username: 'UtadaHikaru', born: 1983, hash: '63360e0ebb53de84fb633c058f2f692c' },
  { id: 4, username: 'Madonna', born: 1958, hash: '05a3a1fc52a17b20a133ee56ed90f1c4' },
]

const login = async ({ username, password }, delay) => {
  let hash = md5(password)
  let user = users.find(u => (u.username === username) && (u.hash === hash))
  let result

  if (!user) {
    result = {
      success: false,
      payload: {
        message: 'Invalid Credentials',
      }
    }
  } else {
    const { id, username, born } = user
    result = {
      success: true,
      payload: {
        message: `Welcome back, ${username}. We LOVE you!`,
        user: { id, username, born },
      }
    }
  }

  return new Promise(resolve => {
    setTimeout(() => {
      resolve(result)
    }, delay)
  })
}

const logout = (delay) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({ success: true, status: 200, message: 'Bye! Please, come back soon.' })
    }, delay)
  })
}

module.exports = {
  login,
  logout
}
