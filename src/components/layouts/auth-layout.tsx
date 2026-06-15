import React from "react";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  icon?: string | React.ReactNode;
  maxWidth?: string;
}

export const AuthLayout = ({
  children,
  title,
  subtitle,
  icon = "🛒",
  maxWidth = "max-w-sm",
}: AuthLayoutProps) => {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-zinc-950 p-6 font-sans">
      <div className="absolute inset-0 bg-[radial-gradient(at_center,#52525b_0%,transparent_60%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(at_top_right,#3f3f46_0%,transparent_50%)]"></div>

      <div className={`w-full ${maxWidth} relative z-10`}>
        <div className="mb-10 flex justify-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-3xl border border-zinc-700 bg-zinc-900 shadow-2xl shadow-black/70">
            {typeof icon === "string" ? (
              <span className="text-5xl">{icon}</span>
            ) : (
              icon
            )}
          </div>
        </div>

        <div className="rounded-3xl border border-zinc-700 bg-zinc-900/80 p-8 shadow-2xl backdrop-blur-xl">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-semibold tracking-tight text-white">
              {title}
            </h1>
            {subtitle && (
              <p className="mt-2 text-sm text-zinc-400">{subtitle}</p>
            )}
          </div>

          {children}
        </div>
      </div>
    </div>
  );
};
