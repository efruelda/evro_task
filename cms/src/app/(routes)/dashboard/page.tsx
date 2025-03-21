"use client"

import useAuthStore from '@/app/_stores/authStore';
import React from 'react';

export default function Dashboard(){
  const authStore = useAuthStore();
  
  console.log(authStore);
    return (
       <div>
            <h1>Dashboard</h1>
            <html>
          
            <body>
          
            </body>
            </html>

       </div>
    )
}