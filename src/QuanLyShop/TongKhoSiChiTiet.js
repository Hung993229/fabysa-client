import "./TongKhoSiChiTiet.scss";
import CommonUtils from "../component/CommonUtils";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import {
    getAllttShop,
    getKhoTongSi,
    getPost,
    registerSanPham,
    updatePost,
    updatettShop,
} from "../redux/apiRequest";
const TongKhoSiChiTiet = () => {
    const { idShop, spId } = useParams();
    console.log("useParam", useParams());
    const user = useSelector((state) => state.auth.login.currentUser);
    const myDetail = useSelector((state) => state.post.post?.myDetail);
    console.log("myDetail", myDetail);
    const ttShop = useSelector((state) => state.ttShop.ttShop.ttShop?.shop);
    const allShop = useSelector(
        (state) => state.ttShop.ttShop.allttShop?.AllShop
    );
    console.log("allShop", allShop);
    const allSanPham = useSelector(
        (state) => state.sanPham.sanPham.allsanPham?.allSanpham
    );
    const [chonShop, setchonShop] = useState("");
    const [datHang, setdatHang] = useState(0);
    const thongTinSp = allSanPham?.find((item) => item._id === spId);

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

            getKhoTongSi(huyen, user._id, dispatch);
        }
    }, []);
    const VND = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
    });
    console.log("sthongTinSppId", thongTinSp);
    const themVaoGianHang = () => {
        const newSanPham = {
            AnhSanPham: thongTinSp?.AnhSanPham,
            TenSanPham: thongTinSp?.TenSanPham,
            giaNiemYet: thongTinSp?.giaNiemYet,
            giaKhuyenMai: thongTinSp?.giaKhuyenMai,
            nhomSanPham: thongTinSp?.nhomSanPham,
            sanPhamDan: thongTinSp?.sanPhamDan,
            thongTinSanPham: thongTinSp?.thongTinSanPham,
            giaNhap: thongTinSp?.giaNhap,
            hoahongCTV: thongTinSp?.hoahongCTV,
            TenShop: thongTinSp?.TenShop,
            xa: thongTinSp?.xa,
            huyen: thongTinSp?.huyen,
            tinh: thongTinSp?.tinh,
            vaiTro: thongTinSp?.vaiTro,
            user: chonShop,
            idtk: user._id,
            affiliate: thongTinSp?.user,
        };
        console.log("newSanPham", newSanPham);
        registerSanPham(newSanPham, dispatch);
    };

    return (
        <div className="container-TongKhoSiChiTietTo">
            <div className="container-TongKhoSiChiTiet">
                <div>
                    <a className="close" href={`/fabysa/${idShop}`}>
                        Close
                    </a>
                </div>
                <div>
                    <img
                        src={thongTinSp?.AnhSanPham}
                        className="anhSanPham"
                        alt="timtim"
                    />
                    <div className="tenSanPham">{thongTinSp?.TenSanPham}</div>
                    <div className="giaBan">
                        <div className="giaBanMoi">
                            {VND.format(thongTinSp?.giaKhuyenMai)}
                        </div>
                        <div className="giaGiam">
                            <div className="giabanCu">
                                {VND.format(thongTinSp?.giaNiemYet)}
                            </div>
                            <div className="phanTram">
                                Giảm&nbsp;
                                {Math.floor(
                                    (100 *
                                        (thongTinSp?.giaNiemYet -
                                            thongTinSp?.giaKhuyenMai)) /
                                        thongTinSp?.giaNiemYet
                                )}
                                %
                            </div>
                        </div>
                    </div>
                    <a href={thongTinSp?.thongTinNguoiBan} target="_blank">
                        <button className="muaHang">MUA HÀNG</button>
                    </a>
                    <div className="tenShop">{thongTinSp?.TenShop}</div>
                    <div className="viTriSanPham">
                        <i className="fa-solid fa-location-dot"></i>
                        <div className="diachisanpham">{thongTinSp?.xa}</div>
                        <div className="diachisanpham">{thongTinSp?.huyen}</div>
                        <div className="diachisanpham">{thongTinSp?.tinh}</div>
                    </div>
                    <div className="thongtinSanPham">
                        {thongTinSp?.thongTinSanPham}
                    </div>
                </div>
                <select onChange={(e) => setchonShop(e.target.value)}>
                    <option value="">---Chọn Shop---</option>
                    {allShop &&
                        allShop.length > 0 &&
                        allShop.map((item, index) => {
                            return (
                                <option key={item._id} value={item._id}>
                                    {item.TenShop}
                                </option>
                            );
                        })}
                </select>
                <button onClick={themVaoGianHang} className="muaHang">
                    THÊM VÀO GIAN HÀNG
                </button>
            </div>
        </div>
    );
};
export default TongKhoSiChiTiet;
