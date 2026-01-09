import { Entity } from './Entity.js';
import { randomRange } from '../utils/helpers.js';
import { CONFIG } from '../config.js';

export class CartoonBlob extends Entity {
    constructor(position){
        super(position);
        this.size = randomRange(CONFIG.entityMinSize, CONFIG.entityMaxSize/2);
        this.color = randomRange(0,360);
        this.color = `hsl(${this.color}, 80%, 65%)`;
        this.blobs = [];
        const numBlobs = Math.floor(randomRange(3, CONFIG.maxBlobsPerEntity));
        for(let i=0; i<numBlobs; i++){
            this.blobs.push({
                offset: { x: randomRange(-this.size, this.size), y: randomRange(-this.size, this.size) },
                radius: randomRange(this.size*0.3, this.size*0.6)
            });
        }
        this.state = 'growing';
    }

    update(world){
        super.update(world);

        if(this.state === 'growing'){
            this.size += CONFIG.growthSpeed;
            if(this.size > CONFIG.entityMaxSize) this.state = 'shrinking';
        } else if(this.state === 'shrinking'){
            this.size -= CONFIG.shrinkSpeed;
            if(this.size < CONFIG.entityMinSize) this.state = 'growing';
        }

        // atualizar blobs proporcional ao tamanho
        for(let b of this.blobs){
            b.radius = this.size * 0.3 + Math.random()*this.size*0.3;
            b.offset.x += Math.random()*0.5 - 0.25;
            b.offset.y += Math.random()*0.5 - 0.25;
        }
    }
}
