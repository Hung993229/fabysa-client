import "./UpdateMyDetail.scss";
import { useNavigate, useParams } from "react-router-dom";
import CommonUtils from "../component/CommonUtils";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
import anhHaiHuoc from "../assets/images/anhHaiHuoc.jpg";
import { updatePost, getPost, registerPost } from "../redux/apiRequest";
import {
    apiGetPublicProvinces,
    apiGetPublicDistrict,
    apiGetPublicWard,
} from "../redux/ApiProvince";

const UpdateMyDetail = (props) => {
    const { loading, setloading } = props;
    const user = useSelector((state) => state.auth.login?.currentUser);
    const myDetail = useSelector((state) => state.post.post?.myDetail);
    const trangThaiLuu = useSelector((state) => state.post.post?.isFetching);
    const VND = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
    });
    const dispatch = useDispatch();
    // Thong Tin Chi Tiet
    const [avatar, setavatar] = useState(anhHaiHuoc);
    const [previewAvatar, setpreviewAvatar] = useState();

    const [cash, setcash] = useState("268268");
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

    const [wards, setWards] = useState([]);
    const [wardID, setWardID] = useState();
    const [provinces, setProvinces] = useState([]);
    const [provincesID, setprovincesID] = useState();
    const [districts, setDistricts] = useState([]);
    const [districtID, setDistrictID] = useState();

    const [tenNganHang, settenNganHang] = useState("MBBank");
    const [maSoNganHang, setmaSoNganHang] = useState("970422");
    const [taiKhoanNganHang, settaiKhoanNganHang] = useState("0931969456666");
    const [chuTaiKhoanNganhang, setchuTaiKhoanNganhang] =
        useState("Tài Khoản Demo");

    useEffect(() => {
        if (myDetail) {
            setavatar(myDetail?.avatar || anhHaiHuoc);
            setcash(myDetail?.cash || "268268");
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
                    "Tài Khoản Demo"
            );
        }
    }, []);
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
    // Hien Dang Sinh Song
    // Tinh2
    useEffect(() => {
        const fetchPublicProvince = async () => {
            const response = await apiGetPublicProvinces();
            if (response.status === 200) {
                setProvinces(response?.data.results);
            }
        };
        fetchPublicProvince();
    }, []);
    // Huyen2
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
    // Xa2
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
        setavatar(avatarBase64);
        setpreviewAvatar(file);
    };

    // avatar

    const handleLuuThongTinCaNhan = () => {
        const tenTinh = provinces?.find(
            (item) => item.province_id === provincesID
        );
        const tenHuyen = districts?.find(
            (item) => item.district_id === districtID
        );
        const tenXa = wards?.find((item) => item.ward_id === wardID);

        const tenNganHang2 = danhSachNganHang?.find(
            (item) => item.maSo === maSoNganHang
        );

        try {
            const newPost = {
                avatar: avatar,
                hoTen: hoTen,
                soDienThoai: soDienThoai,
                gioiTinh: gioiTinh,
                // ngay sinh
                ngaySinh: ngaySinh,
                thangSinh: thangSinh,
                namSinh: namSinh,
                // Hien Dang Song
                tinh: tenTinh?.province_name || myDetail?.tinh,
                huyen: tenHuyen?.district_name || myDetail?.huyen,
                xa: tenXa?.ward_name || myDetail?.xa,
                thonXom: thonXom,
                cash: cash,
                // vaiTro:vaiTro
                ttThemUser: {
                    nganHang: {
                        tenNganHang: tenNganHang2?.tenNganHang,
                        maSoNganHang: maSoNganHang,
                        taiKhoanNganHang: taiKhoanNganHang,
                        chuTaiKhoanNganhang: chuTaiKhoanNganhang,
                    },
                },
                user: user?._id,
            };
            if (myDetail) {
                const id = myDetail?._id;

                const luutt = updatePost(newPost, id, dispatch);
                if (luutt) {
                    setloading(0);
                }
            } else {
                const luutt2 = registerPost(newPost, dispatch);
                if (luutt2) {
                    setloading(0);
                }
            }
        } catch (err) {
            console.log(err);
        }
    };
    // Thong Tin Chi Tiet
    //  Viet QR
    // const nganHang = tenNganHang;
    const BANK_ID = maSoNganHang;
    const ACCOUNT_NO = taiKhoanNganHang;
    const TEMPLATE = "print";
    const AMOUNT = "";
    const DESCRIPTION = "";
    const ACCOUNT_NAME = chuTaiKhoanNganhang;
    const qr = `https://img.vietqr.io/image/${BANK_ID}-${ACCOUNT_NO}-${TEMPLATE}.png?amount=${AMOUNT}&addInfo=${DESCRIPTION}&accountName=${ACCOUNT_NAME}`;
    // Viet QR

    return (
        <div className="UpdateMyDetail-ConTaiNer">
            <div className="quayLai-tieuDe">
                <div onClick={() => setloading(0)} className="quayLai">
                    <i className="fa fa-angle-double-left"></i>Quay Lại
                </div>
                <div className="tieuDe">Sửa Thông Tin</div>
            </div>
            <div className="thongTin">
                <div className="hoTen-sdt">
                    <div className="hoTen-input">
                        <div className="hoTen">Họ & Tên</div>
                        <input
                            className="input"
                            type="text"
                            placeholder={hoTen}
                            onChange={(e) => sethoTen(e.target.value)}
                        />
                    </div>
                    <div className="hoTen-input">
                        <div className="hoTen">Số Điện Thoại</div>
                        <input
                            className="input"
                            type="text"
                            placeholder={soDienThoai}
                            onChange={(e) => setsoDienThoai(e.target.value)}
                        />
                    </div>
                    <div className="gioiTinh-select">
                        <div className="gioiTinh">Giới Tính</div>
                        <select
                            className="select"
                            name="gioi-tinh"
                            id="gioi-tinh"
                            onChange={(e) => setgioiTinh(e.target.value)}
                        >
                            <option>{gioiTinh}</option>
                            <option>Nam</option>
                            <option>Nữ</option>
                            <option>Khác</option>
                        </select>
                    </div>
                </div>
                <div className="avatar-taiKhoan">
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
                                {previewAvatar ? (
                                    <img
                                        src={previewAvatar.preview}
                                        className="avatar"
                                    />
                                ) : (
                                    <img src={avatar} className="avatar" />
                                )}
                            </div>
                        </label>
                    </div>

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

            <div className="ngaySinh-select">
                <div className="ngaySinh">Ngày Sinh</div>
                <div className="select-container">
                    <select
                        className="select"
                        onChange={(e) => setngaySinh(e.target.value)}
                    >
                        <option value="">{ngaySinh}</option>
                        {arrDate &&
                            arrDate.length > 0 &&
                            arrDate.map((item, index) => {
                                return <option key={index}>{item}</option>;
                            })}
                    </select>
                    <select
                        className="select"
                        onChange={(e) => setthangSinh(e.target.value)}
                    >
                        <option value="">{thangSinh}</option>
                        {arrMonth &&
                            arrMonth.length > 0 &&
                            arrMonth.map((item, index) => {
                                return <option key={index}>{item}</option>;
                            })}
                    </select>
                    <select
                        className="select"
                        onChange={(e) => setnamSinh(e.target.value)}
                    >
                        <option value="">{namSinh}</option>
                        {arrYear &&
                            arrYear.length > 0 &&
                            arrYear.map((item, index) => {
                                return <option key={index}>{item}</option>;
                            })}
                    </select>
                </div>
            </div>
            <div className="diaChi-select">
                <div className="diaChi">Địa Chỉ</div>
                <div className="select-container">
                    <select
                        id="provinces"
                        onChange={(e) => setprovincesID(e.target.value)}
                        className="select"
                    >
                        <option value="">{tinh}</option>
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
                        className="select"
                        onChange={(e) => setDistrictID(e.target.value)}
                    >
                        <option value="">{huyen}</option>
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
                        className="select"
                        onChange={(e) => setWardID(e.target.value)}
                    >
                        <option value="">{xa}</option>
                        {wards?.map((item) => {
                            return (
                                <option value={item.ward_id} key={item.ward_id}>
                                    {item.ward_name}
                                </option>
                            );
                        })}
                    </select>
                </div>

                <input
                    className="input"
                    onChange={(e) => setthonXom(e.target.value)}
                    placeholder={thonXom}
                />
            </div>
            <div className="tkNganHang-container">
                <div className="tieuDe">Tài Khoản Ngân Hàng</div>
                <div className="taikhoan">
                    <div className="ttTaiKhoan">
                        <div className="stk">Ngân hàng</div>
                        <select
                            id="provinces"
                            onChange={(e) => setmaSoNganHang(e.target.value)}
                        >
                            <option>{tenNganHang}</option>
                            {danhSachNganHang?.map((item) => {
                                return (
                                    <option value={item.maSo} key={item.maSo}>
                                        {item.tenNganHang}
                                    </option>
                                );
                            })}
                        </select>
                        <div className="stk">Số tài Khoản</div>
                        <input
                            onChange={(e) =>
                                settaiKhoanNganHang(e.target.value)
                            }
                            type="number"
                            placeholder={taiKhoanNganHang}
                        />
                        <div className="stk">Chủ Tài Khoản</div>
                        <input
                            onChange={(e) =>
                                setchuTaiKhoanNganhang(e.target.value)
                            }
                            className="chuTk"
                            placeholder={chuTaiKhoanNganhang}
                        />
                    </div>
                    <div className="qr-container">
                        <img className="maQr" src={qr} />
                    </div>
                </div>
            </div>
            <div
                onClick={() => handleLuuThongTinCaNhan()}
                className="luuThongTin"
            >
                Lưu Thông Tin
            </div>
        </div>
    );
};
export default UpdateMyDetail;
