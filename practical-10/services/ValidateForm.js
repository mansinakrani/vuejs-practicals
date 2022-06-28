import Validation from './Validation'

export default class ValidateForm {
    constructor(email, password) {
        this.email = email
        this.password = password
    }

    validate() {
        const errors = []

        if (!Validation.isEmail(this.email)) {
            errors.email = 'invalid email* '
        }
        if (!Validation.isPassword(this.password)) {
            errors.password = 'invalid password*'
        }

        return errors
    }
}