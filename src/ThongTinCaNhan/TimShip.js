import "./TimShip.scss";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import {
    getDonHangShip,
    getDonHang,
    updateDonHang,
    updateTaiKhoan,
    getTaiKhoan,
} from "../redux/apiRequest";
const TimShip = () => {
    const { tenVietTat, idShop, idCtv, tenCtv, sdtCtv } = useParams();
    const dispatch = useDispatch();
    const myDetail = useSelector((state) => state.post.post?.myDetail);
    const user = useSelector((state) => state.auth.login.currentUser);
    const [trangThaiDH, settrangThaiDH] = useState("ĐH Tìm Ship");
    const [skip, setskip] = useState(0);
    const [loading, setloading] = useState(0);
    const [thongTinDh, setthongTinDh] = useState();
    const allDonHang2 = useSelector(
        (state) => state.donHang.donHang.alldonHang?.allDonHang
    );
    const [allDonHang, setallDonHang] = useState([]);
    const [Tongtien, setTongtien] = useState();
    const VND = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
    });
    console.log("thongTinDh", thongTinDh);
    console.log("Tongtien", Tongtien);
    useEffect(() => {
        if (allDonHang2 && allDonHang2?.length !== 0) {
            setallDonHang(allDonHang2);
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
        if (trangThaiDH === "ĐH Tìm Ship") {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((position) => {
                    const kinhDo = position.coords.latitude;
                    const viDo = position.coords.longitude;
                    const idShop = "";
                    const sdtCtv = "";
                    const sdtKhachHang = "";
                    const sdtOrder = "";
                    const sdtXuLyDon = "";
                    const sdtGiaoHang = "";
                    const sdtThuTien = "";
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
                        dispatch
                    );
                });
            }
        } else {
            const idShop = "";
            const sdtCtv = "";
            const sdtKhachHang = "";
            const sdtOrder = "";
            const sdtXuLyDon = "";
            const sdtGiaoHang = user?.username;
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
                dispatch
            );
        }
    }, [trangThaiDH, skip]);

    

    const dsMenuDonHang2 = [
        "ĐH Tìm Ship",
        "ĐH Nhận Ship",
        "ĐH Đang Ship",
        "ĐH Ship Chưa Thanh Toán",
        "ĐH Ship Đã Thanh Toán",
        "ĐH Huỷ",
    ];
    const dsMenuDonHang = dsMenuDonHang2.filter((item) => item !== trangThaiDH);
    useEffect(() => {
        if (thongTinDh?.ttThem?.khachHang?.nhomKhach === "Khách Lẻ") {
            const tinhtongtien = () => {
                let tt = 0;
                if (thongTinDh?.donHang?.length !== 0) {
                    thongTinDh?.donHang?.map((sp) => {
                        sp?.allDacDiemSP?.map((item) => {
                            tt += +item?.slMua * item?.giaKhuyenMai;
                        });
                    });
                }

                setTongtien(tt);
            };
            tinhtongtien();
        }
        if (thongTinDh?.ttThem?.khachHang?.nhomKhach === "Khách Sỉ") {
            const tinhtongtien = () => {
                let tt = 0;
                if (thongTinDh?.donHang?.length !== 0) {
                    thongTinDh?.donHang?.map((sp) => {
                        sp?.allDacDiemSP?.map((item) => {
                            tt += +item?.slMua * item?.giaSi;
                        });
                    });
                }

                setTongtien(tt);
            };
            tinhtongtien();
        }
        if (
            thongTinDh?.ttThem?.khachHang?.nhomKhach === "Khách Cộng Tác Viên"
        ) {
            const tinhtongtien = () => {
                let tt = 0;
                if (thongTinDh?.donHang?.length !== 0) {
                    thongTinDh?.donHang?.map((sp) => {
                        sp?.allDacDiemSP?.map((item) => {
                            tt += +item?.slMua * item?.giaCtv;
                        });
                    });
                }

                setTongtien(tt);
            };
            tinhtongtien();
        }
    }, [thongTinDh]);
    const handleChiTietDonHang = (item) => {
        setloading(2);
        setthongTinDh(item);
        settrangThaiDH("");
    };
    const handleNhanShip = () => {
        const newDonHang = {
            trangThaiDH: "ĐH Nhận Ship",
            sdtGiaoHang: myDetail?.soDienThoai,
            ttThem: {
                ...thongTinDh?.ttThem,
                ...{
                    ttGiaoHang: {
                        sdtNv: myDetail?.hoTen,
                        tenNv: myDetail?.soDienThoai,
                        phiShip: thongTinDh?.ttThem?.ttGiaoHang?.phiShip,
                    },
                },
            },
        };
        console.log("newDonHang", newDonHang);
        updateDonHang(newDonHang, thongTinDh?._id, dispatch);

        setthongTinDh({});
        setallDonHang([]);
        settrangThaiDH(thongTinDh?.trangThaiDH);
        setloading(0);
        setskip(0);
    };
    const handleQuayLai = () => {
        setloading(0);
        settrangThaiDH(thongTinDh?.trangThaiDH);
        setallDonHang([]);
        setskip(0);
    };
    const handleChonDonHang = (item) => {
        settrangThaiDH(item);
        setallDonHang([]);
        setskip(0);
    };

    return (
        <div className="view">
            <div className="mobile">
                {loading === 0 && (
                    <div className="TimShip-ConTaiNer">
                        <div className="quayLai-tieuDe">
                            <a
                                href={`/ca-nhan/${tenVietTat}/${idShop}/a/${idCtv}/${tenCtv}/${sdtCtv}`}
                                className="quayLai"
                            >
                                <i className="fa fa-angle-double-left"></i>Quay
                                Lại
                            </a>
                            <div className="tieuDe">Trung Tâm Đơn Hàng</div>
                        </div>
                        <div className="chonDonHang-phiNenTang">
                            <div className="chonDonHang-container">
                                <div className="tieuDe">Chọn Danh Mục</div>
                                <select
                                    className="chonDonHang"
                                    onChange={(e) =>
                                        handleChonDonHang(e.target.value)
                                    }
                                >
                                    <option>{trangThaiDH}</option>
                                    {dsMenuDonHang?.map((item) => {
                                        return (
                                            <option key={item}>{item}</option>
                                        );
                                    })}
                                </select>
                            </div>
                            <div className="chonDonHang-container">
                                Phí Nền Tảng: 500đ/Đơn Hàng
                            </div>
                        </div>
                        <div className="donHang-all">
                            <div className="ds">Danh Sách Đơn Hàng</div>
                            {allDonHang &&
                                allDonHang?.map((item, index) => {
                                    return (
                                        <div
                                            onClick={() =>
                                                handleChiTietDonHang(item)
                                            }
                                            key={index}
                                            className="donHang-container2"
                                        >
                                            <div className="ngayThang">
                                                {item?.createdAt.slice(0, 10)}
                                                &nbsp;
                                                {item?.createdAt.slice(
                                                    11,
                                                    19
                                                )}{" "}
                                                &nbsp; - &nbsp;{" "}
                                                {VND.format(
                                                    item?.ttThem?.ttGiaoHang
                                                        ?.phiShip
                                                )}
                                            </div>
                                            <div className="noiGui-diaChi">
                                                <div className="noiGui">
                                                    Nơi Gửi
                                                </div>
                                                <div className="diaChi">
                                                    {item?.thonXomBan},&nbsp;
                                                    {item?.xaBan},&nbsp;
                                                    {item?.huyenBan},&nbsp;{" "}
                                                    {item?.tinhBan}
                                                </div>
                                                <div className="noiGui">
                                                    Nơi Nhận
                                                </div>
                                                <div className="diaChi">
                                                    {item?.thonXomMua},&nbsp;
                                                    {item?.xaMua},&nbsp;
                                                    {item?.huyenMua},&nbsp;
                                                    {item?.tinhMua}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                        </div>
                    </div>
                )}
                {loading === 2 && (
                    <div className="chiTietDonHang-ConTaiNer">
                        <div className="quayLai-tieuDe">
                            <div
                                onClick={() => handleQuayLai()}
                                className="quayLai"
                            >
                                <i className="fa fa-angle-double-left"></i>Quay
                                Lại
                            </div>
                            <div className="tieuDe">Chi Tiết Đơn Hàng</div>
                        </div>
                        <div className="chiTiet">
                            <div className="phiShip">
                                Phí Ship : &nbsp;
                                {VND.format(
                                    thongTinDh?.ttThem?.ttGiaoHang?.phiShip
                                )}
                            </div>
                            <div className="tienCoc">
                                Tiền Cọc :&nbsp;
                                {VND.format(Tongtien)}
                            </div>
                            <div className="noiGui-thongTin">
                                <div className="tieuDe">Nơi Gửi</div>
                                <div className="noiDung">
                                    Tên Shop :&nbsp;{thongTinDh?.tenShop}
                                </div>
                                <div className="noiDung">
                                    Số Điện Thoại :&nbsp;{thongTinDh?.sdtShop}
                                </div>
                                <div className="noiDung">
                                    Địa Chỉ : &nbsp;{thongTinDh?.thonXomBan}
                                    ,&nbsp;
                                    {thongTinDh?.xaBan},&nbsp;
                                    {thongTinDh?.huyenBan},&nbsp;
                                    {thongTinDh?.tinhBan}
                                </div>
                            </div>
                            <div className="noiGui-thongTin">
                                <div className="tieuDe">Nơi Nhận</div>
                                <div className="noiDung">
                                    Người Nhận :&nbsp;
                                    {
                                        thongTinDh?.ttThem?.khachHang
                                            ?.hoTenNguoiMua
                                    }
                                </div>
                                <div className="noiDung">
                                    Số Điện Thoại :&nbsp;
                                    {thongTinDh?.sdtKhachHang}
                                </div>
                                <div className="noiDung">
                                    Địa Chỉ : &nbsp;{thongTinDh?.thonXomMua}
                                    ,&nbsp;
                                    {thongTinDh?.xaMua},&nbsp;
                                    {thongTinDh?.huyenMua},&nbsp;
                                    {thongTinDh?.tinhMua}
                                </div>
                            </div>

                            <div
                                onClick={() => handleNhanShip()}
                                className="nhanDon"
                            >
                                Nhận Đơn
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <div className="pc">
                <div className="TimShip-ConTaiNer">TimShip</div>
            </div>
        </div>
    );
};
export default TimShip;
