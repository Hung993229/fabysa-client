import "./GioHang.scss";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    getArrSanPham,
    updateGioHang,
    getGioHang,
    registerDonHang,
    deleteGioHang,
} from "../redux/apiRequest";
const GioHangSi = (props) => {
    const {
        cart,
        setcart,
        showcart,
        setshowcart,
        setTongtien,
        setTongsoluong,
        Tongtien,
        Tongsoluong,
        handleXoaSanPham,
    } = props;
    const user = useSelector((state) => state.auth.login.currentUser);
    const myDetail = useSelector((state) => state.post.post?.myDetail);
    const donHang = useSelector(
        (state) => state.donHang.donHang.donHang?.donHang
    );
    const ttShop = useSelector((state) => state.ttShop.ttShop.ttShop?.shop);
    console.log("cart", cart);
    const { idShop } = useParams();

    const dispatch = useDispatch();
    const VND = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
    });
    const [noiNhan, setnoiNhan] = useState();
    const [phuongThucTT, setphuongThucTT] = useState(
        "Thanh Toán Khi Nhận Hàng"
    );
    const [donHangQuantity, setdonHangQuantity] = useState(
        cart?.map((item) => {
            return {
                idSanPham: item._id,
                TenSanPham: item.TenSanPham,
                soLuong: item.quantity,
            };
        })
    );
    console.log("donHangQuantity", donHangQuantity);
    useEffect(() => {
        setdonHangQuantity(
            cart?.map((item) => {
                return {
                    idSanPham: item._id,
                    TenSanPham: item.TenSanPham,
                    soLuong: item.quantity,
                };
            })
        );
    }, [cart]);
    useEffect(() => {
        const timSoLuongAm = cart?.find(
            (item) => +item.quantity === 0 || +item.quantity < 0
        );
        if (timSoLuongAm && timSoLuongAm.length !== 0) {
            setcart(cart?.filter((item2) => item2._id !== timSoLuongAm._id));
        }
    });

    // Nhan Tai Ban
    const [soBan, setsoBan] = useState();
    const arrSoBan = [
        "Bàn 1",
        "Bàn 2",
        "Bàn 3",
        "Bàn 4",
        "Bàn 5",
        "Bàn 6",
        "Bàn 7",
        "Bàn 8",
        "Bàn 9",
        "Bàn 10",
        "Bàn 11",
        "Bàn 12",
        "Bàn 13",
        "Bàn 14",
        "Bàn 15",
        "Bàn 16",
        "Bàn 17",
        "Bàn 18",
        "Bàn 19",
        "Bàn 20",
        "Bàn 21",
        "Bàn 22",
        "Bàn 23",
        "Bàn 24",
        "Bàn 25",
        "Bàn 26",
        "Bàn 27",
        "Bàn 28",
        "Bàn 29",
        "Bàn 30",
    ];
    const handleDonHangTaiBan = () => {
        if (!soBan) {
            alert("Vui lòng chọn số bàn!");
        } else {
            try {
                const khachHangArr = {
                    phuongThucTT: phuongThucTT,
                    noiNhan: noiNhan,
                    soBan: soBan,
                    Kho: "si",
                };

                const newDonHang = {
                    khachHang: khachHangArr,
                    donHang: donHangQuantity,
                    idShop: idShop,
                    trangThaiDH: 1,
                    idCtv: "",
                    idKhachHang: myDetail?.user || "",
                };
                console.log("newDonHang", newDonHang);
                registerDonHang(newDonHang, dispatch);
                setcart([]);
            } catch (err) {
                console.log(err);
            }
        }
    };
    // Nhan Tai Ban
    // thong tin nguoi nhan không có user
    const [sdtNguoiMua, setsdtNguoiMua] = useState();
    const [hoTenNguoiMua, sethoTenNguoiMua] = useState();
    const [dcNguoiNMua, setdcNguoiNMua] = useState();
    const [ghiChuNguoiMua, setghiChuNguoiMua] = useState("Giao sớm nhé Shop!");
    const handleDonHangKhongUser = () => {
        if (!noiNhan) {
            alert("Vui lòng chọn nơi nhận!");
        } else {
            if (!hoTenNguoiMua || !sdtNguoiMua || !dcNguoiNMua) {
                alert("Vui lòng nhập đủ thông tin nhận hàng!");
            } else {
                try {
                    const khachHangArr = {
                        hoTenNguoiMua: hoTenNguoiMua,
                        sdtNguoiMua: sdtNguoiMua,
                        dcNguoiNMua: dcNguoiNMua,
                        ghiChuNguoiMua: ghiChuNguoiMua,
                        phuongThucTT: phuongThucTT,
                        noiNhan: noiNhan,
                        Kho: "si",
                    };

                    const newDonHang = {
                        khachHang: khachHangArr,
                        donHang: donHangQuantity,
                        idShop: idShop,
                        trangThaiDH: 1,
                        idCtv: "",
                        idKhachHang: myDetail?.user || "",
                    };
                    console.log("newDonHang", newDonHang);
                    registerDonHang(newDonHang, dispatch);
                    setcart([]);
                } catch (err) {
                    console.log(err);
                }
            }
        }
    };
    // thong tin nguoi nhan không có user
    // thong tin nguoi nhan có user
    const [sdtNguoiMua2, setsdtNguoiMua2] = useState(myDetail?.soDienThoai);
    const [hoTenNguoiMua2, sethoTenNguoiMua2] = useState(myDetail?.hoTen);
    const [dcNguoiNMua2, setdcNguoiNMua2] = useState(
        `${myDetail?.thonXom} - ${myDetail?.xa} - ${myDetail?.huyen} - ${myDetail?.tinh}`
    );
    const [ghiChuNguoiMua2, setghiChuNguoiMua2] =
        useState("Giao sớm nhé Shop!");

    const handleDonHangUser = () => {
        if (!noiNhan) {
            alert("Vui lòng chọn nơi nhận!");
        } else {
            if (!hoTenNguoiMua2 || !sdtNguoiMua2 || !dcNguoiNMua2) {
                alert("Vui lòng nhập đủ thông tin nhận hàng!");
            } else {
                try {
                    const khachHangArr = {
                        hoTenNguoiMua: hoTenNguoiMua2,
                        sdtNguoiMua: sdtNguoiMua2,
                        dcNguoiNMua: dcNguoiNMua2,
                        ghiChuNguoiMua: ghiChuNguoiMua2,
                        phuongThucTT: phuongThucTT,
                        noiNhan: noiNhan,
                        Kho: "si",
                    };

                    const newDonHang = {
                        khachHang: khachHangArr,
                        donHang: donHangQuantity,
                        idShop: idShop,
                        trangThaiDH: 1,
                        idCtv: "",
                        idKhachHang: myDetail?.user || "",
                    };
                    console.log("newDonHang", newDonHang);
                    registerDonHang(newDonHang, dispatch);
                    setcart([]);
                } catch (err) {
                    console.log(err);
                }
            }
        }
    };
    // thong tin nguoi nhan có user
    // Thay doi so luong khong user
    const handleSoLuong = (sl, item) => {
        const ProductExist = cart.find((item2) => item2._id === item._id);

        if (ProductExist) {
            setcart(
                cart?.map((item2) =>
                    item2._id === item._id
                        ? {
                              ...ProductExist,
                              quantity: sl,
                          }
                        : item2
                )
            );
        }
    };
    // Thay doi so luong khong user

    const tinhtongtien = () => {
        let tt = 0;
        if (cart?.length !== 0) {
            cart?.map((sp) => {
                tt += sp.giaSi * sp.quantity;
            });
        }

        setTongtien(tt);
    };
    const tinhsoluong = () => {
        let tt = 0;
        if (cart?.length !== 0) {
            cart?.map((sp) => {
                tt += +sp.quantity;
            });
        }

        setTongsoluong(tt);
    };
    useEffect(() => {
        tinhtongtien();
        tinhsoluong();
    });
    return (
        <>
            <div className="gioHang-container">
                <div className="close" onClick={() => setshowcart(0)}>
                    Close
                </div>

                {cart?.length !== 0 ? (
                    <div>
                        <div className="phancach">
                            <div className="thongTinDonHang">
                                Thông Tin Giỏ Hàng
                            </div>
                            <div className="sanPham">
                                <div>Sản Phẩm</div>
                                <div>Đơn Giá</div>
                                <div>Số Lượng</div>
                                <div>Thành Tiền</div>
                            </div>
                            {cart?.map((item) => {
                                return (
                                    <div key={item._id} className="sanPham">
                                        <div className="anhVaTen">
                                            <img
                                                src={item?.AnhSanPham}
                                                className="anhSanPham"
                                                alt="timtim"
                                            />
                                            <div className="tenSanPham">
                                                {item.TenSanPham}
                                            </div>
                                        </div>
                                        <div className="giaBan">
                                            <div className="giaBanMoi">
                                                {VND.format(item?.giaSi)}
                                            </div>

                                            <div className="giaGiam">
                                                <div className="giabanCu">
                                                    {VND.format(
                                                        item?.giaKhuyenMai
                                                    )}
                                                </div>
                                                <div className="phanTram">
                                                    Giảm&nbsp;
                                                    {Math.floor(
                                                        (100 *
                                                            (item?.giaKhuyenMai -
                                                                item?.giaSi)) /
                                                            item?.giaKhuyenMai
                                                    )}
                                                    %
                                                </div>
                                            </div>
                                        </div>

                                        <div className="soluong-xoaSanPham">
                                            <input
                                                className="soLuong"
                                                type="number"
                                                min="1"
                                                onChange={(e) =>
                                                    handleSoLuong(
                                                        e.target.value,
                                                        item
                                                    )
                                                }
                                                placeholder={item.quantity}
                                            />
                                            <button
                                                className="xoaSanPham"
                                                onClick={() =>
                                                    handleXoaSanPham(item)
                                                }
                                            >
                                                X
                                            </button>
                                        </div>
                                        <div className="thanhTien">
                                            {VND.format(
                                                item.quantity * item.giaSi
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                            <div className="tongTien">
                                <div className="tieude">
                                    Tổng Tiền Cần Thanh Toán
                                </div>
                                <div className="sotien">
                                    {VND.format(Tongtien)}
                                </div>
                            </div>
                        </div>
                        <div className="phancach">
                            <div className="thongTinNguoiNhan">
                                Thanh Toán & Nơi Nhận
                            </div>

                            <div className="thongTinChiTiet">
                                <div className="tieuDe">Nơi Nhận</div>
                                <select
                                    onChange={(e) => setnoiNhan(e.target.value)}
                                    className="noiDung"
                                >
                                    <option value="">---Mời Chọn---</option>
                                    <option>Ship Tận Nơi</option>
                                    <option>Nhận Tại Quầy</option>
                                    <option>Nhận Tại Bàn</option>
                                </select>
                            </div>
                            {noiNhan === "Nhận Tại Bàn" && (
                                <>
                                    <div className="thongTinChiTiet">
                                        <div className="tieuDe">Số Bàn</div>

                                        <select
                                            onChange={(e) =>
                                                setsoBan(e.target.value)
                                            }
                                            className="noiDung"
                                        >
                                            <option value="">
                                                ---Mời Chọn---
                                            </option>
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
                                    </div>
                                </>
                            )}

                            <div className="thongTinChiTiet">
                                <div className="tieuDe">Thanh Toán</div>
                                <select
                                    onChange={(e) =>
                                        setphuongThucTT(e.target.value)
                                    }
                                    className="noiDung"
                                >
                                    <option value="">---Mời Chọn---</option>
                                    <option>Thanh Toán Khi Nhận</option>
                                    <option>Chuyển Khoản Ngay</option>
                                </select>
                            </div>
                        </div>
                        {noiNhan !== "Nhận Tại Bàn" && (
                            <>
                                {myDetail &&
                                myDetail.length !== 0 &&
                                myDetail?.user !== ttShop?.user &&
                                myDetail?.user !== ttShop?.idNhanVien ? (
                                    <div className="phancach">
                                        <div className="thongTinNguoiNhan">
                                            Thông Tin Người Nhận
                                        </div>
                                        <div className="thongTinChiTiet">
                                            <div className="tieuDe">
                                                Họ Và Tên
                                            </div>
                                            <input
                                                className="noiDung"
                                                onChange={(e) =>
                                                    sethoTenNguoiMua2(
                                                        e.target.value
                                                    )
                                                }
                                                placeholder={hoTenNguoiMua2}
                                            />
                                        </div>
                                        <div className="thongTinChiTiet">
                                            <div className="tieuDe">
                                                Số Điện Thoại
                                            </div>

                                            <input
                                                className="noiDung"
                                                onChange={(e) =>
                                                    setsdtNguoiMua2(
                                                        e.target.value
                                                    )
                                                }
                                                placeholder={sdtNguoiMua2}
                                            />
                                        </div>
                                        <div className="thongTinChiTiet">
                                            <div className="tieuDe">
                                                Địa Chỉ
                                            </div>
                                            <input
                                                className="noiDung"
                                                onChange={(e) =>
                                                    setdcNguoiNMua2(
                                                        e.target.value
                                                    )
                                                }
                                                placeholder={dcNguoiNMua2}
                                            />
                                        </div>

                                        <div className="thongTinChiTiet">
                                            <div className="tieuDe">
                                                Ghi Chú Thêm
                                            </div>
                                            <input
                                                className="noiDung"
                                                placeholder={ghiChuNguoiMua2}
                                                onChange={(e) =>
                                                    setghiChuNguoiMua2(
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </div>
                                    </div>
                                ) : (
                                    <div className="phancach">
                                        <div className="thongTinNguoiNhan">
                                            Thông Tin Người Nhận
                                        </div>
                                        <div className="thongTinChiTiet">
                                            <div className="tieuDe">
                                                Họ Và Tên
                                            </div>
                                            <input
                                                className="noiDung"
                                                onChange={(e) =>
                                                    sethoTenNguoiMua(
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="Nhập họ và tên"
                                            />
                                        </div>
                                        <div className="thongTinChiTiet">
                                            <div className="tieuDe">
                                                Số Điện Thoại
                                            </div>

                                            <input
                                                className="noiDung"
                                                onChange={(e) =>
                                                    setsdtNguoiMua(
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="Nhập số điện thoại"
                                            />
                                        </div>
                                        <div className="thongTinChiTiet">
                                            <div className="tieuDe">
                                                Địa Chỉ
                                            </div>
                                            <input
                                                className="noiDung"
                                                onChange={(e) =>
                                                    setdcNguoiNMua(
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="Nhập địa chỉ"
                                            />
                                        </div>

                                        <div className="thongTinChiTiet">
                                            <div className="tieuDe">
                                                Ghi Chú Thêm
                                            </div>
                                            <input
                                                className="noiDung"
                                                placeholder="Giao nhanh nhé Shop! ..."
                                                onChange={(e) =>
                                                    setghiChuNguoiMua(
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </div>
                                        <div>
                                            <a
                                                className="luuY"
                                                href={`/shop/dang-ki/${idShop}`}
                                            >
                                                Đăng kí tài khoản để mua hàng
                                                nhanh hơn vào lần sau!
                                            </a>
                                        </div>
                                    </div>
                                )}
                            </>
                        )}
                        {noiNhan === "Nhận Tại Bàn" ? (
                            <button
                                onClick={() => handleDonHangTaiBan()}
                                className="datHang"
                            >
                                ĐẶT HÀNG
                            </button>
                        ) : (
                            <>
                                {myDetail &&
                                myDetail.length !== 0 &&
                                myDetail?.user !== ttShop?.user &&
                                myDetail?.user !== ttShop?.idNhanVien ? (
                                    <button
                                        onClick={() => handleDonHangUser()}
                                        className="datHang"
                                    >
                                        ĐẶT HÀNG
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => handleDonHangKhongUser()}
                                        className="datHang"
                                    >
                                        ĐẶT HÀNG
                                    </button>
                                )}
                            </>
                        )}
                    </div>
                ) : (
                    <>
                        {!donHang ? (
                            <div className="gioHangTrong">Giỏ Hàng Trống!</div>
                        ) : (
                            <div className="gioHangTrong">
                                Đặt Hàng Thành Công!
                            </div>
                        )}
                    </>
                )}
            </div>
        </>
    );
};
export default GioHangSi;
