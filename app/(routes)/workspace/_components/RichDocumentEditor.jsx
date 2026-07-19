import React, { useEffect, useRef } from 'react'
import EditorJS from '@editorjs/editorjs';

function RichDocumentEditor() {

    const ref = useRef();
    let editor;

    useEffect(()=>{
        InitEditor();
    },[]);

    const InitEditor=()=>
    {
        if(!editor?.current){
            const editor = new EditorJS({
                holder:'editorjs'
            });
            ref.current=editor
        }
    }
  return (
    <div className="px-20 ml-10">
      <div id="editorjs"></div>
    </div>
  )
}

export default RichDocumentEditor
