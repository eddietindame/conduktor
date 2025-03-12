import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

type ProfileProps = {
  name: string
  imageUrl?: string
}

export const Profile = ({ imageUrl, name }: ProfileProps) => {
  const initials = name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()

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
