import "./DonHang.scss";
import CommonUtils from "../component/CommonUtils";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
    getDonHang,
    updateDonHang,
    getttShop,
    getArrSanPham,
    getYourStatus,
    getPost,
    registerDonHang,
} from "../redux/apiRequest";
import { useEffect } from "react";
const DonHang = () => {
    const user = useSelector((state) => state.auth.login.currentUser);
    const allDonHang = useSelector(
        (state) => state.donHang.donHang.alldonHang?.allDonHang
    );
    const myDetail = useSelector((state) => state.post.post?.myDetail);
    const ttShop = useSelector((state) => state.ttShop.ttShop.ttShop?.shop);
    const arraySanPham = useSelector(
        (state) => state.sanPham.sanPham.arrsanPham?.arrSanpham
    );
    const allshopLienKet = useSelector(
        (state) => state.yourStatus.yourStatus.allYourStatus?.yourStatus
    );
    const [sanPhamCtv, setsanPhamCtv] = useState([]);
    useEffect(() => {
        if (allshopLienKet && allshopLienKet.length !== 0) {
            setsanPhamCtv(allshopLienKet[0]?.sanPhamCtv);
        }
    }, [allshopLienKet]);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { idShop, skip, idDonHang, trangThai } = useParams();
    const [Tongtien, setTongtien] = useState();
    const thongTindh = allDonHang?.find(
        (thongTindh) => thongTindh?._id === idDonHang
    );
    const [arrayIdSanPham, setarrayIdSanPham] = useState(
        thongTindh?.donHang?.map((item) => {
            return item.idSanPham;
        })
    );
    const [loading, setloading] = useState(1);
    const [chuyenDon, setchuyenDon] = useState(["a"]);
    const [nhapHang, setnhapHang] = useState(["b"]);

    useEffect(() => {
        if (user && user.length !== 0) {
            getPost(user?._id, dispatch, setloading);
        }
    }, []);
    useEffect(() => {
        if (arrayIdSanPham) {
            getArrSanPham(arrayIdSanPham, dispatch);
        }
    }, [arrayIdSanPham]);
    const donHangQuantity = thongTindh?.donHang;
    // Phan Kho
    // Phan Kho
    const kho = thongTindh?.khachHang.Kho;
    const arraySanPhamQuantity = arraySanPham?.map((item) => {
        return donHangQuantity?.map((item2) => {
            return item._id === item2.idSanPham
                ? { ...item, quantity: item2.soLuong }
                : "hihi";
        });
    });
    const a = [];
    const khachHang = thongTindh?.khachHang;
    useEffect(() => {
        getttShop(idShop, dispatch);
        getYourStatus(idShop, dispatch);
    }, []);
    useEffect(() => {
        getDonHang(idShop, skip, trangThai, dispatch);
    }, [idShop, skip]);
    const handleGiaoHang = () => {
        try {
            const newDonHang = {
                trangThaiDH: 2,
            };
            updateDonHang(newDonHang, idDonHang, dispatch);
            navigate(`/don-hang/${idShop}`);
        } catch (err) {
            console.log(err);
        }
    };
    const handleHoanThanh = (id) => {
        if (kho !== "lienket") {
            const newDonHang = {
                trangThaiDH: 3,
            };
            navigate(`/don-hang-dang-giao/${idShop}`);
            updateDonHang(newDonHang, id, dispatch);
        } else {
            const newDonHang = {
                trangThaiDH: 5,
            };
            navigate(`/don-hang-dang-giao/${idShop}`);
            updateDonHang(newDonHang, id, dispatch);
        }
    };
    const handleHuyDon = (id) => {
        const newDonHang = {
            trangThaiDH: 4,
        };
        navigate(`/don-hang-dang-giao/${idShop}`);
        updateDonHang(newDonHang, id, dispatch);
        console.log("newDonHang", newDonHang);
    };
    const handleTraLai = (id) => {
        const newDonHang = {
            trangThaiDH: 4,
        };
        navigate(`/don-hang-hoan-thanh/${idShop}`);
        updateDonHang(newDonHang, id, dispatch);
        console.log("newDonHang", newDonHang);
    };
    const VND = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
    });
    const tinhtongtien = () => {
        let tt = 0;
        if (arraySanPhamQuantity?.length !== 0 && !kho) {
            arraySanPhamQuantity?.map((item) => {
                item?.map((item2) => {
                    if (item2 !== "hihi") {
                        tt += item2?.giaKhuyenMai * item2?.quantity;
                    }
                });
            });
        }
        if (arraySanPhamQuantity?.length !== 0 && kho === "lienket") {
            arraySanPhamQuantity?.map((item) => {
                item?.map((item2) => {
                    if (item2 !== "hihi") {
                        tt += item2?.giaKhuyenMai * item2?.quantity;
                    }
                });
            });
        }
        if (arraySanPhamQuantity?.length !== 0 && kho === "ctv") {
            arraySanPhamQuantity?.map((item) => {
                item?.map((item2) => {
                    if (item2 !== "hihi") {
                        tt += item2?.giaCtv * item2?.quantity;
                    }
                });
            });
        }
        if (arraySanPhamQuantity?.length !== 0 && kho === "si") {
            arraySanPhamQuantity?.map((item) => {
                item?.map((item2) => {
                    if (item2 !== "hihi") {
                        tt += item2?.giaSi * item2?.quantity;
                    }
                });
            });
        }

        setTongtien(tt);
    };
    useEffect(() => {
        tinhtongtien();
    });
    const handleNhapHang = (item) => {
        console.log("item", item);

        const khachHangArr = {
            hoTenNguoiMua: myDetail?.hoTen,
            sdtNguoiMua: myDetail?.soDienThoai,
            dcNguoiNMua: `${myDetail?.thonXom} - ${myDetail?.xa} - ${myDetail?.huyen} - ${myDetail?.tinh}`,
            ghiChuNguoiMua: "Giao sớm nhé Shop!",
            phuongThucTT: "Thanh Toán Khi Nhận Hàng",
            noiNhan: "Ship Tận Nơi",
            Kho: "ctv",
        };
        const idShopLienKet = arraySanPham.find(
            (item3) => item3._id === item.idSanPham
        );
        const newDonHang = {
            khachHang: khachHangArr,
            donHang: item,
            idShop: idShopLienKet?.user,
            trangThaiDH: 1,
            idCtv: "",
            idKhachHang: myDetail?.user,
        };
        console.log("newDonHang", newDonHang);
        registerDonHang(newDonHang, dispatch);
        setnhapHang([...nhapHang, item?.idSanPham]);
    };
    const handleChuyenDon = (item) => {
        console.log("item", item);
        const newDonHang = {
            trangThaiDH: 1,
            donHang: thongTindh?.donHang.filter((item2) => item2 !== item),
        };
        updateDonHang(newDonHang, thongTindh?._id, dispatch);
        console.log("newDonHang", newDonHang);

        const khachHangArr = {
            hoTenNguoiMua: thongTindh?.khachHang?.hoTenNguoiMua,
            sdtNguoiMua: thongTindh?.khachHang?.sdtNguoiMua,
            dcNguoiNMua: thongTindh?.khachHang?.dcNguoiNMua,
            ghiChuNguoiMua: "Giao sớm nhé Shop!",
            phuongThucTT: "Thanh Toán Khi Nhận Hàng",
            noiNhan: "Ship Tận Nơi",
            Kho: "lienket",
        };
        const idShopLienKet = arraySanPham.find(
            (item3) => item3._id === item.idSanPham
        );
        const donHangChuyen = {
            TenSanPham: item?.TenSanPham,
            idSanPham: item?.idSanPham,
            soLuong: item?.soLuong,
            hoaHong: idShopLienKet?.giaKhuyenMai - idShopLienKet?.giaCtv,
            thanhToanHoaHong: "Chưa Thanh Toán",
        };
        const newDonHang2 = {
            khachHang: khachHangArr,
            donHang: donHangChuyen,
            idShop: idShopLienKet?.user,
            trangThaiDH: 1,
            idCtv: idShop,
            idKhachHang: thongTindh.idKhachHang,
        };
        console.log("newDonHang2", newDonHang2);
        registerDonHang(newDonHang2, dispatch);
        setchuyenDon([...chuyenDon, item?.idSanPham]);
    };

    return (
        <div className="chiTietDonHang-Container">
            <div>
                {+trangThai === 1 && (
                    <a href={`/don-hang/${idShop}`}>
                        <button className="close">Close</button>
                    </a>
                )}
                {+trangThai === 2 && (
                    <a href={`/don-hang-dang-giao/${idShop}`}>
                        <button className="close">Close</button>
                    </a>
                )}
                {+trangThai === 3 && (
                    <a href={`/don-hang-hoan-thanh/${idShop}`}>
                        <button className="close">Close</button>
                    </a>
                )}
                {+trangThai === 4 && (
                    <a href={`/don-hang-huy/${idShop}`}>
                        <button className="close">Close</button>
                    </a>
                )}
            </div>
            <div className="tieuDeDonHang">Chi Tiết Đơn Hàng</div>

            <div className="sanPham">
                <div>Sản Phẩm</div>
                <div>Đơn Giá</div>
                <div>Số Lượng</div>
                <div>Thành Tiền</div>
            </div>
            {/* Don Truc Tiep */}
            {!kho && (
                <>
                    <div>
                        {arraySanPhamQuantity?.map((item2, index2) => {
                            return (
                                <div key={index2}>
                                    {item2?.map((item, index) => {
                                        return (
                                            <div key={index}>
                                                {item !== "hihi" && (
                                                    <div>
                                                        <div className="sanPham">
                                                            <div className="anhVaTen">
                                                                <img
                                                                    src={
                                                                        item?.AnhSanPham
                                                                    }
                                                                    className="anhSanPham"
                                                                    alt="timtim"
                                                                />
                                                                <div className="tenSanPham">
                                                                    {
                                                                        item?.TenSanPham
                                                                    }
                                                                </div>
                                                            </div>
                                                            <div className="giaBan">
                                                                {VND.format(
                                                                    item?.giaKhuyenMai
                                                                )}
                                                            </div>
                                                            <div className="soLuong">
                                                                {item.quantity}
                                                            </div>
                                                            <div className="thanhTien">
                                                                {VND.format(
                                                                    item.quantity *
                                                                        item.giaKhuyenMai
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            );
                        })}
                    </div>
                    <div className="tongTien">
                        <div className="tieude">Tổng Tiền Cần Thanh Toán</div>
                        <div className="sotien">{VND.format(Tongtien)}</div>
                    </div>
                </>
            )}
            {/* Don Truc Tiep */}

            {/* khosi */}
            {kho && kho === "si" && (
                <>
                    <div>
                        {arraySanPhamQuantity?.map((item2, index2) => {
                            return (
                                <div key={index2}>
                                    {item2?.map((item, index) => {
                                        return (
                                            <div key={index}>
                                                {item !== "hihi" && (
                                                    <div>
                                                        <div className="sanPham">
                                                            <div className="anhVaTen">
                                                                <img
                                                                    src={
                                                                        item?.AnhSanPham
                                                                    }
                                                                    className="anhSanPham"
                                                                    alt="timtim"
                                                                />
                                                                <div className="tenSanPham">
                                                                    {
                                                                        item?.TenSanPham
                                                                    }
                                                                </div>
                                                            </div>
                                                            <div className="giaBan">
                                                                {VND.format(
                                                                    item?.giaSi
                                                                )}
                                                            </div>
                                                            <div className="soLuong">
                                                                {item.quantity}
                                                            </div>
                                                            <div className="thanhTien">
                                                                {VND.format(
                                                                    item.quantity *
                                                                        item.giaSi
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            );
                        })}
                    </div>
                    <div className="tongTien">
                        <div className="tieude">Tổng Tiền Cần Thanh Toán</div>
                        <div className="sotien">{VND.format(Tongtien)}</div>
                    </div>
                </>
            )}
            {/* kho si */}
            {/* kho ctv */}
            {kho && kho === "ctv" && (
                <>
                    <div>
                        {arraySanPhamQuantity?.map((item2, index2) => {
                            return (
                                <div key={index2}>
                                    {item2?.map((item, index) => {
                                        return (
                                            <div key={index}>
                                                {item !== "hihi" && (
                                                    <div>
                                                        <div className="sanPham">
                                                            <div className="anhVaTen">
                                                                <img
                                                                    src={
                                                                        item?.AnhSanPham
                                                                    }
                                                                    className="anhSanPham"
                                                                    alt="timtim"
                                                                />
                                                                <div className="tenSanPham">
                                                                    {
                                                                        item?.TenSanPham
                                                                    }
                                                                </div>
                                                            </div>
                                                            <div className="giaBan">
                                                                {VND.format(
                                                                    item?.giaCtv
                                                                )}
                                                            </div>
                                                            <div className="soLuong">
                                                                {item.quantity}
                                                            </div>
                                                            <div className="thanhTien">
                                                                {VND.format(
                                                                    item.quantity *
                                                                        item.giaCtv
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            );
                        })}
                    </div>
                    <div className="tongTien">
                        <div className="tieude">Tổng Tiền Cần Thanh Toán</div>
                        <div className="sotien">{VND.format(Tongtien)}</div>
                    </div>
                </>
            )}
            {/* kho ctv */}

            {/* San Pham Lien Ket */}
            {sanPhamCtv && sanPhamCtv.length !== 0 && (
                <div>
                    <div className="tieuDeDonHang">Sản Phẩm Liên Kết</div>
                    <div className="sanPhamLienKet">
                        <div>Tên Sản Phẩm</div>
                        <div>Số Lượng</div>
                        <div>Nhập Hàng Tự Ship</div>
                        <div>Chuyển Đơn Kho Ship</div>
                    </div>
                </div>
            )}
            {thongTindh?.donHang?.map((item, index) => {
                return (
                    <div key={index}>
                        {sanPhamCtv?.map((item2, index2) => {
                            return (
                                <div key={index2}>
                                    {item?.idSanPham === item2 && (
                                        <div className="sanPhamLienKet">
                                            <div className="tenSanPham">
                                                {item.TenSanPham}
                                            </div>
                                            <div className="soLuong">
                                                {item.soLuong}
                                            </div>
                                            {nhapHang?.find(
                                                (item4) =>
                                                    item4 === item.idSanPham
                                            ) ? (
                                                <div className="daChuyen">
                                                    Đã Nhập
                                                </div>
                                            ) : (
                                                <div
                                                    onClick={() =>
                                                        handleNhapHang(item)
                                                    }
                                                    className="nhapHang"
                                                >
                                                    Nhập Hàng
                                                </div>
                                            )}
                                            {chuyenDon?.find(
                                                (item4) =>
                                                    item4 === item?.idSanPham
                                            ) ? (
                                                <div className="daChuyen">
                                                    Đã Chuyển
                                                </div>
                                            ) : (
                                                <div
                                                    onClick={() =>
                                                        handleChuyenDon(item)
                                                    }
                                                    className="chuyenDon"
                                                >
                                                    Chuyển Đơn
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                );
            })}
            {/* San Pham Lien Ket */}

            {/* Don Hang Lien Ket trang thai 5 */}
            {kho === "lienket" && (
                <>
                    <div>
                        {arraySanPhamQuantity?.map((item2, index2) => {
                            return (
                                <div key={index2}>
                                    {item2?.map((item, index) => {
                                        return (
                                            <div key={index}>
                                                {item !== "hihi" && (
                                                    <div>
                                                        <div className="sanPham">
                                                            <div className="anhVaTen">
                                                                <img
                                                                    src={
                                                                        item?.AnhSanPham
                                                                    }
                                                                    className="anhSanPham"
                                                                    alt="timtim"
                                                                />
                                                                <div className="tenSanPham">
                                                                    {
                                                                        item?.TenSanPham
                                                                    }
                                                                </div>
                                                            </div>
                                                            <div className="giaBan">
                                                                {VND.format(
                                                                    item?.giaKhuyenMai
                                                                )}
                                                            </div>
                                                            <div className="soLuong">
                                                                {item.quantity}
                                                            </div>
                                                            <div className="thanhTien">
                                                                {VND.format(
                                                                    item.quantity *
                                                                        item.giaKhuyenMai
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            );
                        })}
                    </div>
                    <div className="tongTien">
                        <div className="tieude">Tổng Tiền Cần Thanh Toán</div>
                        <div className="sotien">{VND.format(Tongtien)}</div>
                    </div>
                </>
            )}

            {/* Don Hang Lien Ket trang thai 5 */}

            <div className="phancach">
                <div className="thongTinNguoiNhan">Thanh Toán & Nơi Nhận</div>

                <div className="thongTinChiTiet">
                    <div className="tieuDe">Nơi Nhận</div>
                    <div className="noiDung">
                        {khachHang?.noiNhan}
                        {khachHang?.soBan && (
                            <>
                                &emsp;-&emsp;
                                {khachHang?.soBan}
                            </>
                        )}
                    </div>
                </div>
                <div className="thongTinChiTiet">
                    <div className="tieuDe">Thanh Toán</div>
                    <div className="noiDung"> {khachHang?.phuongThucTT}</div>
                </div>
            </div>
            {!khachHang?.soBan && (
                <div className="phancach">
                    <div className="thongTinNguoiNhan">
                        Thông Tin Người Nhận
                    </div>
                    <div className="thongTinChiTiet">
                        <div className="tieuDe">Họ Và Tên</div>
                        <div className="noiDung">
                            {khachHang?.hoTenNguoiMua}
                        </div>
                    </div>
                    <div className="thongTinChiTiet">
                        <div className="tieuDe">Số Điện Thoại</div>

                        <div className="noiDung">{khachHang?.sdtNguoiMua}</div>
                    </div>
                    <div className="thongTinChiTiet">
                        <div className="tieuDe">Địa Chỉ</div>
                        <div className="noiDung">{khachHang?.dcNguoiNMua}</div>
                    </div>

                    <div className="thongTinChiTiet">
                        <div className="tieuDe">Ghi Chú Thêm</div>
                        <div className="noiDung">
                            {khachHang?.ghiChuNguoiMua}
                        </div>
                    </div>
                </div>
            )}
            <div>
                {thongTindh?.trangThaiDH === 1 && (
                    // <a href={`/don-hang/${idShop}`}>
                    <button
                        className="hoanThanh"
                        onClick={() => handleGiaoHang(thongTindh?._id)}
                    >
                        Giao Hàng
                    </button>
                    // </a>
                )}
                {thongTindh?.trangThaiDH === 2 && (
                    <div>
                        {/* <a href={`/don-hang-dang-giao/${idShop}`}> */}
                        <button
                            className="huyDon"
                            onClick={() => handleHuyDon(thongTindh?._id)}
                        >
                            Huỷ Đơn
                        </button>
                        {/* </a> */}
                        {/* <a href={`/don-hang-dang-giao/${idShop}`}> */}
                        <button
                            className="hoanThanh"
                            onClick={() => handleHoanThanh(thongTindh?._id)}
                        >
                            Hoàn Thành
                        </button>
                        {/* </a> */}
                    </div>
                )}
                {thongTindh?.trangThaiDH === 3 && (
                    <div>
                        <button
                            className="huyDon"
                            onClick={() => handleTraLai(thongTindh?._id)}
                        >
                            Trả Hàng
                        </button>
                        <a href={`/don-hang-hoan-thanh/${idShop}`}>
                            <button className="hoanThanh">Đóng lại</button>
                        </a>
                    </div>
                )}
                {thongTindh?.trangThaiDH === 4 && (
                    <div>
                        <a href={`/don-hang-huy/${idShop}`}>
                            <button className="hoanThanh">Đóng lại</button>
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
};
export default DonHang;
