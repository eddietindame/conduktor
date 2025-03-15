import { useId } from 'react'

import { AnimatedNumber } from '@/components/animated-number'
import { Skeleton } from '@/components/ui/skeleton'

type FigureProps = {
  label: string
  value?: number
  isLoading?: boolean
}

export const Figure = ({ label, value = 0, isLoading }: FigureProps) => {
  const id = useId()
  return (
    <div className="flex min-w-50 flex-col items-center rounded border-1 px-8 py-4 text-3xl">
      <label id={id}>{label}</label>
      <div
        className="w-full text-center text-[6rem] font-bold"
        aria-labelledby={id}
        role="figure"
      >
        {isLoading ? (
          <Skeleton
            data-testid="figure-skeleton"
            className="m-4 aspect-square rounded-full"
          />
        ) : (
          <>
            {/* Make final value immediately accessible */}
            <span className="sr-only">{value}</span>
            <span className="aria-hidden">
              <AnimatedNumber targetValue={value} duration={1000} />
            </span>
          </>
        )}
      </div>
    </div>
  )
}
