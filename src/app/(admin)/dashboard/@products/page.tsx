'use client';

import { useState } from 'react';

export default function AdminProductPage() {
 const [status, statusSet] = useState('');
 const revalidate = async () => {
  const res = await fetch('http://localhost:3000/api/revalidate?tag=products&secret=12345sdasa12321sadas', {
   method: 'POST',
  });

  if (!res.ok) {
   statusSet('Revalidate Failed');
  } else {
   const respon = await res.json();
   if (respon.revalidate) {
    statusSet('Revalidate Success');
   }
  }
 };

 return (
  <div className='w-3/6 h-96 bg-gray-300 rounded-[12px] flex items-center justify-center'>
   <h1>{status}</h1>
   <button className='bg-gray-800 text-white px-5 py-3 m-5' type='button' onClick={revalidate}>
    Revalidate
   </button>
  </div>
 );
}
