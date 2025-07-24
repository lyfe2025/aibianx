'use client'

import React, { useEffect, useRef } from 'react'
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

    useEffect(() => {
        if (!mountRef.current) return

        // === Three.js 场景初始化 ===
        const scene = new THREE.Scene()

        // 创建相机 - 适合大脑模型的视角
        const camera = new THREE.PerspectiveCamera(
            75, // 增加视野角度，确保所有3D元素都在视野内
            mountRef.current.clientWidth / mountRef.current.clientHeight,
            0.1,
            1000
        )
        camera.position.set(0, 4, 12) // 拉远距离并提高视角，确保完整显示所有3D元素

        // 创建渲染器
        const renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true, // 透明背景
            powerPreference: "high-performance"
        })
        renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight)
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        mountRef.current.appendChild(renderer.domElement)

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
            ;(cube as any).originalPosition = cube.position.clone()
            ;(cube as any).rotationSpeed = { 
                x: (Math.random() - 0.5) * 0.02, 
                y: (Math.random() - 0.5) * 0.02, 
                z: (Math.random() - 0.5) * 0.02 
            }
            ;(cube as any).floatOffset = Math.random() * Math.PI * 2
            
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
        ;(wireframeCube as any).rotationSpeed = { x: 0.005, y: 0.008, z: 0.003 }
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
            ;(sphere as any).originalPosition = sphere.position.clone()
            ;(sphere as any).floatOffset = Math.random() * Math.PI * 2
            ;(sphere as any).floatSpeed = 0.01 + Math.random() * 0.01
            ;(sphere as any).orbitRadius = 0.3 + Math.random() * 0.2
            
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

        // === 动画循环 ===
        let animationId: number
        let time = 0

        const animate = () => {
            time += 0.01

            // 1. 主群组轻微旋转 - GitHub风格的subtle动画
            mainGroup.rotation.y = time * 0.1

            // 2. 立方体动画 - 个体旋转和浮动
            geometryElements.forEach((element, index) => {
                if (element.geometry.type === 'BoxGeometry') {
                    // 立方体缓慢自转
                    const rotSpeed = (element as any).rotationSpeed
                    element.rotation.x += rotSpeed.x
                    element.rotation.y += rotSpeed.y
                    element.rotation.z += rotSpeed.z
                    
                    // 轻微浮动
                    const floatOffset = (element as any).floatOffset
                    const originalPos = (element as any).originalPosition
                    const floatAmount = Math.sin(time * 0.8 + floatOffset) * 0.1
                    element.position.y = originalPos.y + floatAmount
                    
                    // 透明度变化
                    const material = element.material as THREE.MeshBasicMaterial
                    const baseOpacity = material.opacity
                    const opacityVariation = Math.sin(time * 1.2 + floatOffset) * 0.05
                    material.opacity = Math.max(0.05, baseOpacity + opacityVariation)
                }
                
                if (element.geometry.type === 'SphereGeometry') {
                    // 球体轨道运动
                    const originalPos = (element as any).originalPosition
                    const floatOffset = (element as any).floatOffset
                    const floatSpeed = (element as any).floatSpeed
                    const orbitRadius = (element as any).orbitRadius
                    
                    // 绕原位置轨道运动
                    const orbitAngle = time * floatSpeed + floatOffset
                    element.position.x = originalPos.x + Math.cos(orbitAngle) * orbitRadius
                    element.position.z = originalPos.z + Math.sin(orbitAngle) * orbitRadius
                    element.position.y = originalPos.y + Math.sin(time * 1.5 + floatOffset) * 0.15
                    
                    // 球体呼吸效果
                    const breathe = 1 + Math.sin(time * 2 + floatOffset) * 0.1
                    element.scale.setScalar(breathe)
                }
            })

            // 3. 线框立方体动画
            const rotSpeed = (wireframeCube as any).rotationSpeed
            wireframeCube.rotation.x += rotSpeed.x
            wireframeCube.rotation.y += rotSpeed.y
            wireframeCube.rotation.z += rotSpeed.z
            
            // 线框透明度变化
            const wireframeMaterial = wireframeCube.material as THREE.MeshBasicMaterial
            wireframeMaterial.opacity = 0.3 + Math.sin(time * 1.5) * 0.1

            // 4. 连接线动画 - 已移除
            // connections.forEach((connection, index) => {
            //     const material = connection.material as THREE.LineBasicMaterial
            //     const opacity = 0.2 + Math.sin(time * 2 + index * 0.5) * 0.1
            //     material.opacity = Math.max(0.05, opacity)
            // })

            // 5. 网格效果
            gridHelper.rotation.y = time * 0.05
            const gridMaterial = gridHelper.material as THREE.MeshBasicMaterial
            gridMaterial.opacity = 0.1 + Math.sin(time * 0.8) * 0.03

            // 渲染场景
            renderer.render(scene, camera)
            animationId = requestAnimationFrame(animate)
        }

        animate()

        // 响应式处理
        const handleResize = () => {
            if (mountRef.current) {
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
            cancelAnimationFrame(animationId)

            // 清理Three.js资源
            scene.clear()
            renderer.dispose()

            // 清理几何体和材质
            geometryElements.forEach(element => {
                element.geometry.dispose()
                ;(element.material as THREE.Material).dispose()
            })
            // connections.forEach(connection => {
            //     connection.geometry.dispose()
            //     ;(connection.material as THREE.Material).dispose()
            // })
            wireframeCube.geometry.dispose()
            ;(wireframeCube.material as THREE.Material).dispose()
            gridHelper.geometry.dispose()
            ;(gridHelper.material as THREE.Material).dispose()

            if (mountRef.current && renderer.domElement) {
                mountRef.current.removeChild(renderer.domElement)
            }
        }
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