import CommonUtils from "./CommonUtils";
import "./ImgBase.scss";
import { useState } from "react";
const ImgBase = () => {
    const [avatar, setAvatar] = useState("");
    const [previewImgURL, setpreviewImgURL] = useState("");

    useEffect(() => {
        return () => {
            previewImgURL && URL.revokeObjectURL(previewImgURL.preview);
        };
    }, [previewImgURL]);
    const handleOnchangeImage = async (e) => {
        const file = e.target.files[0];
        let avatarBase64 = await CommonUtils.getBase64(file);

        file.preview = URL.createObjectURL(file);

        setAvatar(avatarBase64);
        setpreviewImgURL(file);
    };
    console.log("avatar", avatar);
    // openPreviewImage = () => {
    //     if (!this.state.previewImgURL) return;
    //     this.setState({
    //         isOpen: true,
    //     });
    // };
    return (
        <>
            <div className="col-3">
                <label className="anh-dai-dien">Anh Dai Dien</label>
                <div className="preview-img-container">
                    <input
                        id="previewImg2"
                        type="file"
                        hidden
                        onChange={handleOnchangeImage}
                    />
                    <label htmlFor="previewImg2" className="label-upload">
                        Tai Anh
                        <i className="fas fa-upload"></i>
                    </label>
                    <div
                        className="preview-image"
                        // style={{
                        //     backgroundImage: `url(${previewImgURL})`,
                        // }}
                    >
                        {previewImgURL && (
                            <img
                                src={previewImgURL.preview}
                                width="250px"
                                height="150px"
                            />
                        )}
                    </div>
                </div>
                <button type="submit" onClick={{}}>
                    Tạo Tài Khoản
                </button>
            </div>
        </>
    );
};
export default ImgBase;
