"use client"
import React from 'react'
import SideNav from '../../_components/SideNav'
import DocumentEditorSection from '../../_components/DocumentEditorSection'
import { useParams } from 'next/navigation';

function WorkspaceDocument() {
  const params = useParams();
  return (
    <div>
        {/* Side Nav */}
      <div className="">
        <SideNav params={params}/>
      </div>
      {/* Document */   }
      <div className="md:ml-72">
        <DocumentEditorSection params={params} />
      </div>
    </div>
  )
}

export default WorkspaceDocument
