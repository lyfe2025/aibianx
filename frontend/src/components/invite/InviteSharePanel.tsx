'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { CopyIcon, ShareIcon, GiftIcon, UsersIcon, TrendingUpIcon } from '@/components/ui/Icons'

interface InviteStats {
  totalInvites: number
  successfulInvites: number
  paidInvites: number
  totalCommission: number
  pendingCommission: number
  conversionRate: number
}

interface InviteRecord {
  id: string
  inviteeEmail: string
  status: 'sent' | 'registered' | 'purchased'
  registeredAt?: string
  purchasedAt?: string
  commissionAmount: number
}

export default function InviteSharePanel() {
  const { data: session } = useSession()
  const [inviteCode, setInviteCode] = useState('')
  const [inviteLink, setInviteLink] = useState('')
  const [stats, setStats] = useState<InviteStats>({
    totalInvites: 0,
    successfulInvites: 0,
    paidInvites: 0,
    totalCommission: 0,
    pendingCommission: 0,
    conversionRate: 0
  })
  const [inviteRecords, setInviteRecords] = useState<InviteRecord[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (session?.user) {
      loadInviteData()
    }
  }, [session])

  const loadInviteData = async () => {
    try {
      // 获取用户邀请码
      const userResponse = await fetch('/api/user/me')
      if (userResponse.ok) {
        const userData = await userResponse.json()
        setInviteCode(userData.inviteCode)
        setInviteLink(`${window.location.origin}/register?invite=${userData.inviteCode}`)
      }

      // 获取邀请统计
      const statsResponse = await fetch('/api/invitations/stats')
      if (statsResponse.ok) {
        const statsData = await statsResponse.json()
        setStats(statsData)
      }

      // 获取邀请记录
      const recordsResponse = await fetch('/api/invitations/records')
      if (recordsResponse.ok) {
        const recordsData = await recordsResponse.json()
        setInviteRecords(recordsData)
      }
    } catch (error) {
      console.error('加载邀请数据失败:', error)
    }
  }

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      alert('已复制到剪贴板')
    } catch (error) {
      console.error('复制失败:', error)
      alert('复制失败，请手动复制')
    }
  }

  const shareInvite = async (platform: 'wechat' | 'qq' | 'weibo') => {
    const shareText = `我在AI变现之路发现了很多有价值的内容，邀请你一起加入！使用我的邀请码 ${inviteCode} 注册可获得专属优惠。`
    const shareUrl = inviteLink

    const shareLinks = {
      wechat: `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(shareUrl)}`,
      qq: `https://connect.qq.com/widget/shareqq/index.html?url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(shareText)}`,
      weibo: `https://service.weibo.com/share/share.php?url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(shareText)}`
    }

    if (platform === 'wechat') {
      // 微信分享显示二维码
      window.open(shareLinks.wechat, '_blank')
    } else {
      window.open(shareLinks[platform], '_blank')
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'sent': return '已发送'
      case 'registered': return '已注册'
      case 'purchased': return '已付费'
      default: return '未知'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'sent': return 'bg-gray-100 text-gray-600'
      case 'registered': return 'bg-blue-100 text-blue-600'
      case 'purchased': return 'bg-green-100 text-green-600'
      default: return 'bg-gray-100 text-gray-600'
    }
  }

  if (!session?.user) {
    return (
      <Card className="p-8 text-center">
        <h3 className="text-lg font-semibold mb-2">请先登录</h3>
        <p className="text-gray-600">登录后即可使用邀请功能，获得丰厚返佣奖励</p>
      </Card>
    )
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* 邀请统计卡片 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-4 text-center">
          <UsersIcon className="w-8 h-8 mx-auto mb-2 text-blue-500" />
          <div className="text-2xl font-bold">{stats.totalInvites}</div>
          <div className="text-sm text-gray-600">邀请人数</div>
        </Card>

        <Card className="p-4 text-center">
          <TrendingUpIcon className="w-8 h-8 mx-auto mb-2 text-green-500" />
          <div className="text-2xl font-bold">{stats.paidInvites}</div>
          <div className="text-sm text-gray-600">付费转化</div>
        </Card>

        <Card className="p-4 text-center">
          <GiftIcon className="w-8 h-8 mx-auto mb-2 text-yellow-500" />
          <div className="text-2xl font-bold">¥{(stats.totalCommission / 100).toFixed(2)}</div>
          <div className="text-sm text-gray-600">累计返佣</div>
        </Card>

        <Card className="p-4 text-center">
          <TrendingUpIcon className="w-8 h-8 mx-auto mb-2 text-purple-500" />
          <div className="text-2xl font-bold">{stats.conversionRate}%</div>
          <div className="text-sm text-gray-600">转化率</div>
        </Card>
      </div>

      {/* 邀请码分享 */}
      <Card className="p-6">
        <h3 className="text-xl font-semibold mb-4">我的邀请码</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">邀请码</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={inviteCode}
                readOnly
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
              />
              <Button
                variant="outline"
                onClick={() => copyToClipboard(inviteCode)}
              >
                <CopyIcon className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">邀请链接</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={inviteLink}
                readOnly
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-sm"
              />
              <Button
                variant="outline"
                onClick={() => copyToClipboard(inviteLink)}
              >
                <CopyIcon className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">快速分享</label>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => shareInvite('wechat')}
                className="flex-1"
              >
                微信分享
              </Button>
              <Button
                variant="outline"
                onClick={() => shareInvite('qq')}
                className="flex-1"
              >
                QQ分享
              </Button>
              <Button
                variant="outline"
                onClick={() => shareInvite('weibo')}
                className="flex-1"
              >
                微博分享
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-4 p-4 bg-blue-50 rounded-lg">
          <h4 className="font-medium text-blue-800 mb-2">邀请奖励说明</h4>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• 被邀请人注册可获得专属优惠券</li>
            <li>• 被邀请人首次付费购买会员，您可获得15%现金返佣</li>
            <li>• 邀请5人付费可升级为Premium会员</li>
            <li>• 邀请10人付费可升级为VIP会员</li>
          </ul>
        </div>
      </Card>

      {/* 邀请记录 */}
      <Card className="p-6">
        <h3 className="text-xl font-semibold mb-4">邀请记录</h3>
        
        {inviteRecords.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3">被邀请人</th>
                  <th className="text-left py-3">状态</th>
                  <th className="text-left py-3">注册时间</th>
                  <th className="text-left py-3">付费时间</th>
                  <th className="text-right py-3">返佣金额</th>
                </tr>
              </thead>
              <tbody>
                {inviteRecords.map((record) => (
                  <tr key={record.id} className="border-b">
                    <td className="py-3">{record.inviteeEmail}</td>
                    <td className="py-3">
                      <Badge className={getStatusColor(record.status)}>
                        {getStatusText(record.status)}
                      </Badge>
                    </td>
                    <td className="py-3">
                      {record.registeredAt ? new Date(record.registeredAt).toLocaleDateString() : '-'}
                    </td>
                    <td className="py-3">
                      {record.purchasedAt ? new Date(record.purchasedAt).toLocaleDateString() : '-'}
                    </td>
                    <td className="py-3 text-right">
                      {record.commissionAmount > 0 ? `¥${(record.commissionAmount / 100).toFixed(2)}` : '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            暂无邀请记录，快去邀请好友吧！
          </div>
        )}
      </Card>
    </div>
  )
}