const DOM_ID = 'error-dialog'

const createDom = ({ text }) => {
  const content = $('<p></p>').text(text)

  $('<div></div>')
    .attr('id', DOM_ID)
    .appendTo('body')
    .append(content)
}

export default (options) => {
  createDom(options)

  $(`#${DOM_ID}`).dialog({
    title: 'Error Dialog',
    draggable: false,
    modal: true,
    resizable: false,
    width: 500,
    close() {
      // TODO: remove DOM when dialog closed
      $(this).remove()
    },
  })
}
