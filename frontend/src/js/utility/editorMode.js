import showCurrentMode from '../editor/showCurrentMode'

// initial constant editor mode
const EDITOR_MODE = {
  NORMAL: 'NORMAL',
  ADD_LINE: 'ADD_LINE',
  SETTING: 'SETTING',
  ERROR: 'ERROR',
  DELETE_NODE: 'DELETE_NODE',
  DELETE_LINE: 'DELETE_LINE',
  PROCESS: 'PROCESS',
}

// check mode is NORMAL
export const isNormalMode = () => window.EDITOR_MODE === EDITOR_MODE.NORMAL

// check mode is not NORMAL
export const notNormalMode = () => !isNormalMode()

// check mode is ADD_LINE
export const isAddLineMode = () => window.EDITOR_MODE === EDITOR_MODE.ADD_LINE

// check mode is SETTING
export const isSettingMode = () => window.EDITOR_MODE === EDITOR_MODE.SETTING

// check mode is ERROR
export const isErrorMode = () => window.EDITOR_MODE === EDITOR_MODE.ERROR

// check mode is DELETE_NODE
export const isDeleteNodeMode = () => window.EDITOR_MODE === EDITOR_MODE.DELETE_NODE

// check mode is DELETE_LINE
export const isDeleteLineMode = () => window.EDITOR_MODE === EDITOR_MODE.DELETE_LINE

// get pass data in global variable
export const getPassData = () => window.PASS_DATA

// set pass data to global variable
export const setPassData = data => {
  window.PASS_DATA = data
}

// clear pass data from global variable
export const clearPassData = () => {
  window.PASS_DATA = null
}

// return pass data before clear pass data
export const getPassDataBeforeClear = () => {
  const data = getPassData()
  clearPassData()
  return data
}

// get editor mode to global variable
export const getEditorMode = () => window.EDITOR_MODE

// set editor mode to global variable
export const setEditorMode = data => {
  window.EDITOR_MODE = data

  // show mode after set mode
  showCurrentMode(window.EDITOR_MODE)
}

// set data to global variable
export const setDataToGlobal = (name, value) => {
  window[name] = value
}

// get data from global variable
export const getDataFromGlobal = name => window[name]

// get current mode in global variable
export default EDITOR_MODE
