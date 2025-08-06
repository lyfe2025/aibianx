#!/bin/sh

# Generate redis.conf for Redis
if [ -n "$REDISPASS" ]; then
    cat <<EOF > /redis.conf
requirepass $REDISPASS
EOF
else
    # 开发模式：无密码Redis配置
    cat <<EOF > /redis.conf
# Redis configuration for development
# No password required
protected-mode no
EOF
fi

# Start Redis
exec redis-server /redis.conf
