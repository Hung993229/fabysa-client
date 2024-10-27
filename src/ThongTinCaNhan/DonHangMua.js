import "./DonHangMua.scss";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getDonHang } from "../redux/apiRequest";
import Loading from "../GiaoDienChung/Loading";
import { useEffect } from "react";
import ChiTietDonHangMua from "./ChiTietDonHangMua";

const DonHangMua = () => {
    const { tenVietTat, idShop, idCtv, tenCtv, sdtCtv } = useParams();
    const myDetail = useSelector((state) => state.post.post?.myDetail);
    console.log("myDetail", myDetail);
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
    const [sort, setsort] = useState(-1);
    const [thongTinDh, setthongTinDh] = useState();
    const [trangThaiDH, settrangThaiDH] = useState("ĐH Mới");
    useEffect(() => {
        if (allDonHang2 && allDonHang2?.length !== 0) {
            setallDonHang([...allDonHang, ...allDonHang2]);
        }
    }, [allDonHang2]);
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
        const limit = 20;
        const idShop = "";
        const sdtCtv = "";
        const sdtKhachHang = user?.username;
        const sdtOrder = "";
        const sdtXuLyDon = "";
        const sdtGiaoHang = "";
        const sdtThuTien = "";
        const kinhDo = "";
        const viDo = "";
        getDonHang(
            idShop,
            sdtCtv,
            sdtKhachHang,
            sdtOrder,
            sdtXuLyDon,
            sdtGiaoHang,
            sdtThuTien,
            kinhDo,
            viDo,
            skip,
            limit,
            trangThaiDH,
            sort,
            dispatch
        );
    }, [trangThaiDH, skip]);

    const handleChiTietDonHang = (item) => {
        setloading(2);
        setthongTinDh(item);
        settrangThaiDH("");
    };
    const dsMenuDonHang = [
        "ĐH Mới",
        "ĐH Chưa Thanh Toán",
        "ĐH Đã Thanh Toán",
        "ĐH Huỷ",
        "ĐH Tìm Ship Mới",
        "ĐH Ship Đã Nhận",
        "ĐH Đang Ship",
        "ĐH Ship Chưa Thanh Toán Về Shop",
        "ĐH Ship Đã Thanh Toán Về Shop",
        "ĐH Ship Huỷ Chưa Hoàn Hàng",
        "ĐH Ship Huỷ Đã Hoàn Hàng",
    ];
    const handleChonDonHang = (item) => {
        settrangThaiDH(item);
        setallDonHang([]);
        setskip(0);
    };
    const handleDinhDangSo = (data) => {
        const n = +data;
        return n.toFixed(0).replace(/./g, function (c, i, a) {
            return i > 0 && c !== "," && (a.length - i) % 3 === 0 ? "." + c : c;
        });
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
                        <div className="tieuDe">Đơn Hàng</div>
                    
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
                                        <div className="ngayThang-container2">
                                            <div className="ngayThang">
                                                 {new Date(
                                                    item?.createdAt
                                                )?.getDate()}/{new Date(
                                                    item?.createdAt
                                                )?.getMonth()}/{new Date(
                                                    item?.createdAt
                                                )?.getFullYear()}
                                                &nbsp;
                                                {new Date(
                                                    item?.createdAt
                                                )?.getHours()}
                                                h
                                                {new Date(
                                                    item?.createdAt
                                                )?.getMinutes()}
                                            </div>
                                        </div>

                                        <div className="donHang">
                                            <div className="SanPham">
                                                {item?.donHang?.map(
                                                    (item2, index) => {
                                                        return (
                                                            <div
                                                                key={index}
                                                                className="tenSp-dacDiem-soLuong"
                                                            >
                                                                <div className="tenSp">
                                                                    {
                                                                        item2?.tenSanPham
                                                                    }
                                                                </div>

                                                                {item2.allDacDiemSP?.map(
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
                                                                                        item3?.tenDacDiem
                                                                                    }
                                                                                </div>
                                                                                <div className="soLuong">
                                                                                    {
                                                                                        item3?.slMua
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
                                                {
                                                    item?.ttThem?.khachHang
                                                        ?.noiNhan
                                                }
                                            </div>
                                            <div className="tinhTrang">
                                                {(item?.trangThaiDH ===
                                                    "ĐH Mới" ||
                                                    item?.trangThaiDH ===
                                                        "ĐH Chưa Thanh Toán") && (
                                                    <div>ĐH Mới</div>
                                                )}
                                                {(item?.trangThaiDH ===
                                                    "ĐH Đang Ship" ||
                                                    item?.trangThaiDH ===
                                                        "ĐH Tìm Ship Mới" ||
                                                    item?.trangThaiDH ===
                                                        "ĐH Ship Đã Nhận") && (
                                                    <div>ĐH Đang Giao</div>
                                                )}
                                                {(item?.trangThaiDH ===
                                                    "ĐH Đã Thanh Toán" ||
                                                    item?.trangThaiDH ===
                                                        "ĐH Ship Chưa Thanh Toán Về Shop" ||
                                                    item?.trangThaiDH ===
                                                        "ĐH Ship Đã Thanh Toán Về Shop") && (
                                                    <div>ĐH Đã Nhận</div>
                                                )}
                                                {(item?.trangThaiDH ===
                                                    "ĐH Huỷ" ||
                                                    item?.trangThaiDH ===
                                                        "ĐH Ship Huỷ Chưa Hoàn Hàng" ||
                                                    item?.trangThaiDH ===
                                                        "ĐH Ship Huỷ Đã Hoàn Hàng") && (
                                                    <div>ĐH Huỷ</div>
                                                )}
                                            </div>
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
