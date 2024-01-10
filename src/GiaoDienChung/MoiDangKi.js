import "./MoiDangKi.scss";

const MoiDangKi = () => {
    return (
        <div className="moiDangKi">
            <div className="toanNguoiDocThan">
                Tạo tài khoản và cập nhật thông tin cá nhân giúp mua hàng nhanh
                hơn!
            </div>
            {/* <div className="neuBanCungVay">Bạn nhận được 10.000 Gold</div> */}
            {/* <div className="hayThamGia">
                Tham Gia Ngay Để Sớm Tìm Được Một Nửa Yêu Thương!
            </div> */}
            <div>
                <a href={`/dang-nhap`}>
                    <button className="capnhatthongtin">Tham Gia Ngay</button>
                </a>
            </div>
        </div>
    );
};
export default MoiDangKi;
