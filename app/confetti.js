module.exports = function confetti () {
  let el = document.querySelector('.particletext.confetti')
  let confetticount = (el.getBoundingClientRect().width / 50) * 10
  for (let i = 0; i <= confetticount; i++) {
    let particle = document.createElement('span')
    particle.className = 'particle c' + rnd(1, 2)
    particle.style.width = rnd(6, 8) + 'px'
    particle.style.height = rnd(3, 4) + 'px'
    particle.style.top = rnd(10, 50) + '%'
    particle.style.left = rnd(0, 100) + '%'
    particle.style['animation-delay'] = (rnd(0, 30) / 10) + 's'
    el.appendChild(particle)

    // el.appendElement('<span class="particle c' +
    //   rnd(1, 2) + '" style="top:' + rnd(10, 50) + '%; left:' +
    //   rnd(0, 100) + '%;width:' + rnd(6, 8) + 'px; height:' +
    //   rnd(3, 4) + 'px;animation-delay: ' + (rnd(0, 30) / 10) + 's;"></span>')
  }
}

function rnd (m, n) {
  m = parseInt(m)
  n = parseInt(n)
  return Math.floor(Math.random() * (n - m + 1)) + m
}
