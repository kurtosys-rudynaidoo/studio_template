# Content Manager (optional)

Use this when a widget needs HTML that editors publish in Kurtosys Content Manager (tooltips, commentaries, disclaimers). Widgets do not call Content Manager directly. The CMS holds the API token and returns HTML from the same origin.

Leave it unused until a widget opts in. The starter `Widget` does not fetch content.

## WordPress

1. Copy [`hosts/cms/wordpress/ksys-content.php`](../hosts/cms/wordpress/ksys-content.php) to `wp-content/mu-plugins/ksys-content.php`.
2. In `wp-config.php`:

```php
define('KSYS_CONTENT_TOKEN', '...');
define('KSYS_CONTENT_API', 'https://api-us.kurtosys.app/content');
```

UK clients set `KSYS_CONTENT_API` to `https://api-uk.kurtosys.app/content`. Do not put the token in `env.config.cjs` or the widget bundle.

3. Publish a content type and instance in Content Manager. Request them by name:

```text
GET /wp-json/ksys/v1/content/{type}/{name}?culture=en-US
```

The plugin looks up the type and instance, resolves HTML for that culture, and caches the HTML for 15 minutes. A new item does not need a plugin change.

4. On the widget mount:

```html
<div
  id="overview"
  data-content-base-url="https://www.example.com"
  data-input-culture="en-US"
></div>
```

`data-content-base-url` is the site origin, with no trailing path. Omit it and the client does not call the network.

## Widget code

`src/services/content-client.ts` builds the route and returns `undefined` when the base URL is missing, the response fails, or the HTML is empty. `useContentHtml` stays idle until `enabled` is true.

```tsx
const mount = document.getElementById('overview');
const { html, status } = useContentHtml({
  mount,
  type: 'Notes',
  name: 'intro',
  culture: 'en-US',
  enabled: true,
});
```

Render `html` only after you trust that content type. It is editor HTML from your own CMS.

## Other CMS platforms

Pantheon WordPress uses the same plugin. A non-WordPress host needs an equivalent server route: accept type, name, and culture, call Content Manager with the token, and return `{ "html": "..." }`. Point `data-content-base-url` at that origin. Do not proxy the token through the browser.

## Security

- The route is public because the HTML is already published on the marketing site.
- Type and instance names are limited to letters, numbers, spaces, and `._-`.
- The token never leaves PHP. A missing token returns 500 and does not fall back to a browser call.
