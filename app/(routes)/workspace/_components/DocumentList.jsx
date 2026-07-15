import Image from 'next/image'
import { useParams, useRouter } from 'next/navigation';
import React from 'react'

function DocumentList({documentList}) {
    const params = useParams();
    const router = useRouter();
  return (
    <div>
      {documentList.map((doc,index)=>(
        <div key={doc.id} onClick={()=> router.push(`/workspace/${params?.workspaceid}/${doc.id}`)} className={`mt-3 p-2 px-3 hover:bg-gray-200 rounded-lg cursor-pointer
        ${params?.documentid === doc.id ? "bg-blue-100" : ""}`}>
            <div className="flex items-center gap-2">
                {!doc.emoji&&<Image src={"/loopdocument.svg"} alt="Document Icon" width={20} height={20} />}
                <h2 className="flex gap-2">{doc?.emoji}{doc.documentName}</h2>
            </div>
        </div>
      ))}
    </div>
  )
}

export default DocumentList
