import PhoneLoginForm from "@/components/login/phoneLoginForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
  description: "Login to your account",
}

export default function LoginPage() {
  return (
    <div className="items-center min-h-screen bg-gray-50">
      <PhoneLoginForm />
    </div>
  );
}
