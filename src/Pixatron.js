
class Pixatron {
    constructor({context, canvas, pixelSize, gridSize}){
        this.ctx = context;
        this.canvas = canvas;
        this.gridSize = {};
        this.pixelSize = {};
        this.pixelBufferX = [];
        this.pixelBufferY = [];
        this._condition_definers = [()=>false];
        gridSize?
            (this.setGridSize(gridSize.x, gridSize.y))
            :
            (this.gridSize = {}, this.setGridSize(20, 20));
    }
    setPixelSize(w, h){
        this.setGridSize(this.canvas.width/w, this.canvas.height/h);
    }
    setGridSize(w,h){
        this.gridSize.x = w;
        this.gridSize.y = h;
        this.pixelSize.x = this.canvas.width/this.gridSize.x;
        this.pixelSize.y = this.canvas.height/this.gridSize.y;
    }
    addCondition(fn){
        this._condition_definers.push(fn);
    }
    drawPixel(x,y){
        this.addCondition(((x1,y1)=>{
            return x == x1 && y == y1;
        }));
    }
    draw(){
        for(let i = 0; i<=Math.ceil(this.gridSize.y); i++){
            for(let j = 0; j<=Math.ceil(this.gridSize.x); j++){
                let drwn = false;
                this._condition_definers.forEach(fn=>{
                    if( 
                        fn(j-Math.floor(this.gridSize.x/2),-(i-Math.floor(this.gridSize.y/2)))
                    ) {
                        this.rect({x:j, y:i}, '#fff');
                        drwn = true;
                    }
                });
                if(!drwn){
                    this.rect({x:j,y:i});
                }
            }
        }
    }
    rect({x,y}, color){
        this.ctx.beginPath();
        let [err_x, err_y] = [-1,-1];
        this.ctx.fillStyle = color || '#000';
        this.ctx.rect(x*this.pixelSize.x, y*this.pixelSize.y, this.pixelSize.x+err_x, this.pixelSize.y+err_y)
        this.ctx.fill();
        this.ctx.closePath();
    }
    clear(){
        this.canvas.width = this.canvas.width;
        this._condition_definers.splice(1);
    }
}


export {Pixatron};