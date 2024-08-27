import "./ShopYeuThich.scss";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
const ShopYeuThich = (props) => {
    const { loading, setloading } = props;
    const { tenVietTat, idShop, idCtv, tenCtv, sdtCtv } = useParams();
    const user = useSelector((state) => state.auth.login.currentUser);
    const allLikeShop = useSelector(
        (state) => state.post.post?.myDetail?.likeShop
    );
    console.log("allLikeShop", allLikeShop);

    return (
        <div className="ShopYeuThich">
            <div className="quayLai-tieuDe">
                <div onClick={() => setloading(0)} className="quayLai">
                    <i className="fa fa-angle-double-left"></i>Quay Lại
                </div>
                <div className="tieuDe">Shop Follow</div>
            </div>

            <div className="tenDanhSach">Danh Sách Shop Follow</div>
            {!user && <div>Đăng nhập để lưu Shop Yêu Thích!</div>}
            {allLikeShop?.length === 0 && (
                <div className="danhSachTrong">Danh sách trống !</div>
            )}
            {allLikeShop &&
                allLikeShop?.map((item, index) => {
                    return (
                        <a
                            href={`/${item.tenVietTat}/${item.idShop}/a/a/a/a`}
                            key={index}
                            className="allShoplike"
                        >
                        
                                <div className="tenShop">
                                    {index + 1}.&nbsp; {item.tenShop}
                                </div>
                         
                           
                                <div className="diaChi">
                                    {item.xa},&nbsp; {item.huyen}
                                    ,&nbsp; {item.tinh}
                                </div>
                           
                        </a>
                    );
                })}
        </div>
    );
};
export default ShopYeuThich;
