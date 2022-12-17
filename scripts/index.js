import { Player } from './player.js'
import { Ghost } from './ghost.js'
import { Pellet } from './pellet.js'
import { Boundary } from './boundary.js'
import { PowerUp } from './powerup.js'

const canvas = document.querySelector('canvas')
const scoreElem = document.querySelector('[data-score]')
export const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight
let score = 0

const powerups = []
const boundaries = []
const pellets = []
let ghosts = [new Ghost({
    position:{
        x:Boundary.width*6+Boundary.width/2,
        y:Boundary.height+Boundary.height/2,
    },
    velocity:{
        x:Ghost.speed,
        y:0,
    }
}),new Ghost({
    position:{
        x:Boundary.width*6+Boundary.width/2,
        y:Boundary.height*8+Boundary.height/2,
    },
    velocity:{
        x:0,
        y:-Ghost.speed,
    },
    color:'blue'
}),new Ghost({
    position:{
        x:Boundary.width+Boundary.width/2,
        y:Boundary.height*11+Boundary.height/2,
    },
    velocity:{
        x:Ghost.speed,
        y:0,
    },
    color:'pink'
}),new Ghost({
    position:{
        x:Boundary.width*9+Boundary.width/2,
        y:Boundary.height*9+Boundary.height/2,
    },
    velocity:{
        x:0,
        y:Ghost.speed,
    },
    color:'orange'
})]
const player = new Player({
    position:{
        x:Boundary.width+Boundary.width/2,
        y:Boundary.height+Boundary.height/2,
    },
    velocity:{
        x:0,
        y:0,
    }
})
const keys = {
    w:{
        pressed:false
    },
    a:{
        pressed:false
    },
    s:{
        pressed:false
    },
    d:{
        pressed:false
    },
}

let lastKey                 = ''

const map = [
    ['1', '-', '-', '-', '-', '-', '-', '-', '-', '-', '2'],
    ['|', '.', '.', '.', '.', '.', '.', '.', '.', '.', '|'],
    ['|', '.', 'b', '.', '[', '7', ']', '.', 'b', '.', '|'],
    ['|', '.', '.', '.', '.', '_', '.', '.', '.', '.', '|'],
    ['|', '.', '[', ']', '.', '.', '.', '[', ']', '.', '|'],
    ['|', '.', '.', '.', '.', '^', '.', '.', '.', '.', '|'],
    ['|', '.', 'b', '.', '[', '+', ']', '.', 'b', '.', '|'],
    ['|', '.', '.', '.', '.', '_', '.', '.', '.', '.', '|'],
    ['|', '.', '[', ']', '.', '.', '.', '[', ']', '.', '|'],
    ['|', '.', '.', '.', '.', '^', '.', '.', '.', '.', '|'],
    ['|', '.', 'b', '.', '[', '5', ']', '.', 'b', '.', '|'],
    ['|', '.', '.', '.', '.', '.', '.', '.', '.', 'p', '|'],
    ['4', '-', '-', '-', '-', '-', '-', '-', '-', '-', '3']
  ]
function createImage(src){
    const image = new Image()
    image.src = src
    return image
}

