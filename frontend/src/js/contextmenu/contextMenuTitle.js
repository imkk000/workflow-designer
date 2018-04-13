const contextMenuListClassName = '.context-menu-list'
const contextMenuTitleContentClassName = 'context-menu-title-content'

// NOTE: global variable
let contextMenuTitleContent = ''

const setTitle = () => {
  $(contextMenuListClassName).attr(contextMenuTitleContentClassName, contextMenuTitleContent)
}

export const setContextMenuTitle = titleContent => {
  setTitle((contextMenuTitleContent = titleContent))
}

export const getContextMenuTitle = () => contextMenuTitleContent
