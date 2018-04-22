import { getDataFromGlobal } from '../utility/editorMode'

export default () => {
  const nodes = getDataFromGlobal('NODES')
  const lines = getDataFromGlobal('LINES')

  localStorage.setItem('NODES', JSON.stringify(nodes))
  localStorage.setItem('LINES', JSON.stringify(lines))
}
