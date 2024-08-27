import "./Shop2.scss";
import gioHang2 from "../assets/images/giohang.jpg";
import XemAnh from "../GiaoDienChung/XemAnh";
import HeaderShop from "./HeaderShop";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getttShop, getSanPham, getPost } from "../redux/apiRequest";
import { useEffect } from "react";
import GioHang from "./GioHang";
import ChiTietSanPham2 from "./ChiTietSanPham2";
import UpdateSanPham from "./UpdateSanPham";
import Loading from "../GiaoDienChung/Loading";
const Shop2 = () => {
    const { tenVietTat, idShop, idCtv, tenCtv, sdtCtv } = useParams();
    const user = useSelector((state) => state.auth.login.currentUser);
    const ttShop = useSelector((state) => state.ttShop.ttShop.ttShop?.shop);
    const nvQuanLy = ttShop?.ttShopThem?.nvQuanLy;
    const allSanPham2 = useSelector(
        (state) => state.sanPham.sanPham.allsanPham?.allSanpham
    );
    const VND = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
    });
    const [Tongsoluong, setTongsoluong] = useState(0);
    const [Tongtien, setTongtien] = useState(0);
    const [loading, setloading] = useState(0);
    const [loadingTruoc, setloadingTruoc] = useState(0);
    const [xemAnhFull, setxemAnhFull] = useState();
    const [thongTinSp, setthongTinSp] = useState();

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [nhomSP, setnhomSP] = useState("Xin kính chào quý khách");
    const [skip, setskip] = useState(0);
    const [sort, setsort] = useState(1);
    const [soBan, setsoBan] = useState("fabysa");
    const [maBaoMat, setmaBaoMat] = useState();
    const [allSanPham, setallSanPham] = useState([]);
    const nhomSanPham2 = ttShop?.ttShopThem?.menuShop;
    const nhomSanPham = nhomSanPham2?.filter((item) => item !== nhomSP);

    useEffect(() => {
        if (user && user.length !== 0) {
            getPost(user?._id, dispatch);
        }
    }, []);
    useEffect(() => {
        getttShop(idShop, dispatch);
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
        getSanPham(idShop, nhomSP, sort, skip, limit, dispatch);
    }, [nhomSP, skip, sort]);
    useEffect(() => {
        if (allSanPham2 && allSanPham) {
            setallSanPham([...allSanPham, ...allSanPham2]);
        }
    }, [allSanPham2]);
    // get san pham
    useEffect(() => {
        if (ttShop) {
            setnhomSP(
                ttShop?.ttShopThem?.menuShop[0] || "Xin kính chào quý khách"
            );
        }
    }, [ttShop]);
    // Gio hang
    const [cart, setcart] = useState([]);
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
    const handlexemAnh = (item) => {
        setloading(5);
        setxemAnhFull(item);
        setloadingTruoc(loading);
    };
    // Xem Anh Full
    // Sap xep
    const handleSapXep = () => {
        setallSanPham([]);
        setsort(-sort);
        setskip(0);
    };

    // Sap xep
    const handleChonNhomSanPham = (item) => {
        setallSanPham([]);
        setnhomSP(item);
        setskip(0);
    };
    // Them Sp
    const themSanPhamMoi = () => {
        const themSp = window.confirm("Thêm Sản Phẩm Mới?");
        if (themSp) {
            navigate(`/addsp/${idShop}`);
        }
    };
    // Them Sp
    // Sua Menu
    const suaMenuMoi = () => {
        const themSp = window.confirm("Sửa Menu Shop?");
        if (themSp) {
            navigate(`/sua-menu/${idShop}`);
        }
    };
    // Sua Menu

    return (
        <div className="Shop2-Container">
            <HeaderShop
                setTongtien={setTongtien}
                setTongsoluong={setTongsoluong}
                Tongtien={Tongtien}
                Tongsoluong={Tongsoluong}
                loading={loading}
                setloading={setloading}
                setloadingTruoc={setloadingTruoc}
                loadingTruoc={loadingTruoc}
                handlexemAnh={handlexemAnh}
            />
            {loading === 0 && (
                <div className="sanPham-shop">
                    {user?._id === ttShop?.user ||
                    user?.admin === true ||
                    nvQuanLy?.find(
                        (item) => item?.sdtnvQuanLy === user?.username
                    ) ? (
                        <div className="nhomSanPham-themSanPham">
                            <div
                                className="suaMenu"
                                onClick={() => suaMenuMoi()}
                            >
                                <i className="fa fa-edit"></i>
                            </div>
                            <select
                                className="nhomSanPham"
                                id="provinces"
                                onChange={(e) =>
                                    handleChonNhomSanPham(e.target.value)
                                }
                            >
                                <option>{nhomSP}</option>
                                {nhomSanPham?.map((item) => {
                                    return <option key={item}>{item}</option>;
                                })}
                            </select>
                            <div
                                className="themSanPham"
                                onClick={() => themSanPhamMoi()}
                            >
                                <i className="fa fa-plus-circle"></i>
                            </div>
                        </div>
                    ) : (
                        <div className="nhomSanPham-themSanPham">
                            <div
                                className="sapXep"
                                onClick={() => handleSapXep()}
                            >
                                <i className="fas fa-retweet"></i>
                            </div>
                            <select
                                className="nhomSanPham2"
                                id="provinces"
                                onChange={(e) =>
                                    handleChonNhomSanPham(e.target.value)
                                }
                            >
                                <option>{nhomSP}</option>
                                {nhomSanPham?.map((item) => {
                                    return <option key={item}>{item}</option>;
                                })}
                            </select>
                        </div>
                    )}

                    {allSanPham?.length < 1 && (
                        <div className="trong">
                            <div className="container">
                                <span className=""></span>
                                <div className="line">
                                    <div className="inner"></div>
                                </div>
                            </div>
                        </div>
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
                    setloadingTruoc={setloadingTruoc}
                    loadingTruoc={loadingTruoc}
                    handlexemAnh={handlexemAnh}
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
                    setloadingTruoc={setloadingTruoc}
                    loadingTruoc={loadingTruoc}
                    handlexemAnh={handlexemAnh}
                />
            )}
            {loading === 5 && (
                <XemAnh
                    xemAnhFull={xemAnhFull}
                    setxemAnhFull={setxemAnhFull}
                    loading={loading}
                    setloading={setloading}
                    setloadingTruoc={setloadingTruoc}
                    loadingTruoc={loadingTruoc}
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
