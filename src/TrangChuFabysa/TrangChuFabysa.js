import "./TrangChuFabysa.scss";
import gioHang from "../assets/images/giohang.jpg";
import logo from "../assets/images/logo.jpg";
import muiTen from "../assets/images/muiTen.png";
function TrangChuFabysa() {
    return (
        <a className="a" href={"/fabysa"}>
            <div className="TrangChuFabysa">
                {/* <Header /> */}
                <img className="logo" src={logo} />
                <div className="loiChuc"> Chúc Mọi Người Mua Sắm Vui Vẻ!</div>
                <div className="gioiThieu">
                    Nơi Đây Hội Tụ Những Nhà Bán Hàng Uy Tín!
                </div>
                <div className="sanPhamTot">Sản Phẩm Tốt - Giá Cũng Tốt </div>

                <div className="gioHang-sanSale">
                    <img className="gioHang" src={gioHang} />

                    <div className="sanSale">Săn Sale Ngay</div>
                </div>

                <img className="muiTen" src={muiTen} />

                <div className="fabysa">@ Fabysa @</div>
            </div>{" "}
        </a>
    );
}

export default TrangChuFabysa;
