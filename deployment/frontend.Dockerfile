FROM node:18-alpine AS deps

# 设置工作目录
WORKDIR /app

# 复制依赖文件
COPY package*.json ./

# 安装依赖
RUN npm ci --only=production

FROM node:18-alpine AS builder

# 设置工作目录
WORKDIR /app

# 复制依赖
COPY --from=deps /app/node_modules ./node_modules

# 复制源代码
COPY . .

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
ENV NEXTAUTH_URL=$NEXTAUTH_URL
ENV NEXTAUTH_SECRET=$NEXTAUTH_SECRET
ENV NODE_ENV=production

# 构建应用
RUN npm run build

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
    CMD node -e "require('http').get('http://localhost:3000', (res) => { process.exit(res.statusCode === 200 ? 0 : 1) })"

# 暴露端口
EXPOSE 3000

# 设置环境变量
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# 启动应用
CMD ["node", "server.js"]