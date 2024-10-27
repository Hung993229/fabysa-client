import "./XemAnh.scss";

const XemAnh = (props) => {
    const { xemAnhFull, setxemAnhFull } = props;
    const handleDongLai = () => {
        setxemAnhFull();
    };

    return (
        <div className="XemAnh-ConTaiNer">
            <div className="close" onClick={() => handleDongLai()}>
                <i className="fa fa-remove"></i>
            </div>
            <div className="xemAnh">
                <img src={xemAnhFull} className="anh" />
            </div>
        </div>
    );
};
export default XemAnh;
