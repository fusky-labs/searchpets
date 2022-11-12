import { useState } from "react";
import { NavbarContext } from "../../contexts";
import Options from "../Options";
import Sidebar from "../Sidebar";

export interface LayoutProps {
  children?: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [optionsMenuOpen, setOptionsMenuOpen] = useState(false);

  const NavbarProviderValues = {
    sidebarOpen,
    setSidebarOpen,
    optionsMenuOpen,
    setOptionsMenuOpen,
  };

  return (
    <NavbarContext.Provider value={NavbarProviderValues}>
      <div id="__header">
        <header className="mx-auto max-w-screen-2xl px-10 flex justify-between items-center">
          <div>
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 bg-red-300"
            >
              Open me uwu
            </button>
            <span id="logo">searchpets</span>
            <Sidebar />
          </div>
          <div>
            <button>Settings</button>
            <Options />
          </div>
        </header>
      </div>
      {children}
    </NavbarContext.Provider>
  );
}
