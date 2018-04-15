import dom from 'jsx-render'
import xdom from '../utility/xdom'

function close() {
  // NOTE: remove DOM when dialog closed
  $(this).dialog('destroy')
  $(this).remove()
}

function open() {
  // const id = $(this).attr('id')
  setTimeout(() => {
    if ($(document).has(this).length > 0) $(this).dialog('close')
  }, 5000)
}

export const showDialog = ({ id, title, buttons, content, custom }) => {
  // NOTE: append dom to body
  const defaultContent = (
    <div id={id}>
      <p>{content}</p>
    </div>
  )
  const newContent = custom ? content : defaultContent
  const newOpen = custom ? null : open
  xdom('body', newContent)

  const dialogClass = `no-close ${id}`

  $(`#${id}`).dialog({
    title: title.toUpperCase(),
    dialogClass,
    draggable: false,
    position: {
      my: 'top+100',
      at: 'top',
      of: window,
    },
    modal: true,
    resizable: false,
    width: 450,
    buttons,
    open: newOpen,
    close,
  })
}

export const errorDialog = content => {
  const id = 'error-dialog'
  const title = 'Error Dialog'
  const buttons = {
    Close() {
      $(this).dialog('close')
    },
  }
  showDialog({
    id,
    title,
    buttons,
    content,
  })
}

export const confirmDialog = (content, OK) => {
  const id = 'confirm-dialog'
  const title = 'Confirm Dialog'
  const buttons = {
    OK,
    Cancel() {
      $(this).dialog('close')
    },
  }
  showDialog({
    id,
    title,
    buttons,
    content,
  })
}

export const informationDialog = content => {
  const id = 'information-dialog'
  const title = 'Infomation Dialog'
  const buttons = {
    Close() {
      $(this).dialog('close')
    },
  }
  showDialog({
    id,
    title,
    buttons,
    content,
  })
}
