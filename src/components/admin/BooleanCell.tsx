'use client'

type BooleanCellProps = {
  cellData?: boolean | null
}

export function BooleanCell({ cellData }: BooleanCellProps) {
  return <span>{cellData ? 'SI' : 'NO'}</span>
}
