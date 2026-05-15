export function getCookie(name: string): string | null {
  if (typeof window === "undefined" || typeof document === "undefined")
    return null;
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match ? decodeURIComponent(match[2]) : null;
}
