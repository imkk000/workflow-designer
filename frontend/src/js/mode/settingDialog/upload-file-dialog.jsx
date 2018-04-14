import dom from 'jsx-render'
import { isEmpty } from 'validator'
import { showDialog, errorDialog, confirmDialog } from '../../editor/dialog'
import { getPassDataBeforeClear, getDataFromGlobal } from '../../utility/editorMode'

let uploadId = null
let nodes = null

const startUploadFile = () => {
  if (uploadId) {
    $('input[name=file]').dmUploader('start', uploadId)
  }
}

export default () => {
  nodes = getDataFromGlobal('NODES')

  const { nodeId } = getPassDataBeforeClear()
  const {
    files: { fileId, fileName },
  } = nodes[nodeId]
  const existingFile = !isEmpty(fileId)
  const initialFileName = existingFile ? fileName : 'No image uploaded...'

  const dialogId = 'setting-dialog'
  const title = `Setting Node id ${nodeId}`
  const buttons = {
    OK() {
      if (uploadId) {
        const content = `Do you want to ${existingFile ? 'replace existing file?' : 'continue?'}`
        confirmDialog(content, () => {
          startUploadFile()
          $('#confirm-dialog').dialog('close')
        })
      } else {
        errorDialog('Please select image for upload')
      }
    },
    Cancel() {
      $(this).dialog('close')
    },
  }
  const content = (
    <div id={dialogId}>
      <form>
        <fieldset>
          <label for="file">Upload Image:</label>
          <input
            type="text"
            name="file-information"
            class="text ui-widget-content ui-corner-all"
            placeholder={initialFileName}
            disabled
          />
          <div class="file ui-widget-content ui-corner-all">
            Open the file Browser
            <input type="file" name="file" id="file" title="Open the file Browser" />
          </div>
        </fieldset>
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

  $('input[name=file]').dmUploader({
    // DEBUG: url upload file server
    url: '//0.0.0.0:9999/upload',
    auto: false,
    multiple: false,
    maxFileSize: 10485760,
    allowedTypes: 'image/*',
    extFilter: ['jpg', 'jpeg', 'png'],
    onNewFile(id, file) {
      $('input[name=file-information]').val(file.name)
      uploadId = id
    },
    onFileTypeError() {
      errorDialog('File support only image')
    },
    onFileSizeError() {
      errorDialog('Max file size limit 10 MiB')
    },
    onFileExtError() {
      errorDialog('File support [ jpg, jpeg, png ]')
    },
    onUploadError() {
      errorDialog('File upload error, please try again')
    },
    onUploadSuccess(id, data) {
      console.log(data)
      nodes[nodeId].files = data

      // NOTE: destroy uploader and close dialog
      $(this).dmUploader('destroy')
      $(`#${dialogId}`).dialog('close')
    },
  })
}
