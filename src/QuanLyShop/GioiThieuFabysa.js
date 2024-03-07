import "./GioiThieuFabysa.scss";
const GioiThieuFabysa = (props) => {
    const { setmoihoptac, moihoptac } = props;
    return (
        <div className="gioiThieuFabysa">
            <button className="CloseShop" onClick={() => setmoihoptac(0)}>
                Close
            </button>
            <div className="wecomeShop">Trung Tâm Thương Mại 24/7 - Fabysa</div>
            <button className="dangKiMoShop">Mở Shop Online</button>
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
