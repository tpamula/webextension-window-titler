/* eslint-disable linebreak-style */
const maxLength = 100;

export default class StorageInputValidator {
  validate(input) {
    if (input.length > maxLength) throw new Error('Max length exceeded.');
  }
}
