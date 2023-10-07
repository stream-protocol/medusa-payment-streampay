import { useConfig } from 'nextra-theme-docs'

/* eslint sort-keys: error */
/**
 * @type {import('nextra-theme-docs').DocsThemeConfig}
 */
export default {
    banner: {
        key: 'StreamPayments',
        text: 'Web3 Payments Gateway Alpha'
    },
    chat: {
        link: 'https://discord.gg/'
    },
    docsRepositoryBase: 'https://github.com/stream-protocol/nextra/blob/core/examples/docs',
    editLink: {
        text: 'Edit this page on GitHub'
    },
    faviconGlyph: '✦',
    useNextSeoProps() {
        const { frontMatter } = useConfig()
        return {
            additionalLinkTags: [{
                    href: '/apple-icon-180x180.png',
                    rel: 'apple-touch-icon',
                    sizes: '180x180'
                },
                {
                    href: '/android-icon-192x192.png',
                    rel: 'icon',
                    sizes: '192x192',
                    type: 'image/png'
                },
                {
                    href: '/favicon-96x96.png',
                    rel: 'icon',
                    sizes: '96x96',
                    type: 'image/png'
                },
                {
                    href: '/favicon-32x32.png',
                    rel: 'icon',
                    sizes: '32x32',
                    type: 'image/png'
                },
                {
                    href: '/favicon-16x16.png',
                    rel: 'icon',
                    sizes: '16x16',
                    type: 'image/png'
                }
            ],
            additionalMetaTags: [
                { content: 'en', httpEquiv: 'Content-Language' },
                { content: 'StreamPayments', name: 'apple-mobile-web-app-title' },
                { content: '#fff', name: 'msapplication-TileColor' },
                { content: '/logo.png', name: 'msapplication-TileImage' }
            ],
            description: frontMatter.description || 'StreamPayments™: Web3 Payments Infrastructure',
            openGraph: {
                images: [
                    { url: frontMatter.image || 'https://stream-payment-gateway.vercel.app/og.png' }
                ]
            },
            titleTemplate: '%s – StreamPayments',
            twitter: {
                cardType: 'summary_large_image',
                site: 'https://stream-payment-gateway.vercel.app'
            }
        }
    }
}