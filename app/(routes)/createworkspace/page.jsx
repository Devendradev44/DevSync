"use client"
import CoverPicker from '@/app/_components/CoverPicker';
import EmojiPickerComponent from '@/app/_components/EmojiPickerComponent';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { db } from '@/config/firebaseConfig';
import { useAuth, useUser } from '@clerk/nextjs';
import { doc, setDoc } from 'firebase/firestore';
import { Loader2Icon, SmilePlus } from 'lucide-react';
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import React from 'react'
import { useState } from 'react'
import uuid64 from 'uuid64';

function CreateWorkspace() {
  const [coverImage, setCoverImage] = useState('/cover.png');
  const [workspaceName,setWorkspaceName] = useState("");
  const [emoji,setEmoji] = useState("");
  const {user} = useUser();
  const {orgId} = useAuth();
  const [loading,setLoading] = useState(false);
  const router = useRouter();

  /**
   * used to create a new workspace in the firestore database
   */
  const OnCreateWorkspace = async ()=>{
    setLoading(true);
    const workspaceId = Date.now();
    const result = await setDoc(doc(db,"Workspace",workspaceId.toString()),{
      workspaceName:workspaceName,
      emoji:emoji,
      coverImage:coverImage,
      createdBy:user?.primaryEmailAddress?.emailAddress,
      id:workspaceId,
      orgId:orgId?orgId:user?.primaryEmailAddress?.emailAddress
    });
    const docId = uuid64();
//     console.log("DB:", db);
//     console.log("Workspace ID:", workspaceId);
//     console.log("Doc ID:", docId);
    await setDoc(doc(db,"WorkspaceDocuments",docId.toString()),{
      workspaceId:workspaceId,
      createdBy:user?.primaryEmailAddress?.emailAddress,
      coverImage:null,
      emoji:null,
      id:docId,
      documentName:"Untitled Document",
      documentOutput:[]
    });

    await setDoc(doc(db,"documentOutput",docId.toString()),{
      docId:docId,
      output:[]
    });
    
    setLoading(false);
    router.replace(`/workspace/${workspaceId}/${docId}`);
  }

  return (
    <div className="p-10 md:px-36 lg:px-64 xl:px-96 py-28">
      <div className="shadow-2xl rounded-xl">
        {/* Cover Image */}
        <CoverPicker setNewCover={(v)=>setCoverImage(v)}>
          <div className="relative group cursor-pointer">
            <h2 className="hidden absolute p-4 w-full h-full items-center justify-center
            group-hover:flex ">Change Cover</h2>
            <div className="group-hover:opacity-40">
              <Image src={coverImage} alt="Cover Image" width={400} height={400} 
              className="w-full h-[180px] object-cover rounded-t-xl" />
            </div>
          </div>
        </CoverPicker>
        {/* Input Section */}
        <div className="p-12">
          <h2 className="font-medium text-xl">Create a new workspace</h2>
          <h2 className="text-sm mt-2">This is a shared space where you can collaborate with your team.</h2>

          <div className="mt-8 flex gap-2 items-center">
            <EmojiPickerComponent setEmojiIcon={(v)=>setEmoji(v)}>
                <Button variant="outline">
                  {emoji?emoji : <SmilePlus />}
                </Button>
            </EmojiPickerComponent>
            <Input placeholder="Workspace Name" onChange={(e) =>setWorkspaceName(e.target.value)} />
          </div>
          <div className="mt-7 flex justify-end">
            <Button disabled={!workspaceName?.length||loading} 
            onClick={OnCreateWorkspace}
            > Create {loading&&<Loader2Icon className="animate-spin ml-2" />}</Button>
            <Button variant="outline">Cancel</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateWorkspace
