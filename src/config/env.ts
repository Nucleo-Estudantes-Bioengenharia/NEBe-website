/** URL público do site (inclui o basePath, ex.: https://org.github.io/NEBe-website). */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:8080"
).replace(/\/$/, "");
