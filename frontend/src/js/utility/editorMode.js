// NOTE: initial constant editor mode
const EDITOR_MODE = {
  NORMAL: 'NORMAL',
  ADD_LINE: 'ADD_LINE',
  SETTING: 'SETTING',
  ERROR: 'ERROR',
}

// TODO: check mode is NORMAL
export const isNormalMode = () => window.EDITOR_MODE === EDITOR_MODE.NORMAL

// TODO: check mode is ADD_LINE
export const isAddLineMode = () => window.EDITOR_MODE === EDITOR_MODE.ADD_LINE

// TODO: check mode is SETTING
export const isSettingMode = () => window.EDITOR_MODE === EDITOR_MODE.SETTING

// TODO: check mode is ERROR
export const isErrorMode = () => window.EDITOR_MODE === EDITOR_MODE.ERROR

// TODO: get pass data in global variable
export const getPassData = () => window.PASS_DATA

// TODO: set pass data to global variable
export const setPassData = (data) => {
  window.PASS_DATA = data
}

// TODO: get editor mode to global variable
export const getEditorMode = () => window.EDITOR_MODE

// TODO: set editor mode to global variable
export const setEditorMode = (data) => {
  window.EDITOR_MODE = data
}

// TODO: get current mode in global variable
export default EDITOR_MODE
