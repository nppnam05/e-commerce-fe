import { AuthLayout } from "@/components/layouts/auth-layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { login } from "@/store/slices/auth-slice";
import { useSignInMutation } from "@/store/api/api-auth";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

export const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [signIn] = useSignInMutation();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await signIn({ email, password }).unwrap();
    if (result) {
      dispatch(login(result));
      navigate("/home");
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

        <div className="text-center">
          <p className="text-center text-zinc-400 text-sm">
            Chưa có tài khoản?{" "}
            <Link
              to="/register"
              className="text-white hover:underline font-medium"
            >
              Đăng ký
            </Link>
          </p>
          <div className="p-1"></div>
          <Link
            to=""
            className="text-zinc-400 hover:text-white text-sm transition-colors"
          >
            Quên mật khẩu?
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
};
