/*configuraciones del canvas*/
const canvas = document.querySelector ("canvas");
const c = canvas.getContext ("2d");

canvas.width = 1024;
canvas.height = 576;

c.fillRect(0, 0, canvas.width, canvas.height);


const gravity = 0.2                                                                   /*constante de gravedad para que los rectangulos lleguen al piso del canvas*/
/*argumentos para todos los rectangulos */
class Sprite{
  constructor({position, velocity}) {
    this.position = position
    this.velocity = velocity
    this.height = 150
  }

  draw() {
    c.fillStyle = "red"
    c.fillRect(this.position.x, this.position.y, 50, this.height)

  }
  update(){
    this.draw()
    this.position.y += this.velocity.y

    if(this.position.y + this.height + this.velocity.y >= canvas.height){             /*si la parte de abajo del rectangulo es mayor o igual a la parte de abajo del canvas mantener la velocidad en cero (el canvas empieza arriba, mayor o igual en este caso significa "por debajo de...")*/
      this.velocity.y=0
    } else this.velocity.y += gravity                                                 /*si no esta por debajo del piso del canvas, acelerar con la gravedad*/

  }
}

const player = new Sprite({
  position: {
  x:0,
  y:0
},
velocity: {
  x:0,
  y:0
}
})


const enemy = new Sprite({
  position: {
  x:400,
  y:0
},
velocity:{
  x:0,
  y:0
}
})



console.log(player)

function animate() {
  window.requestAnimationFrame(animate)
  c.fillStyle = "black"
  c.fillRect(0, 0, canvas.width, canvas.height)
  player.update()
  enemy.update()

}

animate()                                                                             /*loop que permite la animacion de los rectangulos*/
