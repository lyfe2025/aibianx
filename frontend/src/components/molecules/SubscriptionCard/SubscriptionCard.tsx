'use client'

import React from 'react'
import { Icon } from '@/components/ui'

export interface SubscriptionCardProps {
  className?: string
}

export const SubscriptionCard: React.FC<SubscriptionCardProps> = ({
  className = ''
}) => {
  return (
    <div style={{
      background: 'rgba(0, 0, 0, 0.30)',
      backdropFilter: 'blur(12px)',
      border: '1px solid rgba(42, 42, 42, 0.70)',
      borderRadius: '12px',
      padding: '25px',
      display: 'flex',
      width: '100%',
      gap: '0px', // 移除主容器间距，改为单独控制
      flexDirection: 'column',
      alignItems: 'stretch',
      fontFamily: 'var(--font-family-primary)',
      fontSize: '16px',
      fontWeight: '400',
      // 防换行保护
      overflow: 'hidden'
    }}>
      {/* 顶部信息区域 */}
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingRight: '0.01px',
        // 防换行保护
        flexWrap: 'nowrap',
        overflow: 'hidden',
        gap: '16px' // 添加间距防止挤压
      }}>
        <div style={{
          gap: '8px', // 恢复合理间距，平衡视觉层次
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'stretch',
          flex: 1,
          // 防换行保护
          minWidth: '300px', // 为左侧信息预留充足宽度
          overflow: 'hidden'
        }}>
          <div style={{
            gap: '12px',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'stretch',
            // 防换行保护
            flexWrap: 'nowrap',
            overflow: 'hidden'
          }}>
            <div style={{
              color: '#FFFFFF',
              fontSize: '20px',
              lineHeight: '28px',
              alignItems: 'center',
              display: 'flex',
              // 防换行保护 - 会员等级标题
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              minWidth: '100px', // 为"高级会员"预留空间
              minHeight: '28px',
              flexShrink: 0
            }}>
              高级会员
            </div>
            <div style={{
              background: 'linear-gradient(90deg, #EAB308 0%, #CA8A04 100%)',
              borderRadius: '9999px',
              display: 'flex',
              alignItems: 'center',
              marginTop: '4px',
              marginBottom: '4px',
              justifyContent: 'center',
              paddingLeft: '8px',
              paddingRight: '8px',
              paddingTop: '2px',
              paddingBottom: '2px',
              // 防换行保护 - 徽章不能收缩
              flexShrink: 0,
              minWidth: '80px' // 为"当前方案"预留空间
            }}>
              <div style={{
                color: '#FFFFFF',
                fontSize: '12px',
                lineHeight: '16px',
                alignItems: 'center',
                display: 'flex',
                // 防换行保护
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                minHeight: '16px'
              }}>
                当前方案
              </div>
            </div>
          </div>
          {/* 订阅信息区域 - 将到期时间和订阅内容紧密排列 */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '2px', // 设置小间距，保持整体性
            // 防换行保护
            overflow: 'hidden'
          }}>
            <div style={{
              color: '#D1D5DB',
              fontSize: '14px',
              lineHeight: '18px', // 恢复正常行高，与第二行保持一致
              alignItems: 'center',
              display: 'flex',
              // 防换行保护 - 到期时间
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              minWidth: '300px', // 为到期时间文字预留空间
              minHeight: '18px' // 匹配行高
            }}>
              到期时间：2024年12月31日（剩余245天）
            </div>
            <div style={{
              color: '#D1D5DB',
              fontSize: '14px',
              lineHeight: '18px', // 恢复正常行高
              alignItems: 'center',
              display: 'flex',
              // 移除marginTop，使用gap统一控制间距
              // 防换行保护 - 订阅内容描述
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              minHeight: '18px', // 匹配行高
              minWidth: '400px' // 为描述文字预留充足空间
            }}>
              订阅内容：全站资源、专属社群、一对一咨询（每月1次）
            </div>
          </div>
        </div>

        {/* 操作按钮区域 */}
        <div style={{
          gap: '12px',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'stretch',
          paddingBottom: '10px',
          // 防换行保护 - 按钮区域不能收缩
          flexShrink: 0,
          flexWrap: 'nowrap'
        }}>
          {/* 立即续费按钮 */}
          <div style={{
            background: 'linear-gradient(90deg, #3B82F6 0%, #A855F7 100%)',
            borderRadius: '8px',
            display: 'flex',
            gap: '8px',
            alignItems: 'stretch',
            flexDirection: 'row',
            paddingLeft: '20px',
            paddingRight: '20px',
            paddingTop: '11px',
            paddingBottom: '11px',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            // 防换行保护 - 续费按钮
            flexShrink: 0,
            minWidth: '130px', // 为"立即续费"预留空间
            whiteSpace: 'nowrap'
          }}>
            <div style={{
              color: '#FFFFFF',
              lineHeight: '24px',
              textAlign: 'center',
              justifyContent: 'center',
              alignItems: 'center',
              display: 'flex',
              // 防换行保护
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              minHeight: '24px',
              flexShrink: 0
            }}>
              立即续费
            </div>
            <Icon
              name="subscription/renew-arrow"
              size="xs"
              style={{
                width: '16px',
                height: '16px',
                marginTop: '4px',
                marginBottom: '4px',
                color: '#FFFFFF',
                flexShrink: 0
              }}
            />
          </div>

          {/* 管理支付方式按钮 */}
          <div style={{
            border: '1px solid rgba(255, 255, 255, 0.20)',
            borderRadius: '8px',
            display: 'flex',
            gap: '8px',
            alignItems: 'stretch',
            flexDirection: 'row',
            paddingLeft: '21px',
            paddingRight: '21px',
            paddingTop: '11px',
            paddingBottom: '11px',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            // 防换行保护 - 支付管理按钮
            flexShrink: 0,
            minWidth: '140px', // 为"管理支付方式"预留空间
            whiteSpace: 'nowrap'
          }}>
            <Icon
              name="subscription/payment-manage"
              size="xs"
              style={{
                width: '16px',
                height: '16px',
                marginTop: '4px',
                marginBottom: '4px',
                color: '#FFFFFF',
                flexShrink: 0
              }}
            />
            <div style={{
              color: '#FFFFFF',
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
              管理支付方式
            </div>
          </div>
        </div>
      </div>

      {/* 专属会员权益 */}
      <div style={{
        borderTop: '1px solid rgba(255, 255, 255, 0.10)',
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: '24px', // 增加顶部间距，与权益区域分开
        flexDirection: 'row',
        paddingTop: '25px',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        // 防换行保护
        flexWrap: 'nowrap',
        overflow: 'hidden',
        gap: '16px' // 添加间距防止挤压
      }}>
        <div style={{
          gap: '16px',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'stretch',
          flex: 1,
          // 防换行保护
          minWidth: '250px', // 为权益信息预留空间
          overflow: 'hidden'
        }}>
          <div style={{
            background: 'rgba(234, 179, 8, 0.10)',
            borderRadius: '9999px',
            display: 'flex',
            width: '40px',
            justifyContent: 'center',
            alignItems: 'center',
            paddingLeft: '12px',
            paddingRight: '12px',
            paddingTop: '13.6px',
            paddingBottom: '13.6px',
            flexShrink: 0 // 图标不能收缩
          }}>
            <Icon
              name="subscription/member-privilege"
              size="xs"
              style={{
                width: '16px',
                height: '12.8px',
                color: '#EAB308'
              }}
            />
          </div>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'stretch',
            flex: 1,
            // 防换行保护
            minWidth: '180px', // 为权益文字预留空间
            overflow: 'hidden'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'flex-start',
              minHeight: '24px'
            }}>
              <div style={{
                color: '#FFFFFF',
                lineHeight: '24px',
                alignItems: 'center',
                display: 'flex',
                // 防换行保护 - 权益标题
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                minHeight: '24px',
                minWidth: '120px' // 为"专属会员权益"预留空间
              }}>
                专属会员权益
              </div>
            </div>
            <div style={{
              color: '#9CA3AF',
              fontSize: '12px',
              lineHeight: '16px',
              alignItems: 'center',
              display: 'flex',
              // 防换行保护 - 权益描述
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              minHeight: '16px'
            }}>
              查看您的专属会员权益和使用方式
            </div>
          </div>
        </div>
        <Icon
          name="subscription/arrow-right"
          size="xs"
          style={{
            width: '16px',
            height: '16px',
            marginTop: '12px',
            color: '#60A5FA',
            flexShrink: 0 // 箭头图标不能收缩
          }}
        />
      </div>
    </div>
  )
} 