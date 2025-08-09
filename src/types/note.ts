export interface Note{
    id : string,
    title: string,
    content : string ,
    createdAt : Date,
    updatedAt:Date
}

export interface NoteFormData {
    title:string,
    content:string
}
export interface NoteFormProps {
    note ?:Note ,
    onSave :(note : NoteFormData)=>void
    onCancel:()=>void

}

export interface NoteCardProps {
    note :Note ,
    onEdit :(note:Note)=>void ;
    onDelete :(id:string)=> void;
}