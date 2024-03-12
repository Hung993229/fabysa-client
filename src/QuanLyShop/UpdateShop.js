import "./UpdateShop.scss";
import CommonUtils from "../component/CommonUtils";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../GiaoDienChung/Loading";
import {
    getttShop,
    updatettShop,
    registerSanPham,
    getSanPham,
    updateSanPham,
    getPost,
    deleteSanPham,
    updatePost,
    getArrSanPham,
    updateYourStatusUser,
    getYourStatus,
} from "../redux/apiRequest";
import { useEffect } from "react";
import {
    apiGetPublicProvinces,
    apiGetPublicDistrict,
    apiGetPublicWard,
} from "../redux/ApiProvince";
import DangNhap from "../DangNhap/DangNhap";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import ReactHtmlParser, {
    processNodes,
    convertNodeToElement,
    htmlparser2,
} from "react-html-parser";
const UpdateShop = () => {
    const { idShop } = useParams();
    const user = useSelector((state) => state.auth.login?.currentUser);
    const myDetail = useSelector((state) => state.post.post?.myDetail);
    const ttShop = useSelector((state) => state.ttShop.ttShop.ttShop?.shop);
    const allSanPhamx = useSelector(
        (state) => state.sanPham.sanPham.allsanPham?.allSanpham
    );
    const allshopLienKet = useSelector(
        (state) => state.yourStatus.yourStatus.allYourStatus?.yourStatus
    );
    const arraySanPham = useSelector(
        (state) => state.sanPham.sanPham.arrsanPham?.arrSanpham
    );
    const [allSanPham, setallSanPham] = useState([]);
    const [arrNhomSanPham, setarrNhomSanPham] = useState([]);
    const [loading, setloading] = useState(1);
    const [skip, setskip] = useState(0);
    const [suaThongTinShop, setsuaThongTinShop] = useState(0);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        getSanPham(idShop, skip, dispatch, setloading);
    }, [suaThongTinShop]);
    useEffect(() => {
        getPost(user?._id, dispatch, setloading);
    }, [user]);
    useEffect(() => {
        getYourStatus(idShop, dispatch);
    }, [suaThongTinShop]);
    useEffect(() => {
        if (allshopLienKet) {
            const arrIdSanPham2 = allshopLienKet[0]?.sanPhamCtv.concat(
                allshopLienKet[0]?.sanPhamSi
            );
            const arrIdSanPham3 = new Set(arrIdSanPham2);
            const arrIdSanPham = [...arrIdSanPham3];
            getArrSanPham(arrIdSanPham, dispatch);
        }
    }, [allshopLienKet, suaThongTinShop]);
    // san pham
    // shop

    useEffect(() => {
        getttShop(idShop, dispatch);
    }, [suaThongTinShop, idShop]);
    const [previewAvatar, setpreviewAvatar] = useState();
    const [previewBanner, setpreviewBanner] = useState();
    const [Banner, setBanner] = useState();
    const [TenShop, setTenShop] = useState();
    const [website, setwebsite] = useState();
    const [linkFacebook, setlinkFacebook] = useState();
    const [linkZalo, setlinkZalo] = useState();
    const [idNhanVien, setidNhanVien] = useState();
    const [DcShop, setDcShop] = useState();
    const [SdtShop, setSdtShop] = useState();
    const [SloganShop, setSloganShop] = useState();
    const [UserShop, setUserShop] = useState();
    const [nguoiHoTro, setnguoiHoTro] = useState();
    const [vaiTro, setvaiTro] = useState();
    const [loaiSanPham, setloaiSanPham] = useState();
    const [resetNhomSanPham, setresetNhomSanPham] = useState(1);
    const [nhomSanPhamReSet, setnhomSanPhamReSet] = useState([]);
    useEffect(() => {
        if (+resetNhomSanPham === 2) {
            setnhomSanPhamReSet([
                "Điện Thoại",
                "Máy Tính",
                "Camera Giám Sát",
                "Quần Áo Nam",
                "Quần Áo Nữ",
                "Giày Nam",
                "Giày Nữ",
                "Đồng Hồ Nam",
                "Đồng Hồ Nữ",
                "Thiết Bị Gia Dụng",
                "Thiết Bị Y Tế",
                "Hoa Quả",
                "Thực Phẩm Thịt",
                "Rau, Củ, Quả",
            ]);
        }
        if (+resetNhomSanPham === 1) {
            setnhomSanPhamReSet(loaiSanPham);
        }
    }, [resetNhomSanPham]);

    useEffect(() => {
        if (ttShop) {
            setvaiTro(ttShop?.vaiTro);
            setnguoiHoTro(ttShop?.nguoiHoTro);
            setUserShop(ttShop?.user);
            setSloganShop(ttShop?.sloganShop);
            setSdtShop(ttShop?.sdtShop);
            setDcShop(ttShop?.dcShop);
            setidNhanVien(ttShop?.idNhanVien);
            setlinkZalo(ttShop?.linkZalo);
            setlinkFacebook(ttShop?.linkFacebook);
            setwebsite(ttShop?.website);
            setTenShop(ttShop?.TenShop);
            setBanner(ttShop?.Banner);
            setloaiSanPham(ttShop?.nhomSanPham);
        }
    }, [ttShop]);

    // Provinces
    const [provinces, setProvinces] = useState([]);
    const [provincesID, setprovincesID] = useState();

    const [districts, setDistricts] = useState([]);
    const [districtID, setDistrictID] = useState();

    const [wards, setWards] = useState([]);
    const [wardID, setWardID] = useState();
    // them san pham
    const [previewSanPham, setpreviewSanPham] = useState();
    const [AnhSanPham, setAnhSanPham] = useState();
    const [TenSanPham, setTenSanPham] = useState();
    const [tinhTrang, settinhTrang] = useState("Còn Hàng");
    const [nhomSanPham, setnhomSanPham] = useState();
    const [nhomSanPhamMoi, setnhomSanPhamMoi] = useState();
    const [giaNiemYet, setgiaNiemYet] = useState(0);
    const [giaKhuyenMai, setgiaKhuyenMai] = useState(0);
    const [giaNhap, setgiaNhap] = useState(0);
    const [giaCtv, setgiaCtv] = useState(0);
    const [giaSi, setgiaSi] = useState("Sản Phẩm Khác");
    const [thongTinSanPham, setthongTinSanPham] = useState();

    // San Pham Dan
    const allSanPhamDan = allSanPham?.filter(
        (item) => item.nhomSanPham === "Sản Phẩm Dẫn"
    );

    useEffect(() => {
        if (allSanPhamx) {
            setallSanPham(allSanPhamx);
            const arrNhomSanPham3 = allSanPhamx?.map((item) => {
                return item?.nhomSanPham;
            });
            const arrNhomSanPham2 = new Set(arrNhomSanPham3);

            setarrNhomSanPham([...arrNhomSanPham2]);
        }
    }, [allSanPhamx, setloading, setsuaThongTinShop]);
    // sua sanPham
    const handleSuaSanPham = (id) => {
        setsuaThongTinShop(3);
        setidSpSua(id);
    };
    const [idSpSua, setidSpSua] = useState(0);
    const detailidSpSua = allSanPham?.find((item) => item._id === idSpSua);
    const [previewSanPham2, setpreviewSanPham2] = useState();
    const [AnhSanPham2, setAnhSanPham2] = useState();
    const [TenSanPham2, setTenSanPham2] = useState();
    const [tinhTrang2, settinhTrang2] = useState();
    const [nhomSanPham2, setnhomSanPham2] = useState();
    const [nhomSanPhamMoi2, setnhomSanPhamMoi2] = useState();
    const [giaNiemYet2, setgiaNiemYet2] = useState(0);
    const [giaKhuyenMai2, setgiaKhuyenMai2] = useState(0);
    const [giaNhap2, setgiaNhap2] = useState(0);
    const [giaCtv2, setgiaCtv2] = useState(0);
    const [giaSi2, setgiaSi2] = useState();
    const [thongTinSanPham2, setthongTinSanPham2] = useState();
    useEffect(() => {
        if (idSpSua && idSpSua.length !== 0) {
            setAnhSanPham2(detailidSpSua?.AnhSanPham);
            setTenSanPham2(detailidSpSua?.TenSanPham);
            settinhTrang2(detailidSpSua?.tinhTrang);
            setnhomSanPham2(detailidSpSua?.nhomSanPham);
            setgiaKhuyenMai2(detailidSpSua?.giaKhuyenMai);
            setgiaNiemYet2(detailidSpSua?.giaNiemYet);
            setgiaNhap2(detailidSpSua?.giaNhap);
            setgiaCtv2(detailidSpSua?.giaCtv);
            setgiaSi2(detailidSpSua?.giaSi);
            setthongTinSanPham2(detailidSpSua?.thongTinSanPham);
        }
    }, [idSpSua]);
    const handleOnchangeImagesuaSanPham = async (e) => {
        console.log("e", e);
        const fileSanPham = e.target.files[0];
        let SanPhamBase64 = await CommonUtils.getBase64(fileSanPham);

        fileSanPham.preview = URL.createObjectURL(fileSanPham);

        setAnhSanPham2(SanPhamBase64);
        setpreviewSanPham2(fileSanPham);
    };
    const handleLuuSanPham = (id) => {
        const newSanPham = {
            AnhSanPham: AnhSanPham2,
            TenSanPham: TenSanPham2,
            nhomSanPham: nhomSanPhamMoi2 || nhomSanPham2,
            giaNiemYet: giaNiemYet2,
            giaKhuyenMai: giaKhuyenMai2,
            giaNhap: giaNhap2,
            giaCtv: giaCtv2,
            giaSi: giaSi2,
            tinhTrang: tinhTrang2,
            thongTinSanPham: thongTinSanPham2,
            TenShop: ttShop?.TenShop,
            xa: ttShop?.xa,
            huyen: ttShop?.huyen,
            tinh: ttShop?.tinh,
            vaiTro: ttShop?.vaiTro,
            affiliate: "",
            idtk: ttShop?.user,
            user: idShop,
        };
        updateSanPham(newSanPham, id, setsuaThongTinShop, setloading, dispatch);
        setloading(1);
        if (nhomSanPhamMoi2 && nhomSanPhamMoi2.length !== 0) {
            const nhomSanPham = [...loaiSanPham, nhomSanPhamMoi2];
            const id = ttShop._id;
            const newShop = {
                nhomSanPham: nhomSanPham,
            };
            updatettShop(newShop, id, dispatch, setloading, setsuaThongTinShop);
            setnhomSanPhamMoi2();
        }
    };
    const handleXoaSanPham = (id) => {
        deleteSanPham(id, setloading, dispatch);
        setloading(1);
    };
    const handleThemSanPham = () => {
        if (
            !AnhSanPham ||
            !TenSanPham ||
            !giaNiemYet ||
            !giaKhuyenMai ||
            !nhomSanPham ||
            !thongTinSanPham
        ) {
            alert("Hãy nhập đủ thông tin");
        } else {
            const newSanPham = {
                AnhSanPham: AnhSanPham,
                TenSanPham: TenSanPham,
                tinhTrang: tinhTrang,
                nhomSanPham: nhomSanPhamMoi || nhomSanPham,
                giaNiemYet: giaNiemYet,
                giaKhuyenMai: giaKhuyenMai,
                giaNhap: giaNhap,
                giaCtv: giaCtv,
                giaSi: giaSi,
                thongTinSanPham: thongTinSanPham,
                TenShop: ttShop?.TenShop,
                xa: ttShop?.xa,
                huyen: ttShop?.huyen,
                tinh: ttShop?.tinh,
                vaiTro: ttShop?.vaiTro,
                idtk: ttShop?.user,
                user: idShop,
            };
            console.log("newSanPham", newSanPham);
            registerSanPham(
                newSanPham,
                dispatch,
                setloading,
                setsuaThongTinShop
            );

            if (nhomSanPhamMoi && nhomSanPhamMoi.length !== 0) {
                const nhomSanPham = [...loaiSanPham, nhomSanPhamMoi];
                const id = ttShop._id;
                const newShop = {
                    nhomSanPham: nhomSanPham,
                };
                updatettShop(
                    newShop,
                    id,
                    dispatch,
                    setloading,
                    setsuaThongTinShop
                );
                setnhomSanPhamMoi();
            }

            setAnhSanPham();
            setTenSanPham();
            settinhTrang();
            setnhomSanPham();
            setgiaNiemYet();
            setgiaKhuyenMai();
            setgiaNhap();
            setgiaCtv();
            setgiaSi();
            setthongTinSanPham();
            setpreviewSanPham();
            setnhomSanPhamMoi();
            setloading(1);
        }
    };
    const handleOnchangeImageSanPham = async (e) => {
        const fileSanPham = e.target.files[0];
        let SanPhamBase64 = await CommonUtils.getBase64(fileSanPham);

        fileSanPham.preview = URL.createObjectURL(fileSanPham);

        setAnhSanPham(SanPhamBase64);
        setpreviewSanPham(fileSanPham);
    };
    //  Que Quan
    // Tinh
    useEffect(() => {
        const fetchPublicProvince = async () => {
            const response = await apiGetPublicProvinces();
            if (response.status === 200) {
                setProvinces(response?.data.results);
            }
        };
        fetchPublicProvince();
    }, []);
    // Huyen
    useEffect(() => {
        const fetchPublicDictrict = async () => {
            const response = await apiGetPublicDistrict(provincesID);
            if (response.status === 200) {
                setDistricts(response?.data.results);
            }
        };
        provincesID && fetchPublicDictrict();

        !provincesID && setDistricts([]);
    }, [provincesID]);
    // Xa
    useEffect(() => {
        const fetchPublicWard = async () => {
            const response = await apiGetPublicWard(districtID);
            if (response.status === 200) {
                setWards(response?.data.results);
            }
        };
        districtID && fetchPublicWard();

        !provincesID && setWards([]);

        !districtID && setWards([]);
    }, [districtID]);
    // Que Quan
    // banner
    useEffect(() => {
        return () => {
            previewBanner && URL.revokeObjectURL(previewBanner.preview);
        };
    }, [previewBanner]);

    const handleOnchangeImageBanner = async (e) => {
        const fileBanner = e.target.files[0];
        let bannerBase64 = await CommonUtils.getBase64(fileBanner);

        fileBanner.preview = URL.createObjectURL(fileBanner);

        setBanner(bannerBase64);
        setpreviewBanner(fileBanner);
    };

    // banner
    const handleLuuThongTinShop = () => {
        // Que Quan
        const tenTinh = provinces?.find(
            (item) => item.province_id === provincesID
        );
        const tenHuyen = districts?.find(
            (item) => item.district_id === districtID
        );
        const tenXa = wards?.find((item) => item.ward_id === wardID);

        try {
            const id = ttShop._id;
            const newShop = {
                Banner: Banner,
                TenShop: TenShop,
                website: website,
                dcShop: DcShop,
                sdtShop: SdtShop,
                sloganShop: SloganShop,
                tinh: tenTinh?.province_name || ttShop?.tinh,
                huyen: tenHuyen?.district_name || ttShop?.huyen,
                xa: tenXa?.ward_name || ttShop?.xa,
                linkFacebook: linkFacebook,
                linkZalo: linkZalo,
                idNhanVien: idNhanVien,
                nguoiHoTro: nguoiHoTro,
                vaiTro: vaiTro,
                nhomSanPham: nhomSanPhamReSet,
                user: UserShop,
            };
            console.log("newShop", newShop);
            updatettShop(newShop, id, dispatch, setloading, setsuaThongTinShop);
            setloading(1);
            const newPost = {
                vaiTro: vaiTro,
            };
            const idpost = myDetail?._id;
            updatePost(newPost, idpost, dispatch);
        } catch (err) {
            console.log(err);
        }
    };
    const VND = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
    });
    const handleXoaSanPhamlienket = (id) => {
        const sanPhamSi = allshopLienKet[0]?.sanPhamSi.filter(
            (item) => item !== id
        );
        const sanPhamCtv = allshopLienKet[0]?.sanPhamCtv.filter(
            (item) => item !== id
        );
        const newshopLienKet = {
            idShop: idShop,
            user: user._id,
            sanPhamSi: sanPhamSi,
            sanPhamCtv: sanPhamCtv,
        };
        updateYourStatusUser(
            newshopLienKet,
            allshopLienKet[0]?._id,
            setloading,
            dispatch
        );
        setloading(1);
    };
    return (
        <>
            {!user ? (
                <DangNhap />
            ) : (
                <>
                    {loading === 0 ? (
                        <>
                            {user?._id === ttShop?.user ||
                            user?.admin === true ||
                            user?._id === ttShop?.idNhanVien ? (
                                <div className="updateShop-container">
                                    {/* ban dau */}
                                    {+suaThongTinShop === 0 ? (
                                        <div className="thongTinShop">
                                            <div className="headerShop">
                                                <div>
                                                    <img
                                                        src={ttShop?.Banner}
                                                        className="bannerShop"
                                                    />
                                                </div>
                                                <a
                                                    href={`/update-shop/${idShop}`}
                                                >
                                                    <div className="tenCuaHang">
                                                        {ttShop?.TenShop}
                                                    </div>
                                                </a>
                                            </div>

                                            <div className="themSanPham-suaThongTinShop">
                                                <button
                                                    className="themSanPham"
                                                    onClick={() =>
                                                        setsuaThongTinShop(2)
                                                    }
                                                >
                                                    Thêm Sản Phẩm
                                                </button>
                                                <button
                                                    className="suaThongTinShop"
                                                    onClick={() =>
                                                        setsuaThongTinShop(1)
                                                    }
                                                >
                                                    Sửa Thông Tin Shop
                                                </button>
                                            </div>
                                            <div className="nhomSanPham-sanPham">
                                                {arrNhomSanPham &&
                                                    arrNhomSanPham?.map(
                                                        (item2, index) => {
                                                            return (
                                                                <div
                                                                    key={index}
                                                                >
                                                                    {item2 ===
                                                                    "Sản Phẩm Dẫn" ? (
                                                                        <div className="nhomSanPham">
                                                                            Top
                                                                            Sản
                                                                            Phẩm
                                                                            Bán
                                                                            Chạy
                                                                        </div>
                                                                    ) : (
                                                                        <div className="nhomSanPham">
                                                                            {
                                                                                item2
                                                                            }
                                                                        </div>
                                                                    )}

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
                                                                                                    item._id
                                                                                                }
                                                                                                className="sanPham"
                                                                                            >
                                                                                                <div className="suaxoa">
                                                                                                    <button
                                                                                                        className="sua"
                                                                                                        onClick={() =>
                                                                                                            handleSuaSanPham(
                                                                                                                item._id
                                                                                                            )
                                                                                                        }
                                                                                                    >
                                                                                                        Sửa
                                                                                                        Sản
                                                                                                        Phẩm
                                                                                                    </button>

                                                                                                    <button
                                                                                                        className="xoa"
                                                                                                        onClick={() =>
                                                                                                            handleXoaSanPham(
                                                                                                                item._id
                                                                                                            )
                                                                                                        }
                                                                                                    >
                                                                                                        {" "}
                                                                                                        <a
                                                                                                            href={`/update-shop/${idShop}`}
                                                                                                        >
                                                                                                            Xoá
                                                                                                            Sản
                                                                                                            Phẩm{" "}
                                                                                                        </a>
                                                                                                    </button>
                                                                                                </div>
                                                                                                <div>
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

                                                                                                    <button className="muaHang">
                                                                                                        MUA
                                                                                                        HÀNG
                                                                                                    </button>
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
                                                {arraySanPham &&
                                                    arraySanPham.length !==
                                                        0 && (
                                                        <div className="nhomSanPham">
                                                            Sản Phẩm Liên Kết
                                                        </div>
                                                    )}
                                                {arraySanPham &&
                                                    arraySanPham.length !==
                                                        0 && (
                                                        <div className="sanPham-container">
                                                            {arraySanPham &&
                                                                arraySanPham?.map(
                                                                    (item) => {
                                                                        return (
                                                                            <div
                                                                                key={
                                                                                    item._id
                                                                                }
                                                                                className="sanPham"
                                                                            >
                                                                                <div className="suaxoa">
                                                                                    <button
                                                                                        className="xoa"
                                                                                        onClick={() =>
                                                                                            handleXoaSanPhamlienket(
                                                                                                item._id
                                                                                            )
                                                                                        }
                                                                                    >
                                                                                        Xoá
                                                                                        Sản
                                                                                        Phẩm
                                                                                    </button>
                                                                                </div>
                                                                                <div>
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

                                                                                    <button className="muaHang">
                                                                                        MUA
                                                                                        HÀNG
                                                                                    </button>
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
                                                                        );
                                                                    }
                                                                )}
                                                        </div>
                                                    )}
                                            </div>
                                        </div>
                                    ) : (
                                        <div> </div>
                                    )}
                                    {/* sua shop */}
                                    {+suaThongTinShop === 1 ? (
                                        <div className="UpdateShop">
                                            <div className="banner-container">
                                                <label hidden>Banner</label>
                                                <div>
                                                    <input
                                                        id="banner"
                                                        type="file"
                                                        hidden
                                                        onChange={
                                                            handleOnchangeImageBanner
                                                        }
                                                        className="bannerShop"
                                                    />
                                                    <label
                                                        htmlFor="banner"
                                                        className="bannerShop"
                                                    >
                                                        <div>
                                                            {previewBanner ? (
                                                                <img
                                                                    src={
                                                                        previewBanner.preview
                                                                    }
                                                                    className="bannerShop"
                                                                />
                                                            ) : (
                                                                <img
                                                                    src={Banner}
                                                                    className="bannerShop"
                                                                />
                                                            )}
                                                        </div>
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="containerTieuChiFormregis">
                                                <div className="tieuChiFormregis">
                                                    Tên Shop
                                                </div>
                                                <input
                                                    className="noiDungFormregis3"
                                                    placeholder={TenShop}
                                                    type="text"
                                                    onChange={(e) =>
                                                        setTenShop(
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                            </div>

                                            <div className="containerTieuChiFormregis">
                                                <div className="tieuChiFormregis">
                                                    Website
                                                </div>
                                                <input
                                                    className="noiDungFormregis3"
                                                    placeholder={website}
                                                    type="text"
                                                    onChange={(e) =>
                                                        setwebsite(
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                            </div>

                                            <div className="containerTieuChiFormregis">
                                                <div className="tieuChiFormregis">
                                                    Số Điện Thoại
                                                </div>
                                                <input
                                                    className="noiDungFormregis3"
                                                    placeholder={SdtShop}
                                                    type="text"
                                                    onChange={(e) =>
                                                        setSdtShop(
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                            </div>

                                            <div className="containerTieuChiFormregis">
                                                <div className="tieuChiFormregis">
                                                    Khẩu Hiệu
                                                </div>
                                                <input
                                                    className="noiDungFormregis3"
                                                    placeholder={SloganShop}
                                                    type="text"
                                                    onChange={(e) =>
                                                        setSloganShop(
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                            </div>
                                            <div className="containerTieuChiFormregis">
                                                <div className="tieuChiFormregis">
                                                    Địa Chỉ
                                                </div>
                                                <input
                                                    className="noiDungFormregis3"
                                                    placeholder={ttShop?.dcShop}
                                                    type="text"
                                                    onChange={(e) =>
                                                        setDcShop(
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                            </div>
                                            <div className="containerTieuChiFormregis">
                                                <div className="tieuChiFormregis">
                                                    Chọn Địa Chỉ Shop
                                                </div>

                                                <div className="noiDungFormregis">
                                                    <label hidden>Tỉnh</label>
                                                    <select
                                                        id="provinces"
                                                        onChange={(e) =>
                                                            setprovincesID(
                                                                e.target.value
                                                            )
                                                        }
                                                    >
                                                        <option value="">
                                                            {ttShop?.tinh}
                                                        </option>
                                                        {provinces?.map(
                                                            (item) => {
                                                                return (
                                                                    <option
                                                                        key={
                                                                            item.province_id
                                                                        }
                                                                        value={
                                                                            item.province_id
                                                                        }
                                                                    >
                                                                        {
                                                                            item.province_name
                                                                        }
                                                                    </option>
                                                                );
                                                            }
                                                        )}
                                                    </select>
                                                    <select
                                                        onChange={(e) =>
                                                            setDistrictID(
                                                                e.target.value
                                                            )
                                                        }
                                                    >
                                                        <option value="">
                                                            {ttShop?.huyen}
                                                        </option>
                                                        {districts?.map(
                                                            (item) => {
                                                                return (
                                                                    <option
                                                                        value={
                                                                            item.district_id
                                                                        }
                                                                        key={
                                                                            item.district_id
                                                                        }
                                                                    >
                                                                        {
                                                                            item.district_name
                                                                        }
                                                                    </option>
                                                                );
                                                            }
                                                        )}
                                                    </select>
                                                    <select
                                                        onChange={(e) =>
                                                            setWardID(
                                                                e.target.value
                                                            )
                                                        }
                                                    >
                                                        <option value="">
                                                            {ttShop?.xa}
                                                        </option>
                                                        {wards?.map((item) => {
                                                            return (
                                                                <option
                                                                    value={
                                                                        item.ward_id
                                                                    }
                                                                    key={
                                                                        item.ward_id
                                                                    }
                                                                >
                                                                    {
                                                                        item.ward_name
                                                                    }
                                                                </option>
                                                            );
                                                        })}
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="containerTieuChiFormregis">
                                                <div className="tieuChiFormregis">
                                                    Link Facebook
                                                </div>
                                                <input
                                                    className="noiDungFormregis3"
                                                    placeholder={linkFacebook}
                                                    type="text"
                                                    onChange={(e) =>
                                                        setlinkFacebook(
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                            </div>
                                            <div className="containerTieuChiFormregis">
                                                <div className="tieuChiFormregis">
                                                    Link Zalo
                                                </div>
                                                <input
                                                    className="noiDungFormregis3"
                                                    placeholder={linkZalo}
                                                    type="text"
                                                    onChange={(e) =>
                                                        setlinkZalo(
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                            </div>
                                            {user._id === ttShop?.user ||
                                            user?.admin === true ? (
                                                <div className="containerTieuChiFormregis">
                                                    <div className="tieuChiFormregis">
                                                        Nhập ID Nhân Viên
                                                    </div>
                                                    <input
                                                        className="noiDungFormregis3"
                                                        placeholder={idNhanVien}
                                                        type="text"
                                                        onChange={(e) =>
                                                            setidNhanVien(
                                                                e.target.value
                                                            )
                                                        }
                                                    />
                                                </div>
                                            ) : (
                                                <></>
                                            )}
                                            {user?.admin === true && (
                                                <div>
                                                    <div className="containerTieuChiFormregis">
                                                        <div className="tieuChiFormregis">
                                                            Người Hỗ Trợ
                                                        </div>
                                                        <input
                                                            className="noiDungFormregis3"
                                                            placeholder={
                                                                nguoiHoTro
                                                            }
                                                            type="text"
                                                            onChange={(e) =>
                                                                setnguoiHoTro(
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                        />
                                                    </div>
                                                    <div className="containerTieuChiFormregis">
                                                        <div className="tieuChiFormregis">
                                                            Nhập ID Chủ Shop
                                                        </div>
                                                        <input
                                                            className="noiDungFormregis3"
                                                            placeholder={
                                                                UserShop
                                                            }
                                                            type="text"
                                                            onChange={(e) =>
                                                                setUserShop(
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                        />
                                                    </div>
                                                    <div className="containerTieuChiFormregis">
                                                        <label className="tieuChiFormregis">
                                                            Reset nhomSanPham
                                                        </label>

                                                        <select
                                                            className="noiDungFormregis"
                                                            onChange={(e) =>
                                                                setresetNhomSanPham(
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                        >
                                                            <option value="1">
                                                                Không Reset Nhóm
                                                            </option>
                                                            <option value="2">
                                                                Reset Nhóm
                                                            </option>
                                                        </select>
                                                    </div>
                                                    <div className="containerTieuChiFormregis">
                                                        <label className="tieuChiFormregis">
                                                            Nhóm Shop
                                                        </label>

                                                        <select
                                                            className="noiDungFormregis"
                                                            onChange={(e) =>
                                                                setvaiTro(
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                        >
                                                            <option value="">
                                                                ---Mời Chọn---
                                                            </option>
                                                            <option value="1">
                                                                Shop Thường
                                                            </option>
                                                            <option value="2">
                                                                Shop VIP
                                                            </option>
                                                        </select>
                                                    </div>
                                                </div>
                                            )}

                                            <div>
                                                <button
                                                    className="huyDon"
                                                    onClick={() =>
                                                        setsuaThongTinShop(0)
                                                    }
                                                >
                                                    Close
                                                </button>
                                                <button
                                                    className="hoanThanh"
                                                    onClick={
                                                        handleLuuThongTinShop
                                                    }
                                                >
                                                    Lưu Thông Tin
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        <div></div>
                                    )}
                                    {/* them sp */}
                                    {+suaThongTinShop === 2 ? (
                                        <div className="them">
                                            <div className="container-themSanPham">
                                                <button
                                                    className="close"
                                                    onClick={() =>
                                                        setsuaThongTinShop(0)
                                                    }
                                                >
                                                    Close
                                                </button>

                                                <div className="sanPham">
                                                    <div>
                                                        <input
                                                            id="anhsanpham"
                                                            type="file"
                                                            hidden
                                                            onChange={
                                                                handleOnchangeImageSanPham
                                                            }
                                                        />
                                                        <label htmlFor="anhsanpham">
                                                            <div className="anhsanpham">
                                                                {previewSanPham && (
                                                                    <img
                                                                        src={
                                                                            previewSanPham.preview
                                                                        }
                                                                        className="anhsanpham"
                                                                    />
                                                                )}
                                                            </div>
                                                        </label>
                                                    </div>

                                                    <div className="tieuDeNoiDung">
                                                        <label className="tieuDe">
                                                            Tên Sản Phẩm
                                                        </label>

                                                        <input
                                                            onChange={(e) =>
                                                                setTenSanPham(
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                            className="noiDung"
                                                            placeholder="Thêm tên sản phẩm"
                                                        />
                                                    </div>
                                                    <div className="tieuDeNoiDung">
                                                        <label className="tieuDe">
                                                            Tình Trạng
                                                        </label>

                                                        <select
                                                            className="noiDung"
                                                            onChange={(e) =>
                                                                settinhTrang(
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                        >
                                                            <option>
                                                                Còn Hàng
                                                            </option>
                                                            <option>
                                                                Tạm Hết
                                                            </option>
                                                        </select>
                                                    </div>
                                                    <div className="tieuDeNoiDung">
                                                        <label className="tieuDe">
                                                            Nhóm Sản Phẩm
                                                        </label>
                                                        <select
                                                            className="noiDung"
                                                            onChange={(e) =>
                                                                setnhomSanPham(
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                        >
                                                            <option value="">
                                                                ---Mời Chọn---
                                                            </option>
                                                            {allSanPhamDan &&
                                                                allSanPhamDan.length <
                                                                    2 && (
                                                                    <option>
                                                                        Sản Phẩm
                                                                        Dẫn
                                                                    </option>
                                                                )}
                                                            <option value="1">
                                                                Thêm Nhóm Mới
                                                            </option>
                                                            {loaiSanPham &&
                                                                loaiSanPham?.length !==
                                                                    0 &&
                                                                loaiSanPham?.map(
                                                                    (
                                                                        item,
                                                                        index
                                                                    ) => {
                                                                        return (
                                                                            <option
                                                                                key={
                                                                                    index
                                                                                }
                                                                            >
                                                                                {
                                                                                    item
                                                                                }
                                                                            </option>
                                                                        );
                                                                    }
                                                                )}
                                                        </select>
                                                    </div>
                                                    {nhomSanPham === "1" && (
                                                        <div className="tieuDeNoiDung">
                                                            <label className="tieuDe">
                                                                Thêm Nhóm Mới
                                                            </label>

                                                            <input
                                                                className="noiDung"
                                                                onChange={(e) =>
                                                                    setnhomSanPhamMoi(
                                                                        e.target
                                                                            .value
                                                                    )
                                                                }
                                                                placeholder="Thêm nhóm mới"
                                                            />
                                                        </div>
                                                    )}

                                                    <div className="tieuDeNoiDung">
                                                        <label className="tieuDe">
                                                            Giá Niêm Yết
                                                        </label>

                                                        <input
                                                            type="number"
                                                            className="noiDung"
                                                            onChange={(e) =>
                                                                setgiaNiemYet(
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                            placeholder="Thêm giá niêm yết (VNĐ)"
                                                        />
                                                    </div>
                                                    <div className="tieuDeNoiDung">
                                                        <label className="tieuDe">
                                                            Giá Khuyến Mại
                                                        </label>

                                                        <input
                                                            type="number"
                                                            className="noiDung"
                                                            onChange={(e) =>
                                                                setgiaKhuyenMai(
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                            placeholder="Thêm giá khuyến mại (VNĐ)"
                                                        />
                                                    </div>
                                                    <div className="tieuDeNoiDung">
                                                        <div className="tieuDe">
                                                            Giá Nhập
                                                        </div>
                                                        <input
                                                            type="number"
                                                            placeholder="Thêm giá nhập (VNĐ)"
                                                            className="noiDung"
                                                            onChange={(e) =>
                                                                setgiaNhap(
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                        />
                                                    </div>
                                                    <div className="tieuDeNoiDung">
                                                        <div className="tieuDe">
                                                            Giá Cộng Tác Viên
                                                        </div>
                                                        <input
                                                            type="Number"
                                                            placeholder="Thêm giá cộng tác viên (VNĐ)"
                                                            className="noiDung"
                                                            onChange={(e) =>
                                                                setgiaCtv(
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                        />
                                                    </div>
                                                    <div className="tieuDeNoiDung">
                                                        <div className="tieuDe">
                                                            Giá Sỉ
                                                        </div>
                                                        <input
                                                            type="Number"
                                                            placeholder="Thêm giá sỉ (VNĐ)"
                                                            className="noiDung"
                                                            onChange={(e) =>
                                                                setgiaSi(
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                        />
                                                    </div>
                                                    <div className="thongTinSanPham">
                                                        <label className="tieuDe">
                                                            Thông Tin Sản Phẩm
                                                        </label>
                                                        <CKEditor
                                                            editor={
                                                                ClassicEditor
                                                            }
                                                            data="<p>Thêm thông tin sản phẩm</p>"
                                                            onReady={(
                                                                editor
                                                            ) => {
                                                                // You can store the "editor" and use when it is needed.
                                                                console.log(
                                                                    "Editor is ready to use!",
                                                                    editor
                                                                );
                                                            }}
                                                            onChange={(
                                                                event,
                                                                editor
                                                            ) => {
                                                                console.log(
                                                                    event
                                                                );
                                                                setthongTinSanPham(
                                                                    editor.getData()
                                                                );
                                                            }}
                                                            onBlur={(
                                                                event,
                                                                editor
                                                            ) => {
                                                                console.log(
                                                                    "Blur.",
                                                                    editor
                                                                );
                                                            }}
                                                            onFocus={(
                                                                event,
                                                                editor
                                                            ) => {
                                                                console.log(
                                                                    "Focus.",
                                                                    editor
                                                                );
                                                            }}
                                                        />
                                                    </div>

                                                    <button
                                                        className="hoanThanh"
                                                        onClick={
                                                            handleThemSanPham
                                                        }
                                                    >
                                                        Lưu Sản Phẩm
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="luuY">
                                                Lưu ý: <br /> - Sản Phẩm Dẫn là
                                                sản phẩm xuất hiện trên cùng
                                                Website. <br />- Mỗi Shop nên
                                                chọn ra 2 Sản Phẩm Dẫn đáng chú
                                                ý nhất! <br /> - Sản Phẩm Dẫn sẽ
                                                hiển thị trên trang chủ Website
                                                Fabysa.
                                            </div>
                                        </div>
                                    ) : (
                                        <div></div>
                                    )}
                                    {/* sua sp */}
                                    {+suaThongTinShop === 3 ? (
                                        <div className="them">
                                            <div className="container-themSanPham">
                                                <button
                                                    className="close"
                                                    onClick={() =>
                                                        setsuaThongTinShop(0)
                                                    }
                                                >
                                                    Close
                                                </button>

                                                <div className="sanPham">
                                                    <div>
                                                        <input
                                                            id="anhsuasanpham"
                                                            type="file"
                                                            hidden
                                                            onChange={
                                                                handleOnchangeImagesuaSanPham
                                                            }
                                                        />
                                                        <label htmlFor="anhsuasanpham">
                                                            <div className="anhsanpham">
                                                                {previewSanPham2 ? (
                                                                    <img
                                                                        src={
                                                                            previewSanPham2.preview
                                                                        }
                                                                        className="anhsanpham"
                                                                    />
                                                                ) : (
                                                                    <img
                                                                        src={
                                                                            detailidSpSua?.AnhSanPham
                                                                        }
                                                                        className="anhsanpham"
                                                                    />
                                                                )}
                                                            </div>
                                                        </label>
                                                    </div>

                                                    <div className="tieuDeNoiDung">
                                                        <label className="tieuDe">
                                                            Tên Sản Phẩm
                                                        </label>

                                                        <input
                                                            onChange={(e) =>
                                                                setTenSanPham2(
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                            className="noiDung"
                                                            placeholder={
                                                                detailidSpSua?.TenSanPham
                                                            }
                                                        />
                                                    </div>
                                                    <div className="tieuDeNoiDung">
                                                        <label className="tieuDe">
                                                            Tình Trạng
                                                        </label>

                                                        <select
                                                            className="noiDung"
                                                            onChange={(e) =>
                                                                settinhTrang2(
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                        >
                                                            <option>
                                                                {tinhTrang2}
                                                            </option>
                                                            <option>
                                                                Còn Hàng
                                                            </option>
                                                            <option>
                                                                Tạm Hết
                                                            </option>
                                                        </select>
                                                    </div>
                                                    <div className="tieuDeNoiDung">
                                                        <label className="tieuDe">
                                                            Nhóm Sản Phẩm
                                                        </label>

                                                        <select
                                                            className="noiDung"
                                                            onChange={(e) =>
                                                                setnhomSanPham2(
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                        >
                                                            <option>
                                                                {nhomSanPham2}
                                                            </option>
                                                            {allSanPhamDan &&
                                                                allSanPhamDan.length <
                                                                    2 && (
                                                                    <option>
                                                                        Sản Phẩm
                                                                        Dẫn
                                                                    </option>
                                                                )}
                                                            <option value="1">
                                                                Thêm Nhóm Mới
                                                            </option>
                                                            {loaiSanPham &&
                                                                loaiSanPham?.length !==
                                                                    0 &&
                                                                loaiSanPham?.map(
                                                                    (
                                                                        item,
                                                                        index
                                                                    ) => {
                                                                        return (
                                                                            <option
                                                                                key={
                                                                                    index
                                                                                }
                                                                            >
                                                                                {
                                                                                    item
                                                                                }
                                                                            </option>
                                                                        );
                                                                    }
                                                                )}
                                                        </select>
                                                    </div>
                                                    {nhomSanPham2 === "1" && (
                                                        <div className="tieuDeNoiDung">
                                                            <label className="tieuDe">
                                                                Thêm Nhóm Mới
                                                            </label>

                                                            <input
                                                                className="noiDung"
                                                                onChange={(e) =>
                                                                    setnhomSanPhamMoi2(
                                                                        e.target
                                                                            .value
                                                                    )
                                                                }
                                                                placeholder="Thêm nhóm mới"
                                                            />
                                                        </div>
                                                    )}

                                                    <div className="tieuDeNoiDung">
                                                        <label className="tieuDe">
                                                            Giá Niêm Yết
                                                        </label>

                                                        <input
                                                            type="number"
                                                            className="noiDung"
                                                            onChange={(e) =>
                                                                setgiaNiemYet2(
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                            placeholder={VND.format(
                                                                detailidSpSua?.giaNiemYet
                                                            )}
                                                        />
                                                    </div>
                                                    <div className="tieuDeNoiDung">
                                                        <label className="tieuDe">
                                                            Giá Khuyến Mại
                                                        </label>

                                                        <input
                                                            type="number"
                                                            className="noiDung"
                                                            onChange={(e) =>
                                                                setgiaKhuyenMai2(
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                            placeholder={VND.format(
                                                                detailidSpSua?.giaKhuyenMai
                                                            )}
                                                        />
                                                    </div>
                                                    {detailidSpSua?.idtk ===
                                                        user?._id && (
                                                        <>
                                                            <div className="tieuDeNoiDung">
                                                                <div className="tieuDe">
                                                                    Giá Nhập
                                                                </div>
                                                                <input
                                                                    type="number"
                                                                    className="noiDung"
                                                                    placeholder={VND.format(
                                                                        giaNhap2
                                                                    )}
                                                                    onChange={(
                                                                        e
                                                                    ) =>
                                                                        setgiaNhap2(
                                                                            e
                                                                                .target
                                                                                .value
                                                                        )
                                                                    }
                                                                />
                                                            </div>
                                                            <div className="tieuDeNoiDung">
                                                                <div className="tieuDe">
                                                                    Giá Cộng Tác
                                                                    Viên
                                                                </div>
                                                                <input
                                                                    type="number"
                                                                    className="noiDung"
                                                                    placeholder={VND.format(
                                                                        giaCtv2
                                                                    )}
                                                                    onChange={(
                                                                        e
                                                                    ) =>
                                                                        setgiaCtv2(
                                                                            e
                                                                                .target
                                                                                .value
                                                                        )
                                                                    }
                                                                />
                                                            </div>
                                                            <div className="tieuDeNoiDung">
                                                                <div className="tieuDe">
                                                                    Giá Sỉ
                                                                </div>
                                                                <input
                                                                    type="number"
                                                                    className="noiDung"
                                                                    placeholder={VND.format(
                                                                        giaSi2
                                                                    )}
                                                                    onChange={(
                                                                        e
                                                                    ) =>
                                                                        setgiaSi2(
                                                                            e
                                                                                .target
                                                                                .value
                                                                        )
                                                                    }
                                                                />
                                                            </div>
                                                        </>
                                                    )}

                                                    <div className="thongTinSanPham">
                                                        <label className="tieuDe">
                                                            Thông Tin Sản Phẩm
                                                        </label>
                                                        <CKEditor
                                                            editor={
                                                                ClassicEditor
                                                            }
                                                            data={
                                                                thongTinSanPham2
                                                            }
                                                            onReady={(
                                                                editor
                                                            ) => {}}
                                                            onChange={(
                                                                event,
                                                                editor
                                                            ) => {
                                                                console.log(
                                                                    event
                                                                );
                                                                setthongTinSanPham2(
                                                                    editor.getData()
                                                                );
                                                            }}
                                                            onBlur={(
                                                                event,
                                                                editor
                                                            ) => {
                                                                console.log(
                                                                    "Blur.",
                                                                    editor
                                                                );
                                                            }}
                                                            onFocus={(
                                                                event,
                                                                editor
                                                            ) => {
                                                                console.log(
                                                                    "Focus.",
                                                                    editor
                                                                );
                                                            }}
                                                        />
                                                    </div>

                                                    <button
                                                        className="hoanThanh"
                                                        onClick={() =>
                                                            handleLuuSanPham(
                                                                detailidSpSua?._id
                                                            )
                                                        }
                                                    >
                                                        Lưu Sản Phẩm
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div></div>
                                    )}
                                </div>
                            ) : (
                                <></>
                            )}
                        </>
                    ) : (
                        <Loading />
                    )}
                </>
            )}
        </>
    );
};
export default UpdateShop;
