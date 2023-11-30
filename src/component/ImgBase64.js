import React, { Component } from "react";
import CommonUtils from "./CommonUtils";
import "./ImgBase64.scss";

class ImgBase64 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            previewImgURL: [],
            avatar: "",
        };
    }

    handleOnchangeImage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            console.log("base64 img", base64);
            let objectUrl = URL.createObjectURL(file);
            this.setState({
                previewImgURL: objectUrl,
                avatar: base64,
            });
        }
    };
    openPreviewImage = () => {
        if (!this.state.previewImgURL) return;
        this.setState({
            isOpen: true,
        });
    };
    render() {
        return (
            <>
                <div className="col-3">
                    <label className="anh-dai-dien">Anh Dai Dien</label>
                    <div className="preview-img-container">
                        <input
                            id="previewImg"
                            type="file"
                            hidden
                            onChange={(event) =>
                                this.handleOnchangeImage(event)
                            }
                        />
                        <label htmlFor="previewImg" className="label-upload">
                            Tai Anh
                            <i className="fas fa-upload"></i>
                        </label>
                        <div
                            className="preview-image"
                            style={{
                                backgroundImage: `url(${this.state.previewImgURL})`,
                            }}
                            onClick={() => this.openPreviewImage()}
                        ></div>
                    </div>
                </div>
            </>
        );
    }
}

export default ImgBase64;
