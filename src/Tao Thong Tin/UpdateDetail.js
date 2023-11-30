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

    // newPost

    const [banner, setBanner] = useState(myDetail?.banner);
    const [avatar, setAvatar] = useState(myDetail?.avatar);
    const [hoTen, sethoTen] = useState(myDetail?.hoTen);
    const [cauNoiTamDac, setcauNoiTamDac] = useState(myDetail?.cauNoiTamDac);
    const [gioiTinh, setgioiTinh] = useState(myDetail?.gioiTinh);
    const [tinhTrangHonNhan, settinhTrangHonNhan] = useState(
        myDetail?.tinhTrangHonNhan
    );
    // ngay sinh
    const [ngaySinh, setngaySinh] = useState(myDetail?.ngaySinh);
    const [thangSinh, setthangSinh] = useState(myDetail?.thangSinh);
    const [namSinh, setnamSinh] = useState(myDetail?.namSinh);
    const [tonGiao, settonGiao] = useState(myDetail?.tonGiao);
    const [ngheNghiep, setngheNghiep] = useState(myDetail?.ngheNghiep);
    const [thuNhap, setthuNhap] = useState(myDetail?.thuNhap);
    const [chieuCao, setchieuCao] = useState(myDetail?.chieuCao);
    const [canNang, setcanNang] = useState(myDetail?.canNang);
    const [gioiThieuThem, setgioiThieuThem] = useState(myDetail?.gioiThieuThem);

    // Mau nguoi yeu ly tuong
    const [gioiTinh2, setgioiTinh2] = useState(myDetail?.gioiTinh2);
    const [tinhTrangHonNhan2, settinhTrangHonNhan2] = useState(
        myDetail?.tinhTrangHonNhan2
    );
    const [khuVucLamQuen2, setkhuVucLamQuen2] = useState(
        myDetail?.khuVucLamQuen2
    );
    const [tonGiao2, settonGiao2] = useState(myDetail?.tonGiao2);
    const [ngheNghiep2, setngheNghiep2] = useState(myDetail?.ngheNghiep2);
    const [thuNhap2, setthuNhap2] = useState(myDetail?.thuNhap2);
    const [tuoiHop2, settuoiHop2] = useState(myDetail?.tuoiHop2);
    const [tuoiHop3, settuoiHop3] = useState(myDetail?.tuoiHop3);
    const [yeucaukhac2, setyeucaukhac2] = useState(myDetail?.yeucaukhac2);

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
                cauNoiTamDac: cauNoiTamDac,
                gioiTinh: gioiTinh,
                tinhTrangHonNhan: tinhTrangHonNhan,

                ngaySinh: ngaySinh,
                thangSinh: thangSinh,
                namSinh: namSinh,

                tinhQq: tenTinh?.province_name,
                huyenQq: tenHuyen?.district_name,
                xaQq: tenXa?.ward_name,

                tinhDs: tenTinh2?.province_name,
                huyenDs: tenHuyen2?.district_name,
                xaDs: tenXa2?.ward_name,

                tonGiao: tonGiao,
                ngheNghiep: ngheNghiep,
                thuNhap: thuNhap,
                chieuCao: chieuCao,
                canNang: canNang,
                gioiThieuThem: gioiThieuThem,

                gioiTinh2: gioiTinh2,
                tinhTrangHonNhan2: tinhTrangHonNhan2,
                khuVucLamQuen2: khuVucLamQuen2,
                tonGiao2: tonGiao2,
                ngheNghiep2: ngheNghiep2,
                thuNhap2: thuNhap2,
                tuoiHop2: tuoiHop2,
                tuoiHop3: tuoiHop3,
                yeucaukhac2: yeucaukhac2,
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
            <div className="avatar-hoTenFormregis">
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
                <div>
                    <div>
                        <div>
                            <label hidden>Ho Va Ten</label>
                            <input
                                className="hoTen"
                                type="text"
                                placeholder={myDetail?.hoTen}
                                onChange={(e) => sethoTen(e.target.value)}
                            />
                        </div>
                        <div>
                            <label hidden>Câu Nói Tâm Đắc</label>
                            <input
                                onChange={(e) =>
                                    setcauNoiTamDac(e.target.value)
                                }
                                className="cauNoiTamDac"
                                placeholder={myDetail?.cauNoiTamDac}
                            />
                        </div>
                    </div>
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
                    <option value={myDetail?.gioiTinh}>
                        {myDetail?.gioiTinh}
                    </option>
                    <option>Nam</option>
                    <option>Nữ</option>
                    <option>Lesbian</option>
                    <option>Gay</option>
                </select>
            </div>
            <div className="containerTieuChiFormregis">
                <label
                    className="tieuChiFormregis"
                    htmlFor="tinh-trang-hon-nhan"
                >
                    Tình Trạng Hôn Nhân
                </label>

                <select
                    className="noiDungFormregis"
                    name="tinh-divang-hon-nhan"
                    id="tinh-divang-hon-nhan"
                    onChange={(e) => settinhTrangHonNhan(e.target.value)}
                >
                    <option value={myDetail?.tinhTrangHonNhan}>
                        {myDetail?.tinhTrangHonNhan}
                    </option>
                    <option>Độc Thân</option>
                    <option>Ly Hôn Có Con</option>
                    <option>Ly Hôn Chưa Con</option>
                    <option>Đã Kết Hôn</option>
                </select>
            </div>
            <div className="containerTieuChiFormregis">
                <div className="tieuChiFormregis">Ngày Sinh</div>

                <div className="myNoiDungFormregis2">
                    <label hidden>Ngày</label>
                    <select onChange={(e) => setngaySinh(e.target.value)}>
                        <option value={myDetail?.ngaySinh}>
                            {myDetail?.ngaySinh}
                        </option>
                        {arrDate &&
                            arrDate.length > 0 &&
                            arrDate.map((item, index) => {
                                return <option key={index}>{item}</option>;
                            })}
                    </select>
                    <label hidden>Tháng</label>
                    <select onChange={(e) => setthangSinh(e.target.value)}>
                        <option value={myDetail?.thangSinh}>
                            {myDetail?.thangSinh}
                        </option>
                        {arrMonth &&
                            arrMonth.length > 0 &&
                            arrMonth.map((item, index) => {
                                return <option key={index}>{item}</option>;
                            })}
                    </select>
                    <label hidden>Năm</label>
                    <select onChange={(e) => setnamSinh(e.target.value)}>
                        <option value={myDetail?.namSinh}>
                            {myDetail?.namSinh}
                        </option>
                        {arrYear &&
                            arrYear.length > 0 &&
                            arrYear.map((item, index) => {
                                return <option key={index}>{item}</option>;
                            })}
                    </select>
                </div>
            </div>

            <div className="containerTieuChiFormregis">
                <div className="tieuChiFormregis">Quê Quán</div>

                <div className="myNoiDungFormregis2">
                    <label hidden>Tỉnh</label>
                    <select
                        id="provinces"
                        onChange={(e) => setprovincesID(e.target.value)}
                    >
                        <option value="">---{myDetail?.tinhQq}---</option>
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
                        <option value="">---{myDetail?.huyenQq}---</option>
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
                        <option value="">---{myDetail?.xaQq}---</option>
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

            <div className="containerTieuChiFormregis">
                <div className="tieuChiFormregis">Hiện Đang Sinh Sống</div>

                <div className="myNoiDungFormregis2">
                    <select
                        id="provinces"
                        onChange={(e) => setprovincesID2(e.target.value)}
                    >
                        <option value="">---{myDetail?.tinhDs}---</option>

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
                        <option value="">---{myDetail?.huyenDs}---</option>
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
                        <option value="">---{myDetail?.xaDs}---</option>
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

            <div className="containerTieuChiFormregis">
                <label className="tieuChiFormregis" htmlFor="ton-giao">
                    Tôn Giáo
                </label>

                <select
                    className="noiDungFormregis"
                    name="ton-giao"
                    id="ton-giao"
                    onChange={(e) => settonGiao(e.target.value)}
                >
                    <option value={myDetail?.tonGiao}>
                        {myDetail?.tonGiao}
                    </option>
                    <option>Không</option>
                    <option>Phật Giáo</option>
                    <option>Kito Giáo</option>
                    <option>Công Giáo</option>
                    <option>Tin Lành</option>
                    <option>Hoà Hảo</option>
                    <option>Cao Đài</option>
                </select>
            </div>

            <div className="containerTieuChiFormregis">
                <label className="tieuChiFormregis">Nghề Nghiệp</label>

                <select
                    className="noiDungFormregis"
                    onChange={(e) => setngheNghiep(e.target.value)}
                >
                    <option value={myDetail?.ngheNghiep}>
                        {myDetail?.ngheNghiep}
                    </option>
                    <option>Làm Tự Do</option>
                    <option>Công Nhân</option>
                    <option>Bán Hàng</option>
                    <option>Kinh Doanh</option>
                    <option>Công An</option>
                    <option>Bộ Đội</option>
                    <option>Khác</option>
                </select>
            </div>
            <div className="containerTieuChiFormregis">
                <label className="tieuChiFormregis">Thu Nhập</label>

                <select
                    className="noiDungFormregis"
                    onChange={(e) => setthuNhap(e.target.value)}
                >
                    <option value={myDetail?.thuNhap}>
                        {myDetail?.thuNhap}
                    </option>
                    <option>Dưới 20 Triệu Đồng</option>
                    <option>Trên 20 Triệu Đồng</option>
                </select>
            </div>
            <div className="containerTieuChiFormregis">
                <div className="tieuChiFormregis">Đặc Điểm</div>
                <div className="noiDungFormregisDacDiem">
                    <div hidden>Chiều Cao</div>
                    <div className="containerTieuChi">
                        <input
                            onChange={(e) => setchieuCao(e.target.value)}
                            placeholder={myDetail?.chieuCao}
                            type="number"
                        />
                        <div className="donVi">(cm)</div>
                    </div>

                    <label hidden>Cân Nặng</label>
                    <div className="containerTieuChi">
                        <input
                            onChange={(e) => setcanNang(e.target.value)}
                            placeholder={myDetail?.canNang}
                            type="number"
                        />
                        <div className="donVi">(kg)</div>
                    </div>
                </div>
            </div>

            <div className="containerTieuChiFormregis">
                <label className="tieuChiFormregis">Giới thiệu thêm</label>

                <div className="noiDungFormregis3">
                    <input
                        className="inputFormregis3"
                        onChange={(e) => setgioiThieuThem(e.target.value)}
                        placeholder={myDetail?.gioiThieuThem}
                    />
                </div>
            </div>

            <div className="mauNguoiYeuLyTuong">Mẫu Người Yêu Lý Tưởng</div>

            <div className="containerTieuChiFormregis">
                <label className="tieuChiFormregis" htmlFor="gioi-tin-2">
                    Giới Tính
                </label>

                <select
                    className="noiDungFormregis"
                    name="gioi-tinh-2"
                    id="gioi-tinh-2"
                    onChange={(e) => setgioiTinh2(e.target.value)}
                >
                    <option value={myDetail?.gioiTinh2}>
                        {myDetail?.gioiTinh2}
                    </option>
                    <option>Nam</option>
                    <option>Nữ</option>
                    <option>Lesbian</option>
                    <option>Gay</option>
                </select>
            </div>

            <div className="containerTieuChiFormregis">
                <label className="tieuChiFormregis">Tình trạng hôn nhân</label>

                <select
                    className="noiDungFormregis"
                    onChange={(e) => settinhTrangHonNhan2(e.target.value)}
                >
                    <option value={myDetail?.tinhTrangHonNhan2}>
                        {myDetail?.tinhTrangHonNhan2}
                    </option>
                    <option>Độc Thân</option>
                    <option>Ly Hôn Có Con</option>
                    <option>Ly Hôn Chưa Con</option>
                    <option>Đã Kết Hôn</option>
                </select>
            </div>
            <div className="containerTieuChiFormregis">
                <label className="tieuChiFormregis">Khu Vực Làm Quen</label>

                <select
                    className="noiDungFormregis"
                    onChange={(e) => setkhuVucLamQuen2(e.target.value)}
                >
                    <option value={myDetail?.khuVucLamQuen2}>
                        {myDetail?.khuVucLamQuen2}
                    </option>
                    <option>Ưu Tiên Người Cùng Quê</option>
                    <option>Ưu Tiên Người Gần Nơi Đang Sinh Sống</option>
                    <option value="">Ở Đâu Cũng Được</option>
                </select>
            </div>
            <div className="containerTieuChiFormregis">
                <label className="tieuChiFormregis">Tôn Giáo</label>

                <select
                    className="noiDungFormregis"
                    onChange={(e) => settonGiao2(e.target.value)}
                >
                    <option value={myDetail?.tonGiao2}>
                        {myDetail?.tonGiao2}
                    </option>
                    <option>Không</option>
                    <option>Phật Giáo</option>
                    <option>Kito Giáo</option>
                    <option>Công Giáo</option>
                    <option>Tin Lành</option>
                    <option>Hoà Hảo</option>
                    <option>Cao Đài</option>
                </select>
            </div>
            <div className="containerTieuChiFormregis">
                <label className="tieuChiFormregis">Nghề Nghiệp</label>

                <select
                    className="noiDungFormregis"
                    onChange={(e) => setngheNghiep2(e.target.value)}
                >
                    <option value={myDetail?.ngheNghiep2}>
                        {myDetail?.ngheNghiep2}
                    </option>
                    <option>Làm Tự Do</option>
                    <option>Công Nhân</option>
                    <option>Bán Hàng</option>
                    <option>Kinh Doanh</option>
                    <option>Công An</option>
                    <option>Bộ Đội</option>
                    <option>Khác</option>
                </select>
            </div>
            <div className="containerTieuChiFormregis">
                <label className="tieuChiFormregis">Thu Nhập</label>

                <select
                    className="noiDungFormregis"
                    onChange={(e) => setthuNhap2(e.target.value)}
                >
                    <option value={myDetail?.thuNhap2}>
                        {myDetail?.thuNhap2}
                    </option>
                    <option>Dưới 20 Triệu Đồng</option>
                    <option>Trên 20 Triệu Đồng</option>
                </select>
            </div>
            <div className="containerTieuChiFormregis">
                <div className="tieuChiFormregis" htmlFor="nam-sinh">
                    Khoảng Tuổi Muốn Làm Quen
                </div>
                <div className="myNoiDungFormregis2">
                    <label>Từ Năm &nbsp; </label>
                    <select
                        className="tinhFromregis"
                        onChange={(e) => settuoiHop2(e.target.value)}
                    >
                        <option value={myDetail?.tuoiHop2}>
                            {myDetail?.tuoiHop2}
                        </option>
                        {arrYear &&
                            arrYear.length > 0 &&
                            arrYear.map((item, index) => {
                                return <option key={index}>{item}</option>;
                            })}
                    </select>
                    <label> &nbsp; &nbsp; Đến Năm &nbsp;</label>
                    <select
                        className="tinhFromregis"
                        onChange={(e) => settuoiHop3(e.target.value)}
                    >
                        <option value={myDetail?.tuoiHop3}>
                            {myDetail?.tuoiHop3}
                        </option>
                        {arrYear &&
                            arrYear.length > 0 &&
                            arrYear.map((item, index) => {
                                return <option key={index}>{item}</option>;
                            })}
                    </select>
                </div>
            </div>
            <div className="containerTieuChiFormregis">
                <label className="tieuChiFormregis">Yêu Cầu Khác</label>

                <div className="noiDungFormregis3">
                    <input
                        className="inputFormregis3"
                        onChange={(e) => setyeucaukhac2(e.target.value)}
                        placeholder={myDetail?.yeucaukhac2}
                    />
                </div>
            </div>
            <p className="luuY">
                Lưu ý: Số điện thoại đăng kí tài khoản cũng là Số điện thoại và
                Zalo để liên lạc khi ghép đôi. <br /> Vì vậy không dùng Số điện
                thoại ảo để đăng kí!
            </p>
            <button className="luuThongTin" onClick={handleUpdatePost}>
                Lưu Thông Tin
            </button>
        </div>
    );
};
export default UpdateDetail;
