import React, { useState } from 'react'
import { Editor } from 'react-draft-wysiwyg'
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from 'draftjs-to-html';
import { Box } from '@mui/material';



export default function TextEditor() {
 const [editorState, setEditorState] = useState(EditorState.createEmpty()) 

 const handleEditStateChange = (editorState) => {
  setEditorState(editorState)
 }
 return (
  <Box sx={{border:'1px solid lightgrey'}}>
   <Editor
    editorState={editorState}
    toolbarClassName="toolbarClassName"
    wrapperClassName="wrapperClassName"
    editorClassName="richtext-editor-textarea"
    onEditorStateChange={handleEditStateChange}
   />
   {/* <textarea
    disabled
    value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
   /> */}
  </Box>
 )
}
