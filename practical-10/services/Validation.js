export default class Validation {
  static isEmail(email) {
    if (
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        email
      )
    ) {
      return true
    }
    return false
  }

  static isPassword(password) {
    if (/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password)) {
      return true
    } else if (password.length >= 8) {
      return true
    }
    return false
  }

  static isRequired(str) {
    if (str !== '') {
      return true
    }
    return false
  }

  static isUrl(url) {
    const result = url.match(
      /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/g
    )
    return result
  }

  static len(txt, min, max) {
    if (txt.length >= min && txt.length <= max) {
      return true
    }
    return false
  }
}
