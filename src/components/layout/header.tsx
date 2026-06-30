import { Container } from "@/components/ui";
import { HeaderNav } from "./header-nav";
import { Logo } from "./logo";
import { TopBar } from "./top-bar";

export function Header() {
  return (
    <header
      className="sticky top-0 z-header isolate [--site-header-offset:7.5rem]"
      data-site-header
    >
      <TopBar />

      <div className="border-b border-slate-200 bg-white/95 backdrop-blur-md">
        <Container
          size="wide"
          className="flex h-20 w-full items-center justify-start gap-md lg:gap-xl"
        >
          <Logo priority className="shrink-0" />
          <HeaderNav />
        </Container>
      </div>
    </header>
  );
}
