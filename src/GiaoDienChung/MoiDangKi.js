import "./MoiDangKi.scss";

const MoiDangKi = () => {
    return (
        <div className="moiDangKi">
            <div className="toanNguoiDocThan">
                Ở Đây Có Rất Nhiều <br /> Nam Thanh Nữ Tú Đang Độc Thân!
            </div>
            <div className="neuBanCungVay">Nếu Bạn Cũng Vậy?</div>
            <div className="hayThamGia">
                Tham Gia Ngay Để Sớm Tìm Được Một Nửa Yêu Thương!
            </div>
            <div>
                <a href={`/dang-nhap`}>
                    <button className="capnhatthongtin">Tham Gia Ngay</button>
                </a>
            </div>
        </div>
    );
};
export default MoiDangKi;
