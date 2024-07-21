import "./UpdateShop.scss";
import CommonUtils from "../component/CommonUtils";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import themAnh from "../assets/images/themAnh.png";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../GiaoDienChung/Loading";
import logoInternet from "../assets/images/logoInternet.jpg";
import {
    getttShop,
    updatettShop,
    registerSanPham,
    getSanPham,
    getSanPhamDanHuyen2,
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
    const [loading, setloading] = useState(0);
    const dispatch = useDispatch();
    useEffect(() => {
        getPost(user?._id, dispatch);
    }, [user]);
    // shop
    useEffect(() => {
        getttShop(idShop, dispatch);
    }, [idShop]);

    const [TenShop, setTenShop] = useState();
    const [SdtShop, setSdtShop] = useState();
    const [capBac, setcapBac] = useState();
    const [cash, setcash] = useState();
    const [UserShop, setUserShop] = useState();

    // ThongTinThem
    const [previewBanner, setpreviewBanner] = useState();
    const [Banner, setBanner] = useState();
    const [giaoDien, setgiaoDien] = useState("a");
    const [tenVietTat, settenVietTat] = useState();
    const [nguoiHoTro, setnguoiHoTro] = useState();
    const [website, setwebsite] = useState();
    const [faceBook, setfaceBook] = useState();
    const [zalo, setzalo] = useState();
    const [slogan, setslogan] = useState();
    const [gioiThieu, setgioiThieu] = useState();

    // const [nganHang, setnganHang] = useState({});
    const [tenNganHang, settenNganHang] = useState("");
    const [taiKhoanNganHang, settaiKhoanNganHang] = useState("");
    const [chuTaiKhoanNganhang, setchuTaiKhoanNganhang] = useState("");

    const [nvBanHang, setnvBanHang] = useState([]);
    const [nvQuanLy, setnvQuanLy] = useState([]);
    const [menuShop, setmenuShop] = useState([]);
    const [khachSi, setkhachSi] = useState([]);
    const [khachCtv, setkhachCtv] = useState([]);
    const [soBan, setsoBan] = useState([]);

    const [soBan2, setsoBan2] = useState("");
    const [nvBanHang2, setnvBanHang2] = useState("");
    const [sdtnvBanHang2, setsdtnvBanHang2] = useState("");
    const [nvQuanLy2, setnvQuanLy2] = useState("");
    const [sdtnvQuanLy2, setsdtnvQuanLy2] = useState("");
    const [menuShop2, setmenuShop2] = useState("");
    useEffect(() => {
        if (ttShop) {
            setTenShop(ttShop?.TenShop);
            setSdtShop(ttShop?.sdtShop);
            // Tinh
            // huyen
            // xa
            setthonXom(ttShop?.thonXom);
            setcash(ttShop?.cash);
            setcapBac(ttShop?.capBac);
            setUserShop(ttShop?.user);
            // ttShopThem
            setBanner(ttShop?.ttShopThem?.Banner);
            setgiaoDien(ttShop?.ttShopThem?.giaoDien);
            settenVietTat(ttShop?.ttShopThem?.tenVietTat);
            setnguoiHoTro(ttShop?.ttShopThem?.nguoiHoTro);
            setwebsite(ttShop?.ttShopThem?.website);
            setfaceBook(ttShop?.ttShopThem?.faceBook);
            setzalo(ttShop?.ttShopThem?.zalo);
            setslogan(ttShop?.ttShopThem?.slogan);
            setgioiThieu(ttShop?.ttShopThem?.gioiThieu);

            settenNganHang(
                ttShop?.ttShopThem?.nganHang?.tenNganHang ||
                    "---Chọn Ngân Hàng---"
            );
            settaiKhoanNganHang(
                ttShop?.ttShopThem?.nganHang?.taiKhoanNganHang || "Số Tài Khoản"
            );
            setchuTaiKhoanNganhang(
                ttShop?.ttShopThem?.nganHang?.chuTaiKhoanNganhang ||
                    "Chủ Tài Khoản"
            );

            setnvBanHang(ttShop?.ttShopThem?.nvBanHang || []);
            setnvQuanLy(ttShop?.ttShopThem?.nvQuanLy || []);
            setmenuShop(ttShop?.ttShopThem?.menuShop || []);
            setkhachCtv(ttShop?.ttShopThem?.khachCtv || []);
            setkhachSi(ttShop?.ttShopThem?.khachSi || []);
            setsoBan(ttShop?.ttShopThem?.soBan || []);
        }
    }, [ttShop]);
    const danhSachNganHang = [
        { maSo: "970405", tenNganHang: "Agribank" },
        { maSo: "970422", tenNganHang: "MBBank" },
        { maSo: "970407", tenNganHang: "Teckcombank" },
        { maSo: "970415", tenNganHang: "Vietinbank" },
        { maSo: "970436", tenNganHang: "Vietcombank" },
    ];

    // Dia Chi Shop
    const [provinces, setProvinces] = useState([]);
    const [provincesID, setprovincesID] = useState();
    const [districts, setDistricts] = useState([]);
    const [districtID, setDistrictID] = useState();
    const [wards, setWards] = useState([]);
    const [wardID, setWardID] = useState();
    const [thonXom, setthonXom] = useState();
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
    // Dia Chi Shop
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

        // nganHang
        const xetTkNH = danhSachNganHang.find(
            (item) => item.tenNganHang === tenNganHang
        );
        const nganHang = {
            tenNganHang: tenNganHang,
            maSo: xetTkNH.maSo,
            taiKhoanNganHang: taiKhoanNganHang,
            chuTaiKhoanNganhang: chuTaiKhoanNganhang,
        };

        // nganHang
        const ttShopThem = {
            Banner,
            giaoDien,
            tenVietTat,
            nguoiHoTro,
            website,
            nganHang,
            nvBanHang,
            nvQuanLy,
            menuShop,
            khachSi,
            khachCtv,
            faceBook,
            zalo,
            slogan,
            gioiThieu,
            soBan,
        };

        try {
            const id = ttShop._id;
            const newShop = {
                TenShop: TenShop,
                sdtShop: SdtShop,

                tinh: tenTinh?.province_name || ttShop?.tinh,
                huyen: tenHuyen?.district_name || ttShop?.huyen,
                xa: tenXa?.ward_name || ttShop?.xa,
                thonXom: thonXom,

                cash: cash,
                capBac: capBac,
                ttShopThem: ttShopThem,
                user: UserShop,
            };
            console.log("newShop", newShop);
            updatettShop(newShop, id, dispatch, setloading);
            setloading(1);
            const newPost = {
                vaiTro: capBac,
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
    const handleThemNVBanHang = () => {
        setnvBanHang([
            ...nvBanHang,
            { nvBanHang: nvBanHang2, sdtnvBanHang: sdtnvBanHang2 },
        ]);
        document.getElementById("input1").value = "";
        document.getElementById("input11").value = "";
        setnvBanHang2("");
        setsdtnvBanHang2("");
    };
    const handleThemNVQuanLy = () => {
        setnvQuanLy([
            ...nvQuanLy,
            { nvQuanLy: nvQuanLy2, sdtnvQuanLy: sdtnvQuanLy2 },
        ]);
        document.getElementById("input2").value = "";
        document.getElementById("input21").value = "";
        setnvQuanLy2("");
        setsdtnvQuanLy2("");
    };
    const handleThemSoBan = () => {
        setsoBan([...soBan, soBan2]);
        document.getElementById("input3").value = "";
        setsoBan2("");
    };
    const handleXoaNVBanHang = (item) => {
        setnvBanHang(nvBanHang.filter((item2) => item2 !== item));
    };
    const handleXoaNVQuanLy = (item) => {
        setnvQuanLy(nvQuanLy.filter((item2) => item2 !== item));
    };
    const handleXoaSoBan = (item) => {
        setsoBan(soBan.filter((item2) => item2 !== item));
    };

    return (
        <div className="pc-updateShop">
            {loading === 0 && (
                <div className="updateShop-container">
                    {(user?._id === ttShop?.user ||
                        user?.admin === true ||
                        nvQuanLy?.find(
                            (item) => item?.sdtnvQuanLy === user?.username
                        )) && (
                        <>
                            <div className="banner-container">
                                <input
                                    id="banner"
                                    type="file"
                                    hidden
                                    onChange={handleOnchangeImageBanner}
                                    className="bannerShop"
                                />
                                <label htmlFor="banner" className="bannerShop">
                                    {!Banner ? (
                                        <>
                                            {previewBanner ? (
                                                <img
                                                    src={previewBanner.preview}
                                                    className="bannerShop"
                                                />
                                            ) : (
                                                <img
                                                    src={themAnh}
                                                    className="bannerShop"
                                                />
                                            )}
                                        </>
                                    ) : (
                                        <img
                                            src={Banner}
                                            className="bannerShop"
                                        />
                                    )}
                                </label>
                            </div>
                            <div className="tenShop-TS">
                                <div className="tenShop">Tên Shop</div>
                                <input
                                    className="TS"
                                    placeholder={TenShop}
                                    type="text"
                                    onChange={(e) => setTenShop(e.target.value)}
                                />
                            </div>
                            <div className="tenShop-TS">
                                <div className="tenShop">Số Điện Thoại</div>
                                <input
                                    className="TS"
                                    placeholder={SdtShop}
                                    type="text"
                                    onChange={(e) => setSdtShop(e.target.value)}
                                />
                            </div>
                            <div className="diaChi-container">
                                <div className="diaChi">Địa Chỉ</div>

                                <div className="tinh-huyen-xa">
                                    <select
                                        id="provinces"
                                        onChange={(e) =>
                                            setprovincesID(e.target.value)
                                        }
                                    >
                                        <option value="">{ttShop?.tinh}</option>
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
                                            {ttShop?.huyen}
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
                                        <option value="">{ttShop?.xa}</option>
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
                                    placeholder={ttShop?.thonXom}
                                    type="text"
                                    onChange={(e) => setthonXom(e.target.value)}
                                />
                            </div>
                            <div className="tenShop-TS">
                                <div className="tenShop">Facebook</div>
                                <input
                                    className="TS"
                                    placeholder={faceBook}
                                    type="text"
                                    onChange={(e) =>
                                        setfaceBook(e.target.value)
                                    }
                                />
                            </div>
                            <div className="tenShop-TS">
                                <div className="tenShop">Zalo</div>
                                <input
                                    className="TS"
                                    placeholder={zalo}
                                    type="text"
                                    onChange={(e) => setzalo(e.target.value)}
                                />
                            </div>
                            <div className="tenShop-TS">
                                <div className="tenShop">Slogan</div>
                                <input
                                    className="TS"
                                    placeholder={slogan}
                                    type="text"
                                    onChange={(e) => setslogan(e.target.value)}
                                />
                            </div>
                            <div className="tenShop-TS">
                                <div className="tenShop">Giới Thiệu Thêm</div>
                                <input
                                    className="TS"
                                    placeholder={gioiThieu}
                                    type="text"
                                    onChange={(e) =>
                                        setgioiThieu(e.target.value)
                                    }
                                />
                            </div>
                            <div className="nganHang">
                                <div className="chonNganHang">
                                    Tài Khoản Ngân Hàng
                                </div>
                                <select
                                    id="provinces"
                                    onChange={(e) =>
                                        settenNganHang(e.target.value)
                                    }
                                >
                                    <option>{tenNganHang}</option>
                                    {danhSachNganHang?.map((item) => {
                                        return (
                                            <option key={item.maSo}>
                                                {item.tenNganHang}
                                            </option>
                                        );
                                    })}
                                </select>

                                <div className="stk-chuTk">
                                    <input
                                        className="stk"
                                        onChange={(e) =>
                                            settaiKhoanNganHang(e.target.value)
                                        }
                                        type="number"
                                        placeholder={taiKhoanNganHang}
                                    />
                                    <input
                                        onChange={(e) =>
                                            setchuTaiKhoanNganhang(
                                                e.target.value
                                            )
                                        }
                                        className="chuTk"
                                        placeholder={chuTaiKhoanNganhang}
                                    />
                                </div>
                            </div>
                            <div className="soBan-container">
                                <div className="nhanVien">Danh Sách Số Bàn</div>
                                <div className="sdt-them">
                                    <input
                                        id="input3"
                                        className="sdt"
                                        placeholder="Nhập Số Bàn"
                                        type="text"
                                        onChange={(e) =>
                                            setsoBan2(e.target.value)
                                        }
                                    />
                                    <div
                                        className="them"
                                        onClick={handleThemSoBan}
                                    >
                                        +
                                    </div>
                                </div>
                                {soBan &&
                                    soBan.map((item, index) => {
                                        return (
                                            <div
                                                key={index}
                                                className="danhSach-xoa"
                                            >
                                                <div className="danhSach">
                                                    {item}
                                                </div>
                                                <div
                                                    className="xoa"
                                                    onClick={() =>
                                                        handleXoaSoBan(item)
                                                    }
                                                >
                                                    ❌
                                                </div>
                                            </div>
                                        );
                                    })}
                            </div>
                            <div className="nhanVien-container">
                                <div className="nhanVien">
                                    Nhân Viên Bán Hàng
                                </div>
                                <div className="sdt-them">
                                    <input
                                        id="input1"
                                        className="sdt"
                                        placeholder="Họ Và Tên"
                                        type="text"
                                        onChange={(e) =>
                                            setnvBanHang2(e.target.value)
                                        }
                                    />
                                    <input
                                        id="input11"
                                        className="sdt"
                                        placeholder="Số Điện Thoại"
                                        type="number"
                                        onChange={(e) =>
                                            setsdtnvBanHang2(e.target.value)
                                        }
                                    />
                                    <div
                                        className="them"
                                        onClick={handleThemNVBanHang}
                                    >
                                        +
                                    </div>
                                </div>
                                {nvBanHang &&
                                    nvBanHang.map((item, index) => {
                                        return (
                                            <div
                                                key={index}
                                                className="danhSach-xoa"
                                            >
                                                <div className="danhSach">
                                                    {item.nvBanHang}
                                                </div>
                                                <div className="danhSach">
                                                    {item.sdtnvBanHang}
                                                </div>
                                                <div
                                                    className="xoa"
                                                    onClick={() =>
                                                        handleXoaNVBanHang(item)
                                                    }
                                                >
                                                    ❌
                                                </div>
                                            </div>
                                        );
                                    })}
                            </div>
                            <div className="nhanVien-container">
                                <div className="nhanVien">
                                    Nhân Viên Quản Lý
                                </div>
                                <div className="sdt-them">
                                    <input
                                        id="input2"
                                        className="sdt"
                                        placeholder="Họ Và Tên"
                                        type="text"
                                        onChange={(e) =>
                                            setnvQuanLy2(e.target.value)
                                        }
                                    />
                                    <input
                                        id="input21"
                                        className="sdt"
                                        placeholder="Nhập Số Điện Thoại"
                                        type="number"
                                        onChange={(e) =>
                                            setsdtnvQuanLy2(e.target.value)
                                        }
                                    />
                                    <div
                                        className="them"
                                        onClick={handleThemNVQuanLy}
                                    >
                                        +
                                    </div>
                                </div>
                                {nvQuanLy &&
                                    nvQuanLy.map((item, index) => {
                                        return (
                                            <div
                                                key={index}
                                                className="danhSach-xoa"
                                            >
                                                <div className="danhSach">
                                                    {item.nvQuanLy}
                                                </div>
                                                <div className="danhSach">
                                                    {item.sdtnvQuanLy}
                                                </div>
                                                <div
                                                    className="xoa"
                                                    onClick={() =>
                                                        handleXoaNVQuanLy(item)
                                                    }
                                                >
                                                    ❌
                                                </div>
                                            </div>
                                        );
                                    })}
                            </div>
                        </>
                    )}
                    {/* admin */}
                    {user?.admin === true && (
                        <div>
                            <div className="tenShop-TS">
                                <div className="tenShop">Nhập ID Chủ Shop</div>
                                <input
                                    className="TS"
                                    placeholder={UserShop}
                                    type="text"
                                    onChange={(e) =>
                                        setUserShop(e.target.value)
                                    }
                                />
                            </div>
                            <div className="tenShop-TS">
                                <div className="tenShop">Người Hỗ Trợ</div>
                                <input
                                    className="TS"
                                    placeholder={nguoiHoTro}
                                    type="text"
                                    onChange={(e) =>
                                        setnguoiHoTro(e.target.value)
                                    }
                                />
                            </div>
                            <div className="tenShop-TS">
                                <div className="tenShop">Cấp Bậc</div>
                                <input
                                    className="TS"
                                    placeholder={capBac}
                                    type="text"
                                    onChange={(e) => setcapBac(e.target.value)}
                                />
                            </div>
                            <div className="tenShop-TS">
                                <div className="tenShop">Tài Khoản</div>
                                <input
                                    className="TS"
                                    placeholder={cash}
                                    type="text"
                                    onChange={(e) => setcash(e.target.value)}
                                />
                            </div>
                            <div className="tenShop-TS">
                                <div className="tenShop">Giao Diện</div>
                                <input
                                    className="TS"
                                    placeholder={giaoDien}
                                    type="text"
                                    onChange={(e) =>
                                        setgiaoDien(e.target.value)
                                    }
                                />
                            </div>
                            <div className="tenShop-TS">
                                <div className="tenShop">Tên Viết Tắt</div>
                                <input
                                    className="TS"
                                    placeholder={tenVietTat}
                                    type="text"
                                    onChange={(e) =>
                                        settenVietTat(e.target.value)
                                    }
                                />
                            </div>
                            <div className="tenShop-TS">
                                <div className="tenShop">Nguời Hỗ Trợ</div>
                                <input
                                    className="TS"
                                    placeholder={nguoiHoTro}
                                    type="text"
                                    onChange={(e) =>
                                        setnguoiHoTro(e.target.value)
                                    }
                                />
                            </div>
                            <div className="tenShop-TS">
                                <div className="tenShop">Địa Chỉ Website</div>
                                <input
                                    className="TS"
                                    placeholder={website}
                                    type="text"
                                    onChange={(e) => setwebsite(e.target.value)}
                                />
                            </div>
                        </div>
                    )}
                    {(user?._id === ttShop?.user ||
                        user?.admin === true ||
                        nvQuanLy?.find(
                            (item) => item?.sdtnvQuanLy === user?.username
                        )) && (
                        <div className="close-luu">
                            <a
                                href={`/${ttShop.ttShopThem?.tenVietTat}/${ttShop._id}/a/a/a/a`}
                                className="close"
                            >
                                Quay Lại Shop
                            </a>
                            <div
                                className="luu"
                                onClick={handleLuuThongTinShop}
                            >
                                Lưu Thông Tin
                            </div>
                        </div>
                    )}
                </div>
            )}
            {loading === 1 && <Loading />}
        </div>
    );
};
export default UpdateShop;
