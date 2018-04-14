import dom from 'jsx-render'
import { showDialog } from '../editor/dialog'
import { getPassDataBeforeClear } from '../utility/editorMode'

export default () => {
  const { nodeId, node } = getPassDataBeforeClear()

  const settingType = {
    custom: true,
    id: 'setting-dialog',
    title: `Node Setting: id = ${nodeId}`,
    button: [],
  }

  const content = (
    <div id={settingType.id}>
      <form>
        <fieldset>
          <label for="name">Upload Image:</label>
          <input type="file" name="upload-file" class="upload-file ui-widget-content ui-corner-all" />
          {/* <input type="submit" tabindex="-1" style="position:absolute; top:-1000px" /> */}
        </fieldset>
      </form>
    </div>
  )
  showDialog(settingType, content)
}
