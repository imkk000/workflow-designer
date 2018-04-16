import dom from 'jsx-render'
import { showDialog, confirmDialog } from '../../editor/dialog'
import EDITOR_MODE, { setEditorMode, getDataFromGlobal, getPassDataBeforeClear } from '../../utility/editorMode'

let settingsKeysToArray = null
let settingsValuesToArray = null
let nodes = null

const quitSettingNodeMode = () => {
  settingsKeysToArray = null
  settingsValuesToArray = null
  setEditorMode(EDITOR_MODE.NORMAL)
}

export default validator => {
  nodes = getDataFromGlobal('NODES')

  const { nodeId } = getPassDataBeforeClear()
  const { settings } = nodes[nodeId]

  const dialogId = 'setting-dialog'
  const title = `Setting Node id ${nodeId}`
  const checkOk = () => {
    const valid = settingsKeysToArray.map(key => {
      const { validator: validateInput } = settings[key]
      const valueString = $(`input[name=${key}]`).val()
      return validateInput(valueString)
    })
    const errorDialogContent = valid.map((validResult, index) => {
      if (!validResult) {
        const key = settingsKeysToArray[index]
        const { value, errorText } = settingsValuesToArray[index]
        $(`input[name=${key}]`).val(value)

        return <p>- {errorText}</p>
      }
      return false
    })
    const validCount = errorDialogContent.reduce((sum, current) => sum + (current !== false))

    if (validCount) {
      const id = 'error-dialog'
      const buttons = {
        Close() {
          $(this).dialog('close')
        },
      }
      const content = <div id={id}>{errorDialogContent}</div>

      showDialog({
        custom: true,
        id,
        title: 'Error Dialog',
        buttons,
        content,
      })
      return false
    }

    return true
  }

  const buttons = {
    'Reset to Default': function() {
      confirmDialog('Do you want to continue?', () => {
        // NOTE: set values
        settingsValuesToArray.forEach((setting, index) => {
          const key = settingsKeysToArray[index]
          const { defaultValue } = settingsValuesToArray[index]
          $(`input[name=${key}]`).val(defaultValue)
        })

        $('#confirm-dialog').dialog('close')
      })
    },
    OK() {
      if (checkOk()) {
        confirmDialog('Do you want to continue?', () => {
          // NOTE: set values
          settingsValuesToArray.forEach((setting, index) => {
            const key = settingsKeysToArray[index]
            const valueString = $(`input[name=${key}]`).val()
            const value = parseInt(valueString, 10)
            setting.value = value
          })

          quitSettingNodeMode()
          $('#confirm-dialog').dialog('close')
          $(this).dialog('close')
        })
      }
    },
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

  settingsKeysToArray = Object.keys(settings)
  settingsValuesToArray = Object.values(settings)
}
