import React from 'react';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import axios from 'axios';

class CustomEditor extends React.Component {
  state = {
    editorState: EditorState.createEmpty(),
  };

  onEditorStateChange = (editorState) => {
    this.setState({ editorState });
  };

  handleSave = () => {
    const content = JSON.stringify(convertToRaw(this.state.editorState.getCurrentContent()));
    console.log('Saved content:', content);
  };

  handleSend = () => {
    const content = JSON.stringify(convertToRaw(this.state.editorState.getCurrentContent()));
    axios.post(`/reply/${this.props.threadId}`, {
      from: 'email@example.com',
      to: 'recipient@example.com',
      subject: 'Reply Subject',
      body: content
    }).then(response => console.log('Reply sent:', response))
      .catch(error => console.error(error));
  };

  render() {
    return (
      <div>
        <Editor
          editorState={this.state.editorState}
          toolbar={{
            options: ['inline', 'blockType', 'fontSize', 'list', 'textAlign', 'history'],
            inline: { inDropdown: true },
            list: { inDropdown: true },
            textAlign: { inDropdown: true },
            link: { inDropdown: true },
            history: { inDropdown: true },
            blockType: { inDropdown: true },
            fontSize: { inDropdown: true },
            embedded: { inDropdown: true },
            image: { inDropdown: true },
            remove: { inDropdown: true },
            customButtons: [
              {
                label: 'SAVE',
                onClick: this.handleSave
              },
              {
                label: 'Variables',
                onClick: () => alert('Insert Variable')
              }
            ]
          }}
          onEditorStateChange={this.onEditorStateChange}
        />
        <button onClick={this.handleSend}>Send</button>
      </div>
    );
  }
}

export default CustomEditor;
