import "./SuaMenu.scss";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
    getttShop,
    updatettShop,
    getAllSanPham,
    updateSanPham,
} from "../redux/apiRequest";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../GiaoDienChung/Loading";
const SuaMenu = () => {
    const { idShop } = useParams();
    const ttShop = useSelector((state) => state.ttShop.ttShop.ttShop?.shop);
    const allSanPham2 = useSelector(
        (state) => state.sanPham.sanPham.allsanPham?.allSanpham
    );
    const ttShopThem2 = ttShop?.ttShopThem;
    const tenVietTat = ttShop?.ttShopThem?.tenVietTat;
    const dispatch = useDispatch();
    const [loading, setloading] = useState(0);
    const [loaiSanPham, setloaiSanPham] = useState([]);
    const [skip, setskip] = useState(0);
    const [thongTinSp, setthongTinSp] = useState();
    const [allSanPham, setallSanPham] = useState([]);
    useEffect(() => {
        setloaiSanPham(ttShopThem2?.menuShop);
    }, [ttShop]);
    useEffect(() => {
        getttShop(idShop, dispatch);
    }, []);

    useEffect(() => {
        if (allSanPham2) {
            setallSanPham([...allSanPham, ...allSanPham2]);
        }
    }, [allSanPham2]);
    useEffect(() => {
        const handleScroll = (e) => {
            const scrollHeight = e.target.documentElement.scrollHeight;
            const currentHeight =
                e.target.documentElement.scrollTop + window.innerHeight;
            if (currentHeight >= scrollHeight) {
                setskip(skip + 20);
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [allSanPham]);
    useEffect(() => {
        const limit = 20;
        getAllSanPham(idShop, skip, limit, dispatch);
    }, [skip]);
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
        if (loaiSanPham?.length === 1) {
            alert("Không thể xoá toàn bộ menu!");
        } else {
            const id = ttShop._id;
            const menuShop2 = {
                menuShop: loaiSanPham?.filter((item2) => item2 !== item),
            };
            const ttShopThem = { ...ttShopThem2, ...menuShop2 };
            const newShop = {
                ttShopThem: ttShopThem,
            };
            updatettShop(newShop, id, dispatch, setloading);
            setloading(1);
        }
    };
    // Sua Nhom San Pham
    const handleDoiNhomSanPham = (nhomSP, id) => {
        const newSanPham = {
            nhomSanPham: nhomSP,
        };
        updateSanPham(newSanPham, id, setloading, setthongTinSp, dispatch);
        setloading(1);
    };
    return (
        <div className="SuaMenu-ConTaiNer">
            <div className="quayLai-tieuDe">
                <a
                    href={`/${tenVietTat}/${idShop}/a/a/a/a`}
                    className="quayLai"
                >
                    <i className="fa fa-angle-double-left"></i>Quay Lại
                </a>
                <div className="tieuDe">Sửa Menu Shop</div>
            </div>
            {(loading === 0 || loading === 4) && (
                <div className="suaNhomSanPham">
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
                            +
                        </div>
                    </div>
                    
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
                                            ❌
                                        </div>
                                    </div>
                                );
                            })}
                    </div>
                    <div className="luuY">
                        Lưu ý: Xoá hết sản phẩm trong danh mục trước khi xoá
                        danh mục
                    </div>
                    <div className="dsSanPham-container">
                        <div className="danhSach">Danh Sách Sản Phẩm</div>
                        {allSanPham &&
                            allSanPham?.length !== 0 &&
                            allSanPham?.map((item, index) => {
                                return (
                                    <div className="allSanPham" key={index}>
                                        <div className="tenSp">
                                            {index + 1}.&nbsp; {item?.TenSanPham}
                                        </div>
                                        <select
                                            className="nhomSanPham"
                                            onChange={(e) =>
                                                handleDoiNhomSanPham(
                                                    e.target.value,
                                                    item._id
                                                )
                                            }
                                        >
                                            <option>{item?.nhomSanPham}</option>
                                            {loaiSanPham &&
                                                loaiSanPham?.length !== 0 &&
                                                loaiSanPham?.map(
                                                    (item2, index) => {
                                                        return (
                                                            <option
                                                                value={item2}
                                                                key={index}
                                                            >
                                                                {item2}
                                                            </option>
                                                        );
                                                    }
                                                )}
                                        </select>
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
