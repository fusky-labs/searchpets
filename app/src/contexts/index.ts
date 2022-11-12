import { createContext } from "react";

type RequireProperty<T, P extends keyof T> = Required<Pick<T, P>>;

type Themes = "dark" | "light" | "system";
type Animations = boolean | "system";

type NavbarTypes = Partial<{
  // Handles sidebar and options menu
  sidebarOpen: boolean;
  optionsMenuOpen: boolean;
  setSidebarOpen: (sidebarOpen: boolean) => void;
  setOptionsMenuOpen: (optionsMenuOpen: boolean) => void;

  // Handles the search query from one component to another
  search: string;
  setSearch: (search: string) => void;
}>;

type OptionsTypes = {
  theme: Themes;
  animations?: Animations;
  setTheme: (theme: Themes) => void;
  setAnimations: (animations: Animations) => void;
};

type AllPartialTypes = Partial<NavbarTypes & OptionsTypes>;

export type RequireSidebar = RequireProperty<AllPartialTypes, "setSidebarOpen" | "sidebarOpen">;
export type RequireOptionsMenu = RequireProperty<
  AllPartialTypes,
  "setOptionsMenuOpen"
>;

export const NavbarContext = createContext<NavbarTypes>({
  sidebarOpen: false,
  optionsMenuOpen: false,
  search: "",
  setSidebarOpen: () => {},
  setOptionsMenuOpen: () => {},
  setSearch: () => {},
});

export const OptionsContext = createContext<OptionsTypes>({
  theme: "system",
  animations: "system",
  setTheme: () => {},
  setAnimations: () => {},
});
