import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import Skeleton from 'react-loading-skeleton'

type ProfileProps = {
  name?: string
  imageUrl?: string
  isLoading?: boolean
}

export const Profile = ({ imageUrl, name, isLoading }: ProfileProps) => {
  const initials =
    name
      ?.split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase() ?? ''

  if (isLoading) {
    return (
      <div className="flex items-center space-x-4">
        <div className="size-8">
          <Skeleton
            circle
            containerTestId="profile-avatar-skeleton"
            className="flex aspect-square size-full"
          />
        </div>
        <div className="h-4 w-24">
          <Skeleton
            containerTestId="profile-name-skeleton"
            className="flex h-full"
          />
        </div>
      </div>
    )
  }

  return (
    <div className="flex items-center space-x-4">
      <Avatar className="bg-accent items-center justify-center">
        <AvatarImage src={imageUrl} />
        <AvatarFallback className="font-bold">{initials}</AvatarFallback>
      </Avatar>
      <div>{name}</div>
    </div>
  )
}