map.forEach((row, i) => {
    row.forEach((symbol,x) => {
        switch (symbol){
            case 'p':
                powerups.push(new PowerUp({
                    position:{
                        x:Boundary.width*x+Boundary.width/2,
                        y:Boundary.height*i+Boundary.height/2,
                    }
                }))
            case '.':
                pellets.push(new Pellet({
                    position:{
                        x:Boundary.width*x+Boundary.width/2,
                        y:Boundary.height*i+Boundary.height/2,
                    }
                }))
                break
            case '-':
                boundaries.push(new Boundary({
                    position:{
                        x:Boundary.width*x,
                        y:Boundary.height*i,
                    },
                    image: createImage('./img/pipeHorizontal.png')
                }))
                break
            case 'b':
                boundaries.push(new Boundary({
                    position:{
                        x:Boundary.width*x,
                        y:Boundary.height*i,
                    },
                    image: createImage('./img/block.png')
                }))
                break
            case '+':
                boundaries.push(new Boundary({
                    position:{
                        x:Boundary.width*x,
                        y:Boundary.height*i,
                    },
                    image: createImage('./img/pipeCross.png')
                }))
                break
            case '^':
                boundaries.push(new Boundary({
                    position:{
                        x:Boundary.width*x,
                        y:Boundary.height*i,
                    },
                    image: createImage('./img/capTop.png')
                }))
                break
            case '[':
                boundaries.push(new Boundary({
                    position:{
                        x:Boundary.width*x,
                        y:Boundary.height*i,
                    },
                    image: createImage('./img/capLeft.png')
                }))
                break
            case ']':
                boundaries.push(new Boundary({
                    position:{
                        x:Boundary.width*x,
                        y:Boundary.height*i,
                    },
                    image: createImage('./img/capRight.png')
                }))
                break
            case '_':
                boundaries.push(new Boundary({
                    position:{
                        x:Boundary.width*x,
                        y:Boundary.height*i,
                    },
                    image: createImage('./img/capBottom.png')
                }))
                break
            case '|':
                boundaries.push(new Boundary({
                    position:{
                        x:Boundary.width*x,
                        y:Boundary.height*i,
                    },
                    image: createImage('./img/pipeVertical.png')
                }))
                break
            case '1':
                boundaries.push(new Boundary({
                    position:{
                        x:Boundary.width*x,
                        y:Boundary.height*i,
                    },
                    image: createImage('./img/pipeCorner1.png')
                }))
                break
            case '2':
                boundaries.push(new Boundary({
                    position:{
                        x:Boundary.width*x,
                        y:Boundary.height*i,
                    },
                    image: createImage('./img/pipeCorner2.png')
                }))
                break
            case '3':
                boundaries.push(new Boundary({
                    position:{
                        x:Boundary.width*x,
                        y:Boundary.height*i,
                    },
                    image: createImage('./img/pipeCorner3.png')
                }))
                break
            case '4':
                boundaries.push(new Boundary({
                    position:{
                        x:Boundary.width*x,
                        y:Boundary.height*i,
                    },
                    image: createImage('./img/pipeCorner4.png')
                }))
                break
            case '5':
                boundaries.push(new Boundary({
                    position:{
                        x:Boundary.width*x,
                        y:Boundary.height*i,
                    },
                    image: createImage('./img/pipeConnectorTop.png')
                }))
                break
            case '6':
                boundaries.push(new Boundary({
                    position:{
                        x:Boundary.width*x,
                        y:Boundary.height*i,
                    },
                    image: createImage('./img/pipeConnectorRight.png')
                }))
                break
            case '7':
                boundaries.push(new Boundary({
                    position:{
                        x:Boundary.width*x,
                        y:Boundary.height*i,
                    },
                    image: createImage('./img/pipeConnectorBottom.png')
                }))
                break
            case '8':
                boundaries.push(new Boundary({
                    position:{
                        x:Boundary.width*x,
                        y:Boundary.height*i,
                    },
                    image: createImage('./img/pipeConnectorLeft.png')
                }))
                break
        }
    })
})

