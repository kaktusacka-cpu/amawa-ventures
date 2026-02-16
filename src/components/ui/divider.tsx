import * as React from "react"

import { cn } from "@/lib/utils"

function Divider({ className, ...props }: React.ComponentProps<"hr">) {
  return (
    <hr
      data-slot="divider"
      className={cn("h-px w-full border-0 bg-black/10", className)}
      {...props}
    />
  )
}

export { Divider }
