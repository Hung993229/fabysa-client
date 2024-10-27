import "./ThuNghiem.scss";
import React, { useState } from "react";
import XemAnh2 from "../GiaoDienChung/XemAnh";
import anhHaiHuoc from "../assets/images/anhHaiHuoc.jpg";
const ThuNghiem = () => {
    // xetmanHinh
    const chieuRongMH = window.innerWidth;
    // xetmanHinh

    // xemAnhFull
    const [xemAnhFull, setxemAnhFull] = useState("");
    const handleXemAnhFull = (anh) => {
        setxemAnhFull(anh);
    };
    // xemAnhFull
    return (
        <div className="view">
            {chieuRongMH <= "1023" && (
                <div className="mobile">
                    <div className="ThuNghiem-ConTaiNer">hghgh</div>
                    <div onClick={() => handleXemAnhFull(anhHaiHuoc)}>
                        Xem Anh
                    </div>
                </div>
            )}
            {chieuRongMH > "1023" && (
                <div className="pc">
                    <div className="ThuNghiem-ConTaiNer">pc</div>
                </div>
            )}
            {xemAnhFull && (
                <XemAnh2
                    xemAnhFull={xemAnhFull}
                    setxemAnhFull={setxemAnhFull}
                />
            )}
        </div>
    );
};
export default ThuNghiem;
