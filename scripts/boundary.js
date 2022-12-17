import {c} from './index.js'

export class Boundary{
    static width            = 40
    static height           = 40
    constructor({position, image}){
        this.position       = position
        this.width          = Boundary.width
        this.height         = Boundary.height
        this.image          = image
    }
    draw(){
        c.drawImage(this.image,this.position.x, this.position.y)
    }
}
