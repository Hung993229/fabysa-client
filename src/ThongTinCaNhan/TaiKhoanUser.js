import "./TaiKhoanUser.scss";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
    getttShop,
    getPost,
    getTaiKhoan,
    updateTaiKhoan,
    registerTaiKhoan,
} from "../redux/apiRequest";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
const TaiKhoanUser = () => {
    const dispatch = useDispatch();
    const ttShop = useSelector((state) => state?.ttShop?.ttShop?.ttShop?.shop);
    const taiKhoan = useSelector(
        (state) => state?.taiKhoan?.taiKhoan?.taiKhoan?.taiKhoan
    );
    const myDetail = useSelector((state) => state.post.post?.myDetail);
    const user = useSelector((state) => state.auth.login?.currentUser);
    console.log("myDetail", myDetail);
    const { tenVietTat, idShop, idUser, idCtv, tenCtv, sdtCtv } = useParams();
    const handleDinhDangSo = (data) => {
        const n = +data;
        return n.toFixed(0).replace(/./g, function (c, i, a) {
            return i > 0 && c !== "," && (a.length - i) % 3 === 0 ? "." + c : c;
        });
    };
    const [soTien, setsoTien] = useState(0);
    const VND = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
    });
    useEffect(() => {
        if (user) {
            getPost(user?._id, dispatch);
        }
    }, [user]);
    useEffect(() => {
        getTaiKhoan(idUser, dispatch);
    }, []);
    //  Viet QR
    // const nganHang = tenNganHang;
    const BANK_ID = "970422";
    const ACCOUNT_NO = "0931969456666";
    const TEMPLATE = "print";
    const AMOUNT = soTien;
    const DESCRIPTION = `Shop_ ${ttShop?.sdtShop}` ;
    const ACCOUNT_NAME = "TRAN VAN HUNG";
    const qr = `https://img.vietqr.io/image/${BANK_ID}-${ACCOUNT_NO}-${TEMPLATE}.png?amount=${AMOUNT}&addInfo=${DESCRIPTION}&accountName=${ACCOUNT_NAME}`;
    // Viet QR
    const d = new Date();
    const gioPhut = `${d.getHours()}h${d.getMinutes()}`;
    const ngayThang = `${d.getDate()}/${d.getMonth()}/${d.getFullYear()}`;
    const handleLuuTaiKhoan = () => {
        if (soTien > 0) {
            if (!taiKhoan) {
                const newTaiKhoan = {
                    NapTien: +soTien,
                    XacNhanNapTien: "Chờ Xác Nhận",
                    LichsuGiaoDich: {
                        gdVao: [
                            {
                                thoiGian: `${ngayThang} ${gioPhut}`,
                                soTien: soTien,
                                noiDung: "Chuyển Khoản NH",
                                xacNhan: "Chờ Xác Nhận",
                            },
                        ],
                        gdRa: [
                            {
                                thoiGian: "",
                                soTien: "",
                                noiDung: "",
                                xacNhan: "",
                            },
                        ],
                    },
                    ThongTinThem: {
                        TenShop: ttShop?.TenShop,
                        sdtShop: ttShop?.SdtShop,
                    },
                    user: ttShop?._id,
                };
                console.log("newTaiKhoan", newTaiKhoan);
                registerTaiKhoan(newTaiKhoan, dispatch);
            } else {
                const newTaiKhoan = {
                    NapTien: +soTien,
                    XacNhanNapTien: "Chờ Xác Nhận",
                    LichsuGiaoDich: {
                        gdVao: [
                            {
                                thoiGian: `${ngayThang} ${gioPhut}`,
                                soTien: soTien,
                                noiDung: "CK Ngân Hàng",
                                xacNhan: "Chờ Xác Nhận",
                            },
                            ...taiKhoan?.LichsuGiaoDich?.gdVao,
                        ],
                        gdRa: taiKhoan?.LichsuGiaoDich?.gdRa,
                    },
                    ThongTinThem: {
                        TenShop: ttShop?.TenShop,
                        sdtShop: ttShop?.sdtShop,
                    },
                    user: ttShop?._id,
                };
                console.log("newTaiKhoan", newTaiKhoan);
                updateTaiKhoan(newTaiKhoan, taiKhoan?._id, dispatch);
            }
        } else {
            alert("Nhập số tiền mua");
        }
    };
    const gdVao = taiKhoan?.LichsuGiaoDich?.gdVao;
    const gdRa = taiKhoan?.LichsuGiaoDich?.gdRa;
    return (
        <div className="view">
            <div className="mobile">
                <div className="TaiKhoanUser-ConTaiNer">
                    <div className="quayLai-tieuDe">
                        <a
                            href={`/ca-nhan/${tenVietTat}/${idShop}/a/${idCtv}/${tenCtv}/${sdtCtv}`}
                            className="quayLai"
                        >
                            <i className="fa fa-angle-double-left"></i>Quay Lại
                        </a>

                        <div className="donHang">Tài Khoản Fabysa</div>
                        <div className="taiKhoanShop">
                            {handleDinhDangSo(myDetail?.cash)}&#160;
                            <i
                                className="fab fa-empire"
                                style={{ color: "#ef9b0f" }}
                            ></i>
                        </div>
                    </div>
                    <div className="napTien-lenhMoi">
                        <div className="napTien">Thông Tin Tài Khoản</div>
                        <div>Chủ Tài Khoản: Trần văn Hùng</div>
                        <div>Số Tiền: 1000.000đ</div>
                    </div>
                    <div className="napTien-lenhMoi">
                        <div className="napTien">
                            Nhận Fabysa Gold &#160;
                            <i
                                className="fab fa-empire"
                                style={{ color: "#ef9b0f" }}
                            ></i>
                        </div>
                    </div>
                    <div className="napTien-lenhMoi">
                        <div className="napTien">
                            Chuyển fabysa Gold&#160;
                            <i
                                className="fab fa-empire"
                                style={{ color: "#ef9b0f" }}
                            ></i>
                        </div>
                    </div>
                    <div className="napTien-lenhMoi">
                        <div className="napTien">
                            Mua Fabysa Gold &#160;
                            <i
                                className="fab fa-empire"
                                style={{ color: "#ef9b0f" }}
                            ></i>
                        </div>
                        <div className="quyDoi">
                            Quy đổi: 1 vnđ = 1 fabysa Gold
                        </div>
                        <div className="nhapSoTienTieuDe">Nhập số tiền mua</div>
                        <input
                            className="nhapSoTien"
                            placeholder={VND.format(soTien)}
                        />
                        <div className="menhGiaTien">
                            <div
                                onClick={() => setsoTien(soTien + 1000)}
                                className="giaTriTien"
                            >
                                {VND.format(1000)}
                            </div>
                            <div
                                onClick={() => setsoTien(soTien + 2000)}
                                className="giaTriTien"
                            >
                                {VND.format(2000)}
                            </div>
                            <div
                                onClick={() => setsoTien(soTien + 3000)}
                                className="giaTriTien"
                            >
                                {VND.format(3000)}
                            </div>
                            <div
                                onClick={() => setsoTien(soTien + 5000)}
                                className="giaTriTien"
                            >
                                {VND.format(5000)}
                            </div>
                            <div
                                onClick={() => setsoTien(soTien + 10000)}
                                className="giaTriTien"
                            >
                                {VND.format(10000)}
                            </div>
                            <div
                                onClick={() => setsoTien(soTien + 20000)}
                                className="giaTriTien"
                            >
                                {VND.format(20000)}
                            </div>
                            <div
                                onClick={() => setsoTien(soTien + 50000)}
                                className="giaTriTien"
                            >
                                {VND.format(50000)}
                            </div>
                            <div
                                onClick={() => setsoTien(soTien + 100000)}
                                className="giaTriTien"
                            >
                                {VND.format(100000)}
                            </div>
                            <div
                                onClick={() => setsoTien(soTien + 200000)}
                                className="giaTriTien"
                            >
                                {VND.format(200000)}
                            </div>
                            <div
                                onClick={() => setsoTien(soTien + 500000)}
                                className="giaTriTien"
                            >
                                {VND.format(500000)}
                            </div>
                        </div>
                        <div className="thanhToan">Thanh Toán</div>
                        <div className="noiDungCk-AnhQr">
                            <img className="AnhQr" src={qr} />
                            <div className="noiDungCk">
                                <div className="chiTiet">
                                    Số Tiền: {VND.format(soTien)}
                                </div>
                                <div className="chiTiet">
                                    Nội dung CK: SHOP {ttShop?.sdtShop}
                                </div>
                                <div className="chiTiet">
                                    Chủ TK: TRAN VAN HUNG
                                </div>
                                <div className="chiTiet">
                                    STK Admin: 0931969456666
                                </div>
                                <div className="chiTiet">
                                    Ngân Hàng TMCP Quân Đội
                                </div>
                            </div>
                        </div>
                    </div>
                    {taiKhoan && taiKhoan?.XacNhanNapTien === "Chờ Xác Nhận" ? (
                        <div
                            onClick={() => alert("Đang xác nhận giao dịch!")}
                            className="choXacNhan"
                        >
                            Chờ Xác Nhận
                        </div>
                    ) : (
                        <div
                            onClick={() => handleLuuTaiKhoan()}
                            className="daThanhToan"
                        >
                            Đã Chuyển Khoản
                        </div>
                    )}
                    <div className="lichSu-container">
                        <div className="tieuDe">Lịch Sử Giao Dịch</div>
                        <div className="tienVao-tienRa">
                            <div className="tienVao">
                                <div className="tieuDe2">GD Vào</div>

                                <div className="allGiaoDich">
                                    {taiKhoan?.LichsuGiaoDich?.gdVao &&
                                        taiKhoan?.LichsuGiaoDich?.gdVao
                                            ?.length !== 0 &&
                                        taiKhoan?.LichsuGiaoDich?.gdVao?.map(
                                            (item, index) => {
                                                return (
                                                    <div
                                                        className="chiTiet"
                                                        key={index}
                                                    >
                                                        <div className="thoiGian">
                                                            {item?.thoiGian.slice(
                                                                0,
                                                                10
                                                            )}
                                                            <br />
                                                            {item?.thoiGian.slice(
                                                                11,
                                                                19
                                                            )}
                                                        </div>
                                                        <div className="soTien">
                                                            {VND.format(
                                                                item?.soTien
                                                            )}
                                                        </div>
                                                        <div className="noiDung">
                                                            {item?.noiDung}
                                                        </div>
                                                        {item?.xacNhan ===
                                                        "Thành Công" ? (
                                                            <div className="thanhCong">
                                                                {item?.xacNhan}
                                                            </div>
                                                        ) : (
                                                            <div className="xacNhan">
                                                                {item?.xacNhan}
                                                            </div>
                                                        )}
                                                    </div>
                                                );
                                            }
                                        )}
                                </div>
                            </div>
                            <div className="tienVao">
                                <div className="tieuDe2">GD Ra</div>
                                <div className="allGiaoDich">
                                    {taiKhoan?.LichsuGiaoDich?.gdRa &&
                                    taiKhoan?.LichsuGiaoDich?.gdRa?.length !==
                                        0 ? (
                                        taiKhoan?.LichsuGiaoDich?.gdRa?.map(
                                            (item, index) => {
                                                return (
                                                    <div
                                                        className="chiTiet"
                                                        key={index}
                                                    >
                                                        <div className="thoiGian">
                                                            {item?.thoiGian.slice(
                                                                0,
                                                                10
                                                            )}
                                                            <br />
                                                            {item?.thoiGian.slice(
                                                                11,
                                                                19
                                                            )}
                                                        </div>
                                                        <div className="soTien">
                                                            {VND.format(
                                                                item?.soTien
                                                            )}
                                                        </div>
                                                        <div className="noiDung">
                                                            {item?.noiDung}
                                                        </div>
                                                        {item?.xacNhan ===
                                                        "Thành Công" ? (
                                                            <div className="thanhCong">
                                                                {item?.xacNhan}
                                                            </div>
                                                        ) : (
                                                            <div className="xacNhan">
                                                                {item?.xacNhan}
                                                            </div>
                                                        )}
                                                    </div>
                                                );
                                            }
                                        )
                                    ) : (
                                        <div>Trống</div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="pc">
                <div className="TaiKhoanUser-ConTaiNer">TaiKhoanUser</div>
            </div>
        </div>
    );
};
export default TaiKhoanUser;
