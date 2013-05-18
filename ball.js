
function ball(layer)
{
	this.layer = layer;
	this.oldX=0;
	this.oldY=0;
	this.x=0;
	this.y=0;
	this.gravity=0.1;
	this.dx=3;
	this.dy=-3;
	this.points=new Array();
	this.strokeWith = 1;
	this.strokeColor ="green";
	
	this.destroy = function(){};
	
	this.pause = false;
	
	this.bounceRight = true;
	this.bounceLeft = false;
	this.bounceBottom = true;
	
	this.bounceX = 0.6;
	this.bounceY = 0.6;
	
	this.maxGravity = 12;

	this.points = new Array();
	this.line = new Kinetic.Line(
								{
					        		points: new Array(),
					       			stroke: this.strokeColor,
					        		strokeWidth: 1,
					        		lineCap: 'round',
					        		lineJoin: 'round'
				        		});
	
	this.layer.add(this.line);
}

ball.prototype.move = function()
	{
			if(this.pause){return this.line}
			this.oldX = this.x;
			this.oldY = this.y;

	    	this.x = this.x + this.dx;
			this.y = this.y + this.dy;
						
			this.dy = this.dy + this.gravity;
			
			if(this.bounceRight && this.x>=this.layer.canvas.width)
			{
				this.x = this.layer.canvas.width;
				this.dx = this.dx*-1;
			}
			if(!this.bounceRight && x>=this.layer.canvas.width)
			{
				this.destroy(this);
			}
			
			
			if(this.bounceLeft && this.x<=0)
			{
				this.x = 0;
				this.dx = this.dx*-1;
			}
			else if(!this.bounceLeft && this.x<=0)
			{
				this.destroy(this);
			}
			
			
			if(this.bounceBottom && this.y>=this.layer.canvas.height)
			{
				this.y = this.layer.canvas.height;
				this.dy = this.dy*-1;
				
				this.dy = this.dy*this.bounceY;
				this.dx = this.dx*this.bounceX;
			}
			else if(!this.bounceBottom && this.y>=this.layer.canvas.height)
			{
				this.destroy(this);
			}
		
			
			this.points.push(this.x);
			this.points.push(this.y);
			this.line.setAttrs(
				{
					points:this.points
				})
				
			this.layer.draw();
			
			return this.line;
	}

ball.prototype.getMovement = function(){
		
		var returnVal = new Array();
			returnVal.push(this.oldX);
			returnVal.push(this.oldY);
			returnVal.push(this.x);
			returnVal.push(this.y);
		return returnVal;
		
	}

ball.prototype.setPause = function()
{
	this.pause = !this.pause;
}
	
	

