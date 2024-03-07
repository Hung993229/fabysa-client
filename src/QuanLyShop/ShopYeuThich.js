import "./ShopYeuThich.scss";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
const ShopYeuThich = (props) => {
    const { setmoihoptac, moihoptac } = props;
    const allLikeShop = useSelector(
        (state) => state.post.post?.myDetail?.likeShop
    );
    console.log("allLikeShop", allLikeShop);
    const { idShop } = useParams();
    return (
        <div className="ShopYeuThich">
            {idShop && idShop.length !== 0 ? (
                <a href={`/shop/ca-nhan/${idShop}`}>
                    <button className="CloseShop">Close</button>
                </a>
            ) : (
                <button className="CloseShop" onClick={() => setmoihoptac(0)}>
                    Close
                </button>
            )}

            <div className="tenDanhSach">Danh Sách Shop Yêu Thích</div>
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
