"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface UserData {
  name: string;
  email: string;
  picture: string;
  phone: string;
}

export default function Dashboard() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const router = useRouter();

  useEffect(() => {
    if(typeof window !== "undefined") {
      // دریافت اطلاعات کاربر از localStorage
      const storedData = localStorage.getItem("userData");
      if (storedData) {
        setUserData(JSON.parse(storedData));
      } else {
        // اگر اطلاعات کاربر وجود ندارد، به صفحه login هدایت شود
        router.replace("/login");
      }
    };
  }, [router]);

  const handleLogout = () => {
    if(typeof window !== "undefined") {
      // حذف اطلاعات کاربر از localStorage
      localStorage.removeItem("userData");
    }
    // هدایت به صفحه login
    router.push("/login");
  };

  if (!userData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p>در حال بارگذاری...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">داشبورد کاربری</h1>
          <Button onClick={handleLogout} variant="outline" className="bg-white hover:bg-gray-100">
            خروج
          </Button>
        </div>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl">اطلاعات کاربر</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-8 items-center">
              {/* user Image */}
              <div className="flex-shrink-0">
                <Image
                  src={userData.picture}
                  alt="User profile"
                  className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-md"
                  width={128}
                  height={128}
                />
              </div>

              {/* user info */}
              <div className="flex-grow">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">نام کامل</h3>
                    <p className="text-lg font-semibold">{userData.name}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">ایمیل</h3>
                    <p className="text-lg font-semibold">{userData.email}</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}