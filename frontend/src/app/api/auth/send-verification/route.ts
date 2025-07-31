import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

interface VerificationCode {
  email: string;
  code: string;
  type: 'register' | 'reset';
  expires: Date;
  attempts: number;
}

// 临时存储验证码（生产环境应使用Redis等）
const verificationCodes = new Map<string, VerificationCode>();

// 清理过期验证码的定时器
setInterval(() => {
  const now = new Date();
  for (const [key, value] of verificationCodes.entries()) {
    if (value.expires < now) {
      verificationCodes.delete(key);
    }
  }
}, 60000); // 每分钟清理一次

export async function POST(request: NextRequest) {
  try {
    const { email, type = 'register' } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: '邮箱地址不能为空' },
        { status: 400 }
      );
    }

    // 验证邮箱格式
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: '邮箱地址格式不正确' },
        { status: 400 }
      );
    }

    // 检查发送频率限制（1分钟内最多发送1次）
    const rateLimitKey = `${email}_${type}`;
    const existingCode = verificationCodes.get(rateLimitKey);
    
    if (existingCode) {
      const timeDiff = Date.now() - (existingCode.expires.getTime() - 10 * 60 * 1000); // 10分钟有效期
      if (timeDiff < 60 * 1000) { // 1分钟内
        return NextResponse.json(
          { error: '请稍后再试，每分钟只能发送一次验证码' },
          { status: 429 }
        );
      }
    }

    // 检查邮箱是否已注册（仅对register类型）
    if (type === 'register') {
      try {
        const checkResponse = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/users?filters[email][$eq]=${email}`, {
          headers: {
            'Authorization': `Bearer ${process.env.STRAPI_API_TOKEN}`,
          },
        });
        
        if (checkResponse.ok) {
          const users = await checkResponse.json();
          if (users.length > 0) {
            return NextResponse.json(
              { error: '该邮箱已被注册' },
              { status: 409 }
            );
          }
        }
      } catch (error) {
        console.error('检查邮箱是否已注册失败:', error);
        // 继续执行，不因为检查失败而阻止发送验证码
      }
    }

    // 生成6位数字验证码
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    
    // 设置过期时间（10分钟）
    const expires = new Date(Date.now() + 10 * 60 * 1000);

    // 存储验证码
    verificationCodes.set(rateLimitKey, {
      email,
      code,
      type,
      expires,
      attempts: 0
    });

    // 调用Strapi的邮件服务发送验证码
    try {
      const strapiResponse = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/email-service/send-verification-code`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.STRAPI_API_TOKEN}`,
        },
        body: JSON.stringify({
          email,
          code,
          type
        })
      });

      if (!strapiResponse.ok) {
        const error = await strapiResponse.json();
        throw new Error(error.message || '邮件发送失败');
      }

      console.log(`验证码已发送: ${email} (类型: ${type})`);

      return NextResponse.json({
        success: true,
        message: '验证码已发送，请检查您的邮箱',
        expires: expires.toISOString()
      });

    } catch (emailError) {
      console.error('发送验证码邮件失败:', emailError);
      
      // 移除存储的验证码
      verificationCodes.delete(rateLimitKey);
      
      return NextResponse.json(
        { error: '邮件发送失败，请稍后重试' },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error('发送验证码失败:', error);
    return NextResponse.json(
      { error: '服务器错误' },
      { status: 500 }
    );
  }
}

// 供其他模块调用的验证函数
export function verifyCode(email: string, code: string, type: 'register' | 'reset'): boolean {
  const rateLimitKey = `${email}_${type}`;
  const storedCode = verificationCodes.get(rateLimitKey);

  if (!storedCode) {
    return false;
  }

  // 检查是否过期
  if (storedCode.expires < new Date()) {
    verificationCodes.delete(rateLimitKey);
    return false;
  }

  // 检查尝试次数（最多5次）
  storedCode.attempts += 1;
  if (storedCode.attempts > 5) {
    verificationCodes.delete(rateLimitKey);
    return false;
  }

  // 验证码是否正确
  if (storedCode.code === code) {
    verificationCodes.delete(rateLimitKey); // 验证成功后删除
    return true;
  }

  return false;
}