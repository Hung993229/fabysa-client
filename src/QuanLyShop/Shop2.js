import "./Shop2.scss";
import facebookLogo from "../assets/images/Facebook_Logo.png";
import zaloLogo from "../assets/images/zaloLogo.png";
import gioHang2 from "../assets/images/giohang.jpg";
import menu from "../assets/images/menu.png";
import like from "../assets/images/like.jpg";
import like2 from "../assets/images/like2.jpg";
import XemAnh from "../GiaoDienChung/XemAnh";
import MenuShop from "./MenuShop";
import HeaderShop from "./HeaderShop";
import SuaMenu from "./SuaMenu";

import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import {
    getttShop,
    getSanPham,
    getSanPhamDanHuyen2,
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
import UpdateSanPham from "./UpdateSanPham";
import Loading from "../GiaoDienChung/Loading";
const Shop2 = (props) => {
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

    const ttShopThem = ttShop?.ttShopThem;
    const khachSi = ttShopThem?.khachSi;
    const khachCtv = ttShopThem?.khachCtv;
    const nvBanHang = ttShopThem?.nvBanHang;
    const nvQuanLy = ttShop?.ttShopThem?.nvQuanLy;
    const allSanPham2 = useSelector(
        (state) => state.sanPham.sanPham.allsanPham?.allSanpham
    );
    const VND = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
    });
    const [loading, setloading] = useState(0);
    const [loading2, setloading2] = useState(0);
    const [xemAnhFull, setxemAnhFull] = useState();
    const [showChiTietSanPham, setshowChiTietSanPham] = useState(0);
    const [thongTinSp, setthongTinSp] = useState();
    const { tenVietTat, idShop } = useParams();
    const dispatch = useDispatch();
    const [nhomSP, setnhomSP] = useState("Khuyến Mại Đặc Biệt");
    const [skip, setskip] = useState(0);
    const [soBan, setsoBan] = useState("fabysa");
    const [maBaoMat, setmaBaoMat] = useState();
    const [allSanPham, setallSanPham] = useState([]);

    console.log("allSanPham", allSanPham);
    console.log("allSanPham2", allSanPham2);

    useEffect(() => {
        if (user && user.length !== 0) {
            getPost(user?._id, dispatch);
            getGioHang(idShop, user?._id, dispatch);
        }
    }, []);
    useEffect(() => {
        getttShop(idShop, dispatch);
        getYourStatus(idShop, dispatch);
    }, [idShop]);
    // get san pham
    useEffect(() => {
        const handleScroll = (e) => {
            const scrollHeight = e.target.documentElement.scrollHeight;
            const currentHeight =
                e.target.documentElement.scrollTop + window.innerHeight;
            if (currentHeight >= scrollHeight) {
                setskip(skip + 6);
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [allSanPham]);

    useEffect(() => {
        const limit = 6;
        getSanPham(idShop, nhomSP, skip, limit, dispatch);
    }, [nhomSP, skip]);

    useEffect(() => {
        if (allSanPham2 && allSanPham) {
            const allSanPham3 = [...allSanPham, ...allSanPham2];

            allSanPham3.sort(function (a, b) {
                if (
                    +a?.allDacDiemSP[0]?.giaKhuyenMai >
                    +b?.allDacDiemSP[0]?.giaKhuyenMai
                )
                    return 1;
                if (
                    +a?.allDacDiemSP[0]?.giaKhuyenMai <
                    +b?.allDacDiemSP[0]?.giaKhuyenMai
                )
                    return -1;
                return 0;
            });
            setallSanPham(allSanPham3);
        }
    }, [allSanPham2]);
    // get san pham
    // Gio hang
    const [cart, setcart] = useState([]);
    const [xoaSp, setxoaSp] = useState();
    const [cartDemo, setcartDemo] = useState([]);
    // Gio hang

    // Chi Tiet San Pham
    const handleChiTietSP = (item) => {
        setloading(4);
        setthongTinSp(item);
    };
    //Gio Hang
    const handleDaThemGioHang = (item) => {
        if (cartDemo && cartDemo.length > 0) {
            const CartDemo2 = cartDemo.filter(
                (item2) => item2._id !== item._id
            );
            console.log("xetCartDemo", CartDemo2);
            setcartDemo(CartDemo2);
        }

        if (cart && cart.length > 0) {
            const xetCart = cart.filter((item2) => item2._id !== item._id);
            setcart(xetCart);
        }
    };
    const handleThemGioHang = (item) => {
        const allDacDiemSP = item?.allDacDiemSP;
        const allDacDiemSP2 = allDacDiemSP?.map(
            (item) =>
                item && {
                    ...item,
                    slMua: 0,
                }
        );
        setcartDemo([
            ...cartDemo,
            {
                _id: item?._id,
                tenSanPham: item?.TenSanPham,
                allDacDiemSP: allDacDiemSP2,
                thongTinSanPham: item?.thongTinSanPham,
            },
        ]);
    };
    // Gio Hang
    // Chi Tiet San Pham
    // Xem Anh Full
    const handleXemAnh = (item) => {
        setloading(5);
        setxemAnhFull(item);
    };
    // Xem Anh Full
    // Sap xep
    const handleSapXepTang = () => {
        if (allSanPham && allSanPham?.length > 0) {
            const allSanPham3 = allSanPham;

            allSanPham3.sort(function (a, b) {
                if (
                    +a?.allDacDiemSP[0]?.giaKhuyenMai >
                    +b?.allDacDiemSP[0]?.giaKhuyenMai
                )
                    return 1;
                if (
                    +a?.allDacDiemSP[0]?.giaKhuyenMai <
                    +b?.allDacDiemSP[0]?.giaKhuyenMai
                )
                    return -1;
                return 0;
            });
            setallSanPham(allSanPham3);
        }
    };
    const handleSapXepGiam = () => {
        if (allSanPham && allSanPham?.length > 0) {
            const allSanPham3 = allSanPham;

            allSanPham3.sort(function (a, b) {
                if (
                    +a?.allDacDiemSP[0]?.giaKhuyenMai >
                    +b?.allDacDiemSP[0]?.giaKhuyenMai
                )
                    return 1;
                if (
                    +a?.allDacDiemSP[0]?.giaKhuyenMai <
                    +b?.allDacDiemSP[0]?.giaKhuyenMai
                )
                    return -1;
                return 0;
            });
            setallSanPham(allSanPham3);
        }
    };

    // Sap xep
    return (
        <div className="Shop2-Container">
            <HeaderShop loading={loading} setloading={setloading} />
            {loading === 0 && (
                <div className="sanPham-shop">
                    <div className="nhomSanPham-themSanPham">
                        {/* <div
                            onClick={() => handleSapXepTang()}
                            className="sapXep"
                        >
                            ⮃
                        </div> */}
                        <div className="nhomSanPham">{nhomSP}</div>
                        {(user?._id === ttShop?.user ||
                            user?.admin === true ||
                            nvQuanLy?.find(
                                (item) => item?.sdtnvQuanLy === user?.username
                            )) && (
                            <div
                                className="themSanPham"
                                onClick={() => setxoaSp(1)}
                            >
                                ☰
                            </div>
                        )}
                    </div>
                    {xoaSp === 1 && (
                        <div className="xacNhan-xoa">
                            <div className="xacNhan">Thêm Sản Phẩm Mới?</div>
                            <div className="huyBo-xoa">
                                <a className="xoa" href={`/addsp/${idShop}`}>
                                    Đồng Ý
                                </a>

                                <div
                                    onClick={() => setxoaSp(!xoaSp)}
                                    className="huyBo"
                                >
                                    Huỷ Bỏ
                                </div>
                            </div>
                        </div>
                    )}
                    {allSanPham?.length < 1 && (
                        <div className="trong">Đang Cập Nhật Dữ Liệu</div>
                    )}
                    <div className="sanPham-container">
                        {allSanPham &&
                            allSanPham?.map((item, index) => {
                                return (
                                    <div key={index} className="sanPham">
                                        <div>
                                            <img
                                                onClick={() =>
                                                    handleChiTietSP(item)
                                                }
                                                src={
                                                    item?.allDacDiemSP[0]
                                                        ?.AnhSanPham
                                                }
                                                className="anhSanPham"
                                                alt="timtim"
                                            />

                                            <div className="tenSanPham">
                                                {item?.TenSanPham?.length >
                                                28 ? (
                                                    <div>
                                                        {item?.TenSanPham.slice(
                                                            0,
                                                            20
                                                        )}
                                                        ...
                                                    </div>
                                                ) : (
                                                    <div>{item.TenSanPham}</div>
                                                )}
                                            </div>
                                            <div className="giaBan">
                                                <div className="giaBanMoi">
                                                    {VND.format(
                                                        item?.allDacDiemSP[0]
                                                            .giaKhuyenMai
                                                    )}
                                                </div>

                                                <div className="giaGiam">
                                                    <div className="giabanCu">
                                                        {VND.format(
                                                            item
                                                                ?.allDacDiemSP[0]
                                                                .giaNiemYet
                                                        )}
                                                    </div>
                                                    <div className="phanTram">
                                                        Giảm&nbsp;
                                                        {Math.floor(
                                                            (100 *
                                                                (item
                                                                    ?.allDacDiemSP[0]
                                                                    .giaNiemYet -
                                                                    item
                                                                        ?.allDacDiemSP[0]
                                                                        .giaKhuyenMai)) /
                                                                item
                                                                    ?.allDacDiemSP[0]
                                                                    .giaNiemYet
                                                        )}
                                                        %
                                                    </div>
                                                </div>
                                            </div>
                                            <>
                                                {cartDemo &&
                                                cartDemo?.find(
                                                    (item2) =>
                                                        item2._id === item._id
                                                ) ? (
                                                    <button
                                                        onClick={() =>
                                                            handleDaThemGioHang(
                                                                item
                                                            )
                                                        }
                                                        className="daThem"
                                                    >
                                                        ĐÃ THÊM
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
                                                        THÊM GIỎ HÀNG
                                                    </button>
                                                )}
                                            </>

                                            <div className="viTriSanPham">
                                                <i className="fa-solid fa-location-dot"></i>
                                                <div className="diachisanpham">
                                                    {ttShop?.xa}
                                                </div>
                                                <div className="diachisanpham">
                                                    {ttShop?.huyen}
                                                </div>
                                                <div className="diachisanpham">
                                                    {ttShop?.tinh}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                    </div>
                </div>
            )}
            <div className="menuGioHang2">
                {loading === 3 && (
                    <img
                        onClick={() => setloading(0)}
                        src={menu}
                        className="menu"
                    />
                )}
                {loading === 0 && (
                    <img
                        onClick={() => setloading(3)}
                        src={menu}
                        className="menu"
                    />
                )}
                {loading === 2 && (
                    <img
                        onClick={() => setloading(0)}
                        src={gioHang2}
                        className="gioHang2"
                    />
                )}
                {loading === 0 && (
                    <img
                        onClick={() => setloading(2)}
                        src={gioHang2}
                        className="gioHang2"
                    />
                )}
            </div>
            {loading === 1 && <Loading />}
            {loading === 2 && (
                <GioHang
                    handleDaThemGioHang={handleDaThemGioHang}
                    cart={cart}
                    setcart={setcart}
                    loading={loading}
                    setloading={setloading}
                    setTongtien={setTongtien}
                    setTongsoluong={setTongsoluong}
                    Tongtien={Tongtien}
                    Tongsoluong={Tongsoluong}
                    setcartDemo={setcartDemo}
                    cartDemo={cartDemo}
                    soBan={soBan}
                    setsoBan={setsoBan}
                    maBaoMat={maBaoMat}
                    setmaBaoMat={setmaBaoMat}
                />
            )}
            {loading === 3 && (
                <MenuShop
                    loading={loading}
                    setloading={setloading}
                    nhomSP={nhomSP}
                    setnhomSP={setnhomSP}
                    setallSanPham={setallSanPham}
                    allSanPham={allSanPham}
                    setskip={setskip}
                    skip={skip}
                />
            )}
            {loading === 4 && (
                <ChiTietSanPham2
                    handleDaThemGioHang={handleDaThemGioHang}
                    handleThemGioHang={handleThemGioHang}
                    cart={cart}
                    setcart={setcart}
                    setcartDemo={setcartDemo}
                    cartDemo={cartDemo}
                    thongTinSp={thongTinSp}
                    loading={loading}
                    setloading={setloading}
                    idShop={idShop}
                />
            )}
            {loading === 5 && (
                <XemAnh
                    xemAnhFull={xemAnhFull}
                    loading={loading}
                    setloading={setloading}
                />
            )}
            {loading === 6 && (
                <UpdateSanPham
                    setloading={setloading}
                    loading={loading}
                    thongTinSp={thongTinSp}
                    setthongTinSp={setthongTinSp}
                    ttShop={ttShop}
                    idShop={idShop}
                    nhomSP={nhomSP}
                    setnhomSP={setnhomSP}
                    setallSanPham={setallSanPham}
                    allSanPham={allSanPham}
                    setskip={setskip}
                    skip={skip}
                />
            )}
        </div>
    );
};
export default Shop2;
