#!/bin/sh

# Generate redis.conf for Redis
cat <<EOF > /redis.conf
# Redis Configuration for BillionMail
# Generated dynamically based on REDISPASS environment variable

# Basic configuration
bind 0.0.0.0
port 6379
timeout 0
tcp-keepalive 300
daemonize no
supervised no
loglevel notice
databases 16
save 900 1
save 300 10
save 60 10000
stop-writes-on-bgsave-error yes
rdbcompression yes
rdbchecksum yes
dbfilename dump.rdb
dir /data

# Password configuration
EOF

# Add password configuration only if REDISPASS is not empty
if [ -n "$REDISPASS" ] && [ "$REDISPASS" != "" ]; then
    echo "requirepass $REDISPASS" >> /redis.conf
    echo "# Redis authentication enabled with password" >> /redis.conf
else
    echo "# Redis authentication disabled (no password)" >> /redis.conf
fi

# Add remaining configuration
cat <<EOF >> /redis.conf

# Memory and performance
maxmemory-policy allkeys-lru
appendonly yes
appendfilename "appendonly.aof"
appendfsync everysec
no-appendfsync-on-rewrite no
auto-aof-rewrite-percentage 100
auto-aof-rewrite-min-size 64mb

# Network
tcp-backlog 511
EOF

echo "Redis configuration generated:"
echo "- Password enabled: $([ -n "$REDISPASS" ] && echo "YES" || echo "NO")"
echo "- Config file: /redis.conf"

# Start Redis
exec redis-server /redis.conf
