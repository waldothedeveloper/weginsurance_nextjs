import Image from "next/image";

export const ImageBanner = () => {
  return (
    <div className="mt-32 sm:mt-40 xl:mx-auto xl:max-w-7xl xl:px-8">
      <div className="aspect-5/2 relative">
        <Image
          fill
          src="https://images.unsplash.com/photo-1484712401471-05c7215830eb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80"
          alt=""
          className="w-full object-cover xl:rounded-3xl"
        />
      </div>
    </div>
  )
}