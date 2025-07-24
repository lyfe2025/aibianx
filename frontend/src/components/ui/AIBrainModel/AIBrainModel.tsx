'use client'

import React, { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'

/**
 * 简化3D粒子组件
 * 
 * 功能特点：
 * - 简洁的粒子效果，不抢夺主要内容焦点
 * - 科技感粒子动画
 * - 优化的渲染性能
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

            try {
                // 检查WebGL可用性
                const canvas = document.createElement('canvas')
                const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
                if (!gl) {
                    console.warn('WebGL不可用，跳过3D渲染')
                    return
                }

                // 初始化场景
                const scene = new THREE.Scene()
                sceneRef.current = scene

                // 初始化相机 - 调整为小容器适配
                const camera = new THREE.PerspectiveCamera(
                    40, // 减小视野角度，适应小容器
                    mountRef.current.clientWidth / mountRef.current.clientHeight,
                    0.1,
                    1000
                )
                camera.position.set(0, 0, 8) // 拉远相机，确保小容器内显示完整
                cameraRef.current = camera

                // 初始化渲染器
                const renderer = new THREE.WebGLRenderer({
                    alpha: true,
                    antialias: true,
                    powerPreference: 'high-performance'
                })
                renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight)
                renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
                rendererRef.current = renderer
                mountRef.current.appendChild(renderer.domElement)

                // 创建简单粒子系统
                const particleCount = 60
                const particleGeometry = new THREE.BufferGeometry()
                const positions = new Float32Array(particleCount * 3)
                const colors = new Float32Array(particleCount * 3)

                for (let i = 0; i < particleCount; i++) {
                    // 随机位置
                    positions[i * 3] = (Math.random() - 0.5) * 10     // x
                    positions[i * 3 + 1] = (Math.random() - 0.5) * 6  // y
                    positions[i * 3 + 2] = (Math.random() - 0.5) * 6  // z

                    // 蓝紫色调
                    if (Math.random() < 0.5) {
                        colors[i * 3] = 0.231     // 蓝色
                        colors[i * 3 + 1] = 0.510
                        colors[i * 3 + 2] = 0.965
                    } else {
                        colors[i * 3] = 0.545     // 紫色
                        colors[i * 3 + 1] = 0.361
                        colors[i * 3 + 2] = 0.965
                    }
                }

                particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
                particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

                const particleMaterial = new THREE.PointsMaterial({
                    size: 0.05,
                    vertexColors: true,
                    transparent: true,
                    opacity: 0.6,
                    blending: THREE.AdditiveBlending
                })

                const particles = new THREE.Points(particleGeometry, particleMaterial)
                scene.add(particles)

                let time = 0

                // 动画循环
                function animate() {
                    // 检查组件是否仍然挂载
                    if (!mountRef.current || !sceneRef.current || !rendererRef.current || !cameraRef.current) {
                        return
                    }

                    time += 0.01

                    // 简单的粒子动画
                    const positions = particles.geometry.attributes.position.array as Float32Array
                    for (let i = 0; i < positions.length; i += 3) {
                        positions[i + 1] += Math.sin(time + i) * 0.005 // y轴浮动
                        positions[i] += Math.cos(time + i * 0.1) * 0.003 // x轴微动
                    }
                    particles.geometry.attributes.position.needsUpdate = true

                    // 整体旋转
                    particles.rotation.y += 0.002

                    try {
                        renderer.render(scene, camera)
                        animationId = requestAnimationFrame(animate)
                        animationIdRef.current = animationId
                    } catch (error) {
                        console.warn('Three.js render error:', error)
                        return
                    }
                }

                // 启动动画
                animate()
            } catch (error) {
                console.warn('3D初始化失败:', error)
            }
        }, 100)

        // 清理函数
        return () => {
            clearTimeout(initTimer)

            if (animationId) {
                cancelAnimationFrame(animationId)
            }
            if (animationIdRef.current) {
                cancelAnimationFrame(animationIdRef.current)
                animationIdRef.current = null
            }

            // 完整资源清理
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

            cameraRef.current = null
        }
    }, [forceReload]) // 依赖forceReload，确保重新初始化

    return (
        <div
            ref={mountRef}
            style={{
                width: '100%',
                height: '200px', // 减小高度，适配小容器
                position: 'relative',
                zIndex: 1
            }}
        />
    )
} 