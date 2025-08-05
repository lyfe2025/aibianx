#!/bin/bash

# 通用颜色支持函数
# 检测终端是否支持颜色，如果支持则设置颜色变量，否则设置为空

setup_colors() {
    if [ -t 1 ] && [ -n "$TERM" ] && [ "$TERM" != "dumb" ]; then
        # 终端支持颜色
        export GREEN='\033[0;32m'
        export BLUE='\033[0;34m'
        export YELLOW='\033[1;33m'
        export RED='\033[0;31m'
        export CYAN='\033[0;36m'
        export PURPLE='\033[0;35m'
        export WHITE='\033[1;37m'
        export BOLD='\033[1m'
        export NC='\033[0m'
    else
        # 终端不支持颜色，设置为空
        export GREEN=''
        export BLUE=''
        export YELLOW=''
        export RED=''
        export CYAN=''
        export PURPLE=''
        export WHITE=''
        export BOLD=''
        export NC=''
    fi
}

# 自动设置颜色
setup_colors