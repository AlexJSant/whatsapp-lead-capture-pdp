import React from "react"
import { useProduct } from "vtex.product-context"
import { useCssHandles } from "vtex.css-handles"
import { pushWhatsappLeadCapturePixel } from "./whatsappLeadCapturePixel"

type StorefrontFunctionComponent<P = {}> = React.FC<P> & {
  schema?: Record<string, unknown>
}

interface Props {
  text?: string
  collectionId?: string
  showIcon?: boolean
  phone?: string
  messageSuffix?: string
  message?: string
}

const WhatsappLeadCapture: StorefrontFunctionComponent<Props> = ({
  text = "Comprar por WhatsApp",
  phone = "5511994877664",
  message = "Olá! Vi no site e quero saber mais sobre o produto:",
  collectionId,
  messageSuffix = "",
  showIcon = true,
}) => {
  // CSS handles are a styling "contract" with the consuming theme.
  // If you ever decide to rename these handles (for example, to include a
  // `WhatsappLeadCapture` prefix), you must update this list (and any related
  // docs/themes that rely on the old names) to avoid breaking customization.
  const CSS_HANDLES = [
    "whatsappDynamicButtonLink",
    "whatsappDynamicButtonIcon",
  ] as const
  const handles = useCssHandles(CSS_HANDLES)
  const productContext = useProduct()
  const productName = productContext?.product?.productName
  const productClusters = productContext?.product?.productClusters as
    | Array<{ id: string; name?: string }>
    | undefined

  const collectionName = collectionId
    ? productClusters?.find(cluster => cluster.id === collectionId)?.name
    : undefined

  const collectionClause = collectionName ? ` da coleção ${collectionName}` : ""

  const baseMessage = `${message.trimEnd()} ${productName ?? ""}${collectionClause}`
  const rawSuffix = messageSuffix ?? ""
  const suffixTrimmed = rawSuffix.trim()
  const fullMessage = suffixTrimmed
    ? `${baseMessage}${rawSuffix.startsWith(" ") ? "" : " "}${rawSuffix}`
    : baseMessage

  const link = `https://api.whatsapp.com/send?phone=${encodeURIComponent(
    phone
  )}&text=${encodeURIComponent(
    fullMessage
  )}`

  const handleClick = React.useCallback(() => {
    pushWhatsappLeadCapturePixel({
      productContext,
      productName,
      collectionId,
      collectionName,
    })
  }, [productContext, productName, collectionId, collectionName])

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className={handles.whatsappDynamicButtonLink}
      onClick={handleClick}
    >
      {showIcon && (
        <span aria-hidden="true" className={handles.whatsappDynamicButtonIcon} style={{ display: 'inline-flex', marginRight: 8 }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 23 23"
            width="22"
            height="22"
            fill="none"
          >
            <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
              <g transform="translate(-864.000000, -48.000000)">
                <g id="whatsapp_fill" transform="translate(864.000000, 48.000000)">
                  <path d="M12,2 C6.47715,2 2,6.47715 2,12 C2,13.8896 2.52505,15.6594 3.43756,17.1683 L2.54581,20.2002 C2.32023,20.9672 3.03284,21.6798 3.79975,21.4542 L6.83171,20.5624 C8.34058,21.475 10.1104,22 12,22 C17.5228,22 22,17.5228 22,12 C22,6.47715 17.5228,2 12,2 Z M9.73821,14.2627 C11.7607,16.2852 13.692,16.5518 14.3739,16.5769 C15.4111,16.6151 16.421,15.823 16.8147,14.9042 C16.9112,14.6792 16.8871,14.4085 16.7255,14.2014 C16.1782,13.5005 15.4373,12.9983 14.7134,12.4984 C14.4006,12.282 13.9705,12.349 13.7401,12.6555 L13.1394,13.5706 C13.0727,13.6721 12.9402,13.707 12.8348,13.6467 C12.4283,13.4143 11.8356,13.018 11.4092,12.5916 C10.9833,12.1657 10.6111,11.5998 10.4022,11.2195 C10.3473,11.1195 10.3777,10.996 10.4692,10.928 L11.3927,10.2422 C11.6681,10.0038 11.7165,9.59887 11.5138,9.30228 C11.065,8.64569 10.5422,7.8112 9.7855,7.25926 C9.57883,7.1085 9.3174,7.09158 9.10155,7.18408 C8.1817,7.5783 7.38574,8.58789 7.42398,9.62695 C7.44908,10.3089 7.71572,12.2402 9.73821,14.2627 Z" fill="#fff">
                  </path>
                </g>
              </g>
            </g>
          </svg>
        </span>
      )}
      {text}
    </a>
  )
}

WhatsappLeadCapture.schema = {
  title: "Whatsapp Lead Capture",
  description:
    "Link para WhatsApp exibido para todo produtos apenas na PDP. Texto editável.",
  type: "object",
  properties: {
    text: {
      title: "Texto do botão",
      type: "string",
      default: "Comprar por WhatsApp",
    },
    phone: {
      title: "Telefone WhatsApp (com DDI e DDD)",
      description: "Apenas números. Ex.: 5511999998888",
      type: "string",
      default: "5511994877664"
    },
    message: {
      title: "Mensagem (texto comunicativo)",
      description:
        'Texto editável no Site Editor. O nome do produto e (quando aplicável) a coleção são inseridos automaticamente. Ex.: "Olá, tenho interesse no produto".',
      type: "string",
      default:
        "Olá! Vi no site e quero saber mais sobre o produto:",
    },
    collectionId: {
      title: "ID da coleção (opcional)",
      description:
        "Se informado e presente no produto, o nome da coleção será adicionado à mensagem.",
      type: "string",
    },
    messageSuffix: {
      title: "Sufixo da mensagem (opcional)",
      description:
        'Se preenchido, será anexado no final da mensagem do WhatsApp (depois de tudo, inclusive coleção). Ex.: " | soure-ecomm".',
      type: "string",
      default: "",
    },
    showIcon: {
      title: "Mostrar ícone do WhatsApp",
      type: "boolean",
      default: true
    }
  },
}

export default WhatsappLeadCapture
