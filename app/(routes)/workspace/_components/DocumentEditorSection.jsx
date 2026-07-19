import React from 'react'
import DocumentHeader from './DocumentHeader'
import Documentinfo from './Documentinfo'
import RichDocumentEditor from './RichDocumentEditor'

function DocumentEditorSection({params}) {

  return (
    <div>
      {/* Header */}
      <DocumentHeader />

     {/* Document info */}
     <Documentinfo params={params} />

      {/* Rich Text Editor */}
      <RichDocumentEditor />
    </div>
  )
}

export default DocumentEditorSection
