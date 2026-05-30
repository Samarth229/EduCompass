import Link from 'next/link'
import { GraduationCap, ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center">
        <GraduationCap className="w-16 h-16 text-[#F5C518] mx-auto mb-4" />
        <h1 className="text-6xl font-bold text-[#F5C518] mb-2">404</h1>
        <h2 className="text-2xl font-bold text-white mb-3">Page Not Found</h2>
        <p className="text-[#A0A0A0] mb-8">
          The page you&apos;re looking for doesn&apos;t exist.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-[#F5C518] text-black font-semibold px-6 py-3 rounded-full hover:bg-[#E6B800] hover:scale-[1.03] active:scale-95 transition-all duration-200"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
      </div>
    </div>
  )
}
