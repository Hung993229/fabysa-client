import "./Logo.scss";

const Logo = () => {
    const chieuRongMH = window.innerWidth;
    return (
        <div className="view">
            {chieuRongMH <= "1023" && (
                <div className="mobile">
                    <div className="ThuNghiem-ConTaiNer">
                        <i>&nbsp;&nbsp;&nbsp;&nbsp;</i>
                        <div className="logoFabysa2">
                            <div className="logoFabysa">FaBySa</div>
                        </div>
                    </div>
                </div>
            )}
            {chieuRongMH > "1023" && (
                <div className="pc">
                    <div className="Logo-ConTaiNer">
                        <div className="logoFabysa">FA</div>
                    </div>
                </div>
            )}
        </div>
    );
};
export default Logo;
