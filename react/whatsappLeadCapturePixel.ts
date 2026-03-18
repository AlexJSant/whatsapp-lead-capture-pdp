/* Centraliza o disparo do evento de Pixel para o WhatsApp Lead Capture. */

const WHATSAPP_LEAD_CAPTURE_EVENT = "whatsapp-lead-capture-app"

type WhatsappLeadCapturePixelPayload = {
  event: typeof WHATSAPP_LEAD_CAPTURE_EVENT
  pageType: "product"
  sku?: string
  productId?: string
  productName?: string
  collectionId?: string
  collectionName?: string
}

function getSkuCode(productContext: any): string | undefined {
  // Em VTEX IO, normalmente o código SKU fica como `itemId` (selectedItem ou product.items[0]).
  const selectedItemSku = productContext?.selectedItem?.itemId
  const items = productContext?.product?.items
  const firstItemSku = items?.[0]?.itemId

  const sku = selectedItemSku ?? firstItemSku ?? productContext?.product?.skuId
  if (sku == null) return undefined

  return String(sku)
}

function getProductId(productContext: any): string | undefined {
  // Fallbacks comuns: productId / productReference / product?.id
  const id =
    productContext?.product?.productId ??
    productContext?.product?.productReference ??
    productContext?.product?.id

  if (id == null) return undefined
  return String(id)
}

export function pushWhatsappLeadCapturePixel(params: {
  productContext: any
  productName?: string
  collectionId?: string
  collectionName?: string
}) {
  const payload: WhatsappLeadCapturePixelPayload = {
    event: WHATSAPP_LEAD_CAPTURE_EVENT,
    pageType: "product",
    sku: getSkuCode(params.productContext),
    productId: getProductId(params.productContext),
    productName: params.productName,
    collectionId: params.collectionId,
    collectionName: params.collectionName,
  }

  // Preferimos `dataLayer.push` porque não depende de dependência adicional.
  // Caso `dataLayer` não exista ainda, inicializamos como array.
  if (typeof window === "undefined") return

  const w = window as any
  w.dataLayer = w.dataLayer || []

  if (typeof w.dataLayer.push === "function") {
    w.dataLayer.push(payload)
  }
}

