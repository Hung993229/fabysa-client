import "./AddShop.scss";
import CommonUtils from "../component/CommonUtils";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerttShop, updatePost, getPost } from "../redux/apiRequest";
import { useEffect } from "react";
import {
    apiGetPublicProvinces,
    apiGetPublicDistrict,
    apiGetPublicWard,
} from "../redux/ApiProvince";
import logo from "../assets/images/logo.jpg";
const AddShop = () => {
    const user = useSelector((state) => state.auth.login.currentUser);
    const myDetail = useSelector((state) => state.post.post?.myDetail);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [previewAvatar, setpreviewAvatar] = useState();
    const [previewBanner, setpreviewBanner] = useState();
    const [Banner, setBanner] = useState();
    const [TenShop, setTenShop] = useState();
    const [DcShop, setDcShop] = useState();
    const [SdtShop, setSdtShop] = useState();
    const [nguoiHoTro, setnguoiHoTro] = useState();
    const [UserShop, setUserShop] = useState(user?._id);
    console.log("UserShop", UserShop);
    // Provinces
    const [provinces, setProvinces] = useState([]);
    const [provincesID, setprovincesID] = useState();

    const [districts, setDistricts] = useState([]);
    const [districtID, setDistrictID] = useState();

    const [wards, setWards] = useState([]);
    const [wardID, setWardID] = useState();

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
    // Que Quan
    const handleLuuThongTinShop = () => {
        // Que Quan
        const tenTinh = provinces?.find(
            (item) => item.province_id === provincesID
        );
        const tenHuyen = districts?.find(
            (item) => item.district_id === districtID
        );
        const tenXa = wards?.find((item) => item.ward_id === wardID);
        const nhomSanPham = [
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
        ];
        if (!Banner || !TenShop || !DcShop || !SdtShop) {
            alert("Vui lòng nhập đủ thông tin");
        } else {
            try {
                const newShop = {
                    Banner: Banner,
                    TenShop: TenShop,
                    dcShop: DcShop,
                    sdtShop: SdtShop,
                    nguoiHoTro: nguoiHoTro,
                    tinh: tenTinh?.province_name,
                    huyen: tenHuyen?.district_name,
                    xa: tenXa?.ward_name || "Xã ...",
                    nhomSanPham: nhomSanPham,
                    cash: 0,
                    taikhoan: 0,
                    vaiTro: 1,

                    user: UserShop || user._id,
                };
                registerttShop(newShop, dispatch);
                navigate(`/ca-nhan`);
            } catch (err) {
                console.log(err);
            }
        }
    };
    return (
        <div className="addShop-container">
            {myDetail && myDetail.length !== 0 ? (
                <div className="addShop">
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
                                    {previewBanner && (
                                        <img
                                            src={previewBanner.preview}
                                            className="banner"
                                        />
                                    )}
                                </div>
                            </label>
                        </div>
                    </div>
                    <div className="containerTieuChiFormregis">
                        <div className="tieuChiFormregis">Tên Shop</div>
                        <input
                            className="noiDungFormregis3"
                            placeholder="Nhập Tên Shop"
                            type="text"
                            onChange={(e) => setTenShop(e.target.value)}
                        />
                    </div>

                    <div className="containerTieuChiFormregis">
                        <div className="tieuChiFormregis">Số Điện Thoại</div>
                        <input
                            className="noiDungFormregis3"
                            placeholder="Nhập Số Điện Thoại"
                            type="text"
                            onChange={(e) => setSdtShop(e.target.value)}
                        />
                    </div>

                    <div className="containerTieuChiFormregis">
                        <div className="tieuChiFormregis">Địa Chỉ</div>
                        <input
                            className="noiDungFormregis3"
                            placeholder="Địa Chỉ Shop"
                            type="text"
                            onChange={(e) => setDcShop(e.target.value)}
                        />
                    </div>
                    <div className="khuVuc-container">
                        <label hidden>Tỉnh</label>
                        <select
                            id="provinces"
                            onChange={(e) => setprovincesID(e.target.value)}
                            // onChange={(e) => console.log("e", e)}
                        >
                            <option value="">---Chọn Tỉnh/TP---</option>
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
                        <select onChange={(e) => setDistrictID(e.target.value)}>
                            <option value="">---Chọn Quận/Huyện---</option>
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
                        <select onChange={(e) => setWardID(e.target.value)}>
                            <option value="">---Chọn Xã/Phường---</option>
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
                    <div className="containerTieuChiFormregis">
                        <div className="tieuChiFormregis">Người Hướng Dẫn</div>
                        <input
                            className="noiDungFormregis3"
                            placeholder="Nhập Số Điện Thoại Người Hướng Dẫn (Nếu Có)"
                            type="text"
                            onChange={(e) => setnguoiHoTro(e.target.value)}
                        />
                    </div>
                    {user?.admin === true && (
                        <div className="containerTieuChiFormregis">
                            <div className="tieuChiFormregis">Quản Lý Shop</div>
                            <input
                                className="noiDungFormregis3"
                                placeholder="idUser Quan Ly"
                                type="text"
                                onChange={(e) => setUserShop(e.target.value)}
                            />
                        </div>
                    )}
                    <div className="huyBo-luuShop">
                        <a href="/fabysa">
                            <button className="huyBo">Huỷ Bỏ</button>
                        </a>
                        <button
                            className="luuShop"
                            onClick={handleLuuThongTinShop}
                        >
                            Lưu Shop
                        </button>
                    </div>
                </div>
            ) : (
                <div className="moiDangNhap">
                    <div className="logoDangNhap">
                        <img src={logo} alt="he" />
                    </div>
                    <div className="vuiLong">
                        Rât Vui Khi Được Đồng Hành Phát Triển Kinh Doanh Cùng
                        Bạn!
                        <br />
                        Vui Lòng Đăng Nhập Trước Khi Mở Shop!
                    </div>
                    <a href="/dang-nhap">
                        <button className="dangNhap">Đăng Nhập</button>
                    </a>
                </div>
            )}
        </div>
    );
};
export default AddShop;
