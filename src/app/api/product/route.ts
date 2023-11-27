import { retrieveData, retrieveDataById } from '@/lib/firebase/service';
import { NextRequest, NextResponse } from 'next/server';

const data = [
 {
  id: 1,
  title: 'Sepatu Baru',
  price: 100000,
  image: 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/0410970b-5e8f-49ae-b09c-aed707d47e5a/air-max-plus-shoes-mVwq4h.png',
 },
 {
  id: 2,
  title: 'Sepatu Lama',
  price: 10000,
  image: 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/0410970b-5e8f-49ae-b09c-aed707d47e5a/air-max-plus-shoes-mVwq4h.png',
 },
 {
  id: 3,
  title: 'Sepatu Baru Dong',
  price: 10000,
  image: 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/0410970b-5e8f-49ae-b09c-aed707d47e5a/air-max-plus-shoes-mVwq4h.png',
 },
 {
  id: 4,
  title: 'Test Sepatu',
  price: 10000,
  image: 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/0410970b-5e8f-49ae-b09c-aed707d47e5a/air-max-plus-shoes-mVwq4h.png',
 },
 {
  id: 5,
  title: 'Test Sepatu',
  price: 10000,
  image: 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/0410970b-5e8f-49ae-b09c-aed707d47e5a/air-max-plus-shoes-mVwq4h.png',
 },
];

export async function GET(request: NextRequest) {
 const { searchParams } = new URL(request.url);
 const id = searchParams.get('id');
 if (id) {
  const detailProduct = await retrieveDataById('product', id);
  if (detailProduct) {
   return NextResponse.json({ status: 200, message: 'success', data: detailProduct });
  }
  return NextResponse.json({ status: 404, message: 'Product not found', data: {} });
 }

 const products = await retrieveData('product');
 return NextResponse.json({ status: 200, message: 'success', data: products });
}
