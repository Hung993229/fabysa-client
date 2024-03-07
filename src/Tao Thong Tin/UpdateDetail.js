import "./UpdateDetail.scss";
import CommonUtils from "../component/CommonUtils";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updatePost } from "../redux/apiRequest";
import { useEffect } from "react";
import {
    apiGetPublicProvinces,
    apiGetPublicDistrict,
    apiGetPublicWard,
} from "../redux/ApiProvince";

const UpdateDetail = (props) => {
    const { suaPost, setsuaPost } = props;
    const user = useSelector((state) => state.auth.login.currentUser);
    const myDetail = useSelector((state) => state.post.post.myDetail);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [previewAvatar, setpreviewAvatar] = useState("");
    const [previewBanner, setpreviewBanner] = useState("");
    // Provinces
    const [provinces, setProvinces] = useState([]);
    const [provincesID, setprovincesID] = useState("");

    const [districts, setDistricts] = useState([]);
    const [districtID, setDistrictID] = useState("");

    const [wards, setWards] = useState([]);
    const [wardID, setWardID] = useState("");
    // Provinces2
    const [provinces2, setProvinces2] = useState([]);
    const [provincesID2, setprovincesID2] = useState("");

    const [districts2, setDistricts2] = useState([]);
    const [districtID2, setDistrictID2] = useState("");

    const [wards2, setWards2] = useState([]);
    const [wardID2, setWardID2] = useState("");
    const [thonXom, setthonXom] = useState(myDetail?.thonXom);

    // newPost

    const [banner, setBanner] = useState(myDetail?.banner);
    const [avatar, setAvatar] = useState(myDetail?.avatar);
    const [hoTen, sethoTen] = useState(myDetail?.hoTen);
    const [soDienThoai, setsoDienThoai] = useState(myDetail?.soDienThoai);

    const [gioiTinh, setgioiTinh] = useState(myDetail?.gioiTinh);

    const [ngaySinh, setngaySinh] = useState(myDetail?.ngaySinh);
    const [thangSinh, setthangSinh] = useState(myDetail?.thangSinh);
    const [namSinh, setnamSinh] = useState(myDetail?.namSinh);

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
    // console.log("provincesID2", provincesID2);
    // console.log("provinces2", provinces2);
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
    // console.log("districtID2", districtID2);
    // console.log("districts2", districts2);
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

    // console.log("wardID2", wardID2);
    // console.log("wards2", wards2);
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

    const handleUpdatePost = (e) => {
        e.preventDefault();

        const id = myDetail?._id;
        const tenTinh = provinces?.find(
            (item) => item.province_id === provincesID
        );
        const tenHuyen = districts?.find(
            (item) => item.district_id === districtID
        );
        const tenXa = wards?.find((item) => item.ward_id === wardID);

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
                xa: tenXa2?.ward_name,
                thonXom: thonXom,
            };

            updatePost(newPost, id, dispatch, setsuaPost);
            setsuaPost(0);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="containerUpdate">
            <div className="bannerFormregis">
                <label hidden>Banner</label>
                <div>
                    <input
                        id="banner"
                        type="file"
                        hidden
                        onChange={handleOnchangeImageBanner}
                    />
                    <label htmlFor="banner">
                        <div>
                            {previewBanner ? (
                                <img
                                    src={previewBanner?.preview}
                                    className="bannerFormregis"
                                />
                            ) : (
                                <img
                                    src={myDetail?.banner}
                                    className="bannerFormregis"
                                />
                            )}
                        </div>
                    </label>
                </div>
            </div>

            <div>
                <label hidden>avatar</label>
                <div className="container-avatar">
                    <input
                        id="avatar"
                        type="file"
                        hidden
                        onChange={handleOnchangeImage}
                    />
                    <label htmlFor="avatar">
                        <div>
                            {previewAvatar ? (
                                <img
                                    src={previewAvatar?.preview}
                                    className="avatarFormregis"
                                />
                            ) : (
                                <img
                                    src={myDetail?.avatar}
                                    className="avatarFormregis"
                                />
                            )}
                        </div>
                    </label>
                </div>
            </div>

            <div className="containerTieuChiFormregis">
                <label className="tieuChiFormregis">Họ Và Tên</label>
                <div className="noiDungFormregis3">
                    <input
                        className="inputFormregis3"
                        type="text"
                        placeholder={hoTen}
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
                        placeholder={soDienThoai}
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
                    <option>{gioiTinh}</option>
                    <option>Nam</option>
                    <option>Nữ</option>
                </select>
            </div>

            <div className="containerTieuChiFormregis">
                <div className="tieuChiFormregis">Ngày Sinh</div>

                <div className="myNoiDungFormregis2">
                    <label hidden>Ngày</label>
                    <select onChange={(e) => setngaySinh(e.target.value)}>
                        <option>{ngaySinh}</option>
                        {arrDate &&
                            arrDate.length > 0 &&
                            arrDate.map((item, index) => {
                                return <option key={index}>{item}</option>;
                            })}
                    </select>
                    <label hidden>Tháng</label>
                    <select onChange={(e) => setthangSinh(e.target.value)}>
                        <option>{thangSinh}</option>
                        {arrMonth &&
                            arrMonth.length > 0 &&
                            arrMonth.map((item, index) => {
                                return <option key={index}>{item}</option>;
                            })}
                    </select>
                    <label hidden>Năm</label>
                    <select onChange={(e) => setnamSinh(e.target.value)}>
                        <option>{namSinh}</option>
                        {arrYear &&
                            arrYear.length > 0 &&
                            arrYear.map((item, index) => {
                                return <option key={index}>{item}</option>;
                            })}
                    </select>
                </div>
            </div>

            <div className="containerTieuChiFormregis">
                <div className="tieuChiFormregis">Địa Chỉ</div>
                <div className="myNoiDungFormregis2">
                    <select
                        id="provinces"
                        onChange={(e) => setprovincesID2(e.target.value)}
                        // onChange={(e) => console.log("e", e)}
                    >
                        <option value="">---{myDetail?.tinh}---</option>
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
                        <option value="">---{myDetail?.huyen}---</option>
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
                        <option value="">---{myDetail?.xa}---</option>
                        {wards2?.map((item) => {
                            return (
                                <option value={item.ward_id} key={item.ward_id}>
                                    {item.ward_name}
                                </option>
                            );
                        })}
                    </select>
                </div>
            </div>
            <div>
                
                <input className="thonXom"
                    type="text"
                    onChange={(e) => setthonXom(e.target.value)}
                    placeholder={myDetail?.thonXom}
                />
            </div>
            <button className="luuThongTin" onClick={handleUpdatePost}>
                Lưu Thông Tin
            </button>
        </div>
    );
};
export default UpdateDetail;
