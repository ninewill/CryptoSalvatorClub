const gulp = require("gulp"),
  extender = require("gulp-html-extend"),
  babel = require("gulp-babel"),
  gulpUglify = require("gulp-uglify"),
  rename = require("gulp-rename"),
  replace = require("gulp-replace"),
  concat = require("gulp-concat"),
  htmlmin = require("gulp-htmlmin");

// * 每個 Gulp Plugins 的設定
const process = {
  extender: {
    annotations: false,
    verbose: false,
  },
  htmlmin: {
    removeComments: true,
    collapseWhitespace: true,
  },
  babel: {
    presets: [
      [
        "env",
        {
          loose: true,
          modules: false,
        },
      ],
    ],
  },
};

// * HTML Extend
// 1. 找到 ch/_develop/ 裡面除了 page-1.html 以外的所有 html 檔案，執行 extender
//    接著把裡面的字串 "./page-1.html" 替換成 "../index.html"，並輸出至 ./ch 資料夾
// 2. 找到 ch/_develop/page-1.html 這隻檔案，執行 extender
//    接著把裡面的字串 "./page-1.html" 替換成 "./index.html"、"./sitemap.html" 替換成 "./ch/sitemap.html"、"./page-" 替換成 "./ch/page-"
//    然後重新命名成 index.html，並輸出至 ./ 資料夾

gulp.task("extend", function () {
  return (
    gulp
      .src(["ch/_develop/*.html", "!ch/_develop/page-1.html"])
      .pipe(extender(process.extender))
      .pipe(replace("./page-1.html", "../index.html"))
      .pipe(gulp.dest("ch/")),
    gulp
      .src("ch/_develop/page-1.html")
      .pipe(extender(process.extender))
      .pipe(replace("./page-1.html", "./index.html"))
      .pipe(replace("./sitemap.html", "./ch/sitemap.html"))
      .pipe(replace("./page-", "./ch/page-"))
      .pipe(replace("../", "./"))
      .pipe(rename({ basename: "index" }))
      .pipe(htmlmin(process.htmlmin))
      .pipe(gulp.dest("./")),
    gulp
      .src("en/_develop/*.html")
      .pipe(extender(process.extender))
      .pipe(htmlmin(process.htmlmin))
      .pipe(gulp.dest("en/"))
  );
});

// 所有的 JavaScript Plugins
let plugins = [
  "./common/js/plugins/anime.min.js",
  "./common/js/plugins/scrollMonitor.js",
  "./common/js/plugins/main.js",
  "./common/js/plugins/jquery-3.2.1.min.js",
  "./common/js/plugins/jquery.mCustomScrollbar.min.js",
  "./common/js/plugins/lazysizes.min.js",
  "./common/js/plugins/lightgallery-all.min.js",
  "./common/js/plugins/footable.js",
  "./common/js/plugins/swiper.min.js",
  "./common/js/plugins/gsap.min.js",
  "./common/js/plugins/ScrollTrigger.min.js",
];

// * Bundle JS
// 把所有 JS 檔案壓縮

gulp.task("bundleJS", () => {
  return gulp
    .src([...plugins, "./common/js/_develop/*.js"])
    .pipe(babel(process.babel))
    .pipe(gulpUglify())
    .pipe(concat("main.js"))
    .pipe(gulp.dest("./common/js"));
});

gulp.task("default", gulp.parallel("extend", "bundleJS"));
