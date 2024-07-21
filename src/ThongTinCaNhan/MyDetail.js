import "./MyDetail.scss";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
import { getPost, logOut, getAllttShop } from "../redux/apiRequest";
import gioHang from "../assets/images/giohang.jpg";
import { createAxios } from "../../src/createInstance";
import { logOutSuccess } from "../redux/authSlice";
import Loading from "../GiaoDienChung/Loading";
import ThayPassword from "../ThayPassword/ThayPassword";
const MyDetail = (props) => {
    const { suaPost, setsuaPost, idShop } = props;
    const user = useSelector((state) => state.auth.login?.currentUser);
    const myDetail = useSelector((state) => state.post.post?.myDetail);
    const allShop = useSelector(
        (state) => state.ttShop.ttShop.allttShop?.AllShop
    );
    console.log("allShop", allShop);
    const accessToken = user?.accessToken;
    const id = user?._id;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let axiosJWT = createAxios(user, dispatch, logOutSuccess);
    const [loading, setloading] = useState(0);
    const [likeShop, setlikeShop] = useState(false);
    const [thayPass, setthayPass] = useState(false);
    // Mydetail Chi tiet
    const banner = myDetail?.banner;
    const avatar = myDetail?.avatar;
    const hoTen = myDetail?.hoTen;

    const gioiTinh = myDetail?.gioiTinh;

    // yourDetai Chi Tiet

    useEffect(() => {
        getAllttShop(user?._id, dispatch);
    }, [user]);
    const handleLogout = () => {
        logOut(dispatch, id, accessToken, axiosJWT);
        navigate("/dang-nhap");
    };
    const handleLogout2 = () => {
        logOut(dispatch, id, accessToken, axiosJWT);
        navigate(`/shop/dang-nhap/${idShop}`);
    };

    const Admin = () => {
        navigate("/quan-ly-user");
    };
    return loading === 1 ? (
        <Loading />
    ) : (
        <div className="pC">
            <div className="container-myDetail">
                <div className="thongTinCaNhan">
                    <div>
                        <div>
                            <img
                                src={banner}
                                className="bannerThongTinCaNhan"
                            />
                        </div>
                    </div>
                    <div className="thongTinCaNhanChiTiet">
                        <div className="myDetail-avatar-hoTen-cauNoiTamDac">
                            <img src={avatar} className="myDetail-avatar" />
                            <div className="myDetail-hoTen-cauNoiTamDac">
                                <div hidden className="myTieuChi">
                                    Họ Và Tên
                                </div>
                                <div className="myDetail-hoTen">{hoTen}</div>
                            </div>
                        </div>

                        <div className="Container-myTieuChi-myNoiDung">
                            <div className="myTieuChi">Số Điện Thoại</div>
                            <div className="myNoiDung">
                                {myDetail?.soDienThoai}
                            </div>
                        </div>
                        <div className="Container-myTieuChi-myNoiDung">
                            <div className="myTieuChi">Giới Tính</div>
                            <div className="myNoiDung">{gioiTinh}</div>
                        </div>
                        <div className="Container-myTieuChi-myNoiDung">
                            <div className="myTieuChi">Ngày Sinh</div>
                            <div className="myNoiDung">
                                {myDetail?.ngaySinh}/{myDetail?.thangSinh}/
                                {myDetail?.namSinh}
                            </div>
                        </div>
                        <div className="Container-myTieuChi-myNoiDung">
                            <div className="myTieuChi">Địa Chỉ</div>
                            <div className="myNoiDung">
                                {myDetail?.thonXom} - {myDetail?.xa} -{" "}
                                {myDetail?.huyen} - {myDetail?.tinh}
                            </div>
                        </div>
                        <div className="Container-myTieuChi-myNoiDung">
                            <div className="myTieuChi">Tài Khoản Gold</div>
                            <div className="myNoiDung">{myDetail?.cash}</div>
                        </div>
                        <div className="Container-myTieuChi-myNoiDung">
                            <div className="myTieuChi">ID</div>
                            <div className="myNoiDung">{user?._id}</div>
                        </div>
                    </div>
                    <div className="phimChucNang">
                        <button
                            className="suaThongTin"
                            onClick={() => setsuaPost(1)}
                        >
                            Sửa Thông Tin
                        </button>
                        <button className="doiMatKhau">
                            <a href={"/change-password"}>Đổi Mật Khẩu</a>
                        </button>

                        {idShop && idShop.length !== 0 ? (
                            <button
                                className="dangXuat"
                                onClick={handleLogout2}
                            >
                                Đăng Xuất
                            </button>
                        ) : (
                            <button className="dangXuat" onClick={handleLogout}>
                                Đăng Xuất
                            </button>
                        )}
                    </div>

                    <div className="phimChucNang">
                        {user?.admin === true && (
                            <div>
                                <button className="suaThongTin" onClick={Admin}>
                                    Admin
                                </button>
                                <a href="/add-shop">
                                    <button className="suaThongTin">
                                        Thêm Shop
                                    </button>
                                </a>
                            </div>
                        )}
                    </div>

                    <div className="caNhan-container">
                        <div className="qlCaNhan">Quản Lý Cá Nhân</div>
                        {idShop && idShop.length !== 0 ? (
                            <div className="quanLyShop">
                                <a href={`/shop/don-mua/${idShop}`}>
                                    <div className="ttCaNhan">ĐH Đang Giao</div>
                                </a>
                                <a href={`/shop/lich-su-mua-hang/${idShop}`}>
                                    <div className="ttCaNhan">
                                        ĐH Thành Công
                                    </div>
                                </a>
                                <a href={`/shop/shop-yeu-thich/${idShop}`}>
                                    <div className="ttCaNhan">
                                        Shop Yêu Thích
                                    </div>
                                </a>

                                <a href={`/shop/${idShop}`}>
                                    <div className="ttCaNhan">
                                        Quay Lại Shop
                                    </div>
                                </a>
                            </div>
                        ) : (
                            <div className="quanLyShop">
                                <a href={`/shop/don-mua/${user?._id}`}>
                                    <div className="ttCaNhan">ĐH Đang Giao</div>
                                </a>
                                <a href={`/shop/lich-su-mua-hang/${user?._id}`}>
                                    <div className="ttCaNhan">
                                        ĐH Thành Công
                                    </div>
                                </a>
                                <a href={`/shop/shop-yeu-thich/${user?._id}`}>
                                    <div className="ttCaNhan">
                                        Shop Yêu Thích
                                    </div>
                                </a>
                            </div>
                        )}
                    </div>

                    <div>
                        {allShop && allShop.length !== 0 && (
                            <div className="quanLyShop-container">
                                <div className="quanLyGianHang">
                                    Quản Lý Gian Hàng
                                </div>

                                {allShop &&
                                    allShop.length !== 0 &&
                                    allShop.map((item, index) => {
                                        return (
                                            <div
                                                className="quanLyShop"
                                                key={item._id}
                                            >
                                                <div className="tenShop">
                                                    {item.TenShop}
                                                </div>
                                                <div className="tieuDeNoiDung">
                                                    <a
                                                        className="khoShop"
                                                        href={`/${item.ttShopThem?.tenVietTat}/${item._id}/a/a/a/a`}
                                                    >
                                                        <div className="order">
                                                            Bán Hàng
                                                        </div>
                                                    </a>
                                                    <a
                                                        href={`/don-hang/${item._id}`}
                                                    >
                                                        <div className="khoShop">
                                                            Đơn Hàng
                                                        </div>
                                                    </a>

                                                    <a
                                                        href={`/update-shop/${item._id}`}
                                                    >
                                                        <div className="khoShop">
                                                            Cập Nhật
                                                        </div>
                                                    </a>
                                                    <a
                                                        href={`/doi-tac/${item._id}`}
                                                    >
                                                        <div className="khoShop">
                                                            Đối Tác
                                                        </div>
                                                    </a>
                                                </div>
                                            </div>
                                        );
                                    })}
                            </div>
                        )}
                    </div>
                    <div className="fabysa-container">
                        <button className="fabysa">Fabysa</button>
                        <div className="gioiThieu">Trung Tâm Thương Mại </div>
                        <a href={`/fabysa`}>
                            <div className="gioHang-sanSale">
                                <img className="gioHang" src={gioHang} />

                                <div className="sanSale">Săn Sale Ngay</div>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default MyDetail;
