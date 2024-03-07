import "./ChiTietSanPham.scss";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import {
    getttShop,
    getSanPham,
    getPost,
    registerDonHang,
    updatePost,
    updatettShop,
} from "../redux/apiRequest";
import QRCode from "react-qr-code";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import QrScanner from "qr-scanner";
const ChiTietSanPham = () => {
    const [data, setdata] = useState();
    console.log("");
    const [dataQrCode, setdataQrCode] = useState("");
    console.log("dataQrCode", dataQrCode);
    const [result, setResult] = useState("");
    const download = () => {
        const svg = document.getElementById("QRCode");
        const svgData = new XMLSerializer().serializeToString(svg);
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const img = new Image();
        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
            const pngFile = canvas.toDataURL("image/png");
            const downloadLink = document.createElement("a");
            // name image
            downloadLink.download = `${dataQrCode}`;
            downloadLink.href = `${pngFile}`;
            downloadLink.click();
        };
        img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
    };
    // read qr code
    const readCode = (e) => {
        console.log("e", e);
        const file = e.target.files[0];
        if (!file) {
            return;
        }
        QrScanner.scanImage(file, { returnDetailedScanResult: true })
            .then((result) => setResult(result.data))
            .catch((e) => console.log(e));
    };
    return (
        <div className="chitietsp-datHang">
            <CKEditor
                editor={ClassicEditor}
                data="<p>Hello from CKEditor&nbsp;5!</p>"
                onReady={(editor) => {
                    // You can store the "editor" and use when it is needed.
                    console.log("Editor is ready to use!", editor);
                }}
                onChange={(event, editor) => {
                    console.log(event);
                    setdata(editor.getData());
                }}
                onBlur={(event, editor) => {
                    console.log("Blur.", editor);
                }}
                onFocus={(event, editor) => {
                    console.log("Focus.", editor);
                }}
            />
            <div>Qrcode</div>
            <input onChange={(e) => setdataQrCode(e.target.value)} />
            <button onClick={download}>Download</button>
            <div>Write qr code</div>
            <div
                style={{
                    height: "auto",
                    margin: "0 auto",
                    maxWidth: 100,
                    width: "100%",
                }}
            >
                <QRCode
                    size={256}
                    style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                    value={dataQrCode}
                    viewBox={`0 0 256 256`}
                    id="QRCode"
                />
            </div>

            <div>Write qr code</div>
            {/* <button onClick={download}>Read QR Code</button> */}
            <input type="file" onChange={(e) => readCode(e)}></input>
            <p>result {result}</p>
        </div>
    );
};
export default ChiTietSanPham;
