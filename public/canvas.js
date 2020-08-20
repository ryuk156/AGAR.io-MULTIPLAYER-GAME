
var blob
var foods=[]
var otherblob=[]
var zoom;

var socket 

function setup() {
	socket=io.connect('http://localhost:3000/')
	createCanvas(displayWidth,displayHeight);
	
	blob=new Blob(random(width),random(height),64)
  

 setInterval(genteratefood,1000)

 function genteratefood() {
 	for(var i=0;i<2;i++){
		var food=new Blob(random(width),random(height),random(8,20))
		foods.push(food)
	}
 	// body...
 }

	
var data={
	x:blob.pos.x,
	y:blob.pos.y,
	r:blob.r

}
 
 socket.emit('start',data)

 socket.on('heartbeat',function(data) {
 	otherblob=data
 	// body...
 })

}



function draw(){
	background(255, 255, 0);
    
    translate(width/2,height/2)
    var newzoom=64/blob.r
    zoom=lerp(zoom,newzoom,0.1)
	scale(zoom)
	translate(-blob.pos.x,-blob.pos.y)


  
    for( var i=foods.length-1;i>=0;i--){

    	foods[i].show()
    	if(blob.eats(foods[i])){
    		foods.splice(i,1)
    	}
   
   
       
		
    	
    }


    for( var i=otherblob.length-1;i>=0;i--){
   
    if (otherblob[i].id !== socket.id){

    	fill(0,255,0) 
    	ellipse(otherblob[i].x,otherblob[i].y,otherblob[i].r*2,otherblob[i].r*2)

    	fill(0)
    	textAlign(CENTER)
    	text(otherblob[i].id,otherblob[i].x,otherblob[i].y+otherblob[i].r)
    }

       
		
    	
    }

    blob.show()
    if (blob.eatblob(otherblob[i])){
    	otherblob.splice(i,1)

    }
	blob.update()
	blob.constraint()


	var data={
	x:blob.pos.x,
	y:blob.pos.y,
	r:blob.r

}
 
 socket.emit('update',data)
}






function Blob(x,y,r){
	this.pos = createVector(x,y)
	this.r=r
	this.vel=createVector(0,0)


	


    

	this.update=function () {
		var newvel=createVector(mouseX-width/2,mouseY-height/2)
	
				newvel.setMag(3);
				this.vel.lerp(newvel,0.2)
		this.pos.add(this.vel)
	}
   


   this.eats =function(other) {
   	var d= p5.Vector.dist(this.pos,other.pos)
   	if (d<this.r + other.r){
   		var sum =PI * this.r*this.r+PI *other.r*other.r
   		this.r= sqrt(sum/PI)
   		//this.r+=other.r*0.2;
   		return true
   	}else{
   		return false
   	}

}
   	 this.eatblob =function(otherblob) {
   	 	
   	var d= dist(this.pos.x,this.pos.y,otherblob.x,otherblob.y)
   	if (d<this.r + otherblob[i].r){
   		var sum =PI * this.r*this.r+PI *otherblob.r*otherblob.r
   		this.r= sqrt(sum/PI)
   		//this.r+=other.r*0.2;
   		return true
   	}else{
   		return false
   	}
   
   }
   this.constraint =function () {
		blob.pos.x=constrain(blob.pos.x,-width,width)
		blob.pos.y=constrain(blob.pos.y,-height,height)
	}

   this.show =function(){
		fill(255)
		ellipse(this.pos.x,this.pos.y,this.r*2,this.r*2)
	}
	


}