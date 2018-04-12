export default class CreditCardNumber {
  static isValid(value) {
    if (!value) {
      return false;
    }
    const number = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    return number.length === 16;
  }

  static format(value) {
    const number = (value || '').replace(/\s+/g, '').replace(/[^0-9]/gi, '');

    const parts = [];
    for (let i = 0; i < number.length && i < 16; i += 4) {
      parts.push(number.substring(i, i + 4));
    }

    return parts.length == 0 ? number : parts.join(' ');
  }
}
