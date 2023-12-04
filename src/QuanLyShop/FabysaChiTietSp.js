import "./FabysaChiTietSp.scss";
import CommonUtils from "../component/CommonUtils";
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
const FabysaChiTietSp = () => {
    const { userId, spId } = useParams();
    console.log("useParam", useParams());
    const user = useSelector((state) => state.auth.login.currentUser);
    const myDetail = useSelector((state) => state.post.post?.myDetail);
    console.log("myDetail", myDetail);
    const ttShop = useSelector((state) => state.ttShop.ttShop.ttShop?.shop);
    const allSanPham = useSelector(
        (state) => state.sanPham.sanPham.allsanPham?.allSanpham
    );
    const [datHang, setdatHang] = useState(0);
    const thongTinSp = allSanPham?.find((item) => item._id === spId);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (user && user.length !== 0) {
            getPost(user?._id, dispatch);
        }
    }, []);
    console.log("myDetail", myDetail);
    useEffect(() => {
        const user = userId;

        getSanPham(user, dispatch);
    }, []);
    console.log("sthongTinSppId", thongTinSp);
    // thongtindonHang
    const [slSP, setslSP] = useState(1);
    const [thanhTien, setthanhTien] = useState(thongTinSp?.giaKhuyenMai * slSP);

    const [soTienCanTT, setsoTienCanTT] = useState(thanhTien);
    const [phuongThucTT, setphuongThucTT] = useState(
        "Thanh Toán Khi Nhận Hàng"
    );
    const [sdtNguoiMua, setsdtNguoiMua] = useState();
    const [hoTenNguoiMua, sethoTenNguoiMua] = useState();

    const [dcNguoiNMua, setdcNguoiNMua] = useState();
    console.log("slSP", slSP);
    const [ghiChuNguoiMua, setghiChuNguoiMua] = useState("Giao sớm nhé Shop!");

    const hoanThanhDonHang = () => {
        try {
            const newDonHang = {
                tenSp: thongTinSp?.TenSanPham,
                linkSp: `/fabysa/${userId}/${spId}`,
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
                affiliate: thongTinSp?.user,
                hoahongCTV: thongTinSp?.hoahongCTV,
                // nguoi ban
                giamTru: 0,
                trangThaiDH: 1,
                user: "fabysa",
            };
            console.log("newDonHang", newDonHang);
            registerDonHang(newDonHang, dispatch);
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        setthanhTien(thongTinSp?.giaKhuyenMai * slSP);
    }, [slSP]);
    // thongtindonHang

    console.log("sthongTinSppId", thongTinSp);
    const VND = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
    });

    console.log("thanhTien", thanhTien);

    // thongtindonHanguser
    const [slSP2, setslSP2] = useState(1);
    const [thanhTien2, setthanhTien2] = useState(
        thongTinSp?.giaKhuyenMai * slSP2
    );
    const [gold2, setgold2] = useState(myDetail?.cash);
    const [goldDaTT2, setgoldDaTT2] = useState(0);
    const [soTienCanTT2, setsoTienCanTT2] = useState(
        thongTinSp?.giaKhuyenMai * slSP2
    );
    const [phuongThucTT2, setphuongThucTT2] = useState(
        "Thanh Toán Khi Nhận Hàng"
    );
    const [sdtNguoiMua2, setsdtNguoiMua2] = useState(myDetail?.soDienThoai);
    const [hoTenNguoiMua2, sethoTenNguoiMua2] = useState(myDetail?.hoTen);

    const [dcNguoiNMua2, setdcNguoiNMua2] = useState(
        `${myDetail?.thonXom} - ${myDetail?.xa} - ${myDetail?.huyen} - ${myDetail?.tinh}`
    );
    console.log("slSP", slSP);
    const [ghiChuNguoiMua2, setghiChuNguoiMua2] =
        useState("Giao sớm nhé Shop!");
    const hoanThanhDonHanguser = () => {
        if (gold2 > myDetail?.cash) {
            alert("Bạn đã nhập quá Gold đang có!");
        } else {
            if (goldDaTT2 > thanhTien2) {
                alert("Bạn đã nhập quá Tiền Cần thanh Toán!");
            } else {
                try {
                    const newDonHang = {
                        tenSp: thongTinSp?.TenSanPham,
                        linkSp: `/fabysa/${userId}/${spId}`,
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
                        affiliate: thongTinSp?.user,
                        hoahongCTV: thongTinSp?.hoahongCTV,
                        // nguoi ban

                        giamTru: 0,
                        trangThaiDH: 1,
                        user: "fabysa",
                    };
                    console.log("newDonHang", newDonHang);
                    registerDonHang(newDonHang, dispatch);
                    const idPost = myDetail?._id;
                    const newPost = {
                        cash: myDetail?.cash - goldDaTT2,
                    };
                    updatePost(newPost, idPost, dispatch);
                    const idShop = ttShop._id;
                    const newShop = {
                        cash: ttShop.cash + goldDaTT2,
                    };
                    console.log("newShop", newShop);
                    updatettShop(newShop, idShop, dispatch);
                } catch (err) {
                    console.log(err);
                }
            }
        }
    };
    useEffect(() => {
        setthanhTien2(thongTinSp?.giaKhuyenMai * slSP2);
        setsoTienCanTT2(thongTinSp?.giaKhuyenMai * slSP2);
    }, [slSP2]);
    useEffect(() => {
        setsoTienCanTT2(thongTinSp?.giaKhuyenMai * slSP2 - goldDaTT2);
        if (goldDaTT2 > myDetail?.cash) {
            alert("Bạn đã nhập quá Gold đang có!");
        }
        if (goldDaTT2 > thanhTien2) {
            alert("Bạn đã nhập quá Tiền Cần thanh Toán!");
        }
    }, [goldDaTT2]);
    // thongtindonHanguser

    return (
        <div className="chitietsp-datHang-fabysa">
            {/* Chi Tiet San Pham */}

            {+datHang === 0 ? (
                <div className="container-FabysaChiTietSpTo">
                    <div className="container-FabysaChiTietSp">
                        <div>
                            <a className="close" href={`/fabysa/${userId}`}>
                                Close
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
                            <div className="tenShop">{thongTinSp?.TenShop}</div>
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
                    {/* Co User */}
                    {myDetail && myDetail !== 0 ? (
                        <div className="datHang-container">
                            <a className="close" href={`/fabysa/${userId}`}>
                                Close
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
                            <div className="GiaSanPham">
                                <div className="donGia">
                                    <div>Đơn Giá</div>
                                    <div>
                                        {" "}
                                        {VND.format(thongTinSp?.giaKhuyenMai)}
                                    </div>
                                </div>
                                <div className="soLuong">
                                    <div>Số Lượng</div>
                                    <input
                                        onChange={(e) =>
                                            setslSP2(e.target.value)
                                        }
                                        placeholder={slSP}
                                    />
                                </div>
                                <div className="thanhTien">
                                    <div>Thành Tiền</div>
                                    <div>{thanhTien2}</div>
                                </div>
                            </div>

                            <div className="gold">
                                <div>
                                    <div className="taiKhoanGold">
                                        Tài Khoản Gold
                                    </div>
                                    <div className="soGold">{gold2} Gold</div>
                                </div>
                                <div>
                                    <div>Thanh Toán Bằng Gold</div>
                                    <input
                                        onChange={(e) =>
                                            setgoldDaTT2(e.target.value)
                                        }
                                        placeholder="Nhập số Gold"
                                    />
                                </div>
                            </div>
                            <div className="thanhToansoTien">
                                <div className="canThanhToan">
                                    Cần Thanh Toán Số Tiền:
                                </div>
                                <div className="soTienCanThanhToan">
                                    {soTienCanTT2} vnd
                                </div>
                            </div>
                            <div className="phuongThucThanhToan">
                                <div className="chonthanhToan">Thanh Toán</div>
                                <select
                                    onChange={(e) =>
                                        setphuongThucTT2(e.target.value)
                                    }
                                    className="phuongThucThanhToan"
                                >
                                    <option value="">---Mời Chọn---</option>
                                    <option>Thanh Toán Khi Nhận</option>
                                    <option>Chuyển Khoản Ngay</option>
                                </select>
                            </div>
                            <div className="thongTinNhanHang">
                                Thông Tin Người Nhận
                            </div>
                            <div className="hoTen-sdt">
                                <div className="sdt">
                                    <div>Số Điện Thoại</div>
                                    <input
                                        onChange={(e) =>
                                            setsdtNguoiMua2(e.target.value)
                                        }
                                        placeholder={sdtNguoiMua2}
                                    />
                                </div>
                                <div className="hoTen">
                                    <div>Họ Và Tên</div>
                                    <input
                                        onChange={(e) =>
                                            sethoTenNguoiMua2(e.target.value)
                                        }
                                        placeholder={hoTenNguoiMua2}
                                    />
                                </div>
                            </div>
                            <div className="diaChi">
                                <div>Địa Chỉ :</div>
                                <input
                                    onChange={(e) =>
                                        setdcNguoiNMua2(e.target.value)
                                    }
                                    placeholder={dcNguoiNMua2}
                                />
                            </div>
                            <div className="ghiChu">
                                <div>Ghi Chú Thêm :</div>
                                <input
                                    placeholder={ghiChuNguoiMua2}
                                    onChange={(e) =>
                                        ghiChuNguoiMua2(e.target.value)
                                    }
                                />
                            </div>
                            <button
                                className="hoanThanh"
                                onClick={hoanThanhDonHanguser}
                            >
                                Hoàn Thành
                            </button>
                        </div>
                    ) : (
                        <div className="datHang-container">
                            <a className={"close"} href={`/fabysa/${spId}`}>
                                Close
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
                            <div className="GiaSanPham">
                                <div className="donGia">
                                    <div>Đơn Giá</div>
                                    <div>
                                        {" "}
                                        {VND.format(thongTinSp?.giaKhuyenMai)}
                                    </div>
                                </div>
                                <div className="soLuong">
                                    <div>Số Lượng</div>
                                    <input
                                        onChange={(e) =>
                                            setslSP(e.target.value)
                                        }
                                        placeholder={slSP}
                                    />
                                </div>
                                <div className="thanhTien">
                                    <div>Thành Tiền</div>
                                    <div>{thanhTien}</div>
                                </div>
                            </div>

                            <div className="phuongThucThanhToan">
                                <div className="chonthanhToan">Thanh Toán</div>
                                <select
                                    onChange={(e) =>
                                        setphuongThucTT(e.target.value)
                                    }
                                    className="phuongThucThanhToan"
                                >
                                    <option value="">---Mời Chọn---</option>
                                    <option>Thanh Toán Khi Nhận</option>
                                    <option>Chuyển Khoản Ngay</option>
                                    <option>Thanh Toán Bằng Gold</option>
                                </select>
                            </div>

                            <div className="thongTinNhanHang">
                                Thông Tin Người Nhận
                            </div>
                            <div className="hoTen-sdt">
                                <div className="sdt">
                                    <div>Số Điện Thoại</div>
                                    <input
                                        onChange={(e) =>
                                            setsdtNguoiMua(e.target.value)
                                        }
                                        placeholder="Nhập số điện thoại"
                                    />
                                </div>
                                <div className="hoTen">
                                    <div>Họ Và Tên</div>
                                    <input
                                        onChange={(e) =>
                                            sethoTenNguoiMua(e.target.value)
                                        }
                                        placeholder="Nhập Họ và Tên"
                                    />
                                </div>
                            </div>
                            <div className="diaChi">
                                <div>Địa Chỉ :</div>
                                <input
                                    onChange={(e) =>
                                        setdcNguoiNMua(e.target.value)
                                    }
                                    placeholder="Nhập địa chỉ"
                                />
                            </div>
                            <div className="ghiChu">
                                <div>Ghi Chú Thêm :</div>
                                <input
                                    placeholder="Giao nhanh nhé Shop! ..."
                                    onChange={(e) =>
                                        setghiChuNguoiMua(e.target.value)
                                    }
                                />
                            </div>
                            <button
                                className="hoanThanh"
                                onClick={hoanThanhDonHang}
                            >
                                Hoàn Thành
                            </button>
                            <div className="gold">
                                Đăng kí tài khoản để lưu lại địa chỉ giúp mua
                                hàng nhanh hơn vào các lần sau!
                            </div>
                            <div>
                                Đặc Biệt: Tặng ngẫu nhiên 10k - 100k Gold khi
                                đăng kí tài khoản mới!
                            </div>
                            <a href="/dang-ki">Đăng Kí Ngay</a>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};
export default FabysaChiTietSp;
