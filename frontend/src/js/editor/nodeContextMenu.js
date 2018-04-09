import EDITOR_MODE, { setEditorMode, setPassData } from '../utility/editorMode'

const contextMenuItem = {
  ADD_LINE: {
    name: 'Add Line',
    icon: 'fa-plus-circle',
  },
  SEP1: '---------',
  SETTING: {
    name: 'Setting',
    icon: 'fa-edit',
  },
  SEP2: '---------',
  DELETE_NODE: {
    name: 'Delete',
    icon: 'fa-trash',
  },
  CANCEL: {
    name: 'Cancel',
    icon: 'fa-close',
  },
}

const contextMenuCallback = (key, { $trigger }) => {
  const node = d3.select($trigger.get(0))
  const nodeBox = node.select('.node-box')

  switch (key) {
    case 'ADD_LINE':
      setEditorMode(EDITOR_MODE.ADD_LINE)
      // NOTE: when active box
      setPassData({
        node,
        beginId: node.attr('id'),
        defaultStroke: nodeBox.attr('stroke'),
      })
      nodeBox.attr('stroke', 'purple')
      $('g.node').contextMenu(false)
      break
    case 'SETTING':
      setEditorMode(EDITOR_MODE.SETTING)

      break
    case 'DELETE_NODE':
      setEditorMode(EDITOR_MODE.DELETE_NODE)

      break
    default:
  }
}

export default () => {
  const nodeContextMenuOptions = {
    selector: 'g.node',
    callback: contextMenuCallback,
    items: contextMenuItem,
  }

  // NOTE: context menu on right click trigger
  $.contextMenu({
    trigger: 'right',
    ...nodeContextMenuOptions,
  })
}
