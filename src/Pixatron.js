
class Pixatron {
    constructor({context, canvas, pixelSize, gridSize}){
        this.ctx = context;
        this.canvas = canvas;
        this.gridSize = {};
        this.pixelSize = {};
        this.pixelBufferX = [];
        this.pixelBufferY = [];
        this.fillColor = "#000";
        this.backFillColor = "#000";
        this._condition_definers = [{fn(){return false}}];
        gridSize?
            (this.setGridSize(gridSize.x, gridSize.y))
            :
            (this.gridSize = {}, this.setGridSize(20, 20));
    }
    setFillColor(x){
        this.fillColor = x;
        return this;
    }
    setBackFillColor(x){
        this.backFillColor = x;
        return this;
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
        // console.log(fn)
        this._condition_definers.push(fn);
    }
    drawPixel(x,y){
        this.addCondition({
            fn(x1,y1){
                return x == x1 && y == y1;
            }, 
            fillColor: this.fillColor
        });
        return this;
    }
    //1,1    -2, 3
    drawLine([x1,y1], [x2,y2]){
        let dx = x2<x1?-1:1;
        let dy = y2<y1?-1:1;
        let m = (y2-y1)/ (x2-x1);
        let c = (-m*x1+y1);
        console.log(m, c)
        for(let y = y1 ; ; y+=dy ){
            for(let x =x1 ; ; x+= dy ){
                console.log([x,y], [x, m*x+c], [y - m*x+c])
                if(Math.abs(y-m*x+c) <1) {
                    this.drawPixel(x,y);
                }
                // this.drawPixel(x,y);
                if(x == x2) break;
            }
            if(y == y2) break;
        }
        return this;
    }
    render(){
        for(let i = 0; i<=Math.ceil(this.gridSize.y); i++){
            for(let j = 0; j<=Math.ceil(this.gridSize.x); j++){
                let drwn = false;
                this._condition_definers.forEach(fn=>{
                    if( 
                        fn.fn(j-Math.floor(this.gridSize.x/2),-(i-Math.floor(this.gridSize.y/2)))
                    ) {
                        this.rect({x:j, y:i}, fn.fillColor || this.fillColor);
                        drwn = true;
                    }
                });
                if(!drwn){
                    this.rect({x:j,y:i});
                }
            }
        }
        return this;
    }
    rect({x,y}, color){
        this.ctx.beginPath();
        let [err_x, err_y] = [-1,-1];
        this.ctx.fillStyle = color || this.backFillColor;
        this.ctx.rect(x*this.pixelSize.x, y*this.pixelSize.y, this.pixelSize.x+err_x, this.pixelSize.y+err_y)
        this.ctx.fill();
        this.ctx.closePath();
        return this;
    }
    clear(){
        this.canvas.width = this.canvas.width;
        this._condition_definers.splice(1);
        return this;
    }
    squareCoords(...points){
        for(let p of points){

        }
    }
}


export {Pixatron};