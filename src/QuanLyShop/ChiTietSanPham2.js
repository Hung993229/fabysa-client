import "./ChiTietSanPham2.scss";
import { useSelector } from "react-redux";
import { useState } from "react";
import ReactHtmlParser, {
    processNodes,
    convertNodeToElement,
    htmlparser2,
} from "react-html-parser";
import { deleteSanPham } from "../redux/apiRequest";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
const ChiTietSanPham2 = (props) => {
    const {
        cart,
        setcart,
        handleDaThemGioHang,
        handleThemGioHang,
        thongTinSp,
        loading,
        setloading,
        setcartDemo,
        cartDemo,
        idShop,
    } = props;
    const gioHang = useSelector(
        (state) => state.gioHang.gioHang.gioHang?.gioHang
    );
    const ttShop = useSelector((state) => state.ttShop.ttShop.ttShop?.shop);
    const nvQuanLy = ttShop?.ttShopThem?.nvQuanLy;
    const user = useSelector((state) => state.auth.login.currentUser);
    const VND = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
    });
    const dispatch = useDispatch();
    const allDacDiemSP = thongTinSp?.allDacDiemSP;
    const [xemAnh, setxemAnh] = useState(
        thongTinSp?.allDacDiemSP[0].AnhSanPham
    );
    const [xoaSp, setxoaSp] = useState();

    return (
        <div className="chiTietSanPham-container">
            <div className="quayLai-tieuDe">
                <div className="quayLai" onClick={() => setloading(0)}>
                    Quay Lại
                </div>
                <div className="tieuDe">Chi Tiết Sản Phẩm</div>
            </div>
            <div className="sanPham-container">
                <div className="tenSanPham-sua-xoa">
                    <div className="tenSanPham">{thongTinSp?.TenSanPham}</div>
                    {(user?._id === ttShop?.user ||
                        user?.admin === true ||
                        nvQuanLy?.find(
                            (item) =>
                                item?.sdtnvQuanLy === user?.username
                        )) &&
                        <div onClick={() => setxoaSp(2)} className="sua">
                            ☰
                        </div>}
                    
                </div>
               
                {xoaSp === 2 && (
                    <div className="xacNhan-xoa">
                        <div className="xacNhan">Sửa Sản Phẩm Này?</div>
                        <div className="huyBo-xoa">
                            <div className="xoa" onClick={() => setloading(6)}>
                                Đồng Ý
                            </div>
                            <div
                                className="huyBo"
                                onClick={() => setxoaSp(!xoaSp)}
                            >
                                Huỷ Bỏ
                            </div>
                        </div>
                    </div>
                )}
                <div className="themGioHang">Bảng Giá Sản Phẩm</div>
                <div className="dacDiem-container">
                    {allDacDiemSP &&
                        allDacDiemSP?.length > 0 &&
                        allDacDiemSP?.map((item, index) => {
                            return (
                                <div
                                    key={index}
                                    className="dacDiem-themGioHang"
                                >
                                    <img
                                        onClick={() =>
                                            setxemAnh(item.AnhSanPham)
                                        }
                                        src={item?.AnhSanPham}
                                        className="anhSp"
                                        alt="timtim"
                                    />

                                    <div className="giaSanPham">
                                        <div className="giaKM">
                                            {VND.format(item?.giaKhuyenMai)}
                                        </div>
                                        <div className="tenSp">
                                            {item?.tenDacDiem}
                                        </div>
                                    </div>
                                    <div className="giaNY-giamGia">
                                        <div className="giaNY">
                                            {VND.format(item?.giaNiemYet)}
                                        </div>
                                        <div className="giamGia">
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
                                    <div className="sl">{item?.soLuong}</div>
                                </div>
                            );
                        })}
                </div>
                {cartDemo?.find((item) => thongTinSp?._id === item?._id) ? (
                    <div
                        onClick={() => handleDaThemGioHang(thongTinSp)}
                        className="dathemGH"
                    >
                        Đã Thêm
                    </div>
                ) : (
                    <div
                        onClick={() => handleThemGioHang(thongTinSp)}
                        className="themGH"
                    >
                        Thêm Giỏ Hàng
                    </div>
                )}
                <img src={xemAnh} className="anhSanPham" alt="timtim" />
                <div className="themGioHang">Giới Thiệu Sản Phẩm</div>
                <div className="thongTinChiTiet">
                    {thongTinSp?.thongTinSanPham}
                </div>
                <div><p>Thêm thông tin sản phẩmfgfgff</p></div>
            </div>
        </div>
    );
};
export default ChiTietSanPham2;
