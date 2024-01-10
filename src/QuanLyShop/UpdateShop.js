import "./UpdateShop.scss";
import CommonUtils from "../component/CommonUtils";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
    getttShop,
    updatettShop,
    registerSanPham,
    getSanPham,
    updateSanPham,
    getPost,
    deleteSanPham,
    updatePost,
} from "../redux/apiRequest";
import { useEffect } from "react";
import {
    apiGetPublicProvinces,
    apiGetPublicDistrict,
    apiGetPublicWard,
} from "../redux/ApiProvince";
import DangNhap from "../DangNhap/DangNhap";
const UpdateShop = () => {
    const { idShop } = useParams();
    console.log("idShop", idShop);
    const user = useSelector((state) => state.auth.login?.currentUser);
    const myDetail = useSelector((state) => state.post.post?.myDetail);
    const ttShop = useSelector((state) => state.ttShop.ttShop.ttShop?.shop);
    const allSanPham = useSelector(
        (state) => state.sanPham.sanPham.allsanPham?.allSanpham
    );
    console.log("allSanPham", allSanPham);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        getSanPham(idShop, dispatch);
    }, []);
    useEffect(() => {
        getPost(user?._id, dispatch);
    }, [user]);
    // san pham
    // shop
    const [suaThongTinShop, setsuaThongTinShop] = useState(0);
    useEffect(() => {
        getttShop(idShop, dispatch);
    }, [suaThongTinShop]);
    const [previewAvatar, setpreviewAvatar] = useState();
    const [previewBanner, setpreviewBanner] = useState();
    const [Banner, setBanner] = useState(ttShop?.Banner);
    const [TenShop, setTenShop] = useState(ttShop?.TenShop);
    const [linkFacebook, setlinkFacebook] = useState(ttShop?.linkFacebook);
    const [linkZalo, setlinkZalo] = useState(ttShop?.linkZalo);
    const [idNhanVien, setidNhanVien] = useState(ttShop?.idNhanVien);
    const [DcShop, setDcShop] = useState(ttShop?.dcShop);

    const [SdtShop, setSdtShop] = useState(ttShop?.sdtShop);
    const [SloganShop, setSloganShop] = useState(ttShop?.sloganShop);
    const [UserShop, setUserShop] = useState(ttShop?.user);
    const [vaiTro, setvaiTro] = useState(ttShop?.vaiTro);

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
    const [giaNiemYet, setgiaNiemYet] = useState(0);
    const [giaKhuyenMai, setgiaKhuyenMai] = useState(0);
    const [nhomSanPham, setnhomSanPham] = useState();
    const [sanPhamDan, setsanPhamDan] = useState("Sản Phẩm Khác");
    const [thongTinSanPham, setthongTinSanPham] = useState();
    const [giaNhap, setgiaNhap] = useState(0);
    const [hoahongCTV, sethoahongCTV] = useState(0);
    // San Pham Dan
    const allSanPhamDan = allSanPham?.filter(
        (item) => item.sanPhamDan === "Sản Phẩm Dẫn"
    );
    // San Pham Ban la CTV
    const allSanPhamCTV = allSanPham?.filter(
        (item) => item.sanPhamDan === "Sản Phẩm Dẫn"
    );
    console.log("allSanPhamDan", allSanPhamDan);
    // sua sanPham
    const handleSuaSanPham = (id) => {
        setsuaThongTinShop(3);
        setidSpSua(id);
    };
    const [idSpSua, setidSpSua] = useState(0);
    const detailidSpSua = allSanPham?.find((item) => item._id === idSpSua);
    console.log("detailidSpSua", detailidSpSua?.affiliate.length !== 0);
    const [previewSanPham2, setpreviewSanPham2] = useState();
    const [AnhSanPham2, setAnhSanPham2] = useState();
    const [TenSanPham2, setTenSanPham2] = useState();
    const [giaNiemYet2, setgiaNiemYet2] = useState(0);
    const [giaKhuyenMai2, setgiaKhuyenMai2] = useState(0);
    const [nhomSanPham2, setnhomSanPham2] = useState();
    const [sanPhamDan2, setsanPhamDan2] = useState();
    const [thongTinSanPham2, setthongTinSanPham2] = useState();
    const [giaNhap2, setgiaNhap2] = useState(0);
    const [hoahongCTV2, sethoahongCTV2] = useState(0);
    useEffect(() => {
        if (idSpSua && idSpSua.length !== 0) {
            setAnhSanPham2(detailidSpSua?.AnhSanPham);
            setTenSanPham2(detailidSpSua?.TenSanPham);
            setgiaKhuyenMai2(detailidSpSua?.giaKhuyenMai);
            setgiaNiemYet2(detailidSpSua?.giaNiemYet);
            setnhomSanPham2(detailidSpSua?.nhomSanPham);
            setsanPhamDan2(detailidSpSua?.sanPhamDan);
            setthongTinSanPham2(detailidSpSua?.thongTinSanPham);
            setgiaNhap2(detailidSpSua?.giaNhap);
            sethoahongCTV2(detailidSpSua?.hoahongCTV);
        }
    }, [idSpSua]);
    console.log("giaKhuyenMai2", giaKhuyenMai2);
    console.log("idSpSua", idSpSua);

    // sua sp
    // useEffect(() => {
    //     return () => {
    //         previewSanPham2 && URL.revokeObjectURL(previewSanPham2.preview);
    //     };
    // }, [previewSanPham2]);
    const handleOnchangeImagesuaSanPham = async (e) => {
        console.log("e", e);
        const fileSanPham = e.target.files[0];
        let SanPhamBase64 = await CommonUtils.getBase64(fileSanPham);

        fileSanPham.preview = URL.createObjectURL(fileSanPham);

        setAnhSanPham2(SanPhamBase64);
        setpreviewSanPham2(fileSanPham);
    };
    console.log("AnhSanPham2", AnhSanPham2);
    console.log("previewSanPham2", previewSanPham2);
    const handleLuuSanPham = (id) => {
        const newSanPham = {
            AnhSanPham: AnhSanPham2,
            TenSanPham: TenSanPham2,
            giaNiemYet: giaNiemYet2,
            giaKhuyenMai: giaKhuyenMai2,
            nhomSanPham: nhomSanPham2,
            sanPhamDan: sanPhamDan2,
            thongTinSanPham: thongTinSanPham2,
            giaNhap: giaNhap2,
            hoahongCTV: hoahongCTV2,
            TenShop: ttShop?.TenShop,
            xa: ttShop?.xa,
            huyen: ttShop?.huyen,
            tinh: ttShop?.tinh,
            vaiTro: ttShop?.vaiTro,
            affiliate: "",
            idtk: ttShop?.user,
            user: idShop,
        };
        console.log("id", id);
        console.log("newSanPham", newSanPham);
        updateSanPham(newSanPham, id, dispatch);
        // navigate(`/update-shop/${idShop}`);
        setsuaThongTinShop(0);
    };
    const handleXoaSanPham = (id) => {
        deleteSanPham(id, dispatch);
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
                giaNiemYet: giaNiemYet,
                giaKhuyenMai: giaKhuyenMai,
                nhomSanPham: nhomSanPham,
                sanPhamDan: sanPhamDan,
                thongTinSanPham: thongTinSanPham,
                giaNhap: giaNhap,
                hoahongCTV: hoahongCTV,
                TenShop: ttShop?.TenShop,
                xa: ttShop?.xa,
                huyen: ttShop?.huyen,
                tinh: ttShop?.tinh,
                vaiTro: ttShop?.vaiTro,
                user: idShop,
                idtk: ttShop?.user,
                affiliate: "",
            };
            console.log("newSanPham", newSanPham);
            registerSanPham(newSanPham, dispatch);
            setsuaThongTinShop(0);
            setAnhSanPham();
            setTenSanPham();
            setgiaNiemYet();
            setgiaKhuyenMai();
            setnhomSanPham();
            setsanPhamDan();
            setthongTinSanPham();
            setpreviewSanPham();
            // navigate(`/update-shop/${idShop}`);
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
    // console.log("provincesID", provincesID);
    // console.log("provinces", provinces);
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
    // console.log("districtID", districtID);
    // console.log("districts", districts);
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

    // console.log("wardID", wardID);
    // console.log("wards", wards);
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
    console.log("previewBanner", previewBanner);

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
                dcShop: DcShop,
                sdtShop: SdtShop,
                sloganShop: SloganShop,
                tinh: tenTinh?.province_name || ttShop?.tinh,
                huyen: tenHuyen?.district_name || ttShop?.huyen,
                xa: tenXa?.ward_name || ttShop?.xa,
                linkFacebook: linkFacebook,
                linkZalo: linkZalo,
                idNhanVien: idNhanVien,
                vaiTro: vaiTro,
                user: UserShop,
            };
            console.log("newShop", newShop);
            updatettShop(newShop, id, dispatch);
            setsuaThongTinShop(0);
            const newPost = {
                vaiTro: 1,
            };
            const idpost = myDetail?._id;
            console.log("newPost", newPost);
            updatePost(newPost, idpost, dispatch);
        } catch (err) {
            console.log(err);
        }
    };
    const VND = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
    });
    console.log(ttShop?.idNhanVien);

    return (
        <>
            {!user ? (
                <DangNhap />
            ) : (
                <>
                    {user?._id === ttShop?.user ||
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
                                        <div className="tenCuaHang">
                                            {ttShop?.TenShop}
                                        </div>
                                        <div className="sloganShop">
                                            {ttShop?.sloganShop}
                                        </div>
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
                                    <div className="sanPham-container">
                                        {allSanPham &&
                                            allSanPham?.map((item) => {
                                                return (
                                                    <div
                                                        key={item._id}
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
                                                                Sửa Sản Phẩm
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
                                                                    Xoá Sản Phẩm{" "}
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
                                                                MUA HÀNG
                                                            </button>
                                                            <div className="viTriSanPham">
                                                                <i className="fa-solid fa-location-dot"></i>
                                                                <div className="diachisanpham">
                                                                    {item?.xa}
                                                                </div>
                                                                <div className="diachisanpham">
                                                                    {
                                                                        item?.huyen
                                                                    }
                                                                </div>
                                                                <div className="diachisanpham">
                                                                    {item?.tinh}
                                                                </div>
                                                            </div>
                                                            {item?.affiliate
                                                                .length !==
                                                                0 && (
                                                                <div className="sanPhamDan">
                                                                    Sản Phẩm
                                                                    Liên Kết
                                                                </div>
                                                            )}
                                                            {item?.sanPhamDan ===
                                                                "Sản Phẩm Dẫn" && (
                                                                <div className="sanPhamDan">
                                                                    Sản Phẩm Dẫn
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                );
                                            })}
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
                                            placeholder={ttShop?.TenShop}
                                            type="text"
                                            onChange={(e) =>
                                                setTenShop(e.target.value)
                                            }
                                        />
                                    </div>

                                    <div className="containerTieuChiFormregis">
                                        <div className="tieuChiFormregis">
                                            Số Điện Thoại
                                        </div>
                                        <input
                                            className="noiDungFormregis3"
                                            placeholder={ttShop.sdtShop}
                                            type="text"
                                            onChange={(e) =>
                                                setSdtShop(e.target.value)
                                            }
                                        />
                                    </div>

                                    <div className="containerTieuChiFormregis">
                                        <div className="tieuChiFormregis">
                                            Khẩu Hiệu
                                        </div>
                                        <input
                                            className="noiDungFormregis3"
                                            placeholder={ttShop?.sloganShop}
                                            type="text"
                                            onChange={(e) =>
                                                setSloganShop(e.target.value)
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
                                                setDcShop(e.target.value)
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
                                                // onChange={(e) => console.log("e", e)}
                                            >
                                                <option value="">
                                                    ---Chọn Tỉnh/TP---
                                                </option>
                                                {provinces?.map((item) => {
                                                    return (
                                                        <option
                                                            key={
                                                                item.province_id
                                                            }
                                                            value={
                                                                item.province_id
                                                            }
                                                        >
                                                            {item.province_name}
                                                        </option>
                                                    );
                                                })}
                                            </select>
                                            <select
                                                onChange={(e) =>
                                                    setDistrictID(
                                                        e.target.value
                                                    )
                                                }
                                            >
                                                <option value="">
                                                    ---Chọn Quận/Huyện---
                                                </option>
                                                {districts?.map((item) => {
                                                    return (
                                                        <option
                                                            value={
                                                                item.district_id
                                                            }
                                                            key={
                                                                item.district_id
                                                            }
                                                        >
                                                            {item.district_name}
                                                        </option>
                                                    );
                                                })}
                                            </select>
                                            <select
                                                onChange={(e) =>
                                                    setWardID(e.target.value)
                                                }
                                            >
                                                <option value="">
                                                    ---Chọn Xã/Phường---
                                                </option>
                                                {wards?.map((item) => {
                                                    return (
                                                        <option
                                                            value={item.ward_id}
                                                            key={item.ward_id}
                                                        >
                                                            {item.ward_name}
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
                                            placeholder={ttShop?.linkFacebook}
                                            type="text"
                                            onChange={(e) =>
                                                setlinkFacebook(e.target.value)
                                            }
                                        />
                                    </div>
                                    <div className="containerTieuChiFormregis">
                                        <div className="tieuChiFormregis">
                                            Link Zalo
                                        </div>
                                        <input
                                            className="noiDungFormregis3"
                                            placeholder={ttShop?.linkZalo}
                                            type="text"
                                            onChange={(e) =>
                                                setlinkZalo(e.target.value)
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
                                                placeholder={ttShop?.idNhanVien}
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
                                                    Nhập ID Chủ Shop
                                                </div>
                                                <input
                                                    className="noiDungFormregis3"
                                                    placeholder={ttShop?.user}
                                                    type="text"
                                                    onChange={(e) =>
                                                        setUserShop(
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                            </div>
                                            <div className="containerTieuChiFormregis">
                                                <label className="tieuChiFormregis">
                                                    Nhóm Shop
                                                </label>

                                                <select
                                                    className="noiDungFormregis"
                                                    onChange={(e) =>
                                                        setvaiTro(
                                                            e.target.value
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
                                            className="luuThongTin"
                                            onClick={handleLuuThongTinShop}
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
                                        <div className="close">
                                            <button
                                                onClick={() =>
                                                    setsuaThongTinShop(0)
                                                }
                                            >
                                                Close
                                            </button>
                                        </div>
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
                                            <div>
                                                <div>
                                                    <label className="tieuDeThemSanPham">
                                                        Tên Sản Phẩm
                                                    </label>
                                                    <div>
                                                        <input
                                                            onChange={(e) =>
                                                                setTenSanPham(
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                            className="inputTenSanPham"
                                                            placeholder="Tên Sản Phẩm"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="giaBan">
                                                <div className="giabanCu">
                                                    <label className="tenmuc">
                                                        Giá Niêm Yết
                                                    </label>

                                                    <div>
                                                        <input
                                                            onChange={(e) =>
                                                                setgiaNiemYet(
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                            placeholder="Giá niêm yết (VNĐ)"
                                                            type="Number"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="giaBanMoi">
                                                    <label className="tenmuc">
                                                        Giá Khuyến Mại
                                                    </label>
                                                    <div>
                                                        <input
                                                            onChange={(e) =>
                                                                setgiaKhuyenMai(
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                            placeholder="Giá khuyến mại (VNĐ)"
                                                            type="Number"
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="giaBan">
                                                <div className="giabanCu">
                                                    <div>
                                                        <label className="tenmuc">
                                                            Nhóm Sản Phẩm
                                                        </label>
                                                    </div>

                                                    <select
                                                        onChange={(e) =>
                                                            setnhomSanPham(
                                                                e.target.value
                                                            )
                                                        }
                                                    >
                                                        <option value="">
                                                            ---Mời Chọn---
                                                        </option>
                                                        <option>
                                                            Thời Trang & Phụ
                                                            Kiện Nam
                                                        </option>
                                                        <option>
                                                            Thời Trang & Phụ
                                                            Kiện Nữ
                                                        </option>
                                                        <option>
                                                            Thời Trang & Phụ
                                                            Kiện Trẻ Em
                                                        </option>
                                                        <option>
                                                            Đồng Hồ Nam
                                                        </option>
                                                        <option>
                                                            Đồng Hồ Nữ
                                                        </option>
                                                        <option>
                                                            Điện Thoại & Phụ
                                                            Kiện
                                                        </option>
                                                        <option>
                                                            Máy Tính & Laptop
                                                        </option>
                                                        <option>
                                                            Máy Ảnh & Máy Quay
                                                            Phim
                                                        </option>
                                                        <option>
                                                            Thiết Bị Gia Dụng
                                                        </option>
                                                        <option>
                                                            Ô Tô & Xe Máy & Xe
                                                            Đạp
                                                        </option>
                                                        <option>
                                                            Sức Khỏe & Làm Đẹp
                                                        </option>
                                                        <option>
                                                            Thiết Bị Y Tế
                                                        </option>
                                                        <option>
                                                            Thể Thao & Du Lịch &
                                                            Sự Kiện
                                                        </option>
                                                        <option>
                                                            Nhà Sách Online
                                                        </option>
                                                        <option>
                                                            Hoa Quả & Thực Phẩm
                                                        </option>
                                                        <option>
                                                            Bách Hóa Online
                                                        </option>
                                                        <option>
                                                            Dịch Vụ KHác
                                                        </option>
                                                    </select>
                                                </div>
                                                <div className="giaBanMoi">
                                                    <div>
                                                        <label className="tenmuc">
                                                            Sản Phẩm Dẫn
                                                        </label>
                                                    </div>
                                                    {allSanPhamDan &&
                                                    allSanPhamDan.length < 2 ? (
                                                        <select
                                                            onChange={(e) =>
                                                                setsanPhamDan(
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                        >
                                                            <option value="">
                                                                ---Mời Chọn---
                                                            </option>
                                                            <option>
                                                                Sản Phẩm Dẫn
                                                            </option>
                                                            <option>
                                                                Sản Phẩm Khác
                                                            </option>
                                                        </select>
                                                    ) : (
                                                        <div>
                                                            Tối Đa 2 Sản Phẩm
                                                            Dẫn
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            <div>
                                                <label className="tenmuc">
                                                    Thông Tin Sản Phẩm
                                                </label>
                                                <div>
                                                    <input
                                                        onChange={(e) =>
                                                            setthongTinSanPham(
                                                                e.target.value
                                                            )
                                                        }
                                                        className="inputthongTinSanPham"
                                                        placeholder="Thông Tin Chi Tiết Sản Phẩm"
                                                    />
                                                </div>
                                            </div>

                                            <div className="ctv">
                                                <div className="tieudeCTV tenmuc">
                                                    Hợp Tác Cộng Tác Viên
                                                </div>
                                                <div className="noidungCTV">
                                                    <div>
                                                        <div className="noidunginputCTV tenmuc">
                                                            Giá Nhập
                                                        </div>
                                                        <input
                                                            className="noidunginputCTV"
                                                            onChange={(e) =>
                                                                setgiaNhap(
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                        />
                                                    </div>
                                                    <div>
                                                        <div className="noidunginputCTV tenmuc">
                                                            Hoa Hồng
                                                        </div>
                                                        <input
                                                            className="noidunginputCTV"
                                                            onChange={(e) =>
                                                                sethoahongCTV(
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                        />
                                                    </div>
                                                    <div>
                                                        <div className="noidunginputCTV tenmuc">
                                                            Lợi Nhuận Dự Kiến
                                                        </div>
                                                        <div className="noidunginputCTV loinhuan">
                                                            {giaKhuyenMai -
                                                                giaNhap -
                                                                hoahongCTV}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <button
                                                className="luuSanPahm"
                                                onClick={handleThemSanPham}
                                            >
                                                Lưu Sản Phẩm
                                            </button>
                                        </div>
                                    </div>
                                    <div className="luuY">
                                        Lưu ý: <br /> - Sản Phẩm dẫn là sản phẩm
                                        xuất hiện trên cùng Website. <br />- Mỗi
                                        Shop chỉ chọn ra 2 sản phẩm dẫn đáng chú
                                        ý nhất, không giảm giá tràn lan, tránh
                                        ảnh hưởng lợi nhuận và thị trường chung.{" "}
                                        <br />
                                        - Sản phẩm dẫn là sản phẩm có nhu cầu sử
                                        dụng cao, giá bán tốt hơn so với thị
                                        trường.
                                        <br />- Hoa hồng cộng tác viên là không
                                        bắt buộc. <br />- Tuy nhiên, khi tham
                                        gia bán hàng online cùng Fabysa có nghĩa
                                        bạn cũng đã tham gia cộng đồng người bán
                                        Fabysa. <br />- Sản phẩm của bạn sẽ được
                                        niêm yết trong tổng kho sỉ của Fabysa,
                                        từ đó ngoài khách lẻ bạn sẽ có thêm
                                        lượng khách sỉ, là những chủ shop online
                                        giống như bạn, bạn cũng có thể làm Cộng
                                        Tác Viên bán sản phẩm từ những Shop
                                        khác. <br />
                                        - Chi tiết liên hệ Admin để được giải
                                        đáp rõ hơn! <br />
                                        Cảm ơn bạn đã tham gia bán hàng cùng
                                        Fabysa!
                                    </div>
                                </div>
                            ) : (
                                <div></div>
                            )}
                            {/* sua sp */}
                            {+suaThongTinShop === 3 ? (
                                <div className="them">
                                    <div className="container-themSanPham">
                                        <div className="close">
                                            <button
                                                onClick={() =>
                                                    setsuaThongTinShop(0)
                                                }
                                            >
                                                Close
                                            </button>
                                        </div>
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
                                            <div>
                                                <div>
                                                    <label className="tieuDeThemSanPham">
                                                        Tên Sản Phẩm
                                                    </label>
                                                    <div>
                                                        <input
                                                            onChange={(e) =>
                                                                setTenSanPham2(
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                            className="inputTenSanPham"
                                                            placeholder={
                                                                detailidSpSua?.TenSanPham
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="giaBan">
                                                <div className="giabanCu">
                                                    <label className="tenmuc">
                                                        Giá Niêm Yết
                                                    </label>
                                                    <div>
                                                        <input
                                                            onChange={(e) =>
                                                                setgiaNiemYet2(
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                            placeholder={
                                                                detailidSpSua?.giaNiemYet
                                                            }
                                                            type="Number"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="giaBanMoi">
                                                    <label className="tenmuc">
                                                        Giá Khuyến Mại
                                                    </label>
                                                    <div>
                                                        <input
                                                            onChange={(e) =>
                                                                setgiaKhuyenMai2(
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                            placeholder={
                                                                detailidSpSua?.giaKhuyenMai
                                                            }
                                                            type="Number"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="giaBan">
                                                <div className="giabanCu">
                                                    <div>
                                                        <label className="tenmuc">
                                                            Nhóm Sản Phẩm
                                                        </label>
                                                    </div>

                                                    <select
                                                        className="nhomSanPham"
                                                        onChange={(e) =>
                                                            setnhomSanPham2(
                                                                e.target.value
                                                            )
                                                        }
                                                    >
                                                        <option>
                                                            {nhomSanPham2}
                                                        </option>
                                                        <option>
                                                            Thời Trang & Phụ
                                                            Kiện Nam
                                                        </option>
                                                        <option>
                                                            Thời Trang & Phụ
                                                            Kiện Nữ
                                                        </option>
                                                        <option>
                                                            Thời Trang & Phụ
                                                            Kiện Trẻ Em
                                                        </option>
                                                        <option>
                                                            Đồng Hồ Nam
                                                        </option>
                                                        <option>
                                                            Đồng Hồ Nữ
                                                        </option>
                                                        <option>
                                                            Điện Thoại & Phụ
                                                            Kiện
                                                        </option>
                                                        <option>
                                                            Máy Tính & Laptop
                                                        </option>
                                                        <option>
                                                            Máy Ảnh & Máy Quay
                                                            Phim
                                                        </option>
                                                        <option>
                                                            Thiết Bị Gia Dụng
                                                        </option>
                                                        <option>
                                                            Ô Tô & Xe Máy & Xe
                                                            Đạp
                                                        </option>
                                                        <option>
                                                            Sức Khỏe & Làm Đẹp
                                                        </option>
                                                        <option>
                                                            Thiết Bị Y Tế
                                                        </option>
                                                        <option>
                                                            Thể Thao & Du Lịch &
                                                            Sự Kiện
                                                        </option>
                                                        <option>
                                                            Nhà Sách Online
                                                        </option>
                                                        <option>
                                                            Hoa Quả & Thực Phẩm
                                                        </option>
                                                        <option>
                                                            Bách Hóa Online
                                                        </option>
                                                        <option>
                                                            Dịch Vụ KHác
                                                        </option>
                                                    </select>
                                                </div>
                                                <div className="giaBanMoi">
                                                    <div>
                                                        <label className="  tenmuc">
                                                            Sản Phẩm Dẫn
                                                        </label>
                                                    </div>
                                                    {(allSanPhamDan?.length ===
                                                        2 &&
                                                        detailidSpSua?.sanPhamDan ===
                                                            "Sản Phẩm Dẫn") ||
                                                    (allSanPhamDan?.length >
                                                        2 &&
                                                        detailidSpSua?.sanPhamDan ===
                                                            "Sản Phẩm Dẫn") ||
                                                    allSanPhamDan?.length <
                                                        2 ? (
                                                        <select
                                                            className="spChuLuc"
                                                            onChange={(e) =>
                                                                setsanPhamDan2(
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                        >
                                                            <option>
                                                                {sanPhamDan2}
                                                            </option>
                                                            <option>
                                                                Sản Phẩm Dẫn
                                                            </option>
                                                            <option>
                                                                Sản Phẩm Khác
                                                            </option>
                                                        </select>
                                                    ) : (
                                                        <div className="toida2spdan">
                                                            Tối Đa 2 Sản Phẩm
                                                            Dẫn
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                            <div>
                                                <label className="tenmuc">
                                                    Thông Tin Sản Phẩm
                                                </label>
                                                <div>
                                                    <input
                                                        className="inputthongTinSanPham"
                                                        onChange={(e) =>
                                                            setthongTinSanPham2(
                                                                e.target.value
                                                            )
                                                        }
                                                        placeholder={
                                                            detailidSpSua?.thongTinSanPham
                                                        }
                                                    />
                                                </div>
                                            </div>
                                            {detailidSpSua?.affiliate.length ===
                                                0 &&
                                                detailidSpSua?.idtk ===
                                                    user?._id && (
                                                    <div className="ctv">
                                                        <div className="tieudeCTV tenmuc">
                                                            Hợp Tác Cộng Tác
                                                            Viên
                                                        </div>
                                                        <div className="noidungCTV">
                                                            <div>
                                                                <div className="noidunginputCTV tenmuc">
                                                                    Giá Nhập
                                                                </div>
                                                                <input
                                                                    className="noidunginputCTV"
                                                                    placeholder={
                                                                        giaNhap2
                                                                    }
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
                                                            <div>
                                                                <div className="noidunginputCTV tenmuc">
                                                                    Hoa Hồng
                                                                </div>
                                                                <input
                                                                    className="noidunginputCTV"
                                                                    placeholder={
                                                                        hoahongCTV2
                                                                    }
                                                                    onChange={(
                                                                        e
                                                                    ) =>
                                                                        sethoahongCTV2(
                                                                            e
                                                                                .target
                                                                                .value
                                                                        )
                                                                    }
                                                                />
                                                            </div>
                                                            <div>
                                                                <div className="noidunginputCTV tenmuc">
                                                                    Lợi Nhuận Dự
                                                                    Kiến
                                                                </div>
                                                                <div>
                                                                    <div className="noidunginputCTV loinhuan">
                                                                        {giaKhuyenMai2 -
                                                                            giaNhap2 -
                                                                            hoahongCTV2}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}

                                            <button
                                                className="luuSanPahm"
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
            )}
        </>
    );
};
export default UpdateShop;
