import type { ReactNode } from "react";

export default function PageShell({ children }: { children: ReactNode }) {
  return <div className="zb-page-bg min-h-screen">{children}</div>;
}
