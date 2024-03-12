import "./MenuDonHang.scss";
import { useState } from "react";
const MenuDonHang = (props) => {
    const { idShop } = props;
    const [showMenu, setshowMenu] = useState(0);
    return (
        <div className="menuDonHang">
            <div className="menu" onClick={() => setshowMenu(1)}>
                Menu
            </div>
            {showMenu === 1 && (
                <>
                    <div className="donHang-nav">
                        <a href={`/don-hang/${idShop}`}>Đơn Hàng Mới</a>
                        <a href={`/don-hang-dang-giao/${idShop}`}>
                            Đơn Hàng Đang Giao
                        </a>
                        <a href={`/don-hang-hoan-thanh/${idShop}`}>
                            Đơn Hàng Hoàn Thành
                        </a>
                        <a href={`/don-hang-huy/${idShop}`}>Đơn Hàng Huỷ</a>
                        <a href={`/don-hang-ctv/${idShop}`}>
                            Đơn Hàng Cộng Tác Viên
                        </a>
                        <a href={`/don-hang-lien-ket/${idShop}`}>
                            Đơn Hàng Liên Kết
                        </a>
                    </div>

                    <button className="close" onClick={() => setshowMenu(0)}>
                        Close
                    </button>
                </>
            )}
        </div>
    );
};
export default MenuDonHang;
