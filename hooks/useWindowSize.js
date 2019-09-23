import { useState, useEffect } from 'react'

const getSize = el => ({
  width: el.innerWidth,
  height: el.innerHeight,
})

export function useWindowSize() {
  const [size, setSize] = useState(getSize(window))
  useEffect(() => {
    const handleResize = () => setSize(getSize(window))
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [window])
  return size
}
