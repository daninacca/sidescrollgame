class Hero {
    constructor(x, y, radius, begin, end) {
        this.x = x
        this.y = y
        this.xspeed = 30
        this.yspeed = 60
        this.radius = radius
        this.begin = begin
        this.end = end
        this.jump = false
        this.oldY = this.y
    }
    draw() {
        if(game.defeat) {
            game.draw()
            return
        }
        if(obstacles[9].x < 0) {
            game.drawHurray()
            return
        }
        c.save()
        c.beginPath()
        c.strokeStyle = "white"
        c.fillStyle = "white"
        c.arc(this.x, this.y, this.radius, this.begin, this.end)
        c.stroke()
        c.fill()
        c.restore()
    }
    update(elapsed) {
        this.x -= this.xspeed * elapsed
        this.y += this.yspeed * elapsed
        if(this.y + this.radius + 5 >= 350) {
            this.yspeed = 0
            this.jump = false
        } 
        if(this.y <= this.oldY - 100) {
            this.yspeed += 15
        }
    }
}
class Ground {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.xspeed = 200
    }
    draw() {
        c.save()
        c.beginPath()
        c.strokeStyle = "black"
        c.lineWidth = 5
        c.fillStyle = "yellow"
        c.strokeRect(this.x + 1.5, this.y -1.5 , 50, 50)
        c.fillRect(this.x + 0.5, this.y -0.5, 50, 50)
        c.stroke()
        c.fill()
        c.restore()
    }
    update(elapsed) {
        this.x -= this.xspeed * elapsed
        if(this.x + 50 <= 0) {
            this.x = c.canvas.width
        }
    }
}
class Obstacle {
    constructor(x, y, width, height) {
        this.x = x
        this.y = y
        this.xspeed = 200
        this.width = width
        this.height = height
    }
    draw() {        
        c.save()
        c.beginPath()
        c.strokeStyle = "black"
        c.lineWidth = 5
        c.fillStyle = "yellow"
        c.strokeRect(this.x, this.y , 50, 50)
        c.fillRect(this.x, this.y, 50, 50)
        c.fillStyle = "black"
        c.stroke()
        c.fill()
        c.restore()
    }
    update(elapsed) {
        this.x -= this.xspeed * elapsed 
    }
}
class Game {
    constructor() {
        this.hit = 0
        this.defeat = false
        this.oldTimestamp = 1000
    }
    checkGame(timestamp) {
        if(this.oldTimestamp + 1000 < timestamp) {
            switch(this.hit) {
                case 0:
                    this.hit = 1
                    this.oldTimestamp = timestamp
                    this.flickerScreen()
                    break
                case 1:
                    this.hit = 2
                    this.oldTimestamp = timestamp
                    this.flickerScreen()
                    break
                case 2:
                    this.hit = 3
                    this.defeat = true
                    this.flickerScreen()
                    break
            } 
        }
    }
    flickerScreen() {
        compromised = true
        setTimeout(() => {
            compromised = false
        }, 50)   
    }
    compare(obstacle) {
            return Math.sqrt(
                Math.pow(hero.x - obstacle.x, 2) + Math.pow(hero.y - obstacle.y, 2)
            ) < (hero.radius + 30)
    }
    draw() { 
        c.save()
        c.fillStyle = "red"
        c.textAlign = 'center'
        c.font = 28 + "pt Arial"
        c.fillText("The blocks win!", c.canvas.width / 2, c.canvas.height * 0.4)
        c.font = 18 + "pt Arial"
        c.fillText("GGWP", c.canvas.width / 2, c.canvas.height * 0.4 + 28) 
        c.restore()
    }
    drawHurray() {
        c.save()
        c.fillStyle = "yellow"
        c.textAlign = 'center'
        c.font = 28 + "pt Arial"
        c.fillText("You win!", c.canvas.width / 2, c.canvas.height * 0.4)
        c.font = 18 + "pt Arial"
        c.fillText("GGWP", c.canvas.width / 2, c.canvas.height * 0.4 + 28) 
        c.restore()
    }
}