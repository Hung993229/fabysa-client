import "./FabysaShop.scss";
import facebookLogo from "../assets/images/Facebook_Logo.png";
import zaloLogo from "../assets/images/zaloLogo.png";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import { getttShop, getSanPham, getPost } from "../redux/apiRequest";
import { useEffect } from "react";
const FabysaShop = () => {
    const user = useSelector((state) => state.auth.login.currentUser);
    const myDetail = useSelector((state) => state.post.post?.myDetail);
    console.log("myDetail", myDetail);
    const ttShop = useSelector((state) => state.ttShop.ttShop.ttShop?.shop);
    const allSanPham = useSelector(
        (state) => state.sanPham.sanPham.allsanPham?.allSanpham
    );
    const [tuVanVaThongTin, settuVanVaThongTin] = useState(0);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { idShop } = useParams();
    const [iddetailSanPham, setiddetailSanPham] = useState(0);

    const item = allSanPham?.find((item) => item._id === iddetailSanPham);
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
    const VND = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
    });
    // phan loai san pham
    const allSanPhamDan = allSanPham?.filter(
        (item) => item.sanPhamDan === "Sản Phẩm Dẫn"
    );
    const allSanPham1 = allSanPham?.filter(
        (item) => item.nhomSanPham === "Thời Trang & Phụ Kiện Nam"
    );
    const allSanPham2 = allSanPham?.filter(
        (item) => item.nhomSanPham === "Thời Trang & Phụ Kiện Nữ"
    );
    const allSanPham3 = allSanPham?.filter(
        (item) => item.nhomSanPham === "Thời Trang & Phụ Kiện Trẻ Em"
    );
    const allSanPham4 = allSanPham?.filter(
        (item) => item.nhomSanPham === "Đồng Hồ Nam"
    );
    const allSanPham5 = allSanPham?.filter(
        (item) => item.nhomSanPham === "Đồng Hồ Nữ"
    );
    const allSanPham6 = allSanPham?.filter(
        (item) => item.nhomSanPham === "Điện Thoại & Phụ Kiện"
    );
    const allSanPham7 = allSanPham?.filter(
        (item) => item.nhomSanPham === "Máy Tính & Laptop"
    );
    const allSanPham8 = allSanPham?.filter(
        (item) => item.nhomSanPham === "Máy Ảnh & Máy Quay Phim"
    );
    const allSanPham9 = allSanPham?.filter(
        (item) => item.nhomSanPham === "Thiết Bị Gia Dụng"
    );
    const allSanPham10 = allSanPham?.filter(
        (item) => item.nhomSanPham === "Ô Tô & Xe Máy & Xe Đạp"
    );
    const allSanPham11 = allSanPham?.filter(
        (item) => item.nhomSanPham === "Sức Khỏe & Làm Đẹp"
    );
    const allSanPham12 = allSanPham?.filter(
        (item) => item.nhomSanPham === "Thiết Bị Y Tế"
    );
    const allSanPham13 = allSanPham?.filter(
        (item) => item.nhomSanPham === "Thể Thao & Du Lịch & Sự Kiện"
    );
    const allSanPham14 = allSanPham?.filter(
        (item) => item.nhomSanPham === "Nhà Sách Online"
    );
    const allSanPham15 = allSanPham?.filter(
        (item) => item.nhomSanPham === "Hoa Quả & Thực Phẩm"
    );
    const allSanPham16 = allSanPham?.filter(
        (item) => item.nhomSanPham === "Bách Hóa Online"
    );
    const allSanPham17 = allSanPham?.filter(
        (item) => item.nhomSanPham === "Dịch Vụ KHác"
    );
    // phan loai san pham
    console.log("allSanPham1", allSanPham1);
    return (
        <div>
            <div className="shop">
                <div>
                    <img src={ttShop?.Banner} className="banner-container" />
                </div>
                <div className="tenCuaHang">{ttShop?.TenShop}</div>
                <div className="slogan">{ttShop?.sloganShop}</div>

                <div className="tuVan-gioiThieu">
                    <a href="/fabysa">
                        <button className="tuVan">Săn Sale</button>
                    </a>
                    <button
                        className="gioiThieu"
                        onClick={() => settuVanVaThongTin(1)}
                    >
                        Giới Thiệu
                    </button>
                </div>
                {tuVanVaThongTin === 1 && (
                    <div className="gioiThieuChiTiet">
                        <div className="tenCuaHang2">{ttShop?.TenShop}</div>
                        <div className="dc">Địa Chỉ: {ttShop?.dcShop}</div>
                        <div className="sdt">
                            Số Điện Thoại: {ttShop?.sdtShop}
                        </div>

                        <div className="sdt">
                            Quý Khách có thắc mắc hoặc cần tư vấn gì có thể nhắn
                            tin 24/7 <br /> qua Zalo, Facebook bên dưới!
                        </div>
                        <div className="mxh">
                            <div className="zalo">
                                <a href={ttShop?.linkZalo} target="_blank">
                                    <img src={zaloLogo} className="zalo" />
                                </a>
                            </div>
                            <div className="facebook">
                                <a href={ttShop?.linkFacebook} target="_blank">
                                    <img
                                        src={facebookLogo}
                                        className="facebook"
                                    />
                                </a>
                            </div>
                        </div>
                        <div className="sdt">{ttShop?.sloganShop}</div>
                        <button
                            className="closeGioiThieu"
                            onClick={() => settuVanVaThongTin(0)}
                        >
                            Close
                        </button>
                    </div>
                )}

                <div className="sanPham-shop">
                    <div className="nhomSanPham-sanPham">
                        <div className="nhomSanPham">Top Sản Phẩm Bán Chạy</div>
                        <div className="sanPham-container">
                            {allSanPhamDan &&
                                allSanPhamDan?.map((item) => {
                                    return (
                                        <div key={item._id} className="sanPham">
                                            <a
                                                href={`/fabysa/${idShop}/${item._id}`}
                                            >
                                                <div>
                                                    <img
                                                        src={item?.AnhSanPham}
                                                        className="anhSanPham"
                                                        alt="timtim"
                                                    />

                                                    <div className="tenSanPham">
                                                        {item?.TenSanPham}
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

                                                    <button className="muaHang">
                                                        XEM CHI TIẾT
                                                    </button>
                                                    <div className="tenShop">
                                                        {item?.TenShop}
                                                    </div>
                                                    <div className="viTriSanPham">
                                                        <i className="fa-solid fa-location-dot"></i>
                                                        <div className="diachisanpham">
                                                            {item?.xa}
                                                        </div>
                                                        <div className="diachisanpham">
                                                            {item?.huyen}
                                                        </div>
                                                        <div className="diachisanpham">
                                                            {item?.tinh}
                                                        </div>
                                                    </div>
                                                </div>
                                            </a>
                                        </div>
                                    );
                                })}
                        </div>
                    </div>
                    {/* 1 */}
                    {allSanPham1 && allSanPham1.length !== 0 ? (
                        <div className="nhomSanPham-sanPham">
                            <div className="nhomSanPham">
                                {allSanPham1 && allSanPham1[0]?.nhomSanPham}
                            </div>
                            <div className="sanPham-container">
                                {allSanPham1 &&
                                    allSanPham1?.map((item) => {
                                        return (
                                            <div
                                                key={item._id}
                                                className="sanPham"
                                            >
                                                <a
                                                    href={`/fabysa/${idShop}/${item._id}`}
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
                                                            {item?.TenSanPham}
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

                                                        <button className="muaHang">
                                                            XEM CHI TIẾT
                                                        </button>
                                                        <div className="tenShop">
                                                            {item?.TenShop}
                                                        </div>
                                                        <div className="viTriSanPham">
                                                            <i className="fa-solid fa-location-dot"></i>
                                                            <div className="diachisanpham">
                                                                {item?.xa}
                                                            </div>
                                                            <div className="diachisanpham">
                                                                {item?.huyen}
                                                            </div>
                                                            <div className="diachisanpham">
                                                                {item?.tinh}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </a>
                                            </div>
                                        );
                                    })}
                            </div>
                        </div>
                    ) : (
                        <></>
                    )}

                    {/* 2 */}
                    {allSanPham2 && allSanPham2.length !== 0 ? (
                        <div className="nhomSanPham-sanPham">
                            <div className="nhomSanPham">
                                {allSanPham2 && allSanPham2[0]?.nhomSanPham}
                            </div>
                            <div className="sanPham-container">
                                {allSanPham2 &&
                                    allSanPham2?.map((item) => {
                                        return (
                                            <div
                                                key={item._id}
                                                className="sanPham"
                                            >
                                                <a
                                                    href={`/fabysa/${idShop}/${item._id}`}
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
                                                            {item?.TenSanPham}
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

                                                        <button className="muaHang">
                                                            XEM CHI TIẾT
                                                        </button>
                                                        <div className="tenShop">
                                                            {item?.TenShop}
                                                        </div>
                                                        <div className="viTriSanPham">
                                                            <i className="fa-solid fa-location-dot"></i>
                                                            <div className="diachisanpham">
                                                                {item?.xa}
                                                            </div>
                                                            <div className="diachisanpham">
                                                                {item?.huyen}
                                                            </div>
                                                            <div className="diachisanpham">
                                                                {item?.tinh}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </a>
                                            </div>
                                        );
                                    })}
                            </div>
                        </div>
                    ) : (
                        <></>
                    )}
                    {/* 3 */}
                    {allSanPham3 && allSanPham3.length !== 0 ? (
                        <div className="nhomSanPham-sanPham">
                            <div className="nhomSanPham">
                                {allSanPham3 && allSanPham3[0]?.nhomSanPham}
                            </div>
                            <div className="sanPham-container">
                                {allSanPham3 &&
                                    allSanPham3?.map((item) => {
                                        return (
                                            <div
                                                key={item._id}
                                                className="sanPham"
                                            >
                                                <a
                                                    href={`/fabysa/${idShop}/${item._id}`}
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
                                                            {item?.TenSanPham}
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

                                                        <button className="muaHang">
                                                            XEM CHI TIẾT
                                                        </button>
                                                        <div className="tenShop">
                                                            {item?.TenShop}
                                                        </div>
                                                        <div className="viTriSanPham">
                                                            <i className="fa-solid fa-location-dot"></i>
                                                            <div className="diachisanpham">
                                                                {item?.xa}
                                                            </div>
                                                            <div className="diachisanpham">
                                                                {item?.huyen}
                                                            </div>
                                                            <div className="diachisanpham">
                                                                {item?.tinh}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </a>
                                            </div>
                                        );
                                    })}
                            </div>
                        </div>
                    ) : (
                        <></>
                    )}
                    {/* 4 */}
                    {allSanPham4 && allSanPham4.length !== 0 ? (
                        <div className="nhomSanPham-sanPham">
                            <div className="nhomSanPham">
                                {allSanPham4 && allSanPham4[0]?.nhomSanPham}
                            </div>
                            <div className="sanPham-container">
                                {allSanPham4 &&
                                    allSanPham4?.map((item) => {
                                        return (
                                            <div
                                                key={item._id}
                                                className="sanPham"
                                            >
                                                <a
                                                    href={`/fabysa/${idShop}/${item._id}`}
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
                                                            {item?.TenSanPham}
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

                                                        <button className="muaHang">
                                                            XEM CHI TIẾT
                                                        </button>
                                                        <div className="tenShop">
                                                            {item?.TenShop}
                                                        </div>
                                                        <div className="viTriSanPham">
                                                            <i className="fa-solid fa-location-dot"></i>
                                                            <div className="diachisanpham">
                                                                {item?.xa}
                                                            </div>
                                                            <div className="diachisanpham">
                                                                {item?.huyen}
                                                            </div>
                                                            <div className="diachisanpham">
                                                                {item?.tinh}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </a>
                                            </div>
                                        );
                                    })}
                            </div>
                        </div>
                    ) : (
                        <></>
                    )}
                    {/* 5 */}
                    {allSanPham5 && allSanPham5.length !== 0 ? (
                        <div className="nhomSanPham-sanPham">
                            <div className="nhomSanPham">
                                {allSanPham5 && allSanPham5[0]?.nhomSanPham}
                            </div>
                            <div className="sanPham-container">
                                {allSanPham5 &&
                                    allSanPham5?.map((item) => {
                                        return (
                                            <div
                                                key={item._id}
                                                className="sanPham"
                                            >
                                                <a
                                                    href={`/fabysa/${idShop}/${item._id}`}
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
                                                            {item?.TenSanPham}
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

                                                        <button className="muaHang">
                                                            XEM CHI TIẾT
                                                        </button>
                                                        <div className="tenShop">
                                                            {item?.TenShop}
                                                        </div>
                                                        <div className="viTriSanPham">
                                                            <i className="fa-solid fa-location-dot"></i>
                                                            <div className="diachisanpham">
                                                                {item?.xa}
                                                            </div>
                                                            <div className="diachisanpham">
                                                                {item?.huyen}
                                                            </div>
                                                            <div className="diachisanpham">
                                                                {item?.tinh}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </a>
                                            </div>
                                        );
                                    })}
                            </div>
                        </div>
                    ) : (
                        <></>
                    )}
                    {/* 6 */}
                    {allSanPham6 && allSanPham6.length !== 0 ? (
                        <div className="nhomSanPham-sanPham">
                            <div className="nhomSanPham">
                                {allSanPham6 && allSanPham6[0]?.nhomSanPham}
                            </div>
                            <div className="sanPham-container">
                                {allSanPham6 &&
                                    allSanPham6?.map((item) => {
                                        return (
                                            <div
                                                key={item._id}
                                                className="sanPham"
                                            >
                                                <a
                                                    href={`/fabysa/${idShop}/${item._id}`}
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
                                                            {item?.TenSanPham}
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

                                                        <button className="muaHang">
                                                            XEM CHI TIẾT
                                                        </button>
                                                        <div className="tenShop">
                                                            {item?.TenShop}
                                                        </div>
                                                        <div className="viTriSanPham">
                                                            <i className="fa-solid fa-location-dot"></i>
                                                            <div className="diachisanpham">
                                                                {item?.xa}
                                                            </div>
                                                            <div className="diachisanpham">
                                                                {item?.huyen}
                                                            </div>
                                                            <div className="diachisanpham">
                                                                {item?.tinh}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </a>
                                            </div>
                                        );
                                    })}
                            </div>
                        </div>
                    ) : (
                        <></>
                    )}
                    {/* 7 */}

                    {allSanPham7 && allSanPham7.length !== 0 ? (
                        <div className="nhomSanPham-sanPham">
                            <div className="nhomSanPham">
                                {allSanPham7 && allSanPham7[0]?.nhomSanPham}
                            </div>
                            <div className="sanPham-container">
                                {allSanPham7 &&
                                    allSanPham7?.map((item) => {
                                        return (
                                            <div
                                                key={item._id}
                                                className="sanPham"
                                            >
                                                <a
                                                    href={`/fabysa/${idShop}/${item._id}`}
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
                                                            {item?.TenSanPham}
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

                                                        <button className="muaHang">
                                                            XEM CHI TIẾT
                                                        </button>
                                                        <div className="tenShop">
                                                            {item?.TenShop}
                                                        </div>
                                                        <div className="viTriSanPham">
                                                            <i className="fa-solid fa-location-dot"></i>
                                                            <div className="diachisanpham">
                                                                {item?.xa}
                                                            </div>
                                                            <div className="diachisanpham">
                                                                {item?.huyen}
                                                            </div>
                                                            <div className="diachisanpham">
                                                                {item?.tinh}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </a>
                                            </div>
                                        );
                                    })}
                            </div>
                        </div>
                    ) : (
                        <></>
                    )}
                    {/* 8 */}

                    {allSanPham8 && allSanPham8.length !== 0 ? (
                        <div className="nhomSanPham-sanPham">
                            <div className="nhomSanPham">
                                {allSanPham8 && allSanPham8[0]?.nhomSanPham}
                            </div>
                            <div className="sanPham-container">
                                {allSanPham8 &&
                                    allSanPham8?.map((item) => {
                                        return (
                                            <div
                                                key={item._id}
                                                className="sanPham"
                                            >
                                                <a
                                                    href={`/fabysa/${idShop}/${item._id}`}
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
                                                            {item?.TenSanPham}
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

                                                        <button className="muaHang">
                                                            XEM CHI TIẾT
                                                        </button>
                                                        <div className="tenShop">
                                                            {item?.TenShop}
                                                        </div>
                                                        <div className="viTriSanPham">
                                                            <i className="fa-solid fa-location-dot"></i>
                                                            <div className="diachisanpham">
                                                                {item?.xa}
                                                            </div>
                                                            <div className="diachisanpham">
                                                                {item?.huyen}
                                                            </div>
                                                            <div className="diachisanpham">
                                                                {item?.tinh}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </a>
                                            </div>
                                        );
                                    })}
                            </div>
                        </div>
                    ) : (
                        <></>
                    )}
                    {/* 9 */}

                    {allSanPham9 && allSanPham9.length !== 0 ? (
                        <div className="nhomSanPham-sanPham">
                            <div className="nhomSanPham">
                                {allSanPham9 && allSanPham9[0]?.nhomSanPham}
                            </div>
                            <div className="sanPham-container">
                                {allSanPham9 &&
                                    allSanPham9?.map((item) => {
                                        return (
                                            <div
                                                key={item._id}
                                                className="sanPham"
                                            >
                                                <a
                                                    href={`/fabysa/${idShop}/${item._id}`}
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
                                                            {item?.TenSanPham}
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

                                                        <button className="muaHang">
                                                            XEM CHI TIẾT
                                                        </button>
                                                        <div className="tenShop">
                                                            {item?.TenShop}
                                                        </div>
                                                        <div className="viTriSanPham">
                                                            <i className="fa-solid fa-location-dot"></i>
                                                            <div className="diachisanpham">
                                                                {item?.xa}
                                                            </div>
                                                            <div className="diachisanpham">
                                                                {item?.huyen}
                                                            </div>
                                                            <div className="diachisanpham">
                                                                {item?.tinh}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </a>
                                            </div>
                                        );
                                    })}
                            </div>
                        </div>
                    ) : (
                        <></>
                    )}
                    {/* 10 */}

                    {allSanPham10 && allSanPham10.length !== 0 ? (
                        <div className="nhomSanPham-sanPham">
                            <div className="nhomSanPham">
                                {allSanPham10 && allSanPham10[0]?.nhomSanPham}
                            </div>
                            <div className="sanPham-container">
                                {allSanPham10 &&
                                    allSanPham10?.map((item) => {
                                        return (
                                            <div
                                                key={item._id}
                                                className="sanPham"
                                            >
                                                <a
                                                    href={`/fabysa/${idShop}/${item._id}`}
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
                                                            {item?.TenSanPham}
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

                                                        <button className="muaHang">
                                                            XEM CHI TIẾT
                                                        </button>
                                                        <div className="tenShop">
                                                            {item?.TenShop}
                                                        </div>
                                                        <div className="viTriSanPham">
                                                            <i className="fa-solid fa-location-dot"></i>
                                                            <div className="diachisanpham">
                                                                {item?.xa}
                                                            </div>
                                                            <div className="diachisanpham">
                                                                {item?.huyen}
                                                            </div>
                                                            <div className="diachisanpham">
                                                                {item?.tinh}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </a>
                                            </div>
                                        );
                                    })}
                            </div>
                        </div>
                    ) : (
                        <></>
                    )}
                    {/* 11 */}

                    {allSanPham11 && allSanPham11.length !== 0 ? (
                        <div className="nhomSanPham-sanPham">
                            <div className="nhomSanPham">
                                {allSanPham11 && allSanPham11[0]?.nhomSanPham}
                            </div>
                            <div className="sanPham-container">
                                {allSanPham11 &&
                                    allSanPham11?.map((item) => {
                                        return (
                                            <div
                                                key={item._id}
                                                className="sanPham"
                                            >
                                                <a
                                                    href={`/fabysa/${idShop}/${item._id}`}
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
                                                            {item?.TenSanPham}
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

                                                        <button className="muaHang">
                                                            XEM CHI TIẾT
                                                        </button>
                                                        <div className="tenShop">
                                                            {item?.TenShop}
                                                        </div>
                                                        <div className="viTriSanPham">
                                                            <i className="fa-solid fa-location-dot"></i>
                                                            <div className="diachisanpham">
                                                                {item?.xa}
                                                            </div>
                                                            <div className="diachisanpham">
                                                                {item?.huyen}
                                                            </div>
                                                            <div className="diachisanpham">
                                                                {item?.tinh}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </a>
                                            </div>
                                        );
                                    })}
                            </div>
                        </div>
                    ) : (
                        <></>
                    )}
                    {/* 12 */}

                    {allSanPham12 && allSanPham12.length !== 0 ? (
                        <div className="nhomSanPham-sanPham">
                            <div className="nhomSanPham">
                                {allSanPham12 && allSanPham12[0]?.nhomSanPham}
                            </div>
                            <div className="sanPham-container">
                                {allSanPham12 &&
                                    allSanPham12?.map((item) => {
                                        return (
                                            <div
                                                key={item._id}
                                                className="sanPham"
                                            >
                                                <a
                                                    href={`/fabysa/${idShop}/${item._id}`}
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
                                                            {item?.TenSanPham}
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

                                                        <button className="muaHang">
                                                            XEM CHI TIẾT
                                                        </button>
                                                        <div className="tenShop">
                                                            {item?.TenShop}
                                                        </div>
                                                        <div className="viTriSanPham">
                                                            <i className="fa-solid fa-location-dot"></i>
                                                            <div className="diachisanpham">
                                                                {item?.xa}
                                                            </div>
                                                            <div className="diachisanpham">
                                                                {item?.huyen}
                                                            </div>
                                                            <div className="diachisanpham">
                                                                {item?.tinh}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </a>
                                            </div>
                                        );
                                    })}
                            </div>
                        </div>
                    ) : (
                        <></>
                    )}
                    {/* 13 */}

                    {allSanPham13 && allSanPham13.length !== 0 ? (
                        <div className="nhomSanPham-sanPham">
                            <div className="nhomSanPham">
                                {allSanPham13 && allSanPham13[0]?.nhomSanPham}
                            </div>
                            <div className="sanPham-container">
                                {allSanPham13 &&
                                    allSanPham13?.map((item) => {
                                        return (
                                            <div
                                                key={item._id}
                                                className="sanPham"
                                            >
                                                <a
                                                    href={`/fabysa/${idShop}/${item._id}`}
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
                                                            {item?.TenSanPham}
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

                                                        <button className="muaHang">
                                                            XEM CHI TIẾT
                                                        </button>
                                                        <div className="tenShop">
                                                            {item?.TenShop}
                                                        </div>
                                                        <div className="viTriSanPham">
                                                            <i className="fa-solid fa-location-dot"></i>
                                                            <div className="diachisanpham">
                                                                {item?.xa}
                                                            </div>
                                                            <div className="diachisanpham">
                                                                {item?.huyen}
                                                            </div>
                                                            <div className="diachisanpham">
                                                                {item?.tinh}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </a>
                                            </div>
                                        );
                                    })}
                            </div>
                        </div>
                    ) : (
                        <></>
                    )}
                    {/* 14 */}

                    {allSanPham14 && allSanPham14.length !== 0 ? (
                        <div className="nhomSanPham-sanPham">
                            <div className="nhomSanPham">
                                {allSanPham14 && allSanPham14[0]?.nhomSanPham}
                            </div>
                            <div className="sanPham-container">
                                {allSanPham14 &&
                                    allSanPham14?.map((item) => {
                                        return (
                                            <div
                                                key={item._id}
                                                className="sanPham"
                                            >
                                                <a
                                                    href={`/fabysa/${idShop}/${item._id}`}
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
                                                            {item?.TenSanPham}
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

                                                        <button className="muaHang">
                                                            XEM CHI TIẾT
                                                        </button>
                                                        <div className="tenShop">
                                                            {item?.TenShop}
                                                        </div>
                                                        <div className="viTriSanPham">
                                                            <i className="fa-solid fa-location-dot"></i>
                                                            <div className="diachisanpham">
                                                                {item?.xa}
                                                            </div>
                                                            <div className="diachisanpham">
                                                                {item?.huyen}
                                                            </div>
                                                            <div className="diachisanpham">
                                                                {item?.tinh}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </a>
                                            </div>
                                        );
                                    })}
                            </div>
                        </div>
                    ) : (
                        <></>
                    )}
                    {/* 15 */}

                    {allSanPham15 && allSanPham15.length !== 0 ? (
                        <div className="nhomSanPham-sanPham">
                            <div className="nhomSanPham">
                                {allSanPham15 && allSanPham15[0]?.nhomSanPham}
                            </div>
                            <div className="sanPham-container">
                                {allSanPham15 &&
                                    allSanPham15?.map((item) => {
                                        return (
                                            <div
                                                key={item._id}
                                                className="sanPham"
                                            >
                                                <a
                                                    href={`/fabysa/${idShop}/${item._id}`}
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
                                                            {item?.TenSanPham}
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

                                                        <button className="muaHang">
                                                            XEM CHI TIẾT
                                                        </button>
                                                        <div className="tenShop">
                                                            {item?.TenShop}
                                                        </div>
                                                        <div className="viTriSanPham">
                                                            <i className="fa-solid fa-location-dot"></i>
                                                            <div className="diachisanpham">
                                                                {item?.xa}
                                                            </div>
                                                            <div className="diachisanpham">
                                                                {item?.huyen}
                                                            </div>
                                                            <div className="diachisanpham">
                                                                {item?.tinh}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </a>
                                            </div>
                                        );
                                    })}
                            </div>
                        </div>
                    ) : (
                        <></>
                    )}
                    {/* 16 */}

                    {allSanPham16 && allSanPham16.length !== 0 ? (
                        <div className="nhomSanPham-sanPham">
                            <div className="nhomSanPham">
                                {allSanPham16 && allSanPham16[0]?.nhomSanPham}
                            </div>
                            <div className="sanPham-container">
                                {allSanPham16 &&
                                    allSanPham16?.map((item) => {
                                        return (
                                            <div
                                                key={item._id}
                                                className="sanPham"
                                            >
                                                <a
                                                    href={`/fabysa/${idShop}/${item._id}`}
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
                                                            {item?.TenSanPham}
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

                                                        <button className="muaHang">
                                                            XEM CHI TIẾT
                                                        </button>
                                                        <div className="tenShop">
                                                            {item?.TenShop}
                                                        </div>
                                                        <div className="viTriSanPham">
                                                            <i className="fa-solid fa-location-dot"></i>
                                                            <div className="diachisanpham">
                                                                {item?.xa}
                                                            </div>
                                                            <div className="diachisanpham">
                                                                {item?.huyen}
                                                            </div>
                                                            <div className="diachisanpham">
                                                                {item?.tinh}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </a>
                                            </div>
                                        );
                                    })}
                            </div>
                        </div>
                    ) : (
                        <></>
                    )}
                    {/* 17 */}

                    {allSanPham17 && allSanPham17.length !== 0 ? (
                        <div className="nhomSanPham-sanPham">
                            <div className="nhomSanPham">
                                {allSanPham17 && allSanPham17[0]?.nhomSanPham}
                            </div>
                            <div className="sanPham-container">
                                {allSanPham17 &&
                                    allSanPham17?.map((item) => {
                                        return (
                                            <div
                                                key={item._id}
                                                className="sanPham"
                                            >
                                                <a
                                                    href={`/fabysa/${idShop}/${item._id}`}
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
                                                            {item?.TenSanPham}
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

                                                        <button className="muaHang">
                                                            XEM CHI TIẾT
                                                        </button>
                                                        <div className="tenShop">
                                                            {item?.TenShop}
                                                        </div>
                                                        <div className="viTriSanPham">
                                                            <i className="fa-solid fa-location-dot"></i>
                                                            <div className="diachisanpham">
                                                                {item?.xa}
                                                            </div>
                                                            <div className="diachisanpham">
                                                                {item?.huyen}
                                                            </div>
                                                            <div className="diachisanpham">
                                                                {item?.tinh}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </a>
                                            </div>
                                        );
                                    })}
                            </div>
                        </div>
                    ) : (
                        <></>
                    )}
                </div>
            </div>
        </div>
    );
};
export default FabysaShop;
