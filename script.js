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
        // 更新左侧导航栏
        const navItems = document.querySelectorAll('.nav-item[data-page]');
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('data-page') === activePage) {
                item.classList.add('active');
            }
        });
        
        // 更新顶部tabs
        const topTabs = document.querySelectorAll('.top-center .tabs .tab[data-page]');
        topTabs.forEach(tab => {
            tab.classList.remove('active');
            if (tab.getAttribute('data-page') === activePage) {
                tab.classList.add('active');
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
        
        // 存储上传的素材
        let uploadedAssets = [];
        let activeLayers = {
            preview: [],
            program: []
        };
        
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
        
        // 文件上传功能
        function initFileUpload() {
            const uploadArea = document.getElementById('uploadArea');
            const fileInput = document.getElementById('fileInput');
            const assetsGrid = document.getElementById('assetsGrid');
            
            if (!uploadArea || !fileInput) return;
            
            // 点击上传区域
            uploadArea.addEventListener('click', () => {
                fileInput.click();
            });
            
            // 文件选择
            fileInput.addEventListener('change', (e) => {
                handleFiles(e.target.files);
            });
            
            // 拖拽上传
            uploadArea.addEventListener('dragover', (e) => {
                e.preventDefault();
                uploadArea.classList.add('dragover');
            });
            
            uploadArea.addEventListener('dragleave', () => {
                uploadArea.classList.remove('dragover');
            });
            
            uploadArea.addEventListener('drop', (e) => {
                e.preventDefault();
                uploadArea.classList.remove('dragover');
                handleFiles(e.dataTransfer.files);
            });
        }
        
        // 处理上传的文件
        function handleFiles(files) {
            Array.from(files).forEach(file => {
                const fileType = file.type.split('/')[0];
                if (fileType === 'video' || fileType === 'image' || fileType === 'audio') {
                    const reader = new FileReader();
                    
                    reader.onload = (e) => {
                        const asset = {
                            id: Date.now() + Math.random(),
                            name: file.name,
                            type: fileType,
                            url: e.target.result,
                            file: file
                        };
                        
                        uploadedAssets.push(asset);
                        addAssetToLibrary(asset);
                    };
                    
                    if (fileType === 'image') {
                        reader.readAsDataURL(file);
                    } else {
                        reader.readAsDataURL(file);
                    }
                }
            });
        }
        
        // 添加素材到资源库
        function addAssetToLibrary(asset) {
            const assetsGrid = document.getElementById('assetsGrid');
            if (!assetsGrid) return;
            
            const assetElement = document.createElement('div');
            assetElement.className = 'library-asset uploaded-asset';
            assetElement.dataset.assetId = asset.id;
            assetElement.draggable = true;
            
            let previewContent = '';
            if (asset.type === 'image') {
                previewContent = `<img src="${asset.url}" alt="${asset.name}" class="uploaded-asset-preview">`;
            } else if (asset.type === 'video') {
                previewContent = `<video src="${asset.url}" class="uploaded-asset-preview" muted></video>`;
            } else if (asset.type === 'audio') {
                previewContent = `<div class="uploaded-asset-preview" style="background: linear-gradient(45deg, #28a745, #20c997); display: flex; align-items: center; justify-content: center; color: white;"><i class="fas fa-music" style="font-size: 24px;"></i></div>`;
            }
            
            assetElement.innerHTML = `
                ${previewContent}
                <div class="asset-controls">
                    <i class="fas fa-play"></i>
                    <i class="fas fa-ellipsis-v"></i>
                </div>
                <div class="uploaded-asset-info">
                    <div class="uploaded-asset-name">${asset.name}</div>
                    <div class="uploaded-asset-type">${asset.type.toUpperCase()}</div>
                </div>
            `;
            
            // 点击素材添加到预览和默认layer（Layer 1）
            assetElement.addEventListener('click', () => {
                addAssetToPreview(asset);
                // 默认添加到Layer 1
                const layer1Content = document.querySelector('.layer-1 .layer-content');
                if (layer1Content) {
                    addAssetToLayer(asset, layer1Content, 1);
                }
            });
            
            assetsGrid.insertBefore(assetElement, assetsGrid.firstChild);
        }
        
        // 添加素材到预览（Preview 或 Program）
        function addAssetToPreview(asset, target = 'preview', syncToProgram = false) {
            const containerId = target === 'preview' ? 'previewLayers' : 'programLayers';
            const container = document.getElementById(containerId);
            if (!container) return;
            
            // 检查是否已存在
            const existing = container.querySelector(`[data-asset-id="${asset.id}"]`);
            if (existing && !syncToProgram) return;
            
            // 创建图层元素
            const layerElement = document.createElement('div');
            layerElement.className = 'layer-preview resizable';
            layerElement.dataset.assetId = asset.id;
            // z-index 会在 updateLayerOrder 中统一设置，确保后添加的素材在上层
            
            // 默认尺寸和位置
            layerElement.style.width = '60%';
            layerElement.style.height = '60%';
            layerElement.style.left = '20%';
            layerElement.style.top = '20%';
            
            if (asset.type === 'image') {
                const img = document.createElement('img');
                img.src = asset.url;
                img.className = 'layer-preview image';
                img.style.width = '100%';
                img.style.height = '100%';
                img.style.objectFit = 'contain';
                layerElement.appendChild(img);
            } else if (asset.type === 'video') {
                const video = document.createElement('video');
                video.src = asset.url;
                video.className = 'layer-preview video';
                video.autoplay = true;
                video.loop = true;
                video.muted = true;
                video.style.width = '100%';
                video.style.height = '100%';
                video.style.objectFit = 'contain';
                layerElement.appendChild(video);
            } else if (asset.type === 'audio') {
                // 音频不显示在预览中，但可以添加到图层列表
                return;
            }
            
            // 如果是preview，添加调整大小的控制点和拖拽移动功能
            if (target === 'preview') {
                addResizeHandles(layerElement, asset.id);
                addDragFunctionality(layerElement, asset.id);
            }
            
            container.appendChild(layerElement);
            activeLayers[target].push({
                id: asset.id,
                element: layerElement,
                asset: asset
            });
            
            // 更新图层顺序显示
            updateLayerOrder(target);
            
            // 如果添加到preview，同步到program
            if (target === 'preview' && !syncToProgram) {
                syncPreviewToProgram();
            }
        }
        
        // 添加调整大小的控制点
        function addResizeHandles(layerElement, assetId) {
            // 创建8个控制点（4个角和4个边）
            const handles = [
                { position: 'nw', cursor: 'nw-resize' }, // 左上
                { position: 'ne', cursor: 'ne-resize' }, // 右上
                { position: 'sw', cursor: 'sw-resize' }, // 左下
                { position: 'se', cursor: 'se-resize' }, // 右下
                { position: 'n', cursor: 'n-resize' },   // 上
                { position: 's', cursor: 's-resize' },   // 下
                { position: 'w', cursor: 'w-resize' },   // 左
                { position: 'e', cursor: 'e-resize' }    // 右
            ];
            
            handles.forEach(handle => {
                const handleElement = document.createElement('div');
                handleElement.className = `resize-handle resize-handle-${handle.position}`;
                handleElement.style.cursor = handle.cursor;
                handleElement.style.pointerEvents = 'auto';
                handleElement.style.zIndex = '1001';
                layerElement.appendChild(handleElement);
                
                // 添加拖拽调整大小功能
                handleElement.addEventListener('mousedown', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    startResize(e, layerElement, handle.position, assetId);
                });
            });
        }
        
        // 开始调整大小
        function startResize(e, element, position, assetId) {
            e.preventDefault();
            e.stopPropagation();
            
            const startX = e.clientX;
            const startY = e.clientY;
            
            // 获取元素的实际像素尺寸
            const elementRect = element.getBoundingClientRect();
            const containerRect = element.parentElement.getBoundingClientRect();
            
            const startWidth = elementRect.width;
            const startHeight = elementRect.height;
            const startLeft = elementRect.left - containerRect.left;
            const startTop = elementRect.top - containerRect.top;
            
            // 标记正在调整大小，防止触发拖拽
            element.dataset.resizing = 'true';
            
            function onMouseMove(e) {
                e.preventDefault();
                
                const deltaX = e.clientX - startX;
                const deltaY = e.clientY - startY;
                
                let newWidth = startWidth;
                let newHeight = startHeight;
                let newLeft = startLeft;
                let newTop = startTop;
                
                // 根据位置调整
                if (position.includes('e')) { // 右
                    newWidth = Math.max(50, startWidth + deltaX);
                }
                if (position.includes('w')) { // 左
                    const widthChange = startWidth - deltaX;
                    if (widthChange >= 50) {
                        newWidth = widthChange;
                        newLeft = startLeft + deltaX;
                    }
                }
                if (position.includes('s')) { // 下
                    newHeight = Math.max(50, startHeight + deltaY);
                }
                if (position.includes('n')) { // 上
                    const heightChange = startHeight - deltaY;
                    if (heightChange >= 50) {
                        newHeight = heightChange;
                        newTop = startTop + deltaY;
                    }
                }
                
                // 限制在容器内
                const maxWidth = containerRect.width - newLeft;
                const maxHeight = containerRect.height - newTop;
                newWidth = Math.min(newWidth, maxWidth);
                newHeight = Math.min(newHeight, maxHeight);
                
                // 确保最小尺寸
                newWidth = Math.max(50, newWidth);
                newHeight = Math.max(50, newHeight);
                
                element.style.width = newWidth + 'px';
                element.style.height = newHeight + 'px';
                if (position.includes('w')) element.style.left = newLeft + 'px';
                if (position.includes('n')) element.style.top = newTop + 'px';
                
                // 同步到program
                syncElementToProgram(element, assetId);
            }
            
            function onMouseUp() {
                delete element.dataset.resizing;
                document.removeEventListener('mousemove', onMouseMove);
                document.removeEventListener('mouseup', onMouseUp);
            }
            
            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);
        }
        
        // 同步单个元素到program
        function syncElementToProgram(element, assetId) {
            const programContainer = document.getElementById('programLayers');
            if (!programContainer) return;
            
            const programElement = programContainer.querySelector(`[data-asset-id="${assetId}"]`);
            if (programElement) {
                // 复制样式
                programElement.style.width = element.style.width;
                programElement.style.height = element.style.height;
                programElement.style.left = element.style.left;
                programElement.style.top = element.style.top;
            }
        }
        
        // 添加拖拽移动功能
        function addDragFunctionality(layerElement, assetId) {
            let isDragging = false;
            let startX, startY, startLeft, startTop;
            
            // 为整个元素和子元素添加拖拽功能
            const handleMouseDown = (e) => {
                // 如果点击的是调整大小的控制点，不触发拖拽
                if (e.target.classList.contains('resize-handle') || 
                    e.target.closest('.resize-handle')) {
                    return;
                }
                
                // 如果正在调整大小，不触发拖拽
                if (layerElement.dataset.resizing === 'true') {
                    return;
                }
                
                e.preventDefault();
                e.stopPropagation();
                
                isDragging = true;
                startX = e.clientX;
                startY = e.clientY;
                
                // 获取元素的实际位置
                const elementRect = layerElement.getBoundingClientRect();
                const containerRect = layerElement.parentElement.getBoundingClientRect();
                startLeft = elementRect.left - containerRect.left;
                startTop = elementRect.top - containerRect.top;
                
                layerElement.style.cursor = 'move';
                layerElement.style.userSelect = 'none';
            };
            
            layerElement.addEventListener('mousedown', handleMouseDown);
            
            // 为内部的img和video也添加事件
            const img = layerElement.querySelector('img');
            const video = layerElement.querySelector('video');
            if (img) {
                img.addEventListener('mousedown', handleMouseDown);
                img.style.pointerEvents = 'auto';
                img.style.userSelect = 'none';
                img.draggable = false;
            }
            if (video) {
                video.addEventListener('mousedown', handleMouseDown);
                video.style.pointerEvents = 'auto';
                video.style.userSelect = 'none';
                video.draggable = false;
            }
            
            const handleMouseMove = (e) => {
                if (!isDragging) return;
                
                e.preventDefault();
                
                const deltaX = e.clientX - startX;
                const deltaY = e.clientY - startY;
                
                const container = layerElement.parentElement;
                const containerRect = container.getBoundingClientRect();
                const elementRect = layerElement.getBoundingClientRect();
                
                let newLeft = startLeft + deltaX;
                let newTop = startTop + deltaY;
                
                // 限制在容器内
                newLeft = Math.max(0, Math.min(newLeft, containerRect.width - elementRect.width));
                newTop = Math.max(0, Math.min(newTop, containerRect.height - elementRect.height));
                
                layerElement.style.left = newLeft + 'px';
                layerElement.style.top = newTop + 'px';
                
                // 同步到program
                syncElementToProgram(layerElement, assetId);
            };
            
            const handleMouseUp = () => {
                if (isDragging) {
                    isDragging = false;
                    layerElement.style.cursor = 'default';
                    layerElement.style.userSelect = '';
                }
            };
            
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
        }
        
        // 同步preview到program
        function syncPreviewToProgram() {
            const previewContainer = document.getElementById('previewLayers');
            const programContainer = document.getElementById('programLayers');
            if (!previewContainer || !programContainer) return;
            
            // 清空program
            programContainer.innerHTML = '';
            activeLayers.program = [];
            
            // 复制preview中的所有元素到program
            activeLayers.preview.forEach(layer => {
                const previewElement = layer.element;
                const asset = layer.asset;
                
                // 创建program元素
                const programElement = document.createElement('div');
                programElement.className = 'layer-preview';
                programElement.dataset.assetId = asset.id;
                programElement.style.zIndex = previewElement.style.zIndex;
                
                // 复制位置和尺寸
                programElement.style.width = previewElement.style.width;
                programElement.style.height = previewElement.style.height;
                programElement.style.left = previewElement.style.left;
                programElement.style.top = previewElement.style.top;
                
                if (asset.type === 'image') {
                    const img = document.createElement('img');
                    img.src = asset.url;
                    img.className = 'layer-preview image';
                    img.style.width = '100%';
                    img.style.height = '100%';
                    img.style.objectFit = 'contain';
                    programElement.appendChild(img);
                } else if (asset.type === 'video') {
                    const video = document.createElement('video');
                    video.src = asset.url;
                    video.className = 'layer-preview video';
                    video.autoplay = true;
                    video.loop = true;
                    video.muted = true;
                    video.style.width = '100%';
                    video.style.height = '100%';
                    video.style.objectFit = 'contain';
                    programElement.appendChild(video);
                }
                
                programContainer.appendChild(programElement);
                activeLayers.program.push({
                    id: asset.id,
                    element: programElement,
                    asset: asset
                });
            });
        }
        
        // 更新图层顺序
        function updateLayerOrder(target) {
            // 后来者在上，所以数组末尾的元素应该有最高的 z-index
            // 数组顺序：[第一个素材, 第二个素材, ...]
            // 索引：     0           1           ...
            // z-index：  0           1           ...（索引越大，z-index越大，越在上层）
            activeLayers[target].forEach((layer, index) => {
                // 直接使用索引作为 z-index，后添加的素材（数组末尾，索引更大）自然有更高的 z-index
                layer.element.style.zIndex = index;
            });
        }
        
        // 图层控制按钮（添加到图层区域）
        function initLayerControls() {
            const layerHeaders = document.querySelectorAll('.layer-header');
            layerHeaders.forEach(header => {
                const addBtn = header.closest('.layer').querySelector('.add-asset-btn');
                if (addBtn) {
                    addBtn.addEventListener('click', () => {
                        const fileInput = document.getElementById('fileInput');
                        if (fileInput) {
                            fileInput.click();
                        }
                    });
                }
            });
        }
        
        // 切换按钮（Preview 和 Program 之间的切换）
        function initTransitionButton() {
            const transitionBtn = document.querySelector('.control-btn.primary');
            if (transitionBtn) {
                transitionBtn.addEventListener('click', () => {
                    // 同步 Preview 到 Program
                    syncPreviewToProgram();
                });
            }
        }
        
        // 初始化图层拖拽功能
        function initLayerDragDrop() {
            // 允许将素材拖拽到图层区域
            const layerContents = document.querySelectorAll('.layer-content');
            layerContents.forEach((layerContent) => {
                // 从父元素获取layer编号
                const layerElement = layerContent.closest('.layer');
                const layerNumber = layerElement ? layerElement.className.match(/layer-(\d)/)?.[1] || '1' : '1';
                
                layerContent.addEventListener('dragover', (e) => {
                    e.preventDefault();
                    layerContent.style.backgroundColor = '#3a3f4b';
                    layerContent.style.border = '2px dashed #ff4444';
                });
                
                layerContent.addEventListener('dragleave', () => {
                    layerContent.style.backgroundColor = 'transparent';
                    layerContent.style.border = 'none';
                });
                
                layerContent.addEventListener('drop', (e) => {
                    e.preventDefault();
                    layerContent.style.backgroundColor = 'transparent';
                    layerContent.style.border = 'none';
                    
                    const assetId = e.dataTransfer.getData('text/plain');
                    const sourceType = e.dataTransfer.getData('source-type'); // 'library' 或 'layer'
                    
                    const asset = uploadedAssets.find(a => a.id.toString() === assetId);
                    if (asset) {
                        if (sourceType === 'layer') {
                            // 从其他layer拖动过来的，需要移动
                            moveAssetBetweenLayers(assetId, layerContent, layerNumber);
                        } else {
                            // 从资源库拖动过来的，直接添加
                            addAssetToLayer(asset, layerContent, layerNumber);
                        }
                    }
                });
            });
            
            // 使上传的素材可拖拽
            document.addEventListener('dragstart', (e) => {
                if (e.target.closest('.uploaded-asset')) {
                    const assetId = e.target.closest('.uploaded-asset').dataset.assetId;
                    e.dataTransfer.setData('text/plain', assetId);
                    e.dataTransfer.setData('source-type', 'library');
                    e.target.closest('.uploaded-asset').style.opacity = '0.5';
                }
                
                // 使layer中的素材缩略图可拖拽
                if (e.target.closest('.asset-thumbnail')) {
                    const thumbnail = e.target.closest('.asset-thumbnail');
                    const assetId = thumbnail.dataset.assetId;
                    if (assetId) {
                        e.dataTransfer.setData('text/plain', assetId);
                        e.dataTransfer.setData('source-type', 'layer');
                        thumbnail.classList.add('dragging');
                    }
                }
            });
            
            document.addEventListener('dragend', (e) => {
                if (e.target.closest('.uploaded-asset')) {
                    e.target.closest('.uploaded-asset').style.opacity = '1';
                }
                if (e.target.closest('.asset-thumbnail')) {
                    const thumbnail = e.target.closest('.asset-thumbnail');
                    thumbnail.classList.remove('dragging');
                }
            });
        }
        
        // 在layer之间移动素材
        function moveAssetBetweenLayers(assetId, targetLayerContent, targetLayerNumber) {
            // 找到素材在哪个layer中
            const allLayerContents = document.querySelectorAll('.layer-content');
            let sourceThumbnail = null;
            let sourceLayerContent = null;
            
            allLayerContents.forEach(layerContent => {
                const thumbnail = layerContent.querySelector(`[data-asset-id="${assetId}"]`);
                if (thumbnail && thumbnail.classList.contains('asset-thumbnail')) {
                    sourceThumbnail = thumbnail;
                    sourceLayerContent = layerContent;
                }
            });
            
            // 如果素材已经在目标layer中，不处理
            if (sourceLayerContent === targetLayerContent) {
                return;
            }
            
            // 如果找到了源素材
            if (sourceThumbnail && sourceLayerContent) {
                // 从原layer移除
                sourceThumbnail.remove();
                
                // 获取素材信息
                const asset = uploadedAssets.find(a => a.id.toString() === assetId);
                if (asset) {
                    // 添加到新layer
                    addAssetToLayer(asset, targetLayerContent, targetLayerNumber);
                    
                    // 更新预览中的层级顺序
                    updatePreviewLayerOrder();
                }
            }
        }
        
        // 更新预览中的层级顺序（根据layer顺序）
        function updatePreviewLayerOrder() {
            // Layer 3 在最上层，Layer 1 在最下层
            const layer3Content = document.querySelector('.layer-3 .layer-content');
            const layer2Content = document.querySelector('.layer-2 .layer-content');
            const layer1Content = document.querySelector('.layer-1 .layer-content');
            
            // 收集所有layer中的素材ID，按layer顺序
            const layerOrder = [];
            
            if (layer3Content) {
                const thumbnails = layer3Content.querySelectorAll('.asset-thumbnail');
                thumbnails.forEach(thumb => {
                    layerOrder.push(thumb.dataset.assetId);
                });
            }
            
            if (layer2Content) {
                const thumbnails = layer2Content.querySelectorAll('.asset-thumbnail');
                thumbnails.forEach(thumb => {
                    layerOrder.push(thumb.dataset.assetId);
                });
            }
            
            if (layer1Content) {
                const thumbnails = layer1Content.querySelectorAll('.asset-thumbnail');
                thumbnails.forEach(thumb => {
                    layerOrder.push(thumb.dataset.assetId);
                });
            }
            
            // 更新preview中的z-index
            const previewContainer = document.getElementById('previewLayers');
            if (previewContainer) {
                layerOrder.forEach((assetId, index) => {
                    const previewElement = previewContainer.querySelector(`[data-asset-id="${assetId}"]`);
                    if (previewElement) {
                        previewElement.style.zIndex = layerOrder.length - index - 1; // 反转，让Layer 3在最上层
                    }
                });
            }
            
            // 同步到program
            syncPreviewToProgram();
        }
        
        // 添加素材到layer区域显示
        function addAssetToLayer(asset, layerContent, layerNumber) {
            // 检查是否已经存在相同的素材
            const existingThumbnail = layerContent.querySelector(`[data-asset-id="${asset.id}"]`);
            if (existingThumbnail) {
                return; // 如果已存在，不重复添加
            }
            
            // 创建素材缩略图
            const assetThumbnail = document.createElement('div');
            assetThumbnail.className = 'asset-thumbnail';
            assetThumbnail.dataset.assetId = asset.id;
            assetThumbnail.draggable = true;
            assetThumbnail.style.cursor = 'grab';
            
            let thumbnailContent = '';
            if (asset.type === 'image') {
                thumbnailContent = `<img src="${asset.url}" alt="${asset.name}">`;
            } else if (asset.type === 'video') {
                thumbnailContent = `<video src="${asset.url}" muted></video>`;
            } else if (asset.type === 'audio') {
                thumbnailContent = `<div style="width: 100%; height: 100%; background: linear-gradient(45deg, #28a745, #20c997); display: flex; align-items: center; justify-content: center; color: white; border-radius: 4px;"><i class="fas fa-music" style="font-size: 24px;"></i></div>`;
            }
            
            // 创建菜单
            const menu = document.createElement('div');
            menu.className = 'asset-menu';
            menu.innerHTML = `
                <div class="menu-item delete">
                    <i class="fas fa-trash"></i>
                    <span>Delete</span>
                </div>
            `;
            
            assetThumbnail.innerHTML = `
                <div class="thumbnail-content">
                    ${thumbnailContent}
                </div>
                <div class="thumbnail-controls">
                    <i class="fas fa-play"></i>
                    <i class="fas fa-ellipsis-v menu-trigger"></i>
                </div>
            `;
            
            assetThumbnail.appendChild(menu);
            
            // 点击缩略图可以添加到预览
            assetThumbnail.addEventListener('click', (e) => {
                // 如果点击的是控制按钮或菜单，不触发预览
                if (e.target.closest('.thumbnail-controls') || e.target.closest('.asset-menu')) {
                    return;
                }
                addAssetToPreview(asset);
            });
            
            // 点击三个点显示/隐藏菜单
            const menuTrigger = assetThumbnail.querySelector('.menu-trigger');
            menuTrigger.addEventListener('click', (e) => {
                e.stopPropagation();
                // 关闭其他菜单
                document.querySelectorAll('.asset-menu.show').forEach(m => {
                    if (m !== menu) {
                        m.classList.remove('show');
                    }
                });
                menu.classList.toggle('show');
            });
            
            // 点击删除按钮
            const deleteBtn = menu.querySelector('.menu-item.delete');
            deleteBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                // 从layer中移除
                assetThumbnail.remove();
                // 从preview中移除
                removeAssetFromPreview(asset.id);
                // 从program中移除
                removeAssetFromProgram(asset.id);
                // 更新层级顺序
                updatePreviewLayerOrder();
            });
            
            // 点击其他地方关闭菜单
            document.addEventListener('click', function closeMenu(e) {
                if (!assetThumbnail.contains(e.target)) {
                    menu.classList.remove('show');
                }
            });
            
            // 插入到添加按钮之前
            const addBtn = layerContent.querySelector('.add-asset-btn');
            if (addBtn) {
                layerContent.insertBefore(assetThumbnail, addBtn);
            } else {
                layerContent.appendChild(assetThumbnail);
            }
            
            // 更新预览中的层级顺序
            updatePreviewLayerOrder();
        }
        
        // 从Preview中移除素材
        function removeAssetFromPreview(assetId) {
            const previewLayers = document.getElementById('previewLayers');
            if (previewLayers) {
                const layerElement = previewLayers.querySelector(`[data-asset-id="${assetId}"]`);
                if (layerElement) {
                    layerElement.remove();
                }
            }
            // 从activeLayers中移除
            activeLayers.preview = activeLayers.preview.filter(layer => layer.id !== assetId);
        }
        
        // 从Program中移除素材
        function removeAssetFromProgram(assetId) {
            const programLayers = document.getElementById('programLayers');
            if (programLayers) {
                const layerElement = programLayers.querySelector(`[data-asset-id="${assetId}"]`);
                if (layerElement) {
                    layerElement.remove();
                }
            }
            // 从activeLayers中移除
            activeLayers.program = activeLayers.program.filter(layer => layer.id !== assetId);
        }
        
        // 双击图层中的素材添加到 Preview
        function initLayerAssetClick() {
            document.addEventListener('dblclick', (e) => {
                const assetThumbnail = e.target.closest('.asset-thumbnail');
                if (assetThumbnail) {
                    // 从现有资源中找到对应的素材
                    const assetName = assetThumbnail.textContent.trim();
                    const asset = uploadedAssets.find(a => a.name === assetName);
                    if (asset) {
                        addAssetToPreview(asset);
                    }
                }
            });
        }
        
        // 每100ms更新一次音频电平
        setInterval(animateAudioMeters, 100);
        // 每2秒更新一次CPU使用率
        setInterval(updateCPUUsage, 2000);
        // 启动倒计时
        startCountdown();
        
        // 初始化文件上传
        initFileUpload();
        
        // 初始化图层控制
        initLayerControls();
        
        // 初始化切换按钮
        initTransitionButton();
        
        // 初始化图层拖拽功能
        initLayerDragDrop();
        
        // 初始化图层素材点击
        initLayerAssetClick();
        
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
        
        // 视频上传和剪切功能
        let currentVideo = null;
        let markInTime = null;
        let markOutTime = null;
        let clips = [];
        
        // 导出面板相关元素
        const closeExportBtn = document.getElementById('closeExportBtn');
        const exportSearch = document.getElementById('exportSearch');
        const previewVideo = document.getElementById('previewVideo');
        
        // Clip Library上传相关元素
        const uploadVideoBtn = document.getElementById('uploadVideoBtn');
        const libraryUploadSection = document.getElementById('libraryUploadSection');
        const libraryUploadArea = document.getElementById('libraryUploadArea');
        const libraryVideoFileInput = document.getElementById('libraryVideoFileInput');
        const clipsGrid = document.getElementById('clipsGrid');
        const previewContent = document.getElementById('previewContent');
        const timeDisplay = document.getElementById('timeDisplay');
        const markInBtn = document.getElementById('markInBtn');
        const markOutBtn = document.getElementById('markOutBtn');
        const saveClipBtn = document.getElementById('saveClipBtn');
        const timelineClips = document.getElementById('timelineClips');
        const playhead = document.getElementById('playhead');
        const timelineRuler = document.getElementById('timelineRuler');
        const timelineSelection = document.getElementById('timelineSelection');
        const selectionLabel = document.getElementById('selectionLabel');
        const timelineCurrentTime = document.getElementById('timelineCurrentTime');
        const timeSlider = document.getElementById('timeSlider');
        
        // 时间轴配置
        let timelineZoom = 1; // 缩放级别
        let timelineStartTime = 0; // 时间轴起始时间（秒）
        let timelineDuration = 600; // 默认时间轴总时长（10分钟）
        let pixelsPerSecond = 10; // 每秒对应的像素数
        
        // 初始化时间轴标尺
        function initTimelineRuler() {
            if (!timelineRuler) return;
            
            timelineRuler.innerHTML = '';
            const rulerWidth = timelineDuration * pixelsPerSecond * timelineZoom;
            timelineRuler.style.width = rulerWidth + 'px';
            
            // 同步时间轴轨道宽度
            const timelineTracks = document.querySelector('.timeline-tracks');
            if (timelineTracks) {
                timelineTracks.style.width = rulerWidth + 'px';
            }
            
            // 根据缩放级别决定标记间隔
            let markInterval = 60; // 默认每分钟一个标记
            if (timelineZoom > 2) {
                markInterval = 10; // 每10秒一个标记
            } else if (timelineZoom > 1) {
                markInterval = 30; // 每30秒一个标记
            }
            
            // 生成时间标记
            for (let time = timelineStartTime; time <= timelineStartTime + timelineDuration; time += markInterval) {
                const mark = document.createElement('div');
                mark.className = 'ruler-mark';
                const hours = Math.floor(time / 3600);
                const minutes = Math.floor((time % 3600) / 60);
                const seconds = Math.floor(time % 60);
                mark.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
                
                const position = (time - timelineStartTime) * pixelsPerSecond * timelineZoom;
                mark.style.left = position + 'px';
                
                timelineRuler.appendChild(mark);
            }
        }
        
        // 初始化时间轴
        if (timelineRuler) {
            initTimelineRuler();
        } else {
            console.warn('Timeline ruler element not found');
        }
        
        // 显示/隐藏上传区域
        // 初始化导出面板功能
        console.log('=== Live Clipping Page Initialization ===');
        
        // 关闭导出面板
        if (closeExportBtn) {
            closeExportBtn.addEventListener('click', () => {
                const exportSidebar = document.querySelector('.export-sidebar');
                if (exportSidebar) {
                    exportSidebar.style.display = 'none';
                }
            });
        }
        
        // 导出搜索功能
        if (exportSearch) {
            exportSearch.addEventListener('input', (e) => {
                const searchTerm = e.target.value.toLowerCase();
                const platformItems = document.querySelectorAll('.platform-item');
                platformItems.forEach(item => {
                    const platformName = item.querySelector('.platform-name').textContent.toLowerCase();
                    if (platformName.includes(searchTerm)) {
                        item.style.display = 'flex';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        }
        
        // 平台选择功能
        const platformCheckboxes = document.querySelectorAll('.platform-checkbox');
        platformCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', (e) => {
                const platformItem = e.target.closest('.platform-item');
                if (e.target.checked) {
                    platformItem.style.borderColor = '#ff4444';
                    platformItem.style.backgroundColor = '#3a3f4b';
                } else {
                    platformItem.style.borderColor = '#3a3f4b';
                    platformItem.style.backgroundColor = '#2d3139';
                }
            });
        });
        
        // 保存按钮功能
        const exportSaveBtn = document.querySelector('.export-save-btn');
        if (exportSaveBtn) {
            exportSaveBtn.addEventListener('click', () => {
                const selectedPlatforms = Array.from(platformCheckboxes)
                    .filter(cb => cb.checked)
                    .map(cb => {
                        const platformItem = cb.closest('.platform-item');
                        return platformItem.querySelector('.platform-name').textContent;
                    });
                
                if (selectedPlatforms.length === 0) {
                    alert('Please select at least one platform to export to.');
                    return;
                }
                
                console.log('Exporting to platforms:', selectedPlatforms);
                alert(`Exporting clip to: ${selectedPlatforms.join(', ')}`);
            });
        }
        
        // 初始化Clip Library上传功能
        if (uploadVideoBtn && libraryUploadSection) {
            uploadVideoBtn.addEventListener('click', () => {
                const isHidden = libraryUploadSection.style.display === 'none' || 
                                window.getComputedStyle(libraryUploadSection).display === 'none';
                libraryUploadSection.style.display = isHidden ? 'block' : 'none';
            });
        }
        
        // 初始化Library上传区域
        if (libraryUploadArea && libraryVideoFileInput) {
            // 点击上传
            libraryUploadArea.addEventListener('click', () => {
                libraryVideoFileInput.click();
            });
            
            // 拖拽上传
            libraryUploadArea.addEventListener('dragover', (e) => {
                e.preventDefault();
                libraryUploadArea.classList.add('dragover');
            });
            
            libraryUploadArea.addEventListener('dragleave', (e) => {
                e.preventDefault();
                if (!libraryUploadArea.contains(e.relatedTarget)) {
                    libraryUploadArea.classList.remove('dragover');
                }
            });
            
            libraryUploadArea.addEventListener('drop', (e) => {
                e.preventDefault();
                libraryUploadArea.classList.remove('dragover');
                const files = e.dataTransfer.files;
                if (files.length > 0) {
                    handleLibraryVideoUpload(files[0]);
                }
            });
            
            // 文件选择
            libraryVideoFileInput.addEventListener('change', (e) => {
                if (e.target.files && e.target.files.length > 0) {
                    handleLibraryVideoUpload(e.target.files[0]);
                }
            });
        }
        
        // 处理Library视频上传
        function handleLibraryVideoUpload(file) {
            const isVideoFile = file.type.startsWith('video/') || 
                               /\.(mp4|mov|avi|mkv|webm|flv|wmv|m4v|3gp|ogv)$/i.test(file.name);
            
            if (!isVideoFile) {
                alert('Please upload a video file (MP4, MOV, AVI, MKV, WebM, etc.)');
                return;
            }
            
            const url = URL.createObjectURL(file);
            addVideoToLibrary(file, url);
            
            // 隐藏上传区域
            if (libraryUploadSection) {
                libraryUploadSection.style.display = 'none';
            }
        }
        
        // 添加视频到Library
        function addVideoToLibrary(file, url) {
            if (!clipsGrid) return;
            
            // 创建视频元素获取元数据
            const video = document.createElement('video');
            video.src = url;
            video.muted = true;
            video.preload = 'metadata';
            
            // 创建clip card
            const clipCard = document.createElement('div');
            clipCard.className = 'clip-card';
            clipCard.dataset.videoUrl = url;
            clipCard.dataset.videoName = file.name;
            clipCard.dataset.clipType = 'uploaded';
            
            const displayName = file.name.length > 20 ? file.name.substring(0, 20) + '...' : file.name;
            
            clipCard.innerHTML = `
                <div class="clip-thumbnail">
                    <div class="clip-preview">
                        <video src="${url}" style="width: 100%; height: 100%; object-fit: cover;" muted preload="metadata"></video>
                        <div class="play-overlay">
                            <i class="fas fa-play"></i>
                        </div>
                    </div>
                    <div class="clip-duration">0:00</div>
                </div>
                <div class="clip-details">
                    <h3>${displayName}</h3>
                    <p>Uploaded • Just now</p>
                    <div class="clip-actions">
                        <button class="action-btn">
                            <i class="fas fa-share"></i>
                        </button>
                        <button class="action-btn">
                            <i class="fas fa-download"></i>
                        </button>
                        <button class="action-btn delete-clip-btn">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            `;
            
            // 插入到网格开头
            clipsGrid.insertBefore(clipCard, clipsGrid.firstChild);
            
            // 获取视频信息
            video.addEventListener('loadedmetadata', function() {
                const duration = video.duration;
                const minutes = Math.floor(duration / 60);
                const seconds = Math.floor(duration % 60);
                const durationDisplay = clipCard.querySelector('.clip-duration');
                if (durationDisplay) {
                    durationDisplay.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
                }
                
                // 存储视频信息
                clipCard.dataset.videoDuration = duration;
            });
            
            // 添加点击事件 - 加载到预览区域
            clipCard.addEventListener('click', (e) => {
                // 如果点击的是按钮，不触发加载
                if (e.target.closest('.action-btn')) {
                    console.log('Clicked action button, not loading video');
                    return;
                }
                console.log('Clip card clicked, loading video:', url, file.name);
                e.stopPropagation();
                loadVideoToPreview(url, file.name);
            });
            
            // 确保整个卡片可点击
            clipCard.style.cursor = 'pointer';
            
            // 删除按钮
            const deleteBtn = clipCard.querySelector('.delete-clip-btn');
            if (deleteBtn) {
                deleteBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    if (confirm('Are you sure you want to delete this clip?')) {
                        URL.revokeObjectURL(url);
                        clipCard.remove();
                    }
                });
            }
        }
        
        // 加载视频到预览区域
        function loadVideoToPreview(url, name) {
            console.log('Loading video to preview:', url, name);
            
            // 确保previewContent存在
            const previewContentEl = document.getElementById('previewContent');
            if (!previewContentEl) {
                console.error('previewContent element not found');
                return;
            }
            
            // 获取或创建预览视频元素
            let videoElement = document.getElementById('previewVideo');
            if (!videoElement) {
                console.log('Creating new video element');
                videoElement = document.createElement('video');
                videoElement.id = 'previewVideo';
                videoElement.style.width = '100%';
                videoElement.style.height = '100%';
                videoElement.style.objectFit = 'contain';
                videoElement.style.display = 'block';
                previewContentEl.appendChild(videoElement);
            } else {
                console.log('Using existing video element');
            }
            
            // 显示视频元素
            videoElement.style.display = 'block';
            videoElement.style.width = '100%';
            videoElement.style.height = '100%';
            videoElement.style.objectFit = 'contain';
            
            // 设置视频源
            videoElement.src = url;
            videoElement.controls = false;
            videoElement.muted = false; // 允许播放声音
            
            // 更新currentVideo
            currentVideo = {
                url: url,
                name: name,
                duration: 0
            };
            
            // 隐藏live indicator和其他元素
            const liveIndicator = previewContentEl.querySelector('.live-indicator');
            if (liveIndicator) {
                liveIndicator.style.display = 'none';
            }
            
            // 加载视频
            videoElement.load();
            
            // 监听视频加载
            videoElement.addEventListener('loadedmetadata', function onLoaded() {
                console.log('Video metadata loaded, duration:', videoElement.duration);
                currentVideo.duration = videoElement.duration;
                updateTimeDisplay(0);
                
                // 更新时间轴
                if (typeof timelineDuration !== 'undefined' && timelineRuler) {
                    timelineDuration = videoElement.duration;
                    if (typeof initTimelineRuler === 'function') {
                        initTimelineRuler();
                    }
                }
                
                // 更新播放头
                if (typeof updatePlayhead === 'function') {
                    updatePlayhead();
                }
            }, { once: true });
            
            // 监听视频错误
            videoElement.addEventListener('error', function onError(e) {
                console.error('Video load error:', e);
                alert('Error loading video. Please try another file.');
            }, { once: true });
            
            // 播放控制
            const playBtn = document.querySelector('.preview-controls .preview-btn:first-child');
            const pauseBtn = document.querySelector('.preview-controls .preview-btn:nth-child(2)');
            const stopBtn = document.querySelector('.preview-controls .preview-btn:nth-child(3)');
            
            if (playBtn) {
                playBtn.onclick = () => {
                    videoElement.play().catch(e => console.error('Play error:', e));
                };
            }
            if (pauseBtn) {
                pauseBtn.onclick = () => {
                    videoElement.pause();
                };
            }
            if (stopBtn) {
                stopBtn.onclick = () => {
                    videoElement.pause();
                    videoElement.currentTime = 0;
                    updateTimeDisplay(0);
                    if (typeof updatePlayhead === 'function') {
                        updatePlayhead();
                    }
                };
            }
            
            // 更新时间显示
            videoElement.addEventListener('timeupdate', () => {
                updateTimeDisplay(videoElement.currentTime);
                if (typeof updatePlayhead === 'function') {
                    updatePlayhead();
                }
            });
            
            console.log('Video loaded to preview successfully');
        }
        
        // 为现有的clip cards添加点击事件
        document.addEventListener('DOMContentLoaded', () => {
            const existingClipCards = document.querySelectorAll('.clip-card[data-clip-type="existing"]');
            existingClipCards.forEach(card => {
                card.addEventListener('click', (e) => {
                    if (e.target.closest('.action-btn')) {
                        return;
                    }
                    // 对于现有clip，可以加载示例视频或显示提示
                    console.log('Clicked existing clip:', card.querySelector('h3').textContent);
                });
            });
        });
        
        // 处理视频上传
        function handleVideoUpload(file) {
            console.log('Uploading video:', file.name, file.type, file);
            
            // 检查文件类型 - 更宽松的检查，包括文件扩展名
            const isVideoFile = file.type.startsWith('video/') || 
                               /\.(mp4|mov|avi|mkv|webm|flv|wmv|m4v|3gp|ogv)$/i.test(file.name);
            
            if (!isVideoFile) {
                alert('Please upload a video file (MP4, MOV, AVI, MKV, WebM, etc.)');
                return;
            }
            
            const url = URL.createObjectURL(file);
            currentVideo = {
                file: file,
                url: url,
                duration: 0,
                name: file.name
            };
            
            // 视频已上传，可以用于剪辑
            
            if (!previewVideo) {
                console.error('Preview video element not found');
                return;
            }
            
            previewVideo.src = url;
            previewVideo.style.display = 'block';
            
            // 使用once选项，避免重复绑定
            previewVideo.addEventListener('loadedmetadata', function onLoaded() {
                currentVideo.duration = previewVideo.duration;
                updateTimeDisplay(0);
                console.log('Video loaded, duration:', currentVideo.duration);
                
                // 更新时间轴配置
                if (currentVideo.duration > 0) {
                    timelineDuration = currentVideo.duration;
                    initTimelineRuler();
                }
                
                previewVideo.removeEventListener('loadedmetadata', onLoaded);
            }, { once: true });
            
            previewVideo.addEventListener('timeupdate', () => {
                updateTimeDisplay(previewVideo.currentTime);
                updatePlayhead();
            });
            
            previewVideo.addEventListener('error', function onError(e) {
                console.error('Video load error:', e);
                alert('Error loading video. Please try another file.');
                previewVideo.removeEventListener('error', onError);
            }, { once: true });
            
            // 隐藏上传区域
            if (videoUploadSection) {
                videoUploadSection.style.display = 'none';
            }
        }
        
        // 添加视频源到右侧网格
        function addVideoSourceToGrid(file, url) {
            const sourcesGrid = document.querySelector('.sources-grid');
            if (!sourcesGrid) {
                console.error('Sources grid not found');
                return;
            }
            
            // 创建视频源项
            const sourceItem = document.createElement('div');
            sourceItem.className = 'source-item uploaded-source';
            sourceItem.dataset.videoUrl = url;
            sourceItem.dataset.videoName = file.name;
            
            // 先创建基本结构，立即显示
            const displayName = file.name.length > 20 ? file.name.substring(0, 20) + '...' : file.name;
            sourceItem.innerHTML = `
                <div class="source-preview">
                    <div class="source-thumbnail">
                        <video src="${url}" style="width: 100%; height: 100%; object-fit: cover;" muted preload="metadata"></video>
                        <div class="source-label" style="position: absolute; top: 5px; left: 5px; background: rgba(0,0,0,0.7); padding: 2px 6px; border-radius: 3px; font-size: 10px; color: #fff; z-index: 2;">VIDEO</div>
                        <div class="source-status ready" style="position: absolute; top: 5px; right: 5px; background: rgba(0,0,0,0.7); padding: 2px 6px; border-radius: 3px; font-size: 10px; color: #4caf50; z-index: 2;">READY</div>
                    </div>
                </div>
                <div class="source-info">
                    <h3>${displayName}</h3>
                    <p>Loading...</p>
                </div>
            `;
            
            // 插入到网格的开头（最新上传的在最上面）
            sourcesGrid.insertBefore(sourceItem, sourcesGrid.firstChild);
            
            // 创建视频元素获取元数据
            const video = document.createElement('video');
            video.src = url;
            video.muted = true;
            video.preload = 'metadata';
            
            // 获取视频信息并更新显示
            video.addEventListener('loadedmetadata', function() {
                const width = video.videoWidth || 1920;
                const height = video.videoHeight || 1080;
                const resolution = width >= 1920 ? '1080p' : width >= 1280 ? '720p' : width >= 640 ? '480p' : '360p';
                const fps = '30fps'; // 默认值，实际需要从视频元数据获取
                
                // 更新视频信息
                const infoElement = sourceItem.querySelector('.source-info p');
                if (infoElement) {
                    infoElement.textContent = `${resolution} • ${fps}`;
                }
            }, { once: true });
            
            // 添加点击事件，点击视频源时在预览中播放
            sourceItem.addEventListener('click', function() {
                // 移除其他项的 active 类
                document.querySelectorAll('.source-item').forEach(item => {
                    item.classList.remove('active');
                });
                // 添加 active 类到当前项
                sourceItem.classList.add('active');
                
                // 在预览中播放这个视频
                if (previewVideo) {
                    // 获取视频时长
                    const videoDuration = video.duration || 0;
                    currentVideo = {
                        file: file,
                        url: url,
                        duration: videoDuration,
                        name: file.name
                    };
                    previewVideo.src = url;
                    previewVideo.style.display = 'block';
                    previewVideo.currentTime = 0;
                    updateTimeDisplay(0);
                    
                    // 如果视频元数据还没加载，等待加载完成
                    if (videoDuration === 0) {
                        video.addEventListener('loadedmetadata', function() {
                            currentVideo.duration = video.duration;
                            if (previewVideo) {
                                previewVideo.load();
                            }
                        }, { once: true });
                    }
                }
            });
        }
        
        // 更新时间显示
        function updateTimeDisplay(time) {
            const hours = Math.floor(time / 3600);
            const minutes = Math.floor((time % 3600) / 60);
            const seconds = Math.floor(time % 60);
            timeDisplay.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }
        
        // 更新播放头位置
        function updatePlayhead() {
            const video = getCurrentPreviewVideo();
            if (!currentVideo || !video || !playhead) return;
            if (video.duration > 0) {
                const currentTime = video.currentTime;
                const position = (currentTime - timelineStartTime) * pixelsPerSecond * timelineZoom;
                playhead.style.left = position + 'px';
                
                // 更新底部时间显示
                if (timelineCurrentTime) {
                    const hours = Math.floor(currentTime / 3600);
                    const minutes = Math.floor((currentTime % 3600) / 60);
                    timelineCurrentTime.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
                }
                
                // 更新底部滑块
                if (timeSlider) {
                    const progress = (currentTime / video.duration) * 100;
                    timeSlider.value = progress;
                    const fill = timeSlider.parentElement.querySelector('.time-slider-fill');
                    if (fill) {
                        fill.style.width = progress + '%';
                    }
                }
            }
        }
        
        // 更新选中区域显示
        function updateTimelineSelection() {
            if (markInTime !== null && markOutTime !== null && markOutTime > markInTime) {
                if (timelineSelection && selectionLabel) {
                    const startPos = (markInTime - timelineStartTime) * pixelsPerSecond * timelineZoom;
                    const endPos = (markOutTime - timelineStartTime) * pixelsPerSecond * timelineZoom;
                    const width = endPos - startPos;
                    
                    timelineSelection.style.left = startPos + 'px';
                    timelineSelection.style.width = width + 'px';
                    timelineSelection.style.display = 'block';
                    
                    // 格式化时间显示
                    const formatTime = (seconds) => {
                        const hours = Math.floor(seconds / 3600);
                        const mins = Math.floor((seconds % 3600) / 60);
                        const secs = Math.floor(seconds % 60);
                        const ms = Math.floor((seconds % 1) * 1000);
                        return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}.${ms.toString().padStart(3, '0')}`;
                    };
                    
                    const duration = markOutTime - markInTime;
                    selectionLabel.textContent = `${formatTime(markInTime)} - ${formatTime(markOutTime)} (${duration.toFixed(1)}s)`;
                }
            } else {
                if (timelineSelection) {
                    timelineSelection.style.display = 'none';
                }
            }
        }
        
        // 初始化播放头位置
        if (playhead) {
            playhead.style.left = '0px';
        }
        
        // 时间滑块控制
        if (timeSlider) {
            timeSlider.addEventListener('input', (e) => {
                const video = getCurrentPreviewVideo();
                if (video && currentVideo && currentVideo.duration > 0) {
                    const progress = e.target.value / 100;
                    video.currentTime = progress * currentVideo.duration;
                    if (typeof updatePlayhead === 'function') {
                        updatePlayhead();
                    }
                }
            });
        }
        
        // 缩放控制
        const zoomInBtn = document.getElementById('zoomInBtn');
        const zoomOutBtn = document.getElementById('zoomOutBtn');
        const fitTimelineBtn = document.getElementById('fitTimelineBtn');
        
        if (zoomInBtn) {
            zoomInBtn.addEventListener('click', () => {
                timelineZoom = Math.min(timelineZoom * 1.5, 10);
                initTimelineRuler();
                updatePlayhead();
                updateTimelineSelection();
            });
        }
        
        if (zoomOutBtn) {
            zoomOutBtn.addEventListener('click', () => {
                timelineZoom = Math.max(timelineZoom / 1.5, 0.1);
                initTimelineRuler();
                updatePlayhead();
                updateTimelineSelection();
            });
        }
        
        if (fitTimelineBtn) {
            fitTimelineBtn.addEventListener('click', () => {
                if (currentVideo && currentVideo.duration > 0) {
                    timelineDuration = currentVideo.duration;
                    timelineZoom = 1;
                    initTimelineRuler();
                    updatePlayhead();
                    updateTimelineSelection();
                }
            });
        }
        
        // 获取当前预览视频元素的辅助函数
        function getCurrentPreviewVideo() {
            return document.getElementById('previewVideo');
        }
        
        // Mark In 功能
        if (markInBtn) {
            markInBtn.addEventListener('click', () => {
                const video = getCurrentPreviewVideo();
                if (video && video.readyState >= 2) {
                    markInTime = video.currentTime;
                    markInBtn.style.backgroundColor = '#ff4444';
                    markInBtn.style.color = '#ffffff';
                    console.log('Mark In:', formatTime(markInTime));
                    if (typeof updateTimelineSelection === 'function') {
                        updateTimelineSelection();
                    }
                } else {
                    alert('Please load a video first.');
                }
            });
        }
        
        // Mark Out 功能
        if (markOutBtn) {
            markOutBtn.addEventListener('click', () => {
                const video = getCurrentPreviewVideo();
                if (video && video.readyState >= 2) {
                    markOutTime = video.currentTime;
                    markOutBtn.style.backgroundColor = '#ff4444';
                    markOutBtn.style.color = '#ffffff';
                    console.log('Mark Out:', formatTime(markOutTime));
                    if (typeof updateTimelineSelection === 'function') {
                        updateTimelineSelection();
                    }
                } else {
                    alert('Please load a video first.');
                }
            });
        }
        
        // 保存剪辑片段
        if (saveClipBtn) {
            saveClipBtn.addEventListener('click', () => {
                if (markInTime !== null && markOutTime !== null && markOutTime > markInTime && currentVideo) {
                    const clip = {
                        id: Date.now(),
                        name: currentVideo.name || `Clip ${clips.length + 1}`,
                        startTime: markInTime,
                        endTime: markOutTime,
                        duration: markOutTime - markInTime,
                        videoUrl: currentVideo.url
                    };
                    
                    clips.push(clip);
                    if (typeof addClipToTimeline === 'function') {
                        addClipToTimeline(clip);
                    }
                    
                    // 重置标记
                    const oldMarkIn = markInTime;
                    const oldMarkOut = markOutTime;
                    markInTime = null;
                    markOutTime = null;
                    markInBtn.style.backgroundColor = '';
                    markInBtn.style.color = '';
                    markOutBtn.style.backgroundColor = '';
                    markOutBtn.style.color = '';
                    if (typeof updateTimelineSelection === 'function') {
                        updateTimelineSelection();
                    }
                    
                    alert(`Clip saved! Duration: ${(oldMarkOut - oldMarkIn).toFixed(1)}s`);
                } else {
                    alert('Please set both Mark In and Mark Out points on a loaded video.');
                }
            });
        }
        
        // 格式化时间
        function formatTime(seconds) {
            const mins = Math.floor(seconds / 60);
            const secs = Math.floor(seconds % 60);
            return `${mins}:${secs.toString().padStart(2, '0')}`;
        }
        
        // 添加剪辑到时间轴
        function addClipToTimeline(clip) {
            const clipItem = document.createElement('div');
            clipItem.className = 'clip-item';
            clipItem.dataset.clipId = clip.id;
            
            const width = (clip.duration / (currentVideo.duration || 1)) * 100;
            clipItem.style.width = Math.max(120, width) + '%';
            
            clipItem.innerHTML = `
                <div class="clip-thumbnail">
                    <div class="clip-preview"></div>
                </div>
                <div class="clip-info">
                    <span class="clip-title">${clip.name}</span>
                    <span class="clip-duration">${formatTime(clip.duration)}</span>
                </div>
            `;
            
            // 点击剪辑跳转到对应时间
            clipItem.addEventListener('click', () => {
                if (previewVideo) {
                    previewVideo.currentTime = clip.startTime;
                    previewVideo.play();
                }
            });
            
            timelineClips.appendChild(clipItem);
        }
        
        // 播放控制
        const playBtn = document.querySelector('.preview-btn .fa-play')?.closest('.preview-btn');
        const pauseBtn = document.querySelector('.preview-btn .fa-pause')?.closest('.preview-btn');
        const stopBtn = document.querySelector('.preview-btn .fa-stop')?.closest('.preview-btn');
        
        if (playBtn && previewVideo) {
            playBtn.addEventListener('click', () => {
                previewVideo.play();
            });
        }
        
        if (pauseBtn && previewVideo) {
            pauseBtn.addEventListener('click', () => {
                previewVideo.pause();
            });
        }
        
        if (stopBtn && previewVideo) {
            stopBtn.addEventListener('click', () => {
                previewVideo.pause();
                previewVideo.currentTime = 0;
            });
        }
        
        // 时间轴控制按钮
        const stepBackwardBtn = document.querySelector('.timeline-btn .fa-step-backward')?.closest('.timeline-btn');
        const backwardBtn = document.querySelector('.timeline-btn .fa-backward')?.closest('.timeline-btn');
        const forwardBtn = document.querySelector('.timeline-btn .fa-forward')?.closest('.timeline-btn');
        const stepForwardBtn = document.querySelector('.timeline-btn .fa-step-forward')?.closest('.timeline-btn');
        
        if (stepBackwardBtn && previewVideo) {
            stepBackwardBtn.addEventListener('click', () => {
                previewVideo.currentTime = Math.max(0, previewVideo.currentTime - 10);
            });
        }
        
        if (backwardBtn && previewVideo) {
            backwardBtn.addEventListener('click', () => {
                previewVideo.currentTime = Math.max(0, previewVideo.currentTime - 1);
            });
        }
        
        if (forwardBtn && previewVideo) {
            forwardBtn.addEventListener('click', () => {
                previewVideo.currentTime = Math.min(previewVideo.duration, previewVideo.currentTime + 1);
            });
        }
        
        if (stepForwardBtn && previewVideo) {
            stepForwardBtn.addEventListener('click', () => {
                previewVideo.currentTime = Math.min(previewVideo.duration, previewVideo.currentTime + 10);
            });
        }
        
        // 视频源选择
        const sourceItems = document.querySelectorAll('.source-item');
        sourceItems.forEach(item => {
            item.addEventListener('click', function() {
                sourceItems.forEach(s => s.classList.remove('active'));
                this.classList.add('active');
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
        // 顶部导航标签页切换和跳转
        const topTabs = document.querySelectorAll('.top-center .tabs .tab[data-page]');
        topTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                const page = this.getAttribute('data-page');
                if (page && pageRoutes[page]) {
                    // 如果点击的是当前页面，只更新active状态，不跳转
                    const currentPage = getCurrentPage();
                    if (currentPage === page) {
                        topTabs.forEach(t => t.classList.remove('active'));
                        this.classList.add('active');
                    } else {
                        // 跳转到对应页面
                        navigateToPage(page);
                    }
                } else {
                    // 如果没有data-page属性，只切换active状态（兼容其他tabs）
                    const tabsContainer = this.closest('.tabs');
                    if (tabsContainer) {
                        const siblingTabs = tabsContainer.querySelectorAll('.tab');
                        siblingTabs.forEach(t => t.classList.remove('active'));
                        this.classList.add('active');
                    }
                }
            });
        });
        
        // 其他标签页切换（非顶部导航的tabs）
        const otherTabs = document.querySelectorAll('.tab:not(.top-center .tabs .tab)');
        otherTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                const tabsContainer = this.closest('.tabs');
                if (tabsContainer) {
                    const siblingTabs = tabsContainer.querySelectorAll('.tab');
                    siblingTabs.forEach(t => t.classList.remove('active'));
                    this.classList.add('active');
                }
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