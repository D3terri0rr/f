export class Entity {
    constructor(position){
        this.position = position;
        this.velocity = { x: Math.random()*2-1, y: Math.random()*2-1 };
        this.state = 'growing';
        this.size = 20;
        this.color = 'white';
        this.blobs = [];
    }

    update(world){
        // mover
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        // limites da tela
        if(this.position.x < 0 || this.position.x > world.width) this.velocity.x *= -1;
        if(this.position.y < 0 || this.position.y > world.height) this.velocity.y *= -1;
    }
}
