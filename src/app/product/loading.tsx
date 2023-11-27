export default function Loading() {
 return (
  <main className='grid grid-cols-4 mt-5 place-items-center gap-5 p-5'>
   {Array.from({ length: 8 }).map((_, index) => (
    <div className='w-full max-w-sm bg-white  rounded-lg shadow dark:bg-gray-400 my-5 h-96' key={index}>
     <a href='#'></a>
     <div className='px-5 pb-5'>
      <a href='#'>
       <h5 className='text-xl font-semibold tracking-tight text-gray-900 dark:text-white truncate'></h5>
      </a>
      <div className='flex items-center justify-between mt-3'>
       <span className='text-3xl font-bold text-gray-900 dark:text-white'></span>
      </div>
     </div>
    </div>
   ))}
  </main>
 );
}
