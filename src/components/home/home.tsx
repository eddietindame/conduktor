import { GenericSkeleton } from '@/components/generic-skeleton/generic-skeleton'

type HomeProps = {
  locale: string
  name?: string
  isLoading?: boolean
}

export const Home = ({ name, isLoading, locale }: HomeProps) => {
  if (isLoading) return <GenericSkeleton />

  if (name) {
    return (
      <div className="opacity-fade-in p-4">
        <p className="text-xl">Welcome,</p>
        <p className="mb-4 ml-4 text-3xl">
          <span className="font-bold">{name}</span>!
        </p>
        <p className="mb-4 ml-2">
          <span className="inline-block rotate-[-90deg] animate-bounce">
            ☝️
          </span>{' '}
          Explore the app through the nav-bar!
        </p>
        Your locale is <strong className="italic">{locale}</strong>.
      </div>
    )
  }

  return (
    <div className="opacity-fade-in flex justify-end p-4 font-bold">
      Sign in
      <span className="ml-1 inline-block animate-bounce">☝️</span>
    </div>
  )
}
