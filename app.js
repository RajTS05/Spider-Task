var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');
var W = window.innerWidth;
var H = window.innerHeight;
canvas.width = W;
canvas.height = H;

var mouse={
    x:undefined,
    y:undefined
};

window.addEventListener('click',function(event){
  mouse.x = event.x
  mouse.y=event.y;  
  
})

function Circle(x,y,dx,dy,circleRadius)
{
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.circleRadius = circleRadius;
  this.mass = this.circleRadius * this.circleRadius * this.circleRadius;
  this.draw = function(){
    ctx.beginPath();
    ctx.arc(this.x,this.y,this.circleRadius,0,Math.PI*2,false);
    ctx.strokeStyle='blue';
    ctx.stroke();
    ctx.fillStyle='blue';
    ctx.fill();
  }
  this.update = function(){
    if( this.x + this.circleRadius > W || this.x - this.circleRadius < 0 )
    {
        this.dx=-this.dx;
    }
    if( this.y + this.circleRadius > H || this.y - this.circleRadius < 0 )
    {
        this.dy=-this.dy;
    }
    ballCollision();
    this.x+=this.dx;
    this.y+=this.dy;
    this.draw();
    if(mouse.x-this.x<this.circleRadius&&mouse.x-this.x>-this.circleRadius && mouse.y-this.y<this.circleRadius&&mouse.y-this.y>-this.circleRadius)
    {
        this.circleRadius=0;
        mouse.x=undefined;
        mouse.y=undefined;
    }
    else
    {
        
    }
 
    
 }
this.speed =function ()
    {
        
        return Math.sqrt(this.dx * this.dx + this.dy * this.dy);
    }
this.angle=function() 
    {
    
        return Math.atan2(this.dy, this.dx);
    };
}
function distance(a, b) {
    return Math.sqrt((a.x - b.x)**2 + (a.y - b.y)**2);
    console.log(Math.sqrt((a.x - b.x)**2 + (a.y - b.y)**2));
    
}

function ballCollision() 
{   

    for (let i=0; i<circleArray.length-1; i++) 
    {
        for (let j=i+1; j<circleArray.length; j++) 
        {
            let ob1 = circleArray[i];
            let ob2 = circleArray[j];
            let dist = distance(ob1, ob2);
            let delX = ob1.x-ob2.x;
            let delY = ob1.y-ob2.y;
            let vRelX = ob2.dx-ob1.dx;
            let vRelY = ob2.dy-ob1.dy
            if (dist < ob1.circleRadius + ob2.circleRadius) 
            {  
            
                let theta1 = ob1.angle();
                let theta2 = ob2.angle();
                let phi = Math.atan2(ob2.y - ob1.y, ob2.x - ob1.x);
                let m1 = ob1.mass;
                let m2 = ob2.mass;
                let v1 = ob1.speed();
                let v2 = ob2.speed();

                let dx1F = (v1 * Math.cos(theta1 - phi) * (m1-m2) + 2*m2*v2*Math.cos(theta2 - phi)) / (m1+m2) * Math.cos(phi) + v1*Math.sin(theta1-phi) * Math.cos(phi+Math.PI/2);
                let dy1F = (v1 * Math.cos(theta1 - phi) * (m1-m2) + 2*m2*v2*Math.cos(theta2 - phi)) / (m1+m2) * Math.sin(phi) + v1*Math.sin(theta1-phi) * Math.sin(phi+Math.PI/2);
                let dx2F = (v2 * Math.cos(theta2 - phi) * (m2-m1) + 2*m1*v1*Math.cos(theta1 - phi)) / (m1+m2) * Math.cos(phi) + v2*Math.sin(theta2-phi) * Math.cos(phi+Math.PI/2);
                let dy2F = (v2 * Math.cos(theta2 - phi) * (m2-m1) + 2*m1*v1*Math.cos(theta1 - phi)) / (m1+m2) * Math.sin(phi) + v2*Math.sin(theta2-phi) * Math.sin(phi+Math.PI/2);

                if(delX*vRelX + delY*vRelY>=0)
                {
                    ob1.dx = dx1F;                
                    ob1.dy = dy1F;                
                    ob2.dx = dx2F;                
                    ob2.dy = dy2F;
                }

             
          
                
                
            }            
        }
        
    }
}

var circleArray = [];

for(var i=0;i<50;i++)
{   
    var x = Math.random()*(W-circleRadius*2) + circleRadius;
    var dx = (Math.random()-0.5)*8;
    var y = Math.random()*(H-circleRadius*2)+circleRadius;
    var dy = (Math.random()-0.5)*8;
    var circleRadius = 30;
    circleArray[i]=new Circle(x,y,dx,dy,circleRadius);
}



function push()
{}



function animate()
{   
    requestAnimationFrame(animate);
    ctx.clearRect(0,0,W,H);
    if(circleArray.length>1)
    {
        for(var i=0;i<circleArray.length;i++)
        {
            circleArray[i].update();
        }
    }
   
  
}
animate();