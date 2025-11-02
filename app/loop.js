// http://codeincomplete.com/posts/javascript-game-foundations-the-game-loop/
// Currently using Semi-fixed timestep from http://gafferongames.com/game-physics/fix-your-timestep/

const raf = window.requestAnimationFrame

export default function loop (options = {}) {
  let { getState, update, render } = options

  let paused = false
  let t = 0
  let now
  let acc = 0
  let last = timestamp()
  // slow > 1 currently doesn't work since we use the remainder acc to smooth the animation
  let slow = options.slow || 0.6 // 0.5 gives the game a faster, better feel
  let step = 1 / 60 // dt, fixed delta time
  let slowStep = slow * step

  function frame () {
    let state = getState()

    now = timestamp()
    let frameTime = Math.min(1, (now - last) / 1000)
    last = now

    // TODO - for now, just rely on raf - it's smoother without interpolation
    acc = acc + frameTime
    let i = 0
    while (acc > slowStep) {
      acc -= slowStep
      t += step
      i++
      state = update(state, t, step)
    }

    // leftover
    if (acc > 0) {
      state = update(state, t, step)
      t += acc
      acc = 0
    }

    // TODO - figure out how to incorporate interpolation
    // We can set slow to smth like 5, which slows down the game
    // 5 times, e.g. 1 second of gameplay happens over 5 seconds of real
    // time. But in this case, the rendering becomes janky, since we only
    // advance the state of the world every step * 5 s. What we need to do
    // is somehow interpolate the position of the snowflake based on previous
    // position, next position and current time, or alpha = acc / slow.
    // This is not essential to the game, but it's a fun thing to explore since
    // it breaks the React paradigm somewhat in that I don't have prev/next state
    // handily available for interpolation in a way that doesn't affect the physics
    // engine in gravity.js.
    // let alpha = acc / slow

    // console.log('Updating with', frameTime * slow)
    // state = update(state, t, frameTime * slow) // this is bypassing the update cycle above
    render(state)

    if (!paused) {
      raf(frame)
    }
  }

  raf(frame)

  return {
    pause: () => {
      paused = !paused
      if (!paused) {
        last = timestamp()
        frame()
      }
    }
  }
}

function timestamp () {
  return window.performance && window.performance.now ? window.performance.now() : new Date().getTime()
}
