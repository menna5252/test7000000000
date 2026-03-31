'use server'

import { NotesResponse } from "@/interfaces/notes.interface";
import { getUserToken } from "@/utilities/server-utils";
import { revalidatePath, revalidateTag } from "next/cache";

export async function addNote(title:string,content:string){
        const token = await getUserToken();

  if(!token) {
    throw new Error('unauthenticated');
  }
  try{
    const response = await fetch(`${process.env.API_BASE_URL}/notes`,
     {
      method:'POST',
      headers: {
        token: `3b8ny__${token}`,
        "Content-Type": 'application/json',
      },
      body: JSON.stringify({title,content}),
     })
       const data = await response.json();
    console.log(data);
     if(!response.ok){
      throw new Error(data?.msg||'error add notes');
  
    }
   revalidatePath('/');
    return data;
    }
    
     catch(error){
      console.log(error);
      throw new Error((error as Error).message)
      
     }
}