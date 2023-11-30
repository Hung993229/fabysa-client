import "./ThongTinCaNhan.scss";
import { useState } from "react";
import { useSelector } from "react-redux";
import UpdateDetail from "../Tao Thong Tin/UpdateDetail";
import FormRegister from "../Tao Thong Tin/FormRegister";
import { getPost } from "../redux/apiRequest";
import MyDetail from "./MyDetail";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

import DangNhap from "../DangNhap/DangNhap";
import MoiDangKi from "../GiaoDienChung/MoiDangKi";
const ThongTinCaNhan = () => {
    const [suaPost, setsuaPost] = useState(0);
    const myDetailId = useSelector((state) => state.post.post.myDetail?._id);
    const user = useSelector((state) => state.auth.login?.currentUser);
    const dispatch = useDispatch();

    useEffect(() => {
        const getPostMydetail = () => {
            if (!user) {
                console.log("chua co userId");
            }
            if (user) {
                getPost(user?._id, dispatch);
            }
        };
        getPostMydetail();
    }, [user]);
    return !user ? (
        <MoiDangKi />
    ) : (
        <div className="container-thongTinCanhan">
            <div>
                {myDetailId ? (
                    <div>
                        {suaPost === 0 ? (
                            <div>
                                <MyDetail
                                    suaPost={suaPost}
                                    setsuaPost={setsuaPost}
                                />
                            </div>
                        ) : (
                            <div>
                                <UpdateDetail
                                    suaPost={suaPost}
                                    setsuaPost={setsuaPost}
                                />
                            </div>
                        )}
                    </div>
                ) : (
                    <div>
                        <FormRegister
                            suaPost={suaPost}
                            setsuaPost={setsuaPost}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};
export default ThongTinCaNhan;
