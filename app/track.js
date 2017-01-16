module.exports = {
  jump: function () {
    window.ga('send', {
      hitType: 'event',
      eventCategory: 'Game',
      eventAction: 'jump'
    })
  },
  score: function (name, score) {
    window.ga('send', {
      hitType: 'event',
      eventCategory: 'Game',
      eventAction: 'highscore',
      eventLabel: name || 'Anonymous',
      eventValue: score
    })
  }
}
