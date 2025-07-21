/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            fontFamily: {
                'alibaba': ['Alibaba PuHuiTi 3.0', 'sans-serif'],
            },
            colors: {
                // 精确还原设计稿颜色
                primary: {
                    blue: '#3B82F6',
                    purple: '#8B5CF6',
                },
                background: {
                    primary: '#030303',
                    secondary: 'rgba(26, 26, 26, 0.30)',
                    glass: 'rgba(26, 26, 26, 0.85)',
                    input: 'rgba(18, 18, 18, 0.50)',
                },
                text: {
                    primary: '#FFFFFF',
                    secondary: '#D1D5DB',
                    muted: '#9CA3AF',
                    disabled: '#6B7280',
                },
                border: {
                    primary: 'rgba(42, 42, 42, 0.70)',
                    secondary: '#2A2A2A',
                    active: '#3B82F6',
                }
            },
            fontSize: {
                // 精确还原设计稿字号
                'xs': '12px',
                'sm': '13.33px',
                'base': '14px',
                'lg': '16px',
                'xl': '18px',
                '2xl': '20px',
                '3xl': '24px',
                '4xl': '28px',
                '5xl': '32px',
                '6xl': '36px',
                '7xl': '48px',
                '8xl': '64px',
            },
            spacing: {
                // 精确间距系统
                '18': '72px',
                '22': '88px',
                '30': '120px',
            },
            backdropBlur: {
                '64': '64px',
            },
            boxShadow: {
                'glow': '0px 0px 15px 0px rgba(139, 92, 246, 0.50)',
                'card': '0px 8px 24px 0px rgba(0, 0, 0, 0.20)',
            }
        }
    },
    plugins: [require('tailwindcss-animate')],
} 