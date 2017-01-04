// http://codeincomplete.com/posts/javascript-game-foundations-the-game-loop/
// Not sure yet how update/render map to React paradigm

const { FPS } = require('./constants')
const requestAnimationFrame = window.requestAnimationFrame

// TODO - figure what this is for :)
// Figure out how to use update/render and what the params mean
// and how to use the slow motion mode option and how to integrate
// correctly with the gravity module.

module.exports = function (update, options = {}) {
  let now
  let dt = 0
  let last = timestamp()
  let slow = options.slow || 1
  let step = 1 / FPS
  let slowStep = slow * step

  function frame () {
    now = timestamp()
    dt = dt + Math.min(1, (now - last) / 1000)
    while (dt > slowStep) {
      dt = dt - slowStep
      update(step) // vs render (?)
    }
    // render(dt / slow)
    last = now
    requestAnimationFrame(frame, options.canvas)
  }

  requestAnimationFrame(frame)
}

function timestamp () {
  return window.performance && window.performance.now ? window.performance.now() : new Date().getTime()
}
