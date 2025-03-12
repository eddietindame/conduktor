import Skeleton from 'react-loading-skeleton'

type HomeProps = {
  name?: string
  isLoading?: boolean
}

export const Home = ({ name, isLoading }: HomeProps) => {
  if (isLoading) {
    return (
      <div className="p-4">
        <div className="w-[90%]">
          <Skeleton containerTestId="home-skeleton" />
        </div>
        <span className="text-3xl">
          <Skeleton />
        </span>
        <div className="w-[95%]">
          <Skeleton />
        </div>
        <div className="w-[60%]">
          <Skeleton />
        </div>
      </div>
    )
  }

  if (name) {
    return (
      <div className="p-4">
        <p className="text-xl">Welcome,</p>
        <p className="mb-4 ml-4 text-3xl">
          <span className="font-bold">{name}</span>!
        </p>
        <p className="ml-2">
          <span className="inline-block rotate-[-90deg] animate-bounce">
            ☝️
          </span>{' '}
          Explore the app through the nav-bar!
        </p>
      </div>
    )
  }

  return (
    <div className="flex justify-end p-4 font-bold">
      Sign in
      <span className="ml-1 inline-block animate-bounce">☝️</span>
    </div>
  )
}
