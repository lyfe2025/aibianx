FROM node:18-alpine

# 设置工作目录
WORKDIR /app

# 安装必要的系统依赖
RUN apk add --no-cache \
    postgresql-client \
    && rm -rf /var/cache/apk/*

# 复制package文件
COPY package*.json ./

# 配置npm优化网络连接
RUN npm config set registry https://registry.npmmirror.com && \
    npm config set fund false && \
    npm config set audit false && \
    npm config set fetch-retry-mintimeout 20000 && \
    npm config set fetch-retry-maxtimeout 120000 && \
    npm config set fetch-retries 5 && \
    npm config set fetch-timeout 300000

# 安装Node.js依赖（网络优化版）
RUN npm ci --only=production && \
    npm cache clean --force

# 复制源代码
COPY . .

# 构建应用
RUN npm run build

# 创建非root用户
RUN addgroup -g 1001 -S nodejs && \
    adduser -S strapi -u 1001 -G nodejs

# 设置文件权限
RUN chown -R strapi:nodejs /app && \
    chmod -R 755 /app

# 切换到非root用户
USER strapi

# 健康检查
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD node -e "require('http').get('http://0.0.0.0:' + (process.env.PORT || '1337') + '/admin', (res) => { process.exit(res.statusCode === 200 ? 0 : 1) })"

# 暴露端口
EXPOSE 1337

# 启动应用
CMD ["npm", "start"]