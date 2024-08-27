import "./XemAnh.scss";

const XemAnh = (props) => {
    const {
        xemAnhFull,
        setxemAnhFull,
        setloading,
        loadingTruoc,
    } = props;

    const handleDongLai = () => {
        setloading(loadingTruoc);
        setxemAnhFull();
    };

    return (
        <div className="XemAnh-ConTaiNer">
            <div className="close" onClick={() => handleDongLai()}>
            <i className="fa fa-remove"></i>
            </div>
            <div className="xemAnh">
                <img src={xemAnhFull} className="anhSanPham" alt="timtim" />
            </div>
        </div>
    );
};
export default XemAnh;
