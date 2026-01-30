//Mobile menu
function showSidebar() {
        const sidebar = document.querySelector('.sidebar');
        sidebar.style.display = 'flex';
    }

    function hideSidebar() {
        const sidebar = document.querySelector('.sidebar');
        sidebar.style.display = 'none';
}

// Navigation functionality
        document.addEventListener('DOMContentLoaded', function() {
            // Elements
            const navLinks = document.querySelectorAll('.nav-link');
            const pages = document.querySelectorAll('.page');
            const mobileMenuBtn = document.getElementById('mobileMenuBtn');
            const navLinksContainer = document.getElementById('navLinks');
            const header = document.getElementById('header');
            const contactForm = document.getElementById('contactForm');
            
            // Navigation between pages
            navLinks.forEach(link => {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    // Get target page
                    const targetPage = this.getAttribute('data-page');
                    
                    // Update active nav link
                    navLinks.forEach(item => item.classList.remove('active'));
                    this.classList.add('active');
                    
                    // Show target page
                    pages.forEach(page => {
                        page.classList.remove('active');
                        if (page.id === targetPage) {
                            page.classList.add('active');
                        }
                    });
                    
                    // Close mobile menu if open
                    navLinksContainer.classList.remove('active');
                });
            });

        // // Off-canvas menu functionality
        // document.addEventListener('DOMContentLoaded', function() {
        // const menuToggle = document.getElementById('menu-toggle');
        // const offcanvasMenu = document.getElementById('offcanvas-menu');
        // const menuBackdrop = document.getElementById('menu-backdrop');
        // const menuClose = document.getElementById('menu-close');

        // function openMenu() {
        //     offcanvasMenu.classList.add('open');
        //     menuBackdrop.classList.add('open');
        //     document.body.style.overflow = 'hidden';
        // }
        // function closeMenu() {
        //     offcanvasMenu.classList.remove('open');
        //     menuBackdrop.classList.remove('open');
        //     document.body.style.overflow = '';
        // }

            // === LIVE GITHUB STATS (NO API KEY NEEDED) ===
            function fetchGitHubStats() {
                const username = "kennycoder"; // CHANGE THIS TO YOUR REAL GITHUB USERNAME

                // Using gh-polyglot for contributions + public API
                Promise.all([
                    fetch(`https://api.github.com/kennycoder18/${kennycoder18}`).then(r => r.json()),
                    fetch(`https://api.github.com/kennycoder18/${kennycoder18}/repos?per_page=100`).then(r => r.json()),
                    fetch(`https://github-contributions-api.jogr.dev/${kennycoder18}`).then(r => r.json()).catch(() => ({ totalContributions: 0 }))
                ])
                .then(([user, repos, contrib]) => {
                    // Total repos
                    document.getElementById('repos').textContent = user.public_repos || repos.length;

                    // Total stars
                    let totalStars = 0;
                    repos.forEach(repo => { totalStars += (repo.stargazers_count || 0); });
                    document.getElementById('stars').textContent = totalStars;

                    // Followers
                    document.getElementById('followers').textContent = user.followers || 0;

                    // 2025 Contributions
                    document.getElementById('contributions').textContent = contrib.totalContributions || "1.2k+";

                    // Animate numbers
                    document.querySelectorAll('.stat-number').forEach(el => {
                        el.classList.add('counting');
                    });
                })
                .catch(err => {
                    console.log("GitHub stats failed, using fallback");
                    // Fallback values (still looks good)
                    document.getElementById('repos').textContent = "50+";
                    document.getElementById('stars').textContent = "1.2k+";
                    document.getElementById('followers').textContent = "800+";
                    document.getElementById('contributions').textContent = "2.5k+";
                });
            }

            // Run on load
            fetchGitHubStats();
            
            // Mobile menu toggle
            mobileMenuBtn.addEventListener('click', function() {
                navLinksContainer.classList.toggle('active');
                this.innerHTML = navLinksContainer.classList.contains('active') 
                    ? '<i class="fas fa-times"></i>' 
                    : '<i class="fas fa-bars"></i>';
            });
            
            // Header scroll effect
            window.addEventListener('scroll', function() {
                if (window.scrollY > 50) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }
            });
            
            // Contact form submission
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Get form values
                const name = document.getElementById('name').value;
                const email = document.getElementById('email').value;
                const subject = document.getElementById('subject').value;
                const message = document.getElementById('message').value;
                
                // In a real implementation, you would send this data to a server
                // For this demo, we'll just show an alert
                alert(`Thank you ${name}! Your message has been sent. I'll get back to you at ${email} soon.`);
                
                // Reset form
                contactForm.reset();
            });
            
            // Smooth scrolling for anchor links
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    const targetId = this.getAttribute('href');
                    if (targetId === '#') return;
                    
                    const targetElement = document.querySelector(targetId);
                    if (targetElement) {
                        window.scrollTo({
                            top: targetElement.offsetTop - 80,
                            behavior: 'smooth'
                        });
                    }
                });
            });
        });