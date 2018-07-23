/* Taken from https://github.com/ashleymarkfletcher/range-map
 *  (written by Ashley Mark Fletcher)
 */

//takes in a value and scales from it's initial range to another
export default (input, inLow, inHigh, outLow, outHigh) => {
  return Math.round((input-inLow)/(inHigh-inLow) * (outHigh-outLow) + outLow)
}
