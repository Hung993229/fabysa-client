import axiosDefault from "axios";

export const apiGetPublicProvinces = async () => {
    try {
        const response = await axiosDefault.get(
            "https://vapi.vnappmob.com/api/province"
        );
        return response;
    } catch (err) {
        console.log(err);
    }
};
export const apiGetPublicDistrict = async (provincesID) => {
    try {
        const response = await axiosDefault.get(
            `https://vapi.vnappmob.com/api/province/district/${provincesID}`
        );
        return response;
    } catch (err) {
        console.log(err);
    }
};

export const apiGetPublicWard = async (districtID) => {
    try {
        const response = await axiosDefault.get(
            `https://vapi.vnappmob.com/api/province/ward/${districtID}`
        );
        return response;
    } catch (err) {
        console.log(err);
    }
};
