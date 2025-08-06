#!/bin/sh

# Generate redis.conf for Redis with configurable authentication
if [ -n "$REDISPASS" ] && [ "$REDIS_AUTH_ENABLED" != "false" ]; then
    cat <<REDIS_EOF > /redis.conf
requirepass $REDISPASS
protected-mode yes
port 6379
bind 0.0.0.0
timeout 0
tcp-keepalive 300
databases 16
save ""
REDIS_EOF
    echo "Redis started with authentication: $REDISPASS"
else
    cat <<REDIS_EOF > /redis.conf
protected-mode no
port 6379
bind 0.0.0.0
timeout 0
tcp-keepalive 300
databases 16
save ""
REDIS_EOF
    echo "Redis started without authentication (development mode)"
fi

# Start Redis
exec redis-server /redis.conf
