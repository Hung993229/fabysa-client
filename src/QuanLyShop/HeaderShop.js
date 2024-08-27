import "./HeaderShop.scss";
import banner2 from "../assets/images/hinhNen.jpg";
import giohang from "../assets/images/giohang.jpg";
import avatarTrong from "../assets/images/logo2.jpeg";
import QRCode from "react-qr-code";
import QrScanner from "qr-scanner";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getttShop, updatePost } from "../redux/apiRequest";

const HeaderShop = (props) => {
    const { Tongtien, Tongsoluong, loading, setloading, handlexemAnh } = props;
    const { tenVietTat, idShop, idCtv, tenCtv, sdtCtv } = useParams();

    const dispatch = useDispatch();
    const ttShop = useSelector((state) => state.ttShop?.ttShop?.ttShop?.shop);
    const ttShopThem = ttShop?.ttShopThem;
    const khachSi = ttShopThem?.khachSi;
    const khachCtv = ttShopThem?.khachCtv;
    const nvBanHang = ttShopThem?.nvBanHang;
    const nvQuanLy = ttShopThem?.nvQuanLy;
    const user = useSelector((state) => state.auth.login.currentUser);
    const myDetail = useSelector((state) => state.post.post?.myDetail);
    const [soTien, setsoTien] = useState(0);
    const VND = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
    });
    useEffect(() => {
        getttShop(idShop, dispatch);
    }, []);

    const [banner, setbanner] = useState(banner2);
    useEffect(() => {
        if (ttShop) {
            setbanner(ttShopThem?.Banner || banner2);
        }
    }, [ttShop]);
    // qr code

    const [dataQrCode, setdataQrCode] = useState("");
    const [result, setResult] = useState("");
    const download = () => {
        const svg = document.getElementById("QRCode");
        const svgData = new XMLSerializer().serializeToString(svg);
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const img = new Image();
        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
            const pngFile = canvas.toDataURL("image/png");
            const downloadLink = document.createElement("a");
            // name image
            downloadLink.download = `${dataQrCode}`;
            downloadLink.href = `${pngFile}`;
            downloadLink.click();
        };
        img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
    };
    // read qr code
    const readCode = (e) => {
        console.log("e", e);
        const file = e.target.files[0];
        if (!file) {
            return;
        }
        QrScanner.scanImage(file, { returnDetailedScanResult: true })
            .then((result) => setResult(result.data))
            .catch((e) => console.log(e));
    };
    // qr code
    // like Shop

    const allLikeShop = myDetail?.likeShop;
    const handeleLikeShop = (idShop) => {
        const likeShop = [
            ...myDetail?.likeShop,
            {
                idShop: idShop,
                tenVietTat: ttShop?.ttShopThem?.tenVietTat,
                tenShop: ttShop?.TenShop,
                xa: ttShop?.xa,
                huyen: ttShop?.huyen,
                tinh: ttShop?.tinh,
                sdtShop: ttShop?.sdtShop,
            },
        ];

        const newPost = {
            likeShop: likeShop,
        };
        updatePost(newPost, myDetail._id, dispatch);
    };
    const handeleDislikeShop = (idShop) => {
        const likeShop = allLikeShop?.filter((item) => item?.idShop !== idShop);
        const newPost = {
            likeShop: likeShop,
        };
        updatePost(newPost, myDetail._id, dispatch);
    };
    const likeShop = allLikeShop?.find((item) => item?.idShop === idShop);

    // like Shop
    //  Viet QR
    const nganHang = ttShop?.ttShopThem?.nganHang;
    const BANK_ID = nganHang?.maSo;
    const ACCOUNT_NO = nganHang?.taiKhoanNganHang;
    const TEMPLATE = "print";
    const AMOUNT = soTien;
    const DESCRIPTION = "";
    const ACCOUNT_NAME = nganHang?.chuTaiKhoanNganhang;
    const qr = `https://img.vietqr.io/image/${BANK_ID}-${ACCOUNT_NO}-${TEMPLATE}.png?amount=${AMOUNT}&addInfo=${DESCRIPTION}&accountName=${ACCOUNT_NAME}`;
    // Viet QR

    // copy
    const [copySuccess, setCopySuccess] = useState("");
    const textAreaRef = useRef(null);
    function copyToClipboard(e) {
        textAreaRef.current.select();
        document.execCommand("copy");
        // This is just personal preference.
        // I prefer to not show the whole text area selected.
        e.target.focus();
        setCopySuccess("Copied!");
    }
    // copy
    return (
        <>
            {(loading === 0 || loading === 7 || loading === 8) && (
                <div className="HeaderShop-ConTaiNer">
                    {loading === 0 && (
                        <div className="headerShop21">
                            <div
                                onClick={() => setloading(2)}
                                className="gioHang21-container"
                            >
                                <img
                                    onClick={() => setloading(2)}
                                    src={giohang}
                                    alt="he"
                                    className="gioHang2"
                                />

                                <div className="soLuong-thanhTien">
                                    <div className="soLuong">{Tongsoluong}</div>
                                    <div className="thanhTien">
                                        {VND.format(Tongtien)}
                                    </div>
                                </div>
                            </div>
                            <div className="tieuDe">Menu Thông Minh</div>

                            {myDetail ? (
                                <a
                                    href={`/ca-nhan/${tenVietTat}/${idShop}/a/${idCtv}/${tenCtv}/${sdtCtv}`}
                                    className="caNhan"
                                >
                                    <div className="xinChao-taiKhoan">
                                        <div className="xinChao">Xin Chào!</div>
                                        <div className="taiKhoan">
                                            {myDetail?.cash}&#160;
                                            <i
                                                className="fab fa-empire"
                                                style={{ color: "#ef9b0f" }}
                                            ></i>
                                        </div>
                                    </div>

                                    <img
                                        src={myDetail?.avatar}
                                        alt="he"
                                        className="avatar"
                                    />
                                </a>
                            ) : (
                                <a
                                    href={`/ca-nhan/${tenVietTat}/${idShop}/a/${idCtv}/${tenCtv}/${sdtCtv}`}
                                    className="caNhan"
                                >
                                    <div className="xinChao-taiKhoan">
                                        <div className="xinChao">Thông Tin</div>
                                        <div className="taiKhoan">Cá Nhân</div>
                                    </div>
                                    <img
                                        src={avatarTrong}
                                        alt="he"
                                        className="avatar"
                                    />
                                </a>
                            )}
                        </div>
                    )}
                    {loading === 0 && (
                        <div className="banner-tenShop">
                            <img
                                onClick={() => handlexemAnh(banner)}
                                src={banner}
                                className="bannerx"
                            />
                            <div className="logo-tenShop-gioiThieu">
                                <div className="tenShop-gioiThieu-nganHang">
                                    <div className="tenShop-follow">
                                        <div className="tenShop">
                                            {ttShop?.TenShop}
                                        </div>
                                        {!myDetail ? (
                                            <div
                                                onClick={() =>
                                                    alert(
                                                        "Đăng nhập để sử dụng!"
                                                    )
                                                }
                                                className="follow"
                                            >
                                                <i className="fa fa-check-square"></i>
                                                &#160; Follow
                                            </div>
                                        ) : (
                                            <div>
                                                {likeShop &&
                                                likeShop.length !== 0 ? (
                                                    <div
                                                        onClick={(e) =>
                                                            handeleDislikeShop(
                                                                idShop
                                                            )
                                                        }
                                                        className="followed"
                                                    >
                                                        <i className="fa fa-check-square"></i>
                                                        &#160; Follow
                                                    </div>
                                                ) : (
                                                    <div
                                                        onClick={(e) =>
                                                            handeleLikeShop(
                                                                idShop
                                                            )
                                                        }
                                                        className="follow"
                                                    >
                                                        <i className="fa fa-check-square"></i>
                                                        &#160; Follow
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>

                                    <div className="gioiThieu-nganHang-follow">
                                        <div
                                            onClick={() => setloading(8)}
                                            className="gioiThieu"
                                        >
                                            <i className="fas fa-folder-open"></i>
                                            &#160;Giới Thiệu
                                        </div>
                                        <div
                                            onClick={() => setloading(7)}
                                            className="nganHang"
                                        >
                                            <i className="fas fa-building"></i>
                                            &#160;Ngân Hàng
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    {loading === 7 && (
                        <div className="nganHang-container">
                            <div className="quayLai-tieuDe">
                                <div
                                    className="quayLai"
                                    onClick={() => setloading(0)}
                                >
                                    <i className="fa fa-angle-double-left"></i>
                                    Quay Lại
                                </div>
                                <div className="tieuDe">
                                    Tài Khoản Ngân Hàng
                                </div>
                            </div>

                            <div className="ttTaiKhoan">
                                Thông Tin Tài Khoản
                            </div>
                            <div className="chiTietTaiKhoan">
                                Ngân Hàng:&nbsp;
                                {ttShop?.ttShopThem?.nganHang?.tenNganHang}
                                <br />
                                Số Tài Khoản:&nbsp;
                                {ttShop?.ttShopThem?.nganHang?.taiKhoanNganHang}
                                <br />
                                Chủ Tài Khoản:&nbsp;
                                {
                                    ttShop?.ttShopThem?.nganHang
                                        ?.chuTaiKhoanNganhang
                                }
                            </div>
                            <input
                                type="number"
                                onChange={(e) => setsoTien(e.target.value)}
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
                            <div className="maQr">Chuyển Khoản Nhanh</div>
                            <img className="qr" src={qr} />
                        </div>
                    )}
                    {loading === 8 && (
                        <div className="gioiThieuChiTiet">
                            <div className="quayLai-tieuDe">
                                <div
                                    className="quayLai"
                                    onClick={() => setloading(0)}
                                >
                                    <i className="fa fa-angle-double-left"></i>
                                    Quay Lại
                                </div>
                                <div className="tieuDe">Giới Thiệu Shop</div>
                            </div>

                            <div className="gioiThieu-container">
                                <div className="gioiThieu">Liên Hệ</div>
                                <div className="tenShop">
                                    &nbsp;{ttShop?.TenShop}
                                </div>
                                <div className="dc">
                                    Địa chỉ:&nbsp;
                                    {ttShop?.thonXom} - {ttShop?.xa} -
                                    {ttShop?.huyen} - {ttShop?.tinh} <br />
                                    Số điện thoại:&nbsp;
                                    {ttShop?.sdtShop} <br />
                                    Hỗ trợ Online: &nbsp;
                                    <a
                                        href={` https://zalo.me/${ttShopThem?.zalo}`}
                                        target="_blank"
                                        className="zalo"
                                    >
                                        Zalo
                                    </a>
                                    ,&nbsp;
                                    <a
                                        href={ttShopThem?.faceBook}
                                        target="_blank"
                                        className="zalo"
                                    >
                                        Facebook
                                    </a>
                                </div>
                            </div>
                            <div className="gioiThieu-container2">
                                <div className="gioiThieu2">Giới Thiệu</div>
                                <div
                                    className="gt2"
                                    dangerouslySetInnerHTML={{
                                        __html: ttShopThem?.gioiThieu,
                                    }}
                                ></div>
                            </div>
                            {(user?._id === ttShop?.user ||
                                user?.admin === true ||
                                nvQuanLy?.find(
                                    (item) =>
                                        item?.sdtnvQuanLy === user?.username
                                )) && (
                                <div className="quanLy-container">
                                    <div className="quanLy">Quản Lý</div>
                                    <a
                                        href={`/don-hang/${ttShop?._id}`}
                                        className="donHang"
                                    >
                                        Danh Sách Đơn Hàng
                                    </a>
                                    <a
                                        href={`/doi-tac/${ttShop?._id}`}
                                        className="donHang"
                                    >
                                        Danh Sách Khách Hàng
                                    </a>
                                    <a
                                        href={`/update-shop/${ttShop?._id}`}
                                        className="donHang"
                                    >
                                        Sửa Thông Tin Shop
                                    </a>
                                </div>
                            )}
                            <div className="khoContainer">
                                <div className="dsKho">Khách Hàng</div>
                                <a
                                    href={`/${ttShop?.ttShopThem?.tenVietTat}/${ttShop?._id}/a/a/a/a`}
                                    className="khoCtv"
                                >
                                    Mua Lẻ
                                </a>

                                {(khachCtv?.find(
                                    (item) =>
                                        item?.sdtKhachCtv === user?.username
                                ) ||
                                    user?._id === ttShop?.user ||
                                    user?.admin === true ||
                                    nvBanHang?.find(
                                        (item) =>
                                            item?.sdtnvBanHang ===
                                            user?.username
                                    ) ||
                                    nvQuanLy?.find(
                                        (item) =>
                                            item?.sdtnvQuanLy === user?.username
                                    )) && (
                                    <a
                                        className="khoCtv"
                                        href={`/kho-ctv/${ttShop?.ttShopThem?.tenVietTat}/${ttShop?._id}/a/a/a/a`}
                                    >
                                        Cộng Tác Viên
                                    </a>
                                )}
                                {(khachSi?.find(
                                    (item) =>
                                        item?.sdtKhachSi === user?.username
                                ) ||
                                    user?._id === ttShop?.user ||
                                    user?.admin === true ||
                                    nvBanHang?.find(
                                        (item) =>
                                            item?.sdtnvBanHang ===
                                            user?.username
                                    ) ||
                                    nvQuanLy?.find(
                                        (item) =>
                                            item?.sdtnvQuanLy === user?.username
                                    )) && (
                                    <a
                                        className="khoCtv"
                                        href={`/kho-si/${ttShop?.ttShopThem?.tenVietTat}/${ttShop?._id}/a/a/a/a`}
                                    >
                                        Mua Sỉ
                                    </a>
                                )}
                                {/* {!myDetail ? (
                                    <a href={`/dang-nhap`} className="khoCtv">
                                        Link Giới Thiệu Nhận Hoa Hồng
                                    </a>
                                ) : (
                                    <a
                                        href={`/${ttShop?.ttShopThem?.tenVietTat}/${ttShop?._id}/a/${myDetail?._id}/${myDetail.hoTen}/${myDetail.soDienThoai}`}
                                        className="khoCtv"
                                    >
                                        Link Giới Thiệu Nhận Hoa Hồng
                                    </a>
                                )} */}
                            </div>

                            <div className="qrcode-container">
                                <div className="qrcode">
                                    Mã QR Truy Cập Nhanh
                                </div>
                                <div
                                    onClick={download}
                                    style={{
                                        height: "auto",
                                        margin: "0 auto",
                                        maxWidth: 150,
                                        width: "100%",
                                    }}
                                >
                                    <QRCode
                                        size={256}
                                        style={{
                                            height: "auto",
                                            maxWidth: "100%",
                                            width: "100%",
                                        }}
                                        value={`https://fabysa.com/${ttShopThem?.tenVietTat}/${ttShop?._id}/a/a/a/a`}
                                        viewBox={`0 0 256 256`}
                                        id="QRCode"
                                    />
                                </div>
                                <div className="taiqr" onClick={download}>
                                    <i className="fa-solid fa-download">
                                        {" "}
                                        Download
                                    </i>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </>
    );
};
export default HeaderShop;
