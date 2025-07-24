'use client'

import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { GradientText } from '@/components/ui'

/**
 * 3D动画区块组件 - ThreeDSection
 * 
 * 特色功能：
 * - 浮动3D几何体动画
 * - AI科技感粒子效果
 * - 毛玻璃背景效果
 * - 响应式3D场景
 * - 性能优化和自适应
 */
export function ThreeDSection() {
    const mountRef = useRef<HTMLDivElement>(null)
    const sceneRef = useRef<THREE.Scene | null>(null)
    const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
    const animationIdRef = useRef<number | null>(null)
    const [isLoaded, setIsLoaded] = useState(false)
    // 添加强制重新初始化状态
    const [forceReload, setForceReload] = useState(0)
    const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)

    useEffect(() => {
        // 强制清理之前的状态
        setIsLoaded(false)

        // 延迟初始化确保DOM完全准备就绪
        const initTimer = setTimeout(() => {
            if (!mountRef.current) {
                // DOM未准备好，延迟重试
                setForceReload(prev => prev + 1)
                return
            }

            // 强制清理可能残留的renderer
            if (rendererRef.current && mountRef.current.contains(rendererRef.current.domElement)) {
                mountRef.current.removeChild(rendererRef.current.domElement)
                rendererRef.current.dispose()
                rendererRef.current = null
            }

            // 创建场景
            const scene = new THREE.Scene()
            sceneRef.current = scene

            // 创建相机
            const camera = new THREE.PerspectiveCamera(
                75,
                mountRef.current.clientWidth / mountRef.current.clientHeight,
                0.1,
                1000
            )
            camera.position.z = 8
            cameraRef.current = camera

            // 创建渲染器
            const renderer = new THREE.WebGLRenderer({
                alpha: true,
                antialias: true,
                powerPreference: "high-performance",
                preserveDrawingBuffer: false
            })

            // 检查WebGL是否可用
            if (!renderer.getContext()) {
                console.warn('WebGL not available, falling back to basic rendering')
                setIsLoaded(true)
                return
            }

            renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight)
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)) // 性能优化
            renderer.setClearColor(0x000000, 0) // 透明背景

            // 确保DOM元素存在再添加
            if (mountRef.current) {
                mountRef.current.appendChild(renderer.domElement)
                rendererRef.current = renderer
            } else {
                renderer.dispose()
                return
            }

            // 创建几何体组
            const geometries: THREE.Mesh[] = []

            // 1. 发光立方体
            const cubeGeometry = new THREE.BoxGeometry(1.5, 1.5, 1.5)
            const cubeMaterial = new THREE.MeshBasicMaterial({
                color: 0x3B82F6,
                transparent: true,
                opacity: 0.7,
                wireframe: true
            })
            const cube = new THREE.Mesh(cubeGeometry, cubeMaterial)
            cube.position.set(-3, 2, 0)
            scene.add(cube)
            geometries.push(cube)

            // 2. 渐变球体
            const sphereGeometry = new THREE.SphereGeometry(1, 32, 32)
            const sphereMaterial = new THREE.MeshBasicMaterial({
                color: 0x8B5CF6,
                transparent: true,
                opacity: 0.6
            })
            const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
            sphere.position.set(3, -1, -2)
            scene.add(sphere)
            geometries.push(sphere)

            // 3. 多面体
            const octahedronGeometry = new THREE.OctahedronGeometry(1.2)
            const octahedronMaterial = new THREE.MeshBasicMaterial({
                color: 0x10B981,
                transparent: true,
                opacity: 0.5,
                wireframe: true
            })
            const octahedron = new THREE.Mesh(octahedronGeometry, octahedronMaterial)
            octahedron.position.set(0, -2, 1)
            scene.add(octahedron)
            geometries.push(octahedron)

            // 4. 环形几何体
            const torusGeometry = new THREE.TorusGeometry(1, 0.3, 16, 100)
            const torusMaterial = new THREE.MeshBasicMaterial({
                color: 0xF59E0B,
                transparent: true,
                opacity: 0.4,
                wireframe: true
            })
            const torus = new THREE.Mesh(torusGeometry, torusMaterial)
            torus.position.set(-2, -1.5, -1)
            scene.add(torus)
            geometries.push(torus)

            // 5. 创建粒子系统
            const particleGeometry = new THREE.BufferGeometry()
            const particleCount = 200
            const positions = new Float32Array(particleCount * 3)
            const colors = new Float32Array(particleCount * 3)

            for (let i = 0; i < particleCount * 3; i += 3) {
                // 随机位置
                positions[i] = (Math.random() - 0.5) * 20     // x
                positions[i + 1] = (Math.random() - 0.5) * 20 // y
                positions[i + 2] = (Math.random() - 0.5) * 20 // z

                // 随机颜色（蓝紫色调）
                const colorChoice = Math.random()
                if (colorChoice < 0.33) {
                    colors[i] = 0.231     // 蓝色 #3B82F6
                    colors[i + 1] = 0.510
                    colors[i + 2] = 0.965
                } else if (colorChoice < 0.66) {
                    colors[i] = 0.545     // 紫色 #8B5CF6
                    colors[i + 1] = 0.361
                    colors[i + 2] = 0.965
                } else {
                    colors[i] = 0.063     // 绿色 #10B981
                    colors[i + 1] = 0.725
                    colors[i + 2] = 0.506
                }
            }

            particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
            particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

            const particleMaterial = new THREE.PointsMaterial({
                size: 0.05,
                vertexColors: true,
                transparent: true,
                opacity: 0.8,
                blending: THREE.AdditiveBlending
            })

            const particles = new THREE.Points(particleGeometry, particleMaterial)
            scene.add(particles)

            // 动画函数
            let time = 0
            const animate = () => {
                // 检查组件是否仍然挂载
                if (!mountRef.current || !sceneRef.current || !rendererRef.current) {
                    return
                }

                time += 0.01

                // 几何体动画
                geometries.forEach((geometry, index) => {
                    // 旋转动画
                    geometry.rotation.x += 0.005 + index * 0.001
                    geometry.rotation.y += 0.008 + index * 0.002
                    geometry.rotation.z += 0.003 + index * 0.001

                    // 浮动动画
                    geometry.position.y += Math.sin(time + index) * 0.002
                    geometry.position.x += Math.cos(time + index * 0.5) * 0.001
                })

                // 粒子动画
                const positions = particles.geometry.attributes.position.array as Float32Array
                for (let i = 0; i < positions.length; i += 3) {
                    positions[i + 1] += Math.sin(time + i) * 0.001 // y轴浮动
                    positions[i] += Math.cos(time + i * 0.1) * 0.0005 // x轴微动
                }
                particles.geometry.attributes.position.needsUpdate = true

                // 整体粒子系统旋转
                particles.rotation.y += 0.002

                try {
                    renderer.render(scene, camera)
                    animationIdRef.current = requestAnimationFrame(animate)
                } catch (error) {
                    console.warn('Three.js render error:', error)
                    return
                }
            }

            // 响应式处理
            const handleResize = () => {
                if (!mountRef.current || !renderer || !camera) return

                const width = mountRef.current.clientWidth
                const height = mountRef.current.clientHeight

                camera.aspect = width / height
                camera.updateProjectionMatrix()
                renderer.setSize(width, height)
            }

            window.addEventListener('resize', handleResize)

            // 启动动画
            animate()
            setIsLoaded(true)

            // 清理函数
            return () => {
                window.removeEventListener('resize', handleResize)

                if (animationIdRef.current) {
                    cancelAnimationFrame(animationIdRef.current)
                    animationIdRef.current = null
                }

                // 清理Three.js资源
                if (sceneRef.current) {
                    sceneRef.current.clear()
                    sceneRef.current = null
                }

                if (rendererRef.current) {
                    if (mountRef.current && mountRef.current.contains(rendererRef.current.domElement)) {
                        mountRef.current.removeChild(rendererRef.current.domElement)
                    }
                    rendererRef.current.dispose()
                    rendererRef.current = null
                }

                // 清理几何体和材质
                geometries.forEach(geometry => {
                    if (geometry.geometry) geometry.geometry.dispose()
                    if (Array.isArray(geometry.material)) {
                        geometry.material.forEach(material => material.dispose())
                    } else {
                        geometry.material.dispose()
                    }
                })

                if (particleGeometry) particleGeometry.dispose()
                if (particleMaterial) particleMaterial.dispose()
            }
        }, 100) // 延迟100ms确保DOM完全准备就绪

        // 清理计时器
        return () => {
            clearTimeout(initTimer)
        }
    }, [forceReload]) // 依赖forceReload确保组件能重新初始化

    // 添加错误边界处理
    useEffect(() => {
        const errorHandler = (event: ErrorEvent) => {
            if (event.message.includes('WebGL') || event.message.includes('Three')) {
                console.warn('WebGL error detected, attempting to reinitialize:', event.message)
                setForceReload(prev => prev + 1)
            }
        }

        window.addEventListener('error', errorHandler)
        return () => window.removeEventListener('error', errorHandler)
    }, [])

    return (
        <section style={{
            position: 'relative',
            height: '400px',
            width: '100%',
            overflow: 'hidden',
            background: 'transparent',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            {/* 背景毛玻璃效果 */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'rgba(26, 26, 26, 0.15)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                zIndex: 1
            }} />

            {/* 渐变装饰背景 */}
            <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '600px',
                height: '300px',
                background: 'radial-gradient(ellipse, rgba(59, 130, 246, 0.1) 0%, rgba(139, 92, 246, 0.05) 50%, transparent 100%)',
                borderRadius: '50%',
                filter: 'blur(40px)',
                zIndex: 0
            }} />

            {/* 3D场景容器 */}
            <div
                ref={mountRef}
                style={{
                    width: '100%',
                    height: '100%',
                    position: 'relative',
                    zIndex: 2,
                    opacity: isLoaded ? 1 : 0,
                    transition: 'opacity 0.5s ease-in-out'
                }}
            />

            {/* 加载指示器 */}
            {!isLoaded && (
                <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    color: 'var(--color-text-secondary)',
                    fontSize: '14px',
                    zIndex: 3
                }}>
                    加载3D场景中...
                </div>
            )}

            {/* 中心文字 - "AI 变现之路 从入门到精通" */}
            <div style={{
                position: 'absolute',
                bottom: '40px',
                left: '50%',
                transform: 'translateX(-50%)',
                zIndex: 10,
                textAlign: 'center'
            }}>
                <GradientText
                    as="div"
                    size="3xl"
                    weight="semibold"
                    style={{
                        lineHeight: '32px',
                        whiteSpace: 'nowrap',
                        textShadow: '0 0 20px rgba(59, 130, 246, 0.3)'
                    }}
                >
                    AI 变现之路
                </GradientText>
                <div style={{
                    color: 'var(--color-text-secondary)',
                    fontSize: 'var(--font-size-lg)',
                    fontFamily: 'var(--font-family-primary)',
                    fontWeight: '400',
                    lineHeight: '24px',
                    marginTop: '8px'
                }}>
                    从入门到精通
                </div>
            </div>

            {/* 响应式样式 */}
            <style jsx>{`
                /* 中等屏幕适配 */
                @media (max-width: 1199px) {
                    section {
                        height: 350px !important;
                    }
                    
                    section > div:last-child > div:first-child {
                        font-size: 20px !important;
                        line-height: 28px !important;
                    }
                    
                    section > div:last-child > div:last-child {
                        font-size: 14px !important;
                        line-height: 20px !important;
                    }
                }
                
                /* 移动端适配 */
                @media (max-width: 767px) {
                    section {
                        height: 300px !important;
                    }
                    
                    section > div:last-child {
                        bottom: 30px !important;
                    }
                    
                    section > div:last-child > div:first-child {
                        font-size: 18px !important;
                        line-height: 24px !important;
                    }
                    
                    section > div:last-child > div:last-child {
                        font-size: 12px !important;
                        line-height: 18px !important;
                    }
                }
                
                /* 超小屏幕适配 */
                @media (max-width: 480px) {
                    section {
                        height: 250px !important;
                    }
                    
                    section > div:last-child > div:first-child {
                        font-size: 16px !important;
                        line-height: 22px !important;
                    }
                }
            `}</style>
        </section>
    )
} 