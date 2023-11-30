import "./AddShop.scss";
import CommonUtils from "../component/CommonUtils";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerttShop } from "../redux/apiRequest";
import { useEffect } from "react";
import {
    apiGetPublicProvinces,
    apiGetPublicDistrict,
    apiGetPublicWard,
} from "../redux/ApiProvince";
const AddShop = () => {
    const user = useSelector((state) => state.auth.login.currentUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [previewAvatar, setpreviewAvatar] = useState();
    const [previewBanner, setpreviewBanner] = useState();
    const [Banner, setBanner] = useState();
    const [TenShop, setTenShop] = useState();
    const [DcShop, setDcShop] = useState();
    const [SdtShop, setSdtShop] = useState();
    const [SloganShop, setSloganShop] = useState(
        "Vui lòng khách đến, vừa lòng khách đi!"
    );
    const [UserShop, setUserShop] = useState();
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
        try {
            const newShop = {
                Banner: Banner,
                TenShop: TenShop,
                dcShop: DcShop,
                sdtShop: SdtShop,
                sloganShop: SloganShop,
                tinh: tenTinh?.province_name,
                huyen: tenHuyen?.district_name,
                xa: tenXa?.ward_name || "Xã ...",
                cash: 0,
                taikhoan: 0,
                vaiTro: 1,

                user: UserShop || user._id,
            };
            console.log("newShop", newShop);
            registerttShop(newShop, dispatch);
        } catch (err) {
            console.log(err);
        }
    };
    return (
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
                    <label htmlFor="banner" className="bannerFormregis2">
                        <dispatchEvent>
                            {previewBanner && (
                                <img
                                    src={previewBanner.preview}
                                    className="banner"
                                />
                            )}
                        </dispatchEvent>
                    </label>
                </div>
            </div>
            <div className="tenCuaHang">
                <input
                    className="tenCuaHangInput"
                    placeholder="Tên Shop"
                    type="text"
                    onChange={(e) => setTenShop(e.target.value)}
                />
            </div>
            <div className="diachi-sodienthoai">
                <div className="diaChi">
                    <div className="dc">Đ/C:</div>
                    <input
                        className="dcInput"
                        placeholder="Địa chỉ"
                        type="text"
                        onChange={(e) => setDcShop(e.target.value)}
                    />
                </div>
                <div className="soDienThoai">
                    <div className="sdt">SĐT:</div>
                    <input
                        className="sdtIpnut"
                        placeholder="Số điện thoại"
                        type="text"
                        onChange={(e) => setSdtShop(e.target.value)}
                    />
                </div>
            </div>
            <div className="slogan">
                <input
                    className="slgIpnut"
                    placeholder="Khẩu hiệu bán hàng"
                    type="text"
                    onChange={(e) => setSloganShop(e.target.value)}
                />
            </div>

            <div className="containerTieuChiFormregis">
                <div className="tieuChiFormregis">Chọn Địa Chỉ Shop</div>

                <div className="myNoiDungFormregis2">
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
                                <option value={item.ward_id} key={item.ward_id}>
                                    {item.ward_name}
                                </option>
                            );
                        })}
                    </select>
                </div>
            </div>
            <div className="slogan">
                <input
                    className="slgIpnut"
                    placeholder="idUser Quan Ly"
                    type="text"
                    onChange={(e) => setUserShop(e.target.value)}
                />
            </div>
            <button className="luuThongTinShop" onClick={handleLuuThongTinShop}>
                Lưu Thông Tin Shop
            </button>
        </div>
    );
};
export default AddShop;
