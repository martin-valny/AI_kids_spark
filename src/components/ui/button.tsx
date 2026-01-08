import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        // Existing shadcn variants
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        // Design system variants - colorful buttons for kids
        "kids-blue":
          "bg-kids-blue text-white shadow-lg hover:bg-kids-blue/90 hover:shadow-xl hover:-translate-y-0.5 focus-visible:ring-kids-blue",
        "kids-purple":
          "bg-kids-purple text-white shadow-lg hover:bg-kids-purple/90 hover:shadow-xl hover:-translate-y-0.5 focus-visible:ring-kids-purple",
        "kids-green":
          "bg-kids-green text-white shadow-lg hover:bg-kids-green/90 hover:shadow-xl hover:-translate-y-0.5 focus-visible:ring-kids-green",
        "kids-pink":
          "bg-kids-pink text-white shadow-lg hover:bg-kids-pink/90 hover:shadow-xl hover:-translate-y-0.5 focus-visible:ring-kids-pink",
        "kids-orange":
          "bg-kids-orange text-white shadow-lg hover:bg-kids-orange/90 hover:shadow-xl hover:-translate-y-0.5 focus-visible:ring-kids-orange",
        "kids-yellow":
          "bg-kids-yellow text-gray-800 shadow-lg hover:bg-kids-yellow/90 hover:shadow-xl hover:-translate-y-0.5 focus-visible:ring-kids-yellow",
        "kids-red":
          "bg-kids-red text-white shadow-lg hover:bg-kids-red/90 hover:shadow-xl hover:-translate-y-0.5 focus-visible:ring-kids-red",
        "kids-teal":
          "bg-kids-teal text-white shadow-lg hover:bg-kids-teal/90 hover:shadow-xl hover:-translate-y-0.5 focus-visible:ring-kids-teal",
        // Design system outline variants
        "kids-blue-outline":
          "border-2 border-kids-blue text-kids-blue bg-transparent hover:bg-kids-blue/5 focus-visible:ring-kids-blue",
        "kids-purple-outline":
          "border-2 border-kids-purple text-kids-purple bg-transparent hover:bg-kids-purple/5 focus-visible:ring-kids-purple",
        "kids-green-outline":
          "border-2 border-kids-green text-kids-green bg-transparent hover:bg-kids-green/5 focus-visible:ring-kids-green",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
        // Accessible touch target size (WCAG 2.1 AA - 44px minimum)
        touch: "min-h-[44px] min-w-[44px] px-6 py-3",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
