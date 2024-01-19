import "./GioHang.scss";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getArrSanPham } from "../redux/apiRequest";
const GioHang = (props) => {
    const myDetail = useSelector((state) => state.post.post?.myDetail);
    const arraySanPham = useSelector(
        (state) => state.sanPham.sanPham.arrsanPham?.arrSanpham
    );
    console.log("arraySanPham", arraySanPham);
    const { cart, setcart, showcart, setshowcart } = props;
    const { idShop, idUser } = useParams();
    const [Tongtien, setTongtien] = useState(0);
    const dispatch = useDispatch();
    const VND = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
    });
    const [noiNhan, setnoiNhan] = useState();
    const [phuongThucTT, setphuongThucTT] = useState(
        "Thanh Toán Khi Nhận Hàng"
    );

    // getArrSanPham
    const arrIdSanPham = [
        "6586f15de0b763e0d54c56f5",
        "6591108704291fd3b4d91499",
        "6591112e04291fd3b4d914ab",
    ];
    useEffect(() => {
        getArrSanPham(arrIdSanPham, dispatch);
    }, []);
    // getArrSanPham

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
    const handleDonHangTaiBan = () => {};
    // Nhan Tai Ban
    // thong tin nguoi nhan không có user
    const [sdtNguoiMua, setsdtNguoiMua] = useState();
    const [hoTenNguoiMua, sethoTenNguoiMua] = useState();
    const [dcNguoiNMua, setdcNguoiNMua] = useState();
    const [ghiChuNguoiMua, setghiChuNguoiMua] = useState("Giao sớm nhé Shop!");
    const handleDonHangKhongUser = () => {};
    // thong tin nguoi nhan không có user
    // thong tin nguoi nhan có user
    const [sdtNguoiMua2, setsdtNguoiMua2] = useState(myDetail?.soDienThoai);
    const [hoTenNguoiMua2, sethoTenNguoiMua2] = useState(myDetail?.hoTen);
    const [dcNguoiNMua2, setdcNguoiNMua2] = useState(
        `${myDetail?.thonXom} - ${myDetail?.xa} - ${myDetail?.huyen} - ${myDetail?.tinh}`
    );
    const [ghiChuNguoiMua2, setghiChuNguoiMua2] =
        useState("Giao sớm nhé Shop!");
    const handleDonHangUser = () => {};
    // thong tin nguoi nhan có user
    // Thay doi so luong
    const handleThemGioHang = (item) => {
        const ProductExist = cart?.find((item2) => item2?._id === item._id);
        if (ProductExist) {
            setcart(
                cart?.map((item3) =>
                    item3._id === item._id
                        ? {
                              ...ProductExist,
                              quantity: +ProductExist.quantity + 1,
                          }
                        : item3
                )
            );
        } else {
            setcart([...cart, { ...item, quantity: 1 }]);
        }
    };
    const handleTruGioHang = (item) => {
        const ProductExist = cart?.find((item2) => item2._id === item._id);

        if (ProductExist.quantity === 1) {
            setcart(cart?.filter((item2) => item2._id !== item._id));
        } else {
            setcart(
                cart?.map((item2) =>
                    item2._id === item._id
                        ? {
                              ...ProductExist,
                              quantity: +ProductExist.quantity - 1,
                          }
                        : item2
                )
            );
        }
    };
    const handleSoLuong = (sl, item) => {
        console.log("sl", sl);
        console.log("item", item);
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
    const tinhtongtien = () => {
        let tt = 0;
        cart?.map((sp) => {
            tt += sp.giaKhuyenMai * sp.quantity;
        });
        setTongtien(tt);
    };
    useEffect(() => {
        tinhtongtien();
    });
    // Thay doi so luong
    return (
        <>
            {showcart !== 0 && (
                <div className="gioHang-container">
                    <div className="close" onClick={() => setshowcart(0)}>
                        Close
                    </div>

                    {cart?.length === 0 && (
                        <div className="gioHangTrong">Giỏ Hàng Trống</div>
                    )}
                    {cart?.length !== 0 && (
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
                                                    {VND.format(
                                                        item?.giaKhuyenMai
                                                    )}
                                                </div>

                                                <div className="giaGiam">
                                                    <div className="giabanCu">
                                                        {VND.format(
                                                            item?.giaNiemYet
                                                        )}
                                                    </div>
                                                    <div className="phanTram">
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

                                            {/* <button onClick={() => handleTruGioHang(item)}>
                                    -
                                </button> */}
                                            <input
                                                className="soLuong"
                                                type="number"
                                                min="0"
                                                onChange={(e) =>
                                                    handleSoLuong(
                                                        e.target.value,
                                                        item
                                                    )
                                                }
                                                placeholder={item.quantity}
                                            />
                                            {/* <button onClick={() => handleThemGioHang(item)}>
                                    +
                                </button> */}

                                            <div className="thanhTien">
                                                {VND.format(
                                                    item.quantity *
                                                        item.giaKhuyenMai
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
                                        onChange={(e) =>
                                            setnoiNhan(e.target.value)
                                        }
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
                                                    arrSoBan.map(
                                                        (item, index) => {
                                                            return (
                                                                <option
                                                                    key={index}
                                                                >
                                                                    {item}
                                                                </option>
                                                            );
                                                        }
                                                    )}
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
                                    {myDetail && myDetail.length !== 0 ? (
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
                                                    placeholder={
                                                        ghiChuNguoiMua2
                                                    }
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
                                                    Đăng kí tài khoản để mua
                                                    hàng nhanh hơn vào lần sau!
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
                                    {myDetail && myDetail.length !== 0 ? (
                                        <button
                                            onClick={() => handleDonHangUser()}
                                            className="datHang"
                                        >
                                            ĐẶT HÀNG
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() =>
                                                handleDonHangKhongUser()
                                            }
                                            className="datHang"
                                        >
                                            ĐẶT HÀNG
                                        </button>
                                    )}
                                </>
                            )}
                        </div>
                    )}
                </div>
            )}
        </>
    );
};
export default GioHang;
