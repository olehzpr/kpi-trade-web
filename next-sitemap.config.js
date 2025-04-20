/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://kpi-trade.online",
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/private/", "/*?*"],
      },
    ],
    additionalSitemaps: [
      // If you have additional sitemaps, add them here
      // 'https://kpi-trade.online/server-sitemap.xml',
    ],
  },
  changefreq: "weekly",
  priority: 0.7,
  sitemapSize: 5000, // maximum number of URLs in a sitemap
  exclude: ["/admin/*", "/private/*"], // Exclude these paths from the sitemap
  // Add additional transforms if you need to modify the sitemap entries
  transform: async (config, path) => {
    // Custom priority based on path
    let priority = config.priority;

    // Home page gets highest priority
    if (path === "") {
      priority = 1.0;
    }
    // Product pages get high priority
    else if (path.startsWith("/products")) {
      priority = 0.9;
    }
    // About, contact pages get medium priority
    else if (path === "/about" || path === "/contact") {
      priority = 0.8;
    }

    return {
      loc: path, // location
      changefreq: config.changefreq,
      priority,
      lastmod: new Date().toISOString(),
      // You can add alternateRefs for multiple languages if needed
      // alternateRefs: config.alternateRefs ?? [],
    };
  },
};
