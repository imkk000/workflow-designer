import dom from 'jsx-render'

window.addEventListener('load', () => {
  const previewMode = document.getElementById('preview-mode')

  if (previewMode) {
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

    const previewTable = document.getElementById('preview-table')
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
          } = xnodes[endId]

          previewTable.appendChild(
            <tr>
              <td class="image">
                <img src={`${location.origin}/api/image/${fileId}`} alt={id} width="200" height="auto" />
              </td>
              <td />
            </tr>
          )

          valid[lineId] = true
          loopGetData([xnodes[endId]])
          return true
        })

        return true
      })
    }
    loopGetData(loadImageTypes)
  }
})
