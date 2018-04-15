import dom from 'jsx-render'
import { showDialog, errorDialog } from '../../editor/dialog'
import EDITOR_MODE, { setEditorMode, getDataFromGlobal, getPassDataBeforeClear } from '../../utility/editorMode'

let nodes = null

const quitSettingNodeMode = () => {
  setEditorMode(EDITOR_MODE.NORMAL)
}

export default validator => {
  nodes = getDataFromGlobal('NODES')

  const { nodeId } = getPassDataBeforeClear()
  const { settings } = nodes[nodeId]
  const dialogId = 'setting-dialog'
  const title = `Setting Node id ${nodeId}`
  const buttons = {
    OK() {},
    Cancel() {
      quitSettingNodeMode()
      $(this).dialog('close')
    },
  }

  Object.keys(settings).map(key => {
    settings[key] = {
      ...settings[key],
      ...validator[key],
    }
    return true
  })

  const buildContent = Object.keys(settings).map(key => {
    const { value, label } = settings[key]
    return (
      <div>
        <label for={key}>{label}:</label>
        <input type="text" name={key} class="text ui-widget-content ui-corner-all" value={value} />
      </div>
    )
  })

  const content = (
    <div id={dialogId}>
      <form>
        <fieldset>{buildContent}</fieldset>
      </form>
    </div>
  )
  showDialog({
    custom: true,
    id: dialogId,
    title,
    buttons,
    content,
  })
}
