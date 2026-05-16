import { AuthLayout } from "@/components/layouts/auth-layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { GoogleButton } from "@/components/ui/button-google";

export const LoginPage = () => {
  return (
    <AuthLayout title="Đăng nhập" subtitle="Chào mừng bạn trở lại" icon="🛒">
      <form className="space-y-6">
        <Input
          variant="superBlack"
          icon="👤"
          placeholder="Tên đăng nhập hoặc Email"
          type="text"
        />

        <Input
          variant="superBlack"
          icon="🔒"
          placeholder="Mật khẩu"
          type="password"
        />

        <Button type="submit" size="lg" className="w-full">
          ĐĂNG NHẬP
        </Button>

        <GoogleButton />

        <div className="text-center">
          <p className="text-center text-sm text-zinc-400">
            Chưa có tài khoản?{" "}
            <a
              href="/register"
              className="font-medium text-white hover:underline"
            >
              Đăng ký
            </a>
          </p>
          <div className="p-1"></div>
          <a
            href=""
            className="text-sm text-zinc-400 transition-colors hover:text-white"
          >
            Quên mật khẩu?
          </a>
        </div>
      </form>
    </AuthLayout>
  );
};
