// Grabyo Producer 多页面导航系统
document.addEventListener('DOMContentLoaded', function() {
    
    // 页面路由配置
    const pageRoutes = {
        'home': 'home.html',
        'producer': 'producer.html',
        'live-clipping': 'live-clipping.html',
        'editor': 'editor.html',
        'campaign': 'campaign.html',
        'organization': 'organization.html'
    };
    
    // 初始化页面导航
    function initNavigation() {
        const navItems = document.querySelectorAll('.nav-item[data-page]');
        
        navItems.forEach(item => {
            item.addEventListener('click', function() {
                const page = this.getAttribute('data-page');
                if (page && pageRoutes[page]) {
                    navigateToPage(page);
                }
            });
        });
    }
    
    // 页面导航函数
    function navigateToPage(page) {
        const currentPage = getCurrentPage();
        if (currentPage === page) return;
        
        // 更新导航状态
        updateNavigationState(page);
        
        // 导航到新页面
        window.location.href = pageRoutes[page];
    }
    
    // 获取当前页面
    function getCurrentPage() {
        const path = window.location.pathname;
        const filename = path.split('/').pop();
        
        for (const [page, route] of Object.entries(pageRoutes)) {
            if (route === filename) {
                return page;
            }
        }
        return 'producer'; // 默认页面
    }
    
    // 更新导航状态
    function updateNavigationState(activePage) {
        const navItems = document.querySelectorAll('.nav-item[data-page]');
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('data-page') === activePage) {
                item.classList.add('active');
            }
        });
    }
    
    // 初始化当前页面的导航状态
    function initCurrentPageState() {
        const currentPage = getCurrentPage();
        updateNavigationState(currentPage);
    }
    
    // 初始化所有功能
    function initAllFeatures() {
        initNavigation();
        initCurrentPageState();
        
        // 根据当前页面初始化特定功能
        const currentPage = getCurrentPage();
        switch(currentPage) {
            case 'home':
                initHomePage();
                break;
            case 'producer':
                initProducerPage();
                break;
            case 'live-clipping':
                initLiveClippingPage();
                break;
            case 'editor':
                initEditorPage();
                break;
            case 'campaign':
                initCampaignPage();
                break;
            case 'organization':
                initOrganizationPage();
                break;
        }
    }
    
    // 首页功能初始化
    function initHomePage() {
        console.log('初始化首页功能');
        
        // 统计卡片动画
        function animateStats() {
            const statCards = document.querySelectorAll('.stat-card');
            statCards.forEach(card => {
                card.addEventListener('mouseenter', function() {
                    this.style.transform = 'translateY(-5px)';
                });
                card.addEventListener('mouseleave', function() {
                    this.style.transform = 'translateY(0)';
                });
            });
        }
        
        // 团队状态更新
        function updateTeamStatus() {
            const statusDots = document.querySelectorAll('.status-dot');
            statusDots.forEach(dot => {
                if (Math.random() > 0.7) {
                    dot.style.opacity = '0.5';
                    setTimeout(() => {
                        dot.style.opacity = '1';
                    }, 1000);
                }
            });
        }
        
        animateStats();
        setInterval(updateTeamStatus, 5000);
    }
    
    // 制作人页面功能初始化
    function initProducerPage() {
        console.log('初始化制作人页面功能');
        
        // 音频电平动画
        function animateAudioMeters() {
            const meterBars = document.querySelectorAll('.meter-bar');
            meterBars.forEach(bar => {
                const randomHeight = Math.random() * 100;
                bar.style.height = randomHeight + '%';
            });
        }
        
        // CPU使用率动画
        function updateCPUUsage() {
            const cpuFill = document.querySelector('.cpu-fill');
            const cpuPercent = document.querySelector('.cpu-percent');
            if (cpuFill && cpuPercent) {
                const randomUsage = Math.random() * 50 + 10;
                cpuFill.style.width = randomUsage + '%';
                cpuPercent.textContent = randomUsage.toFixed(2) + '%';
            }
        }
        
        // 倒计时功能
        function startCountdown() {
            const countdownElement = document.querySelector('.countdown');
            if (!countdownElement) return;
            
            let timeLeft = 11;
            const countdownInterval = setInterval(() => {
                const minutes = Math.floor(timeLeft / 60);
                const seconds = timeLeft % 60;
                const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}:00`;
                
                countdownElement.textContent = formattedTime;
                timeLeft--;
                
                if (timeLeft < 0) {
                    clearInterval(countdownInterval);
                    countdownElement.textContent = '00:00:00';
                }
            }, 1000);
        }
        
        // 每100ms更新一次音频电平
        setInterval(animateAudioMeters, 100);
        // 每2秒更新一次CPU使用率
        setInterval(updateCPUUsage, 2000);
        // 启动倒计时
        startCountdown();
        
        // 资源缩略图交互
        const assetThumbnails = document.querySelectorAll('.asset-thumbnail');
        assetThumbnails.forEach(thumbnail => {
            thumbnail.addEventListener('click', function() {
                assetThumbnails.forEach(t => t.classList.remove('selected'));
                this.classList.add('selected');
            });
        });
    }
    
    // 实时剪辑页面功能初始化
    function initLiveClippingPage() {
        console.log('初始化实时剪辑页面功能');
        
        // 视频源选择
        const sourceItems = document.querySelectorAll('.source-item');
        sourceItems.forEach(item => {
            item.addEventListener('click', function() {
                sourceItems.forEach(s => s.classList.remove('active'));
                this.classList.add('active');
            });
        });
        
        // 剪辑控制
        const clipButtons = document.querySelectorAll('.clip-btn');
        clipButtons.forEach(button => {
            button.addEventListener('click', function() {
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 150);
            });
        });
        
        // 时间轴交互
        const timelineClips = document.querySelectorAll('.clip-item');
        timelineClips.forEach(clip => {
            clip.addEventListener('click', function() {
                timelineClips.forEach(c => c.classList.remove('selected'));
                this.classList.add('selected');
            });
        });
        
        // 搜索功能
        const searchInput = document.querySelector('.search-input');
        if (searchInput) {
            searchInput.addEventListener('input', function() {
                const searchTerm = this.value.toLowerCase();
                const clips = document.querySelectorAll('.clip-card');
                
                clips.forEach(clip => {
                    const clipText = clip.textContent.toLowerCase();
                    if (clipText.includes(searchTerm)) {
                        clip.style.display = 'block';
                    } else {
                        clip.style.display = 'none';
                    }
                });
            });
        }
    }
    
    // 编辑器页面功能初始化
    function initEditorPage() {
        console.log('初始化编辑器页面功能');
        
        // 媒体库标签切换
        const mediaTabs = document.querySelectorAll('.media-tab');
        mediaTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                mediaTabs.forEach(t => t.classList.remove('active'));
                this.classList.add('active');
            });
        });
        
        // 效果库交互
        const effectItems = document.querySelectorAll('.effect-item');
        effectItems.forEach(item => {
            item.addEventListener('click', function() {
                this.style.backgroundColor = '#ff4444';
                setTimeout(() => {
                    this.style.backgroundColor = '#2d3139';
                }, 200);
            });
        });
        
        // 属性面板标签切换
        const panelTabs = document.querySelectorAll('.panel-tab');
        panelTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                panelTabs.forEach(t => t.classList.remove('active'));
                this.classList.add('active');
            });
        });
        
        // 滑块值更新
        const sliders = document.querySelectorAll('.slider');
        sliders.forEach(slider => {
            slider.addEventListener('input', function() {
                const valueSpan = this.parentNode.querySelector('.slider-value');
                if (valueSpan) {
                    if (this.name === 'transparency') {
                        valueSpan.textContent = this.value + '%';
                    } else if (this.name === 'rotation') {
                        valueSpan.textContent = this.value + '°';
                    }
                }
            });
        });
        
        // 时间轴轨道交互
        const trackClips = document.querySelectorAll('.track-clip');
        trackClips.forEach(clip => {
            clip.addEventListener('click', function() {
                trackClips.forEach(c => c.classList.remove('selected'));
                this.classList.add('selected');
            });
        });
    }
    
    // 活动管理页面功能初始化
    function initCampaignPage() {
        console.log('初始化活动管理页面功能');
        
        // 活动卡片交互
        const campaignCards = document.querySelectorAll('.campaign-card');
        campaignCards.forEach(card => {
            card.addEventListener('click', function() {
                campaignCards.forEach(c => c.classList.remove('selected'));
                this.classList.add('selected');
            });
        });
        
        // 搜索功能
        const searchInput = document.querySelector('.search-box input');
        if (searchInput) {
            searchInput.addEventListener('input', function() {
                const searchTerm = this.value.toLowerCase();
                const cards = document.querySelectorAll('.campaign-card');
                
                cards.forEach(card => {
                    const cardText = card.textContent.toLowerCase();
                    if (cardText.includes(searchTerm)) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        }
        
        // 视图切换
        const viewButtons = document.querySelectorAll('.view-btn');
        viewButtons.forEach(button => {
            button.addEventListener('click', function() {
                viewButtons.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
            });
        });
        
        // 分页功能
        const paginationButtons = document.querySelectorAll('.pagination-btn');
        paginationButtons.forEach(button => {
            button.addEventListener('click', function() {
                if (!this.disabled) {
                    paginationButtons.forEach(b => b.classList.remove('active'));
                    this.classList.add('active');
                }
            });
        });
    }
    
    // 组织管理页面功能初始化
    function initOrganizationPage() {
        console.log('初始化组织管理页面功能');
        
        // 团队成员交互
        const teamMembers = document.querySelectorAll('.team-member');
        teamMembers.forEach(member => {
            member.addEventListener('click', function() {
                teamMembers.forEach(m => m.classList.remove('selected'));
                this.classList.add('selected');
            });
        });
        
        // 角色权限交互
        const roleItems = document.querySelectorAll('.role-item');
        roleItems.forEach(item => {
            item.addEventListener('click', function() {
                roleItems.forEach(r => r.classList.remove('selected'));
                this.classList.add('selected');
            });
        });
        
        // 设置项编辑
        const editButtons = document.querySelectorAll('.edit-btn');
        editButtons.forEach(button => {
            button.addEventListener('click', function() {
                const settingItem = this.closest('.setting-item');
                const settingInfo = settingItem.querySelector('.setting-info p');
                
                // 简单的编辑功能演示
                const newValue = prompt('请输入新值:', settingInfo.textContent);
                if (newValue !== null) {
                    settingInfo.textContent = newValue;
                }
            });
        });
        
        // 搜索团队成员
        const memberSearchInput = document.querySelector('.search-box input');
        if (memberSearchInput) {
            memberSearchInput.addEventListener('input', function() {
                const searchTerm = this.value.toLowerCase();
                const members = document.querySelectorAll('.team-member');
                
                members.forEach(member => {
                    const memberText = member.textContent.toLowerCase();
                    if (memberText.includes(searchTerm)) {
                        member.style.display = 'flex';
                    } else {
                        member.style.display = 'none';
                    }
                });
            });
        }
    }
    
    // 通用功能
    function initCommonFeatures() {
        // 标签页切换
        const tabs = document.querySelectorAll('.tab');
        tabs.forEach(tab => {
            tab.addEventListener('click', function() {
                tabs.forEach(t => t.classList.remove('active'));
                this.classList.add('active');
            });
        });
        
        // 按钮点击效果
        const buttons = document.querySelectorAll('button');
        buttons.forEach(button => {
            button.addEventListener('click', function() {
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 150);
            });
        });
        
        // 输入框焦点效果
        const inputs = document.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('focus', function() {
                this.style.borderColor = '#ff4444';
            });
            input.addEventListener('blur', function() {
                this.style.borderColor = '#3a3f4b';
            });
        });
    }
    
    // 添加CSS动画
    function addDynamicStyles() {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
            
            .asset-thumbnail.selected,
            .campaign-card.selected,
            .team-member.selected,
            .role-item.selected,
            .clip-item.selected,
            .track-clip.selected {
                border-color: #ff4444;
                box-shadow: 0 0 10px rgba(255, 68, 68, 0.3);
            }
            
            .stat-card {
                transition: transform 0.2s;
            }
            
            .campaign-card {
                transition: all 0.2s;
            }
            
            .team-member {
                transition: all 0.2s;
            }
            
            .role-item {
                transition: all 0.2s;
            }
            
            .clip-item {
                transition: all 0.2s;
            }
            
            .track-clip {
                transition: all 0.2s;
            }
            
            button {
                transition: all 0.2s;
            }
            
            input, select, textarea {
                transition: border-color 0.2s;
            }
        `;
        document.head.appendChild(style);
    }
    
    // 启动所有功能
    initAllFeatures();
    initCommonFeatures();
    addDynamicStyles();
    
    console.log('Grabyo Producer 系统初始化完成');
});