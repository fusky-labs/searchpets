import { useContext } from "react";
import { NavbarContext, RequireSidebar } from "../../contexts";

export default function Sidebar() {
  const { sidebarOpen, setSidebarOpen } = useContext(NavbarContext) as RequireSidebar;

  const shamone = sidebarOpen ? "left-0" : "-left-[13rem] lg:-left-[20rem]";

  return (
    <div
      id="__sidebar"
      className={`fixed top-0 ${shamone} bottom-0 bg-gray-200  w-[13rem] lg:w-[20rem] transition-all duration-300`}
    >
      <div>
        <button onClick={() => setSidebarOpen(false)} className="bg-green-400">
          Close
        </button>
        searchpets sidebar
      </div>
      <div role="list" className="pt-1 flex flex-col gap-y-1.5">
        <SidebarItem name="Search" />
        <SidebarItem name="History" />
        <hr className="border-gray-500" />
        <SidebarItem name="Character list" />
        <SidebarItem name="Chapter list" />
        <hr className="border-gray-500" />
        <SidebarItem name="About Searchpets" />
        <SidebarItem name="Install Searchpets" />
        <SidebarItem name="Feedback" />
        <hr className="border-gray-500" />
        <div className="px-5 text-sm flex flex-col gap-y-2 pt-3">
          <div>
            <em>Searchpets!</em> is an open source fan project. SP does not own
            any of the contents used on this website and has no direct
            affiliation with <em>Housepets!</em> or all of Rick Griffin's
            intellectual property.
          </div>
          <div>Searchpets! v2.0.0-dev</div>
          <div>
            Checkout{" "}
            <a href="https://searchpets.xyz/" className="underline">
              Searchpets v1
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function SidebarItem({ name }: { name: string }) {
  return (
    <div
      role="listitem"
      className="flex gap-x-2 rounded-md hover:bg-purple-400 mx-2.5 px-4 py-2"
    >
      {/* <span>icon</span> */}
      <span>{name}</span>
    </div>
  );
}
