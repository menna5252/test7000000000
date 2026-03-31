'use client'
import { Button } from '@/components/ui/button'
import { deleteNoteFn } from '@/lib/actions/delete-notes.action';
import React from 'react'
import { toast } from 'sonner';

export default function DeleteNote({id}:{id:string}) {
    async function handleDelNote(){
        
          try{
            const response  = await deleteNoteFn(id)
          console.log('delete',response);
    
          if(response?.msg=='done'){
            toast.success('note DELETED successfully')
     
        
         
          }
         
          
          }
          catch(error){
            console.log(error);
            toast.error((error as Error)?.message||'something went wrong')
          }
    
        }
  return (
    <Button variant="destructive" onClick={handleDelNote}>Delete</Button>
  )
}
