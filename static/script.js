document.addEventListener('DOMContentLoaded', function() {

    // =====================
    // DATA STORE
    // =====================
    
    const defaultFishHias = [];
    const defaultFishPredator = [];
    const teamMembers = {
        1: { 
            name: 'Uky Zubair', 
            role: 'UI/UX Designer', 
            expertise: 'Desain Digital & Prompt Engineering',
            bio: 'Desainer yang fokus pada pengalaman pengguna yang intuitif dan estetika yang menawan, mempunyai banyak ide mengenai desain digital.',
            skills: ['UI Design', 'UX Research', 'Prototyping', 'Prompt Engineering'],
            social: {
                instagram: 'https://www.instagram.com/44francc_uky/',
                figma: 'https://www.figma.com/community/file/1570755587492365953',
                github: 'https://muchammadzubairmarzuqi.github.io/Uky-Portofolio/'
            }
        },
        2: { 
            name: 'Tata Axcela', 
            role: 'Company Profile Specialist', 
            expertise: 'Identitas Perusahaan & Branding',
            bio: 'Fokus kedalam identitas perusahaan, membangun citra merek yang kuat dan konsisten untuk Arken Fish Gallery.',
            skills: ['Branding', 'Company Profile', 'Content Strategy', 'Visual Identity'],
            social: {
                instagram: 'https://instagram.com/tataaxcela',
                figma: 'https://figma.com/@tataaxcela',
                github: 'https://github.com/tataaxcela'
            }
        },
        3: { 
            name: 'Tomy Aditya', 
            role: 'Company Profile Specialist', 
            expertise: 'Riset & Pengumpulan Data',
            bio: 'Mencari informasi data perusahaan untuk membuat website ini dengan akurat dan terperinci.',
            skills: ['Data Research', 'Content Collection', 'Documentation', 'Analysis'],
            social: {
                instagram: 'https://instagram.com/tomyaditya',
                figma: 'https://figma.com/@tomyaditya',
                github: 'https://github.com/tomyaditya'
            }
        },
        4: { 
            name: 'M.Ridho Prama', 
            role: 'Content Strategist', 
            expertise: 'Konten Digital & Media Sosial',
            bio: 'Pakar dalam menciptakan narasi merek yang kuat dan konten yang menarik bagi audiens.',
            skills: ['Content Strategy', 'Social Media', 'Copywriting', 'SEO'],
            social: {
                instagram: 'https://instagram.com/mridhoprama',
                figma: 'https://figma.com/@mridhoprama',
                github: 'https://github.com/mridhoprama'
            }
        },
        5: { 
            name: 'Verlita Putri', 
            role: 'Digital Marketing', 
            expertise: 'Pemasaran Digital & Growth',
            bio: 'Spesialis pemasaran digital dengan fokus pada pertumbuhan dan engagement pengguna.',
            skills: ['Digital Marketing', 'Growth Hacking', 'Analytics', 'Campaign Management'],
            social: {
                instagram: 'https://instagram.com/verlitaputri',
                figma: 'https://figma.com/@verlitaputri',
                github: 'https://github.com/verlitaputri'
            }
        }
    };

    function loadData(key, defaults) {
        const stored = localStorage.getItem(key);
        return stored ? JSON.parse(stored) : defaults;
    }

    function saveData(key, data) {
        localStorage.setItem(key, JSON.stringify(data));
    }

    let fishHias = [];
    let fishPredator = [];
    let cart = loadData('cart', []);
    let editingFishId = null;
    let deletingFishId = null;
    let deletingFishCategory = null;

    // =====================
    // PARTICLES.JS
    // =====================
    
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: { value: 80, density: { enable: true, value_area: 800 } },
                color: { value: "#00ffff" },
                shape: { type: "circle" },
                opacity: { value: 0.5, random: true },
                size: { value: 3, random: true },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: "#00ffff",
                    opacity: 0.2,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: "none",
                    random: false,
                    straight: false,
                    out_mode: "out",
                    bounce: false
                }
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: { enable: true, mode: "grab" },
                    onclick: { enable: true, mode: "push" },
                    resize: true
                },
                modes: {
                    grab: { distance: 140, line_linked: { opacity: 0.5 } },
                    push: { particles_nb: 4 }
                }
            },
            retina_detect: true
        });
    }

    // =====================
    // LOADING SCREEN
    // =====================
    
    setTimeout(() => {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }
    }, 1500);

    // =====================
    // TAB NAVIGATION
    // =====================
    
    const navTabs = document.querySelectorAll('.nav-tab');
    const mobileNavItems = document.querySelectorAll('.mobile-nav-item');
    const pages = document.querySelectorAll('.page');

    function switchPage(tabName) {
        navTabs.forEach(tab => {
            tab.classList.toggle('active', tab.dataset.tab === tabName);
        });

        mobileNavItems.forEach(item => {
            item.classList.toggle('active', item.dataset.tab === tabName);
        });

        pages.forEach(page => {
            page.classList.toggle('active', page.id === `page-${tabName}`);
        });
    }

    navTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            switchPage(tab.dataset.tab);
        });
    });

    mobileNavItems.forEach(item => {
        item.addEventListener('click', () => {
            switchPage(item.dataset.tab);
        });
    });

    // Hero buttons
    const exploreBtn = document.getElementById('explore-collection');
    const learnMoreBtn = document.getElementById('learn-more');

    if (exploreBtn) {
        exploreBtn.addEventListener('click', (e) => {
            e.preventDefault();
            switchPage('ikan-hias');
        });
    }

    if (learnMoreBtn) {
        learnMoreBtn.addEventListener('click', (e) => {
            e.preventDefault();
            switchPage('about');
        });
    }

    // =====================
    // RENDER FISH CARDS
    // =====================
    
    function renderFishCards(containerId, data) {
        const container = document.getElementById(containerId);
        if (!container) return;

        if (data.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-fish"></i>
                    <p>Belum ada ikan. Klik tombol "Tambah Ikan" untuk menambahkan.</p>
                </div>
            `;
            return;
        }

        container.innerHTML = data.map(fish => `
            <div class="fish-card" data-filter="${fish.filter || 'all'}">
                <div class="fish-image">
                    <img src="${fish.image}" alt="${fish.name}" onerror="this.src='https://via.placeholder.com/300x200?text=No+Image'">
                    ${fish.badge ? `<span class="fish-badge">${fish.badge}</span>` : ''}
                    <div class="fish-actions-overlay">
                        <button class="fish-action-btn edit-btn" onclick="editFish('${containerId === 'fish-hias-grid' ? 'hias' : 'predator'}', ${fish.id})">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="fish-action-btn delete-btn" onclick="confirmDelete('${containerId === 'fish-hias-grid' ? 'hias' : 'predator'}', ${fish.id})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
                <div class="fish-info">
                    <h3>${fish.name}</h3>
                    <p class="fish-price">Rp ${fish.price}</p>
                    <p>${fish.desc}</p>
                    <div class="fish-meta">
                        <span><i class="fas fa-ruler"></i> ${fish.size || '-'}</span>
                        <span><i class="fas fa-thermometer-half"></i> ${fish.temp || '-'}</span>
                        <span><i class="fas fa-tint"></i> pH ${fish.ph || '-'}</span>
                    </div>
                    <button class="btn btn-primary add-to-cart-btn" onclick="addToCart('${fish.name}', '${fish.price}', '${fish.image}')">
                        <i class="fas fa-cart-plus"></i> Tambah ke Keranjang
                    </button>
                </div>
            </div>
        `).join('');
        
        }

    // =====================
    // FILTER TABS
    // =====================
    
    document.querySelectorAll('.filter-tab').forEach(tab => {
        tab.addEventListener('click', function() {
            const filter = this.dataset.filter;
            const parent = this.closest('.page');
            
            parent.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
            this.classList.add('active');

            const cards = parent.querySelectorAll('.fish-card');
            cards.forEach(card => {
                const cardFilter = card.dataset.filter;
                if (filter === 'all' || cardFilter === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // =====================
    // CRUD OPERATIONS
    // =====================
    
    const fishModal = document.getElementById('fish-modal');
    const fishForm = document.getElementById('fish-form');
    const modalTitle = document.getElementById('modal-title');
    const closeFishModal = document.getElementById('close-fish-modal');
    const cancelFishForm = document.getElementById('cancel-fish-form');

    document.getElementById('add-fish-hias').addEventListener('click', () => {
        openFishModal('hias');
    });

    document.getElementById('add-fish-predator').addEventListener('click', () => {
        openFishModal('predator');
    });

    function openFishModal(category, fish = null) {
        document.getElementById('fish-category').value = category;
        
        if (fish) {
            modalTitle.textContent = 'Edit Ikan';
            document.getElementById('fish-id').value = fish.id;
            document.getElementById('fish-name').value = fish.name;
            document.getElementById('fish-price').value = fish.price;
            document.getElementById('fish-image').value = fish.image;
            document.getElementById('fish-desc').value = fish.desc;
            document.getElementById('fish-size').value = fish.size || '';
            document.getElementById('fish-temp').value = fish.temp || '';
            document.getElementById('fish-ph').value = fish.ph || '';
            document.getElementById('fish-badge').value = fish.badge || '';
            document.getElementById('fish-filter').value = fish.filter || 'all';
            editingFishId = fish.id;
        } else {
            modalTitle.textContent = 'Tambah Ikan Baru';
            fishForm.reset();
            document.getElementById('fish-id').value = '';
            editingFishId = null;
        }

        fishModal.classList.add('active');
    }

    function closeFishModalFunc() {
        fishModal.classList.remove('active');
        fishForm.reset();
        editingFishId = null;
    }

    closeFishModal.addEventListener('click', closeFishModalFunc);
    cancelFishForm.addEventListener('click', closeFishModalFunc);

    fishModal.addEventListener('click', (e) => {
        if (e.target === fishModal) {
            closeFishModalFunc();
        }
    });

    
    fishForm.addEventListener('submit', async (e) => {

    e.preventDefault();

    const fishData = {

        name: document.getElementById('fish-name').value,
        price: document.getElementById('fish-price').value,
        image: document.getElementById('fish-image').value,
        desc: document.getElementById('fish-desc').value,
        size: document.getElementById('fish-size').value,
        temp: document.getElementById('fish-temp').value,
        ph: document.getElementById('fish-ph').value,
        badge: document.getElementById('fish-badge').value,
        category: document.getElementById('fish-category').value

    };

    try {

        const response = await fetch('/api/add_fish', {

            method: 'POST',

            headers: {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify(fishData)

        });

        const result = await response.json();

        showNotification(result.message);

        closeFishModalFunc();

        loadFishFromAPI();

    } catch (error) {

        console.error(error);

        showNotification('Gagal menambahkan ikan');

    }

});

        if (category === 'hias') {
            if (editingFishId) {
                const index = fishHias.findIndex(f => f.id === editingFishId);
                if (index !== -1) fishHias[index] = fishData;
            } else {
                fishHias.push(fishData);
            }
            saveData('fishHias', fishHias);
            renderFishCards('fish-hias-grid', fishHias);
        } else {
            if (editingFishId) {
                const index = fishPredator.findIndex(f => f.id === editingFishId);
                if (index !== -1) fishPredator[index] = fishData;
            } else {
                fishPredator.push(fishData);
            }
            saveData('fishPredator', fishPredator);
            renderFishCards('fish-predator-grid', fishPredator);
        }

        closeFishModalFunc();
        showNotification(editingFishId ? 'Ikan berhasil diperbarui!' : 'Ikan berhasil ditambahkan!');
    });

    window.editFish = function(category, id) {
        const data = category === 'hias' ? fishHias : fishPredator;
        const fish = data.find(f => f.id === id);
        if (fish) {
            openFishModal(category, fish);
        }
    };

    const deleteModal = document.getElementById('delete-modal');
    const confirmDeleteBtn = document.getElementById('confirm-delete');
    const cancelDeleteBtn = document.getElementById('cancel-delete');

    window.confirmDelete = function(category, id) {
        deletingFishCategory = category;
        deletingFishId = id;
        deleteModal.classList.add('active');
    };

    cancelDeleteBtn.addEventListener('click', () => {
        deleteModal.classList.remove('active');
        deletingFishId = null;
        deletingFishCategory = null;
    });

    confirmDeleteBtn.addEventListener('click', () => {
        if (deletingFishCategory === 'hias') {
            fishHias = fishHias.filter(f => f.id !== deletingFishId);
            saveData('fishHias', fishHias);
            renderFishCards('fish-hias-grid', fishHias);
        } else {
            fishPredator = fishPredator.filter(f => f.id !== deletingFishId);
            saveData('fishPredator', fishPredator);
            renderFishCards('fish-predator-grid', fishPredator);
        }

        deleteModal.classList.remove('active');
        showNotification('Ikan berhasil dihapus!');
        deletingFishId = null;
        deletingFishCategory = null;
    });

    deleteModal.addEventListener('click', (e) => {
        if (e.target === deleteModal) {
            deleteModal.classList.remove('active');
        }
    });

    // =====================
    // CART FUNCTIONALITY
    // =====================
    
    const cartSidebar = document.getElementById('cart-sidebar');
    const cartToggle = document.getElementById('cart-toggle');
    const closeCart = document.getElementById('close-cart');
    const overlay = document.getElementById('overlay');
    const cartCountEl = document.getElementById('cart-count');
    const cartItemsEl = document.getElementById('cart-items');
    const cartTotalPriceEl = document.getElementById('cart-total-price');

    // Helper: Parse Price String (ambil angka pertama dari range)
    function parsePrice(priceStr) {
        // Contoh: "75.000 - 250.000" -> ambil "75.000"
        const firstPart = priceStr.split('-')[0].trim();
        // Hilangkan titik, ubah ke integer
        return parseInt(firstPart.replace(/\./g, '')) || 0;
    }

    function updateCartUI() {
        const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
        cartCountEl.textContent = totalItems;

        if (cart.length === 0) {
            cartItemsEl.innerHTML = `
                <div style="text-align: center; padding: 40px; color: var(--text-secondary);">
                    <i class="fas fa-shopping-cart" style="font-size: 3rem; margin-bottom: 15px; opacity: 0.5;"></i>
                    <p>Keranjang kosong</p>
                </div>
            `;
            cartTotalPriceEl.textContent = 'Rp 0';
            return;
        }

        let grandTotal = 0;
        cartItemsEl.innerHTML = cart.map((item, index) => {
            const itemPrice = parsePrice(item.price);
            const subtotal = itemPrice * item.qty;
            grandTotal += subtotal;

            return `
                <div class="cart-item">
                    <div class="cart-item-img">
                        <img src="${item.image}" alt="${item.name}" onerror="this.src='https://via.placeholder.com/80?text=No+Image'">
                    </div>
                    <div class="cart-item-info">
                        <h4>${item.name}</h4>
                        <p>Rp ${item.price}</p>
                        <div class="cart-item-actions">
                            <button class="qty-btn" onclick="updateQty(${index}, -1)">-</button>
                            <span>${item.qty}</span>
                            <button class="qty-btn" onclick="updateQty(${index}, 1)">+</button>
                            <button class="remove-item-btn" onclick="removeItem(${index})">Hapus</button>
                        </div>
                    </div>
                </div>
            `;
        }).join('');

        cartTotalPriceEl.textContent = `Rp ${grandTotal.toLocaleString('id-ID')}`;
    }

    window.addToCart = function(name, price, image) {
        const existing = cart.find(item => item.name === name);
        if (existing) {
            existing.qty++;
        } else {
            cart.push({ name, price, image, qty: 1 });
        }
        saveData('cart', cart);
        updateCartUI();
        showNotification('Ditambahkan ke keranjang!');
    };

    window.updateQty = function(index, change) {
        cart[index].qty += change;
        if (cart[index].qty <= 0) {
            cart.splice(index, 1);
        }
        saveData('cart', cart);
        updateCartUI();
    };

    window.removeItem = function(index) {
        cart.splice(index, 1);
        saveData('cart', cart);
        updateCartUI();
    };

    cartToggle.addEventListener('click', () => {
        cartSidebar.classList.add('active');
        overlay.classList.add('active');
    });

    closeCart.addEventListener('click', () => {
        cartSidebar.classList.remove('active');
        overlay.classList.remove('active');
    });

    overlay.addEventListener('click', () => {
        cartSidebar.classList.remove('active');
        overlay.classList.remove('active');
    });

    updateCartUI();

    // =====================
    // SEARCH
    // =====================
    
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.getElementById('search-btn');

    function performSearch() {
        const term = searchInput.value.toLowerCase().trim();
        if (!term) return;

        const allFish = [...fishHias, ...fishPredator];
        const found = allFish.find(f => f.name.toLowerCase().includes(term));

        if (found) {
            const isHias = fishHias.some(f => f.id === found.id);
            switchPage(isHias ? 'ikan-hias' : 'ikan-predator');
            
            setTimeout(() => {
                const cards = document.querySelectorAll('.fish-card');
                cards.forEach(card => {
                    const name = card.querySelector('h3').textContent.toLowerCase();
                    if (name.includes(term)) {
                        card.style.transform = 'scale(1.05)';
                        card.style.boxShadow = '0 0 30px rgba(0, 255, 255, 0.5)';
                        setTimeout(() => {
                            card.style.transform = '';
                            card.style.boxShadow = '';
                        }, 2000);
                    }
                });
            }, 300);
        } else {
            showNotification('Ikan tidak ditemukan');
        }

        searchInput.value = '';
    }

    searchBtn.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') performSearch();
    });

    // =====================
    // PROFILE MODAL
    // =====================
    
    const profileModal = document.getElementById('profile-modal');
    const profileDetails = document.getElementById('profile-details');
    const closeModalBtns = document.querySelectorAll('.close-modal');
    const viewProfileBtns = document.querySelectorAll('.view-profile');

    viewProfileBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const memberId = btn.getAttribute('data-member');
            const member = teamMembers[memberId];
            if (member) {
                let skillsHTML = member.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('');
                
                profileDetails.innerHTML = `
                    <div style="display: flex; align-items: center; margin-bottom: 25px; flex-wrap: wrap; gap: 20px;">
                        <img src="img/foto${memberId == 1 ? ' uky' : memberId == 2 ? ' tata' : memberId == 3 ? ' tomy' : memberId == 4 ? ' ridho' : ' verlita'}.jpg" 
                             alt="${member.name}" 
                             style="width: 100px; height: 100px; border-radius: 50%; object-fit: cover; border: 2px solid var(--accent-color);">
                        <div>
                            <h2 style="font-size: 1.5rem;">${member.name}</h2>
                            <p style="color: var(--accent-color); font-weight: 500;">${member.role}</p>
                            <p style="color: var(--text-secondary); font-size: 0.9rem;">${member.expertise}</p>
                        </div>
                    </div>
                    <p style="margin-bottom: 20px; color: var(--text-secondary);">${member.bio}</p>
                    <div style="margin-bottom: 25px;">
                        <h4 style="margin-bottom: 10px;">Keahlian</h4>
                        <div style="display: flex; flex-wrap: wrap; gap: 8px;">
                            ${skillsHTML}
                        </div>
                    </div>
                    <div>
                        <h4 style="margin-bottom: 10px;">Media Sosial</h4>
                        <div class="team-social">
                            <a href="${member.social.instagram}" target="_blank"><i class="fab fa-instagram"></i></a>
                            <a href="${member.social.figma}" target="_blank"><i class="fab fa-figma"></i></a>
                            <a href="${member.social.github}" target="_blank"><i class="fab fa-github"></i></a>
                        </div>
                    </div>
                `;
                profileModal.classList.add('active');
            }
        });
    });

    closeModalBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            profileModal.classList.remove('active');
        });
    });

    profileModal.addEventListener('click', (e) => {
        if (e.target === profileModal) {
            profileModal.classList.remove('active');
        }
    });

    // =====================
    // NOTIFICATION
    // =====================
    
    function showNotification(message) {
        const existing = document.querySelector('.notification');
        if (existing) existing.remove();

        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(-50%) translateY(20px)';
            notification.style.transition = 'all 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 2000);
    }

    // =====================
    // CHECKOUT & LOCATION LOGIC
    // =====================

    const checkoutModal = document.getElementById('checkout-modal');
    const checkoutBtn = document.getElementById('checkout-btn');
    const closeCheckoutModal = document.getElementById('close-checkout-modal');
    const checkoutForm = document.getElementById('checkout-form');
    const getLocationBtn = document.getElementById('get-location-btn');
    const buyerLocationInput = document.getElementById('buyer-location');

    // Buka modal checkout saat tombol diklik
    checkoutBtn.addEventListener('click', () => {
        if (cart.length === 0) {
            showNotification('Keranjang kosong!');
            return;
        }
        // Tutup sidebar keranjang dulu
        cartSidebar.classList.remove('active');
        overlay.classList.remove('active');
        
        // Buka modal checkout
        checkoutModal.classList.add('active');
    });

    // Tutup modal checkout
    closeCheckoutModal.addEventListener('click', () => {
        checkoutModal.classList.remove('active');
    });

    checkoutModal.addEventListener('click', (e) => {
        if (e.target === checkoutModal) {
            checkoutModal.classList.remove('active');
        }
    });

    // Logika Ambil Lokasi GPS
    getLocationBtn.addEventListener('click', () => {
        if (!navigator.geolocation) {
            showNotification('Browser tidak mendukung GPS');
            return;
        }

        showNotification('Mengambil lokasi...');
        
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude;
                const long = position.coords.longitude;
                const mapsUrl = `https://www.google.com/maps?q=${lat},${long}`;
                
                // Isi input dengan link Google Maps
                buyerLocationInput.value = mapsUrl;
                showNotification('Lokasi berhasil didapat!');
            },
            (error) => {
                showNotification('Gagal mendapatkan lokasi. Izinkan akses GPS.');
                console.error(error);
            }
        );
    });

    // Logika Submit Checkout
    checkoutForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const buyerName = document.getElementById('buyer-name').value;
        const buyerPhone = document.getElementById('buyer-phone').value;
        const buyerLocation = buyerLocationInput.value;

        if (!buyerName || !buyerPhone || !buyerLocation) {
            showNotification('Harap lengkapi semua data!');
            return;
        }

        // Hitung total lagi untuk pesan WA
        let grandTotal = 0;
        const daftarPesanan = cart.map((item, index) => {
            const itemPrice = parsePrice(item.price);
            const subtotal = itemPrice * item.qty;
            grandTotal += subtotal;
            return `${index + 1}. ${item.name} (${item.qty}x) - Rp ${item.price}`;
        }).join('\n');

        const pesanWA = `*ARKEN FISH GALLERY - PESANAN BARU*

*Detail Pesanan:*
 ${daftarPesanan}

*Total Pembelian:* Rp ${grandTotal.toLocaleString('id-ID')}

-------------------
*DATA PEMBELI:*
Nama: ${buyerName}
No. HP: ${buyerPhone}
Lokasi: ${buyerLocation}
-------------------

Terima kasih telah berbelanja di Arken Fish Gallery!`;

        const nomorWA = '6285755174851';
        const linkWA = `https://wa.me/${nomorWA}?text=${encodeURIComponent(pesanWA)}`;
        
        window.open(linkWA, '_blank');
        
        // Reset form dan tutup modal
        checkoutForm.reset();
        checkoutModal.classList.remove('active');
        showNotification('Mengarahkan ke WhatsApp...');

        

 });

    async function loadFishFromAPI() {

    try {

        const response = await fetch('/api/fish');

        const data = await response.json();

        console.log('DATA SQLITE:', data);

        // PISAHKAN DATA
        fishHias = data.filter(fish => fish.filter === 'hias');
        fishPredator = data.filter(fish => fish.filter === 'predator');

        // RENDER CARD
        renderFishCards('fish-hias-grid', fishHias);
        renderFishCards('fish-predator-grid', fishPredator);

    } catch (error) {

        console.error('Gagal mengambil data:', error);

    }
}

loadFishFromAPI();

 });
