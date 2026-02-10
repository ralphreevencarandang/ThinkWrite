'use client'
import Link from 'next/link'
import { Bookmark, House, Menu, NotepadText, Settings } from 'lucide-react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useRef, useEffect } from 'react'
import { SidebarProps } from '@/Types'

const MobileSidebar = ({ onMobileMenuClick, isOpen }: SidebarProps) => {
  const sidebarRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);

  // 1. SCROLL LOCK LOGIC
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    // Cleanup on unmount
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  // Initial setup
  useGSAP(() => {
    gsap.set(sidebarRef.current, { x: -300 });
    gsap.set(backdropRef.current, { opacity: 0, display: 'none' });
  }, []);

  // 2. GSAP ANIMATION (Sidebar + Backdrop)
  useGSAP(() => {
    // Sidebar Animation
    gsap.to(sidebarRef.current, {
      x: isOpen ? 0 : -300,
      duration: 0.4,
      ease: 'power2.out',
      opacity: isOpen ? 1 : 0
    });

    // Backdrop Animation
    gsap.to(backdropRef.current, {
      opacity: isOpen ? 1 : 0,
      display: isOpen ? 'block' : 'none',
      duration: 0.3,
      
    });
  }, [isOpen]);

  return (
    <>
      {/* 3. THE BACKDROP (Outside Click Area) */}
      <div
        ref={backdropRef}
        onClick={onMobileMenuClick} // Closes when clicking outside
        className="fixed inset-0 bg-black/10 z-40 opacity-0"
      />

      {/* 4. THE SIDEBAR */}
      <nav
        ref={sidebarRef}
        className="fixed top-0 left-0 min-h-screen  bg-white px-7 py-8 border-r border-zinc-300 z-50 shadow-xl opacity-0"
      >
        <div className="space-y-10">
          <div className="flex gap-4">
            <button onClick={onMobileMenuClick} className="cursor-pointer">
              <Menu strokeWidth={1} />
            </button>
            <Link href="/" className="text-black text-lg font-bold">ThinkWrite.</Link>
          </div>

          <ul className="space-y-5">
            <li>
              <Link href="/" className="flex gap-2 items-center hover:text-black transition-all">
                <House strokeWidth={1} /> Home
              </Link>
            </li>
            <li>
              <Link href="/likes" className="flex gap-2 items-center hover:text-black transition-all">
                <Bookmark strokeWidth={1} /> Like
              </Link>
            </li>
            <li>
              <Link href="/stories" className="flex gap-2 items-center hover:text-black transition-all">
                <NotepadText strokeWidth={1} /> Stories
              </Link>
            </li>
            <li>
              <Link href="/settings" className="flex gap-2 items-center hover:text-black transition-all">
                <Settings strokeWidth={1} /> Settings
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  )
}

export default MobileSidebar