import EDITOR_MODE, { setEditorMode, setPassData } from '../utility/editorMode'

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

  switch (key) {
    case 'ADD_LINE':
      setEditorMode(EDITOR_MODE.ADD_LINE)
      nodeBox.attr('stroke', 'yellow')
      setPassData({ beginId: node.attr('id'), node })
      break
    case 'SETTING':
      setEditorMode(EDITOR_MODE.SETTING)

      break
    default:
  }
}

export default () => {
  $.contextMenu({
    selector: 'g.node',
    trigger: 'right',
    callback: contextMenuCallback,
    items: contextMenuItem,
  })
}
