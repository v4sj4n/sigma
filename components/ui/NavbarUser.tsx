'use client'

import Image from 'next/image'
import Link from 'next/link'

const LoggedInUser = () => {
  return (
    <div>
      <button
        type='button'
        className='relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800'
        id='user-menu-button'
        aria-expanded='false'
        aria-haspopup='true'
      >
        <span className='absolute -inset-1.5'></span>
        <span className='sr-only'>Open user menu</span>

        <Image
          className='h-8 w-8 rounded-full'
          src='/userImage.png'
          width={32}
          height={32}
          alt=''
        />
      </button>
    </div>
  )
}

const NotLoggedInUser = () => {
  return (
    <Link href={'/api/auth/signin'} className='invert'>
      Authenticate
    </Link>
  )
}

export { LoggedInUser, NotLoggedInUser }
