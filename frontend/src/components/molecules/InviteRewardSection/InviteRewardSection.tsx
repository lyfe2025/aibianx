'use client'

import React from 'react'
import { Icon } from '@/components/ui'

export interface InviteRewardSectionProps {
  className?: string
}

export const InviteRewardSection: React.FC<InviteRewardSectionProps> = ({
  className = ''
}) => {
  return (
    <div style={{
      background: 'linear-gradient(90deg, rgba(59, 130, 246, 0.20) 0%, rgba(168, 85, 247, 0.20) 100%)',
      backdropFilter: 'blur(12px)',
      border: '1px solid rgba(255, 255, 255, 0.10)',
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
          color: '#FFFFFF',
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
                color: '#FFFFFF',
                flexShrink: 0
              }}
            />
            <div style={{
              color: '#FFFFFF',
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
          <div style={{
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
                color: '#FFFFFF',
                flexShrink: 0
              }}
            />
            <div style={{
              color: '#FFFFFF',
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
          color: '#D1D5DB',
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

      {/* 统计数据区域 */}
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: '32px',
        // 防换行保护
        flexWrap: 'nowrap',
        overflow: 'hidden',
        gap: '32px' // 添加间距防止挤压
      }}>
        {/* 左侧：邀请码区块 */}
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'flex-start',
          borderRight: '1px solid rgba(255, 255, 255, 0.10)',
          gap: '16px',
          paddingRight: '32px',
          // 防换行保护
          flexShrink: 0,
          minWidth: '280px' // 为邀请码区块预留空间
        }}>
          {/* 邀请码区块 */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.10)',
            borderRadius: '8px',
            padding: '12px',
            display: 'flex',
            width: '56px',
            height: '56px',
            justifyContent: 'center',
            alignItems: 'center',
            flexShrink: 0
          }}>
            <Icon
              name="subscription/invite-code"
              size="xl"
              style={{
                width: '32px',
                height: '32px',
                color: '#FFFFFF'
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
            minWidth: '180px', // 为邀请码文字预留空间
            overflow: 'hidden'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'flex-start',
              minHeight: '20px'
            }}>
              <div style={{
                color: '#D1D5DB',
                lineHeight: '20px',
                alignItems: 'center',
                display: 'flex',
                // 防换行保护 - 邀请码标签
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                minHeight: '20px',
                minWidth: '120px' // 为"您的专属邀请码"预留空间
              }}>
                您的专属邀请码
              </div>
            </div>
            <div style={{
              background: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '8px',
              display: 'flex',
              justifyContent: 'space-between',
              flexDirection: 'row',
              paddingLeft: '8px',
              paddingRight: '8px',
              paddingTop: '8px',
              paddingBottom: '8px',
              // 防换行保护
              flexWrap: 'nowrap',
              overflow: 'hidden',
              gap: '8px',
              minWidth: '160px' // 为邀请码输入框预留空间
            }}>
              <div style={{
                color: '#FFFFFF',
                fontSize: '20px',
                lineHeight: '28px',
                alignItems: 'center',
                display: 'flex',
                // 防换行保护 - 邀请码
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                minHeight: '28px',
                flexShrink: 0
              }}>
                AI7859
              </div>
              <div style={{
                gap: '4px',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'stretch',
                paddingTop: '4px',
                paddingBottom: '4px',
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
                    marginTop: '3px',
                    color: '#60A5FA',
                    flexShrink: 0
                  }}
                />
                <div style={{
                  color: '#60A5FA',
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

        {/* 右侧统计数据 - 修复水平对齐 */}
        <div style={{
          display: 'flex',
          gap: '40px',
          alignItems: 'flex-start',
          flex: 1,
          // 防换行保护
          flexWrap: 'nowrap',
          overflow: 'hidden',
          justifyContent: 'flex-start' // 确保左对齐
        }}>
          {/* 已邀请人数 */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            // 防换行保护
            flexShrink: 0,
            minWidth: '90px', // 为统计项预留空间
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
                  color: '#FFFFFF'
                }}
              />
            </div>
            <div style={{
              color: '#D1D5DB',
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
              color: '#FFFFFF',
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
            minWidth: '90px', // 为统计项预留空间
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
                  color: '#FFFFFF'
                }}
              />
            </div>
            <div style={{
              color: '#D1D5DB',
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
              color: '#FFFFFF',
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
            minWidth: '110px', // 为金额数字预留更多空间
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
                  color: '#FFFFFF'
                }}
              />
            </div>
            <div style={{
              color: '#D1D5DB',
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
              color: '#FFFFFF',
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
              color: '#FFFFFF',
              flexShrink: 0
            }}
          />
          <div style={{
            color: '#FFFFFF',
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
              color: '#FFFFFF',
              flexShrink: 0
            }}
          />
          <div style={{
            color: '#FFFFFF',
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