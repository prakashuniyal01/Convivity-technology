const { URL } = require('url');
const { regex } = require('./constants');

const is_phone = (phone) => String(phone).toLowerCase().match(regex.PHONE);

const is_email = (email) => String(email).toLowerCase().match(regex.EMAIL);

const is_url = (url) => {
    try {
        if(typeof url !== 'string') {
            return false;
        }
        const _url = new URL(url);
        return !!_url;
    } catch (error) {
        return false;
    }
}

module.exports = { is_email, is_phone, is_url }