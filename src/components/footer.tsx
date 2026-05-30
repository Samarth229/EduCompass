import Link from 'next/link'
import { GraduationCap } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-[#111111] border-t border-[#2A2A2A] mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          <div>
            <Link href="/" className="flex items-center gap-2 mb-3">
              <GraduationCap className="w-6 h-6 text-[#F5C518]" />
              <span className="text-xl font-bold text-white">
                Edu<span className="text-[#F5C518]">Compass</span>
              </span>
            </Link>
            <p className="text-[#A0A0A0] text-sm max-w-xs">
              India&apos;s trusted engineering college discovery platform. Built on real NIRF 2024 data.
            </p>
          </div>
          <div className="flex gap-12">
            <div>
              <p className="text-white font-semibold mb-3 text-sm">Explore</p>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/colleges" className="text-[#A0A0A0] hover:text-[#F5C518] transition-colors duration-200">
                    Colleges
                  </Link>
                </li>
                <li>
                  <Link href="/predictor" className="text-[#A0A0A0] hover:text-[#F5C518] transition-colors duration-200">
                    Predictor
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <p className="text-white font-semibold mb-3 text-sm">Account</p>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/login" className="text-[#A0A0A0] hover:text-[#F5C518] transition-colors duration-200">
                    Login
                  </Link>
                </li>
                <li>
                  <Link href="/register" className="text-[#A0A0A0] hover:text-[#F5C518] transition-colors duration-200">
                    Register
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="border-t border-[#2A2A2A] mt-8 pt-6 text-center text-[#606060] text-sm">
          © 2024 EduCompass. Built with NIRF 2024 data.
        </div>
      </div>
    </footer>
  )
}
