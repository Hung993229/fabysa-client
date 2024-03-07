import "./Fabysa.scss";
import CommonUtils from "../component/CommonUtils";
import bannerShop from "../assets/images/bannerShop.jpg";
import facebookLogo from "../assets/images/Facebook_Logo.png";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getSanPhamDan, getPost, updatePost } from "../redux/apiRequest";
import {
    apiGetPublicProvinces,
    apiGetPublicDistrict,
    apiGetPublicWard,
} from "../redux/ApiProvince";
import { useEffect } from "react";
import GioiThieuFabysa from "./GioiThieuFabysa";
import ShopYeuThich from "./ShopYeuThich";

const Fabysa = () => {
    const user = useSelector((state) => state.auth.login?.currentUser);
    const myDetail = useSelector((state) => state.post.post?.myDetail);
    const allSanPham = useSelector(
        (state) => state.sanPham.sanPham.allsanPham?.allSanpham
    );
    console.log("allSanPham", allSanPham);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [detailSanPham, setdetailSanPham] = useState();
    const [moihoptac, setmoihoptac] = useState(0);
    const vaiTro = +myDetail?.vaiTro;
    const [quanLyShop, setquanLyShop] = useState();
    const [suaPost, setsuaPost] = useState(0);
    const [provinces, setProvinces] = useState([]);
    const [provincesID, setprovincesID] = useState();

    const [districts, setDistricts] = useState([]);
    const [districtID, setDistrictID] = useState();

    const [wards, setWards] = useState([]);
    const [wardID, setWardID] = useState();
    const [huyen, sethuyen] = useState(myDetail?.huyen);
    console.log("huyen", huyen);
    const handleQuanLyShop = () => {
        setquanLyShop(1);
    };
    useEffect(() => {
        if (user && user.length !== 0) {
            getPost(user?._id, dispatch);
        }
    }, []);
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
    useEffect(() => {
        getSanPhamDan(huyen, dispatch);
    }, [huyen]);
    const VND = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
    });
    const arrShop2 = allSanPham?.map((item) => {
        return item?.TenShop;
    });
    const arrShop3 = new Set(arrShop2);
    const arrShop = [...arrShop3];
    return (
        <div>
            {moihoptac === 0 && (
                <div>
                    {/* header shop */}
                    <div className="container-header-shop">
                        <div>
                            <img
                                src={bannerShop}
                                alt="timtim"
                                className="bannerShop"
                            />
                        </div>
                        <div className="wecomeShop">
                            Trung Tâm Thương Mại 24/7 - Fabysa
                        </div>
                        <div className="khuVuc-container">
                            <div className="khuVuc">Chọn Khu Vực</div>

                            <div className="tinh">
                                <label hidden>Tỉnh</label>
                                <select
                                    id="provinces"
                                    onChange={(e) => sethuyen(e.target.value)}
                                >
                                    <option value="">Toàn Quốc</option>
                                    {provinces?.map((item) => {
                                        return (
                                            <option
                                                key={item.province_id}
                                            >
                                                {item.province_name}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>
                        </div>

                        <div className="hoptac-sanpham">
                            <button
                                onClick={() => setmoihoptac(1)}
                                className="moihoptac"
                            >
                                Giới Thiệu Fabysa
                            </button>

                            <button
                                className="themSanPham"
                                onClick={() => setmoihoptac(2)}
                            >
                                Shop Yêu Thích
                            </button>
                        </div>
                    </div>
                    {/* sanPham */}
                    <div className="sanPham-shop">
                        {arrShop &&
                            arrShop?.map((item2, index) => {
                                return (
                                    <div key={index}>
                                        <div className="tenShop-like">
                                            <div className="tenShop">
                                                {item2}
                                            </div>

                                            {/* {allLikeShop.find(
                                        (item) => item.tenShop === item2
                                    )?.length !== 0 ? (
                                        <div className="daLike"> Đã Thích</div>
                                    ) : (
                                        <div className="like">Thích</div>
                                    )} */}
                                        </div>

                                        <div className="sanPham-container">
                                            {allSanPham &&
                                                allSanPham?.map(
                                                    (item, index) => {
                                                        return (
                                                            item?.TenShop ===
                                                                item2 && (
                                                                <div
                                                                    key={index}
                                                                    className="sanPham"
                                                                >
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
                                                                        <a
                                                                            href={`/shop/${item?.user}`}
                                                                        >
                                                                            <div className="xemThemSanPham">
                                                                                Truy
                                                                                Cập
                                                                                Shop
                                                                            </div>
                                                                        </a>

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
                            })}
                    </div>
                </div>
            )}
            {moihoptac === 1 && (
                <GioiThieuFabysa
                    moihoptac={moihoptac}
                    setmoihoptac={setmoihoptac}
                />
            )}
            {moihoptac === 2 && (
                <ShopYeuThich
                    moihoptac={moihoptac}
                    setmoihoptac={setmoihoptac}
                />
            )}
        </div>
    );
};
export default Fabysa;
