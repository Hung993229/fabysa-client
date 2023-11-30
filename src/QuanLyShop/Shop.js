import "./Shop.scss";
import CommonUtils from "../component/CommonUtils";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import { getttShop, getSanPham, getPost } from "../redux/apiRequest";
import { useEffect } from "react";
const Shop = () => {
    const user = useSelector((state) => state.auth.login.currentUser);
    const myDetail = useSelector((state) => state.post.post?.myDetail);
    console.log("myDetail", myDetail);
    const ttShop = useSelector((state) => state.ttShop.ttShop.ttShop?.shop);
    const allSanPham = useSelector(
        (state) => state.sanPham.sanPham.allsanPham?.allSanpham
    );
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { userId } = useParams();
    const [iddetailSanPham, setiddetailSanPham] = useState(0);

    const thongTinSp = allSanPham?.find((item) => item._id === iddetailSanPham);
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
    return (
        <div>
            <div className="tenCuaHang">{ttShop?.TenShop}</div>

            <div className="shop">
                <div>
                    <img src={ttShop?.Banner} className="banner-container" />
                </div>

                <div className="diachi-sodienthoai">
                    <div className="dc">Đ/C:{ttShop?.dcShop}</div>
                    <div className="sdt">SĐT: {ttShop?.sdtShop}</div>
                </div>

                <div className="sanPham-shop">
                    <div className="nhomSanPham-sanPham">
                        <div className="nhomSanPham">Top Sản Phẩm Bán Chạy</div>
                        <div className="sanPham-container">
                            {allSanPhamDan &&
                                allSanPhamDan?.map((item) => {
                                    return (
                                        <div
                                            key={item._id}
                                            className="sanPham"
                                            // onClick={() =>
                                            //     setiddetailSanPham(
                                            //         item?._id
                                            //     )
                                            // }
                                        >
                                            <NavLink
                                                to={`/shop/${userId}/${item._id}`}
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
                                                        MUA HÀNG
                                                    </button>

                                                    {/* <div className="thongtinSanPham">
                                                    {item?.thongTinSanPham}
                                                </div> */}
                                                    <div>Xem thêm ...</div>
                                                </div>
                                            </NavLink>
                                        </div>
                                    );
                                })}
                        </div>
                    </div>
                    <div className="nhomSanPham-sanPham">
                        <div className="nhomSanPham">
                            {allSanPham1 && allSanPham1[0]?.nhomSanPham}
                        </div>
                        <div className="sanPham-container">
                            {allSanPham1 &&
                                allSanPham1?.map((item) => {
                                    return (
                                        <div
                                            onClick={() =>
                                                setiddetailSanPham(item?._id)
                                            }
                                            key={item._id}
                                            className="sanPham"
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
                                                    MUA HÀNG
                                                </button>

                                                <div className="thongtinSanPham">
                                                    {item?.thongTinSanPham}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                        </div>
                    </div>
                </div>
            </div>

            <div className="slogan">{ttShop?.sloganShop}</div>
        </div>
    );
};
export default Shop;
