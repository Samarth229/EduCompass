import { cn } from '@/lib/utils'
import { CheckCircle, MinusCircle, XCircle } from 'lucide-react'

interface ChanceBadgeProps {
  chance: 'High' | 'Medium' | 'Low'
  className?: string
}

export function ChanceBadge({ chance, className }: ChanceBadgeProps) {
  const config = {
    High: {
      icon: CheckCircle,
      label: 'High Chance',
      className: 'bg-green-500/20 text-green-400 border border-green-500/30',
    },
    Medium: {
      icon: MinusCircle,
      label: 'Medium Chance',
      className: 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30',
    },
    Low: {
      icon: XCircle,
      label: 'Low Chance',
      className: 'bg-red-500/20 text-red-400 border border-red-500/30',
    },
  }

  const { icon: Icon, label, className: badgeClass } = config[chance]

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold',
        badgeClass,
        className
      )}
    >
      <Icon className="w-3 h-3" />
      {label}
    </span>
  )
}
