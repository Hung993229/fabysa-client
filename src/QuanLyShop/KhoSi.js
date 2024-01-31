import "./KhoSi.scss";
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
    registerYourStatus,
    updateYourStatusUser,
    getYourStatus,
} from "../redux/apiRequest";
import { useEffect } from "react";
import GioHangSi from "./GioHangSi";
import ChiTietSanPham2 from "./ChiTietSanPham2";
import Loading from "../GiaoDienChung/Loading";
const KhoSi = (props) => {
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
    const arraySanPham = useSelector(
        (state) => state.sanPham.sanPham.arrsanPham?.arrSanpham
    );
    const ttShop = useSelector((state) => state.ttShop.ttShop.ttShop?.shop);
    const allShop = useSelector(
        (state) => state.ttShop.ttShop.allttShop?.AllShop
    );
    const allSanPham = useSelector(
        (state) => state.sanPham.sanPham.allsanPham?.allSanpham
    );
    const [cart, setcart] = useState([]);
    const shopLienKet = useSelector(
        (state) => state.yourStatus.yourStatus.yourStatus?.yourstatus
    );
    const allshopLienKet = useSelector(
        (state) => state.yourStatus.yourStatus.allYourStatus?.yourStatus
    );
    console.log("allshopLienKet", allshopLienKet);
    console.log("shopLienKet", shopLienKet);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { idShop } = useParams();
    const [iddetailSanPham, setiddetailSanPham] = useState("");
    const [showChiTietSanPham, setshowChiTietSanPham] = useState(0);
    const thongTinSp = allSanPham?.find((item) => item._id === iddetailSanPham);
    const [tuVanVaThongTin, settuVanVaThongTin] = useState(0);
    const [loading, setloading] = useState(1);
    const [idShopLienKet, setidShopLienKet] = useState();

    useEffect(() => {
        if (user && user.length !== 0) {
            getPost(user?._id, dispatch, setloading);
            getGioHang(idShop, user?._id, dispatch);
        }
    }, []);
    useEffect(() => {
        if (user && user.length !== 0) {
            getYourStatus(user?._id, dispatch);
        }
    }, [shopLienKet]);
    useEffect(() => {
        getttShop(idShop, dispatch);
    }, []);
    useEffect(() => {
        getSanPham(idShop, dispatch, setloading);
    }, []);
    const VND = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
    });

    // phan loai san pham
    const allSanPhamDan = allSanPham?.filter(
        (item) => item.nhomSanPham === "Sản Phẩm Dẫn"
    );
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
    // Them vao Shop
    const handleThemVaoShop = (id) => {
        if (!idShopLienKet) {
            alert("Vui lòng chọn Shop muốn thêm vào!");
        } else {
            const xetIdShopLienKet = allshopLienKet.find(
                (item) => item.idShop === idShopLienKet
            );
            if (!xetIdShopLienKet) {
                const newshopLienKet = {
                    idShop: idShopLienKet,
                    user: user._id,
                    sanPhamSi: id,
                };

                registerYourStatus(newshopLienKet, dispatch);
            } else {
                const idSanPham = xetIdShopLienKet?.sanPhamSi?.find(
                    (item2) => item2 === id
                );

                if (!idSanPham) {
                    const gioHangUpdate = [...xetIdShopLienKet?.sanPhamSi, id];
                    const newshopLienKet = {
                        idShop: idShopLienKet,
                        user: user._id,
                        sanPhamSi: gioHangUpdate,
                    };
                    updateYourStatusUser(
                        newshopLienKet,
                        xetIdShopLienKet._id,
                        dispatch
                    );
                } else {
                    alert("Đã thêm");
                }
            }
        }
    };
    // Them vao Shop
    // phan loai san pham
    const arrNhomSanPham3 = allSanPham?.map((item) => {
        return item.nhomSanPham !== "Sản Phẩm Dẫn" && item.nhomSanPham;
    });
    const arrNhomSanPham2 = new Set(arrNhomSanPham3);
    const arrNhomSanPham = [...arrNhomSanPham2];
    // phan loai san pham
    console.log("allSanPham", allSanPham);
    return (
        <>
            {loading === 0 ? (
                <>
                    {showcart === 0 ? (
                        <>
                            {showChiTietSanPham === 0 ? (
                                <div>
                                    {ttShop && ttShop.length !== 0 && (
                                        <div className="shopCtv-container">
                                            <div>
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
                                                            settuVanVaThongTin(
                                                                2
                                                            )
                                                        }
                                                    >
                                                        QR Code
                                                    </button>
                                                    <button
                                                        className="gioiThieu"
                                                        onClick={() =>
                                                            settuVanVaThongTin(
                                                                1
                                                            )
                                                        }
                                                    >
                                                        Liên Hệ
                                                    </button>
                                                </div>
                                                {tuVanVaThongTin === 1 && (
                                                    <div className="gioiThieuChiTiet">
                                                        <a href={`/ca-nhan`}>
                                                            <div className="tenCuaHang2">
                                                                {
                                                                    ttShop?.TenShop
                                                                }
                                                            </div>
                                                        </a>
                                                        <a
                                                            href={`/shop/kho-ctv/${idShop}`}
                                                        >
                                                            <div className="tenCuaHang2">
                                                                Kho CTV
                                                            </div>
                                                        </a>
                                                        <a
                                                            href={`/shop/kho-si/${idShop}`}
                                                        >
                                                            <div className="tenCuaHang2">
                                                                Kho Sỉ
                                                            </div>
                                                        </a>
                                                        <div className="dc">
                                                            Địa Chỉ:{" "}
                                                            {ttShop?.dcShop}
                                                        </div>
                                                        <div className="dc">
                                                            Số Điện Thoại:{" "}
                                                            {ttShop?.sdtShop}
                                                        </div>
                                                        <div className="sdt">
                                                            {ttShop?.sloganShop}
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
                                                            Quý Khách có thắc
                                                            mắc hoặc cần tư vấn
                                                            xin vui lòng <br />{" "}
                                                            nhắn tin qua Zalo,
                                                            Facebook bên dưới!
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
                                                            Xin trân trọng cảm
                                                            ơn!
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
                                            </div>
                                            <div className="sanPham-shop">
                                                {/* ssp dan */}
                                                {arrNhomSanPham &&
                                                    arrNhomSanPham?.map(
                                                        (item2, index) => {
                                                            return (
                                                                <div
                                                                    key={index}
                                                                    className="nhomSanPham-sanPham"
                                                                >
                                                                    <div className="nhomSanPham">
                                                                        {item2 ===
                                                                        "Sản Phẩm Dẫn"
                                                                            ? "Khuyến Mại Đặc Biệt"
                                                                            : item2}
                                                                    </div>

                                                                    <div className="sanPham-container">
                                                                        {allSanPham &&
                                                                            allSanPham?.map(
                                                                                (
                                                                                    item
                                                                                ) => {
                                                                                    return (
                                                                                        item.nhomSanPham ===
                                                                                            item2 && (
                                                                                            <div
                                                                                                key={
                                                                                                    item._id
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
                                                                                                        <div className="giaCtv">
                                                                                                            Giá
                                                                                                            Sỉ
                                                                                                        </div>
                                                                                                        <div className="giaBanMoi">
                                                                                                            {VND.format(
                                                                                                                item?.giaSi
                                                                                                            )}
                                                                                                        </div>

                                                                                                        <div className="giaGiam">
                                                                                                            <div className="giabanCu">
                                                                                                                {VND.format(
                                                                                                                    item?.giaKhuyenMai
                                                                                                                )}
                                                                                                            </div>
                                                                                                            <div className="phanTram">
                                                                                                                Chiết
                                                                                                                Khấu&nbsp;
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
                                                                                                    <select
                                                                                                        onChange={(
                                                                                                            e
                                                                                                        ) =>
                                                                                                            setidShopLienKet(
                                                                                                                e
                                                                                                                    .target
                                                                                                                    .value
                                                                                                            )
                                                                                                        }
                                                                                                    >
                                                                                                        <option value="">
                                                                                                            ---Chọn
                                                                                                            Shop---
                                                                                                        </option>
                                                                                                        {allShop &&
                                                                                                            allShop.length >
                                                                                                                0 &&
                                                                                                            allShop.map(
                                                                                                                (
                                                                                                                    item,
                                                                                                                    index
                                                                                                                ) => {
                                                                                                                    return (
                                                                                                                        <option
                                                                                                                            value={
                                                                                                                                item._id
                                                                                                                            }
                                                                                                                            key={
                                                                                                                                index
                                                                                                                            }
                                                                                                                        >
                                                                                                                            {
                                                                                                                                item.TenShop
                                                                                                                            }
                                                                                                                        </option>
                                                                                                                    );
                                                                                                                }
                                                                                                            )}
                                                                                                    </select>
                                                                                                    <div
                                                                                                        onClick={() =>
                                                                                                            handleThemVaoShop(
                                                                                                                item._id
                                                                                                            )
                                                                                                        }
                                                                                                        className="themVaoShop"
                                                                                                    >
                                                                                                        THÊM
                                                                                                        VÀO
                                                                                                        SHOP
                                                                                                    </div>
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
                        <GioHangSi
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
export default KhoSi;
