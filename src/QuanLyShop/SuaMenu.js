import "./SuaMenu.scss";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
    getttShop,
    updatettShop,
    registerSanPham,
    getSanPham,
    getSanPhamDanHuyen2,
    updateSanPham,
    getPost,
    deleteSanPham,
    updatePost,
    getArrSanPham,
    updateYourStatusUser,
    getYourStatus,
} from "../redux/apiRequest";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../GiaoDienChung/Loading";

const SuaMenu = () => {
    const { idShop } = useParams();
    const user = useSelector((state) => state.auth.login?.currentUser);
    const myDetail = useSelector((state) => state.post.post?.myDetail);
    const ttShop = useSelector((state) => state.ttShop.ttShop.ttShop?.shop);
    const ttShopThem2 = ttShop?.ttShopThem;
    const tenVietTat = ttShop?.ttShopThem?.tenVietTat;
    console.log("ttShop", ttShop);
    const dispatch = useDispatch();
    const [loading, setloading] = useState(0);
    const [loaiSanPham, setloaiSanPham] = useState([]);
    useEffect(() => {
        setloaiSanPham(ttShopThem2?.menuShop);
    }, [ttShop]);
    console.log("loaiSanPham", loaiSanPham);
    useEffect(() => {
        getttShop(idShop, dispatch);
    }, []);
    // Sua Nhom San Pham
    const [nhomSanPhamMoi, setnhomSanPhamMoi] = useState("");

    const handleThemNhomSanPham = () => {
        if (!nhomSanPhamMoi) {
            alert("Mời nhập nhóm mới!");
        } else {
            const id = ttShop._id;
            const menuShop2 = { menuShop: [...loaiSanPham, nhomSanPhamMoi] };
            const ttShopThem = { ...ttShopThem2, ...menuShop2 };
            const newShop = {
                ttShopThem: ttShopThem,
            };
            console.log("newShop", newShop);
            updatettShop(newShop, id, dispatch, setloading);
            setnhomSanPhamMoi();
            setloading(1);
        }
    };
    const handleXoaNhomSanPham = (item) => {
        if (item === "Khuyến Mại Đặc Biệt") {
            alert("Khuyến Mại Đặc Biệt không thể xoá!");
        } else {
            const id = ttShop._id;
            const menuShop2 = {
                menuShop: loaiSanPham?.filter((item2) => item2 !== item),
            };
            const ttShopThem = { ...ttShopThem2, ...menuShop2 };
            const newShop = {
                ttShopThem: ttShopThem,
            };
            console.log("newShop", newShop);
            updatettShop(newShop, id, dispatch, setloading);
            setloading(1);
        }
    };

    // Sua Nhom San Pham

    return (
        <div className="SuaMenu-ConTaiNer">
            {loading === 0 && (
                <div className="suaNhomSanPham">
                    <div className="quayLai-tieuDe">
                        <a className="quayLai" href={`/${tenVietTat}/${idShop}/a`}>
                            Quay Lại
                        </a>
                        <div className="tieuDe">Sửa Menu Shop</div>
                    </div>
                    <div className="themNhom">
                        <input
                            className="tenNhom"
                            onChange={(e) => setnhomSanPhamMoi(e.target.value)}
                            placeholder="Thêm nhóm mới"
                        />
                        <div
                            className="them"
                            onClick={() => handleThemNhomSanPham()}
                        >
                            Thêm
                        </div>
                    </div>
                    <div className="danhSachNhom">Danh Sách Nhóm Sản Phẩm</div>
                    <div>
                        {loaiSanPham &&
                            loaiSanPham?.length !== 0 &&
                            loaiSanPham?.map((item, index) => {
                                return (
                                    <div className="tenNhomXoa" key={index}>
                                        <div className="tenNhom"> {item}</div>
                                        <div
                                            onClick={() =>
                                                handleXoaNhomSanPham(item)
                                            }
                                            className="xoa"
                                        >
                                            Xoá
                                        </div>
                                    </div>
                                );
                            })}
                    </div>
                </div>
            )}
            {loading === 1 && <Loading />}
        </div>
    );
};
export default SuaMenu;
