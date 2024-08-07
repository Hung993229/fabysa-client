import "./ThongTinCaNhan.scss";
import { useState } from "react";
import { useSelector } from "react-redux";
import UpdateDetail from "../Tao Thong Tin/UpdateDetail";
import FormRegister from "../Tao Thong Tin/FormRegister";
import { getPost } from "../redux/apiRequest";
import MyDetail from "./MyDetail";
import Header from "../GiaoDienChung/Header";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";

import DangNhap from "../DangNhap/DangNhap";
import Loading from "../GiaoDienChung/Loading";
const ThongTinCaNhan = () => {
    const [suaPost, setsuaPost] = useState(0);
    const myDetailId = useSelector((state) => state.post.post.myDetail?._id);
    const user = useSelector((state) => state.auth.login?.currentUser);
    const dispatch = useDispatch();
    const { idShop } = useParams();
    const [loading, setloading] = useState(0);
    useEffect(() => {
        if (user) {
            getPost(user?._id, dispatch);
        }
    }, [user]);
    return !user ? (
        <DangNhap />
    ) : (
        <>
            <Header />
            {loading === 0 ? (
                <div className="container-thongTinCanhan">
                    <div>
                        {myDetailId ? (
                            <div>
                                {suaPost === 0 ? (
                                    <div>
                                        <MyDetail
                                            suaPost={suaPost}
                                            setsuaPost={setsuaPost}
                                            idShop={idShop}
                                        />
                                    </div>
                                ) : (
                                    <div>
                                        <UpdateDetail
                                            suaPost={suaPost}
                                            setsuaPost={setsuaPost}
                                            idShop={idShop}
                                        />
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div>
                                <FormRegister
                                    suaPost={suaPost}
                                    setsuaPost={setsuaPost}
                                    idShop={idShop}
                                />
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                <Loading />
            )}
        </>
    );
};
export default ThongTinCaNhan;
