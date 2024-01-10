import "./TongKhoSi.scss";
import bannerShop from "../assets/images/bannerKhosi.jpg";
import facebookLogo from "../assets/images/Facebook_Logo.png";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getKhoTongSi, getPost, getAllttShop } from "../redux/apiRequest";
import { useEffect } from "react";
const TongKhoSi = () => {
    const user = useSelector((state) => state.auth.login?.currentUser);
    const myDetail = useSelector((state) => state.post.post?.myDetail);
    const allSanPham = useSelector(
        (state) => state.sanPham.sanPham.allsanPham?.allSanpham
    );
    const allShop = useSelector(
        (state) => state.ttShop.ttShop.allttShop?.AllShop
    );
    const [moihoptac, setmoihoptac] = useState(0);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (user && user.length !== 0) {
            getPost(user?._id, dispatch);
            getAllttShop(user?._id, dispatch);
        }
    }, []);
    useEffect(() => {
        if (myDetail && myDetail.length !== 0) {
            const huyen = myDetail?.huyen;

            getKhoTongSi(huyen, user?._id, dispatch);
        }
    }, []);
    const VND = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
    });
    // phan loai san pham
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
    console.log("myDetail", myDetail?.vaiTro);
    return (
        <div className="tongKhosi-container">
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
                    <div className="wecomeShop">--- TỔNG KHO GIÁ SỈ ---</div>
                    <div className="quyDoi">
                        Khởi Nghiệp Kinh Doanh Bền Vững Với Số Vốn Tối Thiểu
                    </div>
                    <div className="hoptac-sanpham">
                        <button
                            onClick={() => setmoihoptac(1)}
                            className="moihoptac"
                        >
                            Liên Hệ
                        </button>

                        <button
                            className="themSanPham"
                            onClick={() => setmoihoptac(2)}
                        >
                            Giới Thiệu
                        </button>
                    </div>

                    {+moihoptac === 1 ? (
                        <div>
                            <div>
                                Bạn mong muốn bắt đầu kinh doanh cùng
                                Fabysa.com?
                            </div>
                            <div>
                                <a
                                    href={`https://www.facebook.com/profile.php?id=61554188707999`}
                                    target="_blank"
                                >
                                    <img
                                        className="facebook"
                                        src={facebookLogo}
                                    />
                                </a>
                                <div>
                                    Hãy nhắn tin Fage Facebook trên với nội dung
                                    :
                                    <br />
                                    "Tư Vấn Khởi Nghiệp"
                                </div>
                                <button
                                    className="CloseShop"
                                    onClick={() => setmoihoptac(0)}
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    ) : (
                        <></>
                    )}
                    {+moihoptac === 2 ? (
                        <div>
                            <div>
                                - Đây là nơi đại lý, nhà bán hàng, có thể kết
                                nối với hàng nghìn <br /> Cộng Tác Viên kinh
                                doanh Online. <br />- Đây cũng là nơi hàng nghìn
                                Cộng Tác Viên kinh doanh online <br /> tiếp cận
                                được nguồn hàng nhanh chóng.
                            </div>
                            <button
                                className="CloseShop"
                                onClick={() => setmoihoptac(0)}
                            >
                                Close
                            </button>
                        </div>
                    ) : (
                        <></>
                    )}
                </div>
                {/* sanPham */}
                <div className="sanPham-shop">
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
                                                    href={`/tongkhosi/${item._id}`}
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

                                                            <div>
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
                                                        <div>Hoa Hồng CTV</div>
                                                        {!user || !myDetail ||
                                                        myDetail?.vaiTro ===
                                                            0 ? (
                                                            <div>
                                                                --- Đã Ẩn ---
                                                            </div>
                                                        ) : (
                                                            <div>
                                                                {VND.format(
                                                                    item?.hoahongCTV
                                                                )}
                                                            </div>
                                                        )}
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
                                                    href={`/tongkhosi/${item._id}`}
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
                                                        <div>
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
                                                        <div>Hoa Hồng CTV</div>
                                                        {!user || !myDetail ||
                                                        myDetail?.vaiTro ===
                                                            0 ? (
                                                            <div>
                                                                --- Đã Ẩn ---
                                                            </div>
                                                        ) : (
                                                            <div>
                                                                {VND.format(
                                                                    item?.hoahongCTV
                                                                )}
                                                            </div>
                                                        )}
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
                                                    href={`/tongkhosi/${item._id}`}
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
                                                        <div>Hoa Hồng CTV</div>
                                                        {!user || !myDetail ||
                                                        myDetail?.vaiTro ===
                                                            0 ? (
                                                            <div>
                                                                --- Đã Ẩn ---
                                                            </div>
                                                        ) : (
                                                            <div>
                                                                {VND.format(
                                                                    item?.hoahongCTV
                                                                )}
                                                            </div>
                                                        )}
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
                                                    href={`/tongkhosi/${item._id}`}
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
                                                        <div>Hoa Hồng CTV</div>
                                                        {!user || !myDetail ||
                                                        myDetail?.vaiTro ===
                                                            0 ? (
                                                            <div>
                                                                --- Đã Ẩn ---
                                                            </div>
                                                        ) : (
                                                            <div>
                                                                {VND.format(
                                                                    item?.hoahongCTV
                                                                )}
                                                            </div>
                                                        )}
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
                                                    href={`/tongkhosi/${item._id}`}
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
                                                        <div>Hoa Hồng CTV</div>
                                                        {!user || !myDetail ||
                                                        myDetail?.vaiTro ===
                                                            0 ? (
                                                            <div>
                                                                --- Đã Ẩn ---
                                                            </div>
                                                        ) : (
                                                            <div>
                                                                {VND.format(
                                                                    item?.hoahongCTV
                                                                )}
                                                            </div>
                                                        )}
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
                                                    href={`/tongkhosi/${item._id}`}
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
                                                        <div>Hoa Hồng CTV</div>
                                                        {!user || !myDetail ||
                                                        myDetail?.vaiTro ===
                                                            0 ? (
                                                            <div>
                                                                --- Đã Ẩn ---
                                                            </div>
                                                        ) : (
                                                            <div>
                                                                {VND.format(
                                                                    item?.hoahongCTV
                                                                )}
                                                            </div>
                                                        )}
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
                                                    href={`/tongkhosi/${item._id}`}
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
                                                        <div>Hoa Hồng CTV</div>
                                                        {!user || !myDetail ||
                                                        myDetail?.vaiTro ===
                                                            0 ? (
                                                            <div>
                                                                --- Đã Ẩn ---
                                                            </div>
                                                        ) : (
                                                            <div>
                                                                {VND.format(
                                                                    item?.hoahongCTV
                                                                )}
                                                            </div>
                                                        )}
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
                                                    href={`/tongkhosi/${item._id}`}
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
                                                        <div>Hoa Hồng CTV</div>
                                                        {!user || !myDetail ||
                                                        myDetail?.vaiTro ===
                                                            0 ? (
                                                            <div>
                                                                --- Đã Ẩn ---
                                                            </div>
                                                        ) : (
                                                            <div>
                                                                {VND.format(
                                                                    item?.hoahongCTV
                                                                )}
                                                            </div>
                                                        )}
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
                                                    href={`/tongkhosi/${item._id}`}
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
                                                        <div>Hoa Hồng CTV</div>
                                                        {!user || !myDetail ||
                                                        myDetail?.vaiTro ===
                                                            0 ? (
                                                            <div>
                                                                --- Đã Ẩn ---
                                                            </div>
                                                        ) : (
                                                            <div>
                                                                {VND.format(
                                                                    item?.hoahongCTV
                                                                )}
                                                            </div>
                                                        )}
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
                                                    href={`/tongkhosi/${item._id}`}
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
                                                        <div>Hoa Hồng CTV</div>
                                                        {!user || !myDetail ||
                                                        myDetail?.vaiTro ===
                                                            0 ? (
                                                            <div>
                                                                --- Đã Ẩn ---
                                                            </div>
                                                        ) : (
                                                            <div>
                                                                {VND.format(
                                                                    item?.hoahongCTV
                                                                )}
                                                            </div>
                                                        )}
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
                                                    href={`/tongkhosi/${item._id}`}
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
                                                        <div>Hoa Hồng CTV</div>
                                                        {!user || !myDetail ||
                                                        myDetail?.vaiTro ===
                                                            0 ? (
                                                            <div>
                                                                --- Đã Ẩn ---
                                                            </div>
                                                        ) : (
                                                            <div>
                                                                {VND.format(
                                                                    item?.hoahongCTV
                                                                )}
                                                            </div>
                                                        )}
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
                                                    href={`/tongkhosi/${item._id}`}
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
                                                        <div>Hoa Hồng CTV</div>
                                                        {!user || !myDetail ||
                                                        myDetail?.vaiTro ===
                                                            0 ? (
                                                            <div>
                                                                --- Đã Ẩn ---
                                                            </div>
                                                        ) : (
                                                            <div>
                                                                {VND.format(
                                                                    item?.hoahongCTV
                                                                )}
                                                            </div>
                                                        )}
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
                                                    href={`/tongkhosi/${item._id}`}
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
                                                        <div>Hoa Hồng CTV</div>
                                                        {!user || !myDetail ||
                                                        myDetail?.vaiTro ===
                                                            0 ? (
                                                            <div>
                                                                --- Đã Ẩn ---
                                                            </div>
                                                        ) : (
                                                            <div>
                                                                {VND.format(
                                                                    item?.hoahongCTV
                                                                )}
                                                            </div>
                                                        )}
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
                                                    href={`/tongkhosi/${item._id}`}
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
                                                        <div>Hoa Hồng CTV</div>
                                                        {!user || !myDetail ||
                                                        myDetail?.vaiTro ===
                                                            0 ? (
                                                            <div>
                                                                --- Đã Ẩn ---
                                                            </div>
                                                        ) : (
                                                            <div>
                                                                {VND.format(
                                                                    item?.hoahongCTV
                                                                )}
                                                            </div>
                                                        )}
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
                                                    href={`/tongkhosi/${item._id}`}
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
                                                        <div>Hoa Hồng CTV</div>
                                                        {!user || !myDetail ||
                                                        myDetail?.vaiTro ===
                                                            0 ? (
                                                            <div>
                                                                --- Đã Ẩn ---
                                                            </div>
                                                        ) : (
                                                            <div>
                                                                {VND.format(
                                                                    item?.hoahongCTV
                                                                )}
                                                            </div>
                                                        )}
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
                                                    href={`/tongkhosi/${item._id}`}
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
                                                        <div>Hoa Hồng CTV</div>
                                                        {!user || !myDetail ||
                                                        myDetail?.vaiTro ===
                                                            0 ? (
                                                            <div>
                                                                --- Đã Ẩn ---
                                                            </div>
                                                        ) : (
                                                            <div>
                                                                {VND.format(
                                                                    item?.hoahongCTV
                                                                )}
                                                            </div>
                                                        )}
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
                                                    href={`/tongkhosi/${item._id}`}
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
                                                        <div>Hoa Hồng CTV</div>
                                                        {!user || !myDetail ||
                                                        myDetail?.vaiTro ===
                                                            0 ? (
                                                            <div>
                                                                --- Đã Ẩn ---
                                                            </div>
                                                        ) : (
                                                            <div>
                                                                {VND.format(
                                                                    item?.hoahongCTV
                                                                )}
                                                            </div>
                                                        )}
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
export default TongKhoSi;
