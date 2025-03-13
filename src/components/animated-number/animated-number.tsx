import { useState, useEffect } from 'react'

export type AnimatedNumberProps = {
  /** The final value to animate to */
  targetValue: number
  /** The duration of the animation in milliseconds */
  duration?: number
  /** Number of decimal places to preserve */
  decimalPlaces?: number
  /** Whether to shwo commas within the number */
  commas?: boolean
}

export const AnimatedNumber = ({
  targetValue,
  duration = 2000,
  decimalPlaces = 0,
  commas = true,
}: AnimatedNumberProps) => {
  const [value, setValue] = useState<number>(0)

  useEffect(() => {
    let startTime: number | null = null
    let animationFrameId: number

    // The animation progresses by calculating the ratio of the elapsed time
    // over the duration and adjusting the value accordingly
    const animate = (time: number) => {
      if (!startTime) startTime = time
      const elapsedTime = time - startTime
      const progress = Math.min(elapsedTime / duration, 1)
      const newValue = progress * targetValue

      setValue(newValue)

      // The value is updated incrementally, and the animation stops once the progress reaches 1
      if (progress < 1) animationFrameId = requestAnimationFrame(animate)
    }

    animationFrameId = requestAnimationFrame(animate)

    // Cleanup on unmount
    return () => cancelAnimationFrame(animationFrameId)
  }, [targetValue, duration])

  if (commas) return new Intl.NumberFormat('en-GB').format(Math.floor(value))

  return value.toFixed(decimalPlaces)
}
