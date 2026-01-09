export class World {
    constructor(ctx, width, height){
        this.ctx = ctx;
        this.width = width;
        this.height = height;
        this.entities = [];
    }

    addEntity(entity){
        this.entities.push(entity);
    }

    update(){
        for(let e of this.entities){
            e.update(this);
        }
    }

    draw(){
        for(let e of this.entities){
            e.sprite.draw(this.ctx, e);
        }
    }
}
