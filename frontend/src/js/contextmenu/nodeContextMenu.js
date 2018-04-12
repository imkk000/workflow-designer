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

function contextMenuCallback(key) {
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
  const nodeContextMenuClassName = 'context-menu-node'
  // NOTE: context menu on right click trigger
  $.contextMenu({
    selector: 'g.node',
    className: nodeContextMenuClassName,
    callback: contextMenuCallback,
    items: contextMenuItem,
    trigger: 'right',
    events: {
      show() {
        const nodeId = this.attr('id')
        const attrName = 'context-menu-node-title-content'
        const nodeTitleContent = `NODE_ID = ${nodeId}`

        // NOTE: set node context menu title before show
        $(`.${nodeContextMenuClassName}`).attr(attrName, nodeTitleContent)
      },
    },
  })
}
