import EDITOR_MODE, { setEditorMode, setPassData } from '../utility/editorMode'
import nodeDrawAreaContextMenu from './nodeDrawAreaContextMenu'
import { setContextMenuTitle } from './contextMenuTitle'
import deleteNodeMode from '../mode/deleteNodeMode'
import settingNodeMode from '../mode/settingNodeMode'

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
  const nodeId = node.attr('id')

  if (key === EDITOR_MODE.ADD_LINE) {
    setEditorMode(EDITOR_MODE.ADD_LINE)

    // NOTE: set all nodes before add line
    d3.selectAll('g.node').style('cursor', 'pointer')

    // NOTE: when active box
    setPassData({
      node,
      beginId: nodeId,
      defaultStroke: nodeBox.attr('stroke'),
    })
    nodeBox.attr('stroke', 'pink')

    // NOTE: toggle context menu
    $('g.node').contextMenu(false)
    nodeDrawAreaContextMenu()
  } else if (key === EDITOR_MODE.SETTING) {
    setEditorMode(EDITOR_MODE.SETTING)
    setPassData({
      nodeId,
      node,
    })
    settingNodeMode()
  } else if (key === EDITOR_MODE.DELETE_NODE) {
    setEditorMode(EDITOR_MODE.DELETE_NODE)
    setPassData({
      nodeId,
      node,
    })
    deleteNodeMode()
  }
}

function show() {
  const nodeId = this.attr('id')
  const nodeTitleContent = `ID = ${nodeId}`

  // NOTE: set node context menu title before show
  setContextMenuTitle(nodeTitleContent)
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
