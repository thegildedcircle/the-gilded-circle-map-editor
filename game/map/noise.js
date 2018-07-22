const SimplexNoise = require('simplex-noise')
const NoiseGenerator = new SimplexNoise()

module.exports = (nx, ny) => { return (NoiseGenerator.noise2D(nx, ny) / 2 + 0.5) }
