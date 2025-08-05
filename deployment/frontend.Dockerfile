FROM node:18-alpine AS deps

# 设置工作目录
WORKDIR /app

# 复制依赖文件
COPY package*.json ./

# 配置npm优化网络连接
RUN npm config set registry https://registry.npmmirror.com && \
    npm config set fund false && \
    npm config set audit false && \
    npm config set fetch-retry-mintimeout 20000 && \
    npm config set fetch-retry-maxtimeout 120000 && \
    npm config set fetch-retries 5 && \
    npm config set fetch-timeout 300000

# 强制使用npm并安装依赖（网络优化版）
RUN npm ci --only=production

FROM node:18-alpine AS builder

# 设置工作目录
WORKDIR /app

# 复制依赖
COPY --from=deps /app/node_modules ./node_modules

# 复制源代码
COPY . .

# 设置npm配置
RUN npm config set fund false && \
    npm config set audit false

# 构建时环境变量
ARG NEXT_PUBLIC_FRONTEND_DOMAIN
ARG NEXT_PUBLIC_FRONTEND_PORT
ARG NEXT_PUBLIC_FRONTEND_PROTOCOL
ARG NEXT_PUBLIC_BACKEND_DOMAIN
ARG NEXT_PUBLIC_BACKEND_PORT
ARG NEXT_PUBLIC_BACKEND_PROTOCOL
ARG NEXT_PUBLIC_SEARCH_DOMAIN
ARG NEXT_PUBLIC_SEARCH_PORT
ARG NEXT_PUBLIC_SEARCH_PROTOCOL
ARG NEXT_PUBLIC_SITE_URL
ARG NEXTAUTH_URL
ARG NEXTAUTH_SECRET

# 设置环境变量
ENV NEXT_PUBLIC_FRONTEND_DOMAIN=$NEXT_PUBLIC_FRONTEND_DOMAIN
ENV NEXT_PUBLIC_FRONTEND_PORT=$NEXT_PUBLIC_FRONTEND_PORT
ENV NEXT_PUBLIC_FRONTEND_PROTOCOL=$NEXT_PUBLIC_FRONTEND_PROTOCOL
ENV NEXT_PUBLIC_BACKEND_DOMAIN=$NEXT_PUBLIC_BACKEND_DOMAIN
ENV NEXT_PUBLIC_BACKEND_PORT=$NEXT_PUBLIC_BACKEND_PORT
ENV NEXT_PUBLIC_BACKEND_PROTOCOL=$NEXT_PUBLIC_BACKEND_PROTOCOL
ENV NEXT_PUBLIC_SEARCH_DOMAIN=$NEXT_PUBLIC_SEARCH_DOMAIN
ENV NEXT_PUBLIC_SEARCH_PORT=$NEXT_PUBLIC_SEARCH_PORT
ENV NEXT_PUBLIC_SEARCH_PROTOCOL=$NEXT_PUBLIC_SEARCH_PROTOCOL
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL
ENV NEXTAUTH_URL=$NEXTAUTH_URL
ENV NEXTAUTH_SECRET=$NEXTAUTH_SECRET
ENV NODE_ENV=production

# 构建应用 - 设置环境禁用pnpm
RUN COREPACK_ENABLE_STRICT=0 NODE_OPTIONS="" npm run build

FROM node:18-alpine AS production

# 设置工作目录
WORKDIR /app

# 创建非root用户
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nextjs -u 1001 -G nodejs

# 复制构建产物
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# 切换到非root用户
USER nextjs

# 健康检查  
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD node -e "require('http').get('http://0.0.0.0:' + (process.env.PORT || '3000'), (res) => { process.exit(res.statusCode === 200 ? 0 : 1) })"

# 暴露端口
EXPOSE 3000

# 设置环境变量
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# 启动应用
CMD ["node", "server.js"]