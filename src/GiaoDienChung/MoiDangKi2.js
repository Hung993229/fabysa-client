import "./MoiDangKi2.scss";

const MoiDangKi = () => {
    return (
        <div className="moiDangKi2">
            <div className="toanNguoiDocThan">Xin Chúc Mừng Bạn Nhận Được</div>
            <div className="neuBanCungVay">10.000 Gold</div>
            <div className="hayThamGia">Bạn Có Thể Dùng Để Mua Hàng</div>
            <div>
                <a href={`/dang-nhap`}>
                    <button className="capnhatthongtin">Đổi Quà Ngay</button>
                </a>
            </div>
        </div>
    );
};
export default MoiDangKi;
