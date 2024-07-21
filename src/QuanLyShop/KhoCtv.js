import "./KhoCtv.scss";
import logoInternet from "../assets/images/logoInternet.jpg";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import like from "../assets/images/like.jpg";
import like2 from "../assets/images/like2.jpg";
import gioHang2 from "../assets/images/giohang2.jpg";
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
    getAllttShop,
} from "../redux/apiRequest";
import { useEffect } from "react";
import GioHang from "./GioHangCtv";
import ChiTietSanPham2 from "./ChiTietSanPham2";
import Loading from "../GiaoDienChung/Loading";
const KhoCtv = (props) => {
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
    const allSanPham1 = useSelector(
        (state) => state.sanPham.sanPham.allsanPham?.allSanpham
    );
    const [cart, setcart] = useState([]);
    const [skip, setskip] = useState(0);
    const shopLienKet = useSelector(
        (state) => state.yourStatus.yourStatus.yourStatus?.yourstatus
    );
    const allshopLienKet = useSelector(
        (state) => state.yourStatus.yourStatus.allYourStatus?.yourStatus
    );
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { idShop } = useParams();
    const [iddetailSanPham, setiddetailSanPham] = useState("");
    const [showChiTietSanPham, setshowChiTietSanPham] = useState(0);
    const [tuVanVaThongTin, settuVanVaThongTin] = useState(0);
    const [loading, setloading] = useState(1);
    const [idShopLienKet, setidShopLienKet] = useState();
    const [nhomSP, setnhomSP] = useState();
    const [allSanPham, setallSanPham] = useState([]);
    const [thongTinSp, setthongTinSp] = useState();

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
        if (user) {
            getAllttShop(user?._id, dispatch);
        }
    }, []);
    useEffect(() => {
        const limit = 100;
        getSanPham(idShop, nhomSP, skip, limit, dispatch, setloading);
    }, [nhomSP]);
    const VND = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
    });

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
    const handleChiTietSanPham = (item) => {
        setshowChiTietSanPham(1);
        setthongTinSp(item);
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
            alert("Vui lòng chọn Shop!");
        } else {
            const xetIdShopLienKet = allshopLienKet.find(
                (item) => item.idShop === idShopLienKet
            );
            if (!xetIdShopLienKet) {
                const newshopLienKet = {
                    idShop: idShopLienKet,
                    user: user._id,
                    sanPhamCtv: id,
                };
                console.log("newGioHang", newshopLienKet);

                registerYourStatus(newshopLienKet, dispatch);
            } else {
                const idSanPham = xetIdShopLienKet?.sanPhamCtv?.find(
                    (item2) => item2 === id
                );

                if (!idSanPham) {
                    const gioHangUpdate = [...xetIdShopLienKet?.sanPhamCtv, id];
                    const newshopLienKet = {
                        idShop: idShopLienKet,
                        user: user._id,
                        sanPhamCtv: gioHangUpdate,
                    };
                    console.log("gioHangUpdate", gioHangUpdate);
                    updateYourStatusUser(
                        newshopLienKet,
                        xetIdShopLienKet._id,
                        setloading,
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

    const arrNhomSanPham = ttShop?.nhomSanPham;
    useEffect(() => {
        if (allSanPham1 && allSanPham1?.length !== 0) {
            setallSanPham([...allSanPham, ...allSanPham1]);
        }
    }, [allSanPham1]);

    // phan loai san pham
    // An San Pham
    const handleHienNhomSP = (item2) => {
        setloading(item2);
        setnhomSP(item2);
    };
    const handleAnNhomSP = (item2) => {
        const anSp = allSanPham.filter((item) => item.nhomSanPham !== item2);
        setallSanPham(anSp);
        setnhomSP();
    };
    // An San Pham
    // Da mo Shop
    const handleDaMoShop = () => {
        alert("Shop của bạn đã được mở!")
    }
    // Da mo Shop

    return (
        <>
            {(loading === 0 || loading !== 1) && (
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
                                                <a href={`/shop/${idShop}`}>
                                                    <div className="tenCuaHang">
                                                        {ttShop?.TenShop}
                                                    </div>
                                                    <div className="internet-website">
                                                        <img
                                                            src={logoInternet}
                                                            className="internet"
                                                        />
                                                        <div className="website">
                                                            Https://
                                                            {ttShop?.website}
                                                        </div>
                                                        <img
                                                            src={logoInternet}
                                                            className="internet"
                                                        />
                                                    </div>
                                                </a>
                                                <div className="tuVan-gioiThieu">
                                                    <button
                                                        className="tuVan"
                                                        onClick={() =>
                                                            settuVanVaThongTin(
                                                                2
                                                            )
                                                        }
                                                    >
                                                        Fabysa
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
                                                        <a
                                                            href={`/shop/${idShop}`}
                                                        >
                                                            <div className="tenCuaHang2">
                                                                Trang Chủ
                                                            </div>
                                                        </a>
                                                    </div>
                                                )}
                                                {tuVanVaThongTin === 2 && (
                                                    <div className="tuVanChiTiet">
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

                                                        <div className="fabysa">
                                                            Trung Tâm Thương Mại
                                                            Fabysa
                                                        </div>
                                                        <div className="gioiThieuFabysa">
                                                        - Giới thiệu danh sách
                                                        Shop Uy Tín!
                                                        <br /> - Sản phẩm đa
                                                        dạng ngành hàng! <br />-
                                                        Giá cả ưu đãi và rất
                                                        nhiều khuyến mại!
                                                    </div>
                                                        <a href={`/fabysa`}>
                                                            <button className="sanSale">
                                                                Săn Sale Ngay
                                                            </button>
                                                        </a>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="huongDan-container">
                                                <div className="huongDan">
                                                    Hướng Dẫn
                                                </div>
                                                <div className="noiDung">
                                                    - Kho Cộng Tác Viên là nơi
                                                    niêm yết giá ưu đãi giành
                                                    riêng cho Cộng Tác Viên.
                                                    <br /> - Cộng Tác Viên có
                                                    thể lên đơn hàng cực kỳ
                                                    nhanh chóng. <br /> - Nếu
                                                    Cộng Tác Viên có Shop Fabysa
                                                    có thế dùng tính năng sao
                                                    chép sản phẩm để bán hàng
                                                    ngay, khi thông tin sản phẩm
                                                    thay đổi sẽ tự động đồng bộ
                                                    nhanh chóng. <br />- Nếu
                                                    chưa có Shop Fabysa?
                                                </div>

                                                {allShop &&
                                                allShop?.length !== 0 ? (
                                                    <button onClick={()=>handleDaMoShop()} className="daDangKi">
                                                        Đăng Kí Ngay
                                                    </button>
                                                ) : (
                                                    <a href="/add-shop">
                                                        <button className="dangKi">
                                                            Đăng Kí Ngay
                                                        </button>
                                                    </a>
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
                                                                        {item2 !==
                                                                            "Sản Phẩm Dẫn" &&
                                                                            item2}
                                                                    </div>
                                                                    <div className="hienAn">
                                                                        {!allSanPham?.find(
                                                                            (
                                                                                item3
                                                                            ) =>
                                                                                item3?.nhomSanPham ===
                                                                                item2
                                                                        ) ? (
                                                                            <button
                                                                                onClick={() =>
                                                                                    handleHienNhomSP(
                                                                                        item2
                                                                                    )
                                                                                }
                                                                                className="xemSanPham"
                                                                            >
                                                                                Xem
                                                                                Thêm
                                                                            </button>
                                                                        ) : (
                                                                            <button
                                                                                onClick={() =>
                                                                                    handleAnNhomSP(
                                                                                        item2
                                                                                    )
                                                                                }
                                                                                className="anSanPham"
                                                                            >
                                                                                Xem
                                                                                Thêm
                                                                            </button>
                                                                        )}
                                                                        {loading ===
                                                                            item2 && (
                                                                            <div className="Spinner">
                                                                                {" "}
                                                                                ...
                                                                                Đang
                                                                                Cập
                                                                                Nhật
                                                                                ...
                                                                            </div>
                                                                        )}
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
                                                                                                                    item
                                                                                                                )
                                                                                                            }
                                                                                                            src={
                                                                                                                item?.AnhSanPham
                                                                                                            }
                                                                                                            className="anhSanPham"
                                                                                                            alt="timtim"
                                                                                                        />

                                                                                                        <div className="tenSanPham">
                                                                                                            {item
                                                                                                                ?.TenSanPham
                                                                                                                ?.length >
                                                                                                            28 ? (
                                                                                                                <div>
                                                                                                                    {item?.TenSanPham.slice(
                                                                                                                        0,
                                                                                                                        20
                                                                                                                    )}
                                                                                                                    ...
                                                                                                                </div>
                                                                                                            ) : (
                                                                                                                <div>
                                                                                                                    {
                                                                                                                        item?.TenSanPham
                                                                                                                    }
                                                                                                                </div>
                                                                                                            )}
                                                                                                        </div>
                                                                                                        <div className="giaBan">
                                                                                                            <div className="giaCtv">
                                                                                                                Giá
                                                                                                                Cộng
                                                                                                                Tác
                                                                                                                Viên
                                                                                                            </div>
                                                                                                            <div className="giaBanMoi">
                                                                                                                {VND.format(
                                                                                                                    item?.giaCtv
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
                                                                                                                                item?.giaCtv)) /
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
                                                                                                        <div className="chonShopThem">
                                                                                                            <select
                                                                                                                className="chonShop"
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
                                                                                                                Sao
                                                                                                                Chép
                                                                                                            </div>
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
                                                                </div>
                                                            );
                                                        }
                                                    )}
                                            </div>
                                            <img
                                                onClick={() => setshowcart(1)}
                                                src={gioHang2}
                                                className="gioHang2"
                                            />
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
            )}
            {loading === 1 && <Loading />}
        </>
    );
};
export default KhoCtv;
