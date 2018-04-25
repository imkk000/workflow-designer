import dom from 'jsx-render'
import axios from 'axios'

window.addEventListener('load', () => {
  const previewTable = document.getElementById('preview-table')
  if (!previewTable) return

  let xnodes = JSON.parse(localStorage.getItem('NODES'))
  let xlines = JSON.parse(localStorage.getItem('LINES'))
  const newxNodes = {}
  const newxLines = {}
  xnodes.map(node => {
    newxNodes[node.id] = node
    return true
  })
  xlines.map(({ lineId, beginId, endId }) => {
    newxLines[lineId] = {
      beginId,
      endId,
    }
    return true
  })
  xnodes = newxNodes
  xlines = newxLines

  previewTable.appendChild(
    <tr>
      <th>Image</th>
      <th>Description</th>
    </tr>
  )
  const loadImageTypes = Object.values(xnodes).filter(({ type }) => type === 'LoadImageFunction')
  const valid = {}
  const loopGetData = data => {
    data.map(({ lines }) => {
      lines.map(lineId => {
        if (valid[lineId]) return false

        const { endId } = xlines[lineId]
        const {
          id,
          files: { fileId },
          label,
          settings,
        } = xnodes[endId]

        const buildSettings = Object.keys(settings).map(settingKey => {
          const { value } = settings[settingKey]
          return (
            <div>
              <span>{settingKey}: </span>
              <span>{value}</span>
            </div>
          )
        })

        axios.get(`${location.origin}/api/image/${fileId}`, { responseType: 'arraybuffer' }).then(response => {
          // https://stackoverflow.com/questions/44611047/get-image-from-server-and-preview-it-on-client
          const base64 = btoa(new Uint8Array(response.data).reduce((d, byte) => d + String.fromCharCode(byte), ''))

          previewTable.appendChild(
            <tr>
              <td class="image">
                <p>
                  {label} - {id}
                </p>
                <img src={`data:;base64,${base64}`} alt={id} width="300" height="auto" />
              </td>
              <td class="desc">
                <p>{buildSettings}</p>
              </td>
            </tr>
          )
        })

        valid[lineId] = true
        loopGetData([xnodes[endId]])
        return true
      })

      return true
    })
  }
  loopGetData(loadImageTypes)
})
