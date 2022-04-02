/*configuraciones del canvas*/
const canvas = document.querySelector ("canvas");
const c = canvas.getContext ("2d");

canvas.width = 1024;
canvas.height = 576;

c.fillRect(0, 0, canvas.width, canvas.height);


const gravity = 0.7                                                                   /*constante de gravedad para que los rectangulos lleguen al piso del canvas*/
/*argumentos para todos los rectangulos */
class Sprite{
  constructor({position, velocity}) {
    this.position = position
    this.velocity = velocity
    this.height = 150
    this.lastKey
  }

  draw() {
    c.fillStyle = "red"
    c.fillRect(this.position.x, this.position.y, 50, this.height)

  }
  update(){
    this.draw()
    this.position.x += this.velocity.x
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

const keys={
  a:{
    pressed: false
  },
  d:{
    pressed: false
  },
  w:{
    pressed: false
  },
  ArrowRight: {
    pressed:false
  },
  ArrowLeft: {
    pressed:false
  },
}

function animate() {
  window.requestAnimationFrame(animate)
  c.fillStyle = "black"
  c.fillRect(0, 0, canvas.width, canvas.height)
  player.update()
  enemy.update()

  player.velocity.x=0
  enemy.velocity.x=0
  //movimiento del jugador

  if (keys.a.pressed && player.lastKey === "a") {
    player.velocity.x = -5
  }
  else if (keys.d.pressed && player.lastKey ==="d"){
    player.velocity.x = 5
  }
  //movimiento del enemigo
    if (keys.ArrowLeft.pressed && enemy.lastKey === "ArrowLeft") {
      enemy.velocity.x = -5}
    else if (keys.ArrowRight.pressed && enemy.lastKey ==="ArrowRight"){
      enemy.velocity.x = 5
    }
}

animate()                                                                             /*aca termina el loop que permite la animacion de los rectangulos*/

/*aca empiezan los registros de las teclas para movimiento de personajes*/
window.addEventListener ("keydown", (event) => { //apreto la tecla (keydown) la velocidad del rectangulo aumenta a 1 sobre el eje X (se mueve a la derecha) o disminuye a -1 (se mueve a la izquierda)
  switch (event.key){
    case "d" :
      keys.d.pressed=true
      player.lastKey = "d"
    break
    case "a" :
      keys.a.pressed=true
      player.lastKey = "a"
    break
    case "w" :
      player.velocity.y = -20
    break

    case "ArrowRight" :
      keys.ArrowRight.pressed=true
      enemy.lastKey = "ArrowRight"
    break
    case "ArrowLeft" :
    keys.ArrowLeft.pressed=true
    enemy.lastKey = "ArrowLeft"
    break
    case "ArrowUp" :
    enemy.velocity.y = -20
    break
  }
  console.log(event.key)
})

window.addEventListener ("keyup", (event) => { //levanto la tecla (keyup) la velocidad del rectangulo se reduce a 0 sobre el eje X (se queda quieto)
  switch (event.key){
    case "d" :
      keys.d.pressed=false
    break
    case "a" :
      keys.a.pressed=false
    break
  }

  //comnandos del enemigo
  switch (event.key){
    case "ArrowRight" :
      keys.ArrowRight.pressed=false
    break
    case "ArrowLeft" :
      keys.ArrowLeft.pressed=false
    break
    }

  console.log(event.key)
})
/* esto basicamente hace que mientras yo mantengo D apretada, la velocidad es 1 (el cuadrado se mueve). Cuando suelto D la velocidad es 0, se queda quieto.*/
