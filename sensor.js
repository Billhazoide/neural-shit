class Sensor {
  constructor(car){
    this.car = car
    this.rayCount = 5
    this.rayLength = 150
    // Angle rays deg
    this.raySpread = Math.PI/1.5

    this.rays = []
    this.readings = []
  }

  update(roadBorders){
    this.castRays()
    this.readings = []
    for(let i=0; i < this.rays.length;i++){
      this.readings.push( this.getReadings(this.rays[i], roadBorders) )
    }
  }
  
  getReadings(ray, roadBorders){
    let touches = []
    
    for(let i=0; i < roadBorders.length;i++) {
      const touch = getIntersection(
        ray[0],
        ray[1],
        roadBorders[i][0],
        roadBorders[i][1]
      )

      if(touch) { touches.push(touch) }  
    }

    if(touches.length === 0) { 
      return null 
    } else {
      const offsets = touches.map((item) =>  item.offset )
      const minOffset = Math.min(...offsets)

      return touches.find((item) =>  item.offset === minOffset )
    } 
  }

  castRays(){
    this.rays = []
    for(let i=0; i < this.rayCount;i++){
      const rayAngle = lerp(
        this.raySpread/2,
        -this.raySpread/2,
        this.rayCount === 1 ? 0.5 : i/(this.rayCount-1)
      ) + this.car.angle

      const start = { x:this.car.x, y:this.car.y }
      const end = {
        x:this.car.x - Math.sin(rayAngle)*this.rayLength,
        y:this.car.y - Math.cos(rayAngle)*this.rayLength
      }
      this.rays.push([start,end])
    }
  }

  // Draw sensors
  draw(ctx){
    for(let i=0; i < this.rayCount;i++){
      let end
      // If has any readings
      // sensors will become red
      if(this.readings[i]){ 
        end = this.readings[i]

        ctx.beginPath()
        ctx.lineCap = "round"
        ctx.lineWidth = 10
        ctx.strokeStyle = "red"
        ctx.moveTo(
          end.x,
          end.y
        )
        ctx.lineTo(
          end.x,
          end.y
        )
        ctx.stroke()
      
      } else {
        end = this.rays[i][1]
        ctx.beginPath()
        ctx.lineCap = "round"
        ctx.lineWidth = 10
        ctx.strokeStyle = "limegreen"
        ctx.moveTo(
          end.x,
          end.y
        )
        ctx.lineTo(
          end.x,
          end.y
        )
        ctx.stroke()
      }
    }
  }

}