import "./MyDetail.scss";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
import {
    getPost,
    logOut,
} from "../redux/apiRequest";

import { createAxios } from "../../src/createInstance";
import { logOutSuccess } from "../redux/authSlice";
import Loading from "../GiaoDienChung/Loading";
const MyDetail = (props) => {
    const { suaPost, setsuaPost } = props;
    const [taodata, settaodata] = useState(0);
    const user = useSelector((state) => state.auth.login?.currentUser);
    const myDetail = useSelector((state) => state.post.post?.myDetail);

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
    const cauNoiTamDac = myDetail?.cauNoiTamDac;
    const gioiTinh = myDetail?.gioiTinh;

    // yourDetai Chi Tiet

    useEffect(() => {
            getPost(user?._id, dispatch);
    }, [user]);
    const handleLogout = () => {
        logOut(dispatch, id, navigate, accessToken, axiosJWT);
    };

    const Admin = () => {
        navigate("/quan-ly-user");
    };
    return loading === 0 ? (
        <Loading />
    ) : (
        <div className="container-myDetail">
            {+taodata === 0 ? (
                <div className="thongTinCaNhan">
                    <div>
                        <div>
                            <img
                                src={banner}
                                className="bannerThongTinCaNhan"
                            />
                        </div>
                    </div>
                    <div className="myDetail-avatar-hoTen-cauNoiTamDac">
                        <img src={avatar} className="myDetail-avatar" />
                        <div className="myDetail-hoTen-cauNoiTamDac">
                            <div className="myDetail-hoTen">{hoTen}</div>
                            <div className="mydetail-cauNoiTamDac">
                                {cauNoiTamDac}
                            </div>
                        </div>
                    </div>
                    <div className="Container-myTieuChi-myNoiDung">
                        <div className="myTieuChi">Giới Tính</div>
                        <div className="myNoiDung">{gioiTinh}</div>
                    </div>
              
                    <div>
                        <button
                            className="suaThongTin"
                            onClick={() => setsuaPost(1)}
                        >
                            Sửa Thông Tin
                        </button>
                        <button className="dangXuat" onClick={handleLogout}>
                            Đăng Xuất
                        </button>
                    </div>
                    <div>
                        {+myDetail?.vaiTro === 2 || user?.admin === true ? (
                            <button
                                className="suaThongTin"
                                onClick={() => settaodata(1)}
                            >
                                Quản Lý
                            </button>
                        ) : (
                            <></>
                        )}
                        {user?.admin === true && (
                            <button className="dangXuat" onClick={Admin}>
                                Admin
                            </button>
                        )}
                    </div>
                </div>
            ) : (
                <></>
            )}
        </div>
    );
};
export default MyDetail;
