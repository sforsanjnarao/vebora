import React from 'react'
// import { Zap } from 'lucide-react'
import { clsx } from 'clsx'; // or 'classnames' if you're using that
type Props = {
    className?: string
    children?: React.ReactNode
}

const PurpleIcon = ({className, children}: Props) => {
  return (
    <div className={clsx('px-4 py-2 iconBackground', className)}>
        {children}
    </div>
  )
}

export default PurpleIcon