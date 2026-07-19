"use client";

import React, { useEffect, useRef, useState } from "react";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import Delimiter from "@editorjs/delimiter";
import Alert from "editorjs-alert";
import List from "@editorjs/list";
import NestedList from '@editorjs/nested-list';
import Checklist from '@editorjs/checklist'
import Embed from '@editorjs/embed';
import SimpleImage from 'simple-image-editorjs';
import Table from '@editorjs/table'
import CodeTool from '@editorjs/code';
import { TextVariantTune } from '@editorjs/text-variant-tune';
import { doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from '@/config/firebaseConfig';
import { useUser } from '@clerk/nextjs';
import Paragraph from '@editorjs/paragraph';
import GenerateAITemplate from './GenerateAITemplate';

function RichDocumentEditor() {
  const editorRef = useRef(null);
  const [documentOutput, setDocumentOutput] = useState([]);
  // const [isFetched,setIsFetched]=useState(false);

  let isFetched=false
    const SaveDocument = () => {
    console.log("UPDATE")
    ref.current.save().then(async (outputData) => {
      const docRef = doc(db, 'documentOutput', params?.documentid);
     
      await updateDoc(docRef, {
        output: JSON.stringify(outputData),
        editedBy: user?.primaryEmailAddress?.emailAddress
      })
    })
  }

  const GetDocumentOutput = () => {
    const unsubscribe = onSnapshot(doc(db, 'documentOutput', params?.documentid),
      (doc) => {
        if (doc.data()?.editedBy != user?.primaryEmailAddress?.emailAddress||isFetched==false)
          doc.data().editedBy&&editor?.render(JSON.parse(doc.data()?.output)); 
        isFetched=true  
      })
  }
  
  useEffect(() => {
    if (!editorRef.current) {
      editorRef.current = new EditorJS({
        onChange:(ap,event)=>{
            SaveDocument()
        },
        onReady:()=>{
            GetDocumentOutput()
        },
        holder: "editorjs",
        tools: {
          header: Header,
          delimiter: Delimiter,
          alert: {
            class: Alert,
            inlineToolbar: true,
            shortcut: 'CMD+SHIFT+A',
            config: {
                alertTypes: ['primary', 'secondary', 'info', 'success', 'warning', 'danger', 'light', 'dark'],
                defaultType: 'primary',
                messagePlaceholder: 'Enter something',
            },
            table: Table,
          list: {
            class: List,
            inlineToolbar: true,
            shortcut: 'CMD+SHIFT+L',
            config: {
              defaultStyle: 'unordered'
            },
          },
          checklist: {
            class: Checklist,
            shortcut: 'CMD+SHIFT+C',
            inlineToolbar: true,
          },
          image: SimpleImage,
          code: {
            class: CodeTool,
            shortcut: 'CMD+SHIFT+P'
          },
            },
        },
      });
    }

    return () => {
      if (editorRef.current?.destroy) {
        editorRef.current.destroy();
        editorRef.current = null;
      }
    };
  }, []);

  return (
    <div className="-ml-40">
      <div id="editorjs"></div>
    </div>
  );
}

export default RichDocumentEditor;