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

const Cd = 0.47  // Dimensionless
const rho = 1.22 // kg / m^3
const ag = 9.81  // m / s^2

module.exports = function gravity (dt, ball, dim, alpha = 1) {
  let A = Math.PI * ball.radius * ball.radius / (10000) // m^2

  // Do physics
  // Drag force: Fd = -1/2 * Cd * A * rho * v * v
  let Fx = -0.5 * Cd * A * rho * ball.velocity.x * ball.velocity.x * ball.velocity.x / Math.abs(ball.velocity.x)
  let Fy = -0.5 * Cd * A * rho * ball.velocity.y * ball.velocity.y * ball.velocity.y / Math.abs(ball.velocity.y)

  Fx = (isNaN(Fx) ? 0 : Fx)
  Fy = (isNaN(Fy) ? 0 : Fy)

  // Calculate acceleration ( F = ma )
  let ax = Fx / ball.mass
  let ay = ag + (Fy / ball.mass)

  // Integrate to get velocity
  ball.velocity.x += ax * dt
  ball.velocity.y += ay * dt

  // Integrate to get position
  ball.position.x += ball.velocity.x * dt * 100
  ball.position.y += ball.velocity.y * dt * 100

  // Handle collisions
  if (ball.position.y < 0) {
    ball.velocity.y *= ball.restitution
    ball.position.y = 0
  }
  if (ball.position.y > dim.height - ball.radius) {
    ball.velocity.y *= ball.restitution
    ball.position.y = dim.height - ball.radius
  }
  if (ball.position.x > dim.width - ball.radius) {
    ball.velocity.x *= ball.restitution
    ball.position.x = dim.width - ball.radius
  }
  if (ball.position.x < 0) {
    ball.velocity.x *= ball.restitution
    ball.position.x = 0
  }

  return ball
}
