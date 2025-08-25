import Link from "next/link";

export default function Home() {
  return (
    <div className="font-sans flex items-center justify-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <Link href={"/login"}>ورود</Link>
      <Link href={"/dashboard"}>داشبرد</Link>
    </div>
  );
}
