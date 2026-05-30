'use client'

import { useEffect } from 'react'
import { AlertTriangle, RefreshCw } from 'lucide-react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center">
        <AlertTriangle className="w-16 h-16 text-[#EF4444] mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-white mb-3">Something went wrong</h2>
        <p className="text-[#A0A0A0] mb-8 max-w-sm mx-auto">
          An unexpected error occurred. Please try again.
        </p>
        <button
          onClick={reset}
          className="inline-flex items-center gap-2 bg-[#F5C518] text-black font-semibold px-6 py-3 rounded-full hover:bg-[#E6B800] hover:scale-[1.03] active:scale-95 transition-all duration-200"
        >
          <RefreshCw className="w-4 h-4" />
          Try Again
        </button>
      </div>
    </div>
  )
}
