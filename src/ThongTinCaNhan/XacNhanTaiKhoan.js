import "./XacNhanTaiKhoan.scss";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import {
    getAllTaiKhoan,
    updateTaiKhoan,
    getttShop,
    getTaiKhoan,
    updatettShop,
} from "../redux/apiRequest";
const XacNhanTaiKhoan = () => {
    const { tenVietTat, idShop, idCtv, tenCtv, sdtCtv } = useParams();
    const taiKhoan = useSelector(
        (state) => state?.taiKhoan?.taiKhoan?.taiKhoan?.taiKhoan
    );
    const allTaiKhoan = useSelector(
        (state) => state?.taiKhoan?.taiKhoan?.allTaiKhoan?.allTaiKhoan
    );
    const ttShop = useSelector((state) => state.ttShop.ttShop.ttShop?.shop);
    const [loading, setloading] = useState(0);
    const [loading2, setloading2] = useState(0);
    const [soTienCong, setsoTienCong] = useState(0);
    const [soTienTru, setsoTienTru] = useState(0);
    const [noiDungCong, setnoiDungCong] = useState("");
    const [noiDungTru, setnoiDungTru] = useState("");
    const dispatch = useDispatch();
    useEffect(() => {
        getAllTaiKhoan(dispatch);
    }, [loading2]);
    const VND = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
    });
    const d = new Date();
    const gioPhut = `${d.getHours()}h${d.getMinutes()}`;
    const ngayThang = `${d.getDate()}/${d.getMonth()}/${d.getFullYear()}`;
    const handleChiTietTk = (id) => {
        setloading2(2);
        getTaiKhoan(id, dispatch);
        getttShop(id, dispatch);
    };
    console.log("taiKhoan", taiKhoan);
    console.log("allTaiKhoan", allTaiKhoan);
    const handleXacNhan = () => {
        const allgdVao = taiKhoan?.LichsuGiaoDich?.gdVao;
        const gdVaoKhac = allgdVao.filter((item) => item !== allgdVao[0]);
        const newTaiKhoan = {
            NapTien: +taiKhoan?.NapTien,
            XacNhanNapTien: "Thành Công",
            LichsuGiaoDich: {
                gdVao: [
                    {
                        thoiGian: `${ngayThang} ${gioPhut}`,
                        soTien: +taiKhoan?.NapTien,
                        noiDung: "Chuyển Khoản NH",
                        xacNhan: "Thành Công",
                    },
                    ...gdVaoKhac,
                ],
                gdRa: taiKhoan?.LichsuGiaoDich?.gdRa,
            },
            // ThongTinThem: {
            //     TenShop: ttShop?.TenShop,
            //     sdtShop: ttShop?.sdtShop,
            //     BaoCaoKD: [
            //         {
            //             thoiGian: "",
            //             noiNhan: "",
            //             doanhThu: "",
            //             chiPhi: "",
            //         },
            //     ],
            // },
            user: ttShop?._id,
        };
        console.log("newTaiKhoan", newTaiKhoan);
        updateTaiKhoan(newTaiKhoan, taiKhoan?._id, dispatch);
        const id = ttShop._id;
        const newShop = {
            cash: +ttShop?.cash + +taiKhoan?.NapTien,
        };
        console.log("newShop", newShop);
        updatettShop(newShop, id, dispatch, setloading);
        setloading(2);
    };
    const handleCongTk = () => {
        const newTaiKhoan = {
            LichsuGiaoDich: {
                gdVao: [
                    {
                        thoiGian: `${ngayThang} ${gioPhut}`,
                        soTien: +soTienCong,
                        noiDung: "Fabysa KM",
                        xacNhan: "Thành Công",
                    },
                    ...taiKhoan?.LichsuGiaoDich?.gdVao,
                ],
                gdRa: taiKhoan?.LichsuGiaoDich?.gdRa,
            },
            // ThongTinThem: {
            //     TenShop: ttShop?.TenShop,
            //     sdtShop: ttShop?.sdtShop,
            //     BaoCaoKD: [
            //         {
            //             thoiGian: "",
            //             noiNhan: "",
            //             doanhThu: "",
            //             chiPhi: "",
            //         },
            //     ],
            // },
            user: ttShop?._id,
        };
        console.log("newTaiKhoan", newTaiKhoan);
        updateTaiKhoan(newTaiKhoan, taiKhoan?._id, dispatch);
        const id = ttShop._id;
        const newShop = {
            cash: +ttShop?.cash + +soTienCong,
        };
        console.log("newShop", newShop);
        updatettShop(newShop, id, dispatch, setloading);
        setloading(2);
    };
    const handletruTk = () => {
        const newTaiKhoan = {
            LichsuGiaoDich: {
                gdVao: taiKhoan?.LichsuGiaoDich?.gdVao,
                gdRa: [
                    {
                        thoiGian: `${ngayThang} ${gioPhut}`,
                        soTien: soTienTru,
                        noiDung: "Cộng TK Sai",
                        xacNhan: "Thành Công",
                    },
                    ...taiKhoan?.LichsuGiaoDich?.gdRa,
                ],
            },
            // ThongTinThem: {
            //     TenShop: ttShop?.TenShop,
            //     sdtShop: ttShop?.sdtShop,
            //     BaoCaoKD: [
            //         {
            //             thoiGian: "",
            //             noiNhan: "",
            //             doanhThu: "",
            //             chiPhi: "",
            //         },
            //     ],
            // },
            user: ttShop?._id,
        };
        console.log("newTaiKhoan", newTaiKhoan);
        updateTaiKhoan(newTaiKhoan, taiKhoan?._id, dispatch);
        const id = ttShop._id;
        const newShop = {
            cash: ttShop?.cash - soTienTru,
        };
        console.log("newShop", newShop);
        updatettShop(newShop, id, dispatch, setloading);
        setloading(2);
    };
    const handleDinhDangSo = (data) => {
        const n = +data;
        return n.toFixed(0).replace(/./g, function (c, i, a) {
            return i > 0 && c !== "," && (a.length - i) % 3 === 0 ? "." + c : c;
        });
    };
    return (
        <div className="view">
            <div className="mobile">
                {loading2 === 0 && (
                    <div className="XacNhanTaiKhoan-ConTaiNer">
                        <div className="quayLai-tieuDe">
                            <a
                                href={`/ca-nhan/${tenVietTat}/${idShop}/a/${idCtv}/${tenCtv}/${sdtCtv}`}
                                className="quayLai"
                            >
                                <i className="fa fa-angle-double-left"></i>Quay
                                Lại
                            </a>
                            <div className="tieuDe">Xác Nhận Tài Khoản</div>
                        </div>
                        <div className="allTaiKhoan">
                            <div className="ds">Danh Sách Tài Khoản</div>
                            {allTaiKhoan &&
                                allTaiKhoan.map((item, index) => {
                                    return (
                                        <div
                                            onClick={() =>
                                                handleChiTietTk(item?.user)
                                            }
                                            className="thongTinTK"
                                            key={index}
                                        >
                                            <div className="tenShop">
                                                {item?.ThongTinThem?.TenShop}
                                            </div>
                                            <div className="sdtShop">
                                                {item?.ThongTinThem?.sdtShop}
                                            </div>
                                            <div className="soTien">
                                                {VND.format(item?.NapTien)}
                                            </div>
                                        </div>
                                    );
                                })}
                        </div>
                    </div>
                )}
                {loading2 === 2 && (
                    <div className="chiTietTk">
                        <div className="quayLai-tieuDe">
                            <div
                                onClick={() => setloading2(0)}
                                className="quayLai"
                            >
                                <i className="fa fa-angle-double-left"></i>Quay
                                Lại
                            </div>
                            <div className="tieuDe">Chi Tiết Tài Khoản</div>
                            <div className="taiKhoanShop">
                                {handleDinhDangSo(ttShop?.cash)}&#160;
                                <i
                                    className="fab fa-empire"
                                    style={{ color: "#ef9b0f" }}
                                ></i>
                            </div>
                        </div>
                        <div className="chiTietTaiKhoan-container">
                            <div className="taiKhoan">
                                <div className="ten">
                                    {taiKhoan?.ThongTinThem?.TenShop}
                                </div>
                                <div className="soTien">
                                    {VND.format(taiKhoan?.NapTien)}
                                </div>
                                <div
                                    onClick={() => handleXacNhan()}
                                    className="xacNhan3"
                                >
                                    Xác Nhận
                                </div>
                            </div>

                            <div className="khuyenMai-input">
                                <div className="tieuDeKm">Khuyến Mại</div>
                                <div className="input-xacNhan">
                                    <input
                                        onChange={(e) =>
                                            setsoTienCong(e.target.value)
                                        }
                                        className="input"
                                        placeholder="Nhập số tiền"
                                    />
                                    <div className="noiDung">Fabysa KM</div>
                                    <div
                                        onClick={() => handleCongTk()}
                                        className="xacNhan2"
                                    >
                                        Cộng TK
                                    </div>
                                </div>
                                <div className="tieuDeKm">Trừ Tài Khoản</div>
                                <div className="input-xacNhan">
                                    <input
                                        onChange={(e) =>
                                            setsoTienTru(e.target.value)
                                        }
                                        className="input"
                                        placeholder="Nhập số tiền"
                                    />
                                    <div className="noiDung">Cộng TK Sai</div>
                                    <div
                                        onClick={() => handletruTk()}
                                        className="xacNhan2"
                                    >
                                        Trừ TK
                                    </div>
                                </div>
                            </div>
                            <div className="lichSu-container">
                                <div className="tieuDe">Lịch Sử Giao Dịch</div>
                                <div className="tienVao-tienRa">
                                    <div className="tienVao">
                                        <div className="tieuDe2">GD Vào</div>

                                        <div className="allGiaoDich">
                                            {taiKhoan?.LichsuGiaoDich?.gdVao &&
                                                taiKhoan?.LichsuGiaoDich?.gdVao
                                                    ?.length !== 0 &&
                                                taiKhoan?.LichsuGiaoDich?.gdVao?.map(
                                                    (item, index) => {
                                                        return (
                                                            <div
                                                                className="chiTiet"
                                                                key={index}
                                                            >
                                                                <div className="thoiGian">
                                                                    {item?.thoiGian.slice(
                                                                        0,
                                                                        10
                                                                    )}
                                                                    <br />
                                                                    {item?.thoiGian.slice(
                                                                        11,
                                                                        19
                                                                    )}
                                                                </div>
                                                                <div className="soTien">
                                                                    {VND.format(
                                                                        item?.soTien
                                                                    )}
                                                                </div>
                                                                <div className="noiDung">
                                                                    {
                                                                        item?.noiDung
                                                                    }
                                                                </div>
                                                                {item?.xacNhan ===
                                                                "Thành Công" ? (
                                                                    <div className="thanhCong">
                                                                        {
                                                                            item?.xacNhan
                                                                        }
                                                                    </div>
                                                                ) : (
                                                                    <div className="xacNhan">
                                                                        {
                                                                            item?.xacNhan
                                                                        }
                                                                    </div>
                                                                )}
                                                            </div>
                                                        );
                                                    }
                                                )}
                                        </div>
                                    </div>
                                    <div className="tienVao">
                                        <div className="tieuDe2">GD Ra</div>
                                        <div className="allGiaoDich">
                                            {taiKhoan?.LichsuGiaoDich?.gdRa &&
                                            taiKhoan?.LichsuGiaoDich?.gdRa
                                                ?.length !== 0 ? (
                                                taiKhoan?.LichsuGiaoDich?.gdRa?.map(
                                                    (item, index) => {
                                                        return (
                                                            <div
                                                                className="chiTiet"
                                                                key={index}
                                                            >
                                                                <div className="thoiGian">
                                                                    {item?.thoiGian.slice(
                                                                        0,
                                                                        10
                                                                    )}
                                                                    <br />
                                                                    {item?.thoiGian.slice(
                                                                        11,
                                                                        19
                                                                    )}
                                                                </div>
                                                                <div className="soTien">
                                                                    {VND.format(
                                                                        item?.soTien
                                                                    )}
                                                                </div>
                                                                <div className="noiDung">
                                                                    {
                                                                        item?.noiDung
                                                                    }
                                                                </div>
                                                                {item?.xacNhan ===
                                                                "Thành Công" ? (
                                                                    <div className="thanhCong">
                                                                        {
                                                                            item?.xacNhan
                                                                        }
                                                                    </div>
                                                                ) : (
                                                                    <div className="xacNhan">
                                                                        {
                                                                            item?.xacNhan
                                                                        }
                                                                    </div>
                                                                )}
                                                            </div>
                                                        );
                                                    }
                                                )
                                            ) : (
                                                <div>Trống</div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <div className="pc">
                <div className="XacNhanTaiKhoan-ConTaiNer">XacNhanTaiKhoan</div>
            </div>
        </div>
    );
};
export default XacNhanTaiKhoan;
