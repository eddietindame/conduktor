import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react'
import { HeaderContext } from '@tanstack/table-core'

import { Button } from '@/components/ui/button'

type SortButtonProps = {
  toggleSorting: () => void
  isSorted: 'asc' | 'desc' | false
  label: string
}
export const SortButton = ({
  toggleSorting,
  isSorted,
  label,
}: SortButtonProps) => (
  <Button variant="ghost" onClick={toggleSorting}>
    {label}
    {!isSorted && <ArrowUpDown className="ml-2 h-4 w-4" />}
    {isSorted === 'asc' && (
      <>
        <ArrowUp aria-hidden className="ml-2 h-4 w-4" />
        <span className="sr-only">sorted ascending</span>
      </>
    )}
    {isSorted === 'desc' && (
      <>
        <ArrowDown aria-hidden className="ml-2 h-4 w-4" />
        <span className="sr-only">sorted descending</span>
      </>
    )}
  </Button>
)

type SortButtonContainerProps<TData> = {
  column: HeaderContext<TData, unknown>['column']
  label: string
}
export const SortButtonContainer = <TData,>({
  column,
  label,
}: SortButtonContainerProps<TData>) => {
  const toggleSorting = () =>
    column.toggleSorting(column.getIsSorted() === 'asc')
  const isSorted = column.getIsSorted()
  return (
    <SortButton
      toggleSorting={toggleSorting}
      isSorted={isSorted}
      label={label}
    />
  )
}
