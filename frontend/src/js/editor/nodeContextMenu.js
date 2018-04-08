const contextMenuItem = {
  ADD_LINE: {
    name: 'Add Line',
    icon: 'fa-plus-circle',
  },
  SETTING: {
    name: 'Setting',
    icon: 'fa-edit',
  },
  SEP: '---------',
  CLOSE: {
    name: 'Close',
    icon: 'fa-close',
  },
}

const contextMenuCallback = (key, { $trigger }) => {
  const node = d3.select($trigger.get(0))
  const nodeBox = node.select('.node-box')

  window.EDITOR_MODE = key

  switch (key) {
    case 'ADD_LINE':
      nodeBox.attr('stroke', 'yellow')
      break
    case 'SETTING':
      break
    default:
  }
  console.log(window.EDITOR_MODE)
}

export default () => {
  $.contextMenu({
    selector: 'g.node',
    trigger: 'right',
    callback: contextMenuCallback,
    items: contextMenuItem,
  })
}
