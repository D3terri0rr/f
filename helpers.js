export function randomRange(min, max) {
    return Math.random() * (max - min) + min;
}

export function lerp(a, b, t) {
    return a + (b - a) * t;
}

export function randomColor() {
    return `hsl(${Math.random()*360}, 80%, 65%)`;
}
