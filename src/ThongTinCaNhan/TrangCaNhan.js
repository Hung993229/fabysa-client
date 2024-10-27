import "./TrangCaNhan.scss";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
import anhHaiHuoc from "../assets/images/anhHaiHuoc.jpg";
import QrScanner from "qr-scanner";
import hinhNen from "../assets/images/hinhNen.jpg";
import {
    getAllttShopTimKiem,
    getPost,
    logOut,
    getAllttShop,
    getTaiKhoanXacNhan,
} from "../redux/apiRequest";
import gioHang from "../assets/images/giohang.jpg";
import { createAxios } from "../../src/createInstance";
import { logOutSuccess } from "../redux/authSlice";
import Loading from "../GiaoDienChung/Loading";
import ThayPassword from "../ThayPassword/ThayPassword";
import UpdateMyDetail from "./UpdateMyDetail";
import {
    apiGetPublicProvinces,
    apiGetPublicDistrict,
    apiGetPublicWard,
} from "../redux/ApiProvince";
import ShopYeuThich from "./ShopYeuThich";
import AddShop from "../QuanLyShop/AddShop";
import BanPhimSo from "../GiaoDienChung/BanPhimSo";
import XemAnh from "../GiaoDienChung/XemAnh";

const TrangCaNhan = () => {
    const chieuRongMH = window.innerWidth;
    const { tenVietTat, idShop, idCtv, tenCtv, sdtCtv } = useParams();
    const [loading, setloading] = useState(0);
    const user = useSelector((state) => state.auth.login?.currentUser);
    const myDetail = useSelector((state) => state.post.post?.myDetail);
    const allShop = useSelector(
        (state) => state.ttShop.ttShop.allttShop?.AllShop
    );
    const allTaiKhoan = useSelector(
        (state) => state?.taiKhoan?.taiKhoan?.allTaiKhoan?.allTaiKhoan
    );
    const allShopTimKiem = useSelector(
        (state) => state.ttShop.ttShop.allShopTimKiem?.shopTimKiem
    );
    const VND = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
    });
    const accessToken = user?.accessToken;
    const id = user?._id;
    useEffect(() => {
        if (user) {
            getAllttShop(id, dispatch);
        }
    }, [user]);

    useEffect(() => {
        if (user) {
            getPost(id, dispatch);
        }
    }, [user]);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let axiosJWT = createAxios(user, dispatch, logOutSuccess);

    // BanPhimSo
    const [soThayThe, setsoThayThe] = useState();
    const [danhSachSo, setdanhSachSo] = useState([]);
    const handleDinhDangSo = (data) => {
        const n = +data;
        return n.toFixed(0).replace(/./g, function (c, i, a) {
            return i > 0 && c !== "," && (a.length - i) % 3 === 0 ? "." + c : c;
        });
    };
    const handleBanPhimSo = (soCanThay, giaTriSoThayThe) => {
        if (!giaTriSoThayThe) {
            setsoThayThe(soCanThay);
            if (!danhSachSo?.find((item) => item?.tenSo === soCanThay?.tenSo)) {
                setdanhSachSo([soCanThay, ...danhSachSo]);
            }
        } else {
            if (soThayThe && danhSachSo && danhSachSo?.length !== 0) {
                if (giaTriSoThayThe !== "xoa") {
                    const timSoThayThe = danhSachSo.find(
                        (item) => item?.tenSo === soThayThe?.tenSo
                    );
                    const soThayThe2 = {
                        tenSo: soThayThe?.tenSo,
                        giaTri: timSoThayThe?.giaTri + giaTriSoThayThe,
                    };
                    setdanhSachSo(
                        danhSachSo?.map((item) =>
                            item?.tenSo === soThayThe?.tenSo ? soThayThe2 : item
                        )
                    );
                    console.log("timSoThayThe", timSoThayThe);
                    console.log("soThayThe2", soThayThe2);
                } else {
                    const timSoThayThe = danhSachSo.find(
                        (item) => item?.tenSo === soThayThe?.tenSo
                    );
                    const soThayThe2 = {
                        tenSo: soThayThe?.tenSo,
                        giaTri: timSoThayThe?.giaTri.slice(0, -1),
                    };
                    setdanhSachSo(
                        danhSachSo?.map((item) =>
                            item?.tenSo === soThayThe?.tenSo ? soThayThe2 : item
                        )
                    );
                    console.log("timSoThayThe", timSoThayThe);
                    console.log("soThayThe2", soThayThe2);
                }
            }
        }
    };
    // BanPhimSo

    // Thong Tin Chi Tiet
    const [avatar, setavatar] = useState(anhHaiHuoc);
    const [previewAvatar, setpreviewAvatar] = useState();

    const [cash, setcash] = useState("100000");
    const [hoTen, sethoTen] = useState("Đào Chưa Chín");
    const [soDienThoai, setsoDienThoai] = useState("0987666888");
    const [gioiTinh, setgioiTinh] = useState("Nam");

    const [ngaySinh, setngaySinh] = useState("9");
    const [thangSinh, setthangSinh] = useState("9");
    const [namSinh, setnamSinh] = useState("1999");

    const [thonXom, setthonXom] = useState("Thôn Lá Đào");
    const [xa, setxa] = useState("Xã Cành Đào");
    const [huyen, sethuyen] = useState("Huyện Thân Đào");
    const [tinh, settinh] = useState("Tỉnh Gốc Đào");

    // console.log("wardID", wardID);

    const [tenNganHang, settenNganHang] = useState("MBBank");
    const [maSoNganHang, setmaSoNganHang] = useState("970422");
    const [taiKhoanNganHang, settaiKhoanNganHang] = useState("0931969456666");
    const [chuTaiKhoanNganhang, setchuTaiKhoanNganhang] =
        useState("Tài Khoản Demo");
    const [soTien, setsoTien] = useState("0");

    useEffect(() => {
        if (myDetail) {
            setavatar(myDetail?.avatar || anhHaiHuoc);
            setcash(myDetail?.cash || "100000");
            sethoTen(myDetail?.hoTen || "Đào Chưa Chín");
            setsoDienThoai(myDetail?.soDienThoai || "0987666888");
            setgioiTinh(myDetail?.gioiTinh || "Nam");

            setngaySinh(myDetail?.ngaySinh || "9");
            setthangSinh(myDetail?.thangSinh || "9");
            setnamSinh(myDetail?.namSinh || "1999");

            setthonXom(myDetail?.thonXom || "Thôn Lá Đào");
            setxa(myDetail?.xa || "Xã Cành Đào");
            sethuyen(myDetail?.huyen || "Huyện Thân Đào");
            settinh(myDetail?.tinh || "Tỉnh Gốc Đào");

            settenNganHang(
                myDetail?.ttThemUser?.nganHang?.tenNganHang || "MBBank"
            );
            setmaSoNganHang(
                myDetail?.ttThemUser?.nganHang?.maSoNganHang || "970422"
            );
            settaiKhoanNganHang(
                myDetail?.ttThemUser?.nganHang?.taiKhoanNganHang ||
                    "0931969456666"
            );
            setchuTaiKhoanNganhang(
                myDetail?.ttThemUser?.nganHang?.chuTaiKhoanNganhang ||
                    "Tai Khoan Demo"
            );
        }
    }, [myDetail]);
    const danhSachNganHang = [
        { maSo: "970405", tenNganHang: "Agribank" },
        { maSo: "970422", tenNganHang: "MBBank" },
        { maSo: "970407", tenNganHang: "Teckcombank" },
        { maSo: "970415", tenNganHang: "Vietinbank" },
        { maSo: "970436", tenNganHang: "Vietcombank" },
    ];
    // nam
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

    // Thong Tin Chi Tiet

    const handleLogout = () => {
        logOut(dispatch, id, accessToken, axiosJWT);

        setavatar(anhHaiHuoc);
        setcash("268268");
        sethoTen("Đào Chưa Chín");
        setsoDienThoai("0987666888");
        setgioiTinh("Nam");

        setngaySinh("9");
        setthangSinh("9");
        setnamSinh("1999");

        setthonXom("Thôn Lá Đào");
        setxa("Xã Cành Đào");
        sethuyen("Huyện Thân Đào");
        settinh("Tỉnh Gốc Đào");

        settenNganHang("MBBank");
        setmaSoNganHang("970422");
        settaiKhoanNganHang("0931969456666");
        setchuTaiKhoanNganhang("Tai Khoan Demo");
    };
    useEffect(() => {
        setsoTien(
            +danhSachSo?.find((item) => item?.tenSo === "Số Tiền Nhận")?.giaTri
        );
    }, [soThayThe]);
    //  Viet QR
    // const nganHang = tenNganHang;
    const BANK_ID = maSoNganHang;
    const ACCOUNT_NO = taiKhoanNganHang;
    const TEMPLATE = "print";
    const AMOUNT = +soTien;
    const DESCRIPTION = "";
    const ACCOUNT_NAME = chuTaiKhoanNganhang;
    const qr = `https://img.vietqr.io/image/${BANK_ID}-${ACCOUNT_NO}-${TEMPLATE}.png?amount=${AMOUNT}&addInfo=${DESCRIPTION}&accountName=${ACCOUNT_NAME}`;
    // Viet QR

    // read qr code
    const [result, setResult] = useState("");
    const readCode = (e) => {
        console.log("e", e);
        const file = e.target.files[0];
        if (!file) {
            return;
        }
        QrScanner.scanImage(file, { returnDetailedScanResult: true })
            .then((result) => setResult(result.data))
            .catch((e) => console.log(e));
    };
    useEffect(() => {
        if (result) {
            window.location.href = result;
        }
    }, [result]);
    // read qr code

    const handleThuNghiem = () => {
        navigate("/thu-nghiem");
    };

    // timKiemShop
    useEffect(() => {
        if (myDetail) {
            const skip = 0;
            const limit = 100;
            const tenSdt = "";
            const kinhDo = "";
            const viDo = "";
            getAllttShopTimKiem(
                tenSdt,
                myDetail?.tinh,
                myDetail?.huyen,
                myDetail?.xa,
                kinhDo,
                viDo,
                skip,
                limit,
                dispatch
            );
        }
    }, [myDetail]);
    const [tenSdt, settenSdt] = useState("");
    const handleTimKiemShopTenSdt = () => {
        const skip = 0;
        const limit = 100;
        const tinh = "";
        const huyen = "";
        const xa = "";
        const kinhDo = "";
        const viDo = "";
        getAllttShopTimKiem(
            tenSdt,
            tinh,
            huyen,
            xa,
            kinhDo,
            viDo,
            skip,
            limit,
            dispatch
        );
    };
    const handleTimKiemShopToaDo = () => {
        const skip = 0;
        const limit = 100;
        const tenSdt = "";
        const tinh = "";
        const huyen = "";
        const xa = "";
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const kinhDo = position.coords.latitude;
                const viDo = position.coords.longitude;
                getAllttShopTimKiem(
                    tenSdt,
                    tinh,
                    huyen,
                    xa,
                    kinhDo,
                    viDo,
                    skip,
                    limit,
                    dispatch
                );
            });
        }
    };
    const [tinh2, settinh2] = useState("Tỉnh/TP");
    const [huyen2, sethuyen2] = useState("Quận/Huyện");
    const [xa2, setxa2] = useState("Xã/Phường");
    const [provinces, setProvinces] = useState([]);
    const [provincesID, setprovincesID] = useState();
    const [districts, setDistricts] = useState([]);
    const [districtID, setDistrictID] = useState();
    const [wards, setWards] = useState([]);
    const [wardID, setWardID] = useState();

    useEffect(() => {
        if (myDetail) {
            settinh2(myDetail?.tinh || "Tỉnh/TP");
            sethuyen2(myDetail?.huyen || "Quận/Huyện");
            setxa2(myDetail?.xa || "Xã/Phường");
        }
    }, [myDetail]);

    // Tinh2
    useEffect(() => {
        const fetchPublicProvince = async () => {
            const response = await apiGetPublicProvinces();
            if (response?.status === 200) {
                setProvinces(response?.data?.results);
            }
        };
        fetchPublicProvince();
    }, []);
    // Huyen2
    useEffect(() => {
        const fetchPublicDictrict = async () => {
            const response = await apiGetPublicDistrict(provincesID);
            if (response?.status === 200) {
                setDistricts(response?.data?.results);
            }
        };
        if (provincesID) {
            fetchPublicDictrict();
            sethuyen2("Quận/Huyện");
            setxa2("Xã/Phường");
        } else {
            setDistricts([]);
            setWards([]);
        }
    }, [provincesID]);
    // Xa2
    useEffect(() => {
        const fetchPublicWard = async () => {
            const response = await apiGetPublicWard(districtID);
            if (response?.status === 200) {
                setWards(response?.data?.results);
            }
        };
        if (districtID) {
            fetchPublicWard();
            setxa2("Xã/Phường");
        } else {
            setWards([]);
        }
    }, [districtID]);

    const handleTimKiemShopDiaChi = (idTinh, idhuyen, xatk) => {
        console.log("idTinh", idTinh);
        console.log("idhuyen", idhuyen);
        console.log("xatk", xatk);
        setprovincesID(idTinh);
        setDistrictID(idhuyen);
        const tinhtk = provinces?.find(
            (item) => item.province_id === idTinh
        )?.province_name;
        const huyentk =
            districts?.find((item) => item.district_id === idhuyen)
                ?.district_name || "";

        const skip = 0;
        const limit = 100;
        const tenSdt = "";
        const kinhDo = "";
        const viDo = "";
        getAllttShopTimKiem(
            tenSdt,
            tinhtk,
            huyentk,
            xatk,
            kinhDo,
            viDo,
            skip,
            limit,
            dispatch
        );
    };
    const handleCapNhatThongTin = () => {
        if (user) {
            const cauHoi = window.confirm(
                "Cập nhật thông tin cá nhân để sử dụng!"
            );
            if (cauHoi) {
                setloading(2);
            }
        } else {
            const cauHoi = window.confirm("Đăng nhập để sử dụng!");
            if (cauHoi) {
                navigate(
                    `/dang-nhap/${tenVietTat}/${idShop}/a/${idCtv}/${tenCtv}/${sdtCtv}`
                );
            }
        }
    };

    // timKiemShop
    const handleTaiKhoanFabysa = () => {
        if (myDetail) {
            navigate(
                `/tai-khoan/${tenVietTat || "a"}/${idShop || "a"}/a/${
                    idCtv || "a"
                }/${tenCtv || "a"}/${sdtCtv || "a"}/${user?._id}`
            );
        } else {
            const cauHoi = window.confirm("Đăng nhập để sử dụng!");
            if (cauHoi) {
                navigate(
                    `/dang-nhap/${tenVietTat}/${idShop}/a/${idCtv}/${tenCtv}/${sdtCtv}`
                );
            }
        }
    };
    // xemAnhFull
    const [xemAnhFull, setxemAnhFull] = useState();
    const handleXemAnhFull = (anh) => {
        setxemAnhFull(anh);
    };
    // xemAnhFull

    useEffect(() => {
        getTaiKhoanXacNhan(1, 0, 6, dispatch);
    }, []);

    return (
        <div className="view">
            {chieuRongMH <= "1023" && (
                <div className="mobile">
                    <div className="TrangCaNhan-ConTaiNer">
                        {loading === 0 && (
                            <div className="TrangCaNhan">
                                {!idShop || idShop === "a" ? (
                                    <div className="quayLai-tieuDe">
                                        <div className="fabysa">Fabysa</div>
                                        <div className="tieuDe">
                                            Thông Tin Cá Nhân
                                        </div>
                                        {user ? (
                                            <div
                                                onClick={() => handleLogout()}
                                                className="dangXuat"
                                            >
                                                Đăng Xuất
                                            </div>
                                        ) : (
                                            <a
                                                href={`/dang-nhap/a/a/a/a/a/a`}
                                                className="dangNhap"
                                            >
                                                Đăng Nhập
                                            </a>
                                        )}
                                    </div>
                                ) : (
                                    <div className="quayLai-tieuDe">
                                        <a
                                            href={`/${tenVietTat}/${idShop}/a/${idCtv}/${tenCtv}/${sdtCtv}`}
                                            className="quayLai"
                                        >
                                            <i className="fa fa-angle-double-left"></i>
                                            Quay Lại
                                        </a>
                                        <div className="tieuDe">
                                            Thông Tin Cá Nhân
                                        </div>
                                        {user ? (
                                            <div
                                                onClick={() => handleLogout()}
                                                className="dangXuat"
                                            >
                                                Đăng Xuất
                                            </div>
                                        ) : (
                                            <a
                                                href={`/dang-nhap/${tenVietTat}/${idShop}/a/${idCtv}/${tenCtv}/${sdtCtv}`}
                                                className="dangNhap"
                                            >
                                                Đăng Nhập
                                            </a>
                                        )}
                                    </div>
                                )}
                                <div className="ttCaNhan-container">
                                    <div className="tieuDe">
                                        Thông Tin Cá Nhân&emsp;
                                        {!user ? (
                                            <i>-&emsp;Tk Demo</i>
                                        ) : (
                                            <i
                                                onClick={() => setloading(2)}
                                                className="fa fa-edit"
                                            ></i>
                                        )}
                                    </div>
                                    <div className="thongTin">
                                        <div className="hoTen-sdt">
                                            <div className="hoTen">
                                                Họ & Tên :&nbsp; {hoTen}
                                            </div>
                                            <div className="hoTen">
                                                Số Điện Thoại :&nbsp;{" "}
                                                {soDienThoai}
                                            </div>
                                            <div className="hoTen">
                                                Giới Tính :&nbsp; {gioiTinh}
                                            </div>
                                            <div className="hoTen">
                                                Ngày Sinh :&nbsp; {ngaySinh}/
                                                {thangSinh}/{namSinh}
                                            </div>
                                        </div>
                                        <div className="avatar-taiKhoan">
                                            <img
                                                onClick={() =>
                                                    handleXemAnhFull(avatar)
                                                }
                                                src={avatar}
                                                className="avatar"
                                            />
                                            <div
                                                onClick={() =>
                                                    handleTaiKhoanFabysa()
                                                }
                                                className="tien-container"
                                            >
                                                <i
                                                    className="fas fa-chart-line"
                                                    style={{
                                                        color: "#04aa6d",
                                                    }}
                                                ></i>
                                                &#160;
                                                {handleDinhDangSo(cash)}
                                                &#160;<span>F&#160;</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="diaChi">
                                        Địa Chỉ :&nbsp; {thonXom},&nbsp;
                                        {xa},&nbsp; {huyen}
                                        ,&nbsp; {tinh}
                                    </div>
                                </div>
                                <div className="tkNganHang-container">
                                    <div className="tieuDe">
                                        Tài Khoản Ngân Hàng&emsp;
                                        {!user ? (
                                            <i>-&emsp;Tk Demo</i>
                                        ) : (
                                            <i
                                                onClick={() => setloading(2)}
                                                className="fa fa-edit"
                                            ></i>
                                        )}
                                    </div>
                                    <div className="taikhoan">
                                        <div className="ttTaiKhoan">
                                            <div className="stk">Ngân hàng</div>
                                            <select
                                                id="provinces"
                                                onChange={(e) =>
                                                    setmaSoNganHang(
                                                        e.target.value
                                                    )
                                                }
                                            >
                                                <option>{tenNganHang}</option>
                                                {danhSachNganHang?.map(
                                                    (item) => {
                                                        return (
                                                            <option
                                                                value={
                                                                    item.maSo
                                                                }
                                                                key={item.maSo}
                                                            >
                                                                {
                                                                    item.tenNganHang
                                                                }
                                                            </option>
                                                        );
                                                    }
                                                )}
                                            </select>
                                            <div className="stk">
                                                Số tài Khoản
                                            </div>
                                            <input
                                                onChange={(e) =>
                                                    settaiKhoanNganHang(
                                                        e.target.value
                                                    )
                                                }
                                                type="number"
                                                placeholder={taiKhoanNganHang}
                                            />
                                            <div className="stk">
                                                Chủ Tài Khoản
                                            </div>
                                            <input
                                                onChange={(e) =>
                                                    setchuTaiKhoanNganhang(
                                                        e.target.value
                                                    )
                                                }
                                                className="chuTk"
                                                placeholder={
                                                    chuTaiKhoanNganhang
                                                }
                                            />
                                            <div className="stk">
                                                Số Tiền Nhận
                                            </div>
                                            <div
                                                className="input2"
                                                onClick={() =>
                                                    handleBanPhimSo(
                                                        {
                                                            tenSo: "Số Tiền Nhận",
                                                            giaTri: "0",
                                                        },
                                                        ""
                                                    )
                                                }
                                            >
                                                {VND.format(
                                                    danhSachSo?.find(
                                                        (item) =>
                                                            item?.tenSo ===
                                                            "Số Tiền Nhận"
                                                    )?.giaTri || 0
                                                )}
                                            </div>
                                        </div>
                                        <div className="qr-container">
                                            <img
                                                className="maQr"
                                                onClick={() =>
                                                    handleXemAnhFull(qr)
                                                }
                                                src={qr}
                                            />
                                        </div>
                                    </div>
                                </div>
                                {user && user?.admin === true && (
                                    <div className="qlCaNhan-container">
                                        <div className="tieuDe">
                                            Tìm Người yêu
                                        </div>
                                        <div className="noiDung">
                                            <i
                                                className="fa fa-users"
                                                style={{
                                                    color: "red",
                                                    fontSize: "3.9vw",
                                                }}
                                            ></i>
                                            &nbsp;Hội Độc Thân
                                        </div>
                                        <div className="noiDung">
                                            <i
                                                className="far fa-comments"
                                                style={{
                                                    color: "red",
                                                    fontSize: "3.9vw",
                                                }}
                                            ></i>
                                            &nbsp;Đang Tìm Hiểu
                                        </div>
                                    </div>
                                )}

                                <div className="qlCaNhan-container">
                                    <div className="tieuDe">
                                        Quản Lý Cá Nhân
                                    </div>

                                    {myDetail ? (
                                        <div
                                            onClick={() => setloading(4)}
                                            className="noiDung"
                                        >
                                            <i
                                                className="fa fa-check-square"
                                                style={{
                                                    color: "red",
                                                    fontSize: "3.9vw",
                                                }}
                                            ></i>
                                            &nbsp;Shop Follow
                                        </div>
                                    ) : (
                                        <div
                                            onClick={() =>
                                                handleCapNhatThongTin()
                                            }
                                            className="noiDung2"
                                        >
                                            <i
                                                className="fa fa-check"
                                                style={{
                                                    color: "red",
                                                    fontSize: "3.9vw",
                                                }}
                                            ></i>
                                            &nbsp;Shop Follow
                                        </div>
                                    )}
                                    {myDetail ? (
                                        <a
                                            href={`/don-mua/a/a/a/a/a/a`}
                                            className="noiDung"
                                        >
                                            <i
                                                className="far fa-file-alt"
                                                style={{
                                                    color: "red",
                                                    fontSize: "3.9vw",
                                                }}
                                            ></i>
                                            &nbsp;Lịch Sử Mua Hàng
                                        </a>
                                    ) : (
                                        <div
                                            onClick={() =>
                                                handleCapNhatThongTin()
                                            }
                                            className="noiDung2"
                                        >
                                            <i
                                                className="far fa-file-alt"
                                                style={{
                                                    color: "red",
                                                    fontSize: "3.9vw",
                                                }}
                                            ></i>
                                            &nbsp;Lịch Sử Mua Hàng
                                        </div>
                                    )}
                                    {myDetail ? (
                                        <a
                                            href={`/tai-khoan/${
                                                tenVietTat || "a"
                                            }/${idShop || "a"}/a/${
                                                idCtv || "a"
                                            }/${tenCtv || "a"}/${
                                                sdtCtv || "a"
                                            }/${user?._id}`}
                                            className="noiDung"
                                        >
                                            <i
                                                className="fab fa-empire"
                                                style={{
                                                    color: "#ef9b0f",
                                                    fontSize: "3.9vw",
                                                }}
                                            ></i>
                                            &#160;Fabysa Xanh
                                        </a>
                                    ) : (
                                        <div
                                            onClick={() =>
                                                handleCapNhatThongTin()
                                            }
                                            className="noiDung2"
                                        >
                                            <i
                                                className="fab fa-empire"
                                                style={{
                                                    color: "#ef9b0f",
                                                    fontSize: "3.9vw",
                                                }}
                                            ></i>
                                            &#160; Tài Khoản Fabysa Cá Nhân
                                        </div>
                                    )}

                                    {user ? (
                                        <div
                                            onClick={() => setloading(3)}
                                            className="noiDung"
                                        >
                                            <i
                                                className="fas fa-lock"
                                                style={{
                                                    color: "red",
                                                    fontSize: "3.9vw",
                                                }}
                                            ></i>
                                            &#160;Đổi Mật Khẩu
                                        </div>
                                    ) : (
                                        <div
                                            onClick={() =>
                                                alert("Đăng nhập để sử dụng!")
                                            }
                                            className="noiDung2"
                                        >
                                            <i
                                                className="fas fa-lock"
                                                style={{
                                                    color: "red",
                                                    fontSize: "3.9vw",
                                                }}
                                            ></i>
                                            &#160;Đổi Mật Khẩu
                                        </div>
                                    )}
                                </div>
                                <div className="qlCaNhan-container">
                                    <div className="tieuDe">Quản Lý Shop</div>
                                    {user ? (
                                        <div>
                                            {allShop && allShop.length < 3 ? (
                                                <div
                                                    onClick={() =>
                                                        setloading(5)
                                                    }
                                                    className="noiDung"
                                                >
                                                    <i
                                                        className="fa fa-plus-square"
                                                        style={{
                                                            color: "red",
                                                            fontSize: "3.9vw",
                                                        }}
                                                    ></i>
                                                    &#160; Thêm Shop Mới
                                                </div>
                                            ) : (
                                                <div
                                                    onClick={() =>
                                                        alert(
                                                            "Đã mở đủ 3 shop miễn phí!"
                                                        )
                                                    }
                                                    className="noiDung2"
                                                >
                                                    <i
                                                        className="fa fa-plus-square"
                                                        style={{
                                                            color: "red",
                                                            fontSize: "3.9vw",
                                                        }}
                                                    ></i>
                                                    &#160; Thêm Shop Mới
                                                </div>
                                            )}
                                        </div>
                                    ) : (
                                        <div
                                            onClick={() =>
                                                alert("Đăng nhập để sử dụng!")
                                            }
                                            className="noiDung2"
                                        >
                                            <i
                                                className="fa fa-plus-square"
                                                style={{
                                                    color: "red",
                                                    fontSize: "3.9vw",
                                                }}
                                            ></i>
                                            &#160;Thêm Shop Mới
                                        </div>
                                    )}

                                    {allShop &&
                                        allShop.length !== 0 &&
                                        allShop.map((item, index) => {
                                            return (
                                                <a
                                                    key={item._id}
                                                    className="noiDung"
                                                    href={`/${item.ttShopThem?.tenVietTat}/${item._id}/a/a/a/a`}
                                                >
                                                    <i
                                                        style={{
                                                            color: "red",
                                                            fontSize: "3.9vw",
                                                        }}
                                                    >
                                                        {index + 1}
                                                    </i>
                                                    &#160; {item.TenShop}
                                                </a>
                                            );
                                        })}
                                </div>
                                {user && user?.admin === true && (
                                    <div className="qlCaNhan-container">
                                        <div className="tieuDe">
                                            Trung Tâm Việc Làm
                                        </div>
                                        <div className="noiDung">
                                            Tìm Việc Làm
                                        </div>
                                        <div className="noiDung">
                                            Tìm Người Làm
                                        </div>
                                    </div>
                                )}
                                {user && user?.admin === true && (
                                    <div className="qlCaNhan-container">
                                        <div className="tieuDe">
                                            Quản Lý Hệ Thống
                                        </div>
                                        <div className="noiDung">Tài Khoản</div>
                                        <div className="noiDung">
                                            Danh Sách Shop
                                        </div>
                                        <div className="noiDung">
                                            Danh Sách Người Dùng
                                        </div>
                                        <div className="noiDung">Thêm Shop</div>
                                        <div className="noiDung">
                                            Reset Mật Khẩu
                                        </div>
                                        <div
                                            onClick={() => handleThuNghiem()}
                                            className="noiDung"
                                        >
                                            Thử Nghiệm
                                        </div>
                                        <a
                                            href={`/xac-nhan-tk/a/a/a/a/a/a`}
                                            className="noiDung"
                                        >
                                            Xác Nhận Tài Khoản{" "}
                                            <span
                                                style={{
                                                    color: "red",
                                                    fontSize: "3.9vw",
                                                }}
                                            >
                                                {allTaiKhoan?.length}
                                            </span>
                                        </a>
                                        <a
                                            href={`/mini-game/a/a/a/a/a/a`}
                                            className="noiDung"
                                        >
                                            Mini Game
                                        </a>
                                    </div>
                                )}
                                <div className="timShiper-container">
                                    <div className="tieuDe">
                                        Dịch Vụ Giao Hàng
                                    </div>
                                    <a
                                        className="noiDung"
                                        href={`/nhan-ship/a/a/a/a/a/a`}
                                    >
                                        Nhận Giao Hàng
                                    </a>
                                    <a
                                        className="noiDung"
                                        href={`/tim-ship/a/a/a/a/a/a`}
                                    >
                                        Tìm Giao Hàng
                                    </a>
                                </div>
                                <div className="timShop-container">
                                    <div className="tieuDe">Tìm Kiếm Shop</div>
                                    <div>
                                        <input
                                            id="anhQr"
                                            hidden
                                            type="file"
                                            onChange={(e) => readCode(e)}
                                        />
                                        <label
                                            className="noiDung"
                                            htmlFor="anhQr"
                                        >
                                            Quét mã Qr&nbsp;&nbsp;
                                            <i
                                                className="fa fa-qrcode"
                                                style={{ color: "black" }}
                                            ></i>
                                        </label>
                                    </div>
                                    <div
                                        className="noiDung"
                                        onClick={() => handleTimKiemShopToaDo()}
                                    >
                                        Shop Quanh Đây
                                    </div>
                                    <div className="diaChi-select">
                                        <div className="select-container">
                                            <select
                                                id="provinces"
                                                onChange={(e) =>
                                                    handleTimKiemShopDiaChi(
                                                        e.target.value,
                                                        "",
                                                        ""
                                                    )
                                                }
                                                className="select"
                                            >
                                                <option value="">
                                                    {tinh2}
                                                </option>
                                                {provinces?.map((item) => {
                                                    return (
                                                        <option
                                                            key={
                                                                item.province_id
                                                            }
                                                            value={
                                                                item.province_id
                                                            }
                                                        >
                                                            {item.province_name}
                                                        </option>
                                                    );
                                                })}
                                            </select>
                                            <select
                                                className="select"
                                                onChange={(e) =>
                                                    handleTimKiemShopDiaChi(
                                                        provincesID,
                                                        e.target.value,
                                                        ""
                                                    )
                                                }
                                            >
                                                <option value="">
                                                    {huyen2}
                                                </option>
                                                {districts?.map((item) => {
                                                    return (
                                                        <option
                                                            value={
                                                                item.district_id
                                                            }
                                                            key={
                                                                item.district_id
                                                            }
                                                        >
                                                            {item.district_name}
                                                        </option>
                                                    );
                                                })}
                                            </select>
                                            <select
                                                className="select"
                                                onChange={(e) =>
                                                    handleTimKiemShopDiaChi(
                                                        provincesID,
                                                        districtID,
                                                        e.target.value
                                                    )
                                                }
                                            >
                                                <option value="">{xa2}</option>
                                                {wards?.map((item) => {
                                                    return (
                                                        <option
                                                            value={
                                                                item.ward_name
                                                            }
                                                            key={item.ward_id}
                                                        >
                                                            {item.ward_name}
                                                        </option>
                                                    );
                                                })}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="timTheoTenSdt">
                                        <div className="input-tim">
                                            <input
                                                className="input"
                                                onChange={(e) =>
                                                    settenSdt(e.target.value)
                                                }
                                                placeholder="Nhập tên hoặc số điện thoại"
                                            />
                                            <div
                                                className="tim"
                                                onClick={() =>
                                                    handleTimKiemShopTenSdt()
                                                }
                                            >
                                                <i className="fa fa-search"></i>{" "}
                                                Tìm
                                            </div>
                                        </div>
                                    </div>
                                    {allShopTimKiem &&
                                        allShopTimKiem?.map((item, index) => {
                                            return (
                                                <a
                                                    href={`/a/${item._id}/a/a/a/a`}
                                                    key={index}
                                                    className="allShoplike"
                                                >
                                                    <div className="tenShop">
                                                        {index + 1}.&nbsp;
                                                        {item.TenShop}
                                                    </div>

                                                    <div className="diaChi">
                                                        {item.xa},&nbsp;{" "}
                                                        {item.huyen}
                                                        ,&nbsp; {item.tinh}
                                                    </div>
                                                </a>
                                            );
                                        })}
                                </div>
                                {soThayThe && (
                                    <BanPhimSo
                                        handleBanPhimSo={handleBanPhimSo}
                                        soThayThe={soThayThe}
                                        setsoThayThe={setsoThayThe}
                                        danhSachSo={danhSachSo}
                                        setdanhSachSo={setdanhSachSo}
                                        handleDinhDangSo={handleDinhDangSo}
                                    />
                                )}
                            </div>
                        )}
                        {loading === 1 && <Loading />}
                        {loading === 2 && (
                            <UpdateMyDetail
                                setloading={setloading}
                                loading={loading}
                            />
                        )}
                        {loading === 3 && (
                            <ThayPassword
                                setloading={setloading}
                                loading={loading}
                            />
                        )}
                        {loading === 4 && (
                            <ShopYeuThich
                                setloading={setloading}
                                loading={loading}
                            />
                        )}
                        {loading === 5 && (
                            <AddShop
                                setloading={setloading}
                                loading={loading}
                            />
                        )}
                    </div>
                </div>
            )}
            {chieuRongMH > "1023" && (
                <div className="pc">
                    <div className="TrangCaNhan-ConTaiNer">
                        {loading === 0 && (
                            <div className="TrangCaNhan">
                                {!idShop || idShop === "a" ? (
                                    <div className="quayLai-tieuDe">
                                        <div className="fabysa">Fabysa</div>
                                        <div className="tieuDe">
                                            Thông Tin Cá Nhân
                                        </div>
                                        {user ? (
                                            <div
                                                onClick={() => handleLogout()}
                                                className="dangXuat"
                                            >
                                                Đăng Xuất
                                            </div>
                                        ) : (
                                            <a
                                                href={`/dang-nhap/a/a/a/a/a/a`}
                                                className="dangNhap"
                                            >
                                                Đăng Nhập
                                            </a>
                                        )}
                                    </div>
                                ) : (
                                    <div className="quayLai-tieuDe">
                                        <a
                                            href={`/${tenVietTat}/${idShop}/a/${idCtv}/${tenCtv}/${sdtCtv}`}
                                            className="quayLai"
                                        >
                                            <i className="fa fa-angle-double-left"></i>
                                            Quay Lại
                                        </a>
                                        <div className="tieuDe">
                                            Thông Tin Cá Nhân
                                        </div>
                                        {user ? (
                                            <div
                                                onClick={() => handleLogout()}
                                                className="dangXuat"
                                            >
                                                Đăng Xuất
                                            </div>
                                        ) : (
                                            <a
                                                href={`/dang-nhap/${tenVietTat}/${idShop}/a/${idCtv}/${tenCtv}/${sdtCtv}`}
                                                className="dangNhap"
                                            >
                                                Đăng Nhập
                                            </a>
                                        )}
                                    </div>
                                )}
                                <div className="ttCaNhan-container">
                                    <div className="tieuDe">
                                        Thông Tin Cá Nhân
                                        {!myDetail && <i>-&emsp;Tk Demo</i>}
                                    </div>
                                    <div className="thongTin">
                                        <div className="hoTen-sdt">
                                            <div className="hoTen">
                                                Họ & Tên :&nbsp; {hoTen}
                                            </div>
                                            <div className="hoTen">
                                                Số Điện Thoại :&nbsp;{" "}
                                                {soDienThoai}
                                            </div>
                                            <div className="hoTen">
                                                Giới Tính :&nbsp; {gioiTinh}
                                            </div>
                                            <div className="hoTen">
                                                Ngày Sinh :&nbsp; {ngaySinh}/
                                                {thangSinh}/{namSinh}
                                            </div>
                                        </div>
                                        <div className="avatar-taiKhoan">
                                            <img
                                                src={avatar}
                                                className="avatar"
                                            />
                                            <div className="taiKhoan">
                                                {cash}&#160;
                                                <i
                                                    className="fab fa-empire"
                                                    style={{ color: "#ef9b0f" }}
                                                ></i>
                                            </div>

                                            <div className="quyDoi">
                                                1 VNĐ = 1 Fabysa Gold&#160;
                                                <i
                                                    className="fab fa-empire"
                                                    style={{ color: "#ef9b0f" }}
                                                ></i>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="diaChi">
                                        Địa Chỉ :&nbsp; {thonXom},&nbsp;
                                        {xa},&nbsp; {huyen}
                                        ,&nbsp; {tinh}
                                    </div>
                                </div>
                                <div className="tkNganHang-container">
                                    <div className="tieuDe">
                                        Tài Khoản Ngân Hàng
                                        {!myDetail && <i>-&emsp;Tk Demo</i>}
                                    </div>
                                    <div className="taikhoan">
                                        <div className="ttTaiKhoan">
                                            <div className="stk">Ngân hàng</div>
                                            <select
                                                id="provinces"
                                                onChange={(e) =>
                                                    setmaSoNganHang(
                                                        e.target.value
                                                    )
                                                }
                                            >
                                                <option>{tenNganHang}</option>
                                                {danhSachNganHang?.map(
                                                    (item) => {
                                                        return (
                                                            <option
                                                                value={
                                                                    item.maSo
                                                                }
                                                                key={item.maSo}
                                                            >
                                                                {
                                                                    item.tenNganHang
                                                                }
                                                            </option>
                                                        );
                                                    }
                                                )}
                                            </select>
                                            <div className="stk">
                                                Số tài Khoản
                                            </div>
                                            <input
                                                onChange={(e) =>
                                                    settaiKhoanNganHang(
                                                        e.target.value
                                                    )
                                                }
                                                type="number"
                                                placeholder={taiKhoanNganHang}
                                            />
                                            <div className="stk">
                                                Chủ Tài Khoản
                                            </div>
                                            <input
                                                onChange={(e) =>
                                                    setchuTaiKhoanNganhang(
                                                        e.target.value
                                                    )
                                                }
                                                className="chuTk"
                                                placeholder={
                                                    chuTaiKhoanNganhang
                                                }
                                            />
                                            <div className="stk">
                                                Số Tiền Nhận
                                            </div>
                                            <input
                                                onChange={(e) =>
                                                    setsoTien(e.target.value)
                                                }
                                                className="input"
                                                placeholder={VND.format(soTien)}
                                            />
                                        </div>
                                        <div className="qr-container">
                                            <img className="maQr" src={qr} />
                                        </div>
                                    </div>
                                </div>
                                {user && user?.admin === true && (
                                    <div className="qlCaNhan-container">
                                        <div className="tieuDe">Góc Tâm Sự</div>
                                        <div className="noiDung">
                                            Hôm nay bạn thế nào?
                                        </div>
                                    </div>
                                )}
                                {user && user?.admin === true && (
                                    <div className="qlCaNhan-container">
                                        <div className="tieuDe">
                                            Trung Tâm Việc làm
                                        </div>
                                        <div className="noiDung">
                                            Tìm Việc Làm
                                        </div>
                                        <div className="noiDung">
                                            Tìm Người Làm
                                        </div>
                                    </div>
                                )}
                                <div className="qlCaNhan-container">
                                    <div className="tieuDe">
                                        Quản Lý Cá Nhân
                                    </div>
                                    {myDetail ? (
                                        <div
                                            onClick={() => setloading(4)}
                                            className="noiDung"
                                        >
                                            Shop Follow
                                        </div>
                                    ) : (
                                        <div
                                            onClick={() =>
                                                alert("Đăng nhập để sử dụng!")
                                            }
                                            className="noiDung2"
                                        >
                                            Shop Follow
                                        </div>
                                    )}
                                    {myDetail ? (
                                        <a
                                            href={`/don-mua/a/a/a/a/a/a`}
                                            className="noiDung"
                                        >
                                            Lịch Sử Mua Hàng
                                        </a>
                                    ) : (
                                        <div
                                            onClick={() =>
                                                alert("Đăng nhập để sử dụng!")
                                            }
                                            className="noiDung2"
                                        >
                                            Lịch Sử Mua Hàng
                                        </div>
                                    )}
                                    {user ? (
                                        <div
                                            onClick={() => setloading(3)}
                                            className="noiDung"
                                        >
                                            Đổi Mật Khẩu
                                        </div>
                                    ) : (
                                        <div
                                            onClick={() =>
                                                alert("Đăng nhập để sử dụng!")
                                            }
                                            className="noiDung2"
                                        >
                                            Đổi Mật Khẩu
                                        </div>
                                    )}
                                </div>
                                <div className="qlCaNhan-container">
                                    <div className="tieuDe">Quản Lý Shop</div>
                                    {user ? (
                                        <div>
                                            {allShop && allShop.length < 2 ? (
                                                <div
                                                    onClick={() =>
                                                        setloading(5)
                                                    }
                                                    className="noiDung"
                                                >
                                                    Thêm Shop Mới
                                                </div>
                                            ) : (
                                                <div
                                                    onClick={() =>
                                                        alert(
                                                            "Đã mở đủ 2 shop miễn phí!"
                                                        )
                                                    }
                                                    className="noiDung2"
                                                >
                                                    Thêm Shop Mới
                                                </div>
                                            )}
                                        </div>
                                    ) : (
                                        <div
                                            onClick={() =>
                                                alert("Đăng nhập để sử dụng!")
                                            }
                                            className="noiDung2"
                                        >
                                            Thêm Shop Mới
                                        </div>
                                    )}

                                    {allShop &&
                                        allShop.length !== 0 &&
                                        allShop.map((item, index) => {
                                            return (
                                                <a
                                                    key={item._id}
                                                    className="noiDung"
                                                    href={`/${item.ttShopThem?.tenVietTat}/${item._id}/a/a/a/a`}
                                                >
                                                    {item.TenShop}
                                                </a>
                                            );
                                        })}
                                </div>
                                {user && user?.admin === true && (
                                    <div className="qlCaNhan-container">
                                        <div className="tieuDe">
                                            Quản Lý Hệ Thống
                                        </div>
                                        <div className="noiDung">
                                            Danh Sách Shop
                                        </div>
                                        <div className="noiDung">
                                            Danh Sách Người Dùng
                                        </div>
                                        <div className="noiDung">Thêm Shop</div>
                                        <div className="noiDung">
                                            Reset Mật Khẩu
                                        </div>
                                    </div>
                                )}

                                <div className="timShiper-container">
                                    <div className="tieuDe">Tìm Shiper</div>
                                    <div className="noiDung">
                                        Trung Tâm Đơn Hàng
                                    </div>
                                </div>
                                <div className="timShop-container">
                                    <div className="tieuDe">Tìm Kiếm Shop</div>
                                    <div className="noiDung">Quét mã Qr</div>
                                    <div className="noiDung">Xa-huyen-tinh</div>
                                    <div className="noiDung">
                                        Nhap Ten Hoac Sdt Shop
                                    </div>
                                    <div className="noiDung">
                                        Danh Sách Shop
                                    </div>
                                </div>
                            </div>
                        )}
                        {loading === 1 && <Loading />}
                        {loading === 2 && (
                            <UpdateMyDetail
                                setloading={setloading}
                                loading={loading}
                            />
                        )}
                        {loading === 3 && (
                            <ThayPassword
                                setloading={setloading}
                                loading={loading}
                            />
                        )}
                        {loading === 4 && (
                            <ShopYeuThich
                                setloading={setloading}
                                loading={loading}
                            />
                        )}
                        {loading === 5 && (
                            <AddShop
                                setloading={setloading}
                                loading={loading}
                            />
                        )}
                    </div>
                    <div className="hinhNen-container">
                        <img src={hinhNen} className="hinhNen" />
                    </div>
                </div>
            )}
            {xemAnhFull && (
                <XemAnh xemAnhFull={xemAnhFull} setxemAnhFull={setxemAnhFull} />
            )}
        </div>
    );
};
export default TrangCaNhan;
