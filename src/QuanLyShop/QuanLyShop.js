import "./QuanLyShop.scss";
import CommonUtils from "../component/CommonUtils";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerPost, registerStatus } from "../redux/apiRequest";
import { useEffect } from "react";
const QuanLyShop = () => {
    const user = useSelector((state) => state.auth.login?.currentUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    return <div>hihii</div>;
};
export default QuanLyShop;
