import "./ShopYeuThich.scss";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
const ShopYeuThich = (props) => {
    const { setmoihoptac, moihoptac } = props;
    const user = useSelector((state) => state.auth.login.currentUser);
    const allLikeShop = useSelector(
        (state) => state.post.post?.myDetail?.likeShop
    );
    console.log("allLikeShop", allLikeShop);
    const { idShop } = useParams();
    return (
        <div className="ShopYeuThich">
            {idShop && idShop.length !== 0 ? (
                <a
                    href={
                        idShop === user?._id
                            ? `/ca-nhan`
                            : `/shop/ca-nhan/${idShop}`
                    }
                >
                    <button className="CloseShop">Close</button>
                </a>
            ) : (
                <button className="CloseShop" onClick={() => setmoihoptac(0)}>
                    Close
                </button>
            )}

            <div className="tenDanhSach">Danh Sách Shop Yêu Thích</div>
            {!user && <div>Đăng nhập để lưu Shop Yêu Thích!</div>}
            {allLikeShop?.length === 0 && <div>Bạn Chưa Thích Shop Nào!</div>}
            {allLikeShop &&
                allLikeShop?.map((item, index) => {
                    return (
                        <div key={index} className="allShoplike">
                            <div className="stt">{index + 1}.</div>
                            <a
                                className="tenShop"
                                href={`/shop/${item?.idShop}`}
                            >
                                {item.tenShop}
                            </a>
                        </div>
                    );
                })}
        </div>
    );
};
export default ShopYeuThich;
