import "./ChiTietSanPham.scss";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import {
    getttShop,
    getSanPham,
    getPost,
    registerDonHang,
    updatePost,
    updatettShop,
} from "../redux/apiRequest";
const ChiTietSanPham = () => {
    const user = useSelector((state) => state.auth.login.currentUser);
    const myDetail = useSelector((state) => state.post.post?.myDetail);
    console.log("myDetail", myDetail);
    const ttShop = useSelector((state) => state.ttShop.ttShop.ttShop?.shop);
    const allSanPham = useSelector(
        (state) => state.sanPham.sanPham.allsanPham?.allSanpham
    );
    const { idShop, spId } = useParams();
    const [datHang, setdatHang] = useState(0);
    const thongTinSp = allSanPham?.find((item) => item._id === spId);
    console.log("thongTinSp", thongTinSp);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        if (user && user.length !== 0) {
            getPost(user?._id, dispatch);
        }
    }, []);
    useEffect(() => {
        getttShop(idShop, dispatch);
    }, []);
    useEffect(() => {
        const user = idShop;
        getSanPham(user, dispatch);
    }, []);

    // thongtindonHang

    const [slSP, setslSP] = useState(0);
    const [thanhTien, setthanhTien] = useState(0);
    // const [soTienCanTT, setsoTienCanTT] = useState();
    const [phuongThucTT, setphuongThucTT] = useState(
        "Thanh Toán Khi Nhận Hàng"
    );
    const [sdtNguoiMua, setsdtNguoiMua] = useState();
    const [hoTenNguoiMua, sethoTenNguoiMua] = useState();

    const [dcNguoiNMua, setdcNguoiNMua] = useState();
    console.log("slSP", slSP);
    const [ghiChuNguoiMua, setghiChuNguoiMua] = useState("Giao sớm nhé Shop!");

    const hoanThanhDonHang = () => {
        if (slSP === 0) {
            alert("Vui lòng nhập số lượng");
        } else {
            if (!sdtNguoiMua || !hoTenNguoiMua || !dcNguoiNMua) {
                alert("Vui lòng nhập đủ thông tin nhận hàng!");
            } else {
                try {
                    const newDonHang = {
                        tenSp: thongTinSp?.TenSanPham,
                        linkSp: `/shop/${idShop}/${spId}`,
                        donGia: thongTinSp?.giaKhuyenMai,
                        giaNhap: thongTinSp?.giaNhap,
                        slSP: slSP,
                        thanhTien: thanhTien,
                        goldDaTT: "",
                        soTienCanTT: thanhTien,
                        phuongThucTT: phuongThucTT,
                        // nguoimua
                        sdtNguoiMua: sdtNguoiMua,
                        hoTenNguoiMua: hoTenNguoiMua,
                        dcNguoiNMua: dcNguoiNMua,
                        ghiChuNguoiMua: ghiChuNguoiMua,
                        idPost: "",
                        // Ctv
                        affiliate: thongTinSp?.affiliate,
                        hoahongCTV: thongTinSp?.hoahongCTV,
                        // nguoi ban
                        giamTru: 0,
                        trangThaiDH: 1,
                        user: thongTinSp?.user,
                    };
                    console.log("newDonHang", newDonHang);
                    registerDonHang(newDonHang, dispatch);
                    navigate(`/shop/${idShop}`);
                } catch (err) {
                    console.log(err);
                }
            }
        }
    };
    useEffect(() => {
        if (slSP > 0) {
            setthanhTien(thongTinSp?.giaKhuyenMai * slSP);
        }
    }, [slSP]);
    // thongtindonHang

    console.log("sthongTinSppId", thongTinSp);
    const VND = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
    });

    console.log("thanhTien", thanhTien);

    // thongtindonHanguser
    const [slSP2, setslSP2] = useState(0);
    const [thanhTien2, setthanhTien2] = useState(0);
    const [gold2, setgold2] = useState(myDetail?.cash);
    const [goldDaTT2, setgoldDaTT2] = useState(0);
    const [soTienCanTT2, setsoTienCanTT2] = useState(0);
    const [phuongThucTT2, setphuongThucTT2] = useState(
        "Thanh Toán Khi Nhận Hàng"
    );
    const [sdtNguoiMua2, setsdtNguoiMua2] = useState(myDetail?.soDienThoai);
    const [hoTenNguoiMua2, sethoTenNguoiMua2] = useState(myDetail?.hoTen);

    const [dcNguoiNMua2, setdcNguoiNMua2] = useState(
        `${myDetail?.thonXom} - ${myDetail?.xa} - ${myDetail?.huyen} - ${myDetail?.tinh}`
    );
    console.log("goldDaTT2", goldDaTT2);
    const [ghiChuNguoiMua2, setghiChuNguoiMua2] =
        useState("Giao sớm nhé Shop!");
    const hoanThanhDonHanguser = () => {
        if (slSP2 === 0) {
            alert("Vui lòng nhập số lượng");
        } else {
            if (!sdtNguoiMua2 || !hoTenNguoiMua2 || !dcNguoiNMua2) {
                alert("Vui lòng nhập đủ thông tin nhận hàng!");
            } else {
                if (goldDaTT2 < 0) {
                    alert("Số Gold không phù hợp!");
                    setgoldDaTT2(0);
                } else {
                    if (gold2 > myDetail?.cash) {
                        alert("Vượt quá Gold đang có!");
                        setgoldDaTT2(0);
                    } else {
                        if (goldDaTT2 > thanhTien2) {
                            alert("Vượt quá số tiền cần thanh toán!");
                            setgoldDaTT2(0);
                        } else {
                            try {
                                const newDonHang = {
                                    tenSp: thongTinSp?.TenSanPham,
                                    linkSp: `/shop/${idShop}/${spId}`,
                                    donGia: thongTinSp?.giaKhuyenMai,
                                    giaNhap: thongTinSp?.giaNhap,
                                    slSP: slSP2,
                                    thanhTien: thanhTien2,
                                    goldDaTT: goldDaTT2,
                                    soTienCanTT: soTienCanTT2,
                                    phuongThucTT: phuongThucTT2,
                                    // nguoimua
                                    sdtNguoiMua: sdtNguoiMua2,
                                    hoTenNguoiMua: hoTenNguoiMua2,
                                    dcNguoiNMua: dcNguoiNMua2,
                                    ghiChuNguoiMua: ghiChuNguoiMua2,
                                    idPost: myDetail?._id,
                                    // Ctv
                                    affiliate: thongTinSp?.affiliate,
                                    hoahongCTV: thongTinSp?.hoahongCTV,
                                    // nguoi ban

                                    giamTru: 0,
                                    trangThaiDH: 1,
                                    user: thongTinSp?.user,
                                };
                                registerDonHang(newDonHang, dispatch);
                                const idPost = myDetail?._id;
                                const newPost = {
                                    cash: myDetail?.cash - goldDaTT2,
                                };
                                updatePost(newPost, idPost, dispatch);
                                const id = ttShop._id;
                                const newShop = {
                                    cash: ttShop.cash + goldDaTT2,
                                };
                                updatettShop(newShop, id, dispatch);
                                navigate(`/shop/${idShop}`);
                            } catch (err) {
                                console.log(err);
                            }
                        }
                    }
                }
            }
        }
    };
    useEffect(() => {
        if (slSP2 > 0) {
            setthanhTien2(thongTinSp?.giaKhuyenMai * slSP2);
            setsoTienCanTT2(thongTinSp?.giaKhuyenMai * slSP2);
        }
    }, [slSP2]);
    useEffect(() => {
        setsoTienCanTT2(thongTinSp?.giaKhuyenMai * slSP2 - goldDaTT2);
        if (goldDaTT2 < 0) {
            alert("Số Gold không phù hợp!");
            setgoldDaTT2(0);
        }
        if (goldDaTT2 > myDetail?.cash) {
            alert("Vượt quá Gold đang có!");
            setgoldDaTT2(0);
        }
        if (goldDaTT2 > thanhTien2) {
            alert("Vượt quá số tiền cần thanh toán!");
            setgoldDaTT2(0);
        }
    }, [goldDaTT2]);
    // thongtindonHanguser

    return (
        <div className="chitietsp-datHang">
            {+datHang === 0 ? (
                <div className="container-ChiTietSanPhamTo">
                    <div className="container-ChiTietSanPham">
                        <div>
                            <a href={`/shop/${idShop}`}>
                                <button className="close">Close</button>
                            </a>
                        </div>
                        <div>
                            <img
                                src={thongTinSp?.AnhSanPham}
                                className="anhSanPham"
                                alt="timtim"
                            />
                            <div className="tenSanPham">
                                {thongTinSp?.TenSanPham}
                            </div>
                            <div className="giaBan">
                                <div className="giaBanMoi">
                                    {VND.format(thongTinSp?.giaKhuyenMai)}
                                </div>
                                <div className="giaGiam">
                                    <div className="giabanCu">
                                        {VND.format(thongTinSp?.giaNiemYet)}
                                    </div>
                                    <div className="phanTram">
                                        Giảm&nbsp;
                                        {Math.floor(
                                            (100 *
                                                (thongTinSp?.giaNiemYet -
                                                    thongTinSp?.giaKhuyenMai)) /
                                                thongTinSp?.giaNiemYet
                                        )}
                                        %
                                    </div>
                                </div>
                            </div>
                            <a
                                href={thongTinSp?.thongTinNguoiBan}
                                target="_blank"
                            >
                                <button
                                    onClick={() => setdatHang(1)}
                                    className="muaHang"
                                >
                                    MUA HÀNG
                                </button>
                            </a>
                            <div className="viTriSanPham">
                                <i className="fa-solid fa-location-dot"></i>
                                <div className="diachisanpham">
                                    {thongTinSp?.xa}
                                </div>
                                <div className="diachisanpham">
                                    {thongTinSp?.huyen}
                                </div>
                                <div className="diachisanpham">
                                    {thongTinSp?.tinh}
                                </div>
                            </div>
                            <div className="thongtinSanPham">
                                {thongTinSp?.thongTinSanPham}
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div>
                    {myDetail && myDetail !== 0 ? (
                        <div className="datHang-container">
                            <a href={`/shop/${idShop}`}>
                                <button className="close">Close</button>
                            </a>
                            <div className="anhSanPham">
                                <img
                                    src={thongTinSp?.AnhSanPham}
                                    className="anhSanPham"
                                    alt="timtim"
                                />
                            </div>
                            <div className="tenSanPham">
                                {thongTinSp?.TenSanPham}
                            </div>

                            <div className="containerTieuChiFormregis">
                                <div className="tieuChiFormregis">Đơn Giá</div>
                                <div className="noiDungFormregis">
                                    {VND.format(thongTinSp?.giaKhuyenMai)}
                                </div>
                            </div>
                            <div className="containerTieuChiFormregis">
                                <div className="tieuChiFormregis">Số Lượng</div>
                                <input
                                    className="noiDungFormregis"
                                    onChange={(e) => setslSP2(e.target.value)}
                                    placeholder="Nhập Số Lượng"
                                />
                            </div>
                            <div className="containerTieuChiFormregis">
                                <div className="tieuChiFormregis">
                                    Thành Tiền
                                </div>
                                <div className="noiDungFormregis">
                                    {VND.format(thanhTien2)}
                                </div>
                            </div>

                            {/* <div className="containerTieuChiFormregis">
                                <div className="tieuChiFormregis">
                                    Tài Khoản Gold
                                </div>
                                <div className="noiDungFormregis">
                                    {gold2} Gold
                                </div>
                            </div>
                            <div className="containerTieuChiFormregis">
                                <div className="tieuChiFormregis">
                                    Thanh Toán Bằng Gold
                                </div>
                                <input
                                    className="noiDungFormregis"
                                    onChange={(e) =>
                                        setgoldDaTT2(e.target.value)
                                    }
                                    placeholder={goldDaTT2}
                                />
                            </div>

                            <div className="containerTieuChiFormregis">
                                <div className="tieuChiFormregis">
                                    Cần Thanh Toán Số Tiền
                                </div>
                                <div className="noiDungFormregis">
                                    {VND.format(soTienCanTT2)}
                                </div>
                            </div> */}
                            <div className="containerTieuChiFormregis">
                                <div className="tieuChiFormregis">
                                    Thanh Toán
                                </div>
                                {/* <div className="noiDungFormregis">
                                    Thanh Toán Khi Nhận
                                </div> */}
                                <select
                                    onChange={(e) =>
                                        setphuongThucTT2(e.target.value)
                                    }
                                    className="noiDungFormregis"
                                >
                                    <option value="">---Mời Chọn---</option>
                                    <option>Thanh Toán Khi Nhận</option>
                                    <option>Chuyển Khoản Ngay</option>
                                </select>
                            </div>

                            <div className="thongTinNhanHang">
                                Thông Tin Người Nhận
                            </div>

                            <div className="containerTieuChiFormregis">
                                <div className="tieuChiFormregis">
                                    Số Điện Thoại
                                </div>
                                <input
                                    className="noiDungFormregis"
                                    onChange={(e) =>
                                        setsdtNguoiMua2(e.target.value)
                                    }
                                    placeholder={sdtNguoiMua2}
                                />
                            </div>
                            <div className="containerTieuChiFormregis">
                                <div className="tieuChiFormregis">
                                    Họ Và Tên
                                </div>
                                <input
                                    className="noiDungFormregis"
                                    onChange={(e) =>
                                        sethoTenNguoiMua2(e.target.value)
                                    }
                                    placeholder={hoTenNguoiMua2}
                                />
                            </div>

                            <div className="containerTieuChiFormregis">
                                <div className="tieuChiFormregis">Địa Chỉ</div>
                                <input
                                    className="noiDungFormregis"
                                    onChange={(e) =>
                                        setdcNguoiNMua2(e.target.value)
                                    }
                                    placeholder={dcNguoiNMua2}
                                />
                            </div>
                            <div className="containerTieuChiFormregis">
                                <div className="tieuChiFormregis">
                                    Ghi Chú Thêm
                                </div>
                                <input
                                    className="noiDungFormregis"
                                    placeholder={ghiChuNguoiMua2}
                                    onChange={(e) =>
                                        ghiChuNguoiMua2(e.target.value)
                                    }
                                />
                            </div>
                            {/* <a href={`/shop/${idShop}`}> */}
                            <button
                                className="hoanThanh"
                                onClick={hoanThanhDonHanguser}
                            >
                                Hoàn Thành
                            </button>
                            {/* </a> */}
                        </div>
                    ) : (
                        <div className="datHang-container">
                            <a href={`/shop/${idShop}`}>
                                <button className="close">Close</button>
                            </a>
                            <div className="anhSanPham">
                                <img
                                    src={thongTinSp?.AnhSanPham}
                                    className="anhSanPham"
                                    alt="timtim"
                                />
                            </div>
                            <div className="tenSanPham">
                                {thongTinSp?.TenSanPham}
                            </div>
                            {/* hhhhhh */}
                            <div className="containerTieuChiFormregis">
                                <div className="tieuChiFormregis">Đơn Giá</div>
                                <div className="noiDungFormregis">
                                    {VND.format(thongTinSp?.giaKhuyenMai)}
                                </div>
                            </div>
                            <div className="containerTieuChiFormregis">
                                <div className="tieuChiFormregis">Số Lượng</div>
                                <input
                                    className="noiDungFormregis"
                                    onChange={(e) => setslSP(e.target.value)}
                                    placeholder="Nhập Số Lượng"
                                />
                            </div>
                            <div className="containerTieuChiFormregis">
                                <div className="tieuChiFormregis">
                                    Thành Tiền
                                </div>
                                <div className="noiDungFormregis">
                                    {VND.format(thanhTien)}
                                </div>
                            </div>

                            <div className="containerTieuChiFormregis">
                                <div className="tieuChiFormregis">
                                    Thanh Toán
                                </div>
                                {/* <div className="noiDungFormregis">
                                    Thanh Toán Khi Nhận
                                </div> */}
                                <select
                                    onChange={(e) =>
                                        setphuongThucTT(e.target.value)
                                    }
                                    className="noiDungFormregis"
                                >
                                    <option value="">---Mời Chọn---</option>
                                    <option>Thanh Toán Khi Nhận</option>
                                    <option>Chuyển Khoản Ngay</option>
                                </select>
                            </div>

                            <div className="thongTinNhanHang">
                                Thông Tin Người Nhận
                            </div>

                            <div className="containerTieuChiFormregis">
                                <div className="tieuChiFormregis">
                                    Số Điện Thoại
                                </div>
                                <input
                                    className="noiDungFormregis"
                                    onChange={(e) =>
                                        setsdtNguoiMua(e.target.value)
                                    }
                                    placeholder="Nhập số điện thoại"
                                />
                            </div>
                            <div className="containerTieuChiFormregis">
                                <div className="tieuChiFormregis">
                                    Họ Và Tên
                                </div>
                                <input
                                    className="noiDungFormregis"
                                    onChange={(e) =>
                                        sethoTenNguoiMua(e.target.value)
                                    }
                                    placeholder="Nhập họ và tên"
                                />
                            </div>

                            <div className="containerTieuChiFormregis">
                                <div className="tieuChiFormregis">Địa Chỉ</div>
                                <input
                                    className="noiDungFormregis"
                                    onChange={(e) =>
                                        setdcNguoiNMua(e.target.value)
                                    }
                                    placeholder="Nhập địa chỉ"
                                />
                            </div>
                            <div className="containerTieuChiFormregis">
                                <div className="tieuChiFormregis">
                                    Ghi Chú Thêm
                                </div>
                                <input
                                    className="noiDungFormregis"
                                    placeholder="Giao nhanh nhé Shop! ..."
                                    onChange={(e) =>
                                        setghiChuNguoiMua(e.target.value)
                                    }
                                />
                            </div>

                            {/* hhhhhhh */}
                            {/* <a href={`/shop/${idShop}`}> */}
                            <button
                                className="hoanThanh"
                                onClick={hoanThanhDonHang}
                            >
                                Hoàn Thành
                            </button>
                            {/* </a> */}
                            <div className="luuY">
                                Đăng kí tài khoản để lưu lại địa chỉ giúp mua
                                hàng nhanh hơn vào các lần sau!
                            </div>
                            {/* <div className="luuY2">
                                Đặc Biệt: Tặng ngẫu nhiên 10k - 100k Gold khi
                                đăng kí tài khoản mới!
                            </div> */}
                            <a
                                className="dangkingay"
                                href={`/shop/dang-ki/${idShop}`}
                            >
                                Đăng Kí Ngay
                            </a>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};
export default ChiTietSanPham;
