import { useEffect, useState } from 'react';

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const supabaseUrl = 'https://rpllnpgdbmsvfqxnybcp.supabase.co';

const supaPost = supabaseUrl + '/rest/v1/posts';

const secretKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJwbGxucGdkYm1zdmZxeG55YmNwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5Njc5NjE4OSwiZXhwIjoyMDEyMzcyMTg5fQ.0ue9i9JYMQKBX93LN2JGVYW0q1_UdKcAEHze7zLKlXM';

const supabase = createClient(supabaseUrl, secretKey);

const defaultProfil = 'https://rpllnpgdbmsvfqxnybcp.supabase.co/storage/v1/object/public/images/default-profile-picture-light.svg';

function SignUp(){

  const [gender, setGender] = useState('');
  
  const handleGenderChange = (e) => {
    const gender = e.target.value;

    setGender(gender);
    
    if(gender === 'male'){
        e.target.parentElement.classList.add('text-blue-400');
        e.target.parentElement.parentElement.children[1].classList.remove('text-pink-400');
        e.target.parentElement.parentElement.children[2].classList.remove('text-red-600');
    }
    else if(gender === 'female'){
        e.target.parentElement.classList.add('text-pink-400');
        e.target.parentElement.parentElement.children[0].classList.remove('text-blue-400');
        e.target.parentElement.parentElement.children[2].classList.remove('text-red-600');
    }
    else if(gender === 'other'){
        e.target.parentElement.classList.add('text-red-600');
        e.target.parentElement.parentElement.children[0].classList.remove('text-blue-400');
        e.target.parentElement.parentElement.children[1].classList.remove('text-pink-400');
    }
  };

    const addUsers = async(e) => {
        e.preventDefault();
        const usersSign = Object.fromEntries(new FormData(e.target));
        console.log(usersSign);

        debugger;
        const defaultImageResponse = await fetch(defaultProfil);
        const downloadImage = await defaultImageResponse.blob();

        // const imageRename = usersSign.nickname + '.' + downloadImage.type.slice(6,9);
        const imageRename = usersSign.nickname;
        const fileImage = new File([downloadImage] , imageRename, { type: downloadImage.type});

        console.log(fileImage);

        try{

            const { data , error } = await supabase
            .auth
            .signUp({
                email: usersSign.email,
                password: usersSign.password,
                options:{
                    data:{
                        nickname: usersSign.nickname,
                        password: usersSign.password,
                        gender: usersSign.gender,
                        avatar: imageRename,
                    },
                }
            })

            if(error){
                alert('olmadı kanka' , error);
            }else{
                data;
            }
    
            const userId = data.user.id;
            
            console.log(userId);
            console.log(data);
    
            const { usersData , error: insertError } = await supabase
            .from('users')
            .upsert({
                id: userId,
                nickname: usersSign.nickname,
                email: usersSign.email,
                password: usersSign.password,
                gender: usersSign.gender,
                avatar: imageRename,
            });

            await supabase
            .storage
            .from('images')
            .upload(imageRename , fileImage);
            
            if(insertError){
                alert('olmadıki :D' , insertError);
            }else{
                usersData;
            }
        }

        catch(error){
            alert('hop dedik');
        }

    }
    return(
    <>
        <div className="flex flex-col items-center">
            <h1 className='eksi-logo mb-2'>Kayıt Ol...</h1>
            <form onSubmit={addUsers} method="post" className='flex flex-col gap-5'>
                <input required type="text" name="nickname" placeholder='nickname' className='bg-slate-50 border-2 border-slate-200 py-1 px-3 rounded-lg' />
                <input required type="email" name="email" placeholder='e-mail' className='bg-slate-50 border-2 border-slate-200 py-1 px-3 rounded-lg' />
                <input required type="password" name="password" placeholder='Password' className='bg-slate-50 border-2 border-slate-200 py-1 px-3 rounded-lg' />
                    
                    <div className="flex max-lg:flex-col gap-4">

                        <label>
                            <input
                            className='mx-2 accent-blue-400'
                            type="radio"
                            value="male"
                            name='gender'
                            checked={gender === 'male'}
                            onChange={handleGenderChange}
                            required
                            />
                            Erkek
                        </label>

                        <label>
                            <input
                            className='mx-2 accent-pink-400'
                            type="radio"
                            value="female"
                            name='gender'
                            checked={gender === 'female'}
                            onChange={handleGenderChange}
                            required
                            />
                            Kadın
                        </label>

                        <label>
                            <input
                            className='mx-2'
                            type="radio"
                            value="other"
                            name='gender'
                            checked={gender === 'other'}
                            onChange={handleGenderChange}
                            required
                            />
                            undefined
                        </label>

                    </div>
                    
                <button className='bg-slate-100 px-5 py-1 mb-4 hover:bg-[#81C14B] rounded-md transition-all' type="submit">Gönder</button>
            </form>
        </div>
    </>
    )
}

export default SignUp