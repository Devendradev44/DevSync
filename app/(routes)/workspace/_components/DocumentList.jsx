import Image from 'next/image'
import { useParams, useRouter } from 'next/navigation';
import React from 'react'
import DocumentOptions from './DocumentOptions';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '@/config/firebaseConfig';
import { toast } from 'sonner';

function DocumentList({documentList}) {

    const params = useParams();
    const router = useRouter();

    const DeleteDocument=async(docId)=>{
      await deleteDoc(doc(db,"WorkspaceDocuments",docId));
      toast("Document Deleted!");
    }
  return (
    <div>
      {documentList.map((doc,index)=>(
        <div key={doc.id} onClick={()=> router.push(`/workspace/${params?.workspaceid}/${doc.id}`)} className={`mt-3 p-2 px-3 hover:bg-gray-200 rounded-lg flex justify-between items-center cursor-pointer
        ${params?.documentid === doc.id ? "bg-blue-100" : ""}`}>
            <div className="flex items-center gap-2">
                {!doc.emoji&&<Image src={"/loopdocument.svg"} alt="Document Icon" width={20} height={20} />}
                <h2 className="flex gap-2">{doc?.emoji}{doc.documentName}</h2>
            </div>
            <DocumentOptions doc={doc} deleteDocument={(docId)=>DeleteDocument(docId)} />
        </div>
      ))}
    </div>
  )
}

export default DocumentList
