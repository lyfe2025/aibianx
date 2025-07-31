import { NextRequest, NextResponse } from 'next/server';
import { verifyCode } from '../send-verification/route';

export async function POST(request: NextRequest) {
  try {
    const { email, code, type = 'register' } = await request.json();

    if (!email || !code) {
      return NextResponse.json(
        { error: '邮箱和验证码不能为空' },
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

    // 验证码格式检查（6位数字）
    if (!/^\d{6}$/.test(code)) {
      return NextResponse.json(
        { error: '验证码格式不正确' },
        { status: 400 }
      );
    }

    // 验证验证码
    const isValid = verifyCode(email, code, type);

    if (!isValid) {
      return NextResponse.json(
        { error: '验证码无效或已过期' },
        { status: 400 }
      );
    }

    console.log(`验证码验证成功: ${email} (类型: ${type})`);

    return NextResponse.json({
      success: true,
      message: '验证码验证成功',
      email,
      type
    });

  } catch (error) {
    console.error('验证验证码失败:', error);
    return NextResponse.json(
      { error: '服务器错误' },
      { status: 500 }
    );
  }
}