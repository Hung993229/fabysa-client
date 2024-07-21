import "./XemAnh.scss";

const XemAnh = (props) => {
    const { xemAnhFull, loading, setloading } = props;

    return (
        <div className="XemAnh-ConTaiNer">
            <div className="xemAnh">
                <button className="close" onClick={() => setloading(0)}>
                    Close
                </button>
                <img src={xemAnhFull} className="anhSanPham" alt="timtim" />
            </div>
        </div>
    );
};
export default XemAnh;
