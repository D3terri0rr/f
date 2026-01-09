import { CONFIG } from './config.js';
import { World } from './systems/World.js';
import { CartoonBlob } from './entities/CartoonBlob.js';
import { BlobSprite } from './sprites/BlobSprite.js';

const canvas = document.getElementById('canvas');
canvas.width = CONFIG.canvasWidth;
canvas.height = CONFIG.canvasHeight;
const ctx = canvas.getContext('2d');

const world = new World(ctx, canvas.width, canvas.height);

// Criar entidades
for(let i=0; i<CONFIG.entityCount; i++){
    const entity = new CartoonBlob({ x: Math.random()*canvas.width, y: Math.random()*canvas.height });
    entity.sprite = new BlobSprite();
    world.addEntity(entity);
}

function animate(){
    ctx.fillStyle = CONFIG.backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    world.update();
    world.draw();

    requestAnimationFrame(animate);
}

animate();
