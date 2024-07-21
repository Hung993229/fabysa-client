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
    const [Banner, setBanner] = useState();
    const [TenShop, setTenShop] = useState();
    const [thonXom, setthonXom] = useState();
    const [SdtShop, setSdtShop] = useState();
    const [UserShop, setUserShop] = useState(user?._id);
    // Provinces
    const [provinces, setProvinces] = useState([]);
    const [provincesID, setprovincesID] = useState();

    const [districts, setDistricts] = useState([]);
    const [districtID, setDistrictID] = useState();

    const [wards, setWards] = useState([]);
    const [wardID, setWardID] = useState();
    //  Que Quan
    // Tinh
    useEffect(() => {
        const fetchPublicProvince = async () => {
            const response = await apiGetPublicProvinces();
            if (response?.status === 200) {
                setProvinces(response?.data.results);
            }
        };
        fetchPublicProvince();
    }, []);
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
        const menuShop = [
            "Khuyến Mại Đặc Biệt",
            "Điện Thoại",
            "Máy Tính",
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
        if (!TenShop || !SdtShop) {
            alert("Vui lòng nhập đủ thông tin");
        } else {
            try {
                const newShop = {
                    TenShop: TenShop,
                    sdtShop: SdtShop,

                    tinh: tenTinh?.province_name,
                    huyen: tenHuyen?.district_name,
                    xa: tenXa?.ward_name || "... Trống ...",
                    thonXom: thonXom || "... Trống ...",

                    cash: 0,
                    capBac: 1,
                    ttShopThem: { Banner, menuShop },
                    user: UserShop || user._id,
                };
                console.log("newShop", newShop);
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
                    <div className="taoShopMoi">Mở Shop Mới</div>
                    <div className="tenShop-TS">
                        <div className="tenShop">Tên Shop</div>
                        <input
                            className="TS"
                            placeholder="Nhập Tên Shop"
                            type="text"
                            onChange={(e) => setTenShop(e.target.value)}
                        />
                    </div>

                    <div className="tenShop-TS">
                        <div className="tenShop">Số Điện Thoại</div>
                        <input
                            className="TS"
                            placeholder="Nhập Số Điện Thoại"
                            type="text"
                            onChange={(e) => setSdtShop(e.target.value)}
                        />
                    </div>

                    <div className="diaChi-container">
                        <div className="diaChi">Địa Chỉ</div>

                        <div className="tinh-huyen-xa">
                            <select
                                id="provinces"
                                onChange={(e) => setprovincesID(e.target.value)}
                            >
                                <option value="">--- Tỉnh/Thành Phố ---</option>
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
                                onChange={(e) => setDistrictID(e.target.value)}
                            >
                                <option value="">--- Quận/Huyện ---</option>
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
                                <option value="">--- Xã/Phường ---</option>
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
                        <input
                            className="soNha"
                            placeholder="Số nhà/Thôn/Xóm/..."
                            type="text"
                            onChange={(e) => setthonXom(e.target.value)}
                        />
                    </div>
                    <div className="huyBo-luuShop">
                        <a href="/ca-nhan">
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
