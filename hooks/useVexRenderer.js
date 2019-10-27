import { useEffect, useState } from 'react'
import { Renderer } from 'vexflow/src/renderer'

export const useVexRenderer = (lienzoRef) => {
  const [renderer, setRenderer] = useState()

  useEffect(() => {
    setRenderer(new Renderer(lienzoRef.current, Renderer.Backends.SVG))
  }, [])

  return renderer
}
