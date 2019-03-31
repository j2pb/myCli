const ENV = process.env.REACT_APP_ENV

const dev = {
    baseUrl: 'http://owlock.dev.tevi.mx'
};

const prod = {
    baseUrl: 'urlproduccion'
};

const config = ENV==='develop' ? dev : prod;

export default {
    // Configuraciones comunes
    // variableComun: 5000000,
    apiVersion: '/api/v1/',
    ...config
};