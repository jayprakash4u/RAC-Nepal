import { mainNavigation } from "@/config/navigation";
import { isNavDropdown, type NavItem, type NavLink } from "@/types/navigation";

export function getNavLinks(item: NavItem): NavLink[] {
  if (isNavDropdown(item)) {
    return [...item.children];
  }

  return [{ label: item.label, href: item.href }];
}

export function flattenNavigation(items: readonly NavItem[] = mainNavigation): NavLink[] {
  return items.flatMap((item) => getNavLinks(item));
}

export function isNavItemActive(pathname: string, item: NavItem): boolean {
  if (isNavDropdown(item)) {
    if (item.href && isLinkActive(pathname, item.href)) {
      return true;
    }

    return item.children.some((child) => isLinkActive(pathname, child.href));
  }

  return isLinkActive(pathname, item.href);
}

export function isLinkActive(pathname: string, href: string): boolean {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export function getDropdownByLabel(label: string) {
  const item = mainNavigation.find(
    (navItem) => isNavDropdown(navItem) && navItem.label === label,
  );

  return item && isNavDropdown(item) ? item : null;
}
