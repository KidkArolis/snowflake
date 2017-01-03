var width = window.innerWidth - 20
var height = window.innerHeight - 20
var frameRate = 1 / 30 // Seconds

/*
 * Experiment with values of mass, radius, restitution,
 * gravity (ag), and density (rho)!
 *
 * Changing the constants literally changes the environment
 * the ball is in.
 *
 * Some settings to try:
 * the moon: ag = 1.6
 * water: rho = 1000, mass 5
 * beach ball: mass 0.05, radius 30
 * lead ball: mass 10, restitution -0.05
 */
var ball = {
  position: { x: width / 2, y: 0 },
  velocity: { x: 0, y: 0 },
  mass: 2, // kg
  radius: 64, // 1px = 1cm
  restitution: -0.8
}

var Cd = 0.47  // Dimensionless
var rho = 1.22 // kg / m^3
var A = Math.PI * ball.radius * ball.radius / (10000) // m^2
var ag = 9.81  // m / s^2
// var ag = 1.6

module.exports = function loop () {
  // Do physics
  // Drag force: Fd = -1/2 * Cd * A * rho * v * v
  var Fx = -0.5 * Cd * A * rho * ball.velocity.x * ball.velocity.x * ball.velocity.x / Math.abs(ball.velocity.x)
  var Fy = -0.5 * Cd * A * rho * ball.velocity.y * ball.velocity.y * ball.velocity.y / Math.abs(ball.velocity.y)

  Fx = (isNaN(Fx) ? 0 : Fx)
  Fy = (isNaN(Fy) ? 0 : Fy)

  // Calculate acceleration ( F = ma )
  var ax = Fx / ball.mass
  var ay = ag + (Fy / ball.mass)

  // Integrate to get velocity
  ball.velocity.x += ax * frameRate
  ball.velocity.y += ay * frameRate

  // Integrate to get position
  ball.position.x += ball.velocity.x * frameRate * 100
  ball.position.y += ball.velocity.y * frameRate * 100

  // Handle collisions
  if (ball.position.y < 0) {
    ball.velocity.y *= ball.restitution
    ball.position.y = 0
    // ball.collided = true
  }
  if (ball.position.y > height - ball.radius) {
    ball.velocity.y *= ball.restitution
    ball.position.y = height - ball.radius
    // ball.collided = true
  }
  if (ball.position.x > width - ball.radius) {
    ball.velocity.x *= ball.restitution
    ball.position.x = width - ball.radius
    // ball.collided = true
  }
  if (ball.position.x < 0) {
    ball.velocity.x *= ball.restitution
    ball.position.x = 0
    // ball.collided = true
  }

  // friction?
  // if (ball.position.y === (height - ball.radius)) {
  //   if (ball.velocity.x >= 0) {
  //     ball.velocity.x += 0.05
  //     if (ball.velocity.x <= 0) {
  //       ball.velocity.x = 0
  //     }
  //   } else {
  //     ball.velocity.x -= 0.05
  //     if (ball.velocity.x >= 0) ball.velocity.x = 0
  //   }
  // }

  return ball
}

module.exports.ball = ball
