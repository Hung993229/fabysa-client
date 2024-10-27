import "./TaiKhoanFabysa.scss";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getttShop, getTaiKhoan, registerTaiKhoan } from "../redux/apiRequest";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import BanPhimSo from "../GiaoDienChung/BanPhimSo";
import XemAnh from "../GiaoDienChung/XemAnh";
const TaiKhoanFabysa = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.login.currentUser);
    const ttShop = useSelector((state) => state?.ttShop?.ttShop?.ttShop?.shop);
    const myDetail = useSelector((state) => state.post.post?.myDetail);
    const taiKhoan = useSelector(
        (state) => state?.taiKhoan?.taiKhoan?.taiKhoan?.taiKhoan
    );
    const allTaiKhoan2 = useSelector(
        (state) => state?.taiKhoan?.taiKhoan?.allTaiKhoan?.allTaiKhoan
    );

    const { tenVietTat, idShop, idCtv, tenCtv, sdtCtv, idTaiKhoan } =
        useParams();
    const [soTien, setsoTien] = useState(0);
    const [loading, setloading] = useState("Thông Tin Tài Khoản");
    const [dateMax, setdateMax] = useState(0);
    const [dateMin, setdateMin] = useState(1);
    const [skip, setskip] = useState(0);
    const [limit, setlimit] = useState("30");
    const [sort, setsort] = useState(-1);
    const [giaoDichChon, setgiaoDichChon] = useState("Giao Dịch Vào");
    const [allTaiKhoan, setallTaiKhoan] = useState([]);

    const VND = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
    });
    useEffect(() => {
        const handleScroll = (e) => {
            const scrollHeight = e.target.documentElement.scrollHeight;
            const currentHeight =
                e.target.documentElement.scrollTop + window.innerHeight;
            if (currentHeight >= scrollHeight) {
                setskip(+skip + 30);
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [allTaiKhoan2]);
    useEffect(() => {
        if (
            giaoDichChon === "Giao Dịch Vào" &&
            loading === "Lịch Sử Giao Dịch"
        ) {
            const GDVao = 0;
            const GDRa = "";
            getTaiKhoan(
                idTaiKhoan,
                dateMax,
                dateMin,
                sort,
                GDVao,
                GDRa,
                skip,
                limit,
                dispatch
            );
        }
        if (
            giaoDichChon === "Giao Dịch Ra" &&
            loading === "Lịch Sử Giao Dịch"
        ) {
            const GDVao = "";
            const GDRa = 0;
            getTaiKhoan(
                idTaiKhoan,
                dateMax,
                dateMin,
                sort,
                GDVao,
                GDRa,
                skip,
                limit,
                dispatch
            );
        }
    }, [idTaiKhoan, loading, giaoDichChon, skip]);

    useEffect(() => {
        if (allTaiKhoan2 && allTaiKhoan2) {
            setallTaiKhoan([...allTaiKhoan2, ...allTaiKhoan]);
        }
    }, [allTaiKhoan2]);
    //  Viet QR
    // const nganHang = tenNganHang;
    const BANK_ID = "970422";
    const ACCOUNT_NO = "0931969456666";
    const TEMPLATE = "print";
    const AMOUNT = +soTien;
    const DESCRIPTION =
        idTaiKhoan === user?._id
            ? `USER_${user?.username}`
            : `SHOP_${ttShop?.sdtShop}`;
    const ACCOUNT_NAME = "TRAN VAN HUNG";
    const qr = `https://img.vietqr.io/image/${BANK_ID}-${ACCOUNT_NO}-${TEMPLATE}.png?amount=${AMOUNT}&addInfo=${DESCRIPTION}&accountName=${ACCOUNT_NAME}`;
    // Viet QR
    // BanPhimSo
    const [soThayThe, setsoThayThe] = useState();
    const [danhSachSo, setdanhSachSo] = useState([]);
    const handleDinhDangSo = (data) => {
        const n = +data;
        return n.toFixed(0).replace(/./g, function (c, i, a) {
            return i > 0 && c !== "," && (a.length - i) % 3 === 0 ? "." + c : c;
        });
    };
    const handleBanPhimSo = (soCanThay, giaTriSoThayThe) => {
        if (!giaTriSoThayThe) {
            setsoThayThe(soCanThay);
            if (!danhSachSo?.find((item) => item?.tenSo === soCanThay?.tenSo)) {
                setdanhSachSo([soCanThay, ...danhSachSo]);
            }
        } else {
            if (soThayThe && danhSachSo && danhSachSo?.length !== 0) {
                if (giaTriSoThayThe !== "xoa") {
                    const timSoThayThe = danhSachSo.find(
                        (item) => item?.tenSo === soThayThe?.tenSo
                    );
                    const soThayThe2 = {
                        tenSo: soThayThe?.tenSo,
                        giaTri: timSoThayThe?.giaTri + giaTriSoThayThe,
                    };
                    setdanhSachSo(
                        danhSachSo?.map((item) =>
                            item?.tenSo === soThayThe?.tenSo ? soThayThe2 : item
                        )
                    );
                    console.log("timSoThayThe", timSoThayThe);
                    console.log("soThayThe2", soThayThe2);
                } else {
                    const timSoThayThe = danhSachSo.find(
                        (item) => item?.tenSo === soThayThe?.tenSo
                    );
                    const soThayThe2 = {
                        tenSo: soThayThe?.tenSo,
                        giaTri: timSoThayThe?.giaTri.slice(0, -1),
                    };
                    setdanhSachSo(
                        danhSachSo?.map((item) =>
                            item?.tenSo === soThayThe?.tenSo ? soThayThe2 : item
                        )
                    );
                    console.log("timSoThayThe", timSoThayThe);
                    console.log("soThayThe2", soThayThe2);
                }
            }
        }
    };
    // BanPhimSo
    const handleLuuTaiKhoan = () => {
        if (soTien > 0) {
            if (idTaiKhoan === user?._id) {
                const newTaiKhoan = {
                    GDVao: +soTien,
                    GDRa: "",
                    noiDungCK: "Mua Fabysa Xanh",
                    xacNhanChuyenTien: "Chờ Xác Nhận",
                    thongTinThem: {
                        tenChuTk: myDetail?.hoTen,
                        sdtChuTk: user?.username,
                        loaiTK: "User",
                    },
                    idChuTaiKhoan: user?._id,
                };
                registerTaiKhoan(newTaiKhoan, dispatch);
            } else {
                const newTaiKhoan = {
                    GDVao: +soTien,
                    GDRa: "",
                    noiDungCK: "Mua Fabysa Xanh",
                    xacNhanChuyenTien: "Chờ Xác Nhận",
                    thongTinThem: {
                        tenChuTk: ttShop?.TenShop,
                        sdtChuTk: ttShop?.sdtShop,
                        loaiTK: "Shop",
                    },
                    idChuTaiKhoan: ttShop?._id,
                };
                registerTaiKhoan(newTaiKhoan, dispatch);
            }
        } else {
            alert("Nhập số tiền mua");
        }
    };
    const menuTaiKhoan = [
        "Thông Tin Tài Khoản",
        "Mua Fabysa Xanh",
        "Lịch Sử Giao Dịch",
    ];
    const lsGiaoDich = ["Giao Dịch Vào", "Giao Dịch Ra"];

    useEffect(() => {
        setsoTien(
            +danhSachSo?.find((item) => item?.tenSo === "Số Tiền Nhận")?.giaTri
        );
    }, [soThayThe]);
    // xemAnhFull
    const [xemAnhFull, setxemAnhFull] = useState();
    const handleXemAnhFull = (anh) => {
        setxemAnhFull(anh);
    };
    // xemAnhFull
    const handleChonDanhMuc = (item) => {
        setloading(item);
        setsoTien(0);
        setdanhSachSo([]);
        setsoThayThe();
        setallTaiKhoan([]);
        setskip(0)
    };
    const handleChonGiaoDich = (item) => {
        setgiaoDichChon(item);
        setallTaiKhoan([]);
        setskip(0);
    };
    return (
        <div className="view">
            <div className="mobile">
                {idTaiKhoan === user?._id && (
                    <div className="TaiKhoanFabysa-ConTaiNer">
                        <div className="quayLai-tieuDe">
                            <a
                                href={`/ca-nhan/${tenVietTat}/${idShop}/a/${idCtv}/${tenCtv}/${sdtCtv}`}
                                className="quayLai"
                            >
                                <i className="fa fa-angle-double-left"></i>
                                Quay Lại
                            </a>

                            <div className="donHang">Fabysa Xanh</div>
                            <div className="tien-container">
                                {handleDinhDangSo(myDetail?.cash)}
                                &#160;<span>F&#160;</span>
                            </div>
                        </div>
                        <div className="chonDanhMuc">
                            {menuTaiKhoan?.map((item) => {
                                return (
                                    <div
                                        key={item}
                                        onClick={() => handleChonDanhMuc(item)}
                                        className={
                                            item === loading
                                                ? "daChon"
                                                : "chuaChon"
                                        }
                                    >
                                        {item}
                                    </div>
                                );
                            })}
                        </div>
                        {loading === "Thông Tin Tài Khoản" && (
                            <div className="ttTaiKhoan">
                                <div className="tieuDe">Tài Khoản Cá Nhân</div>
                                <div className="noiDung">
                                    - Loại tài khoản : Fabysa Xanh
                                </div>
                                <div className="noiDung">
                                    - Chủ tài khoản :&#160;{myDetail?.hoTen}
                                </div>
                                <div className="noiDung">
                                    - Số dư :&#160;
                                    {handleDinhDangSo(myDetail?.cash)}
                                    &#160;<span>F&#160;</span>
                                </div>

                                <div className="tieuDe">
                                    Giới Thiệu Fabysa Xanh
                                </div>
                                <div className="noiDung">
                                    - Kí hiệu : &#160;<span>F&#160;</span>
                                </div>
                                <div className="noiDung">
                                    - Quy đổi : 1&#160;<span>F&#160;</span>
                                    &#160;=&#160;1&#160;VNĐ
                                </div>
                                <div className="noiDung">
                                    - Sử dụng : Dùng Fabysa Xanh giúp hoạt động
                                    giao dịch trên Fabysa.com được nhanh chóng
                                    hơn.
                                </div>
                                <div className="noiDung">
                                    - Ví dụ : Shop trả phí nền tảng, người dùng
                                    có dùng để cọc tiền hàng và thanh toán phí
                                    nền tảng khi nhận việc giao hàng qua
                                    Fabysa.com, đổi lấy sản phẩm và quà tặng ưu
                                    đãi, ...
                                </div>
                                <div className="kiHieu-container">
                                    <div className="kiHieu">F&#160;</div>
                                </div>
                            </div>
                        )}
                        {loading === "Mua Fabysa Xanh" && (
                            <div className="muaFabysaXanh">
                                <div className="tieuDe">Mua Fabysa Xanh</div>
                                <div className="donGia-soLuong-thanhTien">
                                    <div className="donGia">
                                        Đơn Giá
                                        <br /> 1.000đ /1.000&#160;
                                        <span>F&#160;</span>
                                    </div>
                                    <div className="soLuong">
                                        Số Lượng
                                        <br />
                                        <div
                                            className="input"
                                            onClick={() =>
                                                handleBanPhimSo(
                                                    {
                                                        tenSo: "Số Tiền Nhận",
                                                        giaTri: "0",
                                                    },
                                                    ""
                                                )
                                            }
                                        >
                                            {VND.format(
                                                danhSachSo?.find(
                                                    (item) =>
                                                        item?.tenSo ===
                                                        "Số Tiền Nhận"
                                                )?.giaTri || 0
                                            )}
                                        </div>
                                    </div>
                                    <div className="thanhTien">
                                        Thành Tiền
                                        <br />
                                        {VND.format(
                                            danhSachSo?.find(
                                                (item) =>
                                                    item?.tenSo ===
                                                    "Số Tiền Nhận"
                                            )?.giaTri || 0
                                        )}
                                    </div>
                                </div>

                                <div className="tieuDe">Thanh Toán Hoá Đơn</div>
                                <div className="taikhoan">
                                    <div className="ttTaiKhoan2">
                                        <div className="nganHang">
                                            Ngân hàng
                                        </div>
                                        <div className="tenNganHang">
                                            MBBank
                                        </div>
                                        <div className="nganHang">
                                            Số tài Khoản
                                        </div>
                                        <div className="tenNganHang">
                                            0931969456666
                                        </div>
                                        <div className="nganHang">
                                            Chủ Tài Khoản
                                        </div>
                                        <div className="tenNganHang">
                                            Trần Văn Hùng
                                        </div>
                                        <div className="nganHang">
                                            Số Tiền Nhận
                                        </div>
                                        <div className="tenNganHang">
                                            {VND.format(
                                                danhSachSo?.find(
                                                    (item) =>
                                                        item?.tenSo ===
                                                        "Số Tiền Nhận"
                                                )?.giaTri || 0
                                            )}
                                        </div>
                                        <div className="nganHang">Nội Dung</div>
                                        <div className="tenNganHang">
                                            {DESCRIPTION}
                                        </div>
                                    </div>
                                    <div className="qr-container">
                                        <img
                                            onClick={() => handleXemAnhFull(qr)}
                                            className="maQr"
                                            src={qr}
                                        />
                                    </div>
                                </div>
                                <div className="ghiChu">
                                    - Lưu ý : Sau khi chuyển khoản hệ thống cần
                                    thời gian để xác nhận giao dịch và hoàn
                                    thành việc mua Fabysa Xanh. Vui lòng chờ
                                    trong ít phút. Xin cảm ơn! <br /> - Cần hỗ
                                    trợ liên hệ : &nbsp;
                                    <a
                                        className="dienThoai"
                                        href={`tel:0976993229`}
                                    >
                                        &nbsp;
                                        <i
                                            className="fa fa-phone-square"
                                            style={{ color: "#04aa6d" }}
                                        ></i>
                                        &nbsp; 0976.993.229
                                    </a>
                                    &nbsp; - &nbsp;
                                    <a
                                        className="zalo"
                                        href={` https://zalo.me/0976993229`}
                                        target="_blank"
                                    >
                                        Zalo
                                    </a>
                                </div>
                                {taiKhoan?.thongTinThem?.loaiTK !== "Shop" &&
                                taiKhoan?.thongTinThem?.loaiTK !== "shop" &&
                                taiKhoan?.xacNhanChuyenTien ===
                                    "Chờ Xác Nhận" ? (
                                    <div className="xacNhanGiaoDich">
                                        Giao dịch đang được xác nhận! Vui lòng
                                        chờ!
                                    </div>
                                ) : (
                                    <div
                                        onClick={() => handleLuuTaiKhoan()}
                                        className="daChuyenKhoan"
                                    >
                                        Đã Chuyển Khoản
                                    </div>
                                )}
                            </div>
                        )}
                        {loading === "Lịch Sử Giao Dịch" && (
                            <div className="lichSuaGD">
                                <div className="chonGiaoDich">
                                    {lsGiaoDich?.map((item) => {
                                        return (
                                            <div
                                                key={item}
                                                onClick={() =>
                                                    handleChonGiaoDich(item)
                                                }
                                                className={
                                                    item === giaoDichChon
                                                        ? "daChon"
                                                        : "chuaChon"
                                                }
                                            >
                                                {item}
                                            </div>
                                        );
                                    })}
                                </div>
                                <div className="dsGiaoDich">
                                    Danh sách giao dịch{" "}
                                </div>
                                <div className="allGiaoDich">
                                    {allTaiKhoan &&
                                        allTaiKhoan?.length !== 0 &&
                                        allTaiKhoan?.map(
                                            (item, index) =>
                                                item?.GDVao && (
                                                    <div
                                                        className="chiTiet"
                                                        key={index}
                                                    >
                                                        <div className="thoiGian">
                                                            {new Date(
                                                                item?.createdAt
                                                            )?.getDate()}
                                                            /
                                                            {new Date(
                                                                item?.createdAt
                                                            )?.getMonth() + 1}
                                                            /
                                                            {new Date(
                                                                item?.createdAt
                                                            )?.getFullYear()}
                                                            &nbsp;
                                                            {new Date(
                                                                item?.createdAt
                                                            )?.getHours()}
                                                            h
                                                            {new Date(
                                                                item?.createdAt
                                                            )?.getMinutes()}
                                                        </div>
                                                        <div className="soTien-noiDung">
                                                            <div className="soTien">
                                                                +
                                                                {handleDinhDangSo(
                                                                    item?.GDVao
                                                                )}
                                                                &#160;
                                                                <span>
                                                                    F&#160;
                                                                </span>
                                                            </div>
                                                            <div className="noiDung">
                                                                {
                                                                    item?.noiDungCK
                                                                }
                                                            </div>
                                                            {item?.xacNhanChuyenTien ===
                                                            "Thành Công" ? (
                                                                <div className="thanhCong">
                                                                    {
                                                                        item?.xacNhanChuyenTien
                                                                    }
                                                                </div>
                                                            ) : (
                                                                <div className="xacNhan">
                                                                    {
                                                                        item?.xacNhanChuyenTien
                                                                    }
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                )
                                        )}
                                    {allTaiKhoan &&
                                        allTaiKhoan?.length !== 0 &&
                                        allTaiKhoan?.map(
                                            (item, index) =>
                                                item?.GDRa && (
                                                    <div
                                                        className="chiTiet"
                                                        key={index}
                                                    >
                                                        <div className="thoiGian">
                                                            {new Date(
                                                                item?.createdAt
                                                            )?.getDate()}
                                                            /
                                                            {new Date(
                                                                item?.createdAt
                                                            )?.getMonth() + 1}
                                                            /
                                                            {new Date(
                                                                item?.createdAt
                                                            )?.getFullYear()}
                                                            &nbsp;
                                                            {new Date(
                                                                item?.createdAt
                                                            )?.getHours()}
                                                            h
                                                            {new Date(
                                                                item?.createdAt
                                                            )?.getMinutes()}
                                                        </div>
                                                        <div className="soTien-noiDung">
                                                            <div className="soTien">
                                                                -
                                                                {handleDinhDangSo(
                                                                    item?.GDRa
                                                                )}
                                                                &#160;
                                                                <span>
                                                                    F&#160;
                                                                </span>
                                                            </div>
                                                            <div className="noiDung">
                                                                {
                                                                    item?.noiDungCK
                                                                }
                                                            </div>
                                                            {item?.xacNhanChuyenTien ===
                                                            "Thành Công" ? (
                                                                <div className="thanhCong">
                                                                    {
                                                                        item?.xacNhanChuyenTien
                                                                    }
                                                                </div>
                                                            ) : (
                                                                <div className="xacNhan">
                                                                    {
                                                                        item?.xacNhanChuyenTien
                                                                    }
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                )
                                        )}
                                </div>
                            </div>
                        )}
                    </div>
                )}
                {ttShop && idTaiKhoan !== user?._id && (
                    <div className="TaiKhoanFabysa-ConTaiNer">
                        <div className="quayLai-tieuDe">
                            <a
                                href={`/${tenVietTat}/${idShop}/a/${idCtv}/${tenCtv}/${sdtCtv}`}
                                className="quayLai"
                            >
                                <i className="fa fa-angle-double-left"></i>
                                Quay Lại
                            </a>

                            <div className="donHang">Fabysa Xanh</div>
                            <div className="tien-container">
                                {handleDinhDangSo(ttShop?.cash)}
                                &#160;<span>F&#160;</span>
                            </div>
                        </div>
                        <div className="chonDanhMuc">
                            {menuTaiKhoan?.map((item) => {
                                return (
                                    <div
                                        key={item}
                                        onClick={() => handleChonDanhMuc(item)}
                                        className={
                                            item === loading
                                                ? "daChon"
                                                : "chuaChon"
                                        }
                                    >
                                        {item}
                                    </div>
                                );
                            })}
                        </div>
                        {loading === "Thông Tin Tài Khoản" && (
                            <div className="ttTaiKhoan">
                                <div className="tieuDe">Tài Khoản Cá Nhân</div>
                                <div className="noiDung">
                                    - Loại tài khoản : Fabysa Xanh
                                </div>
                                <div className="noiDung">
                                    - Chủ tài khoản :&#160;{ttShop?.TenShop}
                                </div>
                                <div className="noiDung">
                                    - Số dư :&#160;
                                    {handleDinhDangSo(ttShop?.cash)}
                                    &#160;<span>F&#160;</span>
                                </div>

                                <div className="tieuDe">
                                    Giới Thiệu Fabysa Xanh
                                </div>
                                <div className="noiDung">
                                    - Kí hiệu : &#160;<span>F&#160;</span>
                                </div>
                                <div className="noiDung">
                                    - Quy đổi : 1&#160;<span>F&#160;</span>
                                    &#160;=&#160;1&#160;VNĐ
                                </div>
                                <div className="noiDung">
                                    - Sử dụng : Dùng Fabysa Xanh giúp hoạt động
                                    giao dịch trên Fabysa.com được nhanh chóng
                                    hơn.
                                </div>
                                <div className="noiDung">
                                    - Ví dụ : Shop trả phí nền tảng, người dùng
                                    có dùng để cọc tiền hàng và thanh toán phí
                                    nền tảng khi nhận việc giao hàng qua
                                    Fabysa.com, đổi lấy sản phẩm và quà tặng ưu
                                    đãi, ...
                                </div>
                                <div className="kiHieu-container">
                                    <div className="kiHieu">F&#160;</div>
                                </div>
                            </div>
                        )}
                        {loading === "Mua Fabysa Xanh" && (
                            <div className="muaFabysaXanh">
                                <div className="tieuDe">Mua Fabysa Xanh</div>
                                <div className="donGia-soLuong-thanhTien">
                                    <div className="donGia">
                                        Đơn Giá
                                        <br /> 1.000đ /1.000&#160;
                                        <span>F&#160;</span>
                                    </div>
                                    <div className="soLuong">
                                        Số Lượng
                                        <br />
                                        <div
                                            className="input"
                                            onClick={() =>
                                                handleBanPhimSo(
                                                    {
                                                        tenSo: "Số Tiền Nhận",
                                                        giaTri: "0",
                                                    },
                                                    ""
                                                )
                                            }
                                        >
                                            {VND.format(
                                                danhSachSo?.find(
                                                    (item) =>
                                                        item?.tenSo ===
                                                        "Số Tiền Nhận"
                                                )?.giaTri || 0
                                            )}
                                        </div>
                                    </div>
                                    <div className="thanhTien">
                                        Thành Tiền
                                        <br />
                                        {VND.format(
                                            danhSachSo?.find(
                                                (item) =>
                                                    item?.tenSo ===
                                                    "Số Tiền Nhận"
                                            )?.giaTri || 0
                                        )}
                                    </div>
                                </div>

                                <div className="tieuDe">Thanh Toán Hoá Đơn</div>
                                <div className="taikhoan">
                                    <div className="ttTaiKhoan2">
                                        <div className="nganHang">
                                            Ngân hàng
                                        </div>
                                        <div className="tenNganHang">
                                            MBBank
                                        </div>
                                        <div className="nganHang">
                                            Số tài Khoản
                                        </div>
                                        <div className="tenNganHang">
                                            0931969456666
                                        </div>
                                        <div className="nganHang">
                                            Chủ Tài Khoản
                                        </div>
                                        <div className="tenNganHang">
                                            Trần Văn Hùng
                                        </div>
                                        <div className="nganHang">
                                            Số Tiền Nhận
                                        </div>
                                        <div className="tenNganHang">
                                            {VND.format(
                                                danhSachSo?.find(
                                                    (item) =>
                                                        item?.tenSo ===
                                                        "Số Tiền Nhận"
                                                )?.giaTri || 0
                                            )}
                                        </div>
                                        <div className="nganHang">Nội Dung</div>
                                        <div className="tenNganHang">
                                            {DESCRIPTION}
                                        </div>
                                    </div>
                                    <div className="qr-container">
                                        <img
                                            onClick={() => handleXemAnhFull(qr)}
                                            className="maQr"
                                            src={qr}
                                        />
                                    </div>
                                </div>
                                <div className="ghiChu">
                                    - Lưu ý : Sau khi chuyển khoản hệ thống cần
                                    thời gian để xác nhận giao dịch và hoàn
                                    thành việc mua Fabysa Xanh. Vui lòng chờ
                                    trong ít phút. Xin cảm ơn! <br /> - Cần hỗ
                                    trợ liên hệ : &nbsp;
                                    <a
                                        className="dienThoai"
                                        href={`tel:0976993229`}
                                    >
                                        &nbsp;
                                        <i
                                            className="fa fa-phone-square"
                                            style={{ color: "#04aa6d" }}
                                        ></i>
                                        &nbsp; 0976.993.229
                                    </a>
                                    &nbsp; - &nbsp;
                                    <a
                                        className="zalo"
                                        href={` https://zalo.me/0976993229`}
                                        target="_blank"
                                    >
                                        Zalo
                                    </a>
                                </div>
                                {taiKhoan?.thongTinThem?.loaiTK !== "User" &&
                                taiKhoan?.thongTinThem?.loaiTK !== "user" &&
                                taiKhoan?.xacNhanChuyenTien ===
                                    "Chờ Xác Nhận" ? (
                                    <div className="xacNhanGiaoDich">
                                        Giao dịch đang được xác nhận! Vui lòng
                                        chờ!
                                    </div>
                                ) : (
                                    <div
                                        onClick={() => handleLuuTaiKhoan()}
                                        className="daChuyenKhoan"
                                    >
                                        Đã Chuyển Khoản
                                    </div>
                                )}
                            </div>
                        )}
                        {loading === "Lịch Sử Giao Dịch" && (
                            <div className="lichSuaGD">
                                <div className="chonGiaoDich">
                                    {lsGiaoDich?.map((item) => {
                                        return (
                                            <div
                                                key={item}
                                                onClick={() =>
                                                    handleChonGiaoDich(item)
                                                }
                                                className={
                                                    item === giaoDichChon
                                                        ? "daChon"
                                                        : "chuaChon"
                                                }
                                            >
                                                {item}
                                            </div>
                                        );
                                    })}
                                </div>
                                <div className="dsGiaoDich">
                                    Danh sách giao dịch
                                </div>
                                <div className="allGiaoDich">
                                    {allTaiKhoan &&
                                        allTaiKhoan?.length !== 0 &&
                                        allTaiKhoan?.map(
                                            (item, index) =>
                                                item?.GDVao && (
                                                    <div
                                                        className="chiTiet"
                                                        key={index}
                                                    >
                                                        <div className="thoiGian">
                                                            {new Date(
                                                                item?.createdAt
                                                            )?.getDate()}
                                                            /
                                                            {new Date(
                                                                item?.createdAt
                                                            )?.getMonth() + 1}
                                                            /
                                                            {new Date(
                                                                item?.createdAt
                                                            )?.getFullYear()}
                                                            &nbsp;
                                                            {new Date(
                                                                item?.createdAt
                                                            )?.getHours()}
                                                            h
                                                            {new Date(
                                                                item?.createdAt
                                                            )?.getMinutes()}
                                                        </div>
                                                        <div className="soTien-noiDung">
                                                            <div className="soTien">
                                                                +
                                                                {handleDinhDangSo(
                                                                    item?.GDVao
                                                                )}
                                                                &#160;
                                                                <span>
                                                                    F&#160;
                                                                </span>
                                                            </div>
                                                            <div className="noiDung">
                                                                {
                                                                    item?.noiDungCK
                                                                }
                                                            </div>
                                                            {item?.xacNhanChuyenTien ===
                                                            "Thành Công" ? (
                                                                <div className="thanhCong">
                                                                    {
                                                                        item?.xacNhanChuyenTien
                                                                    }
                                                                </div>
                                                            ) : (
                                                                <div className="xacNhan">
                                                                    {
                                                                        item?.xacNhanChuyenTien
                                                                    }
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                )
                                        )}
                                    {allTaiKhoan &&
                                        allTaiKhoan?.length !== 0 &&
                                        allTaiKhoan?.map(
                                            (item, index) =>
                                                item?.GDRa && (
                                                    <div
                                                        className="chiTiet"
                                                        key={index}
                                                    >
                                                        <div className="thoiGian">
                                                            {new Date(
                                                                item?.createdAt
                                                            )?.getDate()}
                                                            /
                                                            {new Date(
                                                                item?.createdAt
                                                            )?.getMonth() + 1}
                                                            /
                                                            {new Date(
                                                                item?.createdAt
                                                            )?.getFullYear()}
                                                            &nbsp;
                                                            {new Date(
                                                                item?.createdAt
                                                            )?.getHours()}
                                                            h
                                                            {new Date(
                                                                item?.createdAt
                                                            )?.getMinutes()}
                                                        </div>
                                                        <div className="soTien-noiDung">
                                                            <div className="soTien">
                                                                -
                                                                {handleDinhDangSo(
                                                                    item?.GDRa
                                                                )}
                                                                &#160;
                                                                <span>
                                                                    F&#160;
                                                                </span>
                                                            </div>
                                                            <div className="noiDung">
                                                                {
                                                                    item?.noiDungCK
                                                                }
                                                            </div>
                                                            {item?.xacNhanChuyenTien ===
                                                            "Thành Công" ? (
                                                                <div className="thanhCong">
                                                                    {
                                                                        item?.xacNhanChuyenTien
                                                                    }
                                                                </div>
                                                            ) : (
                                                                <div className="xacNhan">
                                                                    {
                                                                        item?.xacNhanChuyenTien
                                                                    }
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                )
                                        )}
                                </div>
                            </div>
                        )}
                    </div>
                )}
                {soThayThe && (
                    <BanPhimSo
                        handleBanPhimSo={handleBanPhimSo}
                        soThayThe={soThayThe}
                        setsoThayThe={setsoThayThe}
                        danhSachSo={danhSachSo}
                        setdanhSachSo={setdanhSachSo}
                        handleDinhDangSo={handleDinhDangSo}
                    />
                )}
            </div>
            <div className="pc">
                <div className="TaiKhoanFabysa-ConTaiNer">TaiKhoanFabysa</div>
            </div>
            {xemAnhFull && (
                <XemAnh xemAnhFull={xemAnhFull} setxemAnhFull={setxemAnhFull} />
            )}
        </div>
    );
};
export default TaiKhoanFabysa;
