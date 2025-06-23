    <script>
        let zIndexCounter = 10;
        let startMenuOpen = false;

        function openWindow(id) {
            const window = document.getElementById(id);
            window.classList.add('active');
            focusWindow(window);
            closeStartMenu();
        }

        function closeWindow(id) {
            document.getElementById(id).classList.remove('active');
        }

        function focusWindow(window) {
            zIndexCounter++;
            window.style.zIndex = zIndexCounter;
        }

        function toggleStartMenu() {
            const startMenu = document.getElementById('start-menu');
            startMenuOpen = !startMenuOpen;
            if (startMenuOpen) {
                startMenu.classList.add('active');
            } else {
                startMenu.classList.remove('active');
            }
        }

        function closeStartMenu() {
            document.getElementById('start-menu').classList.remove('active');
            startMenuOpen = false;
        }

        // Window dragging functionality
        let dragOffsetX, dragOffsetY;

        function startDrag(e, windowEl) {
            e.preventDefault();
            focusWindow(windowEl);
            
            const rect = windowEl.getBoundingClientRect();
            dragOffsetX = e.clientX - rect.left;
            dragOffsetY = e.clientY - rect.top;

            function onMouseMove(e) {
                const newX = e.clientX - dragOffsetX;
                const newY = e.clientY - dragOffsetY;
                
                // Keep window within bounds
                const maxX = window.innerWidth - windowEl.offsetWidth;
                const maxY = window.innerHeight - windowEl.offsetHeight;
                
                windowEl.style.left = Math.max(0, Math.min(newX, maxX)) + 'px';
                windowEl.style.top = Math.max(0, Math.min(newY, maxY)) + 'px';
            }

            function onMouseUp() {
                document.removeEventListener('mousemove', onMouseMove);
                document.removeEventListener('mouseup', onMouseUp);
            }

            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);
        }

        // Clock functionality
        function updateClock() {
            const now = new Date();
            const time = now.toLocaleTimeString([], { 
                hour: '2-digit', 
                minute: '2-digit',
                hour12: true 
            });
            document.getElementById('clock').textContent = time;
        }

        setInterval(updateClock, 1000);
        updateClock();

        // Close start menu when clicking elsewhere
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.start-button') && !e.target.closest('.start-menu')) {
                closeStartMenu();
            }
        });

        // Desktop icon selection
        document.querySelectorAll('.desktop-icon').forEach(icon => {
            icon.addEventListener('click', function(e) {
                if (!e.detail || e.detail === 1) { // Single click
                    document.querySelectorAll('.desktop-icon').forEach(i => i.classList.remove('selected'));
                    this.classList.add('selected');
                }
            });
        });

        // Window focus on click
        document.querySelectorAll('.window').forEach(window => {
            window.addEventListener('mousedown', function() {
                focusWindow(this);
            });
        });

        // Remove boot screen after animation
        setTimeout(() => {
            const bootScreen = document.querySelector('.boot-screen');
            if (bootScreen) {
                bootScreen.remove();
            }
        }, 5000);
    </script>
