const Game = require('./app')
const React = require('preact')
// const ReactDOM = require('react-dom')
const root = document.querySelector('#root')

React.render(<Game />, root)
