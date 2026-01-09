import { Entity } from './Entity.js';
import { randomRange } from '../utils/helpers.js';
import { CONFIG } from '../config.js';
import { smoothNoise } from '../systems/Noise.js';

export class CartoonBlob extends Entity {
    constructor(position){
        super(position);
        this.size = randomRange(CONFIG.entityMinSize, CONFIG.entityMaxSize/2);
        this.baseColorHue = randomRange(0,360);
        this.color = `hsl(${this.baseColorHue}, 80%, 65%)`;
        this.blobs = [];
        this.time = Math.random()*1000; // tempo interno para animação orgânica

        const numBlobs = Math.floor(randomRange(3, CONFIG.maxBlobsPerEntity));
        for(let i=0; i<numBlobs; i++){
            this.blobs.push({
                offset: { x: randomRange(-this.size, this.size), y: randomRange(-this.size, this.size) },
                radius: randomRange(this.size*0.3, this.size*0.6),
                phase: Math.random()*10 // para deformação independente
            });
        }
        this.state = 'growing';
    }

    update(world){
        super.update(world);
        this.time += 0.01;

        // Crescimento procedural
        if(this.state === 'growing'){
            this.size += CONFIG.growthSpeed;
            if(this.size > CONFIG.entityMaxSize) this.state = 'shrinking';
        } else if(this.state === 'shrinking'){
            this.size -= CONFIG.shrinkSpeed;
            if(this.size < CONFIG.entityMinSize) this.state = 'growing';
        }

        // Atualizar blobs com deformação orgânica
        for(let b of this.blobs){
            // Mudança suave no offset usando ruído
            b.offset.x += (smoothNoise(this.time + b.phase) - 0.5) * 0.5;
            b.offset.y += (smoothNoise(this.time + b.phase + 100) - 0.5) * 0.5;

            // Deformação do raio para respiração
            b.radius = this.size * 0.3 + smoothNoise(this.time + b.phase) * this.size * 0.3;
        }

        // Mudança de cor sutil
        const hueVariation = (smoothNoise(this.time) - 0.5) * 30; // +/-15 graus
        this.color = `hsl(${(this.baseColorHue + hueVariation)%360}, 80%, 65%)`;
    }
}
