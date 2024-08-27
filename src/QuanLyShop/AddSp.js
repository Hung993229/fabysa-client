import "./AddSp.scss";
import { useState } from "react";
import { useEffect } from "react";
import CommonUtils from "../component/CommonUtils";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import themAnh from "../assets/images/themAnh.png";
import Loading from "../GiaoDienChung/Loading";

import { getttShop, registerSanPham } from "../redux/apiRequest";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const AddSp = () => {
    const { idShop } = useParams();
    const dispatch = useDispatch();
    useEffect(() => {
        getttShop(idShop, dispatch);
    }, []);
    const ttShop = useSelector((state) => state.ttShop.ttShop.ttShop?.shop);
    const [loading, setloading] = useState(0);
    // San Pham
    const allNhomSanPham = ttShop?.ttShopThem?.menuShop;
    const tenVietTat = ttShop?.ttShopThem?.tenVietTat;
    console.log("ttShop", ttShop);
    const [nhomSP, setnhomSP] = useState();
    const [tenSP, settenSP] = useState();
    const [allDacDiemSP, setallDacDiemSP] = useState([]);
    const [thongTinSP, setthongTinSP] = useState();
    const VND = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
    });
    // Dac diem Phan Loai SP
    const [AnhSanPham, setAnhSanPham] = useState("");
    const [previewAnhSP, setpreviewAnhSP] = useState("");
    const [tenDacDiem, settenDacDiem] = useState("");
    const [giaVon, setgiaVon] = useState("");
    const [soLuong, setsoLuong] = useState("Còn Hàng");
    const [giaNiemYet, setgiaNiemYet] = useState(0);
    const [giaKhuyenMai, setgiaKhuyenMai] = useState(0);
    const [giaCtv, setgiaCtv] = useState(0);
    const [giaSi, setgiaSi] = useState(0);
    const [view, setview] = useState("Hiện");

    const dacDiemSanPham = {
        AnhSanPham,
        tenDacDiem,
        giaVon,
        soLuong,
        giaNiemYet,
        giaKhuyenMai,
        giaCtv,
        giaSi,
    };

    
    console.log("thongTinSP", thongTinSP);
    const handleThemDacDiem = () => {
        if (
            !AnhSanPham ||
            !tenDacDiem ||
            !giaVon ||
            !soLuong ||
            !giaNiemYet ||
            !giaKhuyenMai ||
            !giaCtv ||
            !giaSi
        ) {
            alert("Hãy nhập đủ thông tin");
        } else {
            const allDacDiemSP2 = [...allDacDiemSP, dacDiemSanPham];
            setallDacDiemSP(allDacDiemSP2);
            // reset input

            document.getElementById("input1").value = "";
            document.getElementById("input2").value = "";
            document.getElementById("input3").value = "";
            document.getElementById("input4").value = "";
            document.getElementById("input6").value = "";
            document.getElementById("input7").value = "";
            // reset input
            // reset data
            setAnhSanPham("");
            setpreviewAnhSP("");
            settenDacDiem("");
            setgiaVon(0);
            setgiaNiemYet(0);
            setgiaKhuyenMai(0);
            setgiaCtv(0);
            setgiaSi(0);
            // reset data
        }
    };
    const handleXoaDacDiem = (item) => {
        if (allDacDiemSP?.length !== 0) {
            const ProductExist = allDacDiemSP?.find((item2) => item2 === item);
            if (ProductExist) {
                setallDacDiemSP(
                    allDacDiemSP?.filter((item2) => item2 !== item)
                );
            }
        }
    };
    // Dac diem Phan Loai SP
    // Xu Ly Anh SP
    useEffect(() => {
        return () => {
            previewAnhSP && URL.revokeObjectURL(previewAnhSP.preview);
        };
    }, [previewAnhSP]);
    const handleOnchangeImageBanner = async (e) => {
        const fileBanner = e.target.files[0];
        let bannerBase64 = await CommonUtils.getBase64(fileBanner);

        fileBanner.preview = URL.createObjectURL(fileBanner);

        setAnhSanPham(bannerBase64);
        setpreviewAnhSP(fileBanner);
    };
    // Xu Ly Anh SP
    // Luu Sp
    const handleThemSanPham = () => {
        if (!nhomSP || !tenSP || allDacDiemSP?.length < 1 || !thongTinSP) {
            alert("Hãy nhập đủ thông tin");
        } else {
            const newSanPham = {
                nhomSanPham: nhomSP,
                TenSanPham: tenSP,
                giaMin: allDacDiemSP[0]?.giaKhuyenMai,
                allDacDiemSP: allDacDiemSP,
                thongTinSanPham: thongTinSP,
                TenShop: ttShop?.TenShop,
                view:view,
                xa: ttShop?.xa,
                huyen: ttShop?.huyen,
                tinh: ttShop?.tinh,

                capBac: ttShop?.capBac,
                idChuShop: ttShop?.user,
                idShop: idShop,
            };
            console.log("newSanPham", newSanPham);
            registerSanPham(newSanPham, dispatch, setloading);
            setloading(1);
            // reset input
            document.getElementById("input0").value = "";
            // reset input
            // reset data
            settenSP("");
            setallDacDiemSP([]);
            // reset data
        }
    };
    // Luu Sp
    console.log("soLuong", soLuong);
    const handleSuaAnh = async (e, item) => {
        console.log("item", item);
        const fileBanner = e.target.files[0];
        console.log("fileBanner", fileBanner);
        let bannerBase64 = await CommonUtils.getBase64(fileBanner);
        fileBanner.preview = URL.createObjectURL(fileBanner);

        const dacDiemMoi = { AnhSanPham: bannerBase64 };
        const ProductExist = allDacDiemSP?.find((item2) => item2 === item);
        if (ProductExist) {
            const ProductExist2 = { ...ProductExist, ...dacDiemMoi };
            const ProductExist3 = allDacDiemSP?.map((item3) =>
                item3 !== item ? item3 : ProductExist2
            );
            setallDacDiemSP(ProductExist3);
        }
    };
    const suaDacDiem = (item, dacDiemMoi) => {
        if (allDacDiemSP?.length !== 0) {
            const ProductExist = allDacDiemSP?.find((item2) => item2 === item);
            if (ProductExist) {
                const ProductExist2 = { ...ProductExist, ...dacDiemMoi };
                const ProductExist3 = allDacDiemSP?.map((item3) =>
                    item3 !== item ? item3 : ProductExist2
                );
                console.log("ProductExist3", ProductExist3);
                setallDacDiemSP(ProductExist3);
            }
        }
    };
    return (
        <div className="addSpConrainer">
            <div className="quayLai-tieuDe">
                <a
                    href={`/${tenVietTat}/${idShop}/a/a/a/a`}
                    className="quayLai"
                >
                    <i className="fa fa-angle-double-left"></i>Quay Lại
                </a>
                <div className="tieuDe">Thêm Sản Phẩm</div>
            </div>
            {loading === 0 && (
                <div className="AddSp">
                    <div className="nhomTen">
                        <select
                            className="nhomSanPham"
                            onChange={(e) => setnhomSP(e.target.value)}
                        >
                            <option value="">--- Mời Chọn ---</option>
                            {allNhomSanPham &&
                                allNhomSanPham?.length !== 0 &&
                                allNhomSanPham?.map((item, index) => {
                                    return <option key={index}>{item}</option>;
                                })}
                        </select>
                        <br />
                        <input
                            id="input0"
                            className="tenSanPham"
                            type="text"
                            placeholder="Tên Sản Phẩm"
                            onChange={(e) => settenSP(e.target.value)}
                        />
                    </div>
                    <div className="phanLoaiSanPham">
                        Đặc Điểm Phân Loại (Size, Màu sắc, Kích thước, ...)
                    </div>
                    {allDacDiemSP &&
                        allDacDiemSP?.map((item, index) => {
                            return (
                                <div key={index} className="chiTietPhanLoai2">
                                    <div className="anhDD">
                                        <input
                                            id={index}
                                            type="file"
                                            hidden
                                            onChange={(e) =>
                                                handleSuaAnh(e, item)
                                            }
                                        />
                                        <label htmlFor={index}>
                                            <img
                                                src={item.AnhSanPham}
                                                className="anhDD"
                                            />
                                        </label>
                                    </div>
                                    <div className="phanLoai-container">
                                        <div className="tenDD-giaV-giaNY-giaKM">
                                            <div className="tenDD-themInput">
                                                <div className="tenDD">
                                                    Tên Đặc Điểm
                                                </div>
                                                <input
                                                    id="input5"
                                                    className="themInput"
                                                    type="text"
                                                    placeholder={
                                                        item.tenDacDiem
                                                    }
                                                    onChange={(e) =>
                                                        suaDacDiem(item, {
                                                            tenDacDiem:
                                                                e.target.value,
                                                        })
                                                    }
                                                />
                                            </div>
                                            <div className="tenDD-themInput">
                                                <div className="tenDD">
                                                    Giá Vốn
                                                </div>
                                                <input
                                                    id="input5"
                                                    className="themInput"
                                                    type="number"
                                                    placeholder={item.giaVon}
                                                    onChange={(e) =>
                                                        suaDacDiem(item, {
                                                            giaVon: e.target
                                                                .value,
                                                        })
                                                    }
                                                />
                                            </div>
                                            <div className="tenDD-themInput">
                                                <div className="tenDD">
                                                    Giá Niêm Yết
                                                </div>
                                                <input
                                                    id="input5"
                                                    className="themInput"
                                                    type="number"
                                                    placeholder={
                                                        item.giaNiemYet
                                                    }
                                                    onChange={(e) =>
                                                        suaDacDiem(item, {
                                                            giaNiemYet:
                                                                e.target.value,
                                                        })
                                                    }
                                                />
                                            </div>
                                            <div className="tenDD-themInput">
                                                <div className="tenDD">
                                                    Tình Trạng
                                                </div>
                                                <select
                                                    className="themInput"
                                                    onChange={(e) =>
                                                        suaDacDiem(item, {
                                                            soLuong:
                                                                e.target.value,
                                                        })
                                                    }
                                                >
                                                    <option>
                                                        {item?.soLuong}
                                                    </option>
                                                    <option>Còn Hàng</option>
                                                    <option>Hết Hàng</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="tenDD-giaV-giaNY-giaKM">
                                            <div className="tenDD-themInput">
                                                <div className="tenDD">
                                                    Giá Khuyến Mại
                                                </div>
                                                <input
                                                    id="input5"
                                                    className="themInput"
                                                    type="number"
                                                    placeholder={
                                                        item.giaKhuyenMai
                                                    }
                                                    onChange={(e) =>
                                                        suaDacDiem(item, {
                                                            giaKhuyenMai:
                                                                e.target.value,
                                                        })
                                                    }
                                                />
                                            </div>
                                            <div className="tenDD-themInput">
                                                <div className="tenDD">
                                                    Giá Cộng Tác Viên
                                                </div>
                                                <input
                                                    id="input5"
                                                    className="themInput"
                                                    type="number"
                                                    placeholder={item.giaCtv}
                                                    onChange={(e) =>
                                                        suaDacDiem(item, {
                                                            giaCtv: e.target
                                                                .value,
                                                        })
                                                    }
                                                />
                                            </div>
                                            <div className="tenDD-themInput">
                                                <div className="tenDD">
                                                    Giá Sỉ
                                                </div>
                                                <input
                                                    id="input5"
                                                    className="themInput"
                                                    type="number"
                                                    placeholder={item.giaSi}
                                                    onChange={(e) =>
                                                        suaDacDiem(item, {
                                                            giaSi: e.target
                                                                .value,
                                                        })
                                                    }
                                                />
                                            </div>
                                            <div
                                                onClick={() =>
                                                    handleXoaDacDiem(item)
                                                }
                                                className="xoa"
                                            >
                                                Xoá
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    <div className="chiTietPhanLoai2">
                        <div className="anhDD">
                            <input
                                id="anh2"
                                type="file"
                                hidden
                                onChange={handleOnchangeImageBanner}
                            />
                            <label htmlFor="anh2">
                                {previewAnhSP ? (
                                    <img
                                        src={previewAnhSP.preview}
                                        className="anhDD"
                                    />
                                ) : (
                                    <img src={themAnh} className="anhDD" />
                                )}
                            </label>
                        </div>
                        <div className="phanLoai-container">
                            <div className="tenDD-giaV-giaNY-giaKM">
                                <div className="tenDD-themInput">
                                    <div className="tenDD">Tên Đặc Điểm</div>
                                    <input
                                        id="input1"
                                        className="themInput"
                                        type="text"
                                        placeholder="..."
                                        onChange={(e) =>
                                            settenDacDiem(e.target.value)
                                        }
                                    />
                                </div>
                                <div className="tenDD-themInput">
                                    <div className="tenDD">Giá Vốn</div>
                                    <input
                                        id="input2"
                                        className="themInput"
                                        type="number"
                                        placeholder="..."
                                        onChange={(e) =>
                                            setgiaVon(e.target.value)
                                        }
                                    />
                                </div>
                                <div className="tenDD-themInput">
                                    <div className="tenDD">Giá Niêm Yết</div>
                                    <input
                                        id="input3"
                                        className="themInput"
                                        type="number"
                                        placeholder="..."
                                        onChange={(e) =>
                                            setgiaNiemYet(e.target.value)
                                        }
                                    />
                                </div>
                                <div className="tenDD-themInput">
                                    <div className="tenDD">Tình Trạng</div>
                                    <select
                                        className="themInput"
                                        onChange={(e) =>
                                            setsoLuong(e.target.value)
                                        }
                                    >
                                        <option>Còn Hàng</option>
                                        <option>Hết Hàng</option>
                                    </select>
                                </div>
                            </div>
                            <div className="tenDD-giaV-giaNY-giaKM">
                                <div className="tenDD-themInput">
                                    <div className="tenDD">Giá Khuyến Mại</div>
                                    <input
                                        id="input4"
                                        className="themInput"
                                        type="number"
                                        placeholder="..."
                                        onChange={(e) =>
                                            setgiaKhuyenMai(e.target.value)
                                        }
                                    />
                                </div>
                                <div className="tenDD-themInput">
                                    <div className="tenDD">
                                        Giá Cộng Tác Viên
                                    </div>
                                    <input
                                        id="input6"
                                        className="themInput"
                                        type="number"
                                        placeholder="..."
                                        onChange={(e) =>
                                            setgiaCtv(e.target.value)
                                        }
                                    />
                                </div>
                                <div className="tenDD-themInput">
                                    <div className="tenDD">Giá Sỉ</div>
                                    <input
                                        id="input7"
                                        className="themInput"
                                        type="number"
                                        placeholder="..."
                                        onChange={(e) =>
                                            setgiaSi(e.target.value)
                                        }
                                    />
                                </div>
                                <div
                                    onClick={() => handleThemDacDiem()}
                                    className="them"
                                >
                                    Thêm
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="thongTinSanPham">
                        <label className="tieuDe">Thông Tin Sản Phẩm</label>
                        <CKEditor
                            editor={ClassicEditor}
                            data="Thêm thông tin sản phẩm"
                            onReady={(editor) => {
                                console.log("Editor is ready to use!", editor);
                            }}
                            onChange={(event, editor) => {
                                console.log(event);
                                setthongTinSP(editor.getData());
                            }}
                            onBlur={(event, editor) => {
                                console.log("Blur.", editor);
                            }}
                            onFocus={(event, editor) => {
                                console.log("Focus.", editor);
                            }}
                        />
                    </div>
                    <div className="closeLuu">
                        <div onClick={handleThemSanPham} className="luu">
                            Lưu Sản Phẩm
                        </div>
                    </div>
                </div>
            )}
            {loading === 2 && (
                <div className="addThanhCong">
                    <div className="themThanhCong">
                        Thêm Sản Phẩm Thành Công
                    </div>
                    <div className="closeThem">
                        <a href={`/addsp/${idShop}`} className="tiepTucThem">
                            Tiếp Tục Thêm
                        </a>
                    </div>
                </div>
            )}
            {loading === 1 && <Loading />}
        </div>
    );
};
export default AddSp;
