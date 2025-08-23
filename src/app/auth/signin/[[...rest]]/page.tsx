import { SignIn } from "@clerk/nextjs";
import Image from "next/image";

export default function Page() {
  return (
    <div className="flex h-screen">
      {/* Left side (Image) */}
      <div className="w-1/2 flex justify-center items-center bg-gray-100">
        <Image
          src="/assets/sheep.png"
          alt="Sign in illustration"
          width={1000}
          height={1000}
        />
      </div>

      {/* Right side (Form) */}
      <div className="w-1/2 flex justify-center items-center">
        <SignIn />
      </div>
    </div>
  );
}
