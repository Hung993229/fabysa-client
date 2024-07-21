import "./HeaderShop.scss";
import facebookLogo from "../assets/images/Facebook_Logo.png";
import zaloLogo from "../assets/images/zaloLogo.png";
import logoInternet from "../assets/images/logoInternet.jpg";
import logoInternet2 from "../assets/images/tuvanvien.jpg";
import QRCode from "react-qr-code";
import QrScanner from "qr-scanner";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getttShop, updatePost } from "../redux/apiRequest";

const HeaderShop = (props) => {
    const { loading, setloading } = props;
    const { tenVietTat, idShop, idCtv, tenCtv, sdtCtv } = useParams();
    const dispatch = useDispatch();
    const ttShop = useSelector((state) => state.ttShop.ttShop.ttShop?.shop);
    const ttShopThem = ttShop?.ttShopThem;
    const khachSi = ttShopThem?.khachSi;
    const khachCtv = ttShopThem?.khachCtv;
    const nvBanHang = ttShopThem?.nvBanHang;
    const nvQuanLy = ttShopThem?.nvQuanLy;

    const user = useSelector((state) => state.auth.login.currentUser);
    const myDetail = useSelector((state) => state.post.post?.myDetail);
    const [soTien, setsoTien] = useState(0);
    const [suaPost, setsuaPost] = useState(0);
    const VND = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
    });
    useEffect(() => {
        getttShop(idShop, dispatch);
    }, []);
    // qr code
    const [data, setdata] = useState();
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
        console.log("idShop", idShop);
        const likeShop = [
            ...myDetail?.likeShop,
            { idShop: idShop, tenShop: ttShop?.TenShop },
        ];
        const newPost = {
            likeShop: likeShop,
        };
        console.log("newPost", newPost);
        updatePost(newPost, myDetail._id, dispatch, setsuaPost);
    };
    const handeleDislikeShop = (idShop) => {
        console.log("idShop", idShop);
        const likeShop = allLikeShop?.filter((item) => item?.idShop !== idShop);
        const newPost = {
            likeShop: likeShop,
        };
        console.log("newPost", newPost);
        updatePost(newPost, myDetail._id, dispatch, setsuaPost);
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
                        <div className="banner-tenShop">
                            <img src={ttShopThem?.Banner} className="banner" />
                            <div className="tenShop">{ttShop?.TenShop}</div>
                            {!myDetail ? (
                                <a href={`/shop/dang-nhap/${idShop}`}>
                                    <div className="like">Follow</div>
                                </a>
                            ) : (
                                <div>
                                    {likeShop && likeShop.length !== 0 ? (
                                        <div
                                            className="daLike"
                                            onClick={(e) =>
                                                handeleDislikeShop(idShop)
                                            }
                                        >
                                            Follow
                                        </div>
                                    ) : (
                                        <div
                                            className="like"
                                            onClick={(e) =>
                                                handeleLikeShop(idShop)
                                            }
                                        >
                                            Follow
                                        </div>
                                    )}
                                </div>
                            )}
                            <div className="nganHang-gioiThieu">
                                <div
                                    className="nganHang"
                                    onClick={() => setloading(7)}
                                >
                                    <div>Ngân Hàng</div>
                                </div>
                                <div
                                    className="gioiThieu"
                                    onClick={() => setloading(8)}
                                >
                                    <div>Giới Thiệu</div>
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
                                    onClick={() => setsoTien(20000)}
                                    className="giaTriTien"
                                >
                                    {VND.format(20000)}
                                </div>
                                <div
                                    onClick={() => setsoTien(50000)}
                                    className="giaTriTien"
                                >
                                    {VND.format(50000)}
                                </div>
                                <div
                                    onClick={() => setsoTien(100000)}
                                    className="giaTriTien"
                                >
                                    {VND.format(100000)}
                                </div>
                                <div
                                    onClick={() => setsoTien(200000)}
                                    className="giaTriTien"
                                >
                                    {VND.format(200000)}
                                </div>
                                <div
                                    onClick={() => setsoTien(500000)}
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
                                    Quay Lại
                                </div>
                                <div className="tieuDe">
                                    Giới Thiệu Cửa hàng
                                </div>
                            </div>
                            <div className="gioiThieu-container">
                                <div className="gioiThieu">Giới Thiệu</div>
                                <div className="tenShop">
                                    &nbsp;{ttShop?.TenShop}
                                </div>
                                <div className="dc">
                                    Địa chỉ:&nbsp;
                                    {ttShop?.thonXom} - {ttShop?.xa} -
                                    {ttShop?.huyen} - {ttShop?.tinh} <br />
                                    Số điện thoại:&nbsp;
                                    {ttShop?.sdtShop} <br />
                                    Hỗ trợ tư vấn 24/7: &nbsp;
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
                            {(user?._id === ttShop?.user ||
                                user?.admin === true ||
                                nvQuanLy?.find(
                                    (item) =>
                                        item?.sdtnvQuanLy === user?.username
                                ))&&
                            <div className="quanLy-container">
                                <div className="quanLy">Quản Lý</div>
                                <a
                                    href={`/don-hang/${ttShop._id}`}
                                    className="donHang"
                                >
                                    Đơn Hàng
                                </a>
                                <a
                                    href={`/doi-tac/${ttShop._id}`}
                                    className="donHang"
                                >
                                    Đối Tác
                                </a>
                                {/* <div className="donHang">Báo Cáo</div> */}
                                <a
                                    href={`/update-shop/${ttShop._id}`}
                                    className="donHang"
                                >
                                    Cập Nhật Thông Tin Shop
                                </a>
                            </div>}
                            <div className="khoContainer">
                                <div className="dsKho">Đối Tác</div>
                                <a
                                    href={`/${ttShop?.ttShopThem?.tenVietTat}/${ttShop?._id}/a/a/a/a`}
                                    className="khoCtv"
                                >
                                    Kho Bán Lẻ
                                </a>
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
                                        href={`/shop/kho-si/${idShop}`}
                                    >
                                        Kho Bán Sỉ
                                    </a>
                                )}
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
                                        href={`/shop/kho-ctv/${idShop}`}
                                    >
                                        Kho Cộng Tác Viên
                                    </a>
                                )}
                                {!myDetail ? (
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
                                )}
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
                                        value={`https://fabysa/${ttShopThem?.tenVietTat}/${ttShop?._id}/a/a/a/a`}
                                        viewBox={`0 0 256 256`}
                                        id="QRCode"
                                    />
                                </div>
                                <div className="taiqr" onClick={download}>
                                    Lưu Về Máy
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
