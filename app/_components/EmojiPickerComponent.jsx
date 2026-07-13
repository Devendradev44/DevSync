import EmojiPicker from 'emoji-picker-react'
import React, { useState } from 'react' 


function EmojiPickerComponent({children,setEmojiIcon}) {
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
  return (
    <div>
      <div onClick={() => setOpenEmojiPicker(!openEmojiPicker)}>
        {children}
      </div>
      {openEmojiPicker && (
        <div className="absolute z-10">
          <EmojiPicker 
          emojiStyle="instagram"
          onEmojiClick={(e)=>{
            setEmojiIcon(e.emoji)
            setOpenEmojiPicker(false)
          }} 
        />
        </div>
      )}
    </div>
  )
}

export default EmojiPickerComponent
