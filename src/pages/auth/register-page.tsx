import { AuthLayout } from "@/components/layouts/auth-layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { useRegisterMutation } from "@/store/api/api-auth";
import { useNavigate } from "react-router-dom";

interface RegisterFormValues {
  displayName: string;
  email: string;
  location: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

export const RegisterPage = () => {
  const { register, handleSubmit } = useForm<RegisterFormValues>();
  const [registerMutation] = useRegisterMutation();
  const navigate = useNavigate();

  const onSubmit = async (data: RegisterFormValues) => {
    if (data.password === data.confirmPassword) {
      try {
        const result = await registerMutation({ ...data }).unwrap();
        if (result) {
          navigate("/login");
        }
      } catch (error: any) {
        console.log(error?.data?.message);
      }
    } else {
      console.log("Mật khẩu không khớp");
    }
  };

  return (
    <AuthLayout
      title="Tạo tài khoản"
      subtitle="Tham gia ngay hôm nay"
      icon="🛒"
    >
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <Input
        variant="superBlack"
          icon="👤"
          placeholder="Họ và tên"
          type="text"
          {...register("displayName")}
        />
        <Input
        variant="superBlack"
          icon="✉️"
          placeholder="Email"
          type="email"
          {...register("email")}
        />
        <Input
        variant="superBlack"
          icon="📍"
          placeholder="Địa chỉ"
          type="text"
          {...register("location")}
        />
        <Input
        variant="superBlack"
          icon="📱"
          placeholder="Số điện thoại"
          type="tel"
          {...register("phone")}
        />
        <Input
        variant="superBlack"
          icon="🔒"
          placeholder="Mật khẩu"
          type="password"
          {...register("password")}
        />
        <Input
        variant="superBlack"
          icon="🔒"
          placeholder="Xác nhận mật khẩu"
          type="password"
          {...register("confirmPassword")}
        />

        <Button type="submit" size="lg" className="w-full">
          ĐĂNG KÝ
        </Button>
      </form>
    </AuthLayout>
  );
};
