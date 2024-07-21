import "./DoiTac.scss";
import { getttShop, updatettShop } from "../redux/apiRequest";
import Loading from "../GiaoDienChung/Loading";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
const DoiTac = () => {
    const { idShop } = useParams();
    const dispatch = useDispatch();
    const ttShop = useSelector((state) => state.ttShop.ttShop.ttShop?.shop);
    useEffect(() => {
        getttShop(idShop, dispatch);
    }, []);
    const ttShopThem2 = ttShop?.ttShopThem;
    const khachSi = ttShop?.ttShopThem?.khachSi;
    const khachCtv = ttShop?.ttShopThem?.khachCtv;
    const [loading, setloading] = useState(0);
    const [sdtKhachSi, setsdtKhachSi] = useState("");
    const [tenKhachSi, settenKhachSi] = useState("");
    const [sdtKhachCtv, setsdtKhachCtv] = useState("");
    const [tenKhachCtv, settenKhachCtv] = useState("");
    const handleThemKhachSi = () => {
        const kiemtraSdt = khachSi?.find(
            (item) => item?.sdtKhachSi === sdtKhachSi
        );
        if (kiemtraSdt || !sdtKhachSi || !tenKhachSi) {
            alert("Người dùng đã tồn tại!");
        } else {
            const id = ttShop._id;
            const khachSi2 = {
                khachSi: [
                    ...khachSi,
                    { sdtKhachSi: sdtKhachSi, tenKhachSi: tenKhachSi },
                ],
            };
            const ttShopThem = { ...ttShopThem2, ...khachSi2 };
            const newShop = {
                ttShopThem: ttShopThem,
            };
            console.log("newShop", newShop);
            updatettShop(newShop, id, dispatch, setloading);
            setsdtKhachSi();
            settenKhachSi();
            setloading(1);
        }
    };
    const handleXoaKhachSi = (item) => {
        const id = ttShop._id;
        const khachSi2 = {
            khachSi: khachSi?.filter((item2) => item2 !== item),
        };
        const ttShopThem = { ...ttShopThem2, ...khachSi2 };
        const newShop = {
            ttShopThem: ttShopThem,
        };
        console.log("newShop", newShop);
        updatettShop(newShop, id, dispatch, setloading);
        setloading(1);
    };
    const handleThemCtv = () => {
        const kiemtraSdt = khachCtv.find(
            (item) => item?.sdtKhachCtv === sdtKhachCtv
        );

        if (kiemtraSdt || !sdtKhachCtv || !tenKhachCtv) {
            alert("Người dùng đã tồn tại!");
        } else {
            const id = ttShop._id;
            const khachCtv2 = {
                khachCtv: [
                    ...khachCtv,
                    { sdtKhachCtv: sdtKhachCtv, tenKhachCtv: tenKhachCtv },
                ],
            };
            const ttShopThem = { ...ttShopThem2, ...khachCtv2 };
            const newShop = {
                ttShopThem: ttShopThem,
            };
            console.log("newShop", newShop);
            updatettShop(newShop, id, dispatch, setloading);
            setsdtKhachCtv();
            settenKhachCtv();
            setloading(1);
        }
    };
    const handleXoaCtv = (item) => {
        const id = ttShop._id;
        const khachCtv2 = {
            khachCtv: khachCtv?.filter((item2) => item2 !== item),
        };
        const ttShopThem = { ...ttShopThem2, ...khachCtv2 };
        const newShop = {
            ttShopThem: ttShopThem,
        };
        console.log("newShop", newShop);
        updatettShop(newShop, id, dispatch, setloading);
        setloading(1);
    };

    return (
        <div className="DoiTac">
            {loading === 0 && (
                <div>
                    <div className="quayLai-tieuDe">
                        <a
                            href={`/${ttShop.ttShopThem?.tenVietTat}/${ttShop._id}/a/a/a/a`}
                            className="quayLai"
                        >
                            Quay Lại
                        </a>
                        <div className="tieuDe">Danh Sách Đối Tác</div>
                    </div>
                   
                    <div className="nhanVien-container">
                        <div className="nhanVien">Khách Sỉ</div>
                        <div className="sdt-them">
                            <input
                                id="input1"
                                className="sdt"
                                placeholder="Họ Và Tên"
                                type="text"
                                onChange={(e) => settenKhachSi(e.target.value)}
                            />
                            <input
                                id="input11"
                                className="sdt"
                                placeholder="Số Điện Thoại"
                                type="number"
                                onChange={(e) => setsdtKhachSi(e.target.value)}
                            />
                            <div className="them" onClick={handleThemKhachSi}>
                                +
                            </div>
                        </div>
                        {khachSi &&
                            khachSi.map((item, index) => {
                                return (
                                    <div key={index} className="danhSach-xoa">
                                        <div className="danhSach">
                                            {item.tenKhachSi}
                                        </div>
                                        <div className="danhSach">
                                            {item.sdtKhachSi}
                                        </div>
                                        <div
                                            className="xoa"
                                            onClick={() =>
                                                handleXoaKhachSi(item)
                                            }
                                        >
                                            ❌ 
                                        </div>
                                    </div>
                                );
                            })}
                    </div>
                    <div className="nhanVien-container">
                        <div className="nhanVien">Cộng Tác Viên</div>
                        <div className="sdt-them">
                            <input
                                id="input2"
                                className="sdt"
                                placeholder="Họ Và Tên"
                                type="text"
                                onChange={(e) => settenKhachCtv(e.target.value)}
                            />
                            <input
                                id="input21"
                                className="sdt"
                                placeholder="Nhập Số Điện Thoại"
                                type="number"
                                onChange={(e) => setsdtKhachCtv(e.target.value)}
                            />
                            <div className="them" onClick={handleThemCtv}>
                                +
                            </div>
                        </div>
                        {khachCtv &&
                            khachCtv.map((item, index) => {
                                return (
                                    <div key={index} className="danhSach-xoa">
                                        <div className="danhSach">
                                            {item.tenKhachCtv}
                                        </div>
                                        <div className="danhSach">
                                            {item.sdtKhachCtv}
                                        </div>
                                        <div
                                            className="xoa"
                                            onClick={() => handleXoaCtv(item)}
                                        >
                                            ❌ 
                                        </div>
                                    </div>
                                );
                            })}
                    </div>
                </div>
            )}
            {loading === 1 && <Loading />}
        </div>
    );
};
export default DoiTac;
