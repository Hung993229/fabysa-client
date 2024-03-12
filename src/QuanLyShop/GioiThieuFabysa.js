import "./GioiThieuFabysa.scss";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getAllttShop } from "../redux/apiRequest";

const GioiThieuFabysa = (props) => {
    const { setmoihoptac, moihoptac } = props;
    const user = useSelector((state) => state.auth.login?.currentUser);
    const dispatch = useDispatch();
    const allShop = useSelector(
        (state) => state.ttShop.ttShop.allttShop?.AllShop
    );
    useEffect(() => {
        if (user) {
            getAllttShop(user?._id, dispatch);
        }
    }, [user]);
    return (
        <div className="gioiThieuFabysa">
            <button className="CloseShop" onClick={() => setmoihoptac(0)}>
                Close
            </button>

            <div className="wecomeShop">Trung Tâm Thương Mại 24/7 - Fabysa</div>
            {allShop && allShop?.length !== 0 ? (
                <a href="/ca-nhan">
                    <button className="dangKiMoShop">
                        Quản Lý Shop Online
                    </button>
                </a>
            ) : (
                <a href="/add-shop">
                    <button className="dangKiMoShop">Mở Shop Online</button>
                </a>
            )}
            <div className="yNghiaFabysa">
                - Đối với người mua: Fabysa là nơi hội tụ những nhà bán hàng
                Online uy tín với giá thành tốt! <br /> - Đối với người bán:
                Fabysa là đơn vị đồng hành tin cậy. Với mục tiêu giúp những nhà
                bán hàng truyền thống dễ dàng kết hợp bán hàng Online, đồng thời
                giúp những nhà bán hàng Online phát triển bền vững!
            </div>
        </div>
    );
};
export default GioiThieuFabysa;
