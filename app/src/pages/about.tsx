import BaseHead from "../components/BaseHead";

export default function AboutPage() {
  return (
    <>
      <BaseHead
        title="About this project - Searchpets"
        description="About the development of Searchpets"
      />
      <div className="my-0 mx-auto gap-4 max-w-[1440px] px-4 py-1">
        <h1 className="text-2xl font-bold">About this project</h1>
      </div>
    </>
  )
};
