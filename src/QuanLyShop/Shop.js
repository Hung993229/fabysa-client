import "./Shop.scss";
import facebookLogo from "../assets/images/Facebook_Logo.png";
import zaloLogo from "../assets/images/zaloLogo.png";

import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import {
    getttShop,
    getSanPham,
    getPost,
    registerGioHang,
    updateGioHang,
    getGioHang,
    getYourStatus,
    getArrSanPham,
} from "../redux/apiRequest";
import { useEffect } from "react";
import GioHang from "./GioHang";
import ChiTietSanPham2 from "./ChiTietSanPham2";
import Loading from "../GiaoDienChung/Loading";
const Shop = (props) => {
    const {
        showcart,
        setshowcart,
        setTongtien,
        setTongsoluong,
        Tongtien,
        Tongsoluong,
    } = props;
    const user = useSelector((state) => state.auth.login.currentUser);
    const myDetail = useSelector((state) => state.post.post?.myDetail);
    const gioHang = useSelector(
        (state) => state.gioHang.gioHang.gioHang?.gioHang
    );
    const arraySanPhamx = useSelector(
        (state) => state.sanPham.sanPham.arrsanPham?.arrSanpham
    );
    const ttShop = useSelector((state) => state.ttShop.ttShop.ttShop?.shop);
    const allSanPhamx = useSelector(
        (state) => state.sanPham.sanPham.allsanPham?.allSanpham
    );
    const allSanPham1 = allSanPhamx?.filter(
        (item) => item.tinhTrang === "Còn Hàng"
    );
    const arraySanPham = arraySanPhamx?.filter(
        (item) => item.tinhTrang === "Còn Hàng"
    );
    const allshopLienKet = useSelector(
        (state) => state.yourStatus.yourStatus.allYourStatus?.yourStatus
    );
    const [cart, setcart] = useState([]);
    const [allSanPham, setallSanPham] = useState([]);
    const [arrNhomSanPham, setarrNhomSanPham] = useState([]);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { idShop } = useParams();
    const [iddetailSanPham, setiddetailSanPham] = useState("");
    const [showChiTietSanPham, setshowChiTietSanPham] = useState(0);
    const [tuVanVaThongTin, settuVanVaThongTin] = useState(0);
    const [loading, setloading] = useState(1);
    const khachSi = ttShop?.khachSi;
    const khachCtv = ttShop?.khachCtv;
    useEffect(() => {
        if (user && user.length !== 0) {
            getPost(user?._id, dispatch, setloading);
            getGioHang(idShop, user?._id, dispatch);
        }
    }, []);
    useEffect(() => {
        getttShop(idShop, dispatch);
        getYourStatus(idShop, dispatch);
    }, []);
    useEffect(() => {
        getSanPham(idShop, dispatch, setloading);
    }, []);
    const VND = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
    });

    // San Pham Shop
    useEffect(() => {
        if (allSanPham1) {
            setallSanPham(allSanPham1);
            const arrNhomSanPham3 = allSanPham1?.map((item) => {
                return item?.nhomSanPham;
            });
            const arrNhomSanPham2 = new Set(arrNhomSanPham3);

            setarrNhomSanPham([...arrNhomSanPham2]);
        }
    }, [allSanPhamx]);
    // San Pham Shop

    // san pham lien ket
    useEffect(() => {
        if (allshopLienKet) {
            const arrIdSanPham2 = allshopLienKet[0]?.sanPhamCtv.concat(
                allshopLienKet[0]?.sanPhamSi
            );
            const arrIdSanPham3 = new Set(arrIdSanPham2);
            const arrIdSanPham = [...arrIdSanPham3];
            getArrSanPham(arrIdSanPham, dispatch);
        }
    }, [allshopLienKet]);

    useEffect(() => {
        if (arraySanPham) {
            const allSanPham2 = arraySanPham?.concat(allSanPham1);
            const allSanPham3 = new Set(allSanPham2);
            setallSanPham([...allSanPham3]);

            const arrNhomSanPham3 = allSanPham?.map((item) => {
                return item?.nhomSanPham;
            });
            const arrNhomSanPham2 = new Set(arrNhomSanPham3);

            setarrNhomSanPham([...arrNhomSanPham2]);
        }
    }, [arraySanPhamx]);
    useEffect(() => {
        if (arraySanPham) {
            const arrNhomSanPham3 = allSanPham?.map((item) => {
                return item?.nhomSanPham;
            });
            const arrNhomSanPham2 = new Set(arrNhomSanPham3);

            setarrNhomSanPham([...arrNhomSanPham2]);
        }
    }, [allSanPham]);

    // san pham lien ket
    const thongTinSp = allSanPham?.find(
        (item) => item?._id === iddetailSanPham
    );
    // phan loai san pham
    // phan loai san pham
    // Them gio Hang
    const handleThemGioHang = (item) => {
        const ProductExist = cart?.find((item2) => item2?._id === item._id);
        if (ProductExist) {
            const gioHang2 = cart.map((item3) =>
                item3._id === item._id
                    ? {
                          ...ProductExist,
                          quantity: +ProductExist.quantity + 1,
                      }
                    : item3
            );
            setcart(gioHang2);
        } else {
            const gioHang3 = [...cart, { ...item, quantity: 1 }];
            setcart(gioHang3);
        }
        if (myDetail && myDetail?.length !== 0) {
            const id = item?._id;
            if (!gioHang) {
                const newGioHang = {
                    idShop: idShop,
                    user: user._id,
                    gioHang: id,
                };
                console.log("newGioHang", newGioHang);
                registerGioHang(newGioHang, dispatch);
            } else {
                const idSanPham = gioHang?.gioHang?.find(
                    (item2) => item2 === item._id
                );
                console.log("idSanPham", idSanPham);
                if (!idSanPham) {
                    const gioHangUpdate = [...gioHang.gioHang, id];
                    const newGioHang = {
                        idShop: idShop,
                        user: user._id,
                        gioHang: gioHangUpdate,
                    };
                    console.log("updateGioHang", newGioHang);
                    updateGioHang(newGioHang, gioHang._id, dispatch);
                }
            }
        }
    };

    // Tinh So Luong - Tong So Tien
    const tinhtongtien = () => {
        let tt = 0;
        if (cart?.length !== 0) {
            cart?.map((sp) => {
                tt += sp.giaKhuyenMai * sp.quantity;
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

    // Tinh So Luong - Tong So Tien
    // Chi Tiet San Pham
    const handleChiTietSanPham = (id) => {
        setshowChiTietSanPham(1);
        setiddetailSanPham(id);
    };
    // Chi Tiet San Pham
    const handleXoaSanPham = (item) => {
        if (cart?.length !== 0) {
            const ProductExist = cart?.find((item2) => item2._id === item._id);
            if (ProductExist) {
                setcart(cart?.filter((item2) => item2._id !== item._id));
            }
        }
    };
    return (
        <>
            {loading === 0 ? (
                <>
                    {showcart === 0 ? (
                        <>
                            {showChiTietSanPham === 0 ? (
                                <div>
                                    {ttShop && ttShop.length !== 0 && (
                                        <div className="shop">
                                            <div>
                                                <img
                                                    src={ttShop?.Banner}
                                                    className="banner-container"
                                                />
                                            </div>
                                            <div className="tenCuaHang">
                                                {ttShop?.TenShop}
                                            </div>
                                            <div className="slogan">
                                                {ttShop?.sloganShop}
                                            </div>

                                            <div className="tuVan-gioiThieu">
                                                <button
                                                    className="tuVan"
                                                    onClick={() =>
                                                        settuVanVaThongTin(2)
                                                    }
                                                >
                                                    QR Code
                                                </button>
                                                <button
                                                    className="gioiThieu"
                                                    onClick={() =>
                                                        settuVanVaThongTin(1)
                                                    }
                                                >
                                                    Liên Hệ
                                                </button>
                                            </div>
                                            {tuVanVaThongTin === 1 && (
                                                <div className="gioiThieuChiTiet">
                                                    <a href={`/shop/${idShop}`}>
                                                        <div className="tenCuaHang2">
                                                            {ttShop?.TenShop}
                                                        </div>
                                                    </a>
                                                    <div className="khoContainer">
                                                        {myDetail?.vaiTro ===
                                                            1 ||
                                                        user?._id ===
                                                            ttShop?.idNhanVien ? (
                                                            <a
                                                                href={`/ca-nhan`}
                                                            >
                                                                <div className="kho">
                                                                    Admin
                                                                </div>
                                                            </a>
                                                        ) : (
                                                            <></>
                                                        )}
                                                        {khachCtv?.find(
                                                            (item) =>
                                                                item ===
                                                                user?.username
                                                        ) ||
                                                        user?._id ===
                                                            ttShop?.user ||
                                                        myDetail?.vaiTro ===
                                                            1 ||
                                                        user?._id ===
                                                            ttShop?.idNhanVien ? (
                                                            <a
                                                                href={`/shop/kho-ctv/${idShop}`}
                                                            >
                                                                <div className="kho">
                                                                    Kho CTV
                                                                </div>
                                                            </a>
                                                        ) : (
                                                            <></>
                                                        )}
                                                        {khachSi?.find(
                                                            (item) =>
                                                                item ===
                                                                user?.username
                                                        ) ||
                                                        user?._id ===
                                                            ttShop?.user ||
                                                        user?._id ===
                                                            ttShop?.idNhanVien ? (
                                                            <a
                                                                href={`/shop/kho-si/${idShop}`}
                                                            >
                                                                <div className="kho">
                                                                    Kho Sỉ
                                                                </div>
                                                            </a>
                                                        ) : (
                                                            <></>
                                                        )}
                                                    </div>
                                                    <div className="dc">
                                                        - Địa Chỉ:{" "}
                                                        {ttShop?.dcShop}
                                                    </div>
                                                    <div className="dc">
                                                        - Số Điện Thoại:{" "}
                                                        {ttShop?.sdtShop}
                                                    </div>
                                                    <div className="dc">
                                                        - Quý Khách có thắc mắc
                                                        hoặc cần tư vấn xin vui
                                                        lòng <br /> nhắn tin qua
                                                        Zalo, Facebook bên dưới!
                                                    </div>
                                                    <div className="mxh">
                                                        <div className="zalo">
                                                            <a
                                                                href={
                                                                    ttShop?.linkZalo
                                                                }
                                                                target="_blank"
                                                            >
                                                                <img
                                                                    src={
                                                                        zaloLogo
                                                                    }
                                                                    className="zalo"
                                                                />
                                                            </a>
                                                        </div>
                                                        <div className="facebook">
                                                            <a
                                                                href={
                                                                    ttShop?.linkFacebook
                                                                }
                                                                target="_blank"
                                                            >
                                                                <img
                                                                    src={
                                                                        facebookLogo
                                                                    }
                                                                    className="facebook"
                                                                />
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <div className="sdt">
                                                        Xin chân thành cảm ơn!
                                                    </div>
                                                    <button
                                                        className="closeGioiThieu"
                                                        onClick={() =>
                                                            settuVanVaThongTin(
                                                                0
                                                            )
                                                        }
                                                    >
                                                        Close
                                                    </button>
                                                </div>
                                            )}
                                            {tuVanVaThongTin === 2 && (
                                                <div className="tuVanChiTiet">
                                                    <div className="loiNhan">
                                                        Quý Khách có thắc mắc
                                                        hoặc cần tư vấn xin vui
                                                        lòng <br /> nhắn tin qua
                                                        Zalo, Facebook bên dưới!
                                                    </div>
                                                    <div className="mxh">
                                                        <div className="zalo">
                                                            <a
                                                                href={
                                                                    ttShop?.linkZalo
                                                                }
                                                                target="_blank"
                                                            >
                                                                <img
                                                                    src={
                                                                        zaloLogo
                                                                    }
                                                                    className="zalo"
                                                                />
                                                            </a>
                                                        </div>
                                                        <div className="facebook">
                                                            <a
                                                                href={
                                                                    ttShop?.linkFacebook
                                                                }
                                                                target="_blank"
                                                            >
                                                                <img
                                                                    src={
                                                                        facebookLogo
                                                                    }
                                                                    className="facebook"
                                                                />
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <div className="loiNhan">
                                                        Xin trân trọng cảm ơn!
                                                    </div>
                                                    <button
                                                        className="closeGioiThieu"
                                                        onClick={() =>
                                                            settuVanVaThongTin(
                                                                0
                                                            )
                                                        }
                                                    >
                                                        Close
                                                    </button>
                                                </div>
                                            )}
                                            <div className="sanPham-shop">
                                                {" "}
                                                <div className="sanPham-container">
                                                    {arrNhomSanPham &&
                                                        arrNhomSanPham?.map(
                                                            (item2, index) => {
                                                                return (
                                                                    <div
                                                                        key={
                                                                            index
                                                                        }
                                                                        className="nhomSanPham-sanPham"
                                                                    >
                                                                        <div className="nhomSanPham">
                                                                            {item2 ===
                                                                            "Sản Phẩm Dẫn"
                                                                                ? "Top Sản Phẩm Bán Chạy"
                                                                                : item2}
                                                                        </div>

                                                                        <div className="sanPham-container">
                                                                            {allSanPham &&
                                                                                allSanPham?.map(
                                                                                    (
                                                                                        item,
                                                                                        index
                                                                                    ) => {
                                                                                        return (
                                                                                            item?.nhomSanPham ===
                                                                                                item2 && (
                                                                                                <div
                                                                                                    key={
                                                                                                        index
                                                                                                    }
                                                                                                    className="sanPham"
                                                                                                >
                                                                                                    <div>
                                                                                                        <img
                                                                                                            onClick={() =>
                                                                                                                handleChiTietSanPham(
                                                                                                                    item._id
                                                                                                                )
                                                                                                            }
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
                                                                                                        <>
                                                                                                            {cart?.find(
                                                                                                                (
                                                                                                                    item2
                                                                                                                ) =>
                                                                                                                    item2._id ===
                                                                                                                    item._id
                                                                                                            ) ? (
                                                                                                                <button
                                                                                                                    onClick={() =>
                                                                                                                        handleXoaSanPham(
                                                                                                                            item
                                                                                                                        )
                                                                                                                    }
                                                                                                                    className="daThem"
                                                                                                                >
                                                                                                                    ĐÃ
                                                                                                                    THÊM
                                                                                                                </button>
                                                                                                            ) : (
                                                                                                                <button
                                                                                                                    onClick={() =>
                                                                                                                        handleThemGioHang(
                                                                                                                            item
                                                                                                                        )
                                                                                                                    }
                                                                                                                    className="muaHang"
                                                                                                                >
                                                                                                                    THÊM
                                                                                                                    GIỎ
                                                                                                                    HÀNG
                                                                                                                </button>
                                                                                                            )}
                                                                                                        </>

                                                                                                        <div className="viTriSanPham">
                                                                                                            <i className="fa-solid fa-location-dot"></i>
                                                                                                            <div className="diachisanpham">
                                                                                                                {
                                                                                                                    item?.xa
                                                                                                                }
                                                                                                            </div>
                                                                                                            <div className="diachisanpham">
                                                                                                                {
                                                                                                                    item?.huyen
                                                                                                                }
                                                                                                            </div>
                                                                                                            <div className="diachisanpham">
                                                                                                                {
                                                                                                                    item?.tinh
                                                                                                                }
                                                                                                            </div>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </div>
                                                                                            )
                                                                                        );
                                                                                    }
                                                                                )}
                                                                        </div>
                                                                    </div>
                                                                );
                                                            }
                                                        )}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <ChiTietSanPham2
                                    handleXoaSanPham={handleXoaSanPham}
                                    cart={cart}
                                    setcart={setcart}
                                    handleThemGioHang={handleThemGioHang}
                                    thongTinSp={thongTinSp}
                                    showChiTietSanPham={showChiTietSanPham}
                                    setshowChiTietSanPham={
                                        setshowChiTietSanPham
                                    }
                                />
                            )}
                        </>
                    ) : (
                        <GioHang
                            handleXoaSanPham={handleXoaSanPham}
                            cart={cart}
                            setcart={setcart}
                            showcart={showcart}
                            setshowcart={setshowcart}
                            setTongtien={setTongtien}
                            setTongsoluong={setTongsoluong}
                            Tongtien={Tongtien}
                            Tongsoluong={Tongsoluong}
                        />
                    )}
                </>
            ) : (
                <Loading />
            )}
        </>
    );
};
export default Shop;
