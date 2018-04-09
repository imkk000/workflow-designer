// NOTE: initial constant editor mode
const EDITOR_MODE = {
  NORMAL: 'NORMAL',
  ADD_LINE: 'ADD_LINE',
  SETTING: 'SETTING',
  ERROR: 'ERROR',
}

// NOTE: check mode is NORMAL
export const isNormalMode = () => window.EDITOR_MODE === EDITOR_MODE.NORMAL

// NOTE: check mode is ADD_LINE
export const isAddLineMode = () => window.EDITOR_MODE === EDITOR_MODE.ADD_LINE

// NOTE: check mode is SETTING
export const isSettingMode = () => window.EDITOR_MODE === EDITOR_MODE.SETTING

// NOTE: check mode is ERROR
export const isErrorMode = () => window.EDITOR_MODE === EDITOR_MODE.ERROR

// NOTE: get pass data in global variable
export const getPassData = () => window.PASS_DATA

// NOTE: set pass data to global variable
export const setPassData = (data) => {
  window.PASS_DATA = data
}

// NOTE: clear pass data from global variable
export const clearPassData = () => {
  window.PASS_DATA = null
}

// NOTE: return pass data before clear pass data
export const getPassDataBeforeClear = () => {
  const data = getPassData()
  clearPassData()
  return data
}

// NOTE: get editor mode to global variable
export const getEditorMode = () => window.EDITOR_MODE

// NOTE: set editor mode to global variable
export const setEditorMode = (data) => {
  window.EDITOR_MODE = data
}

// NOTE: add data to global variable
export const addDataToGlobal = (name, value) => {
  window[name] = value
}

// NOTE: set data if exists data
export const setDataInGlobal = (name, value) => {
  addDataToGlobal(name, value)
}

// NOTE: get data from global variable
export const getDataFromGlobal = name => window[name]

// NOTE: get current mode in global variable
export default EDITOR_MODE
