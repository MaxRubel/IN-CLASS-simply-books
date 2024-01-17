module.exports = {
  reactStrictMode: true,
  // I don't want it to run when compiling as I trust the CI stage of the pipeline and Husky.
  ignoreDuringBuilds: true,
  images: {
    domains: ['th-thumbnailer.cdn-si-edu.com', 'images-na.ssl-images-amazon.com'],
  },
};
