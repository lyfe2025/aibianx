'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { Icon } from '@/components/ui'

export interface InviteRewardSectionProps {
  className?: string
}

export const InviteRewardSection: React.FC<InviteRewardSectionProps> = ({
  className = ''
}) => {
  const router = useRouter()

  const handleWithdrawRecord = () => {
    router.push('/profile/subscription/withdraw')
  }
  return (
    <div style={{
      background: 'var(--color-info-bg)',
      backdropFilter: 'blur(12px)',
      border: '1px solid var(--color-border-primary)',
      borderRadius: '12px',
      width: '100%',
      fontFamily: 'var(--font-family-primary)',
      fontSize: '14px',
      fontWeight: '400',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'stretch',
      paddingLeft: '25px',
      paddingRight: '25px',
      paddingTop: '25px',
      paddingBottom: '25px',
      // 防换行保护
      overflow: 'hidden'
    }}>
      {/* 顶部标题和操作按钮 */}
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        // 防换行保护
        flexWrap: 'nowrap',
        overflow: 'hidden',
        gap: '16px', // 添加间距防止挤压
        marginBottom: '24px'
      }}>
        <div style={{
          color: 'var(--color-text-primary)',
          fontSize: '20px',
          lineHeight: '28px',
          alignItems: 'center',
          display: 'flex',
          // 防换行保护 - 主标题
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          minWidth: '180px', // 为"邀请好友 双重奖励"预留空间
          minHeight: '28px',
          flexShrink: 0
        }}>
          邀请好友 双重奖励
        </div>
        <div style={{
          gap: '12px',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'stretch',
          // 防换行保护 - 按钮组不能收缩
          flexShrink: 0,
          flexWrap: 'nowrap'
        }}>
          <div style={{
            background: 'var(--color-accent-primary)',
            borderRadius: '8px',
            display: 'flex',
            gap: '8px',
            alignItems: 'stretch',
            flexDirection: 'row',
            paddingLeft: '16px',
            paddingRight: '16px',
            paddingTop: '8px',
            paddingBottom: '8px',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            // 防换行保护 - 邀请攻略按钮
            minWidth: '120px', // 为"邀请攻略"预留空间
            whiteSpace: 'nowrap',
            flexShrink: 0
          }}>
            <Icon
              name="subscription/invite-guide"
              size="xs"
              style={{
                width: '16px',
                height: '16px',
                marginTop: '2px',
                marginBottom: '2px',
                color: 'var(--color-text-primary)',
                flexShrink: 0
              }}
            />
            <div style={{
              color: 'var(--color-text-primary)',
              lineHeight: '20px',
              textAlign: 'center',
              justifyContent: 'center',
              alignItems: 'center',
              display: 'flex',
              // 防换行保护
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              minHeight: '20px'
            }}>
              邀请攻略
            </div>
          </div>
          <div 
            onClick={handleWithdrawRecord}
            style={{
            background: 'rgba(255, 255, 255, 0.10)',
            borderRadius: '8px',
            display: 'flex',
            gap: '8px',
            alignItems: 'stretch',
            flexDirection: 'row',
            paddingLeft: '16px',
            paddingRight: '16px',
            paddingTop: '8px',
            paddingBottom: '8px',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            // 防换行保护 - 提现记录按钮
            minWidth: '120px', // 为"提现记录"预留空间
            whiteSpace: 'nowrap',
            flexShrink: 0
          }}>
            <Icon
              name="subscription/withdraw-record"
              size="xs"
              style={{
                width: '16px',
                height: '16px',
                marginTop: '2px',
                marginBottom: '2px',
                color: 'var(--color-text-primary)',
                flexShrink: 0
              }}
            />
            <div style={{
              color: 'var(--color-text-primary)',
              lineHeight: '20px',
              textAlign: 'center',
              justifyContent: 'center',
              alignItems: 'center',
              display: 'flex',
              // 防换行保护
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              minHeight: '20px'
            }}>
              提现记录
            </div>
          </div>
        </div>
      </div>

      {/* 描述文字 */}
      <div style={{
        display: 'flex',
        alignItems: 'flex-start',
        minHeight: '24px',
        marginBottom: '32px',
        // 防换行保护
        overflow: 'hidden'
      }}>
        <div style={{
          color: 'var(--color-text-secondary)',
          fontSize: '16px',
          lineHeight: '24px',
          alignItems: 'center',
          display: 'flex',
          // 防换行保护 - 描述文字
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          minHeight: '24px',
          flex: 1,
          minWidth: '400px' // 为描述文字预留充足空间
        }}>
          邀请好友注册并开通会员，你和好友都将获得额外会员时长+返现奖励
        </div>
      </div>

      {/* 统计数据区域 - 居中分割线，统计项在右侧 */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        marginBottom: '32px',
        position: 'relative',
        // 防换行保护
        flexWrap: 'nowrap',
        overflow: 'hidden',
        minHeight: '80px',
        width: '100%'
      }}>
        {/* 左侧：邀请码区块 - 占据左半部分 */}
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: '16px',
          width: '50%', // 精确占据左半部分
          paddingRight: '20px', // 与分割线的距离
          // 防换行保护
          overflow: 'hidden',
          justifyContent: 'flex-end' // 内容靠右对齐，更接近分割线
        }}>
          {/* 邀请码区块 */}
          <div style={{
            background: 'var(--color-accent-primary)',
            borderRadius: '8px',
            padding: '10px', // 减小内边距
            display: 'flex',
            width: '48px', // 减小图标容器尺寸
            height: '48px',
            justifyContent: 'center',
            alignItems: 'center',
            flexShrink: 0
          }}>
            <Icon
              name="subscription/invite-code"
              size="lg"
              style={{
                width: '24px', // 减小图标尺寸
                height: '24px',
                color: 'var(--color-text-primary)'
              }}
            />
          </div>
          <div style={{
            gap: '8px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'stretch',
            flex: 1,
            // 防换行保护
            minWidth: '160px', // 减小最小宽度
            overflow: 'hidden'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'flex-start',
              minHeight: '20px'
            }}>
              <div style={{
                color: 'var(--color-text-secondary)',
                fontSize: '14px', // 添加字体大小设置
                lineHeight: '18px', // 减小行高
                alignItems: 'center',
                display: 'flex',
                // 防换行保护 - 邀请码标签
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                minHeight: '18px', // 减小最小高度
                minWidth: '100px' // 减小最小宽度
              }}>
                您的专属邀请码
              </div>
            </div>
            <div style={{
              background: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '6px', // 减小圆角
              display: 'flex',
              justifyContent: 'space-between',
              flexDirection: 'row',
              paddingLeft: '10px', // 减小内边距
              paddingRight: '10px',
              paddingTop: '6px',
              paddingBottom: '6px',
              // 防换行保护
              flexWrap: 'nowrap',
              overflow: 'hidden',
              gap: '6px', // 减小间距
              minWidth: '140px' // 减小最小宽度
            }}>
              <div style={{
                color: 'var(--color-text-primary)',
                fontSize: '18px', // 减小字体大小
                lineHeight: '24px', // 减小行高
                alignItems: 'center',
                display: 'flex',
                // 防换行保护 - 邀请码
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                minHeight: '24px', // 减小最小高度
                flexShrink: 0
              }}>
                AI7859
              </div>
              <div style={{
                gap: '4px',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center', // 改为居中对齐
                cursor: 'pointer',
                // 防换行保护 - 复制按钮
                flexShrink: 0,
                whiteSpace: 'nowrap'
              }}>
                <Icon
                  name="subscription/copy-icon"
                  size="xs"
                  style={{
                    width: '14px',
                    height: '14px',
                    color: 'var(--color-primary-blue)',
                    flexShrink: 0
                  }}
                />
                <div style={{
                  color: 'var(--color-primary-blue)',
                  lineHeight: '20px',
                  textAlign: 'center',
                  justifyContent: 'center',
                  alignItems: 'center',
                  display: 'flex',
                  // 防换行保护
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  minHeight: '20px'
                }}>
                  复制
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 居中分割线 - 绝对定位在容器中心 */}
        <div style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          width: '1px',
          height: '60px',
          background: 'rgba(255, 255, 255, 0.10)',
          zIndex: 1
        }}></div>

        {/* 右侧：统计数据区域 - 占据右半部分 */}
        <div style={{
          display: 'flex',
          gap: '16px', // 优化间距，更紧凑
          alignItems: 'center',
          width: '50%', // 精确占据右半部分
          paddingLeft: '20px', // 与分割线的距离
          // 防换行保护
          flexWrap: 'nowrap',
          overflow: 'hidden',
          justifyContent: 'space-around' // 平均分布，但保持内容间距
        }}>
          {/* 已邀请人数 */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            // 防换行保护
            flexShrink: 0,
            minWidth: '70px', // 进一步优化最小宽度
            flex: 1, // 平均分配空间
            textAlign: 'center'
          }}>
            <div style={{
              background: 'rgba(255, 255, 255, 0.10)',
              borderRadius: '8px',
              padding: '12px',
              display: 'flex',
              width: '48px',
              height: '48px',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: '8px',
              flexShrink: 0
            }}>
              <Icon
                name="subscription/invited-users"
                size="lg"
                style={{
                  width: '24px',
                  height: '24px',
                  color: 'var(--color-text-primary)'
                }}
              />
            </div>
            <div style={{
              color: 'var(--color-text-secondary)',
              lineHeight: '20px',
              alignItems: 'center',
              display: 'flex',
              marginBottom: '4px',
              // 防换行保护 - 统计标签
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              minHeight: '20px',
              justifyContent: 'center'
            }}>
              已邀请人数
            </div>
            <div style={{
              color: 'var(--color-text-primary)',
              fontSize: '20px',
              lineHeight: '28px',
              alignItems: 'center',
              display: 'flex',
              // 防换行保护 - 统计数值
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              minHeight: '28px',
              justifyContent: 'center'
            }}>
              18
            </div>
          </div>

          {/* 待激活人数 */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            // 防换行保护
            flexShrink: 0,
            minWidth: '70px', // 进一步优化最小宽度
            flex: 1, // 平均分配空间
            textAlign: 'center'
          }}>
            <div style={{
              background: 'rgba(255, 255, 255, 0.10)',
              borderRadius: '8px',
              padding: '12px',
              display: 'flex',
              width: '48px',
              height: '48px',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: '8px',
              flexShrink: 0
            }}>
              <Icon
                name="subscription/pending-users"
                size="lg"
                style={{
                  width: '24px',
                  height: '24px',
                  color: 'var(--color-text-primary)'
                }}
              />
            </div>
            <div style={{
              color: 'var(--color-text-secondary)',
              lineHeight: '20px',
              alignItems: 'center',
              display: 'flex',
              marginBottom: '4px',
              // 防换行保护 - 标签文字
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              minHeight: '20px',
              justifyContent: 'center'
            }}>
              待激活人数
            </div>
            <div style={{
              color: 'var(--color-text-primary)',
              fontSize: '20px',
              lineHeight: '28px',
              alignItems: 'center',
              display: 'flex',
              // 防换行保护 - 数值
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              minHeight: '28px',
              justifyContent: 'center'
            }}>
              5
            </div>
          </div>

          {/* 累计返佣金额 */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            // 防换行保护
            flexShrink: 0,
            minWidth: '85px', // 为金额数字预留稍大空间
            flex: 1, // 平均分配空间
            textAlign: 'center'
          }}>
            <div style={{
              background: 'rgba(255, 255, 255, 0.10)',
              borderRadius: '8px',
              padding: '12px',
              display: 'flex',
              width: '48px',
              height: '48px',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: '8px',
              flexShrink: 0
            }}>
              <Icon
                name="subscription/commission-amount"
                size="lg"
                style={{
                  width: '24px',
                  height: '24px',
                  color: 'var(--color-text-primary)'
                }}
              />
            </div>
            <div style={{
              color: 'var(--color-text-secondary)',
              lineHeight: '20px',
              alignItems: 'center',
              display: 'flex',
              marginBottom: '4px',
              // 防换行保护 - 标签文字
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              minHeight: '20px',
              justifyContent: 'center'
            }}>
              累计返佣金额
            </div>
            <div style={{
              color: 'var(--color-text-primary)',
              fontSize: '20px',
              lineHeight: '28px',
              alignItems: 'center',
              display: 'flex',
              // 防换行保护 - 数值
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              minHeight: '28px',
              justifyContent: 'center'
            }}>
              ¥1,235
            </div>
                      </div>
        </div>
      </div>

      {/* 底部操作按钮 */}
      <div style={{
        gap: '16px',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'stretch',
        justifyContent: 'center',
        // 防换行保护
        flexWrap: 'nowrap',
        overflow: 'hidden'
      }}>
        <div style={{
          background: 'rgba(255, 255, 255, 0.10)',
          borderRadius: '8px',
          display: 'flex',
          gap: '8px',
          alignItems: 'stretch',
          flexDirection: 'row',
          paddingLeft: '24px',
          paddingRight: '24px',
          paddingTop: '12px',
          paddingBottom: '12px',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          // 防换行保护 - 复制链接按钮
          flexShrink: 0,
          minWidth: '160px', // 为"复制邀请链接"预留空间
          whiteSpace: 'nowrap'
        }}>
          <Icon
            name="subscription/copy-invite-link"
            size="sm"
            style={{
              width: '20px',
              height: '20px',
              marginTop: '2px',
              marginBottom: '2px',
              color: 'var(--color-text-primary)',
              flexShrink: 0
            }}
          />
          <div style={{
            color: 'var(--color-text-primary)',
            fontSize: '16px',
            lineHeight: '24px',
            textAlign: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            display: 'flex',
            // 防换行保护
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            minHeight: '24px'
          }}>
            复制邀请链接
          </div>
        </div>
        <div style={{
          background: 'linear-gradient(90deg, #3B82F6 0%, #A855F7 100%)',
          borderRadius: '8px',
          display: 'flex',
          gap: '8px',
          alignItems: 'stretch',
          flexDirection: 'row',
          paddingLeft: '24px',
          paddingRight: '24px',
          paddingTop: '12px',
          paddingBottom: '12px',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          // 防换行保护 - 生成海报按钮
          flexShrink: 0,
          minWidth: '160px', // 为"生成邀请海报"预留空间
          whiteSpace: 'nowrap'
        }}>
          <Icon
            name="subscription/generate-poster"
            size="sm"
            style={{
              width: '20px',
              height: '20px',
              marginTop: '2px',
              marginBottom: '2px',
              color: 'var(--color-text-primary)',
              flexShrink: 0
            }}
          />
          <div style={{
            color: 'var(--color-text-primary)',
            fontSize: '16px',
            lineHeight: '24px',
            textAlign: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            display: 'flex',
            // 防换行保护
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            minHeight: '24px'
          }}>
            生成邀请海报
          </div>
        </div>
      </div>
    </div>
  )
} 