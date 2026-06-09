/**
 * Amazon Affiliate Helper for ZZZ Guide EN
 *
 * Config: Set AMAZON_TAG below to your Amazon Associates tracking ID.
 * The script replaces all "YOUR-AMAZON-TAG" placeholders in Amazon links
 * and loads the Amazon conversion tracking pixel.
 */
const AMAZON_TAG = 'YOUR-AMAZON-TAG'; // ← Change this to your tracking ID

(function () {
  'use strict';

  // 1. Replace placeholder tags in all Amazon links on the page
  function replaceAmazonTags() {
    const links = document.querySelectorAll('a[href*="amazon.com"]');
    links.forEach(function (link) {
      if (link.href.indexOf('YOUR-AMAZON-TAG') !== -1) {
        link.href = link.href.replace(/YOUR-AMAZON-TAG/g, encodeURIComponent(AMAZON_TAG));
      }
    });
  }

  // Run on initial page load
  replaceAmazonTags();

  // 2. Load Amazon conversion tracking script
  //    (Amazon Associates Program requires the amzn_assoc_ad universal tag)
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.src =
    '//z-na.amazon-adsystem.com/widgets/onejs?MarketPlace=US&adInstanceId=YOUR-AD-INSTANCE-ID';
  script.async = true;
  // Attach but don't block rendering
  script.onload = function () {
    if (typeof window.amzn_assoc_ad === 'undefined') {
      // Optional: fallback logging (silent in production)
    }
  };
  document.head.appendChild(script);

  // 3. Expose the tag globally so other scripts can reference it
  window.AmazonAffiliateTag = AMAZON_TAG;

  // 4. Re-run when DOM changes (for SPAs / dynamic content)
  if (window.MutationObserver) {
    var observer = new MutationObserver(function () {
      replaceAmazonTags();
    });
    observer.observe(document.body, { childList: true, subtree: true });
  }
})();
