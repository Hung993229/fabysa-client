import "./Instruct.scss";
import facebookLogo from "../assets/images/Facebook_Logo.png";
const Instruct = () => {
    return (
        <div className="container-huongDan">
            {/* <h1 className="h1">Fabysa.Com Có Điều Gì Đặc Biệt?</h1> */}

            <h1 className=" h1">
                Mua Nhanh - Bán Nhanh - Giá Rẻ - Hậu Mãi Tốt
            </h1>
            <h2 className="h2">1. Xứ Mệnh Ra Đời</h2>

            <p>
                Mục tiêu ra đời là: <br />- Giúp cho kinh doanh truyền thống tồn
                tại và phát triển!
                <br /> - Giúp cho kinh doanh online bền vững và phát triển!{" "}
                <br />- Giúp cho việc khởi nghiệp kinh doanh được dễ dàng và chi
                phí rẻ hơn! <br />- Giúp cho người mua, mua được hàng chất
                lượng, uy tín. Hàng thật giá thật, hàng tốt giá tốt!
            </p>
            <h2 className="h2">2. Menu chính</h2>
            <p>
                - Săn Sale: nơi người mua hàng tìm được các sản phẩm được bán
                giá cực kì ưu đãi!
                <br />
                - Minigame: Cuộc sống sẽ thú vị hơn khi có nhũng điều bất ngờ.
                Vì vậy, minigame là nơi mọi người có thể giải trí thử vận may
                giải trí 0 đồng có thưởng.
                <br />
                - Khởi Nghiệp: Nơi những người bắt đầu tập kinh doanh có thể tìm
                được nguồn hàng nhanh nhất. Và được hướng dẫn khi bắt đầu tham
                gia kinh doanh. <br /> - Hướng Dẫn: Mô tả sơ lược Website.
                <br />
                - Hội FA: Nơi giúp những người độc thân sớm tìm được một nửa yêu
                thương.
                <br />
                - Cá Nhân: Cập nhật thông tin cá nhân giúp người dùng mua hàng
                nhanh hơn.
                <br />
            </p>
            <h2 className="h2">3. Tổng Kết</h2>
            <p>
                Đội ngũ phát triển mong muốn góp một phần nhỏ bé của mình vào
                công cuộc phát triển của đất nước.
                <br /> Do mới thành lập nên còn nhiều thứ cần hoàn thiện.
                <br /> Rất mong nhận được sự ủng hộ và góp ý của tất cả mọi
                người!
            </p>

            <a
                href={`https://www.facebook.com/profile.php?id=61554188707999`}
                target="_blank"
            >
                <img className="facebook" src={facebookLogo} />
            </a>
            <h3 className="h3">Xin trân thành cảm ơn!</h3>
        </div>
    );
};
export default Instruct;
