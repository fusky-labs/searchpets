export default function Container({ children }: any) {
  return(
    <main className="flex flex-col justify-between">
      <div className="select-none mx-auto my-0 max-w-[1400px] p-5 flex flex-col items-center gap-y-8">
        {children}
      </div>
    </main>
  )
};
