import "./Shop.scss";
import Jimp from "jimp";
import facebookLogo from "../assets/images/Facebook_Logo.png";
import zaloLogo from "../assets/images/zaloLogo.png";
import gioHang2 from "../assets/images/giohang2.jpg";
import like from "../assets/images/like.jpg";
import like2 from "../assets/images/like2.jpg";
import CommonUtils from "../component/CommonUtils";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
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
import Loading from "../GiaoDienChung/Loading";
import QRCode from "react-qr-code";
import QrScanner from "qr-scanner";
import logoInternet from "../assets/images/logoInternet.jpg";
import logoInternet2 from "../assets/images/tuvanvien.jpg";
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
    const loaiSanPham = ttShop?.nhomSanPham;
    const allSanPham1 = useSelector(
        (state) => state.sanPham.sanPham.allsanPham?.allSanpham
    );
    const arraySanPham = useSelector(
        (state) => state.sanPham.sanPham.arrsanPham?.arrSanpham
    );
    const sanPhamDan = useSelector(
        (state) => state.sanPham.sanPham.sanPhamDan?.allSanpham
    );

    const allshopLienKet = useSelector(
        (state) => state.yourStatus.yourStatus.allYourStatus?.yourStatus
    );

    const [cart, setcart] = useState([]);
    const [arrNhomSanPham, setarrNhomSanPham] = useState([]);
    const [sanPhamLienKet, setsanPhamLienKet] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { idShop } = useParams();
    const [allSanPham, setallSanPham] = useState([]);
    const [indexNhomSP, setindexNhomSP] = useState(0);
    const [nhomSP, setnhomSP] = useState();
    const [thongTinSp, setthongTinSp] = useState();
    const [showChiTietSanPham, setshowChiTietSanPham] = useState(0);
    const [tuVanVaThongTin, settuVanVaThongTin] = useState(0);
    const [loading, setloading] = useState(1);
    const [suaPost, setsuaPost] = useState(0);
    const [skip, setskip] = useState(0);
    const [spa, setspa] = useState();
    const [spb, setspb] = useState();
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
    // get san Pham
    useEffect(() => {
        if (loaiSanPham?.length > indexNhomSP + 1) {
            const handleScroll = (e) => {
                const scrollHeight = e.target.documentElement.scrollHeight;
                const currentHeight =
                    e.target.documentElement.scrollTop + window.innerHeight;
                if (currentHeight + 1 >= scrollHeight) {
                    // setindexNhomSP(indexNhomSP + 1);
                }
            };
            window.addEventListener("scroll", handleScroll);
            return () => window.removeEventListener("scroll", handleScroll);
        }
    }, [indexNhomSP]);
    useEffect(() => {
        const limit = 100;
        getSanPham(idShop, nhomSP, skip, limit, dispatch, setloading);
    }, [nhomSP]);
    useEffect(() => {
        if (allSanPham1 && allSanPham1?.length !== 0) {
            setallSanPham([...allSanPham, ...allSanPham1]);
        }
    }, [allSanPham1]);
    // get san Pham
    useEffect(() => {
        const limit = 2;
        const huyen = idShop;
        const skip = 0;
        getSanPhamDanHuyen2(huyen, skip, limit, dispatch);
    }, [idShop]);
    const VND = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
    });
    // San Pham Dan

    useEffect(() => {
        if (sanPhamDan && sanPhamDan?.length !== 0) {
            setspa(sanPhamDan[0]?._id);
            setspb(sanPhamDan[1]?._id);
        }
    }, [sanPhamDan]);
    // San Pham Dan
    // San Pham Shop
    const sanPhamShop = allSanPham?.filter(
        (item) => item.tinhTrang === "Còn Hàng"
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
        } else {
            const arrIdSanPham = [];
            getArrSanPham(arrIdSanPham, dispatch);
        }
    }, [allshopLienKet]);
    useEffect(() => {
        if (arraySanPham && arraySanPham.length !== 0) {
            const arrNhomSanPham3 = arraySanPham?.map((item) => {
                return (
                    item?.nhomSanPham !== "Sản Phẩm Dẫn" && item?.nhomSanPham
                );
            });
            const arrNhomSanPham2 = new Set(arrNhomSanPham3);

            setarrNhomSanPham([...arrNhomSanPham2]);
        }
    }, [arraySanPham]);
    const handleXemSpLienKet = (item2) => {
        const hienSpLienKet = arraySanPham?.filter(
            (item) =>
                item.tinhTrang === "Còn Hàng" && item?.nhomSanPham === item2
        );
        setsanPhamLienKet([...sanPhamLienKet, ...hienSpLienKet]);
    };
    const handleAnSpLienKet = (item2) => {
        const anSpLienKet = sanPhamLienKet?.filter(
            (item) => item.nhomSanPham !== item2
        );
        setsanPhamLienKet(anSpLienKet);
    };
    // San Pham lien ket
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
    // Them gio Hang
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
    const [AnhSanPham, setAnhSanPham] = useState();
    const [previewAnhSP, setpreviewAnhSP] = useState();
    console.log("AnhSanPham", AnhSanPham);
    console.log("previewAnhSP", previewAnhSP);
    // xu ly anh
    const handleOnchangeImageBanner = async (e) => {
        const fileBanner = e.target.files[0];
        // console.log("fileBanner", fileBanner);
        console.log("e", e);

        // const anhReSize = Jimp?.read(fileBanner.name)
        //     .then((lenna) => {
        //         return lenna
        //             .resize(256, 256) // resize
        //             .quality(60) // set JPEG quality
        //             .greyscale() // set greyscale
        //             .write("lena-small-bw.jpg"); // save
        //     })
        //     .catch((err) => {
        //         console.error(err);
        //     });
        // console.log("anhReSize", anhReSize);

        // Read the image.
        // const image = await Jimp.read('');
        // Resize the image to width 150 and heigth 150.
        // await image.resize(150, 150);
        // Save and overwrite the image
        // await image.writeAsync(`test/${Date.now()}_150x150.png`);

        let bannerBase64 = await CommonUtils.getBase64(fileBanner);

        fileBanner.preview = URL.createObjectURL(fileBanner);

        setAnhSanPham(bannerBase64);
        setpreviewAnhSP(fileBanner);
    };
    //
    return (
        <div className="shop">
            <div>Upload Anh</div>
            <input
                id="anh2"
                type="file"
                // hidden
                onChange={handleOnchangeImageBanner}
            />
            {/* <label htmlFor="anh2">
                {previewAnhSP ? (
                    <img src={previewAnhSP.preview} className="anhDD" />
                ) : (
                    <img src={themAnh} className="anhDD" />
                )}
            </label> */}
        </div>
    );
};
export default Shop;
