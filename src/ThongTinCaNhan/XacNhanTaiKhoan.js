import "./XacNhanTaiKhoan.scss";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import {
    getTaiKhoanXacNhan,
    updateTaiKhoan,
    getttShop,
    getYourPost,
    updatettShop,
    updateYourPost,
    registerTaiKhoan,
} from "../redux/apiRequest";
const XacNhanTaiKhoan = () => {
    const { tenVietTat, idShop, idCtv, tenCtv, sdtCtv } = useParams();
    const taiKhoan = useSelector(
        (state) => state?.taiKhoan?.taiKhoan?.taiKhoan?.taiKhoan
    );
    const allTaiKhoan2 = useSelector(
        (state) => state?.taiKhoan?.taiKhoan?.allTaiKhoan?.allTaiKhoan
    );
    const ttShop = useSelector((state) => state.ttShop.ttShop.ttShop?.shop);
    const yourDetail = useSelector((state) => state.post.post?.yourDetail);

    const [allTaiKhoan, setallTaiKhoan] = useState([]);
    const [loading, setloading] = useState(0);
    const [loading2, setloading2] = useState(0);
    const [soTien, setsoTien] = useState(0);

    const [sort, setsort] = useState(1);
    const [skip, setskip] = useState(0);
    const [limit, setlimit] = useState("50");
    const [ttGiaoDich, setttGiaoDich] = useState();

    const dispatch = useDispatch();

    useEffect(() => {
        const handleScroll = (e) => {
            const scrollHeight = e.target.documentElement.scrollHeight;
            const currentHeight =
                e.target.documentElement.scrollTop + window.innerHeight;
            if (currentHeight >= scrollHeight) {
                setskip(+skip + 50);
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [allTaiKhoan2]);
    useEffect(() => {
        getTaiKhoanXacNhan(sort, skip, limit, dispatch);
    }, [skip, loading2]);

    useEffect(() => {
        if (allTaiKhoan2 && allTaiKhoan2) {
            setallTaiKhoan([...allTaiKhoan2, ...allTaiKhoan]);
        }
    }, [allTaiKhoan2]);

    const VND = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
    });
    const handleDinhDangSo = (data) => {
        const n = +data;
        return n.toFixed(0).replace(/./g, function (c, i, a) {
            return i > 0 && c !== "," && (a.length - i) % 3 === 0 ? "." + c : c;
        });
    };
    const handleChiTietTk = (item) => {
        setloading2(2);
        setttGiaoDich(item);
        if (
            item?.thongTinThem?.loaiTK === "User" ||
            item?.thongTinThem?.loaiTK === "user"
        ) {
            getYourPost(item?.idChuTaiKhoan, dispatch);
        }
        if (
            item?.thongTinThem?.loaiTK === "Shop" ||
            item?.thongTinThem?.loaiTK === "shop"
        ) {
            getttShop(item?.idChuTaiKhoan, dispatch);
        }
    };
    const handleGiaoDichThanhCong = () => {
        if (
            ttGiaoDich?.thongTinThem?.loaiTK === "User" ||
            ttGiaoDich?.thongTinThem?.loaiTK === "user"
        ) {
            const newTaiKhoan = {
                xacNhanChuyenTien: "Thành Công",
            };
            console.log("newTaiKhoan", newTaiKhoan);
            updateTaiKhoan(newTaiKhoan, ttGiaoDich?._id, dispatch);

            const newPost = {
                cash: +yourDetail?.cash + +ttGiaoDich?.GDVao,
            };
            console.log("newPost", newPost);
            updateYourPost(newPost, yourDetail?._id, dispatch);
        } else {
            const newTaiKhoan = {
                xacNhanChuyenTien: "Thành Công",
            };
            console.log("newTaiKhoan", newTaiKhoan);
            updateTaiKhoan(newTaiKhoan, ttGiaoDich?._id, dispatch);

            const newShop = {
                cash: +ttShop?.cash + +taiKhoan?.GDVao,
            };
            console.log("newShop", newShop);
            updatettShop(newShop, ttShop?._id, dispatch);
        }
    };
    const handleGiaoDichChuaThanhCong = () => {
        if (
            ttGiaoDich?.thongTinThem?.loaiTK === "User" ||
            ttGiaoDich?.thongTinThem?.loaiTK === "user"
        ) {
            const newTaiKhoan = {
                xacNhanChuyenTien: "Chờ Xác Nhận",
            };
            console.log("newTaiKhoan", newTaiKhoan);
            updateTaiKhoan(newTaiKhoan, ttGiaoDich?._id, dispatch);

            const newPost = {
                cash: +yourDetail?.cash - +ttGiaoDich?.GDVao,
            };
            console.log("newPost", newPost);
            updateYourPost(newPost, yourDetail?._id, dispatch);
        } else {
            const newTaiKhoan = {
                xacNhanChuyenTien: "Chờ Xác Nhận",
            };
            console.log("newTaiKhoan", newTaiKhoan);
            updateTaiKhoan(newTaiKhoan, ttGiaoDich?._id, dispatch);

            const newShop = {
                cash: +ttShop?.cash - +taiKhoan?.GDVao,
            };
            console.log("newShop", newShop);
            updatettShop(newShop, ttShop?._id, dispatch);
        }
    };
    const handleCongKM = () => {
        if (soTien > 0) {
            if (
                ttGiaoDich?.thongTinThem?.loaiTK === "User" ||
                ttGiaoDich?.thongTinThem?.loaiTK === "user"
            ) {
                const newTaiKhoan = {
                    GDVao: +soTien,
                    GDRa: "",
                    noiDungCK: "Khuyến Mại",
                    xacNhanChuyenTien: "Thành Công",
                    thongTinThem: {
                        tenChuTk: yourDetail?.hoTen,
                        sdtChuTk: yourDetail?.soDienThoai,
                        loaiTK: "User",
                    },
                    idChuTaiKhoan: yourDetail?.user,
                };
                console.log("newTaiKhoan", newTaiKhoan);
                registerTaiKhoan(newTaiKhoan, dispatch);

                const newPost = {
                    cash: +yourDetail?.cash + +soTien,
                };
                console.log("newPost", newPost);
                updateYourPost(newPost, yourDetail?._id, dispatch);
            } else {
                const newTaiKhoan = {
                    GDVao: +soTien,
                    GDRa: "",
                    noiDungCK: "Khuyến Mại",
                    xacNhanChuyenTien: "Thành Công",
                    thongTinThem: {
                        tenChuTk: ttShop?.TenShop,
                        sdtChuTk: ttShop?.sdtShop,
                        loaiTK: "Shop",
                    },
                    idChuTaiKhoan: ttShop?._id,
                };
                console.log("newTaiKhoan", newTaiKhoan);
                registerTaiKhoan(newTaiKhoan, dispatch);

                const newShop = {
                    cash: +ttShop?.cash + +soTien,
                };
                console.log("newShop", newShop);
                updatettShop(newShop, ttShop?._id, dispatch);
            }
        } else {
            alert("Nhập số tiền!");
        }
    };
    const handleHuyKM = () => {
        if (
            ttGiaoDich?.thongTinThem?.loaiTK === "User" ||
            ttGiaoDich?.thongTinThem?.loaiTK === "user"
        ) {
            const newTaiKhoan = {
                GDVao: "",
                GDRa: +soTien,
                noiDungCK: "Huỷ KM",
                xacNhanChuyenTien: "Thành Công",
                thongTinThem: {
                    tenChuTk: yourDetail?.hoTen,
                    sdtChuTk: yourDetail?.soDienThoai,
                    loaiTK: "User",
                },
                idChuTaiKhoan: yourDetail?.user,
            };
            console.log("newTaiKhoan", newTaiKhoan);
            registerTaiKhoan(newTaiKhoan, dispatch);

            const newPost = {
                cash: +yourDetail?.cash - +soTien,
            };
            console.log("newPost", newPost);
            updateYourPost(newPost, yourDetail?._id, dispatch);
        } else {
            const newTaiKhoan = {
                GDVao: "",
                GDRa: +soTien,
                noiDungCK: "Huỷ KM",
                xacNhanChuyenTien: "Thành Công",
                thongTinThem: {
                    tenChuTk: ttShop?.TenShop,
                    sdtChuTk: ttShop?.sdtShop,
                    loaiTK: "Shop",
                },
                idChuTaiKhoan: ttShop?._id,
            };
            console.log("newTaiKhoan", newTaiKhoan);
            registerTaiKhoan(newTaiKhoan, dispatch);

            const newShop = {
                cash: +ttShop?.cash - +soTien,
            };
            console.log("newShop", newShop);
            updatettShop(newShop, ttShop?._id, dispatch);
        }
    };
    const handleQuayLai = () => {
        setloading2(0);
        setallTaiKhoan([]);
        skip(0);
    };

    return (
        <div className="view">
            <div className="mobile">
                {loading2 === 0 && (
                    <div className="XacNhanTaiKhoan-ConTaiNer">
                        <div className="quayLai-tieuDe">
                            <a
                                href={`/ca-nhan/${tenVietTat}/${idShop}/a/${idCtv}/${tenCtv}/${sdtCtv}`}
                                className="quayLai"
                            >
                                <i className="fa fa-angle-double-left"></i>Quay
                                Lại
                            </a>
                            <div className="tieuDe">Xác Nhận Giao Dịch</div>
                        </div>
                        <div className="allGiaoDich">
                            {allTaiKhoan &&
                                allTaiKhoan?.length !== 0 &&
                                allTaiKhoan?.map(
                                    (item, index) =>
                                        item?.GDVao && (
                                            <div
                                                onClick={() =>
                                                    handleChiTietTk(item)
                                                }
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
                                                    &nbsp; - &nbsp;
                                                    {item?.thongTinThem?.loaiTK}
                                                    &nbsp; - &nbsp;
                                                    {item?.xacNhanChuyenTien}
                                                </div>
                                                <div className="soTien-noiDung">
                                                    <div className="soTien">
                                                        +
                                                        {handleDinhDangSo(
                                                            item?.GDVao
                                                        )}
                                                        &#160;
                                                        <span>F&#160;</span>
                                                    </div>

                                                    <div className="chuTk">
                                                        {
                                                            item?.thongTinThem
                                                                ?.tenChuTk
                                                        }
                                                    </div>
                                                    <div className="sdtTk ">
                                                        {
                                                            item?.thongTinThem
                                                                ?.sdtChuTk
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                )}
                        </div>
                    </div>
                )}
                {loading2 === 2 && (
                    <div className="chiTietGiaoDich">
                        <div className="quayLai-tieuDe">
                            <div
                                onClick={() => handleQuayLai()}
                                className="quayLai"
                            >
                                <i className="fa fa-angle-double-left"></i>Quay
                                Lại
                            </div>
                            <div className="tieuDe">Chi Tiết Giao Dịch</div>
                        </div>
                        {ttGiaoDich?.thongTinThem?.loaiTK === "User" ||
                        ttGiaoDich?.thongTinThem?.loaiTK === "user" ? (
                            <div className="thongTinTaiKhoan">
                                <div className="tieuDe">
                                    Thông Tin Tài Khoản
                                </div>
                                <div className="noiDung">
                                    Chủ tài khoản : &#160;
                                    {ttGiaoDich?.thongTinThem?.tenChuTk}
                                </div>
                                <div className="noiDung ">
                                    Số điện thoại : &#160;
                                    {ttGiaoDich?.thongTinThem?.sdtChuTk}
                                </div>
                                <div className="noiDung">
                                    Số dư : &#160;
                                    {handleDinhDangSo(yourDetail?.cash)}
                                    &#160;
                                    <span>F&#160;</span>
                                </div>
                            </div>
                        ) : (
                            <div className="thongTinTaiKhoan">
                                <div className="tieuDe">
                                    Thông Tin Tài Khoản
                                </div>
                                <div className="noiDung ">
                                    Chủ tài khoản : &#160;
                                    <a
                                        href={`/${ttShop?.ttShopThem?.tenVietTat}/${ttShop?._id}/a/a/a/a`}
                                        className="lichSuGiaoDich"
                                    >
                                        {ttGiaoDich?.thongTinThem?.tenChuTk}
                                    </a>
                                </div>
                                <div className="noiDung ">
                                    Số điện thoại : &#160;
                                    {ttGiaoDich?.thongTinThem?.sdtChuTk}
                                </div>
                                <div className="noiDung">
                                    Số dư : &#160;
                                    {handleDinhDangSo(ttShop?.cash)}&#160;
                                    &#160;
                                    <span>F&#160;</span>
                                </div>
                            </div>
                        )}
                        <div className="khuyenMai">
                            <div className="tieuDe">Khuyến Mại</div>
                            <div className="soTien-noiDung-cong">
                                <input
                                    className="soTien"
                                    placeholder="Nhập số tiền"
                                    onChange={(e) => setsoTien(e.target.value)}
                                />
                                {taiKhoan?.noiDungCK === "Khuyến Mại" &&
                                ttGiaoDich?.idChuTaiKhoan ===
                                    taiKhoan?.idChuTaiKhoan &&
                                taiKhoan?.xacNhanChuyenTien === "Thành Công" ? (
                                    <div
                                        onClick={() => handleHuyKM()}
                                        className="tru"
                                    >
                                        Huỷ KM
                                    </div>
                                ) : (
                                    <div
                                        onClick={() => handleCongKM()}
                                        className="cong"
                                    >
                                        Cộng KM
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="xacNhanGiaoDich">
                            <div className="tieuDe">Xác Nhận Giao Dịch</div>
                            <div className="thoiGian-soTien-noiDung">
                                <div className="thoiGian">
                                    Thời gian <br />
                                    {new Date(ttGiaoDich?.createdAt)?.getDate()}
                                    /
                                    {new Date(
                                        ttGiaoDich?.createdAt
                                    )?.getMonth() + 1}
                                    /
                                    {new Date(
                                        ttGiaoDich?.createdAt
                                    )?.getFullYear()}
                                    &nbsp;
                                    {new Date(
                                        ttGiaoDich?.createdAt
                                    )?.getHours()}
                                    h
                                    {new Date(
                                        ttGiaoDich?.createdAt
                                    )?.getMinutes()}
                                </div>
                                <div className="soTien">
                                    Số tiền
                                    <br />
                                    {handleDinhDangSo(ttGiaoDich?.GDVao)}
                                    &#160;
                                    <span>F&#160;</span>
                                </div>
                                <div className="noiDung">
                                    Nội dung
                                    <br />
                                    {ttGiaoDich?.noiDungCK}
                                </div>
                            </div>
                            {taiKhoan?.noiDungCK === "Mua Fabysa Xanh" &&
                            ttGiaoDich?._id === taiKhoan?._id &&
                            taiKhoan?.xacNhanChuyenTien === "Thành Công" ? (
                                <div
                                    onClick={() =>
                                        handleGiaoDichChuaThanhCong()
                                    }
                                    className="chuaThanhCong"
                                >
                                    Chưa Thành Công
                                </div>
                            ) : (
                                <div
                                    onClick={() => handleGiaoDichThanhCong()}
                                    className="thanhCong"
                                >
                                    Thành Công
                                </div>
                            )}
                        </div>
                    </div>
                    // <div className="chiTietTk">
                    //     <div className="quayLai-tieuDe">
                    //         <div
                    //             onClick={() => setloading2(0)}
                    //             className="quayLai"
                    //         >
                    //             <i className="fa fa-angle-double-left"></i>Quay
                    //             Lại
                    //         </div>
                    //         <div className="tieuDe">Xác Nhận</div>
                    //         {ttGiaoDich?.thongTinThem?.loaiTK === "User" ||
                    //         ttGiaoDich?.thongTinThem?.loaiTK === "user" ? (
                    //             <div className="taiKhoanShop">
                    //                 {handleDinhDangSo(yourDetail?.cash)}
                    //                 &#160;
                    //                 <span>F&#160;</span>
                    //             </div>
                    //         ) : (
                    //             <div className="taiKhoanShop">
                    //                 {handleDinhDangSo(ttShop?.cash)}&#160;
                    //                 &#160;
                    //                 <span>F&#160;</span>
                    //             </div>
                    //         )}
                    //     </div>
                    //     <div className="chiTietTaiKhoan-container">
                    //         <div className="taiKhoan">
                    //             <div className="ten">
                    //                 {ttGiaoDich?.thongTinThem?.tenChuTk}
                    //             </div>
                    //             <div className="soTien">
                    //                 {VND.format(ttGiaoDich?.GDVao)}
                    //             </div>
                    //             <div
                    //                 onClick={() => handleXacNhan()}
                    //                 className="xacNhan3"
                    //             >
                    //                 Xác Nhận
                    //             </div>
                    //         </div>

                    //         <div className="khuyenMai-input">
                    //             <div className="tieuDeKm">Khuyến Mại</div>
                    //             <div className="input-xacNhan">
                    //                 <input
                    //                     onChange={(e) =>
                    //                         setsoTienCong(e.target.value)
                    //                     }
                    //                     className="input"
                    //                     placeholder="Nhập số tiền"
                    //                 />
                    //                 <div className="noiDung">Fabysa KM</div>
                    //                 <div
                    //                     onClick={() => handleCongTk()}
                    //                     className="xacNhan2"
                    //                 >
                    //                     Cộng TK
                    //                 </div>
                    //             </div>
                    //             <div className="tieuDeKm">Trừ Tài Khoản</div>
                    //             <div className="input-xacNhan">
                    //                 <input
                    //                     onChange={(e) =>
                    //                         setsoTienTru(e.target.value)
                    //                     }
                    //                     className="input"
                    //                     placeholder="Nhập số tiền"
                    //                 />
                    //                 <div className="noiDung">Cộng TK Sai</div>
                    //                 <div
                    //                     onClick={() => handletruTk()}
                    //                     className="xacNhan2"
                    //                 >
                    //                     Trừ TK
                    //                 </div>
                    //             </div>
                    //         </div>
                    //         <div className="lichSu-container">
                    //             <div className="tieuDe">Lịch Sử Giao Dịch</div>
                    //             <div className="tienVao-tienRa">
                    //                 <div className="tienVao">
                    //                     <div className="tieuDe2">GD Vào</div>

                    //                     <div className="allGiaoDich">
                    //                         {taiKhoan?.LichsuGiaoDich?.gdVao &&
                    //                             taiKhoan?.LichsuGiaoDich?.gdVao
                    //                                 ?.length !== 0 &&
                    //                             taiKhoan?.LichsuGiaoDich?.gdVao?.map(
                    //                                 (item, index) => {
                    //                                     return (
                    //                                         <div
                    //                                             className="chiTiet"
                    //                                             key={index}
                    //                                         >
                    //                                             <div className="thoiGian">
                    //                                                 {item?.thoiGian.slice(
                    //                                                     0,
                    //                                                     10
                    //                                                 )}
                    //                                                 <br />
                    //                                                 {item?.thoiGian.slice(
                    //                                                     11,
                    //                                                     19
                    //                                                 )}
                    //                                             </div>
                    //                                             <div className="soTien">
                    //                                                 {VND.format(
                    //                                                     item?.soTien
                    //                                                 )}
                    //                                             </div>
                    //                                             <div className="noiDung">
                    //                                                 {
                    //                                                     item?.noiDung
                    //                                                 }
                    //                                             </div>
                    //                                             {item?.xacNhan ===
                    //                                             "Thành Công" ? (
                    //                                                 <div className="thanhCong">
                    //                                                     {
                    //                                                         item?.xacNhan
                    //                                                     }
                    //                                                 </div>
                    //                                             ) : (
                    //                                                 <div className="xacNhan">
                    //                                                     {
                    //                                                         item?.xacNhan
                    //                                                     }
                    //                                                 </div>
                    //                                             )}
                    //                                         </div>
                    //                                     );
                    //                                 }
                    //                             )}
                    //                     </div>
                    //                 </div>
                    //                 <div className="tienVao">
                    //                     <div className="tieuDe2">GD Ra</div>
                    //                     <div className="allGiaoDich">
                    //                         {taiKhoan?.LichsuGiaoDich?.gdRa &&
                    //                         taiKhoan?.LichsuGiaoDich?.gdRa
                    //                             ?.length !== 0 ? (
                    //                             taiKhoan?.LichsuGiaoDich?.gdRa?.map(
                    //                                 (item, index) => {
                    //                                     return (
                    //                                         <div
                    //                                             className="chiTiet"
                    //                                             key={index}
                    //                                         >
                    //                                             <div className="thoiGian">
                    //                                                 {item?.thoiGian.slice(
                    //                                                     0,
                    //                                                     10
                    //                                                 )}
                    //                                                 <br />
                    //                                                 {item?.thoiGian.slice(
                    //                                                     11,
                    //                                                     19
                    //                                                 )}
                    //                                             </div>
                    //                                             <div className="soTien">
                    //                                                 {VND.format(
                    //                                                     item?.soTien
                    //                                                 )}
                    //                                             </div>
                    //                                             <div className="noiDung">
                    //                                                 {
                    //                                                     item?.noiDung
                    //                                                 }
                    //                                             </div>
                    //                                             {item?.xacNhan ===
                    //                                             "Thành Công" ? (
                    //                                                 <div className="thanhCong">
                    //                                                     {
                    //                                                         item?.xacNhan
                    //                                                     }
                    //                                                 </div>
                    //                                             ) : (
                    //                                                 <div className="xacNhan">
                    //                                                     {
                    //                                                         item?.xacNhan
                    //                                                     }
                    //                                                 </div>
                    //                                             )}
                    //                                         </div>
                    //                                     );
                    //                                 }
                    //                             )
                    //                         ) : (
                    //                             <div>Trống</div>
                    //                         )}
                    //                     </div>
                    //                 </div>
                    //             </div>
                    //         </div>
                    //     </div>
                    // </div>
                )}
            </div>
            <div className="pc">
                <div className="XacNhanTaiKhoan-ConTaiNer">XacNhanTaiKhoan</div>
            </div>
        </div>
    );
};
export default XacNhanTaiKhoan;
