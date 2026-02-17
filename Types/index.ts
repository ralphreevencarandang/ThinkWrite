import { auth } from "@/lib/auth"
import * as z from 'zod'


export type User = {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        emailVerified: boolean;
        name: string;
        image?: string | null | undefined;


}

export type NavbarProps = {
  onMobileMenuClick: () => void
  onDesktopMenuClick?: () => void


}

export type SidebarProps = {
  onMobileMenuClick: () => void
  onDesktopMenuClick?: () => void
  isOpen: boolean
}
export type Session = typeof auth.$Infer.Session


