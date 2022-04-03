/*configuraciones del canvas*/
const canvas = document.querySelector ("canvas");
const c = canvas.getContext ("2d");

canvas.width = 1024;
canvas.height = 576;

c.fillRect(0, 0, canvas.width, canvas.height);


const gravity = 0.7                                                                   /*constante de gravedad para que los rectangulos lleguen al piso del canvas*/
/*argumentos para todos los rectangulos */
class Sprite{
  constructor({position, velocity, color = "red", offset}) {
    this.position = position
    this.velocity = velocity
    this.width = 50
    this.height = 150
    this.lastKey
    this.attackBox = {
      position: {
        x: this.position.x,
        y: this.position.y,
      },
      offset:offset,


      width: 100,
      height: 50
    }
    this.color=color
    this.isAttacking
    this.health=100
  }

  draw() {
    c.fillStyle = this.color
    c.fillRect(this.position.x, this.position.y, this.width, this.height)

    //caja de ataque
    if (this.isAttacking){
    c.fillStyle = "Green"
    c.fillRect (this.attackBox.position.x,
      this.attackBox.position.y,
      this.attackBox.width,
      this.attackBox.height
      )
    }
  }
  update(){
    this.draw()
    this.attackBox.position.x = this.position.x + this.attackBox.offset.x
    this.attackBox.position.y = this.position.y

    this.position.x += this.velocity.x
    this.position.y += this.velocity.y

    if(this.position.y + this.height + this.velocity.y >= canvas.height){             /*si la parte de abajo del rectangulo es mayor o igual a la parte de abajo del canvas mantener la velocidad en cero (el canvas empieza arriba, mayor o igual en este caso significa "por debajo de...")*/
      this.velocity.y=0
    } else this.velocity.y += gravity                                                 /*si no esta por debajo del piso del canvas, acelerar con la gravedad*/
  }
  attack() {
    this.isAttacking=true
    setTimeout (() => {
      this.isAttacking=false
    } ,100)
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
},
offset:{
  x: 0,
  y: 0,
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
},
offset:{
  x: -50,
  y: 0,
},
color:"blue"
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

function rectangularCollision({ rectangle1, rectangle2 }){
  return (
  rectangle1.attackBox.position.x + rectangle1.attackBox.width >= rectangle2.position.x &&
  rectangle1.attackBox.position.x<= rectangle2.position.x + rectangle2.width &&
  rectangle1.attackBox.position.y + rectangle1.attackBox.height >= rectangle2.position.y &&
  rectangle1.attackBox.position.y <=rectangle2.position.y + rectangle2.height
    )
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
    //detectar colision
    if(
      rectangularCollision({
        rectangle1: player,
        rectangle2: enemy,
      }) &&
      player.isAttacking
    ) {
    player.isAttacking=false
    enemy.health-=20
    document.querySelector ("#enemyHealth").style.width = enemy.health + "%"
  }
  if(
    rectangularCollision({
      rectangle1: enemy,
      rectangle2: player,
    }) &&
    enemy.isAttacking
  ) {
  enemy.isAttacking=false
  player.health-=20
  document.querySelector ("#playerHealth").style.width = player.health + "%"
  }
  if (enemy.health <=0 || player.health <=0){
    determineWinner({player, enemy, timerId})
  }
}

function determineWinner ({player, enemy, timerId}){
  clearTimeout (timerId)
      document.querySelector("#displayText").style.display="flex"
  if(player.health===enemy.health){
    document.querySelector("#displayText").innerHTML="Tie"
  } else if (player.health > enemy.health){
    document.querySelector("#displayText").innerHTML="Player 1 Wins"
  } else if (player.health < enemy.health){
    document.querySelector("#displayText").innerHTML="Player 2 Wins"
  }
}

let timer=30
let timerId
function decreaseTimer(){

  if (timer>0){
  timerId = setTimeout (decreaseTimer, 1000)
  timer--
  document.querySelector("#timer").innerHTML=timer
  }
  if (timer===0) {
    document.querySelector("#displayText").style.display="flex"
    determineWinner({player, enemy, timerId})
  }
}
decreaseTimer()

animate()                                                                             /*aca termina el loop que permite la animacion de los rectangulos*/

/*aca empiezan los registros de las teclas para movimiento de personajes*/
window.addEventListener ("keydown", (event) => { //apreto la tecla (keydown) la velocidad del rectangulo aumenta  sobre el eje X (se mueve a la derecha) o disminuye (se mueve a la izquierda)
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
    case " " :
    player.attack()
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
    case "ArrowDown" :
    enemy.attack()
    break
  }
})

window.addEventListener ("keyup", (event) => { //levanto la tecla (keyup)el rectangulo se queda quieto
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

})
