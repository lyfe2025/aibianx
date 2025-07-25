'use client'

import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { useThemeStore } from '@/stores'

/**
 * 全局3D背景组件 - GlobalBackground3D
 * 
 * 设计理念：遍布全站的淡淡背景装饰，不干扰主要内容
 * - 神经网络节点和连接线
 * - 简洁的粒子效果
 * - 缓慢优雅的动画
 * - 简洁的AI主题元素
 * - 完美融入所有页面背景
 * - 自适应页面高度和滚动
 */
export function GlobalBackground3D() {
    const mountRef = useRef<HTMLDivElement>(null)
    const animationIdRef = useRef<number | null>(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const { theme } = useThemeStore()
    const [containerOpacity, setContainerOpacity] = useState(theme === 'light' ? 0.05 : 0.9)
    
    // 用于平滑过渡的透明度状态
    const targetOpacityRef = useRef({
        nodes: theme === 'light' ? 0.008 : 0.15,
        lines: theme === 'light' ? 0.004 : 0.08,
        particles: theme === 'light' ? 0.02 : 0.6,
        container: theme === 'light' ? 0.05 : 0.9
    })
    const currentOpacityRef = useRef({
        nodes: theme === 'light' ? 0.008 : 0.15,
        lines: theme === 'light' ? 0.004 : 0.08,
        particles: theme === 'light' ? 0.02 : 0.6,
        container: theme === 'light' ? 0.05 : 0.9
    })

    useEffect(() => {
        if (!mountRef.current) return

        // 创建场景
        const scene = new THREE.Scene()

        // 创建相机 - 适配全页面视野
        const camera = new THREE.PerspectiveCamera(
            75, // 宽视野角度，覆盖整个页面
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        )
        camera.position.z = 30 // 更远距离，看到完整的3D效果

        // 创建渲染器
        const renderer = new THREE.WebGLRenderer({
            alpha: true,
            antialias: true
        })
        renderer.setSize(window.innerWidth, window.innerHeight)
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5)) // 性能优化
        renderer.setClearColor(0x000000, 0)
        mountRef.current.appendChild(renderer.domElement)

        // === 创建全页面AI装饰元素 ===

                // 1. 神经网络节点 (50个，遍布整个页面和滚动区域)
        const nodes: THREE.Mesh[] = []
        
        for (let i = 0; i < 50; i++) {
            const nodeGeometry = new THREE.SphereGeometry(0.08, 12, 12)
            const nodeMaterial = new THREE.MeshBasicMaterial({
                color: 0x3B82F6,
                transparent: true,
                opacity: currentOpacityRef.current.nodes
            })
            const node = new THREE.Mesh(nodeGeometry, nodeMaterial)

            // 遍布整个页面空间，包括垂直滚动区域
            node.position.x = (Math.random() - 0.5) * 60  // 更大X轴范围，覆盖页面宽度
            node.position.y = (Math.random() - 0.5) * 80  // 大Y轴范围，覆盖滚动高度
            node.position.z = (Math.random() - 0.5) * 30  // Z轴范围

            scene.add(node)
            nodes.push(node)
        }

                // 2. 连接线系统 (适度增加，覆盖更多区域)
        const connections: THREE.Line[] = []
        
        // 创建随机连接线，连接附近的节点
        for (let i = 0; i < Math.min(15, nodes.length - 1); i++) {
            const startNode = nodes[i]
            const endNode = nodes[i + Math.floor(Math.random() * 5) + 1] || nodes[i + 1]

            if (startNode && endNode && startNode.position.distanceTo(endNode.position) < 20) {
                const lineGeometry = new THREE.BufferGeometry()
                const points = [startNode.position.clone(), endNode.position.clone()]
                lineGeometry.setFromPoints(points)

                const lineMaterial = new THREE.LineBasicMaterial({
                    color: 0x8B5CF6,
                    transparent: true,
                    opacity: currentOpacityRef.current.lines
                })

                const line = new THREE.Line(lineGeometry, lineMaterial)
                scene.add(line)
                connections.push(line)
            }
        }

        // 3. 创建粒子系统 (300个，确保全程可见)
        const particleCount = 300
        const particleGeometry = new THREE.BufferGeometry()
        const positions = new Float32Array(particleCount * 3)
        const colors = new Float32Array(particleCount * 3)
        const initialPositions = new Float32Array(particleCount * 3) // 保存初始相对位置

        // 计算相机FOV可见范围：FOV=75度，距离Z=30，可见Y范围≈±23
        const cameraDistance = 30
        const fovRadians = (75 * Math.PI) / 180
        const visibleHeight = 2 * Math.tan(fovRadians / 2) * cameraDistance // ≈46
        const visibleWidth = visibleHeight * (window.innerWidth / window.innerHeight)

        for (let i = 0; i < particleCount; i++) {
            // 严格控制在相机可见范围内，留出安全边距
            const safeMargin = 0.8 // 80%的可见范围，确保边缘粒子也能看到
            initialPositions[i * 3] = (Math.random() - 0.5) * visibleWidth * safeMargin      // X轴：严格按可见宽度
            initialPositions[i * 3 + 1] = (Math.random() - 0.5) * visibleHeight * safeMargin  // Y轴：严格按可见高度  
            initialPositions[i * 3 + 2] = (Math.random() - 0.5) * 20  // Z轴：相机前方分布

            // 初始位置 = 相对位置
            positions[i * 3] = initialPositions[i * 3]
            positions[i * 3 + 1] = initialPositions[i * 3 + 1]
            positions[i * 3 + 2] = initialPositions[i * 3 + 2]

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
            size: 0.2, // 进一步增大粒子尺寸
            vertexColors: true,
            transparent: true,
            opacity: currentOpacityRef.current.particles,
            blending: THREE.AdditiveBlending,
            sizeAttenuation: false // 禁用距离衰减
        })

        const particles = new THREE.Points(particleGeometry, particleMaterial)
        scene.add(particles)

        // === 缓慢的动画循环 ===
        let time = 0
        const animate = () => {
            time += 0.008 // 更慢的时间增长，适合全页面背景

            // 平滑过渡透明度
            const lerpFactor = 0.02 // 过渡速度，越小越平滑
            currentOpacityRef.current.nodes = THREE.MathUtils.lerp(
                currentOpacityRef.current.nodes, 
                targetOpacityRef.current.nodes, 
                lerpFactor
            )
            currentOpacityRef.current.lines = THREE.MathUtils.lerp(
                currentOpacityRef.current.lines, 
                targetOpacityRef.current.lines, 
                lerpFactor
            )
            currentOpacityRef.current.particles = THREE.MathUtils.lerp(
                currentOpacityRef.current.particles, 
                targetOpacityRef.current.particles, 
                lerpFactor
            )
            currentOpacityRef.current.container = THREE.MathUtils.lerp(
                currentOpacityRef.current.container, 
                targetOpacityRef.current.container, 
                lerpFactor
            )

            // 更新容器透明度
            setContainerOpacity(currentOpacityRef.current.container)

            // 节点轻微脉冲动画和透明度更新
            nodes.forEach((node, index) => {
                const pulse = 1 + Math.sin(time * 1.5 + index) * 0.15
                node.scale.setScalar(pulse)

                // 轻微的浮动
                node.position.y += Math.sin(time * 0.8 + index) * 0.004
                node.position.x += Math.cos(time * 0.5 + index) * 0.002

                // 更新节点透明度
                const material = node.material as THREE.MeshBasicMaterial
                material.opacity = currentOpacityRef.current.nodes
            })

            // 连接线轻微透明度变化
            connections.forEach((line, index) => {
                const baseOpacity = currentOpacityRef.current.lines
                const variance = baseOpacity * 0.3 // 相对变化
                const opacity = baseOpacity + Math.sin(time * 1.0 + index) * variance
                const material = line.material as THREE.LineBasicMaterial
                material.opacity = Math.max(baseOpacity * 0.2, opacity)
            })

            // 粒子动态飘动（相对于初始位置）
            const positions = particles.geometry.attributes.position.array as Float32Array
            for (let i = 0; i < positions.length; i += 3) {
                // 基于初始位置进行飘动，而不是累积移动
                const index = Math.floor(i / 3)
                positions[i] = initialPositions[i] + Math.cos(time * 0.3 + index) * 0.5      // X轴飘动
                positions[i + 1] = initialPositions[i + 1] + Math.sin(time * 0.5 + index) * 0.8  // Y轴飘动
                positions[i + 2] = initialPositions[i + 2] + Math.sin(time * 0.2 + index) * 0.3  // Z轴飘动
            }
            particles.geometry.attributes.position.needsUpdate = true

            // 更新粒子透明度
            const particlesMaterial = particles.material as THREE.PointsMaterial
            particlesMaterial.opacity = currentOpacityRef.current.particles

            // 整体轻微旋转
            particles.rotation.y += 0.001
            particles.rotation.x += 0.0005

            renderer.render(scene, camera)
            animationIdRef.current = requestAnimationFrame(animate)
        }

        // 响应式处理 - 适配窗口大小变化
        const handleResize = () => {
            if (!mountRef.current || !renderer) return

            const width = window.innerWidth
            const height = window.innerHeight

            camera.aspect = width / height
            camera.updateProjectionMatrix()
            renderer.setSize(width, height)
        }

        // 滚动处理 - 动态更新粒子云位置，确保始终可见
        const handleScroll = () => {
            const scrollY = window.scrollY
            const scrollRatio = scrollY / (document.documentElement.scrollHeight - window.innerHeight || 1)

            // 相机移动范围扩大到覆盖整个页面高度
            camera.position.y = (scrollRatio - 0.5) * 50 // 从-25移动到+25，覆盖更大范围
            camera.rotation.x = scrollRatio * 0.15 // 增强旋转效果

            // Z轴适度调整
            camera.position.z = 30 + scrollRatio * 8 // 从30移动到38

            // 关键：动态更新粒子云位置，让粒子跟随相机
            const positions = particles.geometry.attributes.position.array as Float32Array
            for (let i = 0; i < particleCount; i++) {
                // 粒子在相机周围重新分布，确保始终可见
                const baseY = camera.position.y // 以相机Y位置为中心
                const offsetY = initialPositions[i * 3 + 1] // 相对偏移

                // 更新Y轴位置：相机位置 + 相对偏移
                positions[i * 3 + 1] = baseY + offsetY
            }
            particles.geometry.attributes.position.needsUpdate = true
        }

        window.addEventListener('resize', handleResize)
        window.addEventListener('scroll', handleScroll, { passive: true })

        // 启动动画
        animate()
        setIsLoaded(true)

        // 清理函数
        return () => {
            window.removeEventListener('resize', handleResize)
            window.removeEventListener('scroll', handleScroll)

            if (animationIdRef.current) {
                cancelAnimationFrame(animationIdRef.current)
            }

            if (mountRef.current && renderer.domElement) {
                mountRef.current.removeChild(renderer.domElement)
            }

            scene.clear()
            renderer.dispose()
        }
    }, [])

    // 单独处理主题变化，只更新目标透明度
    useEffect(() => {
        targetOpacityRef.current = {
            nodes: theme === 'light' ? 0.008 : 0.15,
            lines: theme === 'light' ? 0.004 : 0.08,
            particles: theme === 'light' ? 0.02 : 0.6,
            container: theme === 'light' ? 0.05 : 0.9
        }
    }, [theme])

    return (
        <div
            ref={mountRef}
            style={{
                position: 'fixed', // 固定定位，覆盖整个视口
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                zIndex: -10, // 确保在所有页面内容之下（LayoutController的main有zIndex:1）
                pointerEvents: 'none', // 不干扰用户交互
                opacity: containerOpacity,
                transition: 'opacity 0.6s ease' // 平滑的透明度过渡
            }}
        />
    )
}

