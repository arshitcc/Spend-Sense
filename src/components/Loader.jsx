import { Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"

export function Loader() {
  return (
    <Button className="mx-auto max-w-sm my-8" disabled>
      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      Please wait
    </Button>
  )
}
