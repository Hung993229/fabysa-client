import "./UpdateSanPham.scss";
import { useState } from "react";
import { useEffect } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import CommonUtils from "../component/CommonUtils";
import themAnh from "../assets/images/themAnh.png";
import { getttShop, updateSanPham, deleteSanPham } from "../redux/apiRequest";

import { useSelector, useDispatch } from "react-redux";

const UpdateSanPham = (props) => {
    const {
        nhomSP,
        setnhomSP,
        allSanPham,
        setallSanPham,
        thongTinSp,
        setthongTinSp,
        loading,
        setloading,
        skip,
        setskip,
        idShop,
        ttShop,
    } = props;

    const VND = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
    });
    const dispatch = useDispatch();
    const allNhomSanPham = ttShop?.ttShopThem?.menuShop;

    useEffect(() => {
        setnhomSP(thongTinSp?.nhomSanPham);
    }, [thongTinSp]);
    const [tenSP, settenSP] = useState(thongTinSp?.TenSanPham);
    const [allDacDiemSP, setallDacDiemSP] = useState(thongTinSp?.allDacDiemSP);
    console.log("allDacDiemSP", allDacDiemSP);
    const [thongTinSP, setthongTinSP] = useState(thongTinSp?.thongTinSanPham);
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
    // Xu Ly Anh SP
    // sua dac Diem
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
    // sua dac Diem
    // Luu Sp
    const handleLuuSanPham = () => {
        if (allDacDiemSP?.length < 1) {
            alert("Hãy nhập đủ thông tin");
        } else {
            const id = thongTinSp?._id;
            const newSanPham = {
                nhomSanPham: nhomSP,
                TenSanPham: tenSP,
                allDacDiemSP: allDacDiemSP,
                thongTinSanPham: thongTinSP,
                TenShop: ttShop?.TenShop,
                xa: ttShop?.xa,
                huyen: ttShop?.huyen,
                tinh: ttShop?.tinh,

                capBac: ttShop?.capBac,
                idChuShop: ttShop?.user,
                idShop: idShop,
            };
            updateSanPham(
                newSanPham,
                thongTinSp?._id,
                setloading,
                setthongTinSp,
                dispatch
            );
            setloading(1);
        }
    };
    // Luu Sp
    // Xoa san pham
    const handleXoaSanPham = (id) => {
        deleteSanPham(id, setloading, dispatch);
        setloading(1);
        // setnhomSP(thongTinSp?.nhomSanPham);
        // setallSanPham([]);
        // setskip(0);
    };
    // Xoa san pham
    return (
        <div className="UpdateSanPham-ConTaiNer">
            <div className="quayLai-tieuDe">
                <div className="quayLai" onClick={() => setloading(4)}>
                    Quay Lại
                </div>
                <div className="tieuDe">Sửa Sản Phẩm</div>
            </div>

            <div className="AddSp">
                <div className="nhomTen">
                    <select
                        className="nhomSanPham"
                        onChange={(e) => setnhomSP(e.target.value)}
                    >
                        <option>{nhomSP}</option>
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
                        placeholder={thongTinSp?.TenSanPham}
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
                                        onChange={(e) => handleSuaAnh(e, item)}
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
                                                placeholder={item.tenDacDiem}
                                                onChange={(e) =>
                                                    suaDacDiem(item, {
                                                        tenDacDiem:
                                                            e.target.value,
                                                    })
                                                }
                                            />
                                        </div>
                                        <div className="tenDD-themInput">
                                            <div className="tenDD">Giá Vốn</div>
                                            <input
                                                id="input5"
                                                className="themInput"
                                                type="number"
                                                placeholder={item.giaVon}
                                                onChange={(e) =>
                                                    suaDacDiem(item, {
                                                        giaVon: e.target.value,
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
                                                placeholder={item.giaNiemYet}
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
                                                        soLuong: e.target.value,
                                                    })
                                                }
                                            >
                                                <option>{item?.soLuong}</option>
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
                                                placeholder={item.giaKhuyenMai}
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
                                                        giaCtv: e.target.value,
                                                    })
                                                }
                                            />
                                        </div>
                                        <div className="tenDD-themInput">
                                            <div className="tenDD">Giá Sỉ</div>
                                            <input
                                                id="input5"
                                                className="themInput"
                                                type="number"
                                                placeholder={item.giaSi}
                                                onChange={(e) =>
                                                    suaDacDiem(item, {
                                                        giaSi: e.target.value,
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
                                    onChange={(e) => setgiaVon(e.target.value)}
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
                                    onChange={(e) => setsoLuong(e.target.value)}
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
                                <div className="tenDD">Giá Cộng Tác Viên</div>
                                <input
                                    id="input6"
                                    className="themInput"
                                    type="number"
                                    placeholder="..."
                                    onChange={(e) => setgiaCtv(e.target.value)}
                                />
                            </div>
                            <div className="tenDD-themInput">
                                <div className="tenDD">Giá Sỉ</div>
                                <input
                                    id="input7"
                                    className="themInput"
                                    type="number"
                                    placeholder="..."
                                    onChange={(e) => setgiaSi(e.target.value)}
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
                        data={thongTinSp.thongTinSanPham}
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
                    <div
                        className="close"
                        onClick={() => handleXoaSanPham(thongTinSp._id)}
                    >
                        Xoá Sản Phẩm
                    </div>
                    <div onClick={handleLuuSanPham} className="luu">
                        Lưu Sản Phẩm
                    </div>
                </div>
            </div>
        </div>
    );
};
export default UpdateSanPham;
