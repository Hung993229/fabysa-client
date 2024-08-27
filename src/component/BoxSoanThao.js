import "./BoxSoanThao.scss";
import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
const BoxSoanThao = (props) => {
    const { vanBan, setvanBan } = props;
    return (
        <div className="BoxSoanThao-ConTaiNer">
            <CKEditor
                editor={ClassicEditor}
                data={vanBan}
                onReady={(editor) => {
                    console.log("Editor is ready to use!", editor);
                }}
                onChange={(event, editor) => {
                    console.log(event);
                    setvanBan(editor.getData());
                }}
                onBlur={(event, editor) => {
                    console.log("Blur.", editor);
                }}
                onFocus={(event, editor) => {
                    console.log("Focus.", editor);
                }}
            />
        </div>
    );
};
export default BoxSoanThao;
