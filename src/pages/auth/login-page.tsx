import { AuthLayout } from "@/components/layouts/auth-layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { login } from "@/store/slices/auth-slice";
import { useSignInMutation } from "@/store/api/api-auth";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { GoogleButton } from "@/components/ui/button-google";
import { safeLocalStorage } from "@/utils/localStorage";
import { setCookie } from "@/lib/utils";

export const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [signIn] = useSignInMutation();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const deviceId = safeLocalStorage.getItem("deviceId");
    if (deviceId) {
      setCookie("deviceId", deviceId, 365);
    }
    try {
      const result = await signIn({ email, password }).unwrap();
      if (result) {
        safeLocalStorage.setItem("deviceId", result.deviceId || "");
        setCookie("deviceId", result.deviceId || "", 365);
        dispatch(login(result));
        if (result.roleName === "ADMIN") {
          navigate("/dashboard");
        } else {
          navigate("/home");
        }
      }
    } catch (err) {
      // Bỏ qua hoặc xử lý lỗi nếu cần thiết
    }
  };

  return (
    <AuthLayout title="Đăng nhập" subtitle="Chào mừng bạn trở lại" icon="🛒">
      <form className="space-y-6" onSubmit={handleLogin}>
        <Input
          variant="superBlack"
          icon="👤"
          placeholder="Tên đăng nhập hoặc Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Input
          variant="superBlack"
          icon="🔒"
          placeholder="Mật khẩu"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button type="submit" size="lg" className="w-full">
          ĐĂNG NHẬP
        </Button>

        <GoogleButton />

        <div className="text-center">
          <p className="text-center text-sm text-zinc-400">
            Chưa có tài khoản?{" "}
            <Link
              to="/register"
              className="font-medium text-white hover:underline"
            >
              Đăng ký
            </Link>
          </p>
          <div className="p-1"></div>
          <Link
            to=""
            className="text-sm text-zinc-400 transition-colors hover:text-white"
          >
            Quên mật khẩu?
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
};
