// 交互功能实现
document.addEventListener('DOMContentLoaded', function() {
    // 获取DOM元素
    const speedControl = document.getElementById('speedControl');
    const colorControl = document.getElementById('colorControl');
    const resetBtn = document.getElementById('resetBtn');
    const particles = document.getElementById('particles');
    const rotatingRing = document.querySelector('.rotating-ring');
    const glowingCore = document.querySelector('.glowing-core');
    
    // 初始化变量
    let currentSpeed = 5;
    let currentColorTheme = 1;
    
    // 速度控制事件监听
    speedControl.addEventListener('input', function() {
        currentSpeed = parseInt(this.value);
        updateAnimations();
    });
    
    // 颜色主题控制事件监听
    colorControl.addEventListener('input', function() {
        currentColorTheme = parseInt(this.value);
        updateColorTheme();
    });
    
    // 重置按钮事件监听
    resetBtn.addEventListener('click', function() {
        speedControl.value = 5;
        colorControl.value = 1;
        currentSpeed = 5;
        currentColorTheme = 1;
        updateAnimations();
        updateColorTheme();
    });
    
    // 更新动画速度函数
    function updateAnimations() {
        const speedFactor = currentSpeed / 5;
        
        // 更新粒子动画速度
        const particleElements = document.querySelectorAll('.particle');
        particleElements.forEach(particle => {
            const currentDuration = parseFloat(
                getComputedStyle(particle).animationDuration
            );
            const baseDuration = currentDuration * (5 / currentSpeed);
            particle.style.animationDuration = `${baseDuration / speedFactor}s`;
        });
        
        // 更新旋转环动画速度
        const ringAnimation = getComputedStyle(rotatingRing).animation;
        rotatingRing.style.animation = ringAnimation.replace(/\d+s/, `${4 / speedFactor}s`);
        
        // 更新核心脉冲动画速度
        const coreAnimation = getComputedStyle(glowingCore).animation;
        glowingCore.style.animation = coreAnimation.replace(/\d+s/, `${2 / speedFactor}s`);
    }
    
    // 更新颜色主题函数
    function updateColorTheme() {
        const root = document.documentElement;
        
        switch(currentColorTheme) {
            case 1: // 默认主题
                root.style.setProperty('--primary-color', '#ff6b6b');
                root.style.setProperty('--secondary-color', '#ffd93d');
                root.style.setProperty('--accent-color', '#6bcf7f');
                break;
            case 2: // 蓝色主题
                root.style.setProperty('--primary-color', '#4dabf7');
                root.style.setProperty('--secondary-color', '#339af0');
                root.style.setProperty('--accent-color', '#228be6');
                break;
            case 3: // 紫色主题
                root.style.setProperty('--primary-color', '#b266ff');
                root.style.setProperty('--secondary-color', '#9c36b5');
                root.style.setProperty('--accent-color', '#8a2be2');
                break;
        }
        
        // 更新粒子颜色
        updateParticleColors();
    }
    
    // 更新粒子颜色函数
    function updateParticleColors() {
        const particles = document.querySelectorAll('.particle');
        const colors = getColorScheme();
        
        particles.forEach((particle, index) => {
            particle.style.background = colors[index % colors.length];
        });
    }
    
    // 获取颜色方案函数
    function getColorScheme() {
        switch(currentColorTheme) {
            case 1:
                return [
                    'rgba(255, 107, 107, 0.8)',
                    'rgba(255, 217, 61, 0.8)',
                    'rgba(107, 207, 127, 0.8)',
                    'rgba(77, 171, 247, 0.8)',
                    'rgba(178, 102, 255, 0.8)'
                ];
            case 2:
                return [
                    'rgba(77, 171, 247, 0.8)',
                    'rgba(51, 154, 240, 0.8)',
                    'rgba(34, 139, 230, 0.8)',
                    'rgba(107, 207, 127, 0.8)',
                    'rgba(255, 217, 61, 0.8)'
                ];
            case 3:
                return [
                    'rgba(178, 102, 255, 0.8)',
                    'rgba(156, 54, 181, 0.8)',
                    'rgba(138, 43, 226, 0.8)',
                    'rgba(255, 107, 107, 0.8)',
                    'rgba(77, 171, 247, 0.8)'
                ];
            default:
                return [
                    'rgba(255, 107, 107, 0.8)',
                    'rgba(255, 217, 61, 0.8)',
                    'rgba(107, 207, 127, 0.8)',
                    'rgba(77, 171, 247, 0.8)',
                    'rgba(178, 102, 255, 0.8)'
                ];
        }
    }
    
    // 鼠标交互效果
    artContainer.addEventListener('mousemove', function(e) {
        const particles = document.querySelectorAll('.particle');
        const rect = artContainer.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        
        particles.forEach(particle => {
            const speed = parseInt(particle.style.animationDuration || 8);
            particle.style.transform = `translate(${x / 10}px, ${y / 10}px)`;
        });
    });
    
    // 初始化颜色变量
    document.documentElement.style.setProperty('--primary-color', '#ff6b6b');
    document.documentElement.style.setProperty('--secondary-color', '#ffd93d');
    document.documentElement.style.setProperty('--accent-color', '#6bcf7f');
    
    // 初始化页面
    updateAnimations();
    updateColorTheme();
});