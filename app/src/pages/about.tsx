import Link from "next/link"

export default function AboutPage() {
  return (
    <>
      <div className="my-0 mx-auto gap-4 max-w-[1366px] px-4 py-1">
        <article>
          <h1 className="text-3xl font-bold w-full text-center mt-5">
            About this project
          </h1>
          <p>
            <em>Searchpets</em> is an open source project created by two web
            developers from Southeast Asia. The initial idea was to create a
            website that searches comics from a popular furry web comic,{" "}
            <em>Housepets!</em> - the project started at March 25, 2022.
          </p>
          <p>
            The project is still in development, but it is now available on
            GitHub.
          </p>
          <br />
          <p>
            Our reason for creating the project was we wanted to find an easier
            way to find the source comic for memes made from comic, so we did!
            And as aspiring web developers, we wanted to make something that we
            find easy to use and help people along the way with the source code
            included.
          </p>
          <br />
          <p>
            On September 15, 2021, a user from the Housepets Forums,
            MasterAbsinthe,{" "}
            <Link href="https://www.housepetscomic.com/forums/viewtopic.php?f=13&t=5434&p=938783&hilit=search+engine#p938783">
              <a className="styled-link">
                created a way to filter and strip speech bubbles from the 2100+
                comics through OCR (Optical Character Recognition)
              </a>
            </Link>
            . Although updates for it has ceased and we're working on the those
            features as it will, of course, take time to implement them.
          </p>
        </article>
      </div>
    </>
  )
}
