const React = require('preact')
const Snowflake = require('./snowflake')
const Candy = require('./candy')
const Milk = require('./milk')
const Leaves = require('./leaves')
const Sock = require('./sock')
const Confetti = require('./confetti')
const gravity = require('./gravity')
const loop = require('./loop')
require('./game.css')

const goodies = [Candy, Sock, Milk, Leaves]

// This is the fixed size of our world
// so that every game is simulated in identical conditions
// regardless of the screen size. We will then scale everything
// up or down in the render function depending on the screen res.
const BASE = {
  width: 1280,
  height: 680
}

module.exports = class Game extends React.Component {
  constructor () {
    super()
    this.state = this.initialState()
  }

  initialState () {
    return {
      t: 0,
      over: false,
      name: parse(window.localStorage.getItem('player'), { name: null }).name,
      jumps: 20,
      score: 0,
      streak: [0],
      dimensions: BASE,
      screen: computeScreenDimensions(),
      highscores: parse(window.localStorage.getItem('highscores'), []),
      scoreRecorded: false,
      ball: {
        visible: true,
        position: { x: BASE.width / 2, y: 0 },
        velocity: { x: 0, y: 0 },
        mass: 2, // kg
        radius: 64, // 1px = 1cm (?)
        restitution: -0.8
      },
      candy: {
        visible: true,
        type: random(0, 3),
        position: randomPos(BASE),
        radius: 100
      },
      confetti: {
        visible: false,
        position: { x: 0, y: 0 }
      }
    }
  }

  componentDidMount () {
    this.loop = loop({
      getState: () => this.state,
      update: (state, t, step, alpha) => this.update(state, t, step, alpha),
      render: (state, alpha) => {
        this.setState(state)
      }
    })
    document.addEventListener('keydown', key('SPACE', () => this.jump()))
    document.addEventListener('keydown', key('P', () => this.pause()))
    document.addEventListener('touchstart', () => this.jump(), false)
    document.addEventListener('click', () => this.jump(), false)
    window.addEventListener('resize', () => {
      this.setState({ screen: computeScreenDimensions() })
    })
  }

  pause () {
    this.loop.pause()
  }

  update (state, t, dt) {
    let { ball, candy, confetti, score, jumps, streak, dimensions } = state

    let nextBall = gravity(dt, ball, dimensions)

    if (overlap(nextBall, candy)) {
      confetti = this.revealConfetti(candy.position)
      candy = this.moveCandy(dimensions)
      streak[streak.length - 1] += 1
      score = score + 1
      jumps = jumps + 2 + sum(streak)

      // TODO - find a more elegant solution
      clearTimeout(this.gameOverTimeout)
    }

    return { ball: nextBall, candy, confetti, score, jumps, streak, dimensions, t }
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
      type: random(0, 3),
      position: randomPos(dimensions),
      radius: 100,
      visible: true
    }
  }

  render () {
    let { streak, ball, candy, over, score, jumps, confetti, name, t } = this.state

    let streakTotal = sum(streak)

    let { screen, dimensions } = this.state
    let icePadding = 10 * 2
    let scaleFactor
    if ((screen.width - icePadding) / (screen.height - icePadding) > dimensions.width / dimensions.height) {
      scaleFactor = (screen.height - icePadding) / dimensions.height
    } else {
      scaleFactor = (screen.width - icePadding) / dimensions.width
    }

    let scale = v => v * scaleFactor

    let stageStyle = {
      position: 'absolute',
      top: 10,
      left: 0,
      right: 0,
      bottom: 0,
      marginLeft: 'auto',
      marginRight: 'auto',
      // marginTop: 'auto',
      // marginBottom: 'auto',
      width: scale(dimensions.width),
      height: scale(dimensions.height),
      boxSizing: 'border-box'
    }

    let confettiStyle = {
      opacity: (!over && confetti.visible) ? 1 : 0,
      top: scale(confetti.position.y),
      left: scale(confetti.position.x),
      // transformOrigin: 'left top',
      // transform: `scale(${scaleFactor})`
    }

    let snowflakeStyle = {
      left: scale(ball.position.x),
      top: scale(ball.position.y),
      transformOrigin: 'left top',
      transform: `scale(${scaleFactor})`
    }

    let candyStyle = {
      width: '100px',
      opacity: (!over && candy.visible) ? 1 : 0,
      left: scale(candy.position.x),
      top: scale(candy.position.y),
      transformOrigin: 'left top',
      transform: `scale(${scaleFactor})`
    }

    let Goody = goodies[candy.type]

    return (
      <div className='Game' style={stageStyle}>
        <div className='Score'>
          Score: <span className='b'>{score}</span><span> | </span>
          Jumps: <span className='b'>{jumps}</span>
        </div>

        { over ? this.renderGameOver() : null }

        <div className='Name'>
          <input
            className='Name-input'
            type='text'
            placeholder='Highscore name'
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
          <Goody />
        </div>
      </div>
    )
  }

  renderGameOver () {
    let { highscores } = this.state

    return (
      <div className='GameOver'>
        <div className='GameOver-inner'>
          <div className='GameOver-label'>
            GAME OVER
          </div>
          <div className='Highscore'>
            {highscores.map((h, i) => {
              return (
                <div key={i}>{h.name} - {h.score}</div>
              )
            })}
          </div>
        </div>
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
    left: box.position.x + box.radius / 5,
    right: box.position.x + box.radius - box.radius / 5,
    top: box.position.y + box.radius / 5,
    bottom: box.position.y + box.radius - box.radius / 5
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

function computeScreenDimensions () {
  return {
    width: window.innerWidth,
    height: window.innerHeight
  }
}

function key (keyName, fn) {
  let keys = {
    'SPACE': 32,
    'P': 80
  }
  return function onSpaceKey (event) {
    if (event.keyCode === keys[keyName]) {
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
  return min + Math.floor(Math.random() * (max - min + 1))
}

function randomPos (dim) {
  return { x: random(0, dim.width - 100), y: random(0, dim.height - 100) }
}

function sum (list) {
  return list.reduce((total, v) => total + v, 0)
}
