'use client';
import { useState } from 'react';

export default function Template({ children }: { children: React.ReactNode }) {
 const [state, stateSet] = useState(0);
 return (
  <div>
   {/* <p>Template {state}</p>
   <button onClick={() => stateSet(state + 1)}>Klik</button> */}
   {children}
  </div>
 );
}
