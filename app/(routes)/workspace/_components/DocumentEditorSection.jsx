import React from 'react'
import DocumentHeader from './DocumentHeader'
import Documentinfo from './Documentinfo'

function DocumentEditorSection({params}) {

  return (
    <div>
      {/* Header */}
      <DocumentHeader />

     {/* Document info */}
     <Documentinfo params={params} />

      {/* Rich Text Editor */}

    </div>
  )
}

export default DocumentEditorSection
