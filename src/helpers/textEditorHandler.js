import { useState } from 'react';
import { EditorState } from 'draft-js';

const useEditorState = (initialState = EditorState.createEmpty()) => {
 const [editorState, setEditorState] = useState(initialState);

 const onChange = (newEditorState) => {
  setEditorState(newEditorState);
 };

 return { editorState, onChange };
};

export default useEditorState;
