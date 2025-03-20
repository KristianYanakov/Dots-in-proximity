// Creating variables
var myX = 0, myY = 0;
endlessCanvas = true;

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

class Dot{
    constructor(x, y){
        this.x = x
        this.y = y
        this.rad = 5
        this.speedx = getRandomArbitrary(-1, 1)
        this.speedy = getRandomArbitrary(-1, 1)
    }
    draw(){
        context.fillStyle = 'gray'
        context.beginPath();
        context.arc(this.x, this.y, this.rad, 0, 2 * Math.PI);
        context.fill();
    }
    move(){
        this.x += this.speedx
        this.y += this.speedy
    }
}

//var dot1 = new Dot(100, 100)
var dots = [], num = 100
let maxDistance = 200; // Change this value to adjust connection range

function addDots(arr, num){
    for(let i = 0; i < num; i ++){
        arr.push(new Dot(Math.random()*800, Math.random()*600))
    }
}
addDots(dots, num)

function update() {
    //dot1.move()

    for(let i = 0; i < num; i ++){
        dots[i].move()
    }
}

function draw() {
    
    //dot1.draw()
    for(let i = 0; i < num; i ++){
        dots[i].draw()
    }
    /*
    for(let i = 0; i < num; i ++){
        context.beginPath()
        context.moveTo(dots[i].x, dots[i].y)// 0 0 свързва първата с всички
        if((i + 1) < num){
            context.lineTo(dots[i+1].x, dots[i+1].y) // свързва ги последователно
        }
        
        context.stroke()
    }*/

    /*for(let i = 0; i < num; i ++){
        for(let j = 0; j < num; j ++){
            context.beginPath()
            context.moveTo(dots[i].x, dots[i].y)
            context.lineTo(dots[j].x, dots[j].y) // свързва всяка с всяка като са 100 става страшен ефект
            context.stroke()
        }
    }*/

        

    for(let i = 0; i < num; i++){
        for(let j = i + 1; j < num; j++){ // Avoid duplicate calculations
            let dx = dots[i].x - dots[j].x;
            let dy = dots[i].y - dots[j].y;
            let distance = Math.sqrt(dx * dx + dy * dy);
            
            if(distance < maxDistance) { // Only connect close dots
                context.beginPath();
                context.moveTo(dots[i].x, dots[i].y);
                context.lineTo(dots[j].x, dots[j].y);
                context.strokeStyle = `rgba(0, 0, 0, ${1 - (distance / maxDistance)})`; // Fades as distance increases
                //context.lineWidth = 1;
                context.stroke();
            }
        }
    }

};

function keyup(key) {
    // Show the pressed keycode in the console
    console.log("Pressed", key);
};

function mouseup() {
    // Show coordinates of mouse on click
    console.log("Mouse clicked at", mouseX, mouseY);
};
