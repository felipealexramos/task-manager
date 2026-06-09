import { LoadIcon } from "../assets/icons"

const PageLoader = () => {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-brand-background">
      <LoadIcon className="animate-spin text-brand-primary" />
    </div>
  )
}

export default PageLoader
