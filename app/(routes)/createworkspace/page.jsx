"use client"
import Image from 'next/image'
import React from 'react'
import { useState } from 'react'

function CreateWorkspace() {
  const [coverImage, setCoverImage] = useState('/cover.png');
  return (
    <div className="p-10 md:px-36 lg:px-52 xl:px-80 py-20">
      <div>
        
        <div className="relative group">
          <h2 className="hidden absolute p-4 w-full h-full items-center justify-center
          group-hover:flex ">Change Cover</h2>
          <div>
          <Image src={coverImage} alt="Cover Image" width={400} height={400} 
            className="w-full h-[150px] object-cover rounded-t-xl" />

          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateWorkspace
