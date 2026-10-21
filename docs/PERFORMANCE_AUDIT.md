# Performance audit — October 21, 2026

The audit covered asset payloads, scrolling work, and embedded demo lifecycles. These measurements are local source/build measurements and controlled hook tests, not live-browser FPS, Lighthouse scores, or field Core Web Vitals.

## Verified changes

| Area | Before | After |
| --- | --- | --- |
| Home-to-search HTML | 2,233,830 bytes | 85,499 bytes (96.2% smaller) |
| Home-to-search HTML, gzip | 1,642,446 bytes | 18,227 bytes |
| Inline images in that HTML | 15 | 0; all 15 use separate reusable image URLs |
| 12 top-level Tacki screenshots | 9,900,915 bytes | 4,913,338 bytes (50.4% smaller) |
| Initial Tacki HTML with demo sources assigned | 6 | 1; other sources attach near the viewport |
| Style reads during 100 small homepage scroll updates | 1,000 | 0, after initialization |
| Card-position reads during those updates | 700 | 0, after initialization |
| Redundant focus-attribute writes during those updates | 700 | 0 |

The extracted animation images retain their original encoded bytes (1,611,312 bytes in separate files). The HTML saving is a document/parsing and reuse benefit, **not** a claim that the entire animation now downloads in 18KB. Extracted images still load as needed and can be reused between the homepage, overview, and final-design demos.

Eleven screenshot conversions passed exact decoded RGBA comparisons. One PNG was retained because its conversion did not pass that exact comparison. Screenshot dimensions and crops are unchanged.

## Why scrolling should do less work

- The camera reads CSS dimensions on initialization and resize, then animates its transform directly. It keeps the existing scale range and easing.
- Card focus caches layout positions, refreshes them on resize, and only updates focus when the nearest card changes.
- The case study sidebar caches section positions rather than measuring each section after progress/navigation writes on every scroll frame. Resize observation refreshes positions when content height changes.
- HTML demos unload outside a 200px viewport margin and while the browser tab is hidden. The hero remains available in the initial HTML. Returning to a demo restarts its animation, matching its existing looping walkthrough behavior.

## Checks

- `npm run check`: original zoom/fold checks, case-study validation, scroll-work regression tests, and demo lifecycle tests.
- `npm run build`: production compilation and static route generation.
- All local Tacki media references resolve; all extracted images were checked against the original embedded bytes.
- Controlled scroll tests confirm the camera still reaches `0.734` scale, reverses to `1`, and focus updates after layout changes.
- Production-page gzip JavaScript remained approximately flat: homepage 244,048 → 244,456 bytes; Tacki 234,059 → 234,427 bytes. The small loading controller adds under 0.5KB in these build comparisons. Concurrent viewport-fitting edits were preserved, so this bundle comparison is not attributed solely to this audit.

## Remaining gaps

1. **Browser and device measurements:** record the production homepage and Tacki page on a representative phone and desktop. Measure LCP, INP, CLS, frame timing, and memory while scrolling. This session did not have an available approved browser profiling surface; no runtime smoothness score is claimed.
2. **GPU paint/compositing:** the fixed bottom blur and textured, transformed cards may still be expensive on low-powered devices. Profile them before changing the requested appearance.
3. **Embedded-document fonts:** demos request fonts from third-party stylesheet services. Localizing those fonts or reducing requested weights may improve first playback, but requires checking the actual font files and rendered appearance.
4. **JavaScript splitting:** the compressed entry scripts remain around 234–244KB. A browser/bundle trace should establish which animation dependencies can be deferred without delaying the opening animation.

No production deployment was made for this audit.

## Follow-up: delivery options — October 21, 2026

### Implemented

- Responsive Next.js images for all 12 research/iteration screenshots, with intrinsic dimensions, `sizes`, lazy loading, and quality 90. This avoids sending a full-resolution source to every viewport. A local production request for the search-after screenshot at 828px returned **77,846 bytes**, versus its **886,780-byte** full-resolution WebP source. This is one representative image, not a measured reduction for every viewport.
- Fifteen standalone-demo JPEGs now have content-fingerprinted URLs and a one-year immutable browser-cache header. Their image bytes are unchanged. Tests check that filenames still match their contents.
- The mono font now uses WOFF2: **8,540 → 5,176 bytes**. The glyph mapping and horizontal metrics were checked against the original font. The main text fonts were already WOFF2 and self-hosted through Next.js.
- Removed the home demo's Google Fonts stylesheet request, which returned HTTP 400. Poppins and Inter appear only in unused sections of that standalone demo's CSS; no currently working font resource was replaced.

### Already covered or not justified

- Vercel CDN: the live Vercel alias returned `x-vercel-cache: HIT` for media and `x-nextjs-prerender: 1` for the homepage.
- Compression: the live home-to-search HTML returned `content-encoding: br`; an extra compression service is unnecessary.
- Next.js already minifies and splits application JavaScript during production builds. Further minification of standalone demo HTML is lower priority after its large inline images were extracted.
- Pages are statically generated; there is no application database or query bottleneck to optimize here. A hosting migration is not justified by the available evidence.

### More involved, viable follow-ups

- Fully self-host the demos' Satoshi fonts, preserving their font files, weights, and terms. This can remove a third-party stylesheet round trip, but requires visual comparison of all demos and a production network trace to establish the benefit.
- Additional JavaScript splitting needs a bundle/browser trace to identify code that is truly unused during opening and scrolling. Blindly deferring animation code risks delaying the opening effect.
- Evaluate AVIF separately: compare visual quality and first-request encoding cost against WebP. It is not automatically better for small UI text and diagrams.
- Lighthouse/mobile profiling is still needed to measure LCP, INP, CLS, and actual frame timing.

The custom domain from page metadata (`nicocampanell.com`) did not resolve in the audit environment. Public delivery checks used `portfolio-deploy-codex-9bfe700.vercel.app`; no DNS settings were changed. The new cache headers and image sizes were verified on a local production server, not a new live deployment.

References: [Next.js responsive images](https://nextjs.org/docs/app/api-reference/components/image), [Next.js cache headers](https://nextjs.org/docs/app/api-reference/config/next-config-js/headers), [Vercel compression](https://vercel.com/docs/compression), [Vercel CDN cache](https://vercel.com/docs/caching/cdn-cache).
