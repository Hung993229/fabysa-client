import "./MenuShop.scss";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { getttShop, getPost } from "../redux/apiRequest";

const MenuShop = (props) => {
    const {
        loading,
        setloading,
        skip,
        setskip,
        nhomSP,
        setnhomSP,
        allSanPham,
        setallSanPham,
    } = props;
    const user = useSelector((state) => state.auth.login.currentUser);
    const myDetail = useSelector((state) => state.post.post?.myDetail);
    const gioHang = useSelector(
        (state) => state.gioHang.gioHang.gioHang?.gioHang
    );
    const ttShop = useSelector((state) => state.ttShop.ttShop.ttShop?.shop);
    const nvQuanLy = ttShop?.ttShopThem?.nvQuanLy;
    const nhomSanPham = ttShop?.ttShopThem?.menuShop;
    const { idShop } = useParams();
    const [xoaSp, setxoaSp] = useState();
    const dispatch = useDispatch();

    useEffect(() => {
        if (user && user.length !== 0) {
            // getPost(user?._id, dispatch, setloading);
        }
    }, []);
    useEffect(() => {
        getttShop(idShop, dispatch);
    }, []);
    const handleChonNhomSanPham = (item) => {
        setallSanPham([]);
        setnhomSP(item);
        setloading(0);
        setskip(0);
    };

    return (
        <div className="pc">
            <div className="MenuShop-ConTaiNer">
                <div className="quayLai-tieuDe">
                    <div className="quayLai" onClick={() => setloading(0)}>
                        Quay Lại
                    </div>
                    <div className="tieuDe">Menu Shop</div>
                    {(user?._id === ttShop?.user ||
                        user?.admin === true ||
                        nvQuanLy?.find(
                            (item) =>
                                item?.sdtnvQuanLy === user?.username
                        )) &&
                        <div onClick={() => setxoaSp(1)} className="sua">
                            ☰
                        </div>}
                </div>
                {xoaSp === 1 && (
                    <div className="xacNhan-xoa">
                        <div className="xacNhan">Sửa Menu Shop?</div>
                        <div className="huyBo-xoa">
                            <a className="xoa" href={`/sua-menu/${idShop}`}>
                                Đồng Ý
                            </a>

                            <div
                                onClick={() => setxoaSp(!xoaSp)}
                                className="huyBo"
                            >
                                Huỷ Bỏ
                            </div>
                        </div>
                    </div>
                )}
                <div className="menuContainer">
                    {nhomSanPham &&
                        nhomSanPham?.map((item, index) => {
                            return (
                                <div key={index}>
                                    {nhomSP === item ? (
                                        <div
                                            onClick={() =>
                                                handleChonNhomSanPham(item)
                                            }
                                            className="menuChon"
                                        >
                                            {item}
                                        </div>
                                    ) : (
                                        <div
                                            onClick={() =>
                                                handleChonNhomSanPham(item)
                                            }
                                            className="menu"
                                        >
                                            {item}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                </div>
            </div>
        </div>
    );
};
export default MenuShop;