// 保留原有的HeroBackground3D组件用于首页Hero区域
export function HeroBackground3D() {
    const mountRef = useRef<HTMLDivElement>(null)
    const animationIdRef = useRef<number | null>(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const { theme } = useThemeStore()
    // 添加强制重新初始化状态
    const [forceReload, setForceReload] = useState(0)
    const sceneRef = useRef<THREE.Scene | null>(null)
    const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
    const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)
    
    // 用于平滑过渡的透明度状态
    const targetHeroOpacityRef = useRef({
        nodes: theme === 'light' ? 0.01 : 0.3,
        lines: theme === 'light' ? 0.005 : 0.2,
        particles: theme === 'light' ? 0.015 : 0.25
    })
    const currentHeroOpacityRef = useRef({
        nodes: theme === 'light' ? 0.01 : 0.3,
        lines: theme === 'light' ? 0.005 : 0.2,
        particles: theme === 'light' ? 0.015 : 0.25
    })

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
                75, // 更大视野角度，覆盖整个首屏
                mountRef.current.clientWidth / mountRef.current.clientHeight,
                0.1,
                1000
            )
            camera.position.z = 25 // 更远距离，看到完整的3D效果
            cameraRef.current = camera

            // 创建渲染器
            const renderer = new THREE.WebGLRenderer({
                alpha: true,
                antialias: true,
                preserveDrawingBuffer: false, // 添加这个选项优化性能
                powerPreference: "high-performance"
            })

            // 检查WebGL是否可用
            if (!renderer.getContext()) {
                console.warn('WebGL not available, falling back to basic rendering')
                setIsLoaded(true)
                return
            }

            renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight)
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5)) // 性能优化
            renderer.setClearColor(0x000000, 0)

            // 确保DOM元素存在再添加
            if (mountRef.current) {
                mountRef.current.appendChild(renderer.domElement)
                rendererRef.current = renderer
            } else {
                renderer.dispose()
                return
            }

            // === 创建简洁的AI装饰元素 ===

            // 1. 神经网络节点 (18个，遍布整个首屏)
            const nodes: THREE.Mesh[] = []
            
            for (let i = 0; i < 18; i++) {
                const nodeGeometry = new THREE.SphereGeometry(0.12, 12, 12)
                const nodeMaterial = new THREE.MeshBasicMaterial({
                    color: 0x3B82F6,
                    transparent: true,
                    opacity: currentHeroOpacityRef.current.nodes
                })
                const node = new THREE.Mesh(nodeGeometry, nodeMaterial)

                // 遍布整个首屏，包括上下左右
                node.position.x = (Math.random() - 0.5) * 35  // 更大X轴范围
                node.position.y = (Math.random() - 0.5) * 20  // 适配100vh高度的Y轴范围
                node.position.z = (Math.random() - 0.5) * 15  // 更大Z轴范围

                scene.add(node)
                nodes.push(node)
            }

            // 2. 中心区域连接线 (只在中间区域显示)
            const connections: THREE.Line[] = []
            
            // 筛选出中心区域的节点 (Y轴在-6到+2之间，适配新的高度范围)
            const centerNodes = nodes.filter(node =>
                node.position.y > -6 && node.position.y < 2 &&
                Math.abs(node.position.x) < 15
            )

            // 在中心节点间创建连接线
            for (let i = 0; i < Math.min(6, centerNodes.length - 1); i++) {
                const startNode = centerNodes[i]
                const endNode = centerNodes[(i + 1) % centerNodes.length]

                if (startNode && endNode) {
                    const lineGeometry = new THREE.BufferGeometry()
                    const points = [startNode.position.clone(), endNode.position.clone()]
                    lineGeometry.setFromPoints(points)

                    const lineMaterial = new THREE.LineBasicMaterial({
                        color: 0x8B5CF6,
                        transparent: true,
                        opacity: currentHeroOpacityRef.current.lines
                    })

                    const line = new THREE.Line(lineGeometry, lineMaterial)
                    scene.add(line)
                    connections.push(line)
                }
            }

            // 3. 创建粒子系统
            const particleCount = 150
            const particleGeometry = new THREE.BufferGeometry()
            const positions = new Float32Array(particleCount * 3)
            const colors = new Float32Array(particleCount * 3)

            for (let i = 0; i < particleCount; i++) {
                // 遍布整个首屏空间，包括所有角落
                positions[i * 3] = (Math.random() - 0.5) * 45      // 更大X轴范围
                positions[i * 3 + 1] = (Math.random() - 0.5) * 25  // 适配100vh高度的Y轴范围
                positions[i * 3 + 2] = (Math.random() - 0.5) * 25  // 更大Z轴范围

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
                size: 0.08, // 稍大粒子尺寸，适配扩大的空间
                vertexColors: true,
                transparent: true,
                opacity: currentHeroOpacityRef.current.particles,
                blending: THREE.AdditiveBlending
            })

            const particles = new THREE.Points(particleGeometry, particleMaterial)
            scene.add(particles)

            // === 明显的动画循环 ===
            let time = 0
            const animate = () => {
                // 检查组件是否仍然挂载
                if (!mountRef.current || !sceneRef.current || !rendererRef.current) {
                    return
                }

                time += 0.02 // 明显的时间增长

                // 平滑过渡透明度
                const lerpFactor = 0.02
                currentHeroOpacityRef.current.nodes = THREE.MathUtils.lerp(
                    currentHeroOpacityRef.current.nodes, 
                    targetHeroOpacityRef.current.nodes, 
                    lerpFactor
                )
                currentHeroOpacityRef.current.lines = THREE.MathUtils.lerp(
                    currentHeroOpacityRef.current.lines, 
                    targetHeroOpacityRef.current.lines, 
                    lerpFactor
                )
                currentHeroOpacityRef.current.particles = THREE.MathUtils.lerp(
                    currentHeroOpacityRef.current.particles, 
                    targetHeroOpacityRef.current.particles, 
                    lerpFactor
                )

                // 节点明显脉冲动画和透明度更新
                nodes.forEach((node, index) => {
                    const pulse = 1 + Math.sin(time * 2 + index) * 0.3
                    node.scale.setScalar(pulse)

                    // 明显的浮动
                    node.position.y += Math.sin(time * 1.2 + index) * 0.008
                    node.position.x += Math.cos(time * 0.8 + index) * 0.005

                    // 更新节点透明度
                    const material = node.material as THREE.MeshBasicMaterial
                    material.opacity = currentHeroOpacityRef.current.nodes

                    // 定期的颜色变化
                    if (Math.random() > 0.98) {
                        material.color.setHex(Math.random() > 0.5 ? 0x3B82F6 : 0x8B5CF6)
                    }
                })

                // 连接线明显透明度变化
                connections.forEach((line, index) => {
                    const baseOpacity = currentHeroOpacityRef.current.lines
                    const opacity = baseOpacity + Math.sin(time * 1.5 + index) * (baseOpacity * 0.5)
                    const material = line.material as THREE.LineBasicMaterial
                    material.opacity = Math.max(baseOpacity * 0.2, opacity)
                })

                // 粒子明显飘动
                const positions = particles.geometry.attributes.position.array as Float32Array
                for (let i = 0; i < positions.length; i += 3) {
                    positions[i + 1] += Math.sin(time * 0.8 + i) * 0.01  // 明显Y轴浮动
                    positions[i] += Math.cos(time * 0.6 + i) * 0.008     // 明显X轴移动
                    positions[i + 2] += Math.sin(time * 0.4 + i) * 0.005 // Z轴微动
                }
                particles.geometry.attributes.position.needsUpdate = true

                // 更新粒子透明度
                const particlesMaterial = particles.material as THREE.PointsMaterial
                particlesMaterial.opacity = currentHeroOpacityRef.current.particles

                // 明显旋转
                particles.rotation.y += 0.004
                particles.rotation.x += 0.001

                try {
                    renderer.render(scene, camera)
                    animationIdRef.current = requestAnimationFrame(animate)
                } catch (error) {
                    console.warn('Three.js render error:', error)
                    // 渲染出错时停止动画
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
                nodes.forEach(node => {
                    if (node.geometry) node.geometry.dispose()
                    if (node.material) {
                        if (Array.isArray(node.material)) {
                            node.material.forEach(material => material.dispose())
                        } else {
                            node.material.dispose()
                        }
                    }
                })

                connections.forEach(line => {
                    if (line.geometry) line.geometry.dispose()
                    if (line.material) {
                        if (Array.isArray(line.material)) {
                            line.material.forEach(material => material.dispose())
                        } else {
                            line.material.dispose()
                        }
                    }
                })

                // 清理粒子系统资源
                if (particleGeometry) particleGeometry.dispose()
                if (particleMaterial) particleMaterial.dispose()
            }
        }, 100) // 延迟100ms确保DOM完全准备就绪

        // 清理计时器
        return () => {
            clearTimeout(initTimer)
        }
    }, [forceReload])

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
    }, [forceReload])

    // 单独处理主题变化，只更新目标透明度
    useEffect(() => {
        targetHeroOpacityRef.current = {
            nodes: theme === 'light' ? 0.01 : 0.3,
            lines: theme === 'light' ? 0.005 : 0.2,
            particles: theme === 'light' ? 0.015 : 0.25
        }
    }, [theme])

    return (
        <div
            ref={mountRef}
            style={{
                position: 'fixed', // 关键修复：使用fixed定位固定在视口
                top: 0,
                left: 0,
                width: '100vw', // 使用视口单位确保全屏覆盖
                height: '100vh', // 使用视口单位确保全屏覆盖
                zIndex: 2, // 在遮罩层之上，显示3D效果
                pointerEvents: 'none', // 不干扰用户交互
                opacity: isLoaded ? 0.9 : 0, // 提高透明度，让动画更明显
                transition: 'opacity 0.5s ease-in-out' // 平滑过渡效果
            }}
        />
    )
} 