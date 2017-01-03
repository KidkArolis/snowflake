require('./game.css')
require('./confetti.css')

require('fpsmeter')
const React = require('react')
const Snowflake = require('./snowflake')
const gravity = require('./gravity')
const Candy = require('./candy')

const FPSMeter = window.FPSMeter
const requestAnimationFrame = window.requestAnimationFrame

var width = window.innerWidth - 20
var height = window.innerHeight - 20

function parse (str, fallback) {
  try {
    return JSON.parse(str) || fallback
  } catch (err) {
    return fallback
  }
}

function random (min, max) {
  return (min + (Math.random() * (max - min)))
}

function randomPos () {
  return { x: random(0, width - 100), y: random(0, height - 100) }
}

let CHEAT = false

function overlap (b1, b2) {
  let s = box => ({
    left: box.position.x + box.radius / 4,
    right: box.position.x + box.radius - box.radius / 4,
    top: box.position.y + box.radius / 4,
    bottom: box.position.y + box.radius - box.radius / 4
  })
  let box1 = s(b1)
  let box2 = s(b2)
  return !(
    (box1.right < box2.left) ||
    (box1.left > box2.right) ||
    (box1.top > box2.bottom) ||
    (box1.bottom < box2.top)
  )
}

module.exports = React.createClass({
  getInitialState () {
    return {
      over: false,
      name: parse(window.localStorage.getItem('player'), { name: 'Snowflake' }).name,
      time: 0,
      jumps: 20,
      score: 0,
      streak: [0],
      ball: gravity(),
      highscores: parse(window.localStorage.getItem('highscores'), []),
      candy: {
        position: randomPos(),
        radius: 100,
        visible: true
      },
      confetti: {
        visible: false,
        position: {
          x: 0,
          y: 0
        }
      }
    }
  },

  componentDidMount () {
    let self = this

    require('./confetti')()

    let options = {
      fps: 30,
      render: time => {
        let ball = gravity()

        let { score, jumps, streak, confetti } = this.state

        let candy = self.state.candy
        if (overlap(ball, candy) || CHEAT) {
          CHEAT = false
          confetti.visible = true
          confetti.position = {
            x: candy.position.x,
            y: candy.position.y
          }
          setTimeout(() => {
            confetti.visible = false
          }, 3000)
          candy = {
            position: randomPos(),
            radius: 100,
            visible: true
          }

          streak[streak.length - 1] += 1

          score = score + 1
          jumps = jumps + 2 + streak.reduce((total, v) => total + v, 0)
        }

        self.setState({
          time: time,
          ball: ball,
          candy: candy,
          score: score,
          jumps: jumps,
          streak
        })
      }
    }

    let now
    let dt = 0
    let last = timestamp()
    let slow = options.slow || 1
    let step = 1 / options.fps
    let slowStep = slow * step
    // let update = options.update
    let render = options.render
    // let fpsmeter = new FPSMeter(document.getElementById('fps'), { decimals: 0, graph: true, theme: 'dark' })

    function frame () {
      // fpsmeter.tickStart()
      now = timestamp()
      dt = dt + Math.min(1, (now - last) / 1000)
      // while (dt > slowStep) {
      //   dt = dt - slowStep
        // update(step)
      // }
      render(dt / slow)
      last = now
      // fpsmeter.tick()
      requestAnimationFrame(frame, options.canvas)
    }

    requestAnimationFrame(frame)

    // KEYS
    const press = event => {
      if (event.keyCode === 32 && this.state.over) {
        this.setState(this.getInitialState())
      }

      if (event.keyCode === 32 && this.state.jumps > 0) {
        gravity.ball.velocity.y = -20
        gravity.ball.velocity.x = (Math.random() > 0.5 ? 1 : -1) * Math.random() * 20

        let streak = this.state.streak
        if (streak[streak.length - 1] === 0) {
          streak = [0]
        } else {
          streak.push(0)
        }

        if (this.state.jumps === 1) {
          // TODO clear if score goes up
          setTimeout(() => {
            if (this.state.jumps > 0) {
              return
            }

            highscores.push({
              name: this.state.name,
              score: this.state.score
            })
            highscores.sort(function (a, b) {
              return b.score - a.score
            })
            highscores = highscores.slice(0, 10)
            window.localStorage.setItem('highscores', JSON.stringify(highscores))
            this.setState({
              over: true,
              highscores: highscores
            })
          }, 3000)
        }
        let highscores = this.state.highscores

        this.setState({
          jumps: this.state.jumps - 1,
          streak: streak,
          highscores: highscores
        })
      }

      if (event.keyCode === 13) {
        CHEAT = true
      }
    }
    document.addEventListener('keydown', press)

    // setInterval(function () {
    //   if (Math.random() < 0.5) {
    //     press({ keyCode: 32 })
    //   }
    // }, 1000)
  },

  render () {
    let { streak, ball, candy, over, score, jumps, confetti, highscores, name } = this.state

    let renderGameOver = () => (
      <div style={{
        position: 'absolute',
        fontFamily: 'Helvetica',
        fontSize: '48px',
        fontWeight: 'bold',
        top: '200px',
        left: '200px'
      }}>GAME OVER</div>
    )

    let streakTotal = streak.reduce((total, v) => total + v, 0)

    let confettiStyle = {
      opacity: (!over && confetti.visible) ? 1 : 0,
      top: confetti.position.y + 'px',
      left: confetti.position.x + 'px'
    }

    let renderHighscore = () => {
      return (
        <div className='highscore'>
          {highscores.map((h, i) => {
            return (
              <div key={i}>{h.name} - {h.score}</div>
            )
          })}
        </div>
      )
    }

    const setName = name => {
      this.setState({ name })
      window.localStorage.setItem('player', JSON.stringify({ name }))
    }

    return (
      <div className='Game'>
        <div style={{ position: 'absolute', fontSize: '20px' }}>
          Score: <span className='b'>{score}</span><span> | </span>
          Jumps: <span className='b'>{jumps}</span>
        </div>
        { over ? renderGameOver() : null }
        { over ? renderHighscore() : null }

        <div className='name'>
          <input type='text' value={name} onChange={e => setName(e.target.value)} />
        </div>

        <div className='textcontainer' style={confettiStyle}>
          <span className='particletext confetti'>
            <span className='label'>{streakTotal > 1 ? ('+' + streakTotal) : ''}</span>
          </span>
        </div>

        <div style={{ position: 'absolute', left: ball.position.x, top: ball.position.y + 'px' }}>
          <Snowflake />
        </div>
        <div style={{
          position: 'absolute',
          width: '100px',
          display: (!over && candy.visible) ? 'block' : 'none',
          left: candy.position.x,
          top: candy.position.y + 'px'
        }}>
          <Candy />
        </div>
      </div>
    )
  }
})

function timestamp () {
  return window.performance && window.performance.now ? window.performance.now() : new Date().getTime()
}
