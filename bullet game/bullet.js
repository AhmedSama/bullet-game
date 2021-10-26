var canvas = document.querySelector('canvas');
canvas.width = 600;
canvas.height=600;

var c = canvas.getContext('2d');


//main functions

function collision(someone, anotherone) {
    if (someone.x + someone.w >= anotherone.x && someone.x <= anotherone.x + anotherone.w && someone.y + someone.h >= anotherone.y && someone.y <= anotherone.y + anotherone.h) {
        return true;
    }
    else {
        return false;
    }
}


///////////////

var background={
    x: 0,
    y: 0,
    w: canvas.width,
    h: canvas.height,
    color: 'rgb(244,244,244)',
    spX: 5,
    spY: 5,
    draw: function () {
        c.fillStyle = this.color
        c.fillRect(this.x, this.y, this.w, this.h)
    }
}


var player = {
    x:canvas.width/2,
    y:canvas.height/2,
    w:20,
    h:20,
    color:'rgb(43,65,31)',
    spX:7,
    spY:7,
    left:false,
    right: false,
    up: false,
    down: false,
    draw:function(){
        c.beginPath()
        c.fillStyle=this.color
        c.fillRect(this.x,this.y,this.w,this.h)
    },
    updateme:function(){
        this.draw();
        if(this.left){
            this.x-=this.spX;
        }
        if (this.right) {
            this.x += this.spX;
        }
        if (this.up) {
            this.y -= this.spY;
        }
        if (this.down) {
            this.y += this.spY;
        }
    }
}
bulletList = {};

function makeBullet(x, y, w, h, angle, spX, spY, lt){
    this.x =x;
    this.y = y ;
    this.w=w;
    this.h=h;
    this.color = 'rgb(222,78,22)';
    this.angle = angle;
    this.spX = spX;
    this.spY = spY;
    this.liveTime= lt;
    this.drawbull= function () {
            c.beginPath()
            c.fillStyle = this.color
            c.fillRect(this.x, this.y, this.w, this.h)

        }
    this.updatebull= function () {
            this.drawbull();
            this.x += this.spX;
            this.y += this.spY;
        }
}



// function makeBullet(id, x, y,w,h,angle, spX, spY,lt){
//     var bullet = {
//         x: x,
//         y: y,
//         w: w,
//         h: h,
//         color: 'rgb(222,78,22)',
//         angle: angle,
//         spX: spX,
//         spY: spY,
//         liveTime: lt,
//         drawbull: function () {
//             c.beginPath()
//             c.fillStyle = this.color
//             c.fillRect(this.x, this.y, this.w, this.h)
//         },
//         updatebull: function () {
//             this.drawbull();
//             this.x += this.spX;
//             this.y += this.spY;
//         }
//     }
//     bulletList[id] = bullet;
// }

// enemy
function Enemy(x, y, w, h,spX, spY){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.color = 'rgb(2,34,242)';
    this.spX = spX;
    this.spY = spY;
    this.isAlive=true;
    this.drawEnemy = function () {
        c.beginPath()
        c.fillStyle = this.color
        c.fillRect(this.x, this.y, this.w, this.h)

    }
    this.updateEnemy = function () {
        this.drawEnemy();
        this.x += this.spX;
        this.y += this.spY;
    }
}



document.onkeydown = function(event){
    if (event.keyCode === 68) { //right
        player.right =true;
    }
    if (event.keyCode === 83) {//down
        player.down=true;
    }
    if (event.keyCode === 65) {
        player.left=true;
    }
    if (event.keyCode === 87) {
        player.up=true;
    }
}
document.onkeyup = function (event){
    if (event.keyCode === 68) {
        player.right = false;
    }
    if (event.keyCode === 83) {
        player.down = false;
    }
    if (event.keyCode === 65) {
        player.left = false;
    }
    if (event.keyCode === 87) {
        player.up = false;
    }
}





var count = 0;
document.onmousedown = function (event) {

    function generatebullet() {
        var mouseX = event.clientX;
        var mouseY = event.clientY;
        var id = Math.random();
        var x = player.x + (player.w / 2);
        var y = player.y + (player.h / 2);
        var w = 4;
        var h = 4;
        // mouseX -= x;
        // mouseY -= y ;
        var thetax=mouseX-x;
        var thetay=mouseY-y;
        var ang = Math.atan2(thetay,thetax)/180*Math.PI;
        var spX = Math.cos(ang / Math.PI * 180) *40;
        var spY = Math.sin(ang / Math.PI * 180) *40;;
        var lt = 0
        bulletList[id] = new makeBullet(x, y, w, h, ang, spX, spY, lt);
        // for(var angle =0;angle<360;angle+=0.5){
        //     var spX = Math.cos(angle / Math.PI * 180) * 6;
        //     var spY = Math.sin(angle / Math.PI * 180) * 6;;
        //     bulletList[Math.random()] = new makeBullet(x, y, w, h, angle, spX, spY, lt);
        // }
        
    }
    generatebullet();

}

function controlBullet(){
    for (var i in bulletList) {
        var b = bulletList[i];
        // bulletList[i].updatebull();
        b.drawbull()
        b.x += b.spX;
        b.y += b.spY;
        b.liveTime++;
        if (b.liveTime > 100) {
            delete bulletList[i];
        }
        for(var j in enemyList){
            var ene = enemyList[j]
            if (collision(b, ene)) {
                ene.isAlive=false;
            }
        }
        
    }
}

enemyList = {};
function makeEnemy() {
    var id = Math.random();
    var x = Math.random()*canvas.width;
    var y = Math.random() * canvas.height;
    var w =40+ Math.random() * 40;
    var h = 40+Math.random() * 40;
    var enemy = new Enemy(x, y, w, h, 0, 0);
    enemyList[id] = enemy;
}
makeEnemy();
var count=0;
function update(){
    background.draw();
    player.updateme();
    count++;
    if(count===50){
        makeEnemy();
        count=0;
    }
    controlBullet();
    for (var j in enemyList) {
    if(enemyList[j].isAlive){
        enemyList[j].drawEnemy();
    }
}
    
}



setInterval(function(){
    update();
},20)




















