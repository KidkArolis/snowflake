// http://codepen.io/OfficialAntarctica/pen/bpxgWZ

import { Component } from 'react'
import './confetti.css'

const rnd = (m, n) => Math.floor(Math.random() * (n - m + 1)) + m

const CONFETTI_COUNT = 15

class Particles extends Component {
  shouldComponentUpdate () {
    return false
  }

  render () {
    var particles = []
    for (let i = 0; i <= CONFETTI_COUNT; i++) {
      particles.push(
        <span
          key={i}
          className={'Confetti-particle Confetti-c' + rnd(1, 2)}
          style={{
            width: rnd(6, 8) + 'px',
            height: rnd(3, 4) + 'px',
            top: rnd(10, 50) + '%',
            left: rnd(0, 140) + '%',
            animationDelay: (rnd(0, 30) / 10) + 's'
          }}
        />
      )
    }
    return <div>{particles}</div>
  }
}

class Confetti extends Component {
  shouldComponentUpdate (nextProps) {
    return nextProps.label !== this.props.label
  }

  render () {
    return (
      <div className='Confetti'>
        <span className='Confetti-particles'>
          <span className='Confetti-label'>{this.props.label}</span>
          <Particles />
        </span>
      </div>
    )
  }
}

export default Confetti
