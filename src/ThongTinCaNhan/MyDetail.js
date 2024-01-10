import "./MyDetail.scss";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
import { getPost, logOut, getAllttShop } from "../redux/apiRequest";

import { createAxios } from "../../src/createInstance";
import { logOutSuccess } from "../redux/authSlice";
import Loading from "../GiaoDienChung/Loading";
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
    const [loading, setloading] = useState(1);
    // Mydetail Chi tiet
    const banner = myDetail?.banner;
    const avatar = myDetail?.avatar;
    const hoTen = myDetail?.hoTen;

    const gioiTinh = myDetail?.gioiTinh;

    // yourDetai Chi Tiet

    useEffect(() => {
        getPost(user?._id, dispatch);
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
    return loading === 0 ? (
        <Loading />
    ) : (
        <div className="container-myDetail">
            <div className="thongTinCaNhan">
                <div>
                    <div>
                        <img src={banner} className="bannerThongTinCaNhan" />
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
                        <div className="myNoiDung">{myDetail?.soDienThoai}</div>
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
                {idShop && idShop.length !== 0 ? (
                    <a href={`/shop/${idShop}`}>
                        <button className="tiepTucMuaHang">
                            Tiếp Tục Mua Hàng
                        </button>
                    </a>
                ) : (
                    <div>
                        {allShop && allShop.length !== 0 && (
                            <div className="quanLyShop-container">
                                <div className="TieuDeQuanLy">
                                    <div className="quanLyShop">
                                        Quản Lý Website
                                    </div>
                                    <div className="quanLyShop">
                                        Quản Lý Đơn Hàng
                                    </div>
                                    <div className="quanLyShop">
                                        Review Website
                                    </div>
                                </div>
                                <div className="noiDungQuanLy">
                                    <div>
                                        {allShop &&
                                            allShop.length !== 0 &&
                                            allShop.map((item) => {
                                                return (
                                                    <a
                                                        key={item._id}
                                                        href={`/update-shop/${item._id}`}
                                                    >
                                                        <button className="tenShopQuanLy">
                                                            {item.TenShop}
                                                        </button>
                                                    </a>
                                                );
                                            })}
                                    </div>
                                    <div>
                                        {allShop &&
                                            allShop.length !== 0 &&
                                            allShop.map((item) => {
                                                return (
                                                    <a
                                                        key={item._id}
                                                        href={`/don-hang/${item._id}`}
                                                    >
                                                        <button className="tenShopQuanLy">
                                                            {item.TenShop}
                                                        </button>
                                                    </a>
                                                );
                                            })}
                                    </div>
                                    <div>
                                        {allShop &&
                                            allShop.length !== 0 &&
                                            allShop.map((item) => {
                                                return (
                                                    <a
                                                        key={item._id}
                                                        href={`/shop/${item._id}`}
                                                    >
                                                        <button className="tenShopQuanLy">
                                                            {item.TenShop}
                                                        </button>
                                                    </a>
                                                );
                                            })}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                <div>
                    <button
                        className="suaThongTin"
                        onClick={() => setsuaPost(1)}
                    >
                        Sửa Thông Tin
                    </button>
                    {idShop && idShop.length !== 0 ? (
                        <button className="dangXuat" onClick={handleLogout2}>
                            Đăng Xuất
                        </button>
                    ) : (
                        <button className="dangXuat" onClick={handleLogout}>
                            Đăng Xuất
                        </button>
                    )}
                </div>
                <div>
                    {user?.admin === true && (
                        <div>
                            <button className="suaThongTin" onClick={Admin}>
                                Admin
                            </button>
                            <a href="/add-shop">
                                <button className="dangXuat">Thêm Shop</button>
                            </a>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
export default MyDetail;
