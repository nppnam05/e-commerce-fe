import React from "react";

interface GoogleButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
}

export const GoogleButton = ({
  label = "Đăng nhập với Google",
  className = "",
  ...props
}: GoogleButtonProps) => {
  const handleGoogleLogin = () => {
    // Redirect to BE endpoint to start OAuth2 flow
    // Default endpoint: /oauth2/authorization/google
    // Note: We use window.location.href because this is a full page redirect
    const apiBase = import.meta.env.VITE_SERVER_URI;
    window.location.href = `${apiBase}/oauth2/authorization/google`;
  };

  return (
    <button
      type="button"
      onClick={handleGoogleLogin}
      className={`flex w-full items-center justify-center gap-3 rounded-2xl border border-zinc-200 bg-white px-5 py-4 text-base font-medium text-zinc-900 transition-all hover:bg-zinc-100 active:scale-[0.985] ${className}`}
      {...props}
    >
      {/* Google Icon */}
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path
          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.51h5.92c-.25 1.29-.98 2.38-2.08 3.11v2.65h3.37c1.97-1.81 3.1-4.49 3.1-7.52z"
          fill="#4285F4"
        />
        <path
          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.37-2.65c-.93.63-2.12 1-3.91 1-3.01 0-5.57-2.03-6.48-4.76H2.18v2.99C3.99 20.53 7.7 23 12 23z"
          fill="#34A853"
        />
        <path
          d="M5.52 14.09c-.25-.75-.39-1.55-.39-2.36s.14-1.61.39-2.36V6.38H2.18C1.43 8.1 1 9.99 1 12c0 2.01.43 3.9 1.18 5.62l2.34-2.99z"
          fill="#FBBC05"
        />
        <path
          d="M12 4.75c1.69 0 3.2.59 4.4 1.74l3.3-3.3C17.46 1.55 14.97 1 12 1 7.7 1 3.99 3.47 2.18 6.38l3.34 2.99c.91-2.73 3.47-4.76 6.48-4.76z"
          fill="#EA4335"
        />
      </svg>

      <span>{label}</span>
    </button>
  );
};
