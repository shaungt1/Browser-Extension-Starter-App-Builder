import { cva, type VariantProps } from 'class-variance-authority'
import { clsx } from 'clsx'
import type { ButtonHTMLAttributes } from 'react'

const styles = cva('inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-semibold transition disabled:opacity-50', {
  variants: {
    variant: {
      primary: 'bg-brand-500 text-white hover:bg-brand-600',
      secondary: 'bg-zinc-800 text-zinc-100 hover:bg-zinc-700'
    }
  },
  defaultVariants: { variant: 'primary' }
})

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<typeof styles>

export function Button({ className, variant, ...props }: ButtonProps) {
  return <button className={clsx(styles({ variant }), className)} {...props} />
}
