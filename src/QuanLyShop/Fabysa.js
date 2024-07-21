import "./Fabysa.scss";
import CommonUtils from "../component/CommonUtils";
import bannerShop from "../assets/images/bannerShop.jpg";
import facebookLogo from "../assets/images/Facebook_Logo.png";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
    getSanPhamDan,
    getPost,
    getSanPhamDanHuyen,
    getArrSanPham,
} from "../redux/apiRequest";
import {
    apiGetPublicProvinces,
    apiGetPublicDistrict,
    apiGetPublicWard,
} from "../redux/ApiProvince";
import { useEffect } from "react";
import GioiThieuFabysa from "./GioiThieuFabysa";
import ShopYeuThich from "./ShopYeuThich";
import Loading from "../GiaoDienChung/Loading";
const Fabysa = () => {
    const user = useSelector((state) => state.auth.login?.currentUser);
    const myDetail = useSelector((state) => state.post.post?.myDetail);
    const allSanPham = useSelector(
        (state) => state.sanPham.sanPham.sanPhamDan?.allSanpham
    );
    console.log("allSanPham", allSanPham);
    const allShop = useSelector(
        (state) => state.ttShop.ttShop.allttShop?.AllShop
    );
    const arraySanPham = useSelector(
        (state) => state.sanPham.sanPham.arrsanPham?.arrSanpham
    );
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setloading] = useState(1);
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
    const [skip, setskip] = useState(0);
    const [arrShop, setarrShop] = useState([]);

    const handleQuanLyShop = () => {
        setquanLyShop(1);
    };
    useEffect(() => {
        if (user && user.length !== 0) {
            getPost(user?._id, dispatch);
        }
    }, []);
    const { spa, spb } = useParams();
    useEffect(() => {
        const arrIdSanPham = [spa, spb];
        if (arrIdSanPham && arrIdSanPham?.length !== 0) {
            getArrSanPham(arrIdSanPham, dispatch);
        }
    }, [spa, spb]);
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
    // chon khu vuc
    const tenTinh = provinces?.find((item) => item.province_id === provincesID);
    const tenHuyen = districts?.find((item) => item.district_id === districtID);
    const tenXa = wards?.find((item) => item.ward_id === wardID);
    useEffect(() => {
        if (tenTinh && !tenHuyen && !tenXa) {
            sethuyen(tenTinh?.province_name);
        }
        if (tenTinh && tenHuyen && !tenXa) {
            sethuyen(tenHuyen?.district_name);
        }
        if (tenTinh && tenHuyen && tenXa) {
            sethuyen(tenXa?.ward_name);
        }
    }, [tenTinh, tenHuyen, tenXa]);
    // chon khu vuc
    // Que Quan
    console.log("huyen", huyen);
    console.log("skip", skip);
    useEffect(() => {
        const limit = 20;
        if (!huyen) {
            getSanPhamDan(skip, limit, dispatch);
        } else {
            getSanPhamDanHuyen(huyen, skip, limit, dispatch);
        }
    }, [huyen, skip]);
    useEffect(() => {
        if (allSanPham?.length < 10) {
            sethuyen(null);
        }
    }, [allSanPham]);
    const VND = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
    });
    useEffect(() => {
        if (arraySanPham) {
            const allSanPham2 = allSanPham?.filter(
                (item) => item._id !== spa && item._id !== spb
            );
            const arrShop2 = allSanPham2?.map((item) => {
                return item?.TenShop;
            });
            const arrShop3 = new Set(arrShop2);
            const arrShop4 = [...arrShop3];
            setarrShop(arrShop4);
        } else {
            const arrShop2 = allSanPham?.map((item) => {
                return item?.TenShop;
            });
            const arrShop3 = new Set(arrShop2);
            const arrShop4 = [...arrShop3];
            setarrShop(arrShop4);
        }
    }, [arraySanPham, allSanPham]);
    useEffect(() => {
        if (arrShop.length !== 0) {
            setloading(0);
        }
    }, [arrShop]);

    return (
        <div className="Appy">
            <div className="Appx">
                {loading === 0 ? (
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
                                        Trung Tâm Thương Mại Fabysa
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
                                {/* Chon Khu Vuc */}

                                <div className="khuVuc-container">
                                    <label hidden>Tỉnh</label>
                                    <select
                                        id="provinces"
                                        onChange={(e) =>
                                            setprovincesID(e.target.value)
                                        }
                                    >
                                        <option value="">
                                            {!myDetail
                                                ? "---Chọn Tỉnh/TP---"
                                                : myDetail?.tinh}
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
                                            {!myDetail
                                                ? "---Chọn Quận/Huyện---"
                                                : myDetail?.huyen}
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
                                            {!myDetail
                                                ? "---Chọn Xã/Phường---"
                                                : myDetail?.xa}
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
                                {/* Chon Khu Vuc */}
                                {/* sanPham */}
                                <div className="sanPham-shop">
                                    {/* arraySanPham */}
                                    {spa &&
                                        spb &&
                                        spa?.length !== 0 &&
                                        spb?.length !== 0 && (
                                            <div>
                                                {arraySanPham &&
                                                    arraySanPham.length !==
                                                        0 && (
                                                        <div className="tenShop-like">
                                                            <div className="tenShop">
                                                                {
                                                                    arraySanPham[0]
                                                                        .TenShop
                                                                }
                                                            </div>
                                                        </div>
                                                    )}

                                                <div className="sanPham-container">
                                                    {arraySanPham &&
                                                        arraySanPham?.map(
                                                            (item, index) => {
                                                                return (
                                                                    <div
                                                                        key={
                                                                            index
                                                                        }
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
                                                                                {item
                                                                                    ?.TenSanPham
                                                                                    ?.length >
                                                                                28 ? (
                                                                                    <div>
                                                                                        {item?.TenSanPham.slice(
                                                                                            0,
                                                                                            20
                                                                                        )}
                                                                                        ...
                                                                                    </div>
                                                                                ) : (
                                                                                    <div>
                                                                                        {
                                                                                            item?.TenSanPham
                                                                                        }
                                                                                    </div>
                                                                                )}
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
                                                                );
                                                            }
                                                        )}
                                                </div>
                                            </div>
                                        )}
                                    {/* arraySanPham */}
                                    {/* allSanPham */}
                                    {arrShop &&
                                        arrShop?.map((item2, index) => {
                                            return (
                                                <div key={index}>
                                                    <div className="tenShop-like">
                                                        <div className="tenShop">
                                                            {item2}
                                                        </div>
                                                    </div>

                                                    <div className="sanPham-container">
                                                        {allSanPham &&
                                                            allSanPham?.map(
                                                                (
                                                                    item,
                                                                    index
                                                                ) => {
                                                                    return (
                                                                        item?.TenShop ===
                                                                            item2 && (
                                                                            <div
                                                                                key={
                                                                                    index
                                                                                }
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
                                                                                        {item
                                                                                            ?.TenSanPham
                                                                                            ?.length >
                                                                                        28 ? (
                                                                                            <div>
                                                                                                {item?.TenSanPham.slice(
                                                                                                    0,
                                                                                                    20
                                                                                                )}
                                                                                                ...
                                                                                            </div>
                                                                                        ) : (
                                                                                            <div>
                                                                                                {
                                                                                                    item?.TenSanPham
                                                                                                }
                                                                                            </div>
                                                                                        )}
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
                                    {/* allSanPham */}
                                    {(skip > 20 || skip === 20) && (
                                        <button
                                            onClick={() => setskip(+skip - 20)}
                                            className="xemThem"
                                        >
                                            Quay Lại
                                        </button>
                                    )}
                                    {allSanPham?.length === 20 && (
                                        <button
                                            onClick={() => setskip(+skip + 20)}
                                            className="xemThem"
                                        >
                                            Tiếp Theo
                                        </button>
                                    )}
                                </div>
                                {/* sanPham */}
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
                ) : (
                    <Loading />
                )}
            </div>
            <div className="Appx2">
                Website Được Tối Ưu Sử Dụng Trên Mobile
            </div>
        </div>
    );
};
export default Fabysa;
