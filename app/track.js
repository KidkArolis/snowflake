const track = {
  jump () {
    window.ga('send', {
      hitType: 'event',
      eventCategory: 'Game',
      eventAction: 'jump'
    })
  },
  score (name, score) {
    window.ga('send', {
      hitType: 'event',
      eventCategory: 'Game',
      eventAction: 'highscore',
      eventLabel: name || 'Anonymous',
      eventValue: score
    })
  }
}

export default track
