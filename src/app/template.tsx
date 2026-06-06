import { PageTransition } from '@/features/shared/components/page-transition'

export default function Template({ children }: { children: React.ReactNode }) {
  return <PageTransition>{children}</PageTransition>
}
