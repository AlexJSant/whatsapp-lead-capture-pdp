# WhatsApp Lead Capture - Product Page

A VTEX IO app that creates a dynamic WhatsApp button for product pages. The button automatically captures product information and includes it in the WhatsApp message, with optional collection name support.

## Configuration

1. Add the app as a dependency in your theme's `manifest.json`:

```json
{
  "dependencies": {
    "sunhouse.whatsapp-dynamic-btn": "0.x"
  }
}
```

2. Add the block to your product page template:

```json
{
  "store.product": {
    "blocks": ["whatsapp-dynamic-button"]
  }
}
```

### Blocks

| Block name | Description |
| ---------- | ----------- |
| `whatsapp-dynamic-button` | WhatsApp button with dynamic product information |

### `whatsapp-dynamic-button` props

| Prop name | Type | Description | Default value |
| --------- | ---- | ----------- | ------------- |
| `text` | `string` | Button text | `"ENTRE EM CONTATO"` |
| `phone` | `string` | WhatsApp phone number (with country code and area code, numbers only) | `"5511994877664"` |
| `collectionId` | `string` | Collection ID to include collection name in message (optional) | - |
| `showIcon` | `boolean` | Show WhatsApp icon | `true` |

### Example usage

```json
{
  "whatsapp-dynamic-button": {
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
- With collection: "Olá, estou entrando em contato sobre o produto {productName} da coleção {collectionName}"
- Without collection: "Olá, estou entrando em contato sobre o produto {productName}" 

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
