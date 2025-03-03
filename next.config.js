/** @type {import('next').NextConfig} */
const { i18n } = require('./next-i18next.config');

const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');


const nextConfig = {
  images: {
    domains: ['api.dicebear.com', 'xsgames.co'],
  },
  reactStrictMode: true,
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.join(__dirname, './node_modules/pdfjs-dist/build/pdf.worker.min.js'),
          to: path.join(__dirname, 'dist'),
        },
      ],
    }),

  ],
  entry: {
    main: './src/index.tsx',
    'pdf.worker': path.join(__dirname, './node_modules/pdfjs-dist/build/pdf.worker.min.js'),
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].bundle.js'
  },
  i18n,
  webpack: (config, { isServer }) => {
    config.resolve.alias['react-datepicker/dist/react-datepicker.css'] = path.join(
      __dirname,
      'node_modules',
      'react-datepicker',
      'dist',
      'react-datepicker.css'
    );
    return config;
  },
}

module.exports = nextConfig
