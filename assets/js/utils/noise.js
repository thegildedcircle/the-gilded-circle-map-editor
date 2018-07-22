import SimplexNoise from 'simplex-noise';

const NoiseGenerator = new SimplexNoise();

export default (nx, ny) => (NoiseGenerator.noise2D(nx, ny) / 2 + 0.5);
