import { auth } from "@/lib/auth"

export type NavbarProps = {
  onMobileMenuClick: () => void
  onDesktopMenuClick?: () => void
  // isOpen: boolean
}

export type SidebarProps = {
  onMobileMenuClick: () => void
  onDesktopMenuClick?: () => void
  isOpen: boolean
}
export type Session = typeof auth.$Infer.Session