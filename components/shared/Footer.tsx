import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <footer className="border-t">
      <div className="flex-center wrapper flex-between flex flex-col gap-4 p-5 text-center sm:flex-row">
        <Link href='/'>
          <Image
            src="/assets/images/logo2.png"
            alt="logo"
            width={128}
            height={38}
            className=' font-poppins'
          />
        </Link>

        <p>2023 Bookify. All Rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer