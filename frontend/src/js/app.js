import loadMode from './mode/loadMode'

// disable right click contextmenu
window.addEventListener('contextmenu', event => event.preventDefault())

window.addEventListener('load', () => {
  loadMode()
})
