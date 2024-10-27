import "./ViDu.scss";

const ViDu = () => {
    const chieuRongMH = window.innerWidth;
    return (
        <div className="view">
            {chieuRongMH <= "1023" && (
                <div className="mobile">
                    <div className="ViDu-ConTaiNer">ViDu</div>
                </div>
            )}
            {chieuRongMH > "1023" && (
                <div className="pc">
                    <div className="ViDu-ConTaiNer">ViDu</div>
                </div>
            )}
        </div>
    );
};
export default ViDu;
