import dom from 'jsx-render'
import xdom from '../utility/xdom'

const DIALOG = {
  ERROR: {
    id: 'error-dialog',
    title: 'Error Dialog',
    buttons: [],
  },
  INFO: {
    id: 'infomation-dialog',
    title: 'Infomation Dialog',
    buttons: [],
  },
  CONFIRM: {
    id: 'confirm-dialog',
    title: 'Confirm Dialog',
    buttons: [
      {
        text: 'Cancel',
        click() {
          $(this).dialog('close')
        },
      },
    ],
  },
}

function close() {
  // NOTE: remove DOM when dialog closed
  $(this).dialog('destroy')
  $(this).remove()
}

const showDialog = ({ id, title, buttons }, text) => {
  // NOTE: append dom to body
  xdom(
    'body',
    <div id={id}>
      <p>{text}</p>
    </div>
  )

  $(`#${id}`).dialog({
    title: title.toUpperCase(),
    dialogClass: 'no-close',
    draggable: false,
    modal: true,
    resizable: false,
    width: 450,
    buttons: [
      {
        text: 'Ok',
        click() {
          $(this).dialog('close')
        },
      },
      ...buttons,
    ],
    close,
  })
}

export const errorDialog = text => {
  showDialog(DIALOG.ERROR, text)
}

export const infoDialog = text => {
  showDialog(DIALOG.INFO, text)
}

export const confirmDialog = text => {
  showDialog(DIALOG.CONFIRM, text)
}
