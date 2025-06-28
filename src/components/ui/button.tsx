import * as React from 'react'
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  "flex justify-center items-center shrink-0 cursor-pointer outline-none",
  {
    variants: {
      variant: {
        default: 
          "bg-primary-300 text-neutral-25 hover:bg-primary-400 active:bg-primary-500 text-sm font-semibold rounded-full cursor-pointer",
      },
      size: {
        default: "h-12"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
  asChild? : boolean
}) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp 
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants };

