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
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-6 font-sans relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(at_center,#52525b_0%,transparent_60%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(at_top_right,#3f3f46_0%,transparent_50%)]"></div>

      <div className={`w-full ${maxWidth} relative z-10`}>
        <div className="flex justify-center mb-10">
          <div className="w-20 h-20 rounded-3xl bg-zinc-900 border border-zinc-700 flex items-center justify-center shadow-2xl shadow-black/70">
            {typeof icon === "string" ? (
              <span className="text-5xl">{icon}</span>
            ) : (
              icon
            )}
          </div>
        </div>

        <div className="bg-zinc-900/80 backdrop-blur-xl border border-zinc-700 rounded-3xl p-8 shadow-2xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-semibold text-white tracking-tight">
              {title}
            </h1>
            {subtitle && (
              <p className="text-zinc-400 mt-2 text-sm">{subtitle}</p>
            )}
          </div>

          {children}
        </div>

        <p className="text-center text-zinc-500 text-xs mt-8">
          Bảo mật • An toàn • Nhanh chóng
        </p>
      </div>
    </div>
  );
};
