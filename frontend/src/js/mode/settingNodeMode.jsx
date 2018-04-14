import dom from 'jsx-render'
import { showDialog, errorDialog } from '../editor/dialog'
import { getPassDataBeforeClear } from '../utility/editorMode'

export default () => {
  const { nodeId, node } = getPassDataBeforeClear()

  const settingType = {
    custom: true,
    id: 'setting-dialog',
    title: `Node Setting: id = ${nodeId}`,
    buttons: [
      {
        text: 'Cancel',
        click() {
          $(this).dialog('close')
        },
      },
    ],
  }

  const content = (
    <div id={settingType.id}>
      <form method="post">
        <fieldset>
          <label for="upload-file">Upload Image:</label>
          <input type="file" name="upload-file" class="upload-file ui-widget-content ui-corner-all" />
        </fieldset>
      </form>
    </div>
  )
  showDialog(settingType, content)
  $('input[name=upload-file]').dmUploader({
    // DEBUG: url upload file server
    url: '//127.0.0.1:9999/upload',
    multiple: false,
    // NOTE: file size limit 10 mib
    maxFileSize: 10485760,
    allowedTypes: 'image/*',
    extFilter: ['jpg', 'jpeg', 'png'],
    onInit() {
      console.log('Callback: Plugin initialized')
    },
    onUploadError(id, xhr, status, errorThrown) {
      // errorDialog(status)
      console.log(status, errorThrown)
    },
    onUploadSuccess(id, data) {
      console.log(data)
    },
  })
}
