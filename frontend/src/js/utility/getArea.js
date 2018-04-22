// Get root area group
export const getRootArea = () => d3.select('#root-area-group')

// Get temp area group
export const getTempArea = () => d3.select('#temp-area-group')

// Get draw area group
export const getDrawArea = () => d3.select('#draw-area-group')

// get grid area group
export const getGridArea = () => d3.select('#grid-area-group')

export const getDiagramSize = () => {
  const bbox = d3
    .select('#diagram-drawing')
    .node()
    .getBBox()
  const { width, height } = bbox
  return { width, height }
}
