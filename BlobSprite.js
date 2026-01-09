export class BlobSprite {
    constructor(){
        this.strokeColor = 'black';
        this.lineWidth = 3;
    }

    draw(ctx, entity){
        ctx.beginPath();
        for(let i=0; i<entity.blobs.length; i++){
            const b = entity.blobs[i];
            ctx.moveTo(entity.position.x + b.offset.x + b.radius, entity.position.y + b.offset.y);
            ctx.arc(entity.position.x + b.offset.x, entity.position.y + b.offset.y, b.radius, 0, Math.PI*2);
        }
        ctx.fillStyle = entity.color;
        ctx.strokeStyle = this.strokeColor;
        ctx.lineWidth = this.lineWidth;
        ctx.fill();
        ctx.stroke();
    }
}
