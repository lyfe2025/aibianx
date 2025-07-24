'use client'

import React, { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'

/**
 * GitHub风格现代3D模型组件
 * 
 * 功能特点：
 * - 现代几何体设计，类似GitHub首页风格
 * - 半透明渐变色彩，蓝紫科技色系
 * - 抽象科技感，不具象但有深度
 * - subtle动画效果，不抢夺主要内容焦点
 * - 网格线条，体现代码/数据可视化感
 * - 适中尺寸，提升页面现代感
 * 
 * 技术实现：
 * - Three.js原生建模，无外部模型文件
 * - 优化的渲染性能，流畅动画
 * - 响应式适配，支持各种屏幕尺寸
 */

export const AIBrainModel: React.FC = () => {
    const mountRef = useRef<HTMLDivElement>(null)
    // 添加强制重新初始化状态
    const [forceReload, setForceReload] = useState(0)
    const sceneRef = useRef<THREE.Scene | null>(null)
    const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
    const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)
    const animationIdRef = useRef<number | null>(null)

    useEffect(() => {
        // 强制清理之前的状态
        let animationId: number | null = null

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

            // === Three.js 场景初始化 ===
            const scene = new THREE.Scene()
            sceneRef.current = scene

            // 创建相机 - 适合大脑模型的视角
            const camera = new THREE.PerspectiveCamera(
                75, // 增加视野角度，确保所有3D元素都在视野内
                mountRef.current.clientWidth / mountRef.current.clientHeight,
                0.1,
                1000
            )
            camera.position.set(0, 4, 12) // 拉远距离并提高视角，确保完整显示所有3D元素
            cameraRef.current = camera

            // 创建渲染器
            const renderer = new THREE.WebGLRenderer({
                antialias: true,
                alpha: true, // 透明背景
                powerPreference: "high-performance",
                preserveDrawingBuffer: false
            })

            // 检查WebGL是否可用
            if (!renderer.getContext()) {
                console.warn('WebGL not available, falling back to basic rendering')
                return
            }

            renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight)
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

            // 确保DOM元素存在再添加
            if (mountRef.current) {
                mountRef.current.appendChild(renderer.domElement)
                rendererRef.current = renderer
            } else {
                renderer.dispose()
                return
            }

            // === 创建GitHub风格现代3D结构 ===

            // 主要几何体组
            const mainGroup = new THREE.Group()
            const geometryElements: THREE.Mesh[] = []

            // 1. 核心立方体群组 - 极其subtle的半透明渐变
            const cubeGeometry = new THREE.BoxGeometry(1, 1, 1)
            const cubeMaterials = [
                new THREE.MeshBasicMaterial({
                    color: 0x3B82F6, transparent: true, opacity: 0.06,
                    wireframe: false
                }),
                new THREE.MeshBasicMaterial({
                    color: 0x8B5CF6, transparent: true, opacity: 0.05,
                    wireframe: false
                }),
                new THREE.MeshBasicMaterial({
                    color: 0x6366F1, transparent: true, opacity: 0.08,
                    wireframe: false
                })
            ]

            // 创建多个更小尺寸的立方体 - 避免遮挡感
            const cubeConfigs = [
                { size: 0.8, pos: [0, 0.5, 0], materialIndex: 0 },
                { size: 0.6, pos: [-2, -0.8, 1.5], materialIndex: 1 },
                { size: 0.4, pos: [2.2, 0.3, -1], materialIndex: 2 },
                { size: 0.7, pos: [1.8, -1.2, 0.8], materialIndex: 0 },
                { size: 0.5, pos: [-1.5, 1.8, -0.5], materialIndex: 1 }
            ]

            cubeConfigs.forEach((config, index) => {
                const cube = new THREE.Mesh(cubeGeometry.clone(), cubeMaterials[config.materialIndex].clone())
                cube.scale.setScalar(config.size)
                cube.position.set(...config.pos)

                // 随机旋转
                cube.rotation.x = Math.random() * Math.PI
                cube.rotation.y = Math.random() * Math.PI
                cube.rotation.z = Math.random() * Math.PI

                    // 存储动画信息
                    ; (cube as any).originalPosition = cube.position.clone()
                    ; (cube as any).rotationSpeed = {
                        x: (Math.random() - 0.5) * 0.02,
                        y: (Math.random() - 0.5) * 0.02,
                        z: (Math.random() - 0.5) * 0.02
                    }
                    ; (cube as any).floatOffset = Math.random() * Math.PI * 2

                mainGroup.add(cube)
                geometryElements.push(cube)
            })

            // 2. 线框立方体 - GitHub风格 (subtle)
            const wireframeCubeGeometry = new THREE.BoxGeometry(1.8, 1.8, 1.8)
            const wireframeMaterial = new THREE.MeshBasicMaterial({
                color: 0x3B82F6,
                wireframe: true,
                transparent: true,
                opacity: 0.08
            })
            const wireframeCube = new THREE.Mesh(wireframeCubeGeometry, wireframeMaterial)
            wireframeCube.position.set(0, 0, 0)
                ; (wireframeCube as any).rotationSpeed = { x: 0.005, y: 0.008, z: 0.003 }
            mainGroup.add(wireframeCube)

            // 3. 浮动球体 - 科技感点缀 (subtle)
            const sphereGeometry = new THREE.SphereGeometry(0.12, 16, 16)
            const sphereMaterial = new THREE.MeshBasicMaterial({
                color: 0x8B5CF6,
                transparent: true,
                opacity: 0.15
            })

            const spherePositions = [
                [3, 2, 1], [-2.5, 1.5, -1.5], [1.5, -2, 2],
                [-3, -1, 0.5], [2, 2.5, -2], [-1, -2.5, 1.5]
            ]

            spherePositions.forEach((pos, index) => {
                const sphere = new THREE.Mesh(sphereGeometry.clone(), sphereMaterial.clone())
                sphere.position.set(...pos)

                    // 存储动画信息
                    ; (sphere as any).originalPosition = sphere.position.clone()
                    ; (sphere as any).floatOffset = Math.random() * Math.PI * 2
                    ; (sphere as any).floatSpeed = 0.01 + Math.random() * 0.01
                    ; (sphere as any).orbitRadius = 0.3 + Math.random() * 0.2

                mainGroup.add(sphere)
                geometryElements.push(sphere)
            })

            // 4. 连接线 - 已移除（按用户要求去除线条）
            // const connections: THREE.Line[] = []
            // 连接线相关代码已注释，保持界面简洁

            // 5. 背景网格 - GitHub风格的科技感 (极subtle)
            const gridHelper = new THREE.GridHelper(8, 16, 0x3B82F6, 0x8B5CF6)
            gridHelper.position.y = -3
            gridHelper.material.transparent = true
            gridHelper.material.opacity = 0.05
            scene.add(gridHelper)

            scene.add(mainGroup)

            // === 主动画循环 ===
            let time = 0
            const animate = () => {
                // 检查组件是否仍然挂载
                if (!mountRef.current || !sceneRef.current || !rendererRef.current) {
                    return
                }

                time += 0.01

                // 几何体动画
                geometryElements.forEach((element, index) => {
                    if ((element as any).rotationSpeed) {
                        element.rotation.x += (element as any).rotationSpeed.x
                        element.rotation.y += (element as any).rotationSpeed.y
                        element.rotation.z += (element as any).rotationSpeed.z
                    }

                    if ((element as any).originalPosition) {
                        const floatSpeed = (element as any).floatSpeed || 0.01
                        const floatOffset = (element as any).floatOffset || 0
                        const orbitRadius = (element as any).orbitRadius || 0.2

                        element.position.y = (element as any).originalPosition.y + Math.sin(time * floatSpeed + floatOffset) * orbitRadius
                        element.position.x = (element as any).originalPosition.x + Math.cos(time * floatSpeed * 0.7 + floatOffset) * (orbitRadius * 0.5)
                    }
                })

                // 线框立方体动画
                if (wireframeCube && (wireframeCube as any).rotationSpeed) {
                    wireframeCube.rotation.x += (wireframeCube as any).rotationSpeed.x
                    wireframeCube.rotation.y += (wireframeCube as any).rotationSpeed.y
                    wireframeCube.rotation.z += (wireframeCube as any).rotationSpeed.z
                }

                // 背景网格动画
                const gridMaterial = gridHelper.material as THREE.MeshBasicMaterial
                gridMaterial.opacity = 0.1 + Math.sin(time * 0.8) * 0.03

                // 渲染场景
                try {
                    renderer.render(scene, camera)
                    animationId = requestAnimationFrame(animate)
                    animationIdRef.current = animationId
                } catch (error) {
                    console.warn('Three.js render error:', error)
                    return
                }
            }

            animate()

            // 响应式处理
            const handleResize = () => {
                if (mountRef.current && camera && renderer) {
                    const width = mountRef.current.clientWidth
                    const height = mountRef.current.clientHeight

                    camera.aspect = width / height
                    camera.updateProjectionMatrix()
                    renderer.setSize(width, height)
                }
            }

            window.addEventListener('resize', handleResize)

            // 清理函数
            return () => {
                window.removeEventListener('resize', handleResize)

                if (animationId) {
                    cancelAnimationFrame(animationId)
                    animationId = null
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
                geometryElements.forEach(element => {
                    if (element.geometry) element.geometry.dispose()
                    if (element.material) (element.material as THREE.Material).dispose()
                })
                // connections.forEach(connection => {
                //     connection.geometry.dispose()
                //     ;(connection.material as THREE.Material).dispose()
                // })
                if (wireframeCube) {
                    wireframeCube.geometry.dispose()
                        ; (wireframeCube.material as THREE.Material).dispose()
                }
                if (gridHelper) {
                    gridHelper.geometry.dispose()
                        ; (gridHelper.material as THREE.Material).dispose()
                }
            }
        }, 100) // 延迟100ms确保DOM完全准备就绪

        // 清理计时器
        return () => {
            clearTimeout(initTimer)
            if (animationIdRef.current) {
                cancelAnimationFrame(animationIdRef.current)
                animationIdRef.current = null
            }
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
        <div
            ref={mountRef}
            style={{
                width: '100%',
                height: '600px', // 大幅增加渲染空间，确保3D元素完整显示
                position: 'relative',
                zIndex: 5, // 在背景3D之上，但在主要内容之下
                pointerEvents: 'none', // 不干扰用户交互
                opacity: 0.5, // 作为绝对定位背景装饰，进一步降低透明度
                overflow: 'visible' // 确保3D元素不被容器裁剪
            }}
        />
    )
} 