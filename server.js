

var blobs=[]

function Blob(x,y,r,id) {
	this.id=id
	this.x=x
	this.y=y
	this.r=r
	// body...
}



const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);

app.use(express.static("public"));
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');

});
setInterval(heartbeat,30)


   function heartbeat() {
   io.sockets.emit('heartbeat',blobs)
   }



io.on('connection', (socket)=> {
  console.log('a user connected',socket.id);

 
  	
  	
 socket.on("start",(data)=> {
 		console.log(data.x+" "+data.y+" "+data.r+" "+socket.id)
 		var blob = new Blob(data.x,data.y,data.r,socket.id)
  	blobs.push(blob)


 	})


 socket.on("update",(data)=> {
 		console.log(data.x+" "+data.y+" "+data.r+" "+socket.id)
 		
 		for(var i=0;i<blobs.length;i++){
 			if(socket.id==blobs[i].id){
 				blob=blobs[i]
 			}
 		}

         blob.x=data.x;
         blob.y=data.y;
         blob.r=data.r;

 	})

 socket.on("disconnect", () => {
    console.log('disconnected ')
  });

 })


server.listen(3000)