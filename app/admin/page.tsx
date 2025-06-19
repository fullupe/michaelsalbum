"use client"

import { redirect, useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import AdminDashboard from '@/components/admin/AdminDashboard';
import { useEffect, useState } from 'react';

 export default function AdminPage() {
  //const session = await getSession();
  const router = useRouter();
  const [clientSession, setClientSession] = useState<any>(null);

  async function fetchClientSession() {
    const { data: { session } } = await supabase.auth.getSession();
    setClientSession(session);
  }
  //console.log('Client Session:', clientSession);
  
  useEffect(() => {
    fetchClientSession();
  }, []);
  
  // Redirect to login if not authenticated
  // if (clientSession) {
    return (
      <>
      
      {clientSession && 
        
        <AdminDashboard /> 
        
        
     // ):
      //null
       //redirect('/admin/login')

       //router.push("/admin")
      
    }
    </>
    )
      
  // }
 
}
//export default AdminPage