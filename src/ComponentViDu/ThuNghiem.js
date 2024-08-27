import "./ThuNghiem.scss";
import React, { useState } from "react";
const ThuNghiem = () => {
    const [data, setdata] = useState(0);

    function format1(n, currency) {
        return (
            currency +
            n.toFixed(2).replace(/./g, function (c, i, a) {
                return i > 0 && c !== "." && (a.length - i) % 3 === 0
                    ? "," + c
                    : c;
            })
        );
    }
    const handleDinhDangSo = (data) => {
        return (
            data.toFixed(0).replace(/./g, function (c, i, a) {
                return i > 0 && c !== "," && (a.length - i) % 3 === 0
                    ? "." + c
                    : c;
            })
        );
    };
    function format2(n, currency) {
        return currency + n.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
    }

    var numbers = [1, 12, 123, 1234, 12345, 123456, 1234567, 12345.67];

    console.log("data2", handleDinhDangSo(+data, "vnd"));

    // console.log("data", data);
    for (var i = 0; i < numbers.length; i++) {
        console.log(format1(numbers[i], "£ "));
    }

    for (var i = 0; i < numbers.length; i++) {
        console.log(format2(numbers[i], "vnd "));
    }
    return (
        <div className="ThuNghiem-ConTaiNer">
            <input type="number" onChange={(e) => setdata(e.target.value)} />
        </div>
    );
};
export default ThuNghiem;
