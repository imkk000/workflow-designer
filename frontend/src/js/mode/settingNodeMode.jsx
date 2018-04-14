import dom from 'jsx-render'
import { showDialog } from '../editor/dialog'

export default () => {
  const settingType = {
    custom: true,
    id: 'setting-dialog',
    title: 'Settings?',
    button: [],
  }

  const content = (
    <div id={settingType.id}>
      <p>Setting?</p>
    </div>
  )
  showDialog(settingType, content)
}
