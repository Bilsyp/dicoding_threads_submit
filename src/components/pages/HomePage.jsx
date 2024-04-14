import { test } from "../../data";
function HomePage() {
  const config = {
    autoplay: true,
    loop: true,
    pagination: true,
    breakpoints: JSON.stringify({
      640: {
        slidesPerView: 1,
        spaceBetween: 20,
      },

      1024: {
        slidesPerView: 2,
        spaceBetween: 50,
      },
    }),
  };

  return (
    <div className="max-w-6xl px-3 lg:px-2  flex flex-col place-content-center mx-auto h-[90vh]">
      <div className="py-2">
        <article>
          <h1 className=" text-3xl lg:text-5xl py-3  lg:text-center font-bold">
            Membahas Proyek Terbaru{" "}
            <span className="text-blue-600">Showcase</span> <br /> Karya Anda di
            Sini
          </h1>
        </article>

        <div className="card rounded-md w-full">
          <swiper-container {...config} space-between="20">
            {test.map((item, index) => (
              <swiper-slide key={index}>
                <div
                  className="rounded-lg border bg-card text-card-foreground shadow-sm"
                  data-v0-t="card"
                >
                  <div className="flex-col space-y-1.5 p-6 flex gap-2 items-start">
                    <span className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full">
                      <img
                        src="/erik-mclean-ZRns2R5azu0-unsplash.jpg"
                        width="40"
                        height="40"
                        alt="Avatar"
                        className="aspect-square"
                      />
                    </span>
                    <div className="grid-rows-2 text-wrap break-all  break-words">
                      <h3 className=" font-semibold tracking-tight text-base line-clamp-1">
                        {item.title}
                      </h3>
                      <p className="text-muted-foreground text-xs not-italic">
                        Posted by <a href="#">lee</a> 1 hour ago
                      </p>
                    </div>
                  </div>
                  <div className="p-6 text-sm">
                    Vercel UI is a design system for the web, built by the team
                    behind Next.js. It provides components, styles, and
                    utilities to create beautiful, accessible web experiences.
                  </div>
                  <div className="items-center p-6 text-xs flex justify-between">
                    <div className="flex items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-4 h-4"
                      >
                        <path d="M7 10v12"></path>
                        <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z"></path>
                      </svg>
                      <span>12 Likes</span>
                    </div>
                    <a className="underline" href="#">
                      View Thread
                    </a>
                  </div>
                </div>
              </swiper-slide>
            ))}
          </swiper-container>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
