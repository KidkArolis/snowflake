const React = require('preact')

// http://codepen.io/levchenkod/pen/jEMwBb

module.exports = class Milk extends React.Component {
  shouldComponentUpdate () {
    return false
  }

  render () {
    return (
      <svg version='1.1' viewBox='0 0 100 100'>
        <g>
          <path fill="#DCDBDB" d="M48.3,4.1c-18.5,0-33.5,2.8-33.5,6.2l8.7,83.5c0,2.5,11.1,4.6,24.8,4.6s24.8-2.1,24.8-4.6l8.7-83.5C81.8,6.9,66.8,4.1,48.3,4.1z M71.9,91.9c0,2.4-10.6,4.4-23.6,4.4s-23.6-2-23.6-4.4l-8.3-79.7c0-3.3,14.3-5.9,31.9-5.9s31.9,2.7,31.9,5.9L71.9,91.9z"></path>
          <path fill="#DCDBDB" d="M48.3,32.3c-15.3,0-27.7,2.3-27.7,5.1l5.8,53c0,2.2,9.8,4.1,21.9,4.1c11.8,0,21.3-1.7,21.9-3.9l0.1,0L76,37.5c0,0,0-0.1,0-0.1C76,34.6,63.6,32.3,48.3,32.3z"></path>
          <path fill="#DCDBDB" d="M28.3,32.3c0-0.1-2.5-22.4-2.5-22.4s-2.2,0.1-3.4,0.8L25.4,33C25.4,33,26.8,32.4,28.3,32.3z"></path>
        </g>
        <g>
          <path fill="#401819" d="M90.4,96.3c2.9-2.2,1.8-9.5-2.6-16.5c-4.4-7.1-10.4-11.3-13.6-9.7l0,0l-1.4,0.9l0,0c-3,2.1-1.9,9.5,2.5,16.6c4.4,7.2,10.5,11.4,13.8,9.7l0,0L90.4,96.3L90.4,96.3z"></path>
            <ellipse transform="matrix(0.5259 0.8505 -0.8505 0.5259 109.6753 -31.7411)" fill="#DCDBDB" cx="83.3" cy="82.5" rx="15.5" ry="6.8"></ellipse>
          <path fill="#401819" d="M94.4,93.8c2.9-2.2,1.8-9.5-2.6-16.5c-4.4-7.1-10.4-11.3-13.6-9.7l0,0l-1.4,0.9l0,0c-3,2.1-1.9,9.5,2.5,16.6c4.4,7.2,10.5,11.4,13.8,9.7l0,0L94.4,93.8L94.4,93.8z"></path>
        </g>
      </svg>
    )
  }
}
