import { Languages } from 'lucide-react'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useLocale } from '..'

export const locales = [
  { value: 'en', label: 'English' },
  { value: 'es', label: 'Spanish' },
  { value: 'fr', label: 'French' },
  { value: 'de', label: 'German' },
  { value: 'jp', label: 'Japanese' },
]

type LocaleSwitcherProps = {
  locale: string
  handleLocaleChange: (value: string) => void
}

export const LocaleSwitcher = ({
  locale,
  handleLocaleChange,
}: LocaleSwitcherProps) => {
  return (
    <Select value={locale} onValueChange={handleLocaleChange}>
      <SelectTrigger className="w-[120px]" aria-label="Locale">
        <SelectValue placeholder="Select a locale" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel className="flex items-center gap-2">
            <Languages aria-hidden size={16} /> Locale
          </SelectLabel>
          {locales.map(({ value, label }) => (
            <SelectItem key={value} value={value}>
              {label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export const LocaleSwitcherContainer = () => {
  const { locale, setLocale } = useLocale()
  return <LocaleSwitcher locale={locale} handleLocaleChange={setLocale} />
}
