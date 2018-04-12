import { isAddLineMode } from '../utility/editorMode'
import { quitAddLineMode } from '../mode/addLineMode'

const selector = '.diagram-drawing'
const className = 'context-menu-add-line'

export const destroyNodeDrawAreaContextMenu = () => {
  $.contextMenu('destroy', selector)
}

const items = {
  CANCEL: {
    name: 'Exit ADD_LINE Mode',
    icon: 'fa-close',
  },
}

function callback() {
  if (isAddLineMode()) quitAddLineMode()

  destroyNodeDrawAreaContextMenu()
}

export default () => {
  $.contextMenu({
    selector,
    className,
    callback,
    items,
    trigger: 'right',
  })
}
