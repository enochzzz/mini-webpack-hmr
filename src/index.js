const root = document.getElementById('app')
function render () {
  root.innerHTML = require('./content.js')
}
render()

if (module.hot) {
  module.hot.accept(['./content.js'], () => {
    render()
  })
}
