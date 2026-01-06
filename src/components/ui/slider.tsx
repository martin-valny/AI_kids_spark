
import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"

import { cn } from "@/lib/utils"

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> & {
    color?: 'red' | 'green' | 'blue' | 'default'
  }
>(({ className, color = 'default', ...props }, ref) => {
  const getColorClasses = () => {
    switch (color) {
      case 'red':
        return {
          range: 'bg-red-500',
          thumb: 'border-red-500'
        }
      case 'green':
        return {
          range: 'bg-green-500',
          thumb: 'border-green-500'
        }
      case 'blue':
        return {
          range: 'bg-blue-500',
          thumb: 'border-blue-500'
        }
      default:
        return {
          range: 'bg-primary',
          thumb: 'border-primary'
        }
    }
  }

  const colorClasses = getColorClasses()

  return (
    <SliderPrimitive.Root
      ref={ref}
      className={cn(
        "relative flex w-full touch-none select-none items-center",
        className
      )}
      {...props}
    >
      <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-secondary">
        <SliderPrimitive.Range className={`absolute h-full ${colorClasses.range}`} />
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb className={`block h-5 w-5 rounded-full border-2 ${colorClasses.thumb} bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50`} />
    </SliderPrimitive.Root>
  )
})
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }
