import Logo from '@/app/_components/Logo'
import { Button } from '@/components/ui/button'
import { db } from '@/config/firebaseConfig'
import { collection, query, where, onSnapshot, setDoc, doc } from 'firebase/firestore'
import { Bell, Loader2Icon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import DocumentList from './DocumentList'
import { useUser } from '@clerk/nextjs'
import uuid64 from 'uuid64'
import { useParams, useRouter } from 'next/navigation'

function SideNav() {
  const params = useParams();
  const [documentList,setDocumentList] = useState([]);
  const {user} = useUser();
  const [loading,setLoading] = useState(false);
  const router = useRouter();
    useEffect(() => {
    if (!params?.workspaceid) return;

    const unsubscribe = GetDocumentList();

    return () => unsubscribe();
  }, [params?.workspaceid]);

    const GetDocumentList = () => {
    const q = query(
      collection(db, "WorkspaceDocuments"),
      where("workspaceId", "==", Number(params?.workspaceid))
    );
    setDocumentList([]);

    return onSnapshot(q, (querySnapshot) => {
      const docs = [];

      querySnapshot.forEach((doc) => {
        docs.push(doc.data());
      });

      setDocumentList(docs);
    });
  };

      const CreateNewDocument =async () => {
        setLoading(true);
         const docId = uuid64();
            await setDoc(doc(db,"WorkspaceDocuments",docId.toString()),{
              workspaceId:Number(params?.workspaceid),
              createdBy:user?.primaryEmailAddress?.emailAddress,
              coverImage:null,
              emoji:null,
              id:docId,
              documentName:"Untitled Document",
              documentOutput:[]
            })
            
            setLoading(false);
            router.replace(`/workspace/${params?.workspaceid}/${docId}`);
    }
  return (
    <div className="h-screen md:w-72 hidden md:block fixed bg-blue-50 p-5 shadow-md">
      <div className="flex justify-between items-center">
        <Logo />
        <Bell className="h-5 w-5 text-gray-500 " />
      </div>
      <hr className="my-4"></hr>
      <div>
        <div className="flex justify-between items-center ">
            <h2 className="font-medium">Workspace Name</h2>
            <Button size="sm" onClick={CreateNewDocument}>
              {loading ? <Loader2Icon className="h-4 w-4 animate-spin" /> : '+'}
            </Button>
        </div>
      </div>

      {/* Document List */}

      <DocumentList documentList={documentList}  />

    </div>
  )
}

export default SideNav