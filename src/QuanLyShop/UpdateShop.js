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
    deleteSanPham,
} from "../redux/apiRequest";
import { useEffect } from "react";
import {
    apiGetPublicProvinces,
    apiGetPublicDistrict,
    apiGetPublicWard,
} from "../redux/ApiProvince";
const UpdateShop = () => {
    const user = useSelector((state) => state.auth.login.currentUser);
    const ttShop = useSelector((state) => state.ttShop.ttShop.ttShop?.shop);
    const allSanPham = useSelector(
        (state) => state.sanPham.sanPham.allsanPham?.allSanpham
    );
    console.log("allSanPham", allSanPham);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [previewAvatar, setpreviewAvatar] = useState();
    const [previewBanner, setpreviewBanner] = useState();
    const [Banner, setBanner] = useState(ttShop?.Banner);
    const [TenShop, setTenShop] = useState(ttShop?.TenShop);
    const [DcShop, setDcShop] = useState(ttShop?.dcShop);
    const [SdtShop, setSdtShop] = useState(ttShop?.sdtShop);
    const [SloganShop, setSloganShop] = useState(ttShop?.sloganShop);
    const [UserShop, setUserShop] = useState(ttShop?.user);
    const [vaiTro, setvaiTro] = useState(ttShop?.vaiTro);
    const [suaThongTinShop, setsuaThongTinShop] = useState(0);
    const { userId } = useParams();
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
    const [sanPhamDan, setsanPhamDan] = useState();
    const [thongTinSanPham, setthongTinSanPham] = useState();
    const [giaNhap, setgiaNhap] = useState(0);
    const [hoahongCTV, sethoahongCTV] = useState(0);

    const allSanPhamDan = allSanPham.filter(
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
    console.log("detailidSpSua", detailidSpSua);
    const [previewSanPham2, setpreviewSanPham2] = useState(
        detailidSpSua?.AnhSanPham
    );
    const [AnhSanPham2, setAnhSanPham2] = useState(detailidSpSua?.AnhSanPham);
    const [TenSanPham2, setTenSanPham2] = useState(detailidSpSua?.TenSanPham);
    const [giaNiemYet2, setgiaNiemYet2] = useState(detailidSpSua?.giaNiemYet);
    const [giaKhuyenMai2, setgiaKhuyenMai2] = useState(
        detailidSpSua?.giaKhuyenMai
    );
    const [nhomSanPham2, setnhomSanPham2] = useState(
        detailidSpSua?.nhomSanPham
    );
    const [sanPhamDan2, setsanPhamDan2] = useState(detailidSpSua?.sanPhamDan);
    const [thongTinSanPham2, setthongTinSanPham2] = useState(
        detailidSpSua?.thongTinSanPham
    );
    const [giaNhap2, setgiaNhap2] = useState(detailidSpSua?.giaNhap);
    const [hoahongCTV2, sethoahongCTV2] = useState(detailidSpSua?.hoahongCTV);
    console.log("AnhSanPham2", AnhSanPham2);
    // sua sp

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
            giaNiemYet: giaNiemYet2,
            giaKhuyenMai: giaKhuyenMai2,
            nhomSanPham: nhomSanPham2,
            sanPhamDan: sanPhamDan2,
            thongTinSanPham: thongTinSanPham2,
            giaNhap: giaNhap2,
            hoahongCTV: hoahongCTV2,
            TenShop: TenShop,
            xa: ttShop?.xa,
            huyen: ttShop?.huyen,
            tinh: ttShop?.tinh,
            vaiTro: ttShop?.vaiTro,
            user: user._id,
        };
        console.log("id", id);
        console.log("newSanPham", newSanPham);
        updateSanPham(newSanPham, id, dispatch);
        // setsuaSp(0);
    };
    const handleXoaSanPham = (id) => {
        deleteSanPham(id, dispatch);
        // const huyenDs = myDetail?.huyenDs;
        // const huyenQq = myDetail?.huyenQq;
        // getShop(dispatch, huyenDs, huyenQq);
    };
    const handleThemSanPham = () => {
        if (
            !AnhSanPham ||
            !TenSanPham ||
            !giaNiemYet ||
            !giaKhuyenMai ||
            !nhomSanPham ||
            !sanPhamDan ||
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
                TenShop: TenShop,
                xa: ttShop?.xa,
                huyen: ttShop?.huyen,
                tinh: ttShop?.tinh,
                vaiTro: ttShop?.vaiTro,
                user: user._id,
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
        }
    };
    const handleOnchangeImageSanPham = async (e) => {
        const fileSanPham = e.target.files[0];
        let SanPhamBase64 = await CommonUtils.getBase64(fileSanPham);

        fileSanPham.preview = URL.createObjectURL(fileSanPham);

        setAnhSanPham(SanPhamBase64);
        setpreviewSanPham(fileSanPham);
    };
    useEffect(() => {
        const huyen = "";
        const user = userId;
        getSanPham(huyen, user, dispatch);
    }, [suaThongTinShop]);
    // san pham
    // shop
    useEffect(() => {
        getttShop(userId, dispatch);
    }, [suaThongTinShop]);

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
                tinh: tenTinh?.province_name,
                huyen: tenHuyen?.district_name,
                xa: tenXa?.ward_name || "Xã ...",
                vaiTro: vaiTro,
                user: UserShop || user._id,
            };
            console.log("newShop", newShop);
            updatettShop(newShop, id, dispatch);
            setsuaThongTinShop(0);
        } catch (err) {
            console.log(err);
        }
    };
    const VND = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
    });

    return (
        <>
            {/* {user && user?._id === userId && ( */}
            <div>
                {/* ban dau */}
                <div className="tenCuaHang">{ttShop?.TenShop}</div>
                <div className="updateShopTo">
                    {+suaThongTinShop === 0 ? (
                        <div className="shopUpdate">
                            <div>
                                <img
                                    src={ttShop?.Banner}
                                    className="banner-container"
                                />
                            </div>

                            <div className="diachi-sodienthoai">
                                <div className="dc">Đ/C:{ttShop?.dcShop}</div>
                                <div className="sdt">
                                    SĐT: {ttShop?.sdtShop}
                                </div>
                            </div>

                            <div className="themSanPham-suaThongTinShop">
                                <button
                                    className="themSanPham"
                                    onClick={() => setsuaThongTinShop(2)}
                                >
                                    Thêm Sản Phẩm
                                </button>
                                <button
                                    className="suaThongTinShop"
                                    onClick={() => setsuaThongTinShop(1)}
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
                                                        Xoá Sản Phẩm
                                                    </button>
                                                </div>
                                                <div>
                                                    <img
                                                        src={item?.AnhSanPham}
                                                        className="anhSanPham"
                                                        alt="timtim"
                                                    />
                                                    <div className="tenSanPham">
                                                        {item?.TenSanPham}
                                                    </div>
                                                    <div className="giaBan">
                                                        <div className="giaBanMoi">
                                                            {VND.format(
                                                                item?.giaKhuyenMai
                                                            )}
                                                        </div>
                                                        <div className="giabanCu">
                                                            {VND.format(
                                                                item?.giaNiemYet
                                                            )}
                                                        </div>
                                                    </div>

                                                    <button className="muaHang">
                                                        MUA HÀNG
                                                    </button>

                                                    <div className="thongtinSanPham">
                                                        {item?.thongTinSanPham}
                                                    </div>
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
                                        onChange={handleOnchangeImageBanner}
                                        className="bannerFormregis2"
                                    />
                                    <label
                                        htmlFor="banner"
                                        className="bannerFormregis2"
                                    >
                                        <div>
                                            {previewBanner ? (
                                                <img
                                                    src={previewBanner.preview}
                                                    className="banner"
                                                />
                                            ) : (
                                                <img
                                                    src={Banner}
                                                    className="bannerFormregis2"
                                                />
                                            )}
                                        </div>
                                    </label>
                                </div>
                            </div>
                            <div className="tenCuaHang2">
                                <input
                                    className="tenCuaHangInput"
                                    placeholder={ttShop?.TenShop}
                                    type="text"
                                    onChange={(e) => setTenShop(e.target.value)}
                                />
                            </div>
                            <div className="diachi-sodienthoai">
                                <div className="diaChi">
                                    <div className="dc">Đ/C:</div>
                                    <input
                                        className="dcInput"
                                        placeholder={ttShop?.dcShop}
                                        type="text"
                                        onChange={(e) =>
                                            setDcShop(e.target.value)
                                        }
                                    />
                                </div>
                                <div className="soDienThoai">
                                    <div className="sdt">SĐT:</div>
                                    <input
                                        className="sdtIpnut"
                                        placeholder={ttShop.sdtShop}
                                        type="text"
                                        onChange={(e) =>
                                            setSdtShop(e.target.value)
                                        }
                                    />
                                </div>
                            </div>
                            <div className="slogan2">
                                <input
                                    className="slgIpnut"
                                    placeholder={ttShop?.sloganShop}
                                    type="text"
                                    onChange={(e) =>
                                        setSloganShop(e.target.value)
                                    }
                                />
                            </div>
                            <div className="containerTieuChiFormregis">
                                <div className="tieuChiFormregis">
                                    Chọn Địa Chỉ Shop
                                </div>

                                <div className="myNoiDungFormregis2">
                                    <label hidden>Tỉnh</label>
                                    <select
                                        id="provinces"
                                        onChange={(e) =>
                                            setprovincesID(e.target.value)
                                        }
                                        // onChange={(e) => console.log("e", e)}
                                    >
                                        <option value="">
                                            ---Chọn Tỉnh/TP---
                                        </option>
                                        {provinces?.map((item) => {
                                            return (
                                                <option
                                                    key={item.province_id}
                                                    value={item.province_id}
                                                >
                                                    {item.province_name}
                                                </option>
                                            );
                                        })}
                                    </select>
                                    <select
                                        onChange={(e) =>
                                            setDistrictID(e.target.value)
                                        }
                                    >
                                        <option value="">
                                            ---Chọn Quận/Huyện---
                                        </option>
                                        {districts?.map((item) => {
                                            return (
                                                <option
                                                    value={item.district_id}
                                                    key={item.district_id}
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
                            {user?.admin === true && (
                                <div className="slogan">
                                    <input
                                        className="slgIpnut"
                                        placeholder={ttShop?.user}
                                        type="text"
                                        onChange={(e) =>
                                            setUserShop(e.target.value)
                                        }
                                    />
                                    <div className="sanPhamChuLuc-container">
                                        <div>
                                            <label className="tieuDeSanPhamChuLuc">
                                                Nhóm Shop
                                            </label>
                                        </div>

                                        <select
                                            className="spChuLuc"
                                            onChange={(e) =>
                                                setvaiTro(e.target.value)
                                            }
                                        >
                                            <option value="">
                                                ---Mời Chọn---
                                            </option>
                                            <option value="1">
                                                Shop Thường
                                            </option>
                                            <option value="2">Shop VIP</option>
                                        </select>
                                    </div>
                                </div>
                            )}

                            <div>
                                <button
                                    className="luuThongTinShop"
                                    onClick={handleLuuThongTinShop}
                                >
                                    Lưu Thông Tin Shop
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div></div>
                    )}
                    {/* them sp */}
                    {+suaThongTinShop === 2 ? (
                        <div>
                            <div className="container-themSanPham">
                                <div className="close">
                                    <button
                                        onClick={() => setsuaThongTinShop(0)}
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
                                            <label>Tên Sản Phẩm</label>
                                            <div>
                                                <input
                                                    onChange={(e) =>
                                                        setTenSanPham(
                                                            e.target.value
                                                        )
                                                    }
                                                    className="tenSanPham"
                                                    placeholder="Tên Sản Phẩm"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="giaBan">
                                        <div className="giabanCu">
                                            <label>Giá Niêm Yết</label>

                                            <div>
                                                <input
                                                    onChange={(e) =>
                                                        setgiaNiemYet(
                                                            e.target.value
                                                        )
                                                    }
                                                    placeholder="Giá niêm yết (VNĐ)"
                                                    type="Number"
                                                />
                                            </div>
                                        </div>
                                        <div className="giaBanMoi">
                                            <label>Giá Khuyến Mại</label>
                                            <div>
                                                <input
                                                    onChange={(e) =>
                                                        setgiaKhuyenMai(
                                                            e.target.value
                                                        )
                                                    }
                                                    placeholder="Giá khuyến mại (VNĐ)"
                                                    type="Number"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="nhomSanPham-sanPhamChuLuc">
                                        <div className="nhomSanPham-container">
                                            <div>
                                                <label className="tieuDeNhomSanPham">
                                                    Nhóm Sản Phẩm
                                                </label>
                                            </div>

                                            <select
                                                className="nhomSanPham"
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
                                                    Thời Trang & Phụ Kiện Nam
                                                </option>
                                                <option>
                                                    Thời Trang & Phụ Kiện Nữ
                                                </option>
                                                <option>
                                                    Thời Trang & Phụ Kiện Trẻ Em
                                                </option>
                                                <option>Đồng Hồ Nam</option>
                                                <option>Đồng Hồ Nữ</option>
                                                <option>
                                                    Điện Thoại & Phụ Kiện
                                                </option>
                                                <option>
                                                    Máy Tính & Laptop
                                                </option>
                                                <option>
                                                    Máy Ảnh & Máy Quay Phim
                                                </option>
                                                <option>
                                                    Thiết Bị Gia Dụng
                                                </option>
                                                <option>
                                                    Ô Tô & Xe Máy & Xe Đạp
                                                </option>
                                                <option>
                                                    Sức Khỏe & Làm Đẹp
                                                </option>
                                                <option>Thiết Bị Y Tế</option>
                                                <option>
                                                    Thể Thao & Du Lịch & Sự Kiện
                                                </option>
                                                <option>Nhà Sách Online</option>
                                                <option>
                                                    Hoa Quả & Thực Phẩm
                                                </option>
                                                <option>Bách Hóa Online</option>
                                                <option>Dịch Vụ KHác</option>
                                            </select>
                                        </div>
                                        <div className="sanPhamChuLuc-container">
                                            <div>
                                                <label className="tieuDeSanPhamChuLuc">
                                                    Sản Phẩm Dẫn
                                                </label>
                                            </div>
                                            {allSanPhamDan &&
                                            allSanPhamDan.length < 2 ? (
                                                <select
                                                    className="spChuLuc"
                                                    onChange={(e) =>
                                                        setsanPhamDan(
                                                            e.target.value
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
                                                <div>Tối Đa 2 Sản Phẩm Dẫn</div>
                                            )}
                                        </div>
                                    </div>

                                    <div>
                                        <label>Thông Tin Sản Phẩm</label>
                                        <div>
                                            <input
                                                onChange={(e) =>
                                                    setthongTinSanPham(
                                                        e.target.value
                                                    )
                                                }
                                                className="thongTinSanPham"
                                                placeholder="Thông Tin Chi Tiết Sản Phẩm"
                                            />
                                        </div>
                                    </div>

                                    <div className="ctv">
                                        <div className="tieudeCTV">
                                            Hợp Tác Cộng Tác Viên
                                        </div>
                                        <div className="noidungCTV">
                                            <div>
                                                <div>Giá Nhập</div>
                                                <input
                                                    onChange={(e) =>
                                                        setgiaNhap(
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                            </div>
                                            <div>
                                                <div>Hoa Hồng</div>
                                                <input
                                                    onChange={(e) =>
                                                        sethoahongCTV(
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                            </div>
                                            <div>
                                                <div>Lợi Nhuận Dự Kiến</div>
                                                <div>
                                                    {giaKhuyenMai &&
                                                        giaNhap &&
                                                        hoahongCTV && (
                                                            <div>
                                                                {giaKhuyenMai -
                                                                    giaNhap -
                                                                    hoahongCTV}
                                                            </div>
                                                        )}
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
                                Lưu ý: <br /> - Sản Phẩm dẫn là sản phẩm xuất
                                hiện trên cùng Website. <br />- Mỗi Shop chỉ
                                chọn ra 2 sản phẩm dẫn đáng chú ý nhất, không
                                giảm giá tràn lan, tránh ảnh hưởng lợi nhuận và
                                thị trường chung. <br /> - Sản phẩm dẫn là sản
                                phẩm có nhu cầu sử dụng cao, giá bán tốt hơn so
                                với thị trường.
                            </div>
                        </div>
                    ) : (
                        <div></div>
                    )}
                    {/* sua sp */}
                    {+suaThongTinShop === 3 ? (
                        <div className="container-themSanPham">
                            <div className="close">
                                <button onClick={() => setsuaThongTinShop(0)}>
                                    Close
                                </button>
                            </div>
                            <div className="sanPham">
                                <div>
                                    <input
                                        id="anhsuasanpham"
                                        type="file"
                                        hidden
                                        onChange={handleOnchangeImagesuaSanPham}
                                    />
                                    <label htmlFor="anhsuasanpham">
                                        <div>
                                            {previewSanPham2 ? (
                                                <img
                                                    src={
                                                        previewSanPham2?.preview
                                                    }
                                                    className="anhsuasanpham"
                                                />
                                            ) : (
                                                <img
                                                    src={
                                                        detailidSpSua?.AnhSanPham
                                                    }
                                                    className="anhsuasanpham"
                                                />
                                            )}
                                        </div>
                                    </label>
                                </div>
                                <div>
                                    <div>
                                        <label>Tên Sản Phẩm</label>
                                        <div>
                                            <input
                                                onChange={(e) =>
                                                    setTenSanPham2(
                                                        e.target.value
                                                    )
                                                }
                                                className="tenSanPham"
                                                placeholder={
                                                    detailidSpSua?.TenSanPham
                                                }
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="giaBan">
                                    <div className="giabanCu">
                                        <label>Giá Niêm Yết</label>
                                        <div>
                                            <input
                                                onChange={(e) =>
                                                    setgiaNiemYet2(
                                                        e.target.value
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
                                        <label>Giá Khuyến Mại</label>
                                        <div>
                                            <input
                                                onChange={(e) =>
                                                    setgiaKhuyenMai2(
                                                        e.target.value
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
                                <div className="nhomSanPham-sanPhamChuLuc">
                                    <div className="nhomSanPham-container">
                                        <div>
                                            <label className="tieuDeNhomSanPham">
                                                Nhóm Sản Phẩm
                                            </label>
                                        </div>

                                        <select
                                            className="nhomSanPham"
                                            onChange={(e) =>
                                                setnhomSanPham2(e.target.value)
                                            }
                                        >
                                            <option value="">
                                                {detailidSpSua?.nhomSanPham}
                                            </option>
                                            <option>
                                                Thời Trang & Phụ Kiện Nam
                                            </option>
                                            <option>
                                                Thời Trang & Phụ Kiện Nữ
                                            </option>
                                            <option>
                                                Thời Trang & Phụ Kiện Trẻ Em
                                            </option>
                                            <option>Đồng Hồ Nam</option>
                                            <option>Đồng Hồ Nữ</option>
                                            <option>
                                                Điện Thoại & Phụ Kiện
                                            </option>
                                            <option>Máy Tính & Laptop</option>
                                            <option>
                                                Máy Ảnh & Máy Quay Phim
                                            </option>
                                            <option>Thiết Bị Gia Dụng</option>
                                            <option>
                                                Ô Tô & Xe Máy & Xe Đạp
                                            </option>
                                            <option>Sức Khỏe & Làm Đẹp</option>
                                            <option>Thiết Bị Y Tế</option>
                                            <option>
                                                Thể Thao & Du Lịch & Sự Kiện
                                            </option>
                                            <option>Nhà Sách Online</option>
                                            <option>Hoa Quả & Thực Phẩm</option>
                                            <option>Bách Hóa Online</option>
                                            <option>Dịch Vụ KHác</option>
                                        </select>
                                    </div>
                                    <div className="sanPhamChuLuc-container">
                                        <div>
                                            <label className="tieuDeSanPhamChuLuc">
                                                Sản Phẩm Dẫn
                                            </label>
                                        </div>
                                        {(allSanPhamDan?.length === 2 &&
                                            detailidSpSua?.sanPhamDan ===
                                                "Sản Phẩm Dẫn") ||
                                        (allSanPhamDan?.length > 2 &&
                                            detailidSpSua?.sanPhamDan ===
                                                "Sản Phẩm Dẫn") ||
                                        allSanPhamDan?.length < 2 ? (
                                            <select
                                                className="spChuLuc"
                                                onChange={(e) =>
                                                    setsanPhamDan2(
                                                        e.target.value
                                                    )
                                                }
                                            >
                                                <option value="">
                                                    {detailidSpSua?.sanPhamDan}
                                                </option>
                                                <option>Sản Phẩm Dẫn</option>
                                                <option>Sản Phẩm Khác</option>
                                            </select>
                                        ) : (
                                            <div>Tối Đa 2 Sản Phẩm Dẫn</div>
                                        )}
                                    </div>
                                </div>
                                <div>
                                    <label>Thông Tin Sản Phẩm</label>
                                    <div>
                                        <input
                                            onChange={(e) =>
                                                setthongTinSanPham2(
                                                    e.target.value
                                                )
                                            }
                                            className="thongTinSanPham"
                                            placeholder={
                                                detailidSpSua?.thongTinSanPham
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="ctv">
                                    <div className="tieudeCTV">
                                        Hợp Tác Cộng Tác Viên
                                    </div>
                                    <div className="noidungCTV">
                                        <div>
                                            <div>Giá Nhập</div>
                                            <input
                                                onChange={(e) =>
                                                    setgiaNhap2(e.target.value)
                                                }
                                            />
                                        </div>
                                        <div>
                                            <div>Hoa Hồng</div>
                                            <input
                                                onChange={(e) =>
                                                    sethoahongCTV2(
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </div>
                                        <div>
                                            <div>Lợi Nhuận Dự Kiến</div>
                                            <div>
                                                {giaKhuyenMai2 &&
                                                    giaNhap2 &&
                                                    hoahongCTV2 && (
                                                        <div>
                                                            {giaKhuyenMai2 -
                                                                giaNhap2 -
                                                                hoahongCTV2}
                                                        </div>
                                                    )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <button
                                    className="luuSanPham"
                                    onClick={() =>
                                        handleLuuSanPham(detailidSpSua?._id)
                                    }
                                >
                                    Lưu Sản Phẩm
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div></div>
                    )}
                </div>
                <div className="slogan">{ttShop?.sloganShop}</div>
            </div>
            {/* )} */}
        </>
    );
};
export default UpdateShop;
