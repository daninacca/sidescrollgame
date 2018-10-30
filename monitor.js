const c = document.getElementById("game").getContext("2d")
const game = new Game()
const ground = [ 
    new Ground(0, 350),
    new Ground(50, 350),
    new Ground(100, 350),
    new Ground(150, 350),
    new Ground(200, 350),
    new Ground(250, 350),
    new Ground(300, 350),
    new Ground(350, 350),
    new Ground(400, 350),
    new Ground(450, 350),
    new Ground(500, 350), 
]
const obstacles = []
const hero = new Hero(150, 300, 20, 0, 2 * Math.PI)
let previous
let compromised = false

document.addEventListener("keydown", e => {
        if(e.keyCode === 37) {     
            // left
            hero.x -= 8
        }
        if(e.keyCode === 38) {
            // up
            if(!hero.jump) {
                hero.yspeed -= 200
                hero.jump = !hero.jump
            }
        }
        if(e.keyCode === 39) {
            // right
            hero.x += 8
        }
})
function makeObstacles() {
    for(let i = 1; i < 11; i++) {
        obstacles.push(
            new Obstacle(
                c.canvas.width * i, 
                numberMaker(150, 300), 
                c.canvas.width, 
                c.canvas.height
            )
        )
    }
}
function numberMaker(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}
function draw() {
    c.fillStyle = !compromised ? "blue" : "red"
    c.strokeStyle = !compromised ? "blue" : "red"
    c.fillRect(0, 0, 500, 400)

    hero.draw()
    ground.forEach(tile => {
        tile.draw()
    })
    obstacles.forEach(obstacle => {
        obstacle.draw()
    })
}
function update(elapsed, timestamp) {
    hero.update(elapsed)
    ground.forEach(tile => {
        tile.update(elapsed)
    })
    obstacles.forEach(obstacle => {
        obstacle.update(elapsed)
        if(game.compare(obstacle)) {
            game.checkGame(timestamp)
        }
    })        
}
function frame(timestamp) {
    if(!previous) {
        previous = timestamp
        makeObstacles()
    }
    let elapsed = timestamp - previous

    update(elapsed / 1000, timestamp)
    draw()
    
    previous = timestamp
    window.requestAnimationFrame(frame)
}
window.requestAnimationFrame(frame)