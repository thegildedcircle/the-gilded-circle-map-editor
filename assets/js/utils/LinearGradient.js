export default class LinearGradient {
  constructor (vals) {
    this._vals = vals
  }

  at (i) {
    if (i < 0 || i > 1) throw new Error('The input value must be between 0 and 1')

    const offset = i * (this._vals.length - 1)
    // whole is the whole number part, decimal is the remainder
    const whole = Math.floor(offset)
    const decimal = offset - whole
    // if no remainder, simply return the lower color, otherwise calculate
    const lowerVal = this._vals[whole]
    if (decimal === 0.0) return lowerVal

    const higherVal = this._vals[whole+1]
    return lowerVal * (1 - decimal) + higherVal * decimal;
  }
}