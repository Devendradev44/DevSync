import { Link2Icon, MoreVerticalIcon, PenBox, Trash2 } from 'lucide-react'
import React from 'react'
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

function DocumentOptions() {
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger>
            <MoreVerticalIcon className="h-4 w-4 " />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          
            <DropdownMenuItem className="flex gap-2"> 
              <Link2Icon className="h-4 w-4 " /> Share Link</DropdownMenuItem>
            <DropdownMenuItem className="flex gap-2">
              <PenBox className="h-4 w-4" />Rename</DropdownMenuItem>
            <DropdownMenuItem className="flex gap-2 text-red-500">
              <Trash2 className="h-4 w-4 hover:text-red-700" /> Delete</DropdownMenuItem>
         
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export default DocumentOptions
