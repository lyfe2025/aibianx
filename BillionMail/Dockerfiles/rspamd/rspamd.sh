#!/bin/bash


chmod 755 /var/lib/rspamd
chown -R _rspamd:_rspamd /var/lib/rspamd

# Generate Redis configuration for Rspamd
cat <<EOF > /etc/rspamd/local.d/redis.conf
servers = "redis:6379"; # Read servers (unless write_servers are unspecified)
write_servers = "redis:6379"; # Servers to write data
disabled_modules = ["ratelimit"]; # List of modules that should not use redis from this section
timeout = 10s;
db = "0";
EOF

# Add password configuration only if REDISPASS is not empty
if [ -n "$REDISPASS" ] && [ "$REDISPASS" != "" ]; then
    echo "password = \"$REDISPASS\";" >> /etc/rspamd/local.d/redis.conf
    echo "# Redis authentication enabled for Rspamd" >> /etc/rspamd/local.d/redis.conf
else
    echo "# Redis authentication disabled for Rspamd (no password)" >> /etc/rspamd/local.d/redis.conf
fi

exec "$@"
