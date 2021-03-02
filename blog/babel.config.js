//babel.config.js
module.exports = {
  presets: ["next/babel"],
  plugins: [
      [
          "import",
          {
              libraryName: "antd",
              style:"scss"
          },
      ],
    //   [
    //       "import",
    //       {
    //           libraryName: "@ant-design/icons",
    //           libraryDirectory: "lib/icons",
    //           camel2DashComponentName: false,
    //       },
    //       "@ant-design/icons",
    //   ],
  ],
};