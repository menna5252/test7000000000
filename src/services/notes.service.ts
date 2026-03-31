import { NotesResponse } from "@/interfaces/notes.interface";
import { getUserToken } from "@/utilities/server-utils";

export async function getUserNotes() {
        const token = await getUserToken();

  if(!token) {
    throw new Error('unauthenticated');
  }
  try{
    const response = await fetch(`${process.env.API_BASE_URL}/notes`,
     
     {
      headers: {
        token: `3b8ny__${token}`,
      },
      next:{tags:['notes']}
     })
     if(!response.ok){
      throw new Error('error fetching notes');
    }
    const data = await response.json();
    console.log(data);
    return data;
    }
    
     catch(error){
      console.log(error);
     }
}