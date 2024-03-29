import "./ChiTietSanPham2.scss";
import { useSelector } from "react-redux";
import ReactHtmlParser, {
    processNodes,
    convertNodeToElement,
    htmlparser2,
} from "react-html-parser";
const ChiTietSanPham2 = (props) => {
    const {
        cart,
        setcart,
        handleThemGioHang,
        handleXoaSanPham,
        thongTinSp,
        showChiTietSanPham,
        setshowChiTietSanPham,
    } = props;
    const gioHang = useSelector(
        (state) => state.gioHang.gioHang.gioHang?.gioHang
    );
    const ttShop = useSelector((state) => state.ttShop.ttShop.ttShop?.shop);
    const user = useSelector((state) => state.auth.login.currentUser);
    const VND = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
    });
    return (
        <div className="chiTietSanPham-container">
            <button className="close" onClick={() => setshowChiTietSanPham(0)}>
                Close
            </button>
            <div className="anhVaTen">
                <div className="trai">
                    <img
                        src={thongTinSp?.AnhSanPham}
                        className="anhSanPham"
                        alt="timtim"
                    />
                </div>
                <div className="phai">
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

                    <>
                        {cart?.find(
                            (thongTinSp2) => thongTinSp2._id === thongTinSp._id
                        ) ? (
                            <button
                                onClick={() => handleXoaSanPham(thongTinSp)}
                                className="daThem"
                            >
                                ĐÃ THÊM
                            </button>
                        ) : (
                            <button
                                onClick={() => handleThemGioHang(thongTinSp)}
                                className="muaHang"
                            >
                                THÊM GIỎ HÀNG
                            </button>
                        )}
                    </>

                    <div className="viTriSanPham">
                        <i className="fa-solid fa-location-dot"></i>
                        <div className="diachisanpham">{ttShop?.xa}</div>
                        <div className="diachisanpham">{ttShop?.huyen}</div>
                        <div className="diachisanpham">{ttShop?.tinh}</div>
                    </div>
                </div>
            </div>
            <div className="tieuDeThongTinSanPham">Giới Thiệu Sản Phẩm</div>

            <div className="thongTinSanPham">
                {ReactHtmlParser(thongTinSp?.thongTinSanPham)}
            </div>
        </div>
    );
};
export default ChiTietSanPham2;
