import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

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

    // 检查邮箱是否存在
    try {
      const checkResponse = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/users?filters[email][$eq]=${email}`, {
        headers: {
          'Authorization': `Bearer ${process.env.STRAPI_API_TOKEN}`,
        },
      });
      
      if (checkResponse.ok) {
        const users = await checkResponse.json();
        if (users.length === 0) {
          // 为了安全，即使邮箱不存在也返回成功消息
          return NextResponse.json({
            success: true,
            message: '如果该邮箱已注册，重置链接已发送至您的邮箱'
          });
        }
      }
    } catch (error) {
      console.error('检查邮箱是否存在失败:', error);
      // 继续执行，不因为检查失败而阻止密码重置
    }

    // 调用Strapi的忘记密码API
    try {
      const strapiResponse = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/auth/forgot-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email
        })
      });

      if (!strapiResponse.ok) {
        const error = await strapiResponse.json();
        console.error('Strapi忘记密码失败:', error);
        
        // 为了安全，不暴露具体错误信息
        return NextResponse.json({
          success: true,
          message: '如果该邮箱已注册，重置链接已发送至您的邮箱'
        });
      }

      const result = await strapiResponse.json();
      console.log(`密码重置邮件已发送: ${email}`);

      return NextResponse.json({
        success: true,
        message: '密码重置链接已发送至您的邮箱，请检查邮件'
      });

    } catch (strapiError) {
      console.error('调用Strapi忘记密码API失败:', strapiError);
      
      // 备用方案：使用我们自己的邮件服务发送验证码
      try {
        // 发送验证码而不是重置链接
        const codeResponse = await fetch(`${process.env.NEXTAUTH_URL}/api/auth/send-verification`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            type: 'reset'
          })
        });

        if (codeResponse.ok) {
          return NextResponse.json({
            success: true,
            message: '密码重置验证码已发送至您的邮箱，请检查邮件',
            useCode: true // 标识使用验证码而非链接
          });
        }
      } catch (codeError) {
        console.error('发送重置验证码失败:', codeError);
      }

      // 为了安全，即使失败也返回成功消息
      return NextResponse.json({
        success: true,
        message: '如果该邮箱已注册，重置链接已发送至您的邮箱'
      });
    }

  } catch (error) {
    console.error('忘记密码处理失败:', error);
    
    // 为了安全，不暴露服务器错误
    return NextResponse.json({
      success: true,
      message: '如果该邮箱已注册，重置链接已发送至您的邮箱'
    });
  }
}