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
    updatePost,
} from "../redux/apiRequest";
import { useEffect } from "react";
import GioHang from "./GioHang";
import ChiTietSanPham2 from "./ChiTietSanPham2";
import Loading from "../GiaoDienChung/Loading";
import QRCode from "react-qr-code";
import QrScanner from "qr-scanner";
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
    const ttShop = useSelector((state) => state.ttShop.ttShop.ttShop?.shop);
    const allSanPhamx = useSelector(
        (state) => state.sanPham.sanPham.allsanPham?.allSanpham
    );
    const arraySanPham2 = useSelector(
        (state) => state.sanPham.sanPham.arrsanPham?.arrSanpham
    );
    const allSanPham1 = allSanPhamx?.filter(
        (item) => item.tinhTrang === "Còn Hàng"
    );
    const allshopLienKet = useSelector(
        (state) => state.yourStatus.yourStatus.allYourStatus?.yourStatus
    );
    const [cart, setcart] = useState([]);
    const [allSanPham, setallSanPham] = useState();
    const [arrNhomSanPham, setarrNhomSanPham] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { idShop } = useParams();
    const [iddetailSanPham, setiddetailSanPham] = useState("");
    const [showChiTietSanPham, setshowChiTietSanPham] = useState(0);
    const [tuVanVaThongTin, settuVanVaThongTin] = useState(0);
    const [loading, setloading] = useState(1);
    const [suaPost, setsuaPost] = useState(0);
    const [skip, setskip] = useState(0);
    const [spa, setspa] = useState();
    const [spb, setspb] = useState();
    const [arraySanPham, setarraySanPham] = useState();
    console.log("arraySanPham", arraySanPham);
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
        getSanPham(idShop, skip, dispatch, setloading);
    }, [skip]);
    const VND = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
    });
    // San Pham Dan
    const sanPhamDan = allSanPhamx?.filter(
        (item) => item.nhomSanPham === "Sản Phẩm Dẫn"
    );
    useEffect(() => {
        if (sanPhamDan && sanPhamDan?.length !== 0) {
            setspa(sanPhamDan[0]?._id);
            setspb(sanPhamDan[1]?._id);
        }
    }, [sanPhamDan]);
    console.log("");
    // San Pham Dan
    // San Pham Shop
    const sanPhamShop = allSanPhamx?.filter(
        (item) =>
            item.nhomSanPham !== "Sản Phẩm Dẫn" && item.tinhTrang === "Còn Hàng"
    );
    // San Pham Shop
    // San Pham lien ket
    useEffect(() => {
        if (allshopLienKet && allshopLienKet?.length !== 0) {
            const arrIdSanPham2 = allshopLienKet[0]?.sanPhamCtv.concat(
                allshopLienKet[0]?.sanPhamSi
            );
            const arrIdSanPham3 = new Set(arrIdSanPham2);
            const arrIdSanPham = [...arrIdSanPham3];
            getArrSanPham(arrIdSanPham, dispatch);
            console.log("arrIdSanPham", arrIdSanPham);
        }
    }, [allshopLienKet]);
    useEffect(() => {
        if (allshopLienKet && allshopLienKet?.length !== 0) {
            const arrIdSanPham2 = allshopLienKet[0]?.sanPhamCtv.concat(
                allshopLienKet[0]?.sanPhamSi
            );
            if (arrIdSanPham2 && arrIdSanPham2?.length !== 0) {
                setarraySanPham(arraySanPham2);
            } else {
                setarraySanPham();
            }
        } else {
            setarraySanPham();
        }
    }, [arraySanPham2, allshopLienKet]);
    console.log("allshopLienKet", allshopLienKet);
    const sanPhamLienKet = arraySanPham?.filter(
        (item) => item.tinhTrang === "Còn Hàng"
    );
    // San Pham lien Ket
    // Phan Loai San Pham
    useEffect(() => {
        if (arraySanPham && arraySanPham.length !== 0) {
            const allSanPhamMoi = sanPhamShop?.concat(sanPhamLienKet);
            const arrNhomSanPham3 = allSanPhamMoi?.map((item) => {
                return item?.nhomSanPham;
            });
            const arrNhomSanPham2 = new Set(arrNhomSanPham3);

            setarrNhomSanPham([...arrNhomSanPham2]);
        } else {
            const arrNhomSanPham3 = sanPhamShop?.map((item) => {
                return item?.nhomSanPham;
            });
            const arrNhomSanPham2 = new Set(arrNhomSanPham3);

            setarrNhomSanPham([...arrNhomSanPham2]);
        }
    }, [allSanPhamx, arraySanPham]);
    // Phan Loai San Pham
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
    useEffect(() => {
        if (allSanPhamx?.length !== 0 || arraySanPham?.length !== 0) {
            setallSanPham(allSanPhamx?.concat(arraySanPham));
        }
    }, [allSanPhamx, arraySanPham]);
    const thongTinSp = allSanPham?.find(
        (item) => item?._id === iddetailSanPham
    );
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
    // qr code
    const [data, setdata] = useState();
    const [dataQrCode, setdataQrCode] = useState("");
    const [result, setResult] = useState("");
    const download = () => {
        const svg = document.getElementById("QRCode");
        const svgData = new XMLSerializer().serializeToString(svg);
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const img = new Image();
        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
            const pngFile = canvas.toDataURL("image/png");
            const downloadLink = document.createElement("a");
            // name image
            downloadLink.download = `${dataQrCode}`;
            downloadLink.href = `${pngFile}`;
            downloadLink.click();
        };
        img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
    };
    // read qr code
    const readCode = (e) => {
        console.log("e", e);
        const file = e.target.files[0];
        if (!file) {
            return;
        }
        QrScanner.scanImage(file, { returnDetailedScanResult: true })
            .then((result) => setResult(result.data))
            .catch((e) => console.log(e));
    };
    // qr code
    // like Shop
    const allLikeShop = myDetail?.likeShop;
    const handeleLikeShop = (idShop) => {
        console.log("idShop", idShop);
        const likeShop = [
            ...myDetail?.likeShop,
            { idShop: idShop, tenShop: ttShop?.TenShop },
        ];
        const newPost = {
            likeShop: likeShop,
        };
        console.log("newPost", newPost);
        updatePost(newPost, myDetail._id, dispatch, setsuaPost);
    };
    const handeleDislikeShop = (idShop) => {
        console.log("idShop", idShop);
        const likeShop = allLikeShop?.filter((item) => item?.idShop !== idShop);
        const newPost = {
            likeShop: likeShop,
        };
        console.log("newPost", newPost);
        updatePost(newPost, myDetail._id, dispatch, setsuaPost);
    };
    const likeShop = allLikeShop?.find((item) => item?.idShop === idShop);

    // like Shop
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
                                            <a href={`/shop/${idShop}`}>
                                                <div className="tenCuaHang">
                                                    {ttShop?.TenShop}
                                                </div>
                                            </a>
                                            <div className="tuVan-gioiThieu">
                                                <button
                                                    className="tuVan"
                                                    onClick={() =>
                                                        settuVanVaThongTin(2)
                                                    }
                                                >
                                                    Fabysa
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
                                                    <a href={`/shop/${idShop}`}>
                                                        <div className="tenCuaHang2">
                                                            {ttShop?.TenShop}
                                                        </div>
                                                    </a>
                                                    <div className="slogan">
                                                        {ttShop?.sloganShop}
                                                    </div>

                                                    <div className="qrcode">
                                                        <div
                                                            onClick={download}
                                                            style={{
                                                                height: "auto",
                                                                margin: "0 auto",
                                                                maxWidth: 150,
                                                                width: "100%",
                                                            }}
                                                        >
                                                            <QRCode
                                                                size={256}
                                                                style={{
                                                                    height: "auto",
                                                                    maxWidth:
                                                                        "100%",
                                                                    width: "100%",
                                                                }}
                                                                value={`https://${ttShop?.website}`}
                                                                viewBox={`0 0 256 256`}
                                                                id="QRCode"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="khoContainer">
                                                        {myDetail?.vaiTro ===
                                                            1 ||
                                                        myDetail?.vaiTro ===
                                                            2 ||
                                                        user?._id ===
                                                            ttShop?.idNhanVien ? (
                                                            <a
                                                                href={`/ca-nhan`}
                                                            >
                                                                <div className="kho">
                                                                    Manager
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
                                                        - Địa chỉ:&nbsp;
                                                        {ttShop?.dcShop} <br />-
                                                        Số điện thoại:&nbsp;
                                                        {ttShop?.sdtShop} <br />
                                                        - Quý khách cần hỗ trợ
                                                        hoặc tư vấn xin vui lòng
                                                        liên hệ trực tiếp 24/7
                                                        qua Zalo, Facebook!
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
                                                    <div className="camOn">
                                                        Xin chân thành cảm ơn!
                                                    </div>
                                                    {!myDetail ? (
                                                        <a
                                                            href={`/shop/dang-nhap/${idShop}`}
                                                        >
                                                            <button className="like">
                                                                Thích
                                                            </button>
                                                        </a>
                                                    ) : (
                                                        <div>
                                                            {likeShop &&
                                                            likeShop.length !==
                                                                0 ? (
                                                                <button
                                                                    className="daLike"
                                                                    onClick={(
                                                                        e
                                                                    ) =>
                                                                        handeleDislikeShop(
                                                                            idShop
                                                                        )
                                                                    }
                                                                >
                                                                    Đã Thích
                                                                </button>
                                                            ) : (
                                                                <button
                                                                    className="like"
                                                                    onClick={(
                                                                        e
                                                                    ) =>
                                                                        handeleLikeShop(
                                                                            idShop
                                                                        )
                                                                    }
                                                                >
                                                                    Thích
                                                                </button>
                                                            )}
                                                        </div>
                                                    )}
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
                                                        24/7
                                                    </div>
                                                    <div className="gioiThieuFabysa">
                                                        - Đây là nơi giới thiệu
                                                        danh sách Shop Online Uy
                                                        Tín! <br /> - Thuộc đa
                                                        dạng ngành hàng, giá cả
                                                        ưu đãi!
                                                    </div>
                                                    <a
                                                        href={`/fabysa/${spa}/${spb}`}
                                                    >
                                                        <button className="sanSale">
                                                            Săn Sale Ngay
                                                        </button>
                                                    </a>
                                                </div>
                                            )}
                                            <div className="sanPham-shop">
                                                <div className="nhomSanPham-sanPham">
                                                    {/* SanPhamDan */}
                                                    {sanPhamDan &&
                                                        sanPhamDan.length !==
                                                            0 && (
                                                            <div className="nhomSanPham">
                                                                Top Sản Phẩm Bán
                                                                Chạy
                                                            </div>
                                                        )}
                                                    <div className="sanPham-container">
                                                        {sanPhamDan &&
                                                            sanPhamDan?.map(
                                                                (
                                                                    item,
                                                                    index
                                                                ) => {
                                                                    return (
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
                                                                                            ttShop?.xa
                                                                                        }
                                                                                    </div>
                                                                                    <div className="diachisanpham">
                                                                                        {
                                                                                            ttShop?.huyen
                                                                                        }
                                                                                    </div>
                                                                                    <div className="diachisanpham">
                                                                                        {
                                                                                            ttShop?.tinh
                                                                                        }
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    );
                                                                }
                                                            )}
                                                    </div>
                                                </div>
                                                {/* sanPhamDan */}

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
                                                                    {/* SanPhamShop */}
                                                                    <div className="sanPham-container">
                                                                        {sanPhamShop &&
                                                                            sanPhamShop?.map(
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
                                                                                                                ttShop?.xa
                                                                                                            }
                                                                                                        </div>
                                                                                                        <div className="diachisanpham">
                                                                                                            {
                                                                                                                ttShop?.huyen
                                                                                                            }
                                                                                                        </div>
                                                                                                        <div className="diachisanpham">
                                                                                                            {
                                                                                                                ttShop?.tinh
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
                                                                    {/* SanPhamShop */}
                                                                    {/* SanPhamLienKet */}
                                                                    <div className="sanPham-container">
                                                                        {sanPhamLienKet &&
                                                                            sanPhamLienKet?.map(
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
                                                                                                                ttShop?.xa
                                                                                                            }
                                                                                                        </div>
                                                                                                        <div className="diachisanpham">
                                                                                                            {
                                                                                                                ttShop?.huyen
                                                                                                            }
                                                                                                        </div>
                                                                                                        <div className="diachisanpham">
                                                                                                            {
                                                                                                                ttShop?.tinh
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
                                                                    {/* SanPhamLienKet */}
                                                                </div>
                                                            );
                                                        }
                                                    )}
                                                {(skip > 20 || skip === 20) && (
                                                    <button
                                                        onClick={() =>
                                                            setskip(+skip - 20)
                                                        }
                                                        className="xemThem"
                                                    >
                                                        Quay Lại
                                                    </button>
                                                )}
                                                {sanPhamShop?.length === 20 && (
                                                    <button
                                                        onClick={() =>
                                                            setskip(+skip + 20)
                                                        }
                                                        className="xemThem"
                                                    >
                                                        Xem Thêm
                                                    </button>
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
