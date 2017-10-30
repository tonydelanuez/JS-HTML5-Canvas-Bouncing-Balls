
// Initial set up for the canvas
var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');

var width = canvas.width = window.innerWidth;
var height = canvas.height = window.innerHeight;


/**
 * Method to get a random number
 * @param {number} min lower bound of random number
 * @param {number} max upper bound of random number
 * @returns {number} random number between min and max
 */ 
function random(min,max) {
  var num = Math.floor(Math.random()*(max-min)) + min;
  return num;
}

/** 
 * A Ball object - bounces around the screen
 * @param {number} x initial x position
 * @param {number} y initial y position
 * @param {number} velX initial x velocity
 * @param {number} velY initial y velocity
 * @param {string} ball color
 * @param {number} size of ball  
 */
function Ball(x, y, velX, velY, color, size){
	this.x = x; 
	this.y = y;
	this.velX = velX;
	this.velY = velY;
	this.color = color; 
	this.size = size;
}


/**
 * Adding a draw function to the Ball prototype
 * The ball with draw and fill
 */
Ball.prototype.draw = function() {
	ctx.beginPath();
	ctx.fillStyle = this.color;
	ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
	ctx.fill();
}

/** 
 * Adding collision detection to the Ball class
 * For each ball, check if it has collided than another ball. 
 * If the collision is detected, make a new random color. 
 */
Ball.prototype.collisionDetect = function() {
	for(var j = 0; j < balls.length; j++){
		if (!(this === balls[j])){
			var dx = this.x - balls[j].x;
			var dy = this.y - balls[j].y;
			var distance = Math.sqrt(dx * dx + dy * dy);

			if(distance < this.size + balls[j].size){
				balls[j].color = this.color = 'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) +')';
			}
		}
	}
}
/**
 *  Adding an update function to the Ball prototype
 *  If the ball reaches an edge, have it bounce off.
 *  Continually update the coordinates using velocity
 */
Ball.prototype.update = function(){
	if ((this.x + this.size ) >= width) {
		this.velX = -(this.velX);
	}
	if ((this.x - this.size ) <= 0) {
		this.velX = -(this.velX);
	}
	if ((this.y + this.size) >= height) {
		this.velY = -(this.velY);
	}
	if ((this.y - this.size) <= 0) {
		this.velY = -(this.velY);
	}

	this.x += this.velX;
	this.y += this.velY;
}

var balls = [];

/** 
 * Function to start the animation loop
 * Create 25 balls of random dimensions,
 * Push each ball into ball array
 * Animate each ball and request animation frame
 */
function loop(){
	ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
	ctx.fillRect(0, 0, width, height);

	while(balls.length < 25){
		var ball = new Ball(
			random(0, width), 
			random(0, height), 
			random(-7, 7),
			random(-7, 7), 
			'rgb(' + random(0,255) + ',' + random(0,255) + ',' + random(0,255) + ')',
			random(10, 20)
		);
		balls.push(ball);
	}

	for(var i = 0; i < balls.length; i++){
		balls[i].draw();
		balls[i].update();
		balls[i].collisionDetect();
	}

	requestAnimationFrame(loop);
}

loop();