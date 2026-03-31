import { Note } from "@/interfaces/notes.interface";
import { getUserNotes } from "@/services/notes.service";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import UserNotes from "./_components/notes/UserNotes";
import AddNote from "./_components/notes/AddNote";

export default async function Home() {
 const data = await getUserNotes();
 console.log(data?.notes);
  
  return (
 <>
  {data?.notes.length>0?(
     <ScrollArea className="h-[80vh]   w-full p-4">
   <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
    {data?.notes?.map((note: Note) => 
     (
     <UserNotes key={note._id} note={note} />
     )
    )}
   </div>
  </ScrollArea>
  ):'no notes found'}
  <AddNote/>
 </>
  );
}
