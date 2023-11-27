'use client';
// import { getData } from '@/services/products';
import Image from 'next/image';
import Link from 'next/link';
import useSWR from 'swr';

type ProductPageProps = { params: { slug: string[] } };

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function ProductPage(props: ProductPageProps) {
 const { params } = props;

 // const products = await getData(`${process.env.NEXT_PUBLIC_API_URL}/api/product`);

 const { data, error, isLoading } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}/api/product`, fetcher);

 const products = {
  data: data?.data,
 };

 return (
  <main className='grid grid-cols-4 mt-5 place-items-center gap-5 p-5'>
   {/* <h1>{params.slug ? ' Detail Product Page' : 'Product Page'} </h1> */}
   {products.data?.length > 0 &&
    products.data?.map((product: any) => (
     <Link href={`/product/detail/${product.id}`} className='w-10/12 max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 my-5' key={product.id}>
      <Image width={500} height={500} loading='lazy' className='p-8 rounded-t-lg object-cover h-96 w-full' src={product.image} alt={product.name} />
      <div className='px-5 pb-5'>
       <h5 className='text-xl font-semibold tracking-tight text-gray-900 dark:text-white truncate'>{product.name}</h5>
       <div className='flex items-center justify-between mt-3'>
        <span className='text-3xl font-bold text-gray-900 dark:text-white'>$ {product.price}</span>
        <button
         type='button'
         className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
        >
         Add to cart
        </button>
       </div>
      </div>
     </Link>
    ))}
   {params.slug && (
    <>
     <p>Category : {params.slug[0]}</p>
     <p>Gender : {params.slug[1]}</p>
     <p>Id : {params.slug[2]}</p>
    </>
   )}
  </main>
 );
}
