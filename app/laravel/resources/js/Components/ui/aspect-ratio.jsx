import * as React from "react"
import * as AspectRatioPrimitive from "@radix-ui/react-aspect-ratio"

const AspectRatio = React.forwardRef(function AspectRatio(props, ref) {
  return <AspectRatioPrimitive.Root ref={ref} {...props} />
})

export { AspectRatio }
