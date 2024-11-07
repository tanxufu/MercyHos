import axios from 'axios';

const URL_BACKEND = 'https://provinces.open-api.vn/api';

// Lấy danh sách tỉnh/thành phố
const fetchProvinces = async () => {
    try {
        const response = await axios.get(`${URL_BACKEND}/p`);
        return response.data;
    } catch (error) {
        console.error('Failed to fetch provinces:', error);
        throw new Error('Không thể lấy danh sách tỉnh/thành phố');
    }
};

// Lấy danh sách quận/huyện theo tỉnh/thành phố
const fetchDistricts = async (provinceCode) => {
    try {
        if (!provinceCode) {
            return [];
        }
        const response = await axios.get(`${URL_BACKEND}/p/${provinceCode}?depth=2`);
        return response.data.districts;
    } catch (error) {
        console.error('Failed to fetch districts:', error);
        throw new Error('Không thể lấy danh sách quận/huyện');
    }
};

// Lấy danh sách phường/xã theo quận/huyện
const fetchWards = async (districtCode) => {
    try {
        if (!districtCode) {
            return [];
        }
        const response = await axios.get(`${URL_BACKEND}/d/${districtCode}?depth=2`);
        return response.data.wards;
    } catch (error) {
        console.error('Failed to fetch wards:', error);
        throw new Error('Không thể lấy danh sách phường/xã');
    }
};

export {
    fetchProvinces,
    fetchDistricts,
    fetchWards
};