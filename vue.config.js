const path = require('path');

// const DEV_MODE = process.env.NODE_ENV === 'development';
// const PRO_MODE = process.env.NODE_ENV === 'production';

function resolve(dir) {
    return path.join(__dirname, dir);
}
module.exports = {
    chainWebpack: config => {
        config.resolve.alias
            .set('@core', resolve('src/components'))
            .set('services', resolve('src/services'));
    }
    /* devServer: {
        proxy: {
            '/': {
                target: 'http://localhost:3334',
                ws: false,
                changeOrigin: false
            }
        }
    } */
};
