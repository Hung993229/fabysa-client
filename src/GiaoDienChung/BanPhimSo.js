import "./BanPhimSo.scss";
import React, { useState } from "react";
const BanPhimSo = (props) => {
    const {
        handleBanPhimSo,
        soThayThe,
        setsoThayThe,
        danhSachSo,
        setdanhSachSo,
        handleDinhDangSo,
    } = props;

    return (
        <div className="BanPhimSo-ConTaiNer">
            {/* <div className="input"
                    onClick={() =>
                        handleBanPhimSo(
                            {
                                tenSo: "Số Điện Thoại",
                                giaTri: "0",
                            },
                            ""
                        )
                    }
                >
                    {handleDinhDangSo(
                        danhSachSo?.find(
                            (item) => item?.tenSo === "Số Điện Thoại"
                        )?.giaTri || 0
                    )}
                </div> */}
            <div className="soSua-banPhimSo">
                <div className="tat-tenSo-xong">
                    <div className="tenSo">
                        {danhSachSo?.find(
                            (item) => item?.tenSo === soThayThe?.tenSo
                        )?.tenSo || 0}
                    </div>
                    <div onClick={() => setsoThayThe()} className="xong">
                        <i
                            className="fa fa-check"
                            style={{
                                color: "#",
                            }}
                        ></i>
                    </div>
                </div>
                <div className="giatriSo">
                    {handleDinhDangSo(
                        danhSachSo?.find(
                            (item) => item?.tenSo === soThayThe?.tenSo
                        )?.giaTri || 0
                    )}
                </div>
                <div className="banPhimSo">
                    <div onClick={() => handleBanPhimSo({}, "1")}>1</div>
                    <div onClick={() => handleBanPhimSo({}, "2")}>2</div>
                    <div onClick={() => handleBanPhimSo({}, "3")}>3</div>
                    <div onClick={() => handleBanPhimSo({}, "4")}>4</div>
                    <div onClick={() => handleBanPhimSo({}, "5")}>5</div>
                    <div onClick={() => handleBanPhimSo({}, "6")}>6</div>
                    <div onClick={() => handleBanPhimSo({}, "7")}>7</div>
                    <div onClick={() => handleBanPhimSo({}, "8")}>8</div>
                    <div onClick={() => handleBanPhimSo({}, "9")}>9</div>
                    <div onClick={() => handleBanPhimSo({}, "000")}>.000</div>
                    <div onClick={() => handleBanPhimSo({}, "0")}>0</div>
                    <div onClick={() => handleBanPhimSo({}, "xoa")}>
                        <i className="fas fa-chevron-circle-left"></i>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default BanPhimSo;
