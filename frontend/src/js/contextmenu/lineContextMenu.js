import EDITOR_MODE, { setEditorMode, setPassData } from '../utility/editorMode'
import { setContextMenuTitle } from './contextMenuTitle'
import deleteLineMode from '../mode/deleteLineMode'

const selector = 'g.line'
const className = 'context-menu-line'

const items = {
  DELETE_LINE: {
    name: 'Delete',
    icon: 'fa-trash',
  },
  SEP1: '---------',
  CANCEL: {
    name: 'Cancel',
    icon: 'fa-close',
  },
}

function callback(key) {
  const line = d3.select(this.get(0))
  const lineId = line.attr('id')

  if (key === EDITOR_MODE.DELETE_LINE) {
    setEditorMode(EDITOR_MODE.DELETE_LINE)
    setPassData({
      line,
      lineId,
    })
    deleteLineMode()
  }
}

function show() {
  const lineId = this.attr('id')
  const lineTitleContent = `LINE_ID = ${lineId}`

  // NOTE: set line context menu title before show
  setContextMenuTitle(lineTitleContent)
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
