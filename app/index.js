const React = require('preact')
const Snowflake = require('./snowflake')
const Candy = require('./candy')
const Confetti = require('./confetti')
const gravity = require('./gravity')
const loop = require('./loop')
require('./game.css')

const ICE_PADDING = 20
// const BASE_WIDTH = 1000
// const BASE_HEIGHT = 800

module.exports = class Game extends React.Component {
  constructor () {
    super()
    this.state = this.initialState()
  }

  initialState () {
    let dimensions = computeDimensions()
    return {
      over: false,
      name: parse(window.localStorage.getItem('player'), { name: null }).name,
      jumps: 20,
      score: 0,
      streak: [0],
      dimensions: dimensions,
      highscores: parse(window.localStorage.getItem('highscores'), []),
      scoreRecorded: false,
      ball: {
        visible: true,
        position: { x: dimensions.width / 2, y: 0 },
        velocity: { x: 0, y: 0 },
        mass: 2, // kg
        radius: 64, // 1px = 1cm (?)
        restitution: -0.8
      },
      candy: {
        visible: true,
        position: randomPos(dimensions),
        radius: 100
      },
      confetti: {
        visible: false,
        position: { x: 0, y: 0 }
      }
    }
  }

  componentDidMount () {
    loop(() => this.update())
    document.addEventListener('keydown', space(() => this.jump()))
    document.addEventListener('touchstart', () => this.jump(), false)
    window.addEventListener('resize', () => {
      this.setState({ dimensions: computeDimensions() })
    })
  }

  update () {
    let { ball, candy, confetti, score, jumps, streak, dimensions } = this.state

    let nextBall = gravity(ball, dimensions)

    if (overlap(nextBall, candy)) {
      confetti = this.revealConfetti(candy.position)
      candy = this.moveCandy(dimensions)
      streak[streak.length - 1] += 1
      score = score + 1
      jumps = jumps + 2 + sum(streak)

      // TODO - find a more elegant solution
      clearTimeout(this.gameOverTimeout)
    }

    this.setState({ ball: nextBall, candy, confetti, score, jumps, streak })
  }

  jump () {
    let { ball, over, jumps, streak } = this.state

    // game is in over state, restart the game upon hitting space
    if (over) {
      this.setState(this.initialState())
      return
    }

    // if no jumps are left, stop doing stuff
    if (jumps <= 0) {
      return
    }

    ball.velocity.y = -20
    ball.velocity.x = (Math.random() > 0.5 ? 1 : -1) * Math.random() * 20

    if (streak[streak.length - 1] === 0) {
      streak = [0]
    } else {
      streak.push(0)
    }

    if (jumps === 1) {
      // TODO clear if score goes up
      this.gameOverTimeout = setTimeout(() => {
        let { jumps } = this.state
        if (jumps > 0) {
          return
        }
        this.gameOver()
      }, 3000)
    }

    this.setState({
      ball: ball,
      jumps: this.state.jumps - 1,
      streak: streak
    })
  }

  gameOver () {
    let { name, score, highscores, scoreRecorded } = this.state

    if (name && score > 0 && !scoreRecorded) {
      highscores.push({ name, score })
      highscores.sort((a, b) => b.score - a.score)
      highscores = highscores.slice(0, 10)
      window.localStorage.setItem('highscores', JSON.stringify(highscores))
    }

    this.setState({ over: true, highscores, scoreRecorded: true })
  }

  // TODO, find a more elegant way
  revealConfetti (pos) {
    setTimeout(() => {
      let confetti = this.state.confetti
      confetti.visible = false
      this.setState({ confetti })
    }, 3000)

    return {
      visible: true,
      position: { x: pos.x, y: pos.y }
    }
  }

  moveCandy (dimensions) {
    return {
      position: randomPos(dimensions),
      radius: 100,
      visible: true
    }
  }

  render () {
    let { streak, ball, candy, over, score, jumps, confetti, name } = this.state

    let streakTotal = sum(streak)

    let confettiStyle = {
      opacity: (!over && confetti.visible) ? 1 : 0,
      top: confetti.position.y + 'px',
      left: confetti.position.x + 'px'
    }

    let snowflakeStyle = {
      left: ball.position.x,
      top: ball.position.y + 'px'
    }

    let candyStyle = {
      width: '100px',
      opacity: (!over && candy.visible) ? 1 : 0,
      left: candy.position.x,
      top: candy.position.y + 'px'
    }

    return (
      <div className='Game'>
        <div className='Score'>
          Score: <span className='b'>{score}</span><span> | </span>
          Jumps: <span className='b'>{jumps}</span>
        </div>

        { over ? this.renderGameOver() : null }
        { over ? this.renderHighscore() : null }

        <div className='Name'>
          <input
            className='Name-input'
            type='text'
            placeholder='Your name'
            value={name || ''}
            onInput={e => this.setName(e.target.value)} />
        </div>

        <div className='ConfettiContainer' style={confettiStyle}>
          <Confetti label={streakTotal > 1 ? ('+' + streakTotal) : ''} />
        </div>

        <div className='SnowflakeContainer' style={snowflakeStyle}>
          <Snowflake />
        </div>

        <div className='CandyContainer' style={candyStyle}>
          <Candy />
        </div>
      </div>
    )
  }

  renderGameOver () {
    return (
      <div style={{
        position: 'absolute',
        fontFamily: 'Helvetica',
        fontSize: '48px',
        fontWeight: 'bold',
        top: '200px',
        left: '200px'
      }}>GAME OVER</div>
    )
  }

  renderHighscore () {
    let { highscores } = this.state
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

  setName (name) {
    this.setState({ name })
    window.localStorage.setItem('player', JSON.stringify({ name }))
  }
}

function overlap (b1, b2) {
  if (!b1.visible || !b2.visible) return false

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

function computeDimensions () {
  return {
    width: window.innerWidth - ICE_PADDING,
    height: window.innerHeight - ICE_PADDING
  }
}

function space (fn) {
  return function onSpaceKey (event) {
    if (event.keyCode === 32) {
      fn(event)
    }
  }
}

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

function randomPos (dim) {
  return { x: random(0, dim.width - 100), y: random(0, dim.height - 100) }
}

function sum (list) {
  return list.reduce((total, v) => total + v, 0)
}
