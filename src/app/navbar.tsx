import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signIn, signOut } from 'next-auth/react';
import Image from 'next/image';

export default function Navbar() {
 const { data: session, status }: { data: any; status: any } = useSession();
 const pathName = usePathname();
 return (
  <nav className='flex bg-gray-800 py-2 px-5 justify-between'>
   <div className='flex items-center '>
    <h1 className='text-white'>Navbar</h1>
    <ul className='flex  ml-5'>
     <Link href='/'>
      <li className={`mr-3 ${pathName === '/' ? 'text-blue-500' : 'text-white'} cursor-pointer`}>Home</li>
     </Link>
     <Link href='/about'>
      <li className={`mr-3 ${pathName === '/about' ? 'text-blue-500' : 'text-white'} cursor-pointer`}>About</li>
     </Link>
     <Link href='/about/profile'>
      <li className={`mr-3 ${pathName === '/about/profile' ? 'text-blue-500' : 'text-white'} cursor-pointer`}>Profile</li>
     </Link>
    </ul>
   </div>
   <div>
    {status === 'authenticated' ? (
     <div className='flex items-center gap-3'>
      <Image src='/images/avatar.png' alt='avatar' width={100} height={100} loading='lazy' className='w-10 h-10 rounded-full' />
      <h4 className='text-white'>{session?.user?.fullname}</h4>
      <button onClick={() => signOut()} className='bg-white rounded-md py-2 px-3 text-sm cursor-pointer'>
       Logout
      </button>
     </div>
    ) : (
     <button onClick={() => signIn()} className='bg-white rounded-md py-2 px-3 text-sm cursor-pointer'>
      Login
     </button>
    )}
   </div>
  </nav>
 );
}
