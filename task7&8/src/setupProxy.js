import { createProxyMiddleware } from 'http-proxy-middleware'

export default function setup(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://34.159.179.144',
      changeOrigin: true,
    })
  )
}
