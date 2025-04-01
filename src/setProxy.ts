import { createProxyMiddleware } from 'http-proxy-middleware'
import { Application } from 'express'

const setupProxy = (app: Application): void => {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'http://localhost:8080',
            changeOrigin: true,
        }),
    )
}

export default setupProxy
