import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Skeleton } from '@/components/ui/skeleton'

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
      <div
        className="flex items-center space-x-4"
        data-testid="profile-skeleton"
      >
        <Skeleton className="aspect-square size-8 rounded-full" />
        <Skeleton className="h-4 w-24" />
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
