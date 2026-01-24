import { useEffect, useState, useRef, useCallback } from "react"
import '@/components/ui/image.css'

type Size = {
  width: number
  height: number
}

// @ts-ignore
export const useSize = (ref: any, threshold: number = 50): Size | null => {
  const [size, setSize] = useState<Size | null>(null)
  // Reference to the request animation frame numbers
  const rafNumbers = useRef<number[]>([])
  // Store the size from the first animation frame
  const pendingSize = useRef<Size | null>(null)

  const updateSize = useCallback((newSize: Size): void => {
    setSize((currentSize) => {
      if (!currentSize) {
        return newSize
      }

      const widthDiff = Math.abs(newSize.width - currentSize.width)
      const heightDiff = Math.abs(newSize.height - currentSize.height)

      if ((widthDiff > threshold || heightDiff > threshold)) {
        return newSize
      }
      return currentSize
    })
  }, [threshold])

  useEffect(() => {
    if (!ref.current) return

    // Initial size
    try {
      const { width, height } = ref.current.getBoundingClientRect()
      if (width > 0 && height > 0) {
        updateSize({ width, height })
      }
    } catch (e) {
      // Ignore error
    }

    if (typeof ResizeObserver === 'undefined') return

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect
        if (width === 0 || height === 0) continue

        // Cancel pending RAFs
        rafNumbers.current.forEach(rafNumber => cancelAnimationFrame(rafNumber))
        rafNumbers.current = []

        pendingSize.current = { width, height }

        // Debounce with RAF
        rafNumbers.current.push(requestAnimationFrame(() => {
          rafNumbers.current.push(requestAnimationFrame(() => {
            rafNumbers.current.push(requestAnimationFrame(() => {
              if (pendingSize.current) {
                updateSize(pendingSize.current)
              }
              pendingSize.current = null
            }))
          }))
        }))
      }
    })

    observer.observe(ref.current)

    return () => {
      observer.disconnect()
      rafNumbers.current.forEach(rafNumber => cancelAnimationFrame(rafNumber))
    }

  }, [ref, updateSize])

  return size
}
