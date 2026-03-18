# WhatsApp Lead Capture - Product Page

A VTEX IO app that creates a dynamic WhatsApp button for product pages. The button automatically captures product information and includes it in the WhatsApp message, with optional collection name support.

## Configuration

1. Add the app as a dependency in your theme's `manifest.json`:

```json
{
  "dependencies": {
    "sunhouse.whatsapp-lead-capture-pdp": "1.x"
  }
}
```

2. Add the block to your product page template:

```json
{
  "store.product": {
    "blocks": ["whatsapp-lead-capture-btn"]
  }
}
```

### Blocks

| Block name | Description |
| ---------- | ----------- |
| `whatsapp-lead-capture-btn` | WhatsApp button with dynamic product information |

### `whatsapp-lead-capture-btn` props

| Prop name | Type | Description | Default value |
| --------- | ---- | ----------- | ------------- |
| `text` | `string` | Button text | `"ENTRE EM CONTATO"` |
| `phone` | `string` | WhatsApp phone number (with country code and area code, numbers only) | `"5511994877664"` |
| `collectionId` | `string` | Collection ID to include collection name in message (optional) | - |
| `message` | `string` | Texto comunicativo antes do SKU (o nome do produto e a coleção são inseridos automaticamente). | `"Olá, tenho interesse no produto"` |
| `messageSuffix` | `string` | Sufixo opcional anexado no final da mensagem (depois de tudo, inclusive coleção). Deixe vazio para não aparecer. | `""` |
| `showIcon` | `boolean` | Show WhatsApp icon | `true` |

### Example usage

```json
{
  "whatsapp-lead-capture-btn": {
    "props": {
      "text": "Fale no WhatsApp",
      "phone": "5511988887777",
      "collectionId": "123",
      "showIcon": true
    }
  }
}
``` 

## How it works

The app automatically captures the current product information from the product context and generates a WhatsApp message. If a `collectionId` is provided and the product belongs to that collection, the collection name will be included in the message.

**Message format:**
- With collection: `message` + `productName` + ` da coleção ${collectionName}` + `messageSuffix`
- Without collection: `message` + `productName` + `messageSuffix`

## Pixel event (dataLayer)
On click of the WhatsApp button (PDP only), the app pushes a custom event to `window.dataLayer`.

Event name:
`whatsapp-lead-capture-app`

Payload format (example):
```js
window.dataLayer.push({
  event: "whatsapp-lead-capture-app",
  pageType: "product",
  sku: "79115",
  productId: "79115",
  productName: "NOME DO PRODUTO",
  collectionId: "123",
  collectionName: "NOME DA COLECAO"
})
```

Fields sent by the app:
- `event`: `whatsapp-lead-capture-app`
- `pageType`: constant `"product"`
- `sku`: product code/SKU (best-effort: `selectedItem.itemId`, fallback `product.items[0].itemId`)
- `productId`: best-effort: `product.productId`, then `productReference`, then `product.id`
- `productName`: from `product.productName`
- `collectionId` / `collectionName`: only when the `collectionId` prop is provided and the product contains that cluster in `productClusters`

Notes:
- If VTEX product context does not contain the expected fields, `sku`/`productId` can end up as `undefined` (no crash).
- The event is fired on `onClick` of the WhatsApp link (before opening the WhatsApp tab).

## How to test
1. In your VTEX theme/editor, add `whatsapp-lead-capture-btn` to `store.product.blocks` (PDP).
2. Configure the block props as needed (at least `phone`).
3. Open a product detail page in the browser.
4. Open DevTools Console and keep it open.
5. Click the WhatsApp button.
6. In the Console, check `window.dataLayer` for a new object where `event === "whatsapp-lead-capture-app"`.
   You can run: `window.dataLayer.slice().reverse().find(e => e?.event === "whatsapp-lead-capture-app")`.

## Customization

In order to apply CSS customizations in this and other blocks, follow the instructions given in the recipe on [Using CSS Handles for store customization](https://vtex.io/docs/recipes/style/using-css-handles-for-store-customization).

| CSS Handles |
| ----------- | 
| `whatsappDynamicButtonIcon` | 
| `whatsappDynamicButtonLink` |

<!-- DOCS-IGNORE:start -->

## Contributors ✨

Thanks goes to these wonderful people:

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind are welcome!

<!-- DOCS-IGNORE:end -->

---- 

Check out some documentation models that are already live: 
- [Breadcrumb](https://github.com/vtex-apps/breadcrumb)
- [Image](https://vtex.io/docs/components/general/vtex.store-components/image)
- [Condition Layout](https://vtex.io/docs/components/all/vtex.condition-layout@1.1.6/)
- [Add To Cart Button](https://vtex.io/docs/components/content-blocks/vtex.add-to-cart-button@0.9.0/)
- [Store Form](https://vtex.io/docs/components/all/vtex.store-form@0.3.4/)
