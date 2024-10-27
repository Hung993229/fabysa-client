import "./TimGiaoHang.scss";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import {
    registerDonHang,
    getDonHangShip,
    getDonHang,
    updateDonHang,
    updatePost,
    registerTaiKhoan,
    getTaiKhoan,
} from "../redux/apiRequest";
import {
    apiGetPublicProvinces,
    apiGetPublicDistrict,
    apiGetPublicWard,
} from "../redux/ApiProvince";
import BanPhimSo from "../GiaoDienChung/BanPhimSo";
const TimGiaoHang = () => {
    const { tenVietTat, idShop, idCtv, tenCtv, sdtCtv } = useParams();
    const dispatch = useDispatch();
    const myDetail = useSelector((state) => state.post.post?.myDetail);
    console.log("myDetail", myDetail);
    const user = useSelector((state) => state.auth.login.currentUser);
    const [trangThaiDH, settrangThaiDH] = useState("ĐH Tìm Ship Mới");
    const [skip, setskip] = useState(0);
    const [sort, setsort] = useState(-1);
    const [loading, setloading] = useState(0);
    const [phiNenTang, setphiNenTang] = useState(1000);
    const [thongTinDh, setthongTinDh] = useState();
    const [kinhDo, setkinhDo] = useState();
    const [viDo, setviDo] = useState();

    // const [tienHang, settienHang] = useState(0);
    // const [phiShip, setphiShip] = useState(0);
    const [tenGui, settenGui] = useState();
    const [sdtGui, setsdtGui] = useState();
    const [thonGui, setthonGui] = useState();
    const [xaGui, setxaGui] = useState();
    const [huyenGui, sethuyenGui] = useState();
    const [tinhGui, settinhGui] = useState();

    const [tenNhan, settenNhan] = useState("Nhập họ và tên");
    const [sdtNhan, setsdtNhan] = useState("Nhập số điện thoại");
    const [thonNhan, setthonNhan] = useState("Thôn/xóm/số nhà");
    const [xaNhan, setxaNhan] = useState("");
    const [huyenNhan, sethuyenNhan] = useState("");
    const [tinhNhan, settinhNhan] = useState("");

    useEffect(() => {
        if (myDetail && myDetail?.length !== 0) {
            settenGui(myDetail?.hoTen);
            setsdtGui(myDetail?.soDienThoai);
            setthonGui(myDetail?.thonXom);
            setxaGui(myDetail?.xa);
            sethuyenGui(myDetail?.huyen);
            settinhGui(myDetail?.tinh);
        }
    }, [myDetail]);
    // Provinces
    const [provinces, setProvinces] = useState([]);
    const [provincesID, setprovincesID] = useState();
    const [districts, setDistricts] = useState([]);
    const [districtID, setDistrictID] = useState();
    const [wards, setWards] = useState([]);
    // const [wardID, setWardID] = useState();

    // const [provinces2, setProvinces2] = useState([]);
    const [provincesID2, setprovincesID2] = useState();
    const [districts2, setDistricts2] = useState([]);
    const [districtID2, setDistrictID2] = useState();
    const [wards2, setWards2] = useState([]);
    // const [wardID2, setWardID2] = useState();
    //  Que Quan
    // Tinh
    useEffect(() => {
        const fetchPublicProvince = async () => {
            const response = await apiGetPublicProvinces();
            if (response?.status === 200) {
                setProvinces(response?.data.results);
            }
        };
        fetchPublicProvince();
    }, []);
    useEffect(() => {
        const fetchPublicDictrict = async () => {
            const response = await apiGetPublicDistrict(provincesID);
            if (response.status === 200) {
                setDistricts(response?.data.results);
            }
        };
        provincesID && fetchPublicDictrict();
        if (provincesID) {
            settinhGui(
                provinces?.find((item) => item.province_id === provincesID)
                    ?.province_name
            );
            sethuyenGui("Quận/Huyện");
            setxaGui("Xã/Phường");
        }
        !provincesID && setDistricts([]);
    }, [provincesID]);
    useEffect(() => {
        const fetchPublicWard = async () => {
            const response = await apiGetPublicWard(districtID);
            if (response.status === 200) {
                setWards(response?.data.results);
            }
        };
        districtID && fetchPublicWard();
        if (districtID) {
            sethuyenGui(
                districts?.find((item) => item.district_id === districtID)
                    ?.district_name
            );
            setxaGui("Xã/Phường");
        }

        !provincesID && setWards([]);
    }, [districtID]);

    useEffect(() => {
        const fetchPublicDictrict = async () => {
            const response = await apiGetPublicDistrict(provincesID2);
            if (response.status === 200) {
                setDistricts2(response?.data.results);
            }
        };
        provincesID2 && fetchPublicDictrict();
        if (provincesID2) {
            settinhNhan(
                provinces?.find((item) => item.province_id === provincesID2)
                    ?.province_name
            );
            sethuyenNhan("Quận/Huyện");
            setxaNhan("Xã/Phường");
        }
        !provincesID2 && setDistricts([]);
    }, [provincesID2]);
    useEffect(() => {
        const fetchPublicWard = async () => {
            const response = await apiGetPublicWard(districtID2);
            if (response.status === 200) {
                setWards2(response?.data.results);
            }
        };
        districtID2 && fetchPublicWard();
        if (districtID2) {
            sethuyenNhan(
                districts2?.find((item) => item.district_id === districtID2)
                    ?.district_name
            );
            setxaNhan("Xã/Phường");
        }

        !provincesID2 && setWards2([]);
    }, [districtID2]);

    // Que Quan
    // BanPhimSo
    const [soThayThe, setsoThayThe] = useState();
    const [danhSachSo, setdanhSachSo] = useState([]);
    const handleDinhDangSo = (data) => {
        const n = +data;
        return n.toFixed(0).replace(/./g, function (c, i, a) {
            return i > 0 && c !== "," && (a.length - i) % 3 === 0 ? "." + c : c;
        });
    };
    const handleBanPhimSo = (soCanThay, giaTriSoThayThe) => {
        if (!giaTriSoThayThe) {
            setsoThayThe(soCanThay);
            if (!danhSachSo?.find((item) => item?.tenSo === soCanThay?.tenSo)) {
                setdanhSachSo([soCanThay, ...danhSachSo]);
            }
        } else {
            if (soThayThe && danhSachSo && danhSachSo?.length !== 0) {
                if (giaTriSoThayThe !== "xoa") {
                    const timSoThayThe = danhSachSo.find(
                        (item) => item?.tenSo === soThayThe?.tenSo
                    );
                    const soThayThe2 = {
                        tenSo: soThayThe?.tenSo,
                        giaTri: timSoThayThe?.giaTri + giaTriSoThayThe,
                    };
                    setdanhSachSo(
                        danhSachSo?.map((item) =>
                            item?.tenSo === soThayThe?.tenSo ? soThayThe2 : item
                        )
                    );
                } else {
                    const timSoThayThe = danhSachSo.find(
                        (item) => item?.tenSo === soThayThe?.tenSo
                    );
                    const soThayThe2 = {
                        tenSo: soThayThe?.tenSo,
                        giaTri: timSoThayThe?.giaTri.slice(0, -1),
                    };
                    setdanhSachSo(
                        danhSachSo?.map((item) =>
                            item?.tenSo === soThayThe?.tenSo ? soThayThe2 : item
                        )
                    );
                }
            }
        }
    };
    // BanPhimSo
    const tienHang =
        +danhSachSo?.find((item) => item?.tenSo === "Tiền Hàng")?.giaTri || 0;
    const phiShip =
        +danhSachSo?.find((item) => item?.tenSo === "Phí Ship")?.giaTri || 0;

    const allDonHang2 = useSelector(
        (state) => state.donHang.donHang.alldonHang?.allDonHang
    );
    const [allDonHang, setallDonHang] = useState([]);
    const VND = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
    });
    console.log("thongTinDh", thongTinDh);
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
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                setkinhDo(position.coords.latitude);
                setviDo(position.coords.longitude);
            });
        }
    }, []);
    useEffect(() => {
        const limit = 20;
        const sdtCtv = "";
        const sdtKhachHang = "";
        const sdtOrder = "";
        const sdtXuLyDon = "";
        const sdtGiaoHang = "";
        const sdtThuTien = "";
        // const kinhDo = "";
        // const viDo = "";
        getDonHang(
            user?._id,
            sdtCtv,
            sdtKhachHang,
            sdtOrder,
            sdtXuLyDon,
            sdtGiaoHang,
            sdtThuTien,
            "",
            "",
            skip,
            limit,
            trangThaiDH,
            sort,
            dispatch
        );
    }, [trangThaiDH, skip]);

    const dsMenuDonHang = [
        "ĐH Tìm Ship Mới",
        "ĐH Ship Đã Nhận",
        "ĐH Đang Ship",
        "ĐH Ship Chưa Thanh Toán Về Shop",
        "ĐH Ship Đã Thanh Toán Về Shop",
        "ĐH Ship Huỷ Chưa Hoàn Hàng",
        "ĐH Ship Huỷ Đã Hoàn Hàng",
    ];
    const handleQuayLai = () => {
        settrangThaiDH(thongTinDh?.trangThaiDH);
        setloading(0);
        setallDonHang([]);
        setskip(0);
    };
    const handleChiTietDonHang = (item) => {
        setloading(2);
        setthongTinDh(item);
        settrangThaiDH("");
    };
    const handleChonDonHang = (item) => {
        settrangThaiDH(item);
        setallDonHang([]);
        setskip(0);
    };
    const handleDHTimShipMoi = () => {
        if (
            tenNhan !== "Nhập họ và tên" &&
            sdtNhan !== "Nhập số điện thoại" &&
            tinhNhan !== "" &&
            huyenNhan !== ""
        ) {
            const newDonHang = {
                tenShop: tenGui,
                sdtShop: sdtGui,
                donHang: "",
                idShop: user?._id,
                sdtCtv: "",
                sdtKhachHang: "",

                sdtOrder: "",
                sdtXuLyDon: "",
                sdtGiaoHang: "",
                sdtThuTien: "",

                soBan: "",

                thonXomMua: thonNhan,
                xaMua: xaNhan,
                huyenMua: huyenNhan,
                tinhMua: tinhNhan,

                kinhDo: kinhDo,
                viDo: viDo,

                thonXomBan: thonGui,
                xaBan: xaGui,
                huyenBan: huyenGui,
                tinhBan: tinhGui,

                trangThaiDH: "ĐH Tìm Ship Mới",

                ttThem: {
                    khachHang: {
                        hoTenNguoiMua: tenNhan,
                        sdtNguoiMua: sdtNhan,
                        ghiChuNguoiMua: "",
                        noiNhan: "Ship Tận Nơi",
                        soBan: "",
                        maBaoMat: "",
                        nhomKhach: "",
                    },
                    baoCao: {
                        doanhThu: +tienHang,
                        giaVon: 0,
                        phiNenTang: 0,
                        giamTru: 0,
                    },
                    stkShop: {
                        idNganHang:
                            myDetail?.ttThemUser?.nganHang?.maSoNganHang,
                        nganHang: myDetail?.ttThemUser?.nganHang?.tenNganHang,
                        soTaiKhoan:
                            myDetail?.ttThemUser?.nganHang?.taiKhoanNganHang,
                        tenChuTk:
                            myDetail?.ttThemUser?.nganHang?.chuTaiKhoanNganhang,
                        daCK: "chưa Chuyển",
                    },
                    ttGiaoHang: {
                        tenNv: "",
                        idNv: "",
                        sdtNv: "",
                        phiShip: +phiShip,
                        coc: "",
                    },
                },
                user: user?._id,
            };
            console.log("newDonHang", newDonHang);
            registerDonHang(newDonHang, dispatch);
            setloading(0);
            setallDonHang([]);
            setskip(0);
        } else {
            alert("Thiếu thông tin đơn hàng!");
        }
    };
    const handleDangShip = () => {
        const newDonHang = {
            trangThaiDH: "ĐH Đang Ship",
        };
        console.log("newDonHang", newDonHang);
        updateDonHang(newDonHang, thongTinDh?._id, dispatch);
        setallDonHang([]);
        settrangThaiDH(thongTinDh?.trangThaiDH);
        setloading(0);
        setskip(0);
    };
    const handleHuyDonShip = () => {
        const cauHoi = window.confirm("Huỷ Đơn Ship?");
        if (cauHoi) {
            const newDonHang = {
                trangThaiDH: "ĐH Ship Huỷ Đã Hoàn Hàng",
                sdtGiaoHang: myDetail?.soDienThoai,
                ttThem: {
                    ...thongTinDh?.ttThem,
                    ...{
                        ttGiaoHang: {
                            tenNv: myDetail?.hoTen,
                            idNv: myDetail?.user,
                            sdtNv: myDetail?.soDienThoai,
                            phiShip: thongTinDh?.ttThem?.ttGiaoHang?.phiShip,
                            coc: "Đã Cọc",
                        },
                    },
                },
            };
            console.log("newDonHang", newDonHang);
            updateDonHang(newDonHang, thongTinDh?._id, dispatch);
            setallDonHang([]);
            settrangThaiDH(thongTinDh?.trangThaiDH);
            setloading(0);
            setskip(0);
        }
    };
    const handleShipDaThanhToan = () => {
        if (myDetail?.cash > 1000) {
            const newDonHang = {
                trangThaiDH: "ĐH Ship Đã Thanh Toán Về Shop",
                ttThem: {
                    ...thongTinDh?.ttThem,
                    ...{
                        stkShop: {
                            ...thongTinDh?.ttThem?.stkShop,
                            daCK: "Shop Ok",
                        },
                    },
                },
            };
            console.log("newDonHang", newDonHang);
            updateDonHang(newDonHang, thongTinDh?._id, dispatch);
            const newShop = {
                cash: myDetail?.cash - 1000,
            };
            console.log("newShop", newShop);
            updatePost(newShop, myDetail._id, dispatch);
            const newTaiKhoan = {
                GDVao: "",
                GDRa: 1000,
                noiDungCK: "Phí Nền Tảng",
                xacNhanChuyenTien: "Thành Công",
                thongTinThem: {
                    tenChuTk: myDetail?.hoTen,
                    sdtChuTk: myDetail?.soDienThoai,
                },
                idChuTaiKhoan: myDetail?.user,
            };
            console.log("newTaiKhoan", newTaiKhoan);
            registerTaiKhoan(newTaiKhoan, dispatch);
            setallDonHang([]);
            settrangThaiDH(thongTinDh?.trangThaiDH);
            setloading(0);
            setskip(0);
        } else {
            alert("Cần thanh toán 1000 Fabysa Gold !");
        }
    };
    const handleShipDaHoanHang = () => {
        const newDonHang = {
            trangThaiDH: "ĐH Ship Huỷ Đã Hoàn Hàng",
        };
        updateDonHang(newDonHang, thongTinDh?._id, dispatch);
        setallDonHang([]);
        settrangThaiDH(thongTinDh?.trangThaiDH);
        setloading(0);
        setskip(0);
    };
    const handlePrint = () => {
        window.print();
    };
    //  Viet QR
    const nganHang = thongTinDh?.ttThem?.stkShop?.nganHang;
    const BANK_ID = thongTinDh?.ttThem?.stkShop?.idNganHang;
    const ACCOUNT_NO = thongTinDh?.ttThem?.stkShop?.soTaiKhoan;
    const TEMPLATE = "print";
    const AMOUNT =
        thongTinDh?.ttThem?.baoCao?.doanhThu -
        thongTinDh?.ttThem?.baoCao?.giamTru;
    const DESCRIPTION = `Hoá Đơn ${thongTinDh?.soBan}`;
    const ACCOUNT_NAME = thongTinDh?.ttThem?.stkShop?.tenChuTk;
    const qr = `https://img.vietqr.io/image/${BANK_ID}-${ACCOUNT_NO}-${TEMPLATE}.png?amount=${AMOUNT}&addInfo=${DESCRIPTION}&accountName=${ACCOUNT_NAME}`;
    // Viet QR

    return (
        <div className="view">
            <div className="mobile">
                {loading === 0 && (
                    <div className="TimGiaoHang-ConTaiNer">
                        <div className="quayLai-tieuDe">
                            <a
                                href={`/ca-nhan/${tenVietTat}/${idShop}/a/${idCtv}/${tenCtv}/${sdtCtv}`}
                                className="quayLai"
                            >
                                <i className="fa fa-angle-double-left"></i>Quay
                                Lại
                            </a>
                            <div className="tieuDe">Đơn Hàng</div>
                            {user ? (
                                <a
                                    href={`/tai-khoan/${tenVietTat || "a"}/${
                                        idShop || "a"
                                    }/a/${idCtv || "a"}/${tenCtv || "a"}/${
                                        sdtCtv || "a"
                                    }/${user?._id}`}
                                    className="taiKhoanShop"
                                >
                                    <i
                                        className="fa fa-plus"
                                        style={{ color: "#04aa6d" }}
                                    ></i>
                                    &#160;
                                    {handleDinhDangSo(myDetail?.cash)}
                                    &#160;
                                    <i
                                        className="fab fa-empire"
                                        style={{ color: "#ef9b0f" }}
                                    ></i>
                                </a>
                            ) : (
                                <div
                                    onClick={() =>
                                        alert("Đăng nhập để sử dụng!")
                                    }
                                    className="taiKhoanShop"
                                >
                                    <i
                                        className="fa fa-plus"
                                        style={{ color: "#04aa6d" }}
                                    ></i>
                                    &#160;
                                    {handleDinhDangSo(100000)}
                                    &#160;
                                    <i
                                        className="fab fa-empire"
                                        style={{ color: "#ef9b0f" }}
                                    ></i>
                                </div>
                            )}
                        </div>
                        <div className="phiNenTang">
                            Phí nền tảng: 1.000
                            <i
                                className="fab fa-empire"
                                style={{ color: "#ef9b0f" }}
                            ></i>
                            /Đơn Hàng
                        </div>
                        <div className="chonDanhMuc">
                            {dsMenuDonHang?.map((item) => {
                                return (
                                    <div
                                        key={item}
                                        onClick={() => handleChonDonHang(item)}
                                        className={
                                            item === trangThaiDH
                                                ? "daChon"
                                                : "chuaChon"
                                        }
                                    >
                                        {item}
                                    </div>
                                );
                            })}
                        </div>
                        {user && user?.length !== 0 ? (
                            <div
                                className="themDonHang"
                                onClick={() => setloading(3)}
                            >
                                <div className="icon">
                                    <i className="fas fa-ambulance"></i>
                                </div>

                                <div className="them">
                                    Thêm đơn hàng Ship mới?
                                </div>
                                <div className="chuyen">
                                    <i className="fas fa-arrow-right"></i>
                                </div>
                            </div>
                        ) : (
                            <div
                                className="themDonHang"
                                onClick={() => alert("Đăng nhập để sử dụng!")}
                            >
                                <div className="icon">
                                    <i className="fas fa-ambulance"></i>
                                </div>

                                <div className="them">
                                    Thêm đơn hàng Ship mới?
                                </div>
                                <div className="chuyen">
                                    <i className="fas fa-arrow-right"></i>
                                </div>
                            </div>
                        )}
                        <div className="donHang-all">
                            <div className="ds">Danh Sách Đơn Hàng</div>

                            {allDonHang && allDonHang?.length > 0 ? (
                                allDonHang?.map((item, index) => {
                                    return (
                                        <div
                                            onClick={() =>
                                                handleChiTietDonHang(item)
                                            }
                                            key={index}
                                            className="donHang-container2"
                                        >
                                            <div className="ngayThang-container">
                                                <div className="ngayThang">
                                                    {new Date(
                                                        item?.createdAt
                                                    )?.getDate()}
                                                    /
                                                    {new Date(
                                                        item?.createdAt
                                                    )?.getMonth()+1}
                                                    /
                                                    {new Date(
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
                                                <div className="kiemTra">
                                                    {item?.ttThem?.stkShop
                                                        ?.daCK ===
                                                        "Đã Chuyển" && (
                                                        <div className="daNhan">
                                                            Cần Xác Nhận
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="phi-coc-daNhan">
                                                <div className="coc">
                                                    Tiền Hàng :&nbsp;
                                                    {VND.format(
                                                        item?.ttThem?.baoCao
                                                            ?.doanhThu -
                                                            item?.ttThem?.baoCao
                                                                ?.giamTru
                                                    )}
                                                </div>
                                                <div className="phi">
                                                    Phí Ship :&nbsp;
                                                    {VND.format(
                                                        item?.ttThem?.ttGiaoHang
                                                            ?.phiShip
                                                    )}
                                                </div>
                                            </div>
                                            <div className="noiGui-diaChi">
                                                <div className="noiGui">
                                                    Nơi Gửi
                                                </div>
                                                <div className="diaChi">
                                                    {item?.thonXomBan},&nbsp;
                                                    {item?.xaBan},&nbsp;
                                                    {item?.huyenBan},&nbsp;
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
                                })
                            ) : (
                                <div className="trong">Trống!</div>
                            )}
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
                            <div
                                className="inHoaDon"
                                onClick={() => handlePrint()}
                            >
                                <i className="fa-solid fa-print"></i>
                            </div>
                        </div>
                        <div className="chiTiet">
                            <div className="nhan-coc">
                                <div className="phiShip">
                                    Nhận : &nbsp;
                                    {VND.format(
                                        thongTinDh?.ttThem?.ttGiaoHang?.phiShip
                                    )}
                                </div>
                                <div className="tienCoc">
                                    Tiền Cọc :&nbsp;
                                    {VND.format(
                                        thongTinDh?.ttThem?.baoCao?.doanhThu -
                                            thongTinDh?.ttThem?.baoCao?.giamTru
                                    )}
                                </div>
                            </div>
                            <div className="noiGui-thongTin">
                                <div className="tieuDe">Nơi Gửi</div>
                                <div className="noiDung">
                                    Tên Shop :&nbsp;{thongTinDh?.tenShop}
                                </div>
                                <a
                                    href={`tel:${thongTinDh?.sdtShop}`}
                                    className="noiDung"
                                >
                                    Số Điện Thoại :&nbsp;&nbsp;
                                    <i
                                        className="fa fa-phone-square"
                                        style={{ color: "#04aa6d" }}
                                    ></i>
                                    &nbsp;{thongTinDh?.sdtShop}
                                </a>
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
                                <a
                                    href={`tel:${thongTinDh?.ttThem?.khachHang?.sdtNguoiMua}`}
                                    className="noiDung"
                                >
                                    Số Điện Thoại :&nbsp;&nbsp;
                                    <i
                                        className="fa fa-phone-square"
                                        style={{ color: "#04aa6d" }}
                                    ></i>
                                    &nbsp;
                                    {thongTinDh?.ttThem?.khachHang?.sdtNguoiMua}
                                </a>
                                <div className="noiDung">
                                    Địa Chỉ : &nbsp;{thongTinDh?.thonXomMua}
                                    ,&nbsp;
                                    {thongTinDh?.xaMua},&nbsp;
                                    {thongTinDh?.huyenMua},&nbsp;
                                    {thongTinDh?.tinhMua}
                                </div>
                                <div className="soTien">
                                    Cần Thu = Tiền Hàng + Phí Ship = &nbsp;
                                    {VND.format(
                                        +thongTinDh?.ttThem?.baoCao?.doanhThu +
                                            +thongTinDh?.ttThem?.ttGiaoHang
                                                ?.phiShip -
                                            +thongTinDh?.ttThem?.baoCao?.giamTru
                                    )}
                                </div>
                            </div>
                        </div>
                        {thongTinDh?.trangThaiDH ===
                            "ĐH Ship Chưa Thanh Toán Về Shop" &&
                            thongTinDh?.ttThem?.stkShop && (
                                <div className="thanhToan-container">
                                    <div className="tieuDe">
                                        Thanh Toán Tiền Về Shop
                                    </div>
                                    <div className="noiDung">
                                        Ngân Hàng : &nbsp;
                                        {thongTinDh?.ttThem?.stkShop?.nganHang}
                                    </div>
                                    <div className="noiDung">
                                        Số Tài Khoản : &nbsp;
                                        {
                                            thongTinDh?.ttThem?.stkShop
                                                ?.soTaiKhoan
                                        }
                                    </div>
                                    <div className="noiDung">
                                        Chủ Tài Khoản : &nbsp;
                                        {thongTinDh?.ttThem?.stkShop?.tenChuTk}
                                    </div>
                                    <div className="soTien">
                                        Số Tiền = Tiền Hàng : &nbsp;
                                        {VND.format(
                                            thongTinDh?.ttThem?.baoCao
                                                ?.doanhThu -
                                                thongTinDh?.ttThem?.baoCao
                                                    ?.giamTru
                                        )}
                                    </div>
                                    <img className="qr" src={qr} />
                                </div>
                            )}
                        <div className="phimChucNang-container">
                            {thongTinDh?.trangThaiDH === "ĐH Tìm Ship Mới" && (
                                <div className="phimChucNang">
                                    <div
                                        className="phim"
                                        onClick={() => handleHuyDonShip()}
                                    >
                                        Huỷ Đơn Ship
                                    </div>
                                </div>
                            )}
                            {thongTinDh?.trangThaiDH === "ĐH Ship Đã Nhận" && (
                                <div className="phimChucNang">
                                    <div
                                        className="phim"
                                        onClick={() => handleDangShip()}
                                    >
                                        ĐH Đang Ship
                                    </div>
                                </div>
                            )}
                            {thongTinDh?.trangThaiDH === "ĐH Đang Ship" && (
                                <div className="phimChucNang"></div>
                            )}
                            {thongTinDh?.trangThaiDH ===
                                "ĐH Ship Chưa Thanh Toán Về Shop" && (
                                <div className="phimChucNang">
                                    <div
                                        onClick={() => handleShipDaThanhToan()}
                                        className="phim"
                                    >
                                        Đã Thanh Toán
                                    </div>
                                </div>
                            )}
                            {thongTinDh?.trangThaiDH ===
                                "ĐH Ship Đã Thanh Toán Về Shop" && (
                                <div className="phimChucNang"></div>
                            )}
                            {thongTinDh?.trangThaiDH ===
                                "ĐH Ship Huỷ Chưa Hoàn Hàng" && (
                                <div className="phimChucNang">
                                    <div
                                        className="phim"
                                        onClick={() => handleShipDaHoanHang()}
                                    >
                                        Đã Hoàn Hàng
                                    </div>
                                </div>
                            )}
                            {thongTinDh?.trangThaiDH ===
                                "ĐH Ship Huỷ Đã Hoàn Hàng" && (
                                <div className="phimChucNang"></div>
                            )}
                        </div>
                    </div>
                )}
                {loading === 3 && (
                    <div className="themDonHangShip">
                        <div className="quayLai-tieuDe">
                            <div
                                onClick={() => setloading(0)}
                                className="quayLai"
                            >
                                <i className="fa fa-angle-double-left"></i>Quay
                                Lại
                            </div>
                            <div className="tieuDe">Tạo Đơn Hàng</div>
                        </div>
                        <div className="taoDonHang">
                            <div className="canThu">
                                Cần Thu = Tiền Hàng + Phí Ship = &nbsp;
                                {VND.format(+tienHang + +phiShip)}
                            </div>
                            <div className="tien-input">
                                <div className="tien">Tiền Hàng:</div>
                                <div
                                    className="input2"
                                    onClick={() =>
                                        handleBanPhimSo(
                                            {
                                                tenSo: "Tiền Hàng",
                                                giaTri: "0",
                                            },
                                            ""
                                        )
                                    }
                                >
                                    {VND.format(
                                        danhSachSo?.find(
                                            (item) =>
                                                item?.tenSo === "Tiền Hàng"
                                        )?.giaTri || 0
                                    )}
                                </div>
                            </div>

                            <div className="tien-input">
                                <div className="tien">Phí Ship:</div>
                                <div
                                    className="input2"
                                    onClick={() =>
                                        handleBanPhimSo(
                                            {
                                                tenSo: "Phí Ship",
                                                giaTri: "0",
                                            },
                                            ""
                                        )
                                    }
                                >
                                    {VND.format(
                                        danhSachSo?.find(
                                            (item) => item?.tenSo === "Phí Ship"
                                        )?.giaTri || 0
                                    )}
                                </div>
                            </div>

                            <div className="noiGui">Nơi Gửi</div>
                            <div className="toaDo-thongTin">
                                <div className="toaDo">Toạ Độ :</div>
                                <div className="thongTin">
                                    {kinhDo} - {viDo}
                                </div>
                            </div>
                            <div className="tien-input">
                                <div className="tien">Họ & Tên :</div>
                                <input
                                    className="input"
                                    defaultValue={tenGui}
                                    onChange={(e) => settenGui(e.target.value)}
                                />
                            </div>
                            <div className="tien-input">
                                <div className="tien">Số Điện Thoại :</div>
                                <input
                                    className="input"
                                    defaultValue={sdtGui}
                                    onChange={(e) => setsdtGui(e.target.value)}
                                />
                            </div>
                            <div className="diaChi-container">
                                <div className="tinh-huyen-xa">
                                    <select
                                        id="provinces"
                                        onChange={(e) =>
                                            setprovincesID(e.target.value)
                                        }
                                    >
                                        <option value="">{tinhGui}</option>
                                        {provinces?.map((item) => {
                                            return (
                                                <option
                                                    key={item.province_id}
                                                    value={item.province_id}
                                                >
                                                    {item.province_name}
                                                </option>
                                            );
                                        })}
                                    </select>
                                    <select
                                        onChange={(e) =>
                                            setDistrictID(e.target.value)
                                        }
                                    >
                                        <option value="">{huyenGui}</option>
                                        {districts?.map((item) => {
                                            return (
                                                <option
                                                    value={item.district_id}
                                                    key={item.district_id}
                                                >
                                                    {item.district_name}
                                                </option>
                                            );
                                        })}
                                    </select>
                                    <select
                                        onChange={(e) =>
                                            setxaGui(e.target.value)
                                        }
                                    >
                                        <option> {xaGui}</option>
                                        {wards?.map((item) => {
                                            return (
                                                <option
                                                    value={item.ward_name}
                                                    key={item.ward_id}
                                                >
                                                    {item.ward_name}
                                                </option>
                                            );
                                        })}
                                    </select>
                                </div>
                                <input
                                    className="soNha"
                                    placeholder={thonGui}
                                    type="text"
                                    onChange={(e) => setthonGui(e.target.value)}
                                />
                            </div>

                            <div className="noiGui">Nơi Nhận</div>
                            <div className="tien-input">
                                <div className="tien">Họ & Tên :</div>
                                <input
                                    className="input"
                                    placeholder={tenNhan}
                                    onChange={(e) => settenNhan(e.target.value)}
                                />
                            </div>
                            <div className="tien-input">
                                <div className="tien">Số Điện Thoại :</div>
                                <input
                                    className="input"
                                    placeholder={sdtNhan}
                                    onChange={(e) => setsdtNhan(e.target.value)}
                                />
                            </div>
                            <div className="diaChi-container">
                                <div className="tinh-huyen-xa">
                                    <select
                                        id="provinces"
                                        onChange={(e) =>
                                            setprovincesID2(e.target.value)
                                        }
                                    >
                                        <option value="">Chọn Tỉnh</option>
                                        {provinces?.map((item) => {
                                            return (
                                                <option
                                                    key={item.province_id}
                                                    value={item.province_id}
                                                >
                                                    {item.province_name}
                                                </option>
                                            );
                                        })}
                                    </select>
                                    <select
                                        onChange={(e) =>
                                            setDistrictID2(e.target.value)
                                        }
                                    >
                                        <option value="">Chọn Huyện</option>
                                        {districts2?.map((item) => {
                                            return (
                                                <option
                                                    value={item.district_id}
                                                    key={item.district_id}
                                                >
                                                    {item.district_name}
                                                </option>
                                            );
                                        })}
                                    </select>
                                    <select
                                        onChange={(e) =>
                                            setxaNhan(e.target.value)
                                        }
                                    >
                                        <option> Chọn Xã</option>
                                        {wards2?.map((item) => {
                                            return (
                                                <option
                                                    value={item.ward_name}
                                                    key={item.ward_id}
                                                >
                                                    {item.ward_name}
                                                </option>
                                            );
                                        })}
                                    </select>
                                </div>
                                <input
                                    className="soNha"
                                    placeholder="Thôn/xóm/số nhà"
                                    type="text"
                                    onChange={(e) =>
                                        setthonNhan(e.target.value)
                                    }
                                />
                            </div>

                            <div
                                className="taoDon"
                                onClick={() => handleDHTimShipMoi()}
                            >
                                ĐH Tìm Ship Mới
                            </div>
                        </div>
                    </div>
                )}
                {soThayThe && (
                    <BanPhimSo
                        handleBanPhimSo={handleBanPhimSo}
                        soThayThe={soThayThe}
                        setsoThayThe={setsoThayThe}
                        danhSachSo={danhSachSo}
                        setdanhSachSo={setdanhSachSo}
                        handleDinhDangSo={handleDinhDangSo}
                    />
                )}
            </div>
            <div className="pc">
                <div className="TimGiaoHang-ConTaiNer">TimGiaoHang</div>
            </div>
        </div>
    );
};
export default TimGiaoHang;
