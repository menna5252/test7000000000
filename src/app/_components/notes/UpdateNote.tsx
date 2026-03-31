'use client';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Controller, useForm } from 'react-hook-form'
import { NoteformData, noteSchema } from '@/lib/schemas/note.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { addNote } from '@/lib/actions/add-notes.action'
import { useEffect, useState } from "react";
import { updateNote } from "@/lib/actions/update-notes.action";
import { Note } from "@/interfaces/notes.interface";




export default function UpdateNote({id,note}:{id:string,note:Note}) {
    const [open, setOpen] = useState(false);
     const {control,handleSubmit,reset,formState:{isSubmitting}} = useForm<NoteformData>({
        defaultValues: {
          
            title: '',
            content: '',
          
        },
        resolver:zodResolver(noteSchema)
    })

    
    async function onSubmit(data:NoteformData){
      console.log(data);
      try{
        const response  = await updateNote(data.title,data.content,id)
      console.log(response);

      if(response?.msg=='done'){
        toast.success('note added successfully')
 
     setOpen(false);
     
      }
     
      
      }
      catch(error){
        console.log(error);
        toast.error((error as Error)?.message||'something went wrong')
      }

    }
    useEffect(() => {
  if (open) {
    reset({
      title: note.title,
      content: note.content,
    });
  }
}, [open, note, reset]);
  return (
    <div>
     <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild className="mt-5  block mx-auto cursor-pointer">
        <Button >UPDATE Note</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>UPDATE Note</DialogTitle>
          
        </DialogHeader>
         <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
          
           <Controller
              name="title"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="title">
                    title
                  </FieldLabel>
                  <Input
                    {...field}
                    id="title"
                    aria-invalid={fieldState.invalid}
                    placeholder="title"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
           <Controller
              name="content"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="title">
                    content
                  </FieldLabel>
                  <Input
                    {...field}
                    id="content"
                    aria-invalid={fieldState.invalid}
                    placeholder="content"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

         
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button">Close</Button>
          </DialogClose>
          <Button type="submit">{isSubmitting?'loading...':'update note'}</Button>
        </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
</div>
  )
}
