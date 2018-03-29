import {select} from 'd3'

export const getRootspace = () => select('g.root')
export const getTempspace = () => select('g.temp')
export const getWorkspace = () => select('g.workspace')
