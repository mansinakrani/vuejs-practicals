import Validation from './Validation'

export default class ValidateModalViewForm {
    constructor(name, image, price, details) {
        this.name = name
        this.image = image
        this.price = price
        this.details = details
    }

    validate() {
        const errors = []
        if (!Validation.isRequired(this.name)) {
            errors.name = 'name is required*'
        } else if (!Validation.len(this.name, 3, 30)) {
            errors.name = 'name should be 3-30 characters*'
        }

        if (!Validation.isRequired(this.image)) {
            errors.image = 'image url is required*'
        } else if (!Validation.isUrl(this.image)) {
            errors.image = 'invalid url format*'
        }

        if (!Validation.isRequired(this.price)) {
            errors.price = 'price is required*'
        }

        if (!Validation.isRequired(this.details)) {
            errors.details = 'car description is required*'
        } else if (!Validation.len(this.details, 8, 120)) {
            errors.details = 'car details should be 8-120 characters*'
        }
        return errors
    }
}