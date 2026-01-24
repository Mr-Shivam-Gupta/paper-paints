import * as React from "react"

import { cn } from "@/lib/utils"

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex min-h-[60px] w-full rounded-md border border-dark-grey/25 bg-white px-3 py-2 text-base text-deep-black shadow-sm placeholder:text-dark-grey hover:border-dark-grey/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-red/40 focus-visible:border-accent-red disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
Textarea.displayName = "Textarea"

export { Textarea }
