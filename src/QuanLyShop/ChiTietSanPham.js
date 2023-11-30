import "./ChiTietSanPham.scss";
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
const ChiTietSanPham = () => {
    const user = useSelector((state) => state.auth.login.currentUser);
    const myDetail = useSelector((state) => state.post.post?.myDetail);
    console.log("myDetail", myDetail);
    const ttShop = useSelector((state) => state.ttShop.ttShop.ttShop?.shop);
    const allSanPham = useSelector(
        (state) => state.sanPham.sanPham.allsanPham?.allSanpham
    );
    const { userId, spId } = useParams();
    const [datHang, setdatHang] = useState(0);
    const thongTinSp = allSanPham?.find((item) => item._id === spId);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    // donHang
    const [slSP, setslSP] = useState(1);
    const [thanhTien, setthanhTien] = useState(thongTinSp?.giaKhuyenMai * slSP);
    const [gold, setgold] = useState(myDetail?.cash);
    const [soTienCanTT, setsoTienCanTT] = useState(thanhTien);
    const [phuongThucTT, setphuongThucTT] = useState();
    const [sdtNguoiMua, setsdtNguoiMua] = useState(myDetail?.soDienThoai);
    const [hoTenNguoiMua, sethoTenNguoiMua] = useState(myDetail?.hoTen);

    const [dcNguoiNMua, setdcNguoiNMua] = useState(
        `${myDetail?.thonXom} - ${myDetail?.xa} - ${myDetail?.huyen} - ${myDetail?.tinh}`
    );
    console.log("slSP", slSP);
    const [ghiChuNguoiMua, setghiChuNguoiMua] = useState();

    // donHang
    useEffect(() => {
        getPost(user?._id, dispatch);
    }, []);
    useEffect(() => {
        getttShop(userId, dispatch);
    }, []);
    useEffect(() => {
        const huyen = "";
        const user = userId;
        getSanPham(huyen, user, dispatch);
    }, []);
    console.log("sthongTinSppId", thongTinSp);
    const VND = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
    });
    useEffect(() => {
        setthanhTien(thongTinSp?.giaKhuyenMai * slSP);
    }, [slSP]);
    console.log("thanhTien", thanhTien);
    const handleTruGold = () => {
        setgold(0);
        setsoTienCanTT(thanhTien - gold);
    };
    const hoanThanhDonHang = () => {
        try {
            const newDonHang = {
                tenSp: thongTinSp?.TenSanPham,
                linkSp: `/${userId}/${spId}`,
                donGia: thongTinSp?.giaKhuyenMai,
                slSP: slSP,
                thanhTien: thanhTien,
                goldDaTT: myDetail?.cash,
                soTienCanTT: soTienCanTT,
                phuongThucTT: phuongThucTT,
                // nguoimua
                sdtNguoiMua: sdtNguoiMua,
                hoTenNguoiMua: hoTenNguoiMua,
                dcNguoiNMua: dcNguoiNMua,
                ghiChuNguoiMua: ghiChuNguoiMua,
                // Ctv
                userCTV: "",
                hhCTV: "",
                // hoahongSan
                phiSan: "",
                hhSan: "",
                // nguoi ban
                giamTru: "",
                trangThaiDH: 1,
                userShop: thongTinSp?.user,
            };
            console.log("newDonHang", newDonHang);
            registerDonHang(newDonHang, dispatch);
            const idPost = myDetail?._id;
            const newPost = {
                cash: 0,
            };
            updatePost(newPost, idPost, dispatch);
            const idShop = ttShop._id;
            const newShop = {
                cash: ttShop.cash + myDetail?.cash,
            };
            console.log("newShop", newShop);
            updatettShop(newShop, idShop, dispatch);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="chitietsp-datHang">
            {+datHang === 0 ? (
                <div className="container-ChiTietSanPhamTo">
                    <div className="tenCuaHang">{ttShop?.TenShop}</div>
                    <div className="container-ChiTietSanPham">
                        <div>
                            <NavLink className={"close"} to={`/shop/${userId}`}>
                                Close
                            </NavLink>
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
                    <div className="slogan">{ttShop?.sloganShop}</div>
                </div>
            ) : (
                <div className="datHang-container">
                    <div onClick={() => setdatHang(0)}> Close</div>
                    <div className="anhSanPham">
                        <img
                            src={thongTinSp?.AnhSanPham}
                            className="anhSanPham"
                            alt="timtim"
                        />
                    </div>
                    <div className="tenSanPham">{thongTinSp?.TenSanPham}</div>
                    <div className="GiaSanPham">
                        <div className="donGia">
                            <div>Đơn Giá</div>
                            <div> {VND.format(thongTinSp?.giaKhuyenMai)}</div>
                        </div>
                        <div className="soLuong">
                            <div>Số Lượng</div>
                            <input
                                onChange={(e) => setslSP(e.target.value)}
                                placeholder={slSP}
                            />
                        </div>
                        <div className="thanhTien">
                            <div>Thành Tiền</div>
                            <div>{thanhTien}</div>
                        </div>
                    </div>

                    <div className="gold">
                        <div className="taiKhoanGold">Tài Khoản Gold</div>
                        <div className="soGold">{gold} Gold</div>
                        <button
                            onClick={handleTruGold}
                            className="truVaoTienHang"
                        >
                            Trừ Vào Tiền Hàng
                        </button>
                    </div>
                    <div className="thanhToansoTien">
                        <div className="canThanhToan">
                            Cần Thanh Toán Số Tiền:
                        </div>
                        <div className="soTienCanThanhToan">
                            {soTienCanTT} vnd
                        </div>
                    </div>
                    <div className="phuongThucThanhToan">
                        <div className="chonthanhToan">Thanh Toán</div>
                        <select
                            onChange={(e) => setphuongThucTT(e.target.value)}
                            className="phuongThucThanhToan"
                        >
                            <option value="">---Mời Chọn---</option>
                            <option>Thanh Toán Khi Nhận</option>
                            <option>Chuyển Khoản Ngay</option>
                        </select>
                    </div>
                    <div className="thongTinNhanHang">Thông Tin Người Nhận</div>
                    <div className="hoTen-sdt">
                        <div className="sdt">
                            <div>Số Điện Thoại</div>
                            <input
                                onChange={(e) => setsdtNguoiMua(e.target.value)}
                                placeholder={sdtNguoiMua}
                            />
                        </div>
                        <div className="hoTen">
                            <div>Họ Và Tên</div>
                            <input
                                onChange={(e) =>
                                    sethoTenNguoiMua(e.target.value)
                                }
                                placeholder={hoTenNguoiMua}
                            />
                        </div>
                    </div>
                    <div className="diaChi">
                        <div>Địa Chỉ :</div>
                        <input
                            onChange={(e) => setdcNguoiNMua(e.target.value)}
                            placeholder={dcNguoiNMua}
                        />
                    </div>
                    <div className="ghiChu">
                        <div>Ghi Chú Thêm :</div>
                        <input
                            placeholder="......................."
                            onChange={(e) => e.target.value}
                        />
                    </div>
                    <button className="hoanThanh" onClick={hoanThanhDonHang}>
                        Hoàn Thành
                    </button>
                </div>
            )}
        </div>
    );
};
export default ChiTietSanPham;
