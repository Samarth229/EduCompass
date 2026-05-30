'use client'

import { Star } from 'lucide-react'
import { cn } from '@/lib/utils'

interface StarRatingProps {
  rating: number
  interactive?: boolean
  onChange?: (rating: number) => void
  size?: 'sm' | 'md' | 'lg'
}

export function StarRating({ rating, interactive = false, onChange, size = 'md' }: StarRatingProps) {
  const sizeMap = { sm: 'w-3 h-3', md: 'w-4 h-4', lg: 'w-5 h-5' }
  const iconSize = sizeMap[size]

  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => {
        const filled = rating >= star
        const halfFilled = !filled && rating >= star - 0.5

        return (
          <button
            key={star}
            type="button"
            disabled={!interactive}
            onClick={() => interactive && onChange?.(star)}
            className={cn(
              'relative',
              interactive && 'cursor-pointer hover:scale-110 transition-transform duration-150',
              !interactive && 'cursor-default'
            )}
          >
            <Star
              className={cn(
                iconSize,
                filled || halfFilled ? 'text-[#F5C518] fill-[#F5C518]' : 'text-[#2A2A2A] fill-[#2A2A2A]'
              )}
            />
            {halfFilled && (
              <div className="absolute inset-0 overflow-hidden w-1/2">
                <Star className={cn(iconSize, 'text-[#F5C518] fill-[#F5C518]')} />
              </div>
            )}
          </button>
        )
      })}
    </div>
  )
}
