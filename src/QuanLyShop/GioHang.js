import "./GioHang.scss";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    getOneDonHang,
    registerDonHang,
    updateDonHang,
    registerTaiKhoan,
    updatettShop,
} from "../redux/apiRequest";
import {
    apiGetPublicProvinces,
    apiGetPublicDistrict,
    apiGetPublicWard,
} from "../redux/ApiProvince";
const GioHang = (props) => {
    const {
        cart,
        setcart,
        setloading,
        setTongtien,
        setTongsoluong,
        Tongtien,
        handleDaThemGioHang,
        setcartDemo,
        cartDemo,
        soBan,
        setsoBan,
        maBaoMat,
        setmaBaoMat,
        handleXemAnhFull,
    } = props;

    const user = useSelector((state) => state.auth.login.currentUser);

    const myDetail = useSelector((state) => state.post.post?.myDetail);
    const donHang = useSelector((state) => state.donHang.donHang?.donHang);

    const { tenVietTat, idShop, idCtv, tenCtv, sdtCtv } = useParams();
    const [donHangDaDat, setdonHangDaDat] = useState([]);
    const [giaVon, setgiaVon] = useState();
    useEffect(() => {
        if (donHang) {
            setdonHangDaDat(donHang?.donHang?.donHang);
        }
    }, [donHang]);
    const ttShop = useSelector((state) => state.ttShop.ttShop.ttShop?.shop);
    const ttShopThem = ttShop?.ttShopThem;
    const nvBanHang = ttShopThem?.nvBanHang;
    const nvQuanLy = ttShopThem?.nvQuanLy;
    const allNhanVien = [
        ...ttShop?.ttShopThem?.nvBanHang?.map((item) => item?.sdtnvBanHang),
        ...ttShop?.ttShopThem?.nvQuanLy?.map((item) => item?.sdtnvQuanLy),
        ttShop?.sdtShop,
    ];

    const dispatch = useDispatch();
    const VND = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
    });
    const d = new Date();
    const gioPhut = `${d.getHours()}h ${d.getMinutes()}`;
    const ngayThang = ` ${d.getDate()}/${d.getMonth()}/${d.getFullYear()}`;
    useEffect(() => {
        if (idShop && soBan) {
            getOneDonHang(idShop, soBan, dispatch);
        }
    }, [idShop, soBan]);
    const [tongTien2, settongTien2] = useState(0);
    const [giamTru, setgiamTru] = useState(0);
    const [noiNhan, setnoiNhan] = useState("Nhận Tại Bàn");
    const arrSoBan = ttShopThem?.soBan;
    useEffect(() => {
        if (noiNhan === "Tự Đến Lấy" || noiNhan === "Ship Tận Nơi") {
            setsoBan(
                `${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}  ${d.getDate()}/${d.getMonth()}/${d.getFullYear()}`
            );
        }
    }, [noiNhan]);

    // thong tin nguoi nhan không có user
    const [sdtNguoiMua, setsdtNguoiMua] = useState("Nhập số điện thoại");
    const [hoTenNguoiMua, sethoTenNguoiMua] = useState("Nhập họ và tên");
    const [thonXomNguoiNMua, setthonXomNguoiNMua] = useState(
        "Số nhà/Thôn/Xóm/..."
    );
    const [xaNguoiNMua, setxaNguoiNMua] = useState("Xã/Phường");
    const [huyenNguoiNMua, sethuyenNguoiNMua] = useState("Quận/Huyện");
    const [tinhNguoiNMua, settinhNguoiNMua] = useState("Tỉnh/TP");
    const [ghiChuNguoiMua, setghiChuNguoiMua] = useState("Thêm ghi chú!");
    useEffect(() => {
        if (myDetail) {
            setsdtNguoiMua(myDetail?.soDienThoai || "Nhập số điện thoại");
            sethoTenNguoiMua(myDetail?.hoTen || "Nhập họ và tên");
            setthonXomNguoiNMua(myDetail?.thonXom || "Số nhà/Thôn/Xóm/...");
            setxaNguoiNMua(myDetail?.xa || "Xã/Phường");
            sethuyenNguoiNMua(myDetail?.huyen || "Quận/Huyện");
            settinhNguoiNMua(myDetail?.tinh || "Tỉnh/TP");
        }
    }, [myDetail]);
    // Provinces
    const [provinces, setProvinces] = useState([]);
    const [provincesID, setprovincesID] = useState();

    const [districts, setDistricts] = useState([]);
    const [districtID, setDistrictID] = useState();

    const [wards, setWards] = useState([]);
    const [wardID, setWardID] = useState();
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
            settinhNguoiNMua(
                provinces?.find((item) => item.province_id === provincesID)
                    ?.province_name
            );
            sethuyenNguoiNMua("Quận/Huyện");
            setxaNguoiNMua("Xã/Phường");
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
            sethuyenNguoiNMua(
                districts?.find((item) => item.district_id === districtID)
                    ?.district_name
            );
            setxaNguoiNMua("Xã/Phường");
        }

        !provincesID && setWards([]);
    }, [districtID]);

    // Que Quan
    const handleDonHangMoi = () => {
        if (!noiNhan) {
            alert("Vui lòng chọn nơi nhận!");
        } else {
            if (
                ((noiNhan === "Ship Tận Nơi" || noiNhan === "Tự Đến Lấy") &&
                    (hoTenNguoiMua === "Nhập họ và tên" ||
                        sdtNguoiMua === "Nhập số điện thoại")) ||
                (noiNhan === "Nhận Tại Bàn" && !soBan)
            ) {
                alert("Thiếu thông tin người nhận!");
            } else {
                if (donHang && !donHang?.donHang) {
                    try {
                        const maBaoMat2 =
                            Math.floor(Math.random() * 9999) + 1000;
                        setmaBaoMat(maBaoMat2);
                        const newDonHang = {
                            tenShop: ttShop?.TenShop,
                            sdtShop: ttShop?.sdtShop,
                            donHang: cart,
                            idShop: idShop,
                            sdtCtv: sdtCtv,
                            sdtKhachHang: allNhanVien?.find(
                                (item) => item === sdtNguoiMua
                            )
                                ? ""
                                : sdtNguoiMua,

                            sdtOrder: user?.username || "",
                            sdtXuLyDon: "",
                            sdtGiaoHang: "",
                            sdtThuTien: "",

                            soBan: soBan || "",

                            thonXomMua: thonXomNguoiNMua,
                            xaMua: xaNguoiNMua,
                            huyenMua: huyenNguoiNMua,
                            tinhMua: tinhNguoiNMua,

                            kinhDo: ttShop?.kinhDo,
                            viDo: ttShop?.viDo,

                            thonXomBan: ttShop?.thonXom,
                            xaBan: ttShop?.xa,
                            huyenBan: ttShop?.huyen,
                            tinhBan: ttShop?.tinh,

                            trangThaiDH: "ĐH Mới",

                            ttThem: {
                                khachHang: {
                                    hoTenNguoiMua: hoTenNguoiMua,
                                    sdtNguoiMua: sdtNguoiMua,
                                    ghiChuNguoiMua: ghiChuNguoiMua,
                                    noiNhan: noiNhan,
                                    soBan: soBan || "",
                                    maBaoMat: maBaoMat2,
                                    nhomKhach: "Khách Lẻ",
                                },
                                baoCao: {
                                    doanhThu: 0,
                                    giaVon: 0,
                                    phiNenTang: 0,
                                    giamTru: 0,
                                },
                                stkShop: {
                                    idNganHang:
                                        ttShop?.ttShopThem?.nganHang?.maSo,
                                    nganHang:
                                        ttShop?.ttShopThem?.nganHang
                                            ?.tenNganHang,
                                    soTaiKhoan:
                                        ttShop?.ttShopThem?.nganHang
                                            ?.taiKhoanNganHang,
                                    tenChuTk:
                                        ttShop?.ttShopThem?.nganHang
                                            ?.chuTaiKhoanNganhang,
                                    daCK: "chưa Chuyển",
                                },
                            },
                            user: user?._id || "",
                            // thoiGian: new Date().toISOString(),
                        };
                        console.log("newDonHang", newDonHang);
                        registerDonHang(newDonHang, dispatch);
                        setcart([]);
                        setcartDemo([]);
                        if (noiNhan !== "Nhận Tại Bàn") {
                            setnoiNhan("Nhận Tại Bàn");
                            setsoBan("fabysa");
                        }
                    } catch (err) {
                        console.log(err);
                    }
                } else {
                    const id = donHang.donHang._id;
                    const newDonHang = {
                        donHang: [...cart, ...donHangDaDat],
                        trangThaiDH: "ĐH Mới",
                    };
                    updateDonHang(newDonHang, id, dispatch);
                    console.log("newDonHang", newDonHang);
                    setcart([]);
                    setcartDemo([]);
                    if (noiNhan !== "Nhận Tại Bàn") {
                        setnoiNhan("Nhận Tại Bàn");
                        setsoBan("fabysa");
                    }
                }
            }
        }
    };

    // Thay Doi So Luong
    const handleSoLuong = (sl, item2, item) => {
        if (sl < 0) {
            alert("Số lượng phải lớn hơn 0");
        } else {
            // cartDemo
            const timSP = cartDemo.find((item3) => item3?._id === item2._id);
            const allDacDiemSP = timSP?.allDacDiemSP;
            const timDacDiemSPDung = {
                slMua: +sl,
                AnhSanPham: item?.AnhSanPham,
                tenDacDiem: item?.tenDacDiem,
                giaCtv: item?.giaCtv,
                giaKhuyenMai: item?.giaKhuyenMai,
                giaNiemYet: item?.giaNiemYet,
                giaSi: item?.giaSi,
                giaVon: item?.giaVon,
                soLuong: item?.soLuong,
            };
            const timDacDiemSPKhac = allDacDiemSP?.map((item5) =>
                item5?.tenDacDiem !== item?.tenDacDiem
                    ? item5
                    : timDacDiemSPDung
            );
            setcartDemo(
                cartDemo?.map((item4) =>
                    item4?._id !== item2?._id
                        ? item4
                        : {
                              _id: item2?._id,
                              tenSanPham: item2?.tenSanPham,
                              allDacDiemSP: timDacDiemSPKhac,
                          }
                )
            );
            // cartDemo
            // cart
            if (cart && cart?.length > 0) {
                const timSanPham = cart.find(
                    (item6) => item6?._id === item2?._id
                );
                console.log("timSanPham", timSanPham);
                const allDacDiemSP0 = timSanPham?.allDacDiemSP;
                const timDacDiemSPDung2 = {
                    slMua: +sl,
                    gioPhut: gioPhut,
                    tenDacDiem: item?.tenDacDiem,
                    giaCtv: item?.giaCtv,
                    giaKhuyenMai: item?.giaKhuyenMai,
                    giaNiemYet: item?.giaNiemYet,
                    giaSi: item?.giaSi,
                    giaVon: item?.giaVon,
                    soLuong: item?.soLuong,
                };
                const timDacDiemSPKhac2 = allDacDiemSP0?.map((item5) =>
                    item5?.tenDacDiem !== item?.tenDacDiem
                        ? item5
                        : timDacDiemSPDung2
                );
                if (!timSanPham) {
                    setcart([
                        ...cart,
                        {
                            _id: item2?._id,
                            tenSanPham: item2?.tenSanPham,
                            allDacDiemSP: [timDacDiemSPDung2],
                        },
                    ]);
                } else {
                    const allDacDiemSP2 = timSanPham.allDacDiemSP;
                    const allDacDiemSP3 = allDacDiemSP2.filter(
                        (item3) => item3.tenDacDiem !== item.tenDacDiem
                    );
                    const allDacDiemSP4 = [...allDacDiemSP3, timDacDiemSPDung2];
                    const cart2 = cart.filter(
                        (item7) => item7?._id !== item2?._id
                    );
                    setcart([
                        ...cart2,
                        {
                            _id: item2?._id,
                            tenSanPham: item2?.tenSanPham,
                            allDacDiemSP: allDacDiemSP4,
                        },
                    ]);
                }
            } else {
                const timDacDiemSPDung3 = {
                    slMua: +sl,
                    gioPhut: gioPhut,
                    tenDacDiem: item?.tenDacDiem,
                    giaCtv: item?.giaCtv,
                    giaKhuyenMai: item?.giaKhuyenMai,
                    giaNiemYet: item?.giaNiemYet,
                    giaSi: item?.giaSi,
                    giaVon: item?.giaVon,
                    soLuong: item?.soLuong,
                };
                setcart([
                    {
                        _id: item2?._id,
                        tenSanPham: item2?.tenSanPham,
                        allDacDiemSP: [timDacDiemSPDung3],
                    },
                ]);
            }
            // cart
        }
    };
    const giamSoLuong = (item2, item) => {
        const sl = +item?.slMua - 1;

        if (sl < 0) {
            alert("Số lượng phải lớn hơn 0");
        } else {
            const timSP = cartDemo.find((item3) => item3?._id === item2._id);
            const allDacDiemSP = timSP?.allDacDiemSP;
            const timDacDiemSPDung = {
                slMua: +sl,
                AnhSanPham: item?.AnhSanPham,
                tenDacDiem: item?.tenDacDiem,
                giaCtv: item?.giaCtv,
                giaKhuyenMai: item?.giaKhuyenMai,
                giaNiemYet: item?.giaNiemYet,
                giaSi: item?.giaSi,
                giaVon: item?.giaVon,
                soLuong: item?.soLuong,
            };
            const timDacDiemSPKhac = allDacDiemSP?.map((item5) =>
                item5?.tenDacDiem !== item?.tenDacDiem
                    ? item5
                    : timDacDiemSPDung
            );
            setcartDemo(
                cartDemo?.map((item4) =>
                    item4?._id !== item2?._id
                        ? item4
                        : {
                              _id: item2?._id,
                              tenSanPham: item2?.tenSanPham,
                              allDacDiemSP: timDacDiemSPKhac,
                          }
                )
            );

            if (cart && cart?.length > 0) {
                const timSanPham = cart.find(
                    (item6) => item6?._id === item2?._id
                );
                console.log("timSanPham", timSanPham);
                const allDacDiemSP0 = timSanPham?.allDacDiemSP;
                const timDacDiemSPDung2 = {
                    slMua: +sl,
                    gioPhut: gioPhut,
                    tenDacDiem: item?.tenDacDiem,
                    giaCtv: item?.giaCtv,
                    giaKhuyenMai: item?.giaKhuyenMai,
                    giaNiemYet: item?.giaNiemYet,
                    giaSi: item?.giaSi,
                    giaVon: item?.giaVon,
                    soLuong: item?.soLuong,
                };
                const timDacDiemSPKhac2 = allDacDiemSP0?.map((item5) =>
                    item5?.tenDacDiem !== item?.tenDacDiem
                        ? item5
                        : timDacDiemSPDung2
                );
                if (!timSanPham) {
                    setcart([
                        ...cart,
                        {
                            _id: item2?._id,
                            tenSanPham: item2?.tenSanPham,
                            allDacDiemSP: [timDacDiemSPDung2],
                        },
                    ]);
                } else {
                    const allDacDiemSP2 = timSanPham.allDacDiemSP;
                    const allDacDiemSP3 = allDacDiemSP2.filter(
                        (item3) => item3.tenDacDiem !== item.tenDacDiem
                    );
                    const allDacDiemSP4 = [...allDacDiemSP3, timDacDiemSPDung2];
                    const cart2 = cart.filter(
                        (item7) => item7?._id !== item2?._id
                    );
                    setcart([
                        ...cart2,
                        {
                            _id: item2?._id,
                            tenSanPham: item2?.tenSanPham,
                            allDacDiemSP: allDacDiemSP4,
                        },
                    ]);
                }
            } else {
                const timDacDiemSPDung3 = {
                    slMua: +sl,
                    gioPhut: gioPhut,
                    tenDacDiem: item?.tenDacDiem,
                    giaCtv: item?.giaCtv,
                    giaKhuyenMai: item?.giaKhuyenMai,
                    giaNiemYet: item?.giaNiemYet,
                    giaSi: item?.giaSi,
                    giaVon: item?.giaVon,
                    soLuong: item?.soLuong,
                };
                setcart([
                    {
                        _id: item2?._id,
                        tenSanPham: item2?.tenSanPham,
                        allDacDiemSP: [timDacDiemSPDung3],
                    },
                ]);
            }
        }
    };
    const tangSoLuong = (item2, item) => {
        const sl = +item?.slMua + 1;

        if (sl < 0) {
            alert("Số lượng phải lớn hơn 0");
        } else {
            const timSP = cartDemo.find((item3) => item3?._id === item2._id);
            const allDacDiemSP = timSP?.allDacDiemSP;
            const timDacDiemSPDung = {
                slMua: +sl,
                AnhSanPham: item?.AnhSanPham,
                tenDacDiem: item?.tenDacDiem,
                giaCtv: item?.giaCtv,
                giaKhuyenMai: item?.giaKhuyenMai,
                giaNiemYet: item?.giaNiemYet,
                giaSi: item?.giaSi,
                giaVon: item?.giaVon,
                soLuong: item?.soLuong,
            };
            const timDacDiemSPKhac = allDacDiemSP?.map((item5) =>
                item5?.tenDacDiem !== item?.tenDacDiem
                    ? item5
                    : timDacDiemSPDung
            );
            setcartDemo(
                cartDemo?.map((item4) =>
                    item4?._id !== item2?._id
                        ? item4
                        : {
                              _id: item2?._id,
                              tenSanPham: item2?.tenSanPham,
                              allDacDiemSP: timDacDiemSPKhac,
                          }
                )
            );

            if (cart && cart?.length > 0) {
                const timSanPham = cart.find(
                    (item6) => item6?._id === item2?._id
                );
                console.log("timSanPham", timSanPham);
                const allDacDiemSP0 = timSanPham?.allDacDiemSP;
                const timDacDiemSPDung2 = {
                    slMua: +sl,
                    gioPhut: gioPhut,
                    tenDacDiem: item?.tenDacDiem,
                    giaCtv: item?.giaCtv,
                    giaKhuyenMai: item?.giaKhuyenMai,
                    giaNiemYet: item?.giaNiemYet,
                    giaSi: item?.giaSi,
                    giaVon: item?.giaVon,
                    soLuong: item?.soLuong,
                };
                const timDacDiemSPKhac2 = allDacDiemSP0?.map((item5) =>
                    item5?.tenDacDiem !== item?.tenDacDiem
                        ? item5
                        : timDacDiemSPDung2
                );
                if (!timSanPham) {
                    setcart([
                        ...cart,
                        {
                            _id: item2?._id,
                            tenSanPham: item2?.tenSanPham,
                            allDacDiemSP: [timDacDiemSPDung2],
                        },
                    ]);
                } else {
                    const allDacDiemSP2 = timSanPham.allDacDiemSP;
                    const allDacDiemSP3 = allDacDiemSP2.filter(
                        (item3) => item3.tenDacDiem !== item.tenDacDiem
                    );
                    const allDacDiemSP4 = [...allDacDiemSP3, timDacDiemSPDung2];
                    const cart2 = cart.filter(
                        (item7) => item7?._id !== item2?._id
                    );
                    setcart([
                        ...cart2,
                        {
                            _id: item2?._id,
                            tenSanPham: item2?.tenSanPham,
                            allDacDiemSP: allDacDiemSP4,
                        },
                    ]);
                }
            } else {
                const timDacDiemSPDung3 = {
                    slMua: +sl,
                    gioPhut: gioPhut,
                    tenDacDiem: item?.tenDacDiem,
                    giaCtv: item?.giaCtv,
                    giaKhuyenMai: item?.giaKhuyenMai,
                    giaNiemYet: item?.giaNiemYet,
                    giaSi: item?.giaSi,
                    giaVon: item?.giaVon,
                    soLuong: item?.soLuong,
                };
                setcart([
                    {
                        _id: item2?._id,
                        tenSanPham: item2?.tenSanPham,
                        allDacDiemSP: [timDacDiemSPDung3],
                    },
                ]);
            }
        }
    };
    const suaDonHang = (sl, item, item2) => {
        const suaSoLuong = {
            giaCtv: item?.giaCtv,
            giaKhuyenMai: item?.giaKhuyenMai,
            giaNiemYet: item?.giaNiemYet,
            giaSi: item?.giaSi,
            giaVon: item?.giaVon,
            gioPhut: item?.gioPhut,
            slMua: sl,
            soLuong: item?.soLuong,
            tenDacDiem: item?.tenDacDiem,
            daXong: item?.daXong,
        };

        const allDacDiemSP5 = item2?.allDacDiemSP?.map((item4) =>
            item4 !== item ? item4 : suaSoLuong
        );
        const sanPham = {
            _id: item2?._id,
            tenSanPham: item2?.tenSanPham,
            allDacDiemSP: allDacDiemSP5,
        };

        const donHangSua = donHangDaDat?.map((item3) =>
            item3 === item2 ? sanPham : item3
        );
        setdonHangDaDat(donHangSua);
        const id = donHang?.donHang?._id;
        const newDonHang = {
            donHang: donHangSua,
        };
        updateDonHang(newDonHang, id, dispatch);
    };
    const handleGiamTru = (giamTru3) => {
        const newDonHang = {
            ttThem: {
                ...donHang.donHang.ttThem,
                ...{
                    baoCao: {
                        ...donHang?.donHang?.ttThem?.baoCao,
                        ...{ giamTru: +giamTru3 },
                    },
                },
            },
        };
        console.log("newDonHang", newDonHang);
        updateDonHang(newDonHang, donHang?.donHang?._id, dispatch);
        setgiamTru(giamTru3);
    };
    // Thay doi so luong
    // Tinh Tong Tien và so luong
    const tinhtongtien = () => {
        let tt = 0;
        if (cartDemo?.length !== 0) {
            cartDemo?.map((sp) => {
                sp?.allDacDiemSP?.map((item) => {
                    tt += +item?.slMua * item?.giaKhuyenMai;
                });
            });
        }

        setTongtien(tt);
    };
    const tinhtongtien2 = () => {
        let tt2 = 0;
        if (donHangDaDat?.length !== 0) {
            donHangDaDat?.map((sp) => {
                sp?.allDacDiemSP?.map((item) => {
                    tt2 += +item?.slMua * item?.giaKhuyenMai;
                });
            });
        }

        settongTien2(tt2);
    };
    const tinhsoluong = () => {
        let tt = 0;
        if (cartDemo?.length !== 0) {
            cartDemo?.map((sp) => {
                sp?.allDacDiemSP?.map((item) => {
                    tt += +item?.slMua;
                });
            });
        }

        setTongsoluong(tt);
    };
    useEffect(() => {
        tinhtongtien();
        tinhsoluong();
    });
    useEffect(() => {
        tinhtongtien2();
    }, [donHangDaDat]);
    // Tinh Tong Tien và so luong

    //  Viet QR
    const nganHang = ttShop?.ttShopThem?.nganHang;
    const BANK_ID = nganHang?.maSo;
    const ACCOUNT_NO = nganHang?.taiKhoanNganHang;
    const TEMPLATE = "print";
    const AMOUNT = tongTien2 - giamTru;
    const DESCRIPTION = `Hoá Đơn ${soBan}`;
    const ACCOUNT_NAME = nganHang?.chuTaiKhoanNganhang;
    const qr = `https://img.vietqr.io/image/${BANK_ID}-${ACCOUNT_NO}-${TEMPLATE}.png?amount=${AMOUNT}&addInfo=${DESCRIPTION}&accountName=${ACCOUNT_NAME}`;
    // Viet QR

    useEffect(() => {
        const tinhTongGiaVon = () => {
            let tt = 0;
            if (donHangDaDat?.length !== 0) {
                donHangDaDat?.map((sp) => {
                    sp?.allDacDiemSP?.map((item) => {
                        tt += +item?.slMua * item?.giaVon;
                    });
                });
            }

            setgiaVon(tt);
        };
        tinhTongGiaVon();
    });

    const handleDaThanhToan = () => {
        try {
            if (ttShop?.phiNenTang === "1K/Đơn Hàng") {
                const newDonHang = {
                    trangThaiDH: "ĐH Đã Thanh Toán",
                    sdtThuTien: user?.username,
                    ttThem: {
                        ...donHang?.donHang?.ttThem,
                        ...{
                            baoCao: {
                                doanhThu:
                                    tongTien2 -
                                    donHang?.donHang?.ttThem?.baoCao?.giamTru,
                                giaVon: giaVon,
                                giamTru:
                                    donHang?.donHang?.ttThem?.baoCao?.giamTru,
                                phiNenTang: 1000,
                            },
                        },
                    },
                };
                console.log("newDonHang", newDonHang);
                updateDonHang(newDonHang, donHang?.donHang?._id, dispatch);
                const newShop = {
                    cash: +ttShop?.cash - 1000,
                };
                console.log("newShop", newShop);
                updatettShop(newShop, ttShop._id, dispatch);
                const newTaiKhoan = {
                    GDVao: "",
                    GDRa: 1000,
                    noiDungCK: "Phí Nền Tảng",
                    xacNhanChuyenTien: "Thành Công",
                    thongTinThem: {
                        tenChuTk: ttShop?.TenShop,
                        sdtChuTk: ttShop?.sdtShop,
                    },
                    idChuTaiKhoan: ttShop?._id,
                };
                console.log("newTaiKhoan", newTaiKhoan);
                registerTaiKhoan(newTaiKhoan, dispatch);
            }
            if (ttShop?.phiNenTang === "1% Doanh Thu") {
                const newDonHang = {
                    trangThaiDH: "ĐH Đã Thanh Toán",
                    sdtThuTien: user?.username,
                    ttThem: {
                        ...donHang?.donHang?.ttThem,
                        ...{
                            baoCao: {
                                doanhThu:
                                    tongTien2 -
                                    donHang?.donHang?.ttThem?.baoCao?.giamTru,
                                giaVon: giaVon,
                                giamTru:
                                    donHang?.donHang?.ttThem?.baoCao?.giamTru,
                                phiNenTang:
                                    (tongTien2 -
                                        donHang?.donHang?.ttThem?.baoCao
                                            ?.giamTru) /
                                    100,
                            },
                        },
                    },
                };
                console.log("newDonHang", newDonHang);
                updateDonHang(newDonHang, donHang?.donHang?._id, dispatch);
                const newShop = {
                    cash:
                        ttShop?.cash -
                        (tongTien2 -
                            donHang?.donHang?.ttThem?.baoCao?.giamTru) /
                            100,
                };
                console.log("newShop", newShop);
                updatettShop(newShop, ttShop._id, dispatch, setloading);
                const newTaiKhoan = {
                    GDVao: "",
                    GDRa:
                        (tongTien2 -
                            donHang?.donHang?.ttThem?.baoCao?.giamTru) /
                        100,
                    noiDungCK: "Phí Nền Tảng",
                    xacNhanChuyenTien: "Thành Công",
                    thongTinThem: {
                        tenChuTk: ttShop?.TenShop,
                        sdtChuTk: ttShop?.sdtShop,
                    },
                    idChuTaiKhoan: ttShop?._id,
                };
                console.log("newTaiKhoan", newTaiKhoan);
                registerTaiKhoan(newTaiKhoan, dispatch);
            }
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <>
            <div className="gioHang-container">
                <div className="quayLai-tieuDe">
                    <div onClick={() => setloading(0)} className="quayLai">
                        <i className="fa fa-angle-double-left"></i>Quay Lại
                    </div>
                    <div className="tieuDe">Giỏ Hảng</div>
                </div>

                {cartDemo?.length !== 0 ? (
                    <div className="thongTinGioHang-container">
                        {cartDemo?.map((item2, index) => {
                            return (
                                <div key={index} className="sanPham">
                                    <div className="tenSanPham-xoa">
                                        <div className="tenSanPham">
                                            {item2?.tenSanPham}
                                        </div>
                                        <div
                                            onClick={() =>
                                                handleDaThemGioHang(item2)
                                            }
                                            className="xoa"
                                        >
                                            ✖️
                                        </div>
                                    </div>

                                    {item2?.allDacDiemSP &&
                                        item2?.allDacDiemSP?.length > 0 &&
                                        item2?.allDacDiemSP?.map(
                                            (item, index) => {
                                                return (
                                                    <div
                                                        key={index}
                                                        className="dacDiem-tenDacDiem"
                                                    >
                                                        <div className="dacDiem-themGioHang">
                                                            <div className="anhSp-tenSp">
                                                                <img
                                                                    onClick={() =>
                                                                        handleXemAnhFull(
                                                                            item?.AnhSanPham
                                                                        )
                                                                    }
                                                                    src={
                                                                        item?.AnhSanPham
                                                                    }
                                                                    className="anhSp"
                                                                    alt="timtim"
                                                                />
                                                            </div>
                                                            <div className="giaSanPham">
                                                                <div className="giaKM">
                                                                    {VND.format(
                                                                        item?.giaKhuyenMai
                                                                    )}
                                                                </div>
                                                                <div className="giaNY-giamGia">
                                                                    <div className="giaNY">
                                                                        {VND.format(
                                                                            item?.giaNiemYet
                                                                        )}
                                                                    </div>
                                                                    <div className="giamGia">
                                                                        Giảm&nbsp;
                                                                        {Math.floor(
                                                                            (100 *
                                                                                (item?.giaNiemYet -
                                                                                    item?.giaKhuyenMai)) /
                                                                                item?.giaNiemYet
                                                                        )}
                                                                        %
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="soLuong-SL">
                                                                <div className="soLuong">
                                                                    Số Lượng
                                                                </div>
                                                                <div className="thayDoiSl">
                                                                    <div
                                                                        onClick={() =>
                                                                            giamSoLuong(
                                                                                item2,
                                                                                item
                                                                            )
                                                                        }
                                                                        className="giamSl"
                                                                    >
                                                                        <i className="fa fa-arrow-circle-down"></i>
                                                                    </div>
                                                                    <input
                                                                        type="number"
                                                                        className="SL"
                                                                        placeholder={
                                                                            item?.slMua
                                                                        }
                                                                        onChange={(
                                                                            e
                                                                        ) =>
                                                                            handleSoLuong(
                                                                                e
                                                                                    .target
                                                                                    .value,
                                                                                item2,
                                                                                item
                                                                            )
                                                                        }
                                                                    />
                                                                    <div
                                                                        onClick={() =>
                                                                            tangSoLuong(
                                                                                item2,
                                                                                item
                                                                            )
                                                                        }
                                                                        className="giamSl"
                                                                    >
                                                                        <i className="fa fa-arrow-circle-up"></i>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="thanhTien-TT">
                                                                <div className="thanhTien">
                                                                    Thành Tiền
                                                                </div>
                                                                <div className="TT">
                                                                    {VND.format(
                                                                        item?.slMua *
                                                                            item?.giaKhuyenMai
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="tenDacDiem">
                                                            {item?.tenDacDiem}
                                                            &nbsp;-&nbsp;
                                                            {item?.soLuong}
                                                        </div>
                                                    </div>
                                                );
                                            }
                                        )}
                                </div>
                            );
                        })}
                        <div className="tongTien">
                            <div className="tieude">Tổng Tiền Hàng</div>
                            <div className="sotien">{VND.format(Tongtien)}</div>
                        </div>
                    </div>
                ) : (
                    <div className="datHangThanhCong-conatiner">
                        {donHang &&
                        (donHang.message === "Đặt Hàng Thành Công!" ||
                            donHang.message === "Cập nhật thành công!") ? (
                            <div className="datHangTC">
                                Đặt Hàng Thành Công!
                            </div>
                        ) : (
                            <div className="datHangTC">Giỏ Hàng Trống!</div>
                        )}
                    </div>
                )}
                <div className="chonNoiNhan-container">
                    <div className="chonNoiNhan">Chọn Nơi Nhận</div>

                    <div className="noiNhan-soBan">
                        <select
                            onChange={(e) => setnoiNhan(e.target.value)}
                            className="noiNhan"
                        >
                            <option>Nhận Tại Bàn</option>
                            <option>Tự Đến Lấy</option>
                            <option>Ship Tận Nơi</option>
                        </select>
                        {noiNhan === "Nhận Tại Bàn" && (
                            <>
                                <select
                                    onChange={(e) => setsoBan(e.target.value)}
                                    className="soBan"
                                >
                                    <option value="">Chọn Số bàn</option>
                                    {arrSoBan &&
                                        arrSoBan.length > 0 &&
                                        arrSoBan.map((item, index) => {
                                            return (
                                                <option key={index}>
                                                    {item}
                                                </option>
                                            );
                                        })}
                                </select>
                                {(soBan &&
                                    arrSoBan?.find((item) => item === soBan) &&
                                    donHang &&
                                    donHang?.donHang &&
                                    +donHang?.donHang?.ttThem?.khachHang
                                        ?.maBaoMat === +maBaoMat) ||
                                (soBan &&
                                    arrSoBan?.find((item) => item === soBan) &&
                                    donHang &&
                                    donHang?.donHang &&
                                    +donHang?.donHang?.ttThem?.khachHang
                                        ?.sdtNguoiMua === +user?.username &&
                                    user) ||
                                soBan === "fabysa" ||
                                !soBan ||
                                !donHang?.donHang ? (
                                    <></>
                                ) : (
                                    <input
                                        onChange={(e) =>
                                            setmaBaoMat(e.target.value)
                                        }
                                        placeholder="Mã Bảo Mật"
                                        className="maBaoVe"
                                    />
                                )}
                            </>
                        )}
                    </div>
                </div>

                {noiNhan !== "Nhận Tại Bàn" && (
                    <div className="thongTinNguoiNhan-container">
                        <div className="thongTinNguoiNhan">
                            Thông Tin Người Nhận
                        </div>
                        <div className="thongTinChiTiet">
                            <div className="tieuDe">Họ Và Tên</div>
                            <input
                                className="noiDung"
                                onChange={(e) =>
                                    sethoTenNguoiMua(e.target.value)
                                }
                                placeholder={hoTenNguoiMua}
                            />
                        </div>
                        <div className="thongTinChiTiet">
                            <div className="tieuDe">Số Điện Thoại</div>

                            <input
                                className="noiDung"
                                onChange={(e) => setsdtNguoiMua(e.target.value)}
                                placeholder={sdtNguoiMua}
                            />
                        </div>
                        <div className="diaChi-container">
                            <div className="diaChi">Địa Chỉ</div>
                            <div className="tinh-huyen-xa">
                                <select
                                    id="provinces"
                                    onChange={(e) =>
                                        setprovincesID(e.target.value)
                                    }
                                >
                                    <option value="">{tinhNguoiNMua}</option>
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
                                    <option value="">{huyenNguoiNMua}</option>
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
                                        setxaNguoiNMua(e.target.value)
                                    }
                                >
                                    <option> {xaNguoiNMua}</option>
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
                                placeholder={thonXomNguoiNMua}
                                type="text"
                                onChange={(e) =>
                                    setthonXomNguoiNMua(e.target.value)
                                }
                            />
                        </div>
                        <div className="thongTinChiTiet">
                            <div className="tieuDe">Ghi Chú Thêm</div>
                            <input
                                className="noiDung"
                                placeholder={ghiChuNguoiMua}
                                onChange={(e) =>
                                    setghiChuNguoiMua(e.target.value)
                                }
                            />
                        </div>
                    </div>
                )}
                {(noiNhan === "Nhận Tại Bàn" &&
                    donHang?.donHang?.ttThem?.khachHang?.nhomKhach ===
                        "Khách Lẻ" &&
                    cart &&
                    cart?.length > 0 &&
                    donHang &&
                    donHang?.donHang &&
                    soBan &&
                    arrSoBan?.find((item) => item === soBan) &&
                    donHangDaDat?.length !== 0 &&
                    +donHang?.donHang?.ttThem?.khachHang?.maBaoMat ===
                        +maBaoMat) ||
                (noiNhan === "Nhận Tại Bàn" &&
                    donHang?.donHang?.ttThem?.khachHang?.nhomKhach ===
                        "Khách Lẻ" &&
                    cart &&
                    cart?.length > 0 &&
                    donHang &&
                    donHang?.donHang &&
                    arrSoBan?.find((item) => item === soBan) &&
                    donHangDaDat?.length !== 0 &&
                    user &&
                    +user?.username ===
                        +donHang?.donHang?.ttThem?.khachHang?.sdtNguoiMua) ||
                (noiNhan === "Nhận Tại Bàn" &&
                    cart &&
                    cart?.length > 0 &&
                    soBan &&
                    arrSoBan?.find((item) => item === soBan) &&
                    !donHang?.donHang) ||
                (noiNhan !== "Nhận Tại Bàn" && cart && cart?.length > 0) ? (
                    <div onClick={() => handleDonHangMoi()} className="datHang">
                        ĐẶT HÀNG
                    </div>
                ) : (
                    <div
                        onClick={() => alert("Thiếu thông tin đơn hàng!")}
                        className="datHang2"
                    >
                        ĐẶT HÀNG
                    </div>
                )}
                {noiNhan === "Nhận Tại Bàn" &&
                    donHang?.donHang?.ttThem?.khachHang?.nhomKhach ===
                        "Khách Lẻ" &&
                    donHangDaDat &&
                    donHangDaDat.length !== 0 &&
                    soBan &&
                    arrSoBan?.find((item) => item === soBan) &&
                    (+donHang?.donHang?.ttThem?.khachHang?.maBaoMat ===
                        +maBaoMat ||
                        nvBanHang?.find(
                            (item) => item?.sdtnvBanHang === user?.username
                        ) ||
                        nvQuanLy?.find(
                            (item) => item?.sdtnvQuanLy === user?.username
                        ) ||
                        user?._id === ttShop?.user ||
                        user?.admin === true ||
                        +myDetail?.soDienThoai ===
                            +donHang?.donHang?.ttThem?.khachHang
                                ?.sdtNguoiMua) && (
                        <>
                            <div className="thongTinDonHang-container">
                                <div className="thongTinDonHang">
                                    Hoá Đơn Mua Hàng
                                </div>

                                <div className="soBan-maBaoMat">
                                    <div className="soBan">
                                        Số Bàn:&ensp;
                                        {
                                            donHang?.donHang?.ttThem?.khachHang
                                                ?.soBan
                                        }
                                    </div>
                                    <div className="maBaoMat">
                                        Mã Bảo Mật:&ensp;
                                        {
                                            donHang?.donHang?.ttThem?.khachHang
                                                ?.maBaoMat
                                        }
                                    </div>
                                </div>

                                {donHangDaDat?.map((item2, index) => {
                                    return (
                                        <div key={index} className="sanPham">
                                            <div className="tenSanPham-xoa">
                                                <div className="tenSanPham">
                                                    {item2?.tenSanPham}
                                                </div>
                                            </div>

                                            {item2?.allDacDiemSP &&
                                                item2?.allDacDiemSP?.length >
                                                    0 &&
                                                item2?.allDacDiemSP?.map(
                                                    (item, index) => {
                                                        return (
                                                            <div
                                                                key={index}
                                                                className="dacDiem-themGioHang"
                                                            >
                                                                <div className="anhSp-tenSp">
                                                                    <div className="tenSp">
                                                                        {
                                                                            item?.tenDacDiem
                                                                        }
                                                                    </div>
                                                                    <div className="gioPhut">
                                                                        {
                                                                            item?.gioPhut
                                                                        }
                                                                    </div>
                                                                </div>
                                                                <div className="giaSanPham">
                                                                    <div className="giaKM">
                                                                        {VND.format(
                                                                            item?.giaKhuyenMai
                                                                        )}
                                                                    </div>
                                                                    <div className="giaNY-giamGia">
                                                                        <div className="giaNY">
                                                                            {VND.format(
                                                                                item?.giaNiemYet
                                                                            )}
                                                                        </div>
                                                                        <div className="giamGia">
                                                                            Giảm&nbsp;
                                                                            {Math.floor(
                                                                                (100 *
                                                                                    (item?.giaNiemYet -
                                                                                        item?.giaKhuyenMai)) /
                                                                                    item?.giaNiemYet
                                                                            )}
                                                                            %
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="soLuong-SL">
                                                                    <div className="soLuong">
                                                                        Số Lượng
                                                                    </div>
                                                                    {nvBanHang?.find(
                                                                        (
                                                                            item
                                                                        ) =>
                                                                            item?.sdtnvBanHang ===
                                                                            user?.username
                                                                    ) ||
                                                                    nvQuanLy?.find(
                                                                        (
                                                                            item
                                                                        ) =>
                                                                            item?.sdtnvQuanLy ===
                                                                            user?.username
                                                                    ) ||
                                                                    user?._id ===
                                                                        ttShop?.user ||
                                                                    user?.admin ===
                                                                        true ? (
                                                                        <input
                                                                            className="SL"
                                                                            placeholder={
                                                                                item?.slMua
                                                                            }
                                                                            onChange={(
                                                                                e
                                                                            ) =>
                                                                                suaDonHang(
                                                                                    e
                                                                                        .target
                                                                                        .value,
                                                                                    item,
                                                                                    item2
                                                                                )
                                                                            }
                                                                        />
                                                                    ) : (
                                                                        <div className="SL">
                                                                            {
                                                                                item?.slMua
                                                                            }
                                                                        </div>
                                                                    )}
                                                                </div>
                                                                <div className="thanhTien-TT">
                                                                    <div className="thanhTien">
                                                                        Thành
                                                                        Tiền
                                                                    </div>
                                                                    <div className="TT">
                                                                        {VND.format(
                                                                            item?.slMua *
                                                                                item?.giaKhuyenMai
                                                                        )}
                                                                    </div>
                                                                </div>
                                                                {item.daXong ===
                                                                1 ? (
                                                                    <div className="daXong">
                                                                        ✅
                                                                    </div>
                                                                ) : (
                                                                    <div className="chuaXong">
                                                                        ☐
                                                                    </div>
                                                                )}
                                                            </div>
                                                        );
                                                    }
                                                )}
                                        </div>
                                    );
                                })}
                                <div className="tinhTien">
                                    <div className="tongTien">
                                        <div className="tieude">
                                            Tổng Tiền Hàng :
                                        </div>
                                        <div className="sotien">
                                            {VND.format(tongTien2)}
                                        </div>
                                    </div>
                                    <div className="tongTien">
                                        <div className="tieude">Giảm Trừ :</div>
                                        {nvBanHang?.find(
                                            (item) =>
                                                item?.sdtnvBanHang ===
                                                user?.username
                                        ) ||
                                        nvQuanLy?.find(
                                            (item) =>
                                                item?.sdtnvQuanLy ===
                                                user?.username
                                        ) ||
                                        user?._id === ttShop?.user ||
                                        user?.admin === true ? (
                                            <input
                                                type="number"
                                                className="sotien"
                                                placeholder={VND.format(
                                                    donHang?.donHang?.ttThem
                                                        ?.baoCao?.giamTru
                                                )}
                                                onChange={(e) =>
                                                    handleGiamTru(
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        ) : (
                                            <div className="sotien">
                                                {VND.format(
                                                    donHang?.donHang?.ttThem
                                                        ?.baoCao?.giamTru
                                                )}
                                            </div>
                                        )}
                                    </div>
                                    <div className="tongTien">
                                        <div className="tieude">
                                            Cần Thanh Toán :
                                        </div>
                                        <div className="sotien">
                                            {VND.format(
                                                tongTien2 -
                                                    donHang?.donHang?.ttThem
                                                        ?.baoCao?.giamTru
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="thanhToanQrCode-container">
                                <div className="thanhToanQr">
                                    Thanh Toán Qua QR Code
                                </div>
                                <img className="qr" src={qr} />
                            </div>
                            {donHang &&
                                donHang?.donHang?.trangThaiDH !==
                                    "ĐH Đã Thanh Toán" &&
                                allNhanVien?.find(
                                    (item) => item === sdtNguoiMua
                                ) && (
                                    <div
                                        onClick={() => handleDaThanhToan()}
                                        className="chuaThanhToan"
                                    >
                                        Đã Thanh Toán
                                    </div>
                                )}
                        </>
                    )}
            </div>
        </>
    );
};
export default GioHang;
