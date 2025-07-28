'use client'

import Link from 'next/link'
import Image from 'next/image'
import { GradientText } from '@/components/ui'
import { getLogoStyles } from '@/lib/headerUtils'
import { HEADER_STYLES } from '@/constants/headerConfig'

/**
 * HeaderLogo 组件
 * 
 * 显示应用Logo和品牌名称
 */
export function HeaderLogo() {
    const { size, borderRadius, gap } = HEADER_STYLES.logo
    const styles = getLogoStyles(size, borderRadius, gap)

    return (
        <Link href="/" style={styles.container}>
            <div style={styles.iconContainer}>
                <Image
                    src="/icons/logo-main.svg"
                    alt="AI变现之路"
                    width={size}
                    height={size}
                    style={styles.image}
                />
            </div>
            <GradientText
                as="span"
                size="3xl"
                weight="semibold"
                style={{
                    lineHeight: '1',
                    display: 'flex',
                    alignItems: 'center',
                    whiteSpace: 'nowrap'
                }}
            >
                AI变现之路
            </GradientText>
        </Link>
    )
} 