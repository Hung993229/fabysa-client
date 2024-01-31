import "./DoiTac.scss";
import { getttShop, updatettShop } from "../redux/apiRequest";

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
const DoiTac = () => {
    const { idShop } = useParams();
    const dispatch = useDispatch();
    const ttShop = useSelector((state) => state.ttShop.ttShop.ttShop?.shop);
    console.log("ttShop", ttShop);
    useEffect(() => {
        getttShop(idShop, dispatch);
    }, []);
    const [sodienThoai, setsodienThoai] = useState();
    const khachSi = ttShop?.khachSi;
    const khachCtv = ttShop?.khachCtv;

    useEffect(() => {
        const kiemtraSdtkhachSi = khachSi.find((item) => item === sodienThoai);
        const kiemtraSdtkhachCtv = khachCtv.find(
            (item) => item === sodienThoai
        );
        if (kiemtraSdtkhachSi) {
            alert("Số điện thoại đang là Khách Sỉ");
        }
        if (kiemtraSdtkhachCtv) {
            alert("Số điện thoại đang là Cộng Tác Viên");
        }
    }, [sodienThoai]);
    const handleThemKhachSi = () => {
        console.log("hhii");
        const kiemtraSdt = khachSi.find((item) => item === sodienThoai);
        console.log("hhii");
        if (kiemtraSdt || !sodienThoai) {
            alert("Số điện thoại đã thêm");
        } else {
            const id = ttShop._id;
            const newShop = {
                khachSi: [...khachSi, sodienThoai],
            };
            console.log("newShop", newShop);
            updatettShop(newShop, id, dispatch);
            setsodienThoai("");
        }
    };
    const handleXoaKhachSi = (item) => {
        console.log("hhii");
        console.log("item", item);
        const id = ttShop._id;
        const newShop = {
            khachSi: khachSi?.filter((item2) => item2 !== item),
        };
        console.log("newShop", newShop);
        updatettShop(newShop, id, dispatch);
    };
    const handleThemCtv = () => {
        const kiemtraSdt = khachCtv.find((item) => item === sodienThoai);
        console.log("hhii");

        if (kiemtraSdt || !sodienThoai) {
            alert("Số điện thoại đã thêm");
        } else {
            const id = ttShop._id;
            const newShop = {
                khachCtv: [...khachCtv, sodienThoai],
            };
            console.log("newShop", newShop);
            updatettShop(newShop, id, dispatch);
            setsodienThoai("");
        }
    };
    const handleXoaCtv = (item) => {
        console.log("item", item);
        console.log("hhii");
        const id = ttShop._id;
        const newShop = {
            khachCtv: khachCtv?.filter((item2) => item2 !== item),
        };
        console.log("newShop", newShop);
        updatettShop(newShop, id, dispatch);
    };

    return (
        <div className="DoiTac">
            <div>
                <div className="tieuDe">Danh Sách Đối Tác</div>
                <div className="danhSachTong">
                    <div className="chiaDoi">
                        <div>Khách Sỉ</div>
                        <div className="danhSach">
                            <input
                                onChange={(e) => setsodienThoai(e.target.value)}
                                placeholder="Nhập số điện thoại"
                            />
                            <div
                                onClick={() => handleThemKhachSi()}
                                className="them"
                            >
                                Thêm
                            </div>
                        </div>
                        <div className="danhSach">
                            <div>Số Điện Thoại</div>
                            <div className="xoa">Xoá</div>
                        </div>
                        {khachSi?.map((item, index) => {
                            return (
                                <div key={index} className="danhSach">
                                    <div>{item}</div>
                                    <div
                                        onClick={() => handleXoaKhachSi(item)}
                                        className="xoa"
                                    >
                                        X
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <div className="chiaDoi">
                        <div>Cộng Tác Viên</div>
                        <div className="danhSach">
                            <input
                                onChange={(e) => setsodienThoai(e.target.value)}
                                placeholder="Nhập số điện thoại"
                            />
                            <div
                                onClick={() => handleThemCtv()}
                                className="them"
                            >
                                Thêm
                            </div>
                        </div>
                        <div className="danhSach">
                            <div>Số Điện Thoại</div>
                            <div className="xoa">Xoá</div>
                        </div>
                        {khachCtv?.map((item, index) => {
                            return (
                                <div key={index} className="danhSach">
                                    <div>{item}</div>
                                    <div
                                        onClick={() => handleXoaCtv(item)}
                                        className="xoa"
                                    >
                                        X
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};
export default DoiTac;
