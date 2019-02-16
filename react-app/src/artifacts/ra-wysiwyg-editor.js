import React, {Component} from 'react';
import PropTypes from "prop-types";
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { convertToRaw } from 'draft-js';
import draftToMarkdown from 'draftjs-to-markdown';


export default class RaWysiwygEditor extends Component {


    onEditorStateChange(editorState){
        console.log(editorState.getCurrentContent());
        console.log(convertToRaw(editorState.getCurrentContent()));
        console.log(draftToMarkdown(convertToRaw(editorState.getCurrentContent())));
    };


    render() {
        const {content, enablePaper, classes, titlePanel} = this.props;
        return (
            <React.Fragment>
                <Editor
                    toolbarClassName="toolbarClassName"
                    wrapperClassName="wrapperClassName"
                    editorClassName="editorClassName"
                    onEditorStateChange={(event, xyz) =>{this.onEditorStateChange(event, xyz)} }
                />
            </React.Fragment>
        );
    }
}


RaWysiwygEditor.propTypes = {
    content: PropTypes.string,
    enablePaper: PropTypes.bool,
    titlePanel: PropTypes.node,
};

RaWysiwygEditor.defaultProps = {
    titlePanel: "",
    content: "",
    enablePaper: true,
};
