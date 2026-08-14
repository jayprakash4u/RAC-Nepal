import { AdminShell } from "../_components/admin-shell";
import { ToastProvider } from "../_components/toast";

/**
 * Wraps every signed-in admin page. `/admin/login` deliberately sits outside
 * this `(panel)` group so the sign-in screen renders without the sidebar.
 *
 * Because this is a real layout rather than a component each page imported,
 * the sidebar no longer unmounts and remounts on every navigation — nav scroll
 * position survives, and the idle timer keeps counting across page changes.
 */
export default function PanelLayout({ children }: { children: React.ReactNode }) {
  return (
    <ToastProvider>
      <AdminShell>{children}</AdminShell>
    </ToastProvider>
  );
}
