"use client"

import Image from "next/image";
import Link from "next/link";

export const Header = () => {
  return (
    <div className='bg-[#F1ECE6] p-4'>
         <Link href="/" className="mx-auto flex justify-center">
            <Image src="/logo.png" alt="Logo" width={120} height={40} className="cursor-pointer" />
          </Link>
    </div>
  )
}
