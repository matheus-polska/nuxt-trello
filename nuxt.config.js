import serveStatic from "serve-static";

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "nuxt-trello",
    htmlAttrs: {
      lang: "en"
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],
  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    [
      "nuxt-fontawesome",
      {
        component: "fa", //customize component name
        imports: [
          {
            set: "@fortawesome/free-solid-svg-icons",
            icons: ["faBorderAll"]
          },
          {
            set: "@fortawesome/free-solid-svg-icons",
            icons: ["faPlus"]
          },
          {
            set: "@fortawesome/free-solid-svg-icons",
            icons: ["faBell"]
          },
          {
            set: "@fortawesome/free-solid-svg-icons",
            icons: ["faHome"]
          },
          {
            set: "@fortawesome/free-solid-svg-icons",
            icons: ["faUserFriends"]
          },
          {
            set: "@fortawesome/free-solid-svg-icons",
            icons: ["faSignOutAlt"]
          },
          {
            set: "@fortawesome/free-solid-svg-icons",
            icons: ["faEdit"]
          },
          {
            set: "@fortawesome/free-solid-svg-icons",
            icons: ["faTrashAlt"]
          },
          {
            set: "@fortawesome/free-solid-svg-icons",
            icons: ["faHandsHelping"]
          },
          {
            set: "@fortawesome/free-solid-svg-icons",
            icons: ["faTasks"]
          },
          {
            set: "@fortawesome/free-solid-svg-icons",
            icons: ["faTimes"]
          },
          // { set: "@fortawesome/free-brands-svg-icons", icons: ["faBorderAll"] },
          { set: "@fortawesome/free-regular-svg-icons", icons: ["faLightbulb"] }
        ]
      }
    ]
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ["cookie-universal-nuxt"],
  env: {},
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {}
};
