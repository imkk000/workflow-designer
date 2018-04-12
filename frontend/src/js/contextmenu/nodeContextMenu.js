import EDITOR_MODE, { setEditorMode, setPassData } from '../utility/editorMode'
import nodeDrawAreaContextMenu from './nodeDrawAreaContextMenu'

const selector = 'g.node'
const className = 'context-menu-node'

const items = {
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

function callback(key) {
  const node = d3.select(this.get(0))
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
      nodeBox.attr('stroke', 'pink')

      // NOTE: toggle context menu
      $('g.node').contextMenu(false)
      nodeDrawAreaContextMenu()
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

function show() {
  const nodeId = this.attr('id')
  const attrName = 'context-menu-node-title-content'
  const nodeTitleContent = `NODE_ID = ${nodeId}`

  // NOTE: set node context menu title before show
  $(`.${className}`).attr(attrName, nodeTitleContent)
}

export default () => {
  // NOTE: context menu on right click trigger
  $.contextMenu({
    selector,
    className,
    callback,
    items,
    events: { show },
    trigger: 'right',
  })
}
