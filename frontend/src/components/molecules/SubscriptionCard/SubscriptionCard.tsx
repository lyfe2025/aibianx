'use client'

import React from 'react'
import { Icon, GradientButton } from '@/components/ui'

export interface SubscriptionCardProps {
  className?: string
}

export const SubscriptionCard: React.FC<SubscriptionCardProps> = ({
  className = ''
}) => {
  return (
    <div style={{
      background: 'rgba(26, 26, 26, 0.30)',
      backdropFilter: 'blur(12px)',
      border: '1px solid rgba(42, 42, 42, 0.70)',
      borderRadius: '12px',
      padding: '21px',
      // 防换行保护
      overflow: 'hidden'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        gap: '8px', // 标题区域与文字区域的间距
        // 防换行保护
        flexWrap: 'nowrap',
        overflow: 'hidden'
      }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '8px', // 标题与文字信息的间距
          flex: 1,
          minWidth: '250px', // 为会员信息文字预留充足宽度
          // 防换行保护
          overflow: 'hidden'
        }}>
          {/* 会员标题区域 */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            // 防换行保护
            flexWrap: 'nowrap',
            overflow: 'hidden'
          }}>
            <span style={{
              color: '#FFFFFF',
              fontSize: '18px',
              fontWeight: '600',
              lineHeight: '28px',
              // 防换行保护
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}>高级会员</span>
            <div style={{
              background: 'linear-gradient(90deg, #FACC15 0%, #CA8A04 100%)',
              borderRadius: '9999px',
              padding: '2px 8px',
              flexShrink: 0 // 防止徽章被压缩
            }}>
              <span style={{
                color: '#FFFFFF',
                fontSize: '12px',
                lineHeight: '16px',
                // 防换行保护
                whiteSpace: 'nowrap'
              }}>当前方案</span>
            </div>
          </div>

          {/* 订阅信息区域 - 与个人中心完全一致 */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '2px', // 与个人中心保持一致的小间距
            // 防换行保护
            overflow: 'hidden'
          }}>
            <p style={{
              color: '#D1D5DB',
              fontSize: '14px',
              lineHeight: '18px', // 与个人中心保持一致
              margin: 0,
              // 防换行保护 - 到期时间
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}>到期时间: 2024年12月31日 (剩余245天)</p>
            <p style={{
              color: '#D1D5DB',
              fontSize: '14px',
              lineHeight: '18px', // 与个人中心保持一致
              margin: 0,
              // 防换行保护 - 订阅内容描述
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}>订阅内容: 全站资源、专属社群、一对一咨询 (每月1次)</p>
          </div>
        </div>

        <div style={{ flexShrink: 0, marginTop: '8px' }}> {/* 防止按钮被压缩，顶部对齐调整 */}
          <GradientButton size="md" variant="primary">
            <span style={{
              // 防换行保护
              whiteSpace: 'nowrap'
            }}>立即续费</span>
            <Icon name="renew-icon" size="xs" style={{ marginLeft: '8px', flexShrink: 0 }} />
          </GradientButton>
        </div>
      </div>

      <div style={{
        marginTop: '20px',
        marginBottom: '0px', // 移除底部间距，由下面的元素控制
        // 防换行保护
        overflow: 'hidden'
      }}></div>

      <div style={{
        borderTop: '1px solid rgba(255, 255, 255, 0.10)',
        paddingTop: '25px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        // 防换行保护
        flexWrap: 'nowrap',
        overflow: 'hidden',
        gap: '16px' // 添加间距防止挤压
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          flex: 1,
          minWidth: '200px', // 为权益文字预留充足宽度
          // 防换行保护
          overflow: 'hidden'
        }}>
          <div style={{
            background: 'rgba(255, 255, 255, 0.10)',
            borderRadius: '50%',
            padding: '10px',
            flexShrink: 0 // 防止图标被压缩
          }}>
            <Icon name="privilege-icon" size="sm" style={{ color: '#EAB308' }} />
          </div>
          <div style={{
            flex: 1,
            // 防换行保护
            overflow: 'hidden'
          }}>
            <div style={{
              color: '#FFFFFF',
              fontSize: '16px',
              fontWeight: '500',
              lineHeight: '24px',
              marginBottom: '2px',
              // 防换行保护 - 权益标题
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}>专属会员权益</div>
            <div style={{
              color: '#9CA3AF',
              fontSize: '12px',
              lineHeight: '16px',
              // 防换行保护 - 权益描述
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}>查看您的专属会员权益和使用方式</div>
          </div>
        </div>
        <Icon name="privilege-arrow" size="sm" style={{ color: '#60A5FA', flexShrink: 0 }} />
      </div>
    </div>
  )
} 