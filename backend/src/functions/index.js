import LoadImageFunction from './LoadImageFunction'
import BlurFunction from './BlurFunction'
import BGR2GrayFunction from './BGR2GrayFunction'
import CannyFunction from './CannyFunction'
import ErodeFunction from './ErodeFunction'
import DilateFunction from './DilateFunction'
import SobelFunction from './SobelFunction'
import GaussianBlurFunction from './GaussianBlurFunction'
import ResizeFunction from './ResizeFunction'
import ThresholdFunction from './ThresholdFunction'
import OpeningFunction from './OpeningFunction'
import ClosingFunction from './ClosingFunction'

// function registry
export default {
  LoadImageFunction,
  BlurFunction,
  GaussianBlurFunction,
  BGR2GrayFunction,
  CannyFunction,
  ErodeFunction,
  DilateFunction,
  SobelFunction,
  ResizeFunction,
  ThresholdFunction,
  OpeningFunction,
  ClosingFunction,
}
