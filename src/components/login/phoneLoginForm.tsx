"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { validateIranianPhone } from "@/utils/phoneValidation";
import { useRouter } from "next/navigation";

export default function PhoneLoginForm() {
  const router = useRouter();
  const [phone, setPhone] = useState(""); // حالت برای ذخیره شماره تلفن وارد شده
  const [error, setError] = useState(""); // حالت برای ذخیره پیام خطا
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // اعتبارسنجی شماره تلفن با استفاده از تابع ایمپورت شده
    if (!validateIranianPhone(phone)) {
      setError("لطفاً یک شماره تلفن معتبر وارد کنید");
      return;
    }

    setIsLoading(true);

    try {
      // ارسال درخواست به API
      const response = await fetch(
        "https://randomuser.me/api/?results=1&nat=us"
      );

      if (!response.ok) {
        throw new Error("خطا در دریافت اطلاعات از سرور");
      }

      const data = await response.json();

      if (data.results && data.results.length > 0) {
        const user = data.results[0];
        const userData = {
          name: `${user.name.first} ${user.name.last}`,
          email: user.email,
          picture: user.picture.large,
        };

        if(typeof window !== "undefined") {
          // ذخیره اطلاعات در localStorage
          localStorage.setItem("userData", JSON.stringify(userData));
        }

        // انتقال به صفحه داشبورد
        router.push("/dashboard");
      } else {
        throw new Error("هیچ داده‌ای از API دریافت نشد");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      setError("خطا در دریافت اطلاعات کاربر. لطفاً دوباره تلاش کنید.");
    } finally {
      setIsLoading(false);
    }
  };

  // تابع برای فرمت کردن خودکار شماره تلفن هنگام ورود
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // فقط اعداد رو نگه داریم
    const numericValue = e.target.value.replace(/[^0-9]/g, ""); 
    setPhone(numericValue);

    // پاک کردن خطا وقتی کاربر در حال تایپ است
    if (error) {
      setError("");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4"dir="rtl">
      <Card className="w-full max-w-sm shadow-lg rounded-2xl border-0 bg-white/90 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold text-gray-800">
            ورود با شماره همراه
          </CardTitle>
          <p className="text-sm text-center text-gray-600 mt-2">
            لطفاً شماره تلفن خود را وارد کنید
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-gray-700">
                شماره همراه
              </Label>
              <Input
                id="phone"
                type="tel"
                inputMode="numeric" // موبایل کیبورد عددی نشون میده
                pattern="[0-9]*" // فقط اعداد قبول میشه
                placeholder="0912*******"
                value={phone}
                onChange={handlePhoneChange}
                className="text-left ltr"
                dir="ltr"
                required
                disabled={isLoading}
              />
              {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
            </div>
            <Button type="submit" className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700" disabled={isLoading || phone.length < 11}>
              {isLoading ? "در حال ارسال..." : "ادامه"}
            </Button>
          </form>

          <div className="mt-6 pt-4 border-t border-gray-200">
            <p className="text-xs text-center text-gray-500">
              با ورود یا ثبت‌نام، شما با شرایط استفاده و حریم‌خصوصی موافقت
              می‌کنید.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
