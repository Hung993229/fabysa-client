import "./DonHangMua.scss";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {useParams } from "react-router-dom";
import { getDonHang } from "../redux/apiRequest";
import Loading from "../GiaoDienChung/Loading";
import { useEffect } from "react";
import ChiTietDonHangMua from "./ChiTietDonHangMua";

const DonHangMua = () => {
    const { tenVietTat, idShop, idCtv, tenCtv, sdtCtv } = useParams();
    const user = useSelector((state) => state.auth.login.currentUser);
    const allDonHang2 = useSelector(
        (state) => state.donHang.donHang.alldonHang?.allDonHang
    );
    const [allDonHang, setallDonHang] = useState([]);
    useEffect(() => {
        if (allDonHang2 && allDonHang2?.length !== 0) {
            setallDonHang([...allDonHang, ...allDonHang2]);
        }
    }, [allDonHang2]);
    const [loading, setloading] = useState(0);
    const dispatch = useDispatch();
    const [skip, setskip] = useState(0);
    const [thongTinDh, setthongTinDh] = useState();
    const [trangThaiDH, settrangThaiDH] = useState("Đơn Hàng Mới");
    useEffect(() => {
        const handleScroll = (e) => {
            const scrollHeight = e.target.documentElement.scrollHeight;
            const currentHeight =
                e.target.documentElement.scrollTop + window.innerHeight;
            if (currentHeight >= scrollHeight) {
                setskip(skip + 20);
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [allDonHang]);
    useEffect(() => {
        const idShop = user._id;
        const limit = 20;
        getDonHang(idShop, skip, limit, trangThaiDH, dispatch);
    }, [trangThaiDH, skip]);

    const handleChiTietDonHang = (item) => {
        setloading(2);
        setthongTinDh(item);
        settrangThaiDH("");
    };
    const dsMenuDonHang2 = [
        "Đơn Hàng Mới",
        "Đơn Hàng Đang Giao",
        "Đơn Hàng Hoàn Thành",
        "Đơn Hàng Huỷ",
    ];
    const dsMenuDonHang = dsMenuDonHang2.filter((item) => item !== trangThaiDH);
    const handleChonDonHang = (item) => {
        settrangThaiDH(item);
        setallDonHang([]);
        setskip(0);
    };
    return (
        <>
            {loading === 0 && trangThaiDH && (
                <div className="DonHangMua-container">
                    <div className="quayLai-tieuDe">
                        <a
                            href={`/ca-nhan/${tenVietTat}/${idShop}/a/${idCtv}/${tenCtv}/${sdtCtv}`}
                            className="quayLai"
                        >
                            <i className="fa fa-angle-double-left"></i>Quay Lại
                        </a>
                        <select
                            id="provinces"
                            onChange={(e) => handleChonDonHang(e.target.value)}
                        >
                            <option>{trangThaiDH}</option>
                            {dsMenuDonHang?.map((item) => {
                                return <option key={item}>{item}</option>;
                            })}
                        </select>
                    </div>
                    <div className="donHang-all">
                        {allDonHang &&
                            allDonHang?.map((item, index) => {
                                return (
                                    <div
                                        onClick={() =>
                                            handleChiTietDonHang(item)
                                        }
                                        key={index}
                                        className="donHang-container"
                                    >
                                        <div className="ngayThang">
                                            {item?.createdAt.slice(5, 10)}{" "}
                                            <br />
                                            {item?.createdAt.slice(11, 19)}
                                        </div>
                                        <div className="donHang">
                                            {item.donHang.map(
                                                (item2, index) => {
                                                    return (
                                                        <div
                                                            key={index}
                                                            className="tenSp-dacDiem-soLuong"
                                                        >
                                                            <div className="tenSp">
                                                                {
                                                                    item2.tenSanPham
                                                                }
                                                            </div>
                                                            {item2.allDacDiemSP.map(
                                                                (
                                                                    item3,
                                                                    index
                                                                ) => {
                                                                    return (
                                                                        <div
                                                                            key={
                                                                                index
                                                                            }
                                                                            className="dacDiem-soLuong"
                                                                        >
                                                                            <div className="dacDiem">
                                                                                {
                                                                                    item3.tenDacDiem
                                                                                }
                                                                            </div>
                                                                            <div className="soLuong">
                                                                                {
                                                                                    item3.slMua
                                                                                }
                                                                            </div>
                                                                        </div>
                                                                    );
                                                                }
                                                            )}
                                                        </div>
                                                    );
                                                }
                                            )}
                                        </div>
                                        <div className="soBan">
                                            {item?.khachHang?.noiNhan}
                                        </div>
                                        <div className="xemChiTiet">
                                            Xem <br /> Chi Tiết
                                        </div>
                                    </div>
                                );
                            })}
                        {allDonHang && allDonHang?.length === 0 && (
                            <div className="donHangTrong">Đơn hàng trống! </div>
                        )}
                    </div>
                </div>
            )}

            {loading === 1 && <Loading />}
            {(loading === 2 || !trangThaiDH) && (
                <ChiTietDonHangMua
                    loading={loading}
                    setloading={setloading}
                    thongTinDh={thongTinDh}
                    setthongTinDh={setthongTinDh}
                    trangThaiDH={trangThaiDH}
                    settrangThaiDH={settrangThaiDH}
                    setallDonHang={setallDonHang}
                    allDonHang={allDonHang}
                    setskip={setskip}
                    skip={skip}
                />
            )}
        </>
    );
};
export default DonHangMua;
