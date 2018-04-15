import { isAddLineMode } from '../utility/editorMode'
import { quitAddLineMode } from '../mode/addLineMode'
import { setContextMenuTitle } from './contextMenuTitle'

const selector = '#diagram-drawing'
const className = 'context-menu-add-line'

export const destroyNodeDrawAreaContextMenu = () => {
  $.contextMenu('destroy', selector)
}

const items = {
  CANCEL: {
    name: 'Exit Mode',
    icon: 'fa-close',
  },
}

function callback() {
  if (isAddLineMode()) quitAddLineMode()

  destroyNodeDrawAreaContextMenu()
}

const show = () => {
  // NOTE: set title before context menu show
  setContextMenuTitle('EDITOR_MODE = ADD_LINE')
}

export default () => {
  $.contextMenu({
    selector,
    className,
    callback,
    items,
    events: { show },
    trigger: 'right',
  })
}