function circleCollidesWithRectangle({
    circle,
    rectangle
}){
    const padding = Boundary.width/2-circle.radius-1
    return (
        circle.position.y - circle.radius + circle.velocity.y <= 
        rectangle.position.y + rectangle.height + padding 
        && circle.position.x + circle.radius + circle.velocity.x >= 
        rectangle.position.x - padding
        && circle.position.y + circle.radius + circle.velocity.y >= 
        rectangle.position.y - padding
        && circle.position.x - circle.radius + circle.velocity.x <= 
        rectangle.position.x + rectangle.width + padding
    )
}
let animationId
function animate(){
    animationId = requestAnimationFrame(animate)
    c.clearRect(0,0,canvas.width, canvas.height)

    if (keys.w.pressed          && lastKey === 'w'){
        for (let i = 0; i < boundaries.length; i++){
            const boundary = boundaries[i]
            if(circleCollidesWithRectangle({
                circle: {...player, velocity: {
                    x:0,
                    y:-5
                }},
                rectangle: boundary
            })){
                player.velocity.y   = 0
                break
            }else{
                player.velocity.y   = -5
            }
        }
    }else if (keys.a.pressed    && lastKey === 'a'){
        for (let i = 0; i < boundaries.length; i++){
            const boundary = boundaries[i]
            if(circleCollidesWithRectangle({
                circle: {...player, velocity: {
                    x:-5,
                    y:0
                }},
                rectangle: boundary
            })){
                player.velocity.x   = 0
                break
            }else{
                player.velocity.x   = -5
            }
        }
    }else if (keys.s.pressed    && lastKey === 's'){
        for (let i = 0; i < boundaries.length; i++){
            const boundary = boundaries[i]
            if(circleCollidesWithRectangle({
                circle: {...player, velocity: {
                    x:0,
                    y:5
                }},
                rectangle: boundary
            })){
                player.velocity.y   = 0
                break
            }else{
                player.velocity.y   = 5
            }
        }
    }else if (keys.d.pressed    && lastKey === 'd'){
        for (let i = 0; i < boundaries.length; i++){
            const boundary = boundaries[i]
            if(circleCollidesWithRectangle({
                circle: {...player, velocity: {
                    x:5,
                    y:0
                }},
                rectangle: boundary
            })){
                player.velocity.x   = 0
                break
            }else{
                player.velocity.x   = 5
            }
        }
    } 

    for (let i = powerups.length-1; 0<=i; i--){
        const powerup = powerups[i]
        powerup.draw()

        if (
            Math.hypot(
                powerup.position.x - player.position.x, 
                powerup.position.y - player.position.y) 
                < powerup.radius + player.radius){
                powerups.splice(i, 1)

                ghosts.forEach(ghost => {
                    ghost.scared = true

                    setTimeout(() => {
                        ghost.scared = false
                    }, 5000)
                })
            }
    }
    for (let i = ghosts.length-1; 0<=i; i--){
        const ghost = ghosts[i]
    if (
        Math.hypot(
            ghost.position.x - player.position.x, 
            ghost.position.y - player.position.y) 
            < ghost.radius + player.radius)
            if (ghost.scared){
                ghosts.splice(i,1)
                score += 100
                scoreElem.innerHTML = score
                setTimeout(() => {
                    ghosts.push(new Ghost({
                        position:{
                            x:Boundary.width*5+Boundary.width/2,
                            y:Boundary.height*5+Boundary.height/2,
                        },
                        velocity:{
                            x:Ghost.speed,
                            y:0,
                        },
                        color:'orange'
                    }))  
                }, 3000);
                
            }else{
                cancelAnimationFrame(animationId)
                
        }
    }

    if(pellets.length === 0){
        cancelAnimationFrame(animationId)
    }

    for (let i = pellets.length-1; 0<=i; i--){
        const pellet = pellets[i]
        pellet.draw()

        if (
            Math.hypot(
                pellet.position.x - player.position.x, 
                pellet.position.y - player.position.y) 
                < pellet.radius + player.radius){
                pellets.splice(i, 1)
                score += 10
                scoreElem.innerHTML = score
            }
    }

    boundaries.forEach((boundary) => {
        boundary.draw()

        if(circleCollidesWithRectangle({
            circle: player,
            rectangle: boundary
        })){
                player.velocity.x = 0
                player.velocity.y = 0
        }
    })

    player.update()

    ghosts.forEach(ghost => {
        ghost.update()
        
        const collisions = []
        boundaries.forEach(boundary => {
            if(!collisions.includes('right') &&
                circleCollidesWithRectangle({
                circle: {...ghost, velocity: {
                    x:Ghost.speed,
                    y:0
                }},
                rectangle: boundary
            })
            ){
                collisions.push('right')
            }else 
            if(!collisions.includes('left') &&
            circleCollidesWithRectangle({
                circle: {...ghost, velocity: {
                    x:-Ghost.speed,
                    y:0
                }},
                rectangle: boundary
            })
            ){
                collisions.push('left')
            }else
            if(!collisions.includes('down') &&
            circleCollidesWithRectangle({
                circle: {...ghost, velocity: {
                    x:0,
                    y:Ghost.speed
                }},
                rectangle: boundary
            })
            ){
                collisions.push('down')
            }else
            if(!collisions.includes('up') &&
                circleCollidesWithRectangle({
                circle: {...ghost, velocity: {
                    x:0,
                    y:-Ghost.speed
                }},
                rectangle: boundary
            })
            ){
                collisions.push('up')
            }
        })
        if(collisions.length > ghost.prevCollisions.length)
        ghost.prevCollisions = collisions
        if(JSON.stringify(collisions) !== JSON.stringify(ghost.prevCollisions)){
            if (ghost.velocity.x > 0) ghost.prevCollisions.push('right')
            else if (ghost.velocity.x < 0) ghost.prevCollisions.push('left')
            else if (ghost.velocity.y > 0) ghost.prevCollisions.push('down')
            else if (ghost.velocity.y < 0) ghost.prevCollisions.push('up')
            const pathways = ghost.prevCollisions.filter(collision =>{
                return !collisions.includes(collision)
            })
            const direction = pathways[Math.floor(Math.random() * pathways.length)]
            switch(direction){
                case 'right':
                    ghost.velocity.x = Ghost.speed
                    ghost.velocity.y = 0
                    break
                case 'left':
                    ghost.velocity.x = -Ghost.speed
                    ghost.velocity.y = 0
                    break
                case 'up':
                    ghost.velocity.y = -Ghost.speed
                    ghost.velocity.x = 0
                    break
                case 'down':
                    ghost.velocity.y = Ghost.speed
                    ghost.velocity.x = 0
                    break
            }
            ghost.prevCollisions = []
        }
    })

    if(player.velocity.x > 0)player.rotation = 0
    if(player.velocity.x < 0)player.rotation = Math.PI
    if(player.velocity.y > 0)player.rotation = Math.PI/2
    if(player.velocity.y < 0)player.rotation = Math.PI*1.5
}
animate()
addEventListener('keydown', ({key}) => {
    switch (key){
        case 'w':
            keys.w.pressed  = true
            lastKey = 'w'
            break
        case 'a':
            keys.a.pressed  = true
            lastKey = 'a'
            break
        case 's':
            keys.s.pressed  = true
            lastKey = 's'
            break
        case 'd':
            keys.d.pressed  = true
            lastKey = 'd'
            break
    }
})
addEventListener('keyup', ({key}) => {
    switch (key){
        case 'w':
            keys.w.pressed  = false
            break
        case 'a':
            keys.a.pressed  = false
            break
        case 's':
            keys.s.pressed  = false
            break
        case 'd':
            keys.d.pressed  = false
            break
    }
})