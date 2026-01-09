export function noise(x){
    return (Math.sin(x*12.9898) * 43758.5453) % 1;
}
