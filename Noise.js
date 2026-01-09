// Simplex/Perlin noise 1D pseudo-random
let seed = Math.random() * 1000;

export function noise(x){
    return Math.sin(x * 12.9898 + seed) * 43758.5453 % 1;
}

// Para suavizar entre 0 e 1
export function smoothNoise(x){
    return noise(x) * 0.5 + 0.5;
}
