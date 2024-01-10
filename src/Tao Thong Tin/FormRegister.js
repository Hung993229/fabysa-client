import "./FormRegister.scss";
import CommonUtils from "../component/CommonUtils";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerPost } from "../redux/apiRequest";
import { useEffect } from "react";
import {
    apiGetPublicProvinces,
    apiGetPublicDistrict,
    apiGetPublicWard,
} from "../redux/ApiProvince";
import Loading from "../GiaoDienChung/Loading";
const FormRegister = (props) => {
    const { suaPost, setsuaPost, idShop } = props;
    const user = useSelector((state) => state.auth.login?.currentUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setloading] = useState(1);
    const [previewAvatar, setpreviewAvatar] = useState();
    const [previewBanner, setpreviewBanner] = useState();
    // Provinces2
    const [provinces2, setProvinces2] = useState([]);
    const [provincesID2, setprovincesID2] = useState();

    const [districts2, setDistricts2] = useState([]);
    const [districtID2, setDistrictID2] = useState();

    const [wards2, setWards2] = useState([]);
    const [wardID2, setWardID2] = useState();

    // newPost
    const [banner, setBanner] = useState();
    const [avatar, setAvatar] = useState();
    const [hoTen, sethoTen] = useState();
    const [gioiTinh, setgioiTinh] = useState();
    const [soDienThoai, setsoDienThoai] = useState();
    // ngay sinh
    const [ngaySinh, setngaySinh] = useState();
    const [thangSinh, setthangSinh] = useState();
    const [namSinh, setnamSinh] = useState();
    const [thonXom, setthonXom] = useState();

    // ngay/thang/nam
    var presentDate = new Date();
    const year = presentDate.getFullYear();
    const arrYear = [];
    for (let i = 0; i <= 70; i++) {
        arrYear.push(year - i);
    }

    // thang
    const arrMonth = [];
    for (let i = 1; i <= 12; i++) {
        arrMonth.push(i);
    }

    // ngay
    const arrDate = [];
    for (let i = 1; i <= 31; i++) {
        arrDate.push(i);
    }

    // Hien Dang Sinh Song
    // Tinh2
    useEffect(() => {
        const fetchPublicProvince = async () => {
            const response = await apiGetPublicProvinces();
            if (response.status === 200) {
                setProvinces2(response?.data.results);
            }
        };
        fetchPublicProvince();
    }, []);
    // Huyen2
    useEffect(() => {
        const fetchPublicDictrict = async () => {
            const response = await apiGetPublicDistrict(provincesID2);
            if (response.status === 200) {
                setDistricts2(response?.data.results);
            }
        };
        provincesID2 && fetchPublicDictrict();

        !provincesID2 && setDistricts2([]);
    }, [provincesID2]);
    // Xa2
    useEffect(() => {
        const fetchPublicWard = async () => {
            const response = await apiGetPublicWard(districtID2);
            if (response.status === 200) {
                setWards2(response?.data.results);
            }
        };
        districtID2 && fetchPublicWard();

        !provincesID2 && setWards2([]);

        !districtID2 && setWards2([]);
    }, [districtID2]);
    // Hien Dang Sinh Song

    // avatar
    useEffect(() => {
        return () => {
            previewAvatar && URL.revokeObjectURL(previewAvatar.preview);
        };
    }, [previewAvatar]);

    const handleOnchangeImage = async (e) => {
        const file = e.target.files[0];
        let avatarBase64 = await CommonUtils.getBase64(file);

        file.preview = URL.createObjectURL(file);

        setAvatar(avatarBase64);
        setpreviewAvatar(file);
    };

    // avatar

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

    const handleRegisterPost = (e) => {
        e.preventDefault();

        // Hien Dang Song
        const tenTinh2 = provinces2?.find(
            (item) => item.province_id === provincesID2
        );
        const tenHuyen2 = districts2?.find(
            (item) => item.district_id === districtID2
        );
        const tenXa2 = wards2?.find((item) => item.ward_id === wardID2);
        try {
            const newPost = {
                banner: banner,
                avatar: avatar,
                hoTen: hoTen,
                soDienThoai: soDienThoai,
                gioiTinh: gioiTinh,
                // ngay sinh
                ngaySinh: ngaySinh,
                thangSinh: thangSinh,
                namSinh: namSinh,
                // Hien Dang Song
                tinh: tenTinh2?.province_name,
                huyen: tenHuyen2?.district_name,
                xa: tenXa2?.ward_name || "Xã ...",
                thonXom: thonXom,
                cash: 10000,
                vaiTro: 0,
                user: user._id,
            };
            console.log("newPost", newPost);
            registerPost(newPost, dispatch, setloading);
            navigate("/ca-nhan");
        } catch (err) {
            console.log(err);
        }
    };
    const handleRegisterPost2 = (e) => {
        e.preventDefault();

        // Hien Dang Song
        const tenTinh2 = provinces2?.find(
            (item) => item.province_id === provincesID2
        );
        const tenHuyen2 = districts2?.find(
            (item) => item.district_id === districtID2
        );
        const tenXa2 = wards2?.find((item) => item.ward_id === wardID2);
        try {
            const newPost = {
                banner: banner,
                avatar: avatar,
                hoTen: hoTen,
                soDienThoai: soDienThoai,
                gioiTinh: gioiTinh,
                // ngay sinh
                ngaySinh: ngaySinh,
                thangSinh: thangSinh,
                namSinh: namSinh,
                // Hien Dang Song
                tinh: tenTinh2?.province_name,
                huyen: tenHuyen2?.district_name,
                xa: tenXa2?.ward_name || "Xã ...",
                thonXom: thonXom,
                cash: 10000,
                vaiTro: 0,
                user: user._id,
            };
            console.log("newPost", newPost);
            registerPost(newPost, dispatch, setloading);
            navigate(`/shop/ca-nhan/${idShop}`);
        } catch (err) {
            console.log(err);
        }
    };

    return loading === 0 ? (
        <Loading />
    ) : (
        <div className="containerFormregis">
            <div>
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
            <div className="avatar">
                <div>
                    <label hidden>avatar</label>
                    <div className="container-avatar">
                        <input
                            id="avatar"
                            type="file"
                            hidden
                            onChange={handleOnchangeImage}
                            className="avatarFormregis"
                        />
                        <label htmlFor="avatar" className="avatarFormregis">
                            <div>
                                {previewAvatar && (
                                    <img
                                        src={previewAvatar.preview}
                                        className="avatar"
                                    />
                                )}
                            </div>
                        </label>
                    </div>
                </div>
            </div>

            <div className="containerTieuChiFormregis">
                <label className="tieuChiFormregis">Họ Và Tên</label>
                <div className="noiDungFormregis3">
                    <input
                        className="inputFormregis3"
                        type="text"
                        placeholder="Nhập Họ Và Tên"
                        onChange={(e) => sethoTen(e.target.value)}
                    />
                </div>
            </div>
            <div className="containerTieuChiFormregis">
                <label className="tieuChiFormregis">Số Điện Thoại</label>
                <div className="noiDungFormregis3">
                    <input
                        className="inputFormregis3"
                        type="text"
                        placeholder="Nhập Số Điện Thoại"
                        onChange={(e) => setsoDienThoai(e.target.value)}
                    />
                </div>
            </div>

            <div className="containerTieuChiFormregis">
                <label className="tieuChiFormregis" htmlFor="gioi-tinh">
                    Giới Tính
                </label>

                <select
                    className="noiDungFormregis"
                    name="gioi-tinh"
                    id="gioi-tinh"
                    onChange={(e) => setgioiTinh(e.target.value)}
                >
                    <option value="">---Mời Chọn---</option>
                    <option>Nam</option>
                    <option>Nữ</option>
                </select>
            </div>

            <div className="containerTieuChiFormregis">
                <div className="tieuChiFormregis">Ngày Sinh</div>

                <div className="myNoiDungFormregis2">
                    <label hidden>Ngày</label>
                    <select onChange={(e) => setngaySinh(e.target.value)}>
                        <option value="">---Chọn Ngày---</option>
                        {arrDate &&
                            arrDate.length > 0 &&
                            arrDate.map((item, index) => {
                                return <option key={index}>{item}</option>;
                            })}
                    </select>
                    <label hidden>Tháng</label>
                    <select onChange={(e) => setthangSinh(e.target.value)}>
                        <option value="">---Chọn Tháng---</option>
                        {arrMonth &&
                            arrMonth.length > 0 &&
                            arrMonth.map((item, index) => {
                                return <option key={index}>{item}</option>;
                            })}
                    </select>
                    <label hidden>Năm</label>
                    <select onChange={(e) => setnamSinh(e.target.value)}>
                        <option value="">---Chọn Năm---</option>
                        {arrYear &&
                            arrYear.length > 0 &&
                            arrYear.map((item, index) => {
                                return <option key={index}>{item}</option>;
                            })}
                    </select>
                </div>
            </div>

            <div className="containerTieuChiFormregis">
                <div className=" diaChi">Địa Chỉ</div>
                <div className="myNoiDungFormregis2">
                    <select
                        id="provinces"
                        onChange={(e) => setprovincesID2(e.target.value)}
                        // onChange={(e) => console.log("e", e)}
                    >
                        <option value="">---Chọn Tỉnh/TP---</option>
                        {provinces2?.map((item) => {
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
                    <select onChange={(e) => setDistrictID2(e.target.value)}>
                        <option value="">---Chọn Quận/Huyện---</option>
                        {districts2?.map((item) => {
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
                    <select onChange={(e) => setWardID2(e.target.value)}>
                        <option value="">---Chọn Xã/Phường---</option>
                        {wards2?.map((item) => {
                            return (
                                <option value={item.ward_id} key={item.ward_id}>
                                    {item.ward_name}
                                </option>
                            );
                        })}
                    </select>
                    <div>
                        <input
                            onChange={(e) => setthonXom(e.target.value)}
                            placeholder="Chi Tiết Thôn/Xóm/Số nhà/ ..."
                        />
                    </div>
                </div>
            </div>
            <div className="chucMung">
                Xin Chúc Mừng Bạn Được Tặng 10.000 Gold
            </div>
            {idShop && idShop.length !== 0 ? (
                <button
                    className="luuThongTin"
                    type="submit"
                    onClick={handleRegisterPost2}
                >
                    Lưu Thông Tin
                </button>
            ) : (
                <button
                    className="luuThongTin"
                    type="submit"
                    onClick={handleRegisterPost}
                >
                    Lưu Thông Tin
                </button>
            )}
        </div>
    );
};
export default FormRegister;
