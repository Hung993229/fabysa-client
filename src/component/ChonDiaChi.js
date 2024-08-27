import "./ChonDiaChi.scss";
import { useEffect } from "react";
import { useState } from "react";

const ChonDiaChi = (props) => {
    const { thonXom, setthonXom, xa, setxa, sethuyen, huyen, settinh, tinh } =
        props;
    const dsTinh = [
        "Hà Nội",
        "Vĩnh Phúc",
        "Bắc Ninh",
        "Quảng Ninh",
        "Hải Dương",
        "Hải Phòng",
        "Hưng Yên",
        "Thái Bình",
        "Hà Nam",
        "Nam Định",
        "Ninh Bình",
        "Hà Giang",
        "Cao Bằng",
        "Bắc Kạn",
        "Tuyên Quang",
        "Lào Cai",
        "Yên Bái",
        "Thái Nguyên",
        "Lạng Sơn",
        "Bắc Giang",
        "Phú Thọ",
        "Điện Biên",
        "Lai Châu",
        "Sơn La",
        "Hoà Bình",
        "Thanh Hoá",
        "Nghệ An",
        "Hà Tĩnh",
        "Quảng Bình",
        "Quảng Trị",
        "Thừa Thiên Huế",
        "Đà Nẵng",
        "Quảng Nam",
        "Quảng Ngãi",
        "Bình Định",
        "Phú Yên",
        "Khánh Hoà",
        "Ninh Thuận",
        "Bình Thuận",
        "Kon Tum",
        "Gia Lai",
        "Đắk Lắk",
        "Đắk Nông",
        "Lâm Đồng",
        "Bình Phước",
        "Tây Ninh",
        "Bình Dương",
        "Đồng Nai",
        "Bà Rịa - Vũng Tàu",
        "TP.Hồ Chí Minh",
        "Long An",
        "Tiền Giang",
        "Bến Tre",
        "Trà Vinh",
        "Vĩnh Long",
        "Đồng Tháp",
        "An Giang",
        "Kiên Giang",
        "Cần Thơ",
        "Hậu Giang",
        "Sóc Trăng",
        "Bạc Liêu",
        "Cà Mau",
    ];
    const [dshuyen, setdshuyen] = useState([]);
    const [dsxa, setdsxa] = useState([]);

    console.log("tinh", tinh);
    console.log("xa", xa);
    console.log("huyen", huyen);
    console.log("thonXom", thonXom);

    console.log("dshuyen", dshuyen);
    console.log("dsxa", dsxa);

    const dsHuyen2 = [
        {
            tinh: "Hà Nội",
            dsHuyen: [
                "Quận Ba Đình",
                "Quận Hoàn Kiếm",
                "Quận Tây Hồ",
                "Quận Long Biên",
                "Quận Cầu Giấy",
                "Quận Đống Đa",
                "Quận Hai Bà Trưng",
                "Quận Hoàng Mai",
                "Quận Thanh Xuân",
                "Huyện Sóc Sơn",
                "Huyện Đông Anh",
                "Huyện Gia Lâm",
                "Quận Nam Từ Liêm",
                "Huyện Thanh Trì",
                "Quận Bắc Từ Liêm",
                "Huyện Mê Linh",
                "Quận Hà Đông",
                "Thị xã Sơn Tây",
                "Huyện Ba Vì",
                "Huyện Phúc Thọ",
                "Huyện Đan Phượng",
                "Huyện Hoài Đức",
                "Huyện Quốc Oai",
                "Huyện Thạch Thất",
                "Huyện Chương Mỹ",
                "Huyện Thanh Oai",
                "Huyện Thường Tín",
                "Huyện Phú Xuyên",
                "Huyện Ứng Hòa",
                "Huyện Mỹ Đức",
            ],
        },
        {
            tinh: "Vĩnh Phúc",
            dsHuyen: [
                "Thành phố Vĩnh Yên",
                "Thành phố Phúc Yên",
                "Huyện Lập Thạch",
                "Huyện Tam Dương",
                "Huyện Tam Đảo",
                "Huyện Bình Xuyên",
                "Huyện Yên Lạc",
                "Huyện Vĩnh Tường",
                "Huyện Sông Lô",
            ],
        },
        {
            tinh: "Bắc Ninh",
            dsHuyen: [
                "Thành phố Bắc Ninh",
                "Huyện Yên Phong",
                "Huyện Quế Võ",
                "Huyện Tiên Du",
                "Thành phố Từ Sơn",
                "Huyện Thuận Thành",
                "Huyện Gia Bình",
                "Huyện Lương Tài",
            ],
        },
        {
            tinh: "Quảng Ninh",
            dsHuyen: [
                "Thành phố Hạ Long",
                "Thành phố Móng Cái",
                "Thành phố Cẩm Phả",
                "Thành phố Uông Bí",
                "Huyện Bình Liêu",
                "Huyện Tiên Yên",
                "Huyện Đầm Hà",
                "Huyện Hải Hà",
                "Huyện Ba Chẽ",
                "Huyện Vân Đồn",
                "Thị xã Đông Triều",
                "Thị xã Quảng Yên",
                "Huyện Cô Tô",
            ],
        },
        {
            tinh: "Hải Dương",
            dsHuyen: [
                "Thành phố Hải Dương",
                "Thành phố Chí Linh",
                "Huyện Nam Sách",
                "Thị xã Kinh Môn",
                "Huyện Kim Thành",
                "Huyện Thanh Hà",
                "Huyện Cẩm Giàng",
                "Huyện Bình Giang",
                "Huyện Gia Lộc",
                "Huyện Tứ Kỳ",
                "Huyện Ninh Giang",
                "Huyện Thanh Miện",
            ],
        },
        {
            tinh: "Hải Phòng",
            dsHuyen: [
                "Quận Hồng Bàng",
                "Quận Ngô Quyền",
                "Quận Lê Chân",
                "Quận Hải An",
                "Quận Kiến An",
                "Quận Đồ Sơn",
                "Quận Dương Kinh",
                "Huyện Thuỷ Nguyên",
                "Huyện An Dương",
                "Huyện An Lão",
                "Huyện Kiến Thuỵ",
                "Huyện Tiên Lãng",
                "Huyện Vĩnh Bảo",
                "Huyện Cát Hải",
                "Huyện Bạch Long Vĩ",
            ],
        },
        {
            tinh: "Hưng Yên",
            dsHuyen: [
                "Thành phố Hưng Yên",
                "Huyện Văn Lâm",
                "Huyện Văn Giang",
                "Huyện Yên Mỹ",
                "Thị xã Mỹ Hào",
                "Huyện Ân Thi",
                "Huyện Khoái Châu",
                "Huyện Kim Động",
                "Huyện Tiên Lữ",
                "Huyện Phù Cừ",
            ],
        },
        {
            tinh: "Thái Bình",
            dsHuyen: [
                "Thành phố Thái Bình",
                "Huyện Quỳnh Phụ",
                "Huyện Hưng Hà",
                "Huyện Đông Hưng",
                "Huyện Thái Thụy",
                "Huyện Tiền Hải",
                "Huyện Kiến Xương",
                "Huyện Vũ Thư",
            ],
        },
        {
            tinh: "Hà Nam",
            dsHuyen: [
                "Thành phố Phủ Lý",
                "Thị xã Duy Tiên",
                "Huyện Kim Bảng",
                "Huyện Thanh Liêm",
                "Huyện Bình Lục",
                "Huyện Lý Nhân",
            ],
        },
        {
            tinh: "Nam Định",
            dsHuyen: [
                "Thành phố Nam Định, Huyện Mỹ Lộc, Huyện Vụ Bản, Huyện Ý Yên, Huyện Nghĩa Hưng, Huyện Nam Trực, Huyện Trực Ninh, Huyện Xuân Trường, Huyện Giao Thủy, Huyện Hải Hậu",
            ],
        },
        {
            tinh: "Ninh Bình",
            dsHuyen: [
                "Thành phố Ninh Bình, Thành phố Tam Điệp, Huyện Nho Quan, Huyện Gia Viễn, Huyện Hoa Lư, Huyện Yên Khánh, Huyện Kim Sơn, Huyện Yên Mô",
            ],
        },
        {
            tinh: "Hà Giang",
            dsHuyen: [
                "Thành phố Hà Giang, Huyện Đồng Văn, Huyện Mèo Vạc, Huyện Yên Minh, Huyện Quản Bạ, Huyện Vị Xuyên, Huyện Bắc Mê, Huyện Hoàng Su Phì, Huyện Xín Mần, Huyện Bắc Quang, Huyện Quang Bình",
            ],
        },
        {
            tinh: "Cao Bằng",
            dsHuyen: [
                "Thành phố Cao Bằng, Huyện Bảo Lâm, Huyện Bảo Lạc, Huyện Hà Quảng, Huyện Trùng Khánh, Huyện Hạ Lang, Huyện Quảng Hòa, Huyện Hoà An, Huyện Nguyên Bình, Huyện Thạch An",
            ],
        },
        {
            tinh: "Bắc Kạn",
            dsHuyen: [
                "Thành Phố Bắc Kạn, Huyện Pác Nặm, Huyện Ba Bể, Huyện Ngân Sơn, Huyện Bạch Thông, Huyện Chợ Đồn, Huyện Chợ Mới, Huyện Na Rì",
            ],
        },
        {
            tinh: "Tuyên Quang",
            dsHuyen: [
                "Thành phố Tuyên Quang, Huyện Lâm Bình, Huyện Na Hang, Huyện Chiêm Hóa, Huyện Hàm Yên, Huyện Yên Sơn, Huyện Sơn Dương",
            ],
        },
        {
            tinh: "Lào Cai",
            dsHuyen: [
                "Thành phố Lào Cai, Huyện Bát Xát, Huyện Mường Khương, Huyện Si Ma Cai, Huyện Bắc Hà, Huyện Bảo Thắng, Huyện Bảo Yên, Thị xã Sa Pa, Huyện Văn Bàn",
            ],
        },
        {
            tinh: "Yên Bái",
            dsHuyen: [
                "Thành phố Yên Bái, Thị xã Nghĩa Lộ, Huyện Lục Yên, Huyện Văn Yên, Huyện Mù Căng Chải, Huyện Trấn Yên, Huyện Trạm Tấu, Huyện Văn Chấn, Huyện Yên Bình",
            ],
        },
        {
            tinh: "Thái Nguyên",
            dsHuyen: [
                "Thành phố Thái Nguyên, Thành phố Sông Công, Huyện Định Hóa, Huyện Phú Lương, Huyện Đồng Hỷ, Huyện Võ Nhai, Huyện Đại Từ, Thành phố Phổ Yên, Huyện Phú Bình",
            ],
        },
        {
            tinh: "Lạng Sơn",
            dsHuyen: [
                "Thành phố Lạng Sơn, Huyện Tràng Định, Huyện Bình Gia, Huyện Văn Lãng, Huyện Cao Lộc, Huyện Văn Quan, Huyện Bắc Sơn, Huyện Hữu Lũng, Huyện Chi Lăng, Huyện Lộc Bình, Huyện Đình Lập",
            ],
        },
        {
            tinh: "Bắc Giang",
            dsHuyen: [
                "Thành phố Bắc Giang, Huyện Yên Thế, Huyện Tân Yên, Huyện Lạng Giang, Huyện Lục Nam, Huyện Lục Ngạn, Huyện Sơn Động, Huyện Yên Dũng, Huyện Việt Yên, Huyện Hiệp Hòa",
            ],
        },
        {
            tinh: "Phú Thọ",
            dsHuyen: [
                "Thành phố Việt Trì, Thị xã Phú Thọ, Huyện Đoan Hùng, Huyện Hạ Hoà, Huyện Thanh Ba, Huyện Phù Ninh, Huyện Yên Lập, Huyện Cẩm Khê, Huyện Tam Nông, Huyện Lâm Thao, Huyện Thanh Sơn, Huyện Thanh Thuỷ, Huyện Tân Sơn",
            ],
        },
        {
            tinh: "Điện Biên",
            dsHuyen: [
                "Thành phố Điện Biên Phủ, Thị Xã Mường Lay, Huyện Mường Nhé, Huyện Mường Chà, Huyện Tủa Chùa, Huyện Tuần Giáo, Huyện Điện Biên, Huyện Điện Biên Đông, Huyện Mường Ảng, Huyện Nậm Pồ",
            ],
        },
        {
            tinh: "Lai Châu",
            dsHuyen: [
                "Thành phố Lai Châu, Huyện Tam Đường, Huyện Mường Tè, Huyện Sìn Hồ, Huyện Phong Thổ, Huyện Than Uyên, Huyện Tân Uyên, Huyện Nậm Nhùn",
            ],
        },
        {
            tinh: "Sơn La",
            dsHuyen: [
                "Thành phố Sơn La, Huyện Quỳnh Nhai, Huyện Thuận Châu, Huyện Mường La, Huyện Bắc Yên, Huyện Phù Yên, Huyện Mộc Châu, Huyện Yên Châu, Huyện Mai Sơn, Huyện Sông Mã, Huyện Sốp Cộp, Huyện Vân Hồ",
            ],
        },
        {
            tinh: "Hoà Bình",
            dsHuyen: [
                "Thành phố Hòa Bình, Huyện Đà Bắc, Huyện Lương Sơn, Huyện Kim Bôi, Huyện Cao Phong, Huyện Tân Lạc, Huyện Mai Châu, Huyện Lạc Sơn, Huyện Yên Thủy, Huyện Lạc Thủy",
            ],
        },
        {
            tinh: "Thanh Hoá",
            dsHuyen: [
                "Thành phố Thanh Hóa, Thị xã Bỉm Sơn, Thành phố Sầm Sơn, Huyện Mường Lát, Huyện Quan Hóa, Huyện Bá Thước, Huyện Quan Sơn, Huyện Lang Chánh, Huyện Ngọc Lặc, Huyện Cẩm Thủy, Huyện Thạch Thành, Huyện Hà Trung, Huyện Vĩnh Lộc, Huyện Yên Định, Huyện Thọ Xuân, Huyện Thường Xuân, Huyện Triệu Sơn, Huyện Thiệu Hóa, Huyện Hoằng Hóa, Huyện Hậu Lộc, Huyện Nga Sơn, Huyện Như Xuân, Huyện Như Thanh, Huyện Nông Cống, Huyện Đông Sơn, Huyện Quảng Xương, Thị xã Nghi Sơn",
            ],
        },
        {
            tinh: "Nghệ An",
            dsHuyen: [
                "Thành phố Vinh, Thị xã Cửa Lò, Thị xã Thái Hoà, Huyện Quế Phong, Huyện Quỳ Châu, Huyện Kỳ Sơn, Huyện Tương Dương, Huyện Nghĩa Đàn, Huyện Quỳ Hợp, Huyện Quỳnh Lưu, Huyện Con Cuông, Huyện Tân Kỳ, Huyện Anh Sơn, Huyện Diễn Châu, Huyện Yên Thành, Huyện Đô Lương, Huyện Thanh Chương, Huyện Nghi Lộc, Huyện Nam Đàn, Huyện Hưng Nguyên, Thị xã Hoàng Mai",
            ],
        },
        {
            tinh: "Hà Tĩnh",
            dsHuyen: [
                "Thành phố Hà Tĩnh, Thị xã Hồng Lĩnh, Huyện Hương Sơn, Huyện Đức Thọ, Huyện Vũ Quang, Huyện Nghi Xuân, Huyện Can Lộc, Huyện Hương Khê, Huyện Thạch Hà, Huyện Cẩm Xuyên, Huyện Kỳ Anh, Huyện Lộc Hà, Thị xã Kỳ Anh",
            ],
        },
        {
            tinh: "Quảng Bình",
            dsHuyen: [
                "Thành Phố Đồng Hới, Huyện Minh Hóa, Huyện Tuyên Hóa, Huyện Quảng Trạch, Huyện Bố Trạch, Huyện Quảng Ninh, Huyện Lệ Thủy, Thị xã Ba Đồn",
            ],
        },
        {
            tinh: "Quảng Trị",
            dsHuyen: [
                "Thành phố Đông Hà, Thị xã Quảng Trị, Huyện Vĩnh Linh, Huyện Hướng Hóa, Huyện Gio Linh, Huyện Đa Krông, Huyện Cam Lộ, Huyện Triệu Phong, Huyện Hải Lăng, Huyện Cồn Cỏ",
            ],
        },
        {
            tinh: "Thừa Thiên Huế",
            dsHuyen: [
                "Thành phố Huế, Huyện Phong Điền, Huyện Quảng Điền, Huyện Phú Vang, Thị xã Hương Thủy, Thị xã Hương Trà, Huyện A Lưới, Huyện Phú Lộc, Huyện Nam Đông",
            ],
        },
        {
            tinh: "Đà Nẵng",
            dsHuyen: [
                "Quận Liên Chiểu, Quận Thanh Khê, Quận Hải Châu, Quận Sơn Trà, Quận Ngũ Hành Sơn, Quận Cẩm Lệ, Huyện Hòa Vang, Huyện Hoàng Sa",
            ],
        },
        {
            tinh: "Quảng Nam",
            dsHuyen: [
                "Thành phố Tam Kỳ, Thành phố Hội An, Huyện Tây Giang, Huyện Đông Giang, Huyện Đại Lộc, Thị xã Điện Bàn, Huyện Duy Xuyên, Huyện Quế Sơn, Huyện Nam Giang, Huyện Phước Sơn, Huyện Hiệp Đức, Huyện Thăng Bình, Huyện Tiên Phước, Huyện Bắc Trà My, Huyện Nam Trà My, Huyện Núi Thành, Huyện Phú Ninh, Huyện Nông Sơn",
            ],
        },
        {
            tinh: "Quảng Ngãi",
            dsHuyen: [
                "hành phố Quảng Ngãi, Huyện Bình Sơn, Huyện Trà Bồng, Huyện Sơn Tịnh, Huyện Tư Nghĩa, Huyện Sơn Hà, Huyện Sơn Tây, Huyện Minh Long, Huyện Nghĩa Hành, Huyện Mộ Đức, Thị xã Đức Phổ, Huyện Ba Tơ, Huyện Lý Sơn",
            ],
        },
        {
            tinh: "Bình Định",
            dsHuyen: [
                "Thành phố Quy Nhơn, Thị xã Hoài Nhơn, Huyện Hoài Ân, Huyện Phù Mỹ, Huyện Vĩnh Thạnh, Huyện Tây Sơn, Huyện Phù Cát, Thị xã An Nhơn, Huyện Tuy Phước, Huyện Vân Canh",
            ],
        },
        {
            tinh: "Phú Yên",
            dsHuyen: [
                "Thành phố Tuy Hoà, Thị xã Sông Cầu, Huyện Đồng Xuân, Huyện Tuy An, Huyện Sơn Hòa, Huyện Sông Hinh, Huyện Tây Hoà, Huyện Phú Hoà, Thị xã Đông Hòa",
            ],
        },
        {
            tinh: "Khánh Hoà",
            dsHuyen: [
                "	Thành phố Nha Trang, Thành phố Cam Ranh, Huyện Cam Lâm, Huyện Vạn Ninh, Thị xã Ninh Hòa, Huyện Khánh Vĩnh, Huyện Diên Khánh, Huyện Khánh Sơn, Huyện Trường Sa",
            ],
        },
        {
            tinh: "Ninh Thuận",
            dsHuyen: [
                "Thành phố Phan Rang-Tháp Chàm, Huyện Bác Ái, Huyện Ninh Sơn, Huyện Ninh Hải, Huyện Ninh Phước, Huyện Thuận Bắc, Huyện Thuận Nam",
            ],
        },
        {
            tinh: "Bình Thuận",
            dsHuyen: [
                "Thành phố Phan Thiết, Thị xã La Gi, Huyện Tuy Phong, Huyện Bắc Bình, Huyện Hàm Thuận Bắc, Huyện Hàm Thuận Nam, Huyện Tánh Linh, Huyện Đức Linh, Huyện Hàm Tân, Huyện Phú Quí",
            ],
        },
        {
            tinh: "Kon Tum",
            dsHuyen: [
                "Thành phố Kon Tum, Huyện Đắk Glei, Huyện Ngọc Hồi, Huyện Đắk Tô, Huyện Kon Plông, Huyện Kon Rẫy, Huyện Đắk Hà, Huyện Sa Thầy, Huyện Tu Mơ Rông, Huyện Ia H' Drai",
            ],
        },
        {
            tinh: "Gia Lai",
            dsHuyen: [
                "Thành phố Pleiku, Thị xã An Khê, Thị xã Ayun Pa, Huyện KBang, Huyện Đăk Đoa, Huyện Chư Păh, Huyện Ia Grai, Huyện Mang Yang, Huyện Kông Chro, Huyện Đức Cơ, Huyện Chư Prông, Huyện Chư Sê, Huyện Đăk Pơ, Huyện Ia Pa, Huyện Krông Pa, Huyện Phú Thiện, Huyện Chư Pưh",
            ],
        },
        {
            tinh: "Đắk Lắk",
            dsHuyen: [
                "Thành phố Buôn Ma Thuột, Thị Xã Buôn Hồ, Huyện Ea H'leo, Huyện Ea Súp, Huyện Buôn Đôn, Huyện Cư M'gar, Huyện Krông Búk, Huyện Krông Năng, Huyện Ea Kar, Huyện M'Đrắk, Huyện Krông Bông, Huyện Krông Pắc, Huyện Krông A Na, Huyện Lắk, Huyện Cư Kuin",
            ],
        },
        {
            tinh: "Đắk Nông",
            dsHuyen: [
                "	Thành phố Gia Nghĩa, Huyện Đăk Glong, Huyện Cư Jút, Huyện Đắk Mil, Huyện Krông Nô, Huyện Đắk Song, Huyện Đắk R'Lấp, Huyện Tuy Đức",
            ],
        },
        {
            tinh: "Lâm Đồng",
            dsHuyen: [
                "Thành phố Đà Lạt, Thành phố Bảo Lộ,c Huyện Đam Rông, Huyện Lạc Dương, Huyện Lâm Hà, Huyện Đơn Dương, Huyện Đức Trọng, Huyện Di Linh, Huyện Đạ Huoai, Huyện Đạ Tẻh, Huyện Cát Tiên",
            ],
        },
        {
            tinh: "Bình Phước",
            dsHuyen: [
                "Thị xã Phước Long, Thành phố Đồng Xoài, Thị xã Bình Long, Huyện Bù Gia Mập, Huyện Lộc Ninh, Huyện Bù Đốp, Huyện Hớn Quản, Huyện Đồng Phú Huyện Bù Đăng Thị xã Chơn Thành Huyện Phú Riềng",
            ],
        },
        {
            tinh: "Tây Ninh",
            dsHuyen: [
                "Thành phố Tây Ninh, Huyện Tân Biên, Huyện Tân Châu, Huyện Dương Minh Châu, Huyện Châu Thành, Thị xã Hòa Thành, Huyện Gò Dầu, Huyện Bến Cầu, Thị xã Trảng Bàng",
            ],
        },
        {
            tinh: "Bình Dương",
            dsHuyen: [
                "Thành phố Thủ Dầu Một, Huyện Bàu Bàng, Huyện Dầu Tiếng, Thị xã Bến Cát, Huyện Phú Giáo, Thị xã Tân Uyên, Thành phố Dĩ An, Thành phố Thuận An, Huyện Bắc Tân Uyên.",
            ],
        },
        {
            tinh: "Đồng Nai",
            dsHuyen: [
                "Thành phố Biên Hòa, Thành phố Long Khánh, Huyện Tân Phú, Huyện Vĩnh Cửu, Huyện Định Quán, Huyện Trảng Bom, Huyện Thống Nhất, Huyện Cẩm Mỹ, Huyện Long Thành, Huyện Xuân Lộc, Huyện Nhơn Trạch",
            ],
        },
        {
            tinh: "Bà Rịa - Vũng Tàu",
            dsHuyen: [
                "Thành phố Vũng Tàu, Thành phố Bà Rịa, Huyện Châu Đức, Huyện Xuyên Mộc, Huyện Long Điền, Huyện Đất Đỏ, Thị xã Phú Mỹ, Huyện Côn Đảo",
            ],
        },
        {
            tinh: "TP.Hồ Chí Minh",
            dsHuyen: [
                "Quận 1, Quận 12, Quận Gò Vấp, Quận Bình Thạnh, Quận Tân Bình, Quận Tân Phú, Quận Phú Nhuận, Thành phố Thủ Đức, Quận 3, Quận 10, Quận 11, Quận 4, Quận 5, Quận 6, Quận 8, Quận Bình Tân, Quận 7, Huyện Củ Chi, Huyện Hóc Môn, Huyện Bình Chánh, Huyện Nhà Bè, Huyện Cần Giờ",
            ],
        },
        {
            tinh: "Long An",
            dsHuyen: [
                "Thành phố Tân An, Thị xã Kiến Tường, Huyện Tân Hưng, Huyện Vĩnh Hưng, Huyện Mộc Hóa, Huyện Tân Thạnh, Huyện Thạnh Hóa, Huyện Đức Huệ, Huyện Đức Hòa, Huyện Bến Lức, Huyện Thủ Thừa, Huyện Tân Trụ, Huyện Cần Đước, Huyện Cần Giuộc",
            ],
        },
        {
            tinh: "Tiền Giang",
            dsHuyen: [
                "Thành phố Mỹ Tho, Thị xã Gò Công, Thị xã Cai Lậy, Huyện Tân Phước, Huyện Cái Bè, Huyện Cai Lậy, Huyện Chợ Gạo, Huyện Gò Công Tây, Huyện Gò Công Đông, Huyện Tân Phú Đông",
            ],
        },
        {
            tinh: "Bến Tre",
            dsHuyen: [
                "	Thành phố Bến Tre, Huyện Chợ Lách, Huyện Mỏ Cày Nam, Huyện Giồng Trôm, Huyện Bình Đại, Huyện Ba Tri, Huyện Thạnh Phú, Huyện Mỏ Cày Bắc",
            ],
        },
        {
            tinh: "Trà Vinh",
            dsHuyen: [
                "	Thành phố Trà Vinh, Huyện Càng Long, Huyện Cầu Kè, Huyện Tiểu Cần, Huyện Cầu Ngang, Huyện Trà Cú, Huyện Duyên Hải, Thị xã Duyên Hải",
            ],
        },
        {
            tinh: "Vĩnh Long",
            dsHuyen: [
                "Thành phố Vĩnh Long, Huyện Long Hồ, Huyện Mang Thít, Huyện Vũng Liêm, Huyện Tam Bình, Thị xã Bình Minh, Huyện Trà Ôn, Huyện Bình Tân",
            ],
        },
        {
            tinh: "Đồng Tháp",
            dsHuyen: [
                "Thành phố Cao Lãnh, Thành phố Sa Đéc, Thành phố Hồng Ngự, Huyện Tân Hồng, Huyện Hồng Ngự, Huyện Tháp Mười, Huyện Cao Lãnh, Huyện Thanh Bình, Huyện Lấp Vò, Huyện Lai Vung",
            ],
        },
        {
            tinh: "An Giang",
            dsHuyen: [
                "Thành phố Long Xuyên, Thành phố Châu Đốc, Huyện An Phú, Thị xã Tân Châu, Huyện Phú Tân, Huyện Châu Phú, Huyện Tịnh Biên, Huyện Tri, Tôn Huyện Thoại Sơn",
            ],
        },
        {
            tinh: "Kiên Giang",
            dsHuyen: [
                "Thành phố Rạch Giá, Thành phố Hà Tiên, Huyện Kiên Lương, Huyện Hòn Đất, Huyện Tân Hiệp, Huyện Giồng Riềng, Huyện Gò Quao, Huyện An Biên, Huyện An Minh, Huyện Vĩnh Thuận, Thành phố Phú Quốc, Huyện Kiên Hải, Huyện U Minh Thượng, Huyện Giang Thành",
            ],
        },
        {
            tinh: "Cần Thơ",
            dsHuyen: [
                "Quận Ninh Kiều, Quận Ô Môn, Quận Bình Thuỷ, Quận Cái Răng, Quận Thốt Nốt, Huyện Cờ Đỏ, Huyện Thới Lai",
            ],
        },
        {
            tinh: "Hậu Giang",
            dsHuyen: [
                "	Thành phố Vị Thanh, Thành phố Ngã Bảy, Huyện Châu Thành A, Huyện Phụng Hiệp, Huyện Vị Thuỷ, Huyện Long Mỹ, Thị xã Long Mỹ",
            ],
        },
        {
            tinh: "Sóc Trăng",
            dsHuyen: [
                "Kế Sách, Long Phú, Mỹ Tú, Mỹ Xuyên, Thạnh Trị, Vĩnh Châu",
            ],
        },
        {
            tinh: "Bạc Liêu",
            dsHuyen: [
                "Thành phố Bạc Liêu, Huyện Hồng Dân, Huyện Phước Long, Huyện Vĩnh Lợi, Thị xã Giá Rai, Huyện Đông Hải, Huyện Hoà Bình",
            ],
        },
        {
            tinh: "Cà Mau",
            dsHuyen: [
                "Thành phố Cà Mau, Huyện U Minh, Huyện Thới Bình, Huyện Trần Văn Thời, Huyện Cái Nước, Huyện Đầm Dơi, Huyện Năm Căn, Huyện Ngọc Hiển",
            ],
        },
    ];
    const dsXa2 = [
        {
            tinh: "Hà Nội",
            huyen: "hihi",
            dsXa: ["hihi"],
        },
        {
            tinh: "Vĩnh Phúc",
            huyen: "hihi",
            dsXa: ["hihi"],
        },
        { tinh: "Bắc Ninh", huyen: "hihi", dsXa: ["hihi"] },
        { tinh: "Quảng Ninh", huyen: "hihi", dsXa: ["hihi"] },
        { tinh: "Hải Dương", huyen: "hihi", dsXa: ["hihi"] },
        { tinh: "Hải Phòng", huyen: "hihi", dsXa: ["hihi"] },
        { tinh: "Hưng Yên", huyen: "hihi", dsXa: ["hihi"] },
        { tinh: "Thái Bình", huyen: "hihi", dsXa: ["hihi"] },
        { tinh: "Hà Nam", huyen: "hihi", dsXa: ["hihi"] },
        { tinh: "Nam Định", huyen: "hihi", dsXa: ["hihi"] },
        { tinh: "Ninh Bình", huyen: "hihi", dsXa: ["hihi"] },
        { tinh: "Hà Giang", huyen: "hihi", dsXa: ["hihi"] },
        { tinh: "Cao Bằng", huyen: "hihi", dsXa: ["hihi"] },
        { tinh: "Bắc Kạn", huyen: "hihi", dsXa: ["hihi"] },
        { tinh: "Tuyên Quang", huyen: "hihi", dsXa: ["hihi"] },
        { tinh: "Lào Cai", huyen: "hihi", dsXa: ["hihi"] },
        { tinh: "Yên Bái", huyen: "hihi", dsXa: ["hihi"] },
        { tinh: "Thái Nguyên", huyen: "hihi", dsXa: ["hihi"] },
        { tinh: "Lạng Sơn", huyen: "hihi", dsXa: ["hihi"] },
        { tinh: "Bắc Giang", huyen: "hihi", dsXa: ["hihi"] },
        { tinh: "Phú Thọ", huyen: "hihi", dsXa: ["hihi"] },
        { tinh: "Điện Biên", huyen: "hihi", dsXa: ["hihi"] },
        { tinh: "Lai Châu", huyen: "hihi", dsXa: ["hihi"] },
        { tinh: "Sơn La", huyen: "hihi", dsXa: ["hihi"] },
        { tinh: "Hoà Bình", huyen: "hihi", dsXa: ["hihi"] },
        { tinh: "Thanh Hoá", huyen: "hihi", dsXa: ["hihi"] },
        { tinh: "Nghệ An", huyen: "hihi", dsXa: ["hihi"] },
        { tinh: "Hà Tĩnh", huyen: "hihi", dsXa: ["hihi"] },
        { tinh: "Quảng Bình", huyen: "hihi", dsXa: ["hihi"] },
        { tinh: "Quảng Trị", huyen: "hihi", dsXa: ["hihi"] },
        {
            tinh: "Thừa Thiên Huế",
            huyen: "hihi",
            dsXa: ["hihi"],
        },
        { tinh: "Đà Nẵng", huyen: "hihi", dsXa: ["hihi"] },
        { tinh: "Quảng Nam", huyen: "hihi", dsXa: ["hihi"] },
        { tinh: "Quảng Ngãi", huyen: "hihi", dsXa: ["hihi"] },
        { tinh: "Bình Định", huyen: "hihi", dsXa: ["hihi"] },
        { tinh: "Phú Yên", huyen: "hihi", dsXa: ["hihi"] },
        { tinh: "Khánh Hoà", huyen: "hihi", dsXa: ["hihi"] },
        { tinh: "Ninh Thuận", huyen: "hihi", dsXa: ["hihi"] },
        { tinh: "Bình Thuận", huyen: "hihi", dsXa: ["hihi"] },
        { tinh: "Kon Tum", huyen: "hihi", dsXa: ["hihi"] },
        { tinh: "Gia Lai", huyen: "hihi", dsXa: ["hihi"] },
        { tinh: "Đắk Lắk", huyen: "hihi", dsXa: ["hihi"] },
        { tinh: "Đắk Nông", huyen: "hihi", dsXa: ["hihi"] },
        { tinh: "Lâm Đồng", huyen: "hihi", dsXa: ["hihi"] },
        { tinh: "Bình Phước", huyen: "hihi", dsXa: ["hihi"] },
        { tinh: "Tây Ninh", huyen: "hihi", dsXa: ["hihi"] },
        { tinh: "Bình Dương", huyen: "hihi", dsXa: ["hihi"] },
        { tinh: "Đồng Nai", huyen: "hihi", dsXa: ["hihi"] },
        {
            tinh: "Bà Rịa - Vũng Tàu",
            huyen: "hihi",
            dsXa: ["hihi"],
        },
        {
            tinh: "TP.Hồ Chí Minh",
            huyen: "hihi",
            dsXa: ["hihi"],
        },
        { tinh: "Long An", huyen: "hihi", dsXa: ["hihi"] },
        { tinh: "Tiền Giang", huyen: "hihi", dsXa: ["hihi"] },
        { tinh: "Bến Tre", huyen: "hihi", dsXa: ["hihi"] },
        { tinh: "Trà Vinh", huyen: "hihi", dsXa: ["hihi"] },
        { tinh: "Vĩnh Long", huyen: "hihi", dsXa: ["hihi"] },
        { tinh: "Đồng Tháp", huyen: "hihi", dsXa: ["hihi"] },
        { tinh: "An Giang", huyen: "hihi", dsXa: ["hihi"] },
        { tinh: "Kiên Giang", huyen: "hihi", dsXa: ["hihi"] },
        { tinh: "Cần Thơ", huyen: "hihi", dsXa: ["hihi"] },
        { tinh: "Hậu Giang", huyen: "hihi", dsXa: ["hihi"] },
        { tinh: "Sóc Trăng", huyen: "hihi", dsXa: ["hihi"] },
        { tinh: "Bạc Liêu", huyen: "hihi", dsXa: ["hihi"] },
        { tinh: "Cà Mau", huyen: "hihi", dsXa: ["hihi"] },
    ];
    useEffect(() => {
        setdshuyen(dsHuyen2.find((item) => item.tinh === tinh));
    }, [tinh]);
    useEffect(() => {
        setdsxa(
            dsXa2.find((item) => item.tinh === tinh && item.huyen === huyen)
        );
    }, [huyen]);
    const handleChonTinh = (t) => {
        settinh(t);
        sethuyen("Quận/Huyện");
        setxa("Xã/Phường");
    };
    const handleChonHuyen = (h) => {
        sethuyen(h);
        setxa("Xã/Phường");
    };
    const handleChonXa = (x) => {
        setxa(x);
    };
    return (
        <div className="ChonDiaChi-ConTaiNer">
            <div className="diaChi">Địa Chỉ</div>
            <div className="tinh-huyen-xa">
                <select
                    id="provinces"
                    onChange={(e) => handleChonTinh(e.target.value)}
                >
                    <option>{tinh}</option>
                    {dsTinh?.map((item) => {
                        return (
                            <option key={item} value={item}>
                                {item}
                            </option>
                        );
                    })}
                </select>
                <select onChange={(e) => handleChonHuyen(e.target.value)}>
                    <option>{huyen}</option>
                    {dshuyen?.dsHuyen?.map((item) => {
                        return (
                            <option value={item} key={item}>
                                {item}
                            </option>
                        );
                    })}
                </select>
                <select onChange={(e) => handleChonXa(e.target.value)}>
                    <option> {xa}</option>
                    {dsxa?.dsXa?.map((item) => {
                        return (
                            <option value={item} key={item}>
                                {item}
                            </option>
                        );
                    })}
                </select>
            </div>
            <input
                className="soNha"
                placeholder={thonXom}
                type="text"
                onChange={(e) => setthonXom(e.target.value)}
            />
        </div>
    );
};
export default ChonDiaChi;
