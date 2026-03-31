'use server'

import { NotesResponse } from "@/interfaces/notes.interface";
import { getUserToken } from "@/utilities/server-utils";
import { revalidatePath, revalidateTag } from "next/cache";

export async function deleteNoteFn(id:string){
        const token = await getUserToken();

  if(!token) {
    throw new Error('unauthenticated');
  }
  try{
    const response = await fetch(`${process.env.API_BASE_URL}/notes/${id}`,
     {
      method:'delete',
      headers: {
        token: `3b8ny__${token}`,
        "Content-Type": 'application/json',
      },
     
     })
       const data = await response.json();
    console.log(data);
     if(!response.ok){
      throw new Error(data?.msg||'error delete notes');
  
    }
   if(data?.msg=='done'){
       revalidatePath('/');
   }
    return data;
    }
    
     catch(error){
      console.log(error);
      throw new Error((error as Error).message)
      
     }
}