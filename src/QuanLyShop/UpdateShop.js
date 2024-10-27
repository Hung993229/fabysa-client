import "./UpdateShop.scss";
import CommonUtils from "../component/CommonUtils";
// import parse from "html-react-parser";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import themAnh from "../assets/images/themAnh.png";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../GiaoDienChung/Loading";
import BoxSoanThao from "../component/BoxSoanThao";
import {
    getTaiKhoan,
    registerTaiKhoan,
    getttShop,
    updatettShop,
    getPost,
} from "../redux/apiRequest";
import { useEffect } from "react";
import {
    apiGetPublicProvinces,
    apiGetPublicDistrict,
    apiGetPublicWard,
} from "../redux/ApiProvince";
const UpdateShop = () => {
    const { idShop } = useParams();
    const user = useSelector((state) => state.auth.login?.currentUser);
    const myDetail = useSelector((state) => state.post.post?.myDetail);
    const ttShop = useSelector((state) => state.ttShop.ttShop.ttShop?.shop);
    const luuttShop = useSelector(
        (state) => state.ttShop.ttShop.ttShop?.message
    );
    const taiKhoan = useSelector(
        (state) => state?.taiKhoan?.taiKhoan?.taiKhoan?.taiKhoan
    );
    const allTaiKhoan2 = useSelector(
        (state) => state?.taiKhoan?.taiKhoan?.allTaiKhoan?.allTaiKhoan
    );

    const [loading, setloading] = useState(0);
    const [dateMax, setdateMax] = useState(0);
    const [dateMin, setdateMin] = useState(1);
    const [allTaiKhoan, setallTaiKhoan] = useState(allTaiKhoan2);
    useEffect(() => {
        setallTaiKhoan(allTaiKhoan2);
    }, [allTaiKhoan2]);
    const dispatch = useDispatch();
    useEffect(() => {
        getPost(user?._id, dispatch);
    }, [user]);
    // shop
    useEffect(() => {
        getttShop(idShop, dispatch);
    }, [idShop]);

    useEffect(() => {
        const GDVao = 0;
        const GDRa = "";
        getTaiKhoan(idShop, dateMax, dateMin, 1, GDVao, GDRa, 0, 2, dispatch);
    }, [idShop]);

    const [TenShop, setTenShop] = useState();
    const [SdtShop, setSdtShop] = useState();
    const [capBac, setcapBac] = useState();
    const [xuatBan, setxuatBan] = useState();

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
    const [vanBan, setvanBan] = useState();

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

    const [kinhDo, setkinhDo] = useState(0);
    const [viDo, setviDo] = useState(0);
    useEffect(() => {
        if (ttShop) {
            setTenShop(ttShop?.TenShop);
            setSdtShop(ttShop?.sdtShop);

            setkinhDo(ttShop?.kinhDo || 0);
            setviDo(ttShop?.viDo || 0);
            // Tinh
            // huyen
            // xa
            setthonXom(ttShop?.thonXom);
            setcash(ttShop?.cash);
            setcapBac(ttShop?.capBac || 1);
            setxuatBan(ttShop?.xuatBan || "Xây Dựng");
            setUserShop(ttShop?.user);
            // ttShopThem
            setBanner(ttShop?.ttShopThem?.Banner || themAnh);
            setgiaoDien(ttShop?.ttShopThem?.giaoDien || 1);
            settenVietTat(ttShop?.ttShopThem?.tenVietTat || "Tên viết tắt");
            setnguoiHoTro(
                ttShop?.ttShopThem?.nguoiHoTro || "Thêm người hỗ trợ"
            );
            setwebsite(ttShop?.ttShopThem?.website || "Website");
            setfaceBook(ttShop?.ttShopThem?.faceBook || "Link Facebook");
            setzalo(ttShop?.ttShopThem?.zalo || "Số điện thoại Zalo");
            setslogan(ttShop?.ttShopThem?.slogan || "Thêm slogan");
            setgioiThieu(ttShop?.ttShopThem?.gioiThieu || "Thêm giới thiệu");
            setvanBan(ttShop?.ttShopThem?.gioiThieu || "Thêm giới thiệu");

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
    const d = new Date();
    const gioPhut = `${d.getHours()}h${d.getMinutes()}`;
    const ngayThang = `${d.getDate()}/${d.getMonth()}/${d.getFullYear()}`;
    // Tinh
    useEffect(() => {
        const fetchPublicProvince = async () => {
            const response = await apiGetPublicProvinces();
            if (response.status === 200) {
                setProvinces(response?.data?.results);
            }
        };
        fetchPublicProvince();
    }, []);
    // Huyen
    useEffect(() => {
        const fetchPublicDictrict = async () => {
            const response = await apiGetPublicDistrict(provincesID);
            if (response.status === 200) {
                setDistricts(response?.data?.results);
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
                setWards(response?.data?.results);
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
            maSo: xetTkNH?.maSo,
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
            gioiThieu: vanBan,
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
                phiNenTang: ttShop?.phiNenTang,
                capBac: capBac,
                xuatBan: xuatBan,
                ttShopThem: ttShopThem,
                user: UserShop,
                kinhDo: kinhDo,
                viDo: viDo,
            };
            console.log("newShop", newShop);
            updatettShop(newShop, id, dispatch);

            if (allTaiKhoan && allTaiKhoan?.length === 0) {
                const newTaiKhoan = {
                    GDVao: 299000,
                    GDRa: "",
                    noiDungCK: "Fabysa Tặng",
                    xacNhanChuyenTien: "Thành Công",
                    thongTinThem: {
                        tenChuTk: ttShop?.TenShop,
                        sdtChuTk: ttShop?.sdtShop,
                        loaiTK: "Shop",
                    },
                    idChuTaiKhoan: ttShop?._id,
                };
                console.log("newTaiKhoan", newTaiKhoan);
                setallTaiKhoan([newTaiKhoan]);
                registerTaiKhoan(newTaiKhoan, dispatch);
            }
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
    const handleViTriHienTai = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                setkinhDo(position.coords.latitude);
                setviDo(position.coords.longitude);
            });
        }
    };
    return (
        <div className="pc-updateShop">
            <div className="quayLai-tieuDe">
                <a
                    href={`/${ttShop?.ttShopThem?.tenVietTat}/${ttShop?._id}/a/a/a/a`}
                    className="quayLai"
                >
                    <i className="fa fa-angle-double-left"></i>Quay Lại
                </a>

                <div className="tieuDe">Sửa Thông Tin Shop</div>
            </div>
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
                                    defaultValue={TenShop}
                                    type="text"
                                    onChange={(e) => setTenShop(e.target.value)}
                                />
                            </div>
                            <div className="tenShop-TS">
                                <div className="tenShop">Số Điện Thoại</div>
                                <input
                                    className="TS"
                                    defaultValue={SdtShop}
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
                                    defaultValue={ttShop?.thonXom}
                                    type="text"
                                    onChange={(e) => setthonXom(e.target.value)}
                                />
                            </div>
                            <div className="toaDo-container">
                                <div className="toaDo">Toạ Độ</div>
                                <div
                                    onClick={() => handleViTriHienTai()}
                                    className="viTriHienTai"
                                >
                                    Vị Trí Hiện Tại
                                </div>
                                <div className="kDvD-container">
                                    <div className="kinhDo-input">
                                        <div className="kinhDo">Kinh Độ</div>
                                        <input
                                            className="input"
                                            defaultValue={kinhDo}
                                            onChange={(e) =>
                                                setkinhDo(e.target.value)
                                            }
                                        />
                                    </div>
                                    <div className="kinhDo-input">
                                        <div className="kinhDo">Vĩ Độ</div>
                                        <input
                                            className="input"
                                            defaultValue={viDo}
                                            onChange={(e) =>
                                                setviDo(e.target.value)
                                            }
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="tenShop-TS">
                                <div className="tenShop">Facebook</div>
                                <input
                                    className="TS"
                                    defaultValue={faceBook}
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
                                    defaultValue={zalo}
                                    type="text"
                                    onChange={(e) => setzalo(e.target.value)}
                                />
                            </div>
                            <div className="tenShop-TS">
                                <div className="tenShop">Slogan</div>
                                <input
                                    className="TS"
                                    defaultValue={slogan}
                                    type="text"
                                    onChange={(e) => setslogan(e.target.value)}
                                />
                            </div>
                            <div className="tenShop-TS">
                                <div className="tenShop">Giới Thiệu</div>
                                <div>
                                    <BoxSoanThao
                                        setvanBan={setvanBan}
                                        vanBan={vanBan}
                                    />
                                </div>
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
                                        defaultValue={taiKhoanNganHang}
                                    />
                                    <input
                                        onChange={(e) =>
                                            setchuTaiKhoanNganhang(
                                                e.target.value
                                            )
                                        }
                                        className="chuTk"
                                        defaultValue={chuTaiKhoanNganhang}
                                    />
                                </div>
                            </div>
                            <div className="soBan-container">
                                <div className="nhanVien">Danh Sách Số Bàn</div>
                                <div className="sdt-them">
                                    <input
                                        id="input3"
                                        className="sdt"
                                        defaultValue="Nhập Số Bàn"
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
                                    soBan?.map((item, index) => {
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
                                        defaultValue="Họ Và Tên"
                                        type="text"
                                        onChange={(e) =>
                                            setnvBanHang2(e.target.value)
                                        }
                                    />
                                    <input
                                        id="input11"
                                        className="sdt"
                                        defaultValue="Số Điện Thoại"
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
                                    nvBanHang?.map((item, index) => {
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
                                        defaultValue="Họ Và Tên"
                                        type="text"
                                        onChange={(e) =>
                                            setnvQuanLy2(e.target.value)
                                        }
                                    />
                                    <input
                                        id="input21"
                                        className="sdt"
                                        defaultValue="Nhập Số Điện Thoại"
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
                                    nvQuanLy?.map((item, index) => {
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
                            <div className="nganHang">
                                <div className="chonNganHang">Xuất Bản</div>
                                <select
                                    id="provinces"
                                    onChange={(e) => setxuatBan(e.target.value)}
                                >
                                    <option>{xuatBan}</option>
                                    <option>Xây Dựng</option>
                                    <option>Hoàn Thành</option>
                                </select>
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
                                    defaultValue={UserShop}
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
                                    defaultValue={nguoiHoTro}
                                    type="text"
                                    onChange={(e) =>
                                        setnguoiHoTro(e.target.value)
                                    }
                                />
                            </div>

                            <div className="tenShop-TS">
                                <div className="tenShop">Tài Khoản</div>
                                <input
                                    className="TS"
                                    defaultValue={cash}
                                    type="text"
                                    onChange={(e) => setcash(e.target.value)}
                                />
                            </div>
                            <div className="tenShop-TS">
                                <div className="tenShop">Giao Diện</div>
                                <input
                                    className="TS"
                                    defaultValue={giaoDien}
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
                                    defaultValue={tenVietTat}
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
                                    defaultValue={nguoiHoTro}
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
                                    defaultValue={website}
                                    type="text"
                                    onChange={(e) => setwebsite(e.target.value)}
                                />
                            </div>
                            <div className="tenShop-TS">
                                <div className="tenShop">Cấp Bậc</div>
                                <i>1-Binh thường 2-Không hiển thị</i>
                                <input
                                    className="TS"
                                    defaultValue={capBac}
                                    type="number"
                                    onChange={(e) => setcapBac(e.target.value)}
                                />
                            </div>
                        </div>
                    )}
                    {(user?._id === ttShop?.user ||
                        user?.admin === true ||
                        nvQuanLy?.find(
                            (item) => item?.sdtnvQuanLy === user?.username
                        )) && (
                        <div>
                            {luuttShop !== "Cập nhật thành công!" ? (
                                <div className="close-luu">
                                    <div
                                        className="luu"
                                        onClick={handleLuuThongTinShop}
                                    >
                                        Lưu Thông Tin
                                    </div>
                                </div>
                            ) : (
                                <div className="close-luu">
                                    <div
                                        className="daLuu"
                                        onClick={()=>alert("Thoát ra vào lại để sửa tiếp!")}
                                    >
                                        Đã Lưu
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            )}
            {loading === 1 && <Loading />}
        </div>
    );
};
export default UpdateShop;
