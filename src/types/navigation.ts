export type NavLink = {
  label: string;
  href: string;
};

export type NavDropdown = {
  label: string;
  href?: string;
  children: readonly NavLink[];
};

export type NavItem = NavLink | NavDropdown;

export function isNavDropdown(item: NavItem): item is NavDropdown {
  return "children" in item;
}
