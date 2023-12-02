import { useEffect, useState, createContext, useContext } from 'react';

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
const supabaseUrl = 'https://rpllnpgdbmsvfqxnybcp.supabase.co';
const supaPost = supabaseUrl + '/rest/v1/posts';
const secretKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJwbGxucGdkYm1zdmZxeG55YmNwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5Njc5NjE4OSwiZXhwIjoyMDEyMzcyMTg5fQ.0ue9i9JYMQKBX93LN2JGVYW0q1_UdKcAEHze7zLKlXM';
const supabase = createClient(supabaseUrl, secretKey);

function Login(){
   const [dataLog, setDataLog] = useState([]);

   const signUsers = async(e) => {
      e.preventDefault();
      const signData = Object.fromEntries(new FormData(e.target));

      console.log(signData);

      const { data , error} = await supabase
      .auth
      .signInWithPassword({
         email: signData.email,
         password: signData.password,
      })
      data && error
      if(data){
         console.log(data);
      }
      
      if(error){
         alert('parola yanlış');
      }
   }

   return (
   <>
      <div className="flex flex-col items-center">
         <form onSubmit={signUsers} method="post" className='flex flex-col gap-5'>
            <h1 className='eksi-logo mb-1 text-center'>Giriş Yap...</h1>
            <input type="email" name="email" placeholder='e-mail' className='bg-slate-50 border-2 border-slate-200 py-1 px-3 rounded-lg' />
            <input type="password" name="password" placeholder='Password' className='bg-slate-50 border-2 border-slate-200 py-1 px-3 rounded-lg' />
            <button className='bg-slate-100 px-5 py-1 mb-4 hover:bg-[#81C14B] rounded-md transition-all' type="submit">Gir Artık!</button>
         </form>
      </div>
   </>
   )
}

export default Login;