import { AuthLayout } from "@/components/layouts/auth-layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const RegisterPage = () => {
  return (
    <AuthLayout
      title="Tạo tài khoản"
      subtitle="Tham gia ngay hôm nay"
      icon="🛒"
    >
      <form className="space-y-6">
        <Input icon="👤" placeholder="Họ và tên" type="text" />
        <Input icon="✉️" placeholder="Email" type="email" />
        <Input icon="🔒" placeholder="Mật khẩu" type="password" />
        <Input icon="🔒" placeholder="Xác nhận mật khẩu" type="password" />

        <Button type="submit" size="lg" className="w-full">
          ĐĂNG KÝ
        </Button>

        <p className="text-center text-zinc-400 text-sm">
          Đã có tài khoản?{" "}
          <a href="/login" className="text-white hover:underline font-medium">
            Đăng nhập
          </a>
        </p>
      </form>
    </AuthLayout>
  );
};
