//Random number
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; 
  }

// Enemies our player must avoid
var Enemy = function(y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = getRandomInt(-400, 0);
    this.y = y;
    this.speed = getRandomInt(100, 300);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + this.speed * dt;

    if(this.x > 500){
        this.x = getRandomInt(-200, 0);
        this.speed = getRandomInt(100, 300);
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function(x,y){
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-boy.png';
}
//return to origin
Player.prototype.goBack = function(){
    this.x = 200;
    this.y = 380;
}

//change character
Player.prototype.changeChar = function(c){
    this.sprite = c;
}

Player.prototype.update = function(){
    var oScore = document.querySelector('#score');
    var oHigh = document.querySelector('#highest');
    var score = parseInt(oScore.innerHTML);
    var high = parseInt(oHigh.innerHTML);
    if(this.y < 50){
        score++;
        if(score >= high){
            high = score;
        }
        oHigh.innerHTML = high;
        oScore.innerHTML = score;
        this.goBack();
    }
    //onhit
    for(var i = 0; i < allEnemies.length; i++){
        if((this.x - 70 < allEnemies[i].x) && (this.x + 70 > allEnemies[i].x) && this.y === allEnemies[i].y ){
            this.goBack();
            score = 0;
            oScore.innerHTML = score;
            $('#gem').html(0);
        }
    }
    
}

Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite),this.x,this.y);
}



Player.prototype.handleInput = function(input){
    
        switch(input){
            case 'left':
                if(this.x > 0){
                    this.x -= 100;
                }
                break;
            case 'right':
                if(this.x < 400){
                    this.x += 100;
                }
                break;
            case 'up':
                this.y -= 80;
                break;
            case 'down':
                if(this.y < 380){
                    this.y += 80;
                }
                break;
        }
    
    
}

////random use
var locX = [0,100,200,300,400,500];
var locY = [60,140,220,280];
////////////////////////////////GEMGEMGEM/////////////
var Gem = function(x,y){
    this.x = x;
    this.y = y;
    this.sprite = 'images/Gem Blue.png';
}
Gem.prototype.update = function(){
    //onhit
    if((this.x - 70 < player.x) && (this.x + 70 > player.x) && this.y === player.y ){
        var numGems = parseInt($('#gem').html());
        numGems++;
        $('#gem').html(numGems);
        this.x = locX[getRandomInt(0,5)];
        this.y = locY[getRandomInt(0,3)];
    }
}
Gem.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite),this.x,this.y);
}


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var gem = new Gem(locX[getRandomInt(0,5)],locY[getRandomInt(0,3)]);
var allEnemies = [
    new Enemy(locY[0]),
    new Enemy(locY[1]),
    new Enemy(locY[2]),
    new Enemy(locY[getRandomInt(0,2)])
];
var player = new Player(200,380);



//listen for click character
$('.main-char').on('click','img', function(e){
    $('.main-char img').removeClass();
    $(this).addClass('char-selected');
    player.changeChar($(this).attr('src'));
});

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
