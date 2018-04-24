import dom from 'jsx-render'
import { showDialog, confirmDialog } from '../../editor/dialog'
import EDITOR_MODE, { setEditorMode, getDataFromGlobal, getPassDataBeforeClear } from '../../utility/editorMode'
import updateNodeLabel from '../../editor/updateNodeLabel'

let settingsKeysToArray = null
let settingsValuesToArray = null
let nodes = null

const quitSettingNodeMode = () => {
  settingsKeysToArray = null
  settingsValuesToArray = null
  setEditorMode(EDITOR_MODE.NORMAL)
}

export default () => {
  nodes = getDataFromGlobal('NODES')

  const { nodeId } = getPassDataBeforeClear()
  const { settings } = nodes[nodeId]

  const dialogId = 'setting-dialog'
  const title = `Setting Node id ${nodeId}`
  const buttons = {
    'Reset to Default': function() {
      confirmDialog('Do you want to continue?', () => {
        // set values
        settingsValuesToArray.forEach((setting, index) => {
          const key = settingsKeysToArray[index]
          const { defaultValue } = settingsValuesToArray[index]
          $(`input[name=${key}]`).val(defaultValue)
        })

        $('#confirm-dialog').dialog('close')
      })
    },
    OK() {
      confirmDialog('Do you want to continue?', () => {
        // set values
        settingsValuesToArray.forEach((setting, index) => {
          const key = settingsKeysToArray[index]
          const valueString = $(`input[name=${key}]`).val()
          setting.value = valueString
        })

        updateNodeLabel(nodeId)
        quitSettingNodeMode()
        $('#confirm-dialog').dialog('close')
        $(this).dialog('close')
      })
    },
    Cancel() {
      quitSettingNodeMode()
      $(this).dialog('close')
    },
  }

  const buildContent = Object.keys(settings).map(key => {
    const { value } = settings[key]
    return (
      <div>
        <label for={key}>{key}:</label>
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

  settingsKeysToArray = Object.keys(settings)
  settingsValuesToArray = Object.values(settings)
}
