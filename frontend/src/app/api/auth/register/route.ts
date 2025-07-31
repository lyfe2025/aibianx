import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { email, password, username, name } = await request.json();

    if (!email || !password || !username) {
      return NextResponse.json(
        { error: '邮箱、密码和用户名不能为空' },
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

    // 验证密码强度
    if (password.length < 6) {
      return NextResponse.json(
        { error: '密码长度不能少于6位' },
        { status: 400 }
      );
    }

    // 调用Strapi注册API
    try {
      const strapiResponse = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/auth/local/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          email,
          password,
          name: name || username
        })
      });

      const result = await strapiResponse.json();

      if (!strapiResponse.ok) {
        // 处理Strapi返回的错误
        let errorMessage = '注册失败';
        
        if (result.error) {
          if (result.error.message.includes('Email')) {
            errorMessage = '该邮箱已被注册';
          } else if (result.error.message.includes('username')) {
            errorMessage = '该用户名已被使用';
          } else {
            errorMessage = result.error.message;
          }
        }

        return NextResponse.json(
          { error: errorMessage },
          { status: strapiResponse.status }
        );
      }

      // 注册成功，发送欢迎邮件
      try {
        await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/email-subscription/subscribe`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.STRAPI_API_TOKEN}`,
          },
          body: JSON.stringify({
            email,
            name: name || username,
            source: 'register',
            tags: ['new-user']
          })
        });
      } catch (welcomeError) {
        console.error('发送欢迎邮件失败:', welcomeError);
        // 不因为欢迎邮件失败而影响注册成功
      }

      console.log(`用户注册成功: ${email} (${username})`);

      return NextResponse.json({
        success: true,
        message: '注册成功',
        user: {
          id: result.user.id,
          username: result.user.username,
          email: result.user.email,
          name: result.user.name
        },
        jwt: result.jwt
      });

    } catch (strapiError) {
      console.error('Strapi注册失败:', strapiError);
      return NextResponse.json(
        { error: '注册服务暂时不可用，请稍后重试' },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error('注册失败:', error);
    return NextResponse.json(
      { error: '服务器错误' },
      { status: 500 }
    );
  }
}