// Dados simples para teste
const menuData = {
    products: [
        {
            id: 1,
            nomeproduto: 'Pizza Calabresa',
            descricao: 'Pizza deliciosa com calabresa',
            categoria: 'Pizzas',
            availableSizes: [{ key: 'M', name: 'Média', price: 38.00 }],
            linkfoto: 'https://drive.google.com/uc?export=view&id=1V1G_pXEiS-LJRckp06Yj27byJC1UvKm7'
        },
        {
            id: 2,
            nomeproduto: 'Hambúrguer',
            descricao: 'Hambúrguer artesanal',
            categoria: 'Lanches', 
            availableSizes: [{ key: 'P', name: 'Simples', price: 24.00 }],
            linkfoto: 'https://drive.google.com/uc?export=view&id=17rjbam5cHXaA6N-_DgdMBMIuQEgzMD7a'
        }
    ],
    whatsappNumber: '5511999999999'
};

class CardapioApp {
    constructor() {
        console.log('✅ App iniciando...');
        this.cart = [];
        this.init();
    }

    init() {
        console.log('✅ Renderizando interface...');
        this.renderProducts();
    }

    renderProducts() {
        const root = document.getElementById('root');
        
        if (!root) {
            console.error('❌ Elemento #root não encontrado!');
            return;
        }

        root.innerHTML = `
            <div class="container">
                <div class="header">
                    <h1>🍕 Cardápio Digital</h1>
                    <p>Teste de funcionamento</p>
                </div>
                
                <div class="products-grid">
                    ${menuData.products.map(product => `
                        <div class="product-card">
                            <img src="${product.linkfoto}" alt="${product.nomeproduto}" class="product-image">
                            <h3>${product.nomeproduto}</h3>
                            <p>${product.descricao}</p>
                            <p><strong>R$ ${product.availableSizes[0].price.toFixed(2)}</strong></p>
                            <button class="btn" onclick="app.addToCart(${product.id})">
                                Adicionar ao Carrinho
                            </button>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;

        console.log('✅ Interface renderizada com sucesso!');
    }

    addToCart(productId) {
        alert(`Produto ${productId} adicionado ao carrinho!`);
        console.log('✅ Produto adicionado:', productId);
    }
}

// Inicializa o app quando a página carregar
document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ DOM carregado, iniciando app...');
    window.app = new CardapioApp();
});

console.log('✅ Script carregado, aguardando DOM...');    ],
    whatsappNumber: '5511999999999'
};

class CardapioApp {
    constructor() {
        this.cart = JSON.parse(localStorage.getItem('cart')) || [];
        this.currentCategory = 'Todos';
        this.init();
    }

    init() {
        this.renderHeader();
        this.renderCategories();
        this.renderProducts();
        this.attachEventListeners();
        this.updateCartCount();
    }

    renderHeader() {
        const header = `
            <header class="header">
                <div class="container">
                    <nav class="navbar">
                        <div class="logo">🍕 Cardápio Digital</div>
                        <div class="cart-icon" onclick="app.toggleCart()">
                            <i class="fas fa-shopping-cart"></i>
                            <span class="cart-badge" id="cartCount">0</span>
                        </div>
                    </nav>
                </div>
            </header>
        `;
        document.getElementById('root').innerHTML = header;
    }

    renderCategories() {
        const categories = ['Todos', ...new Set(menuData.products.map(p => p.categoria))];
        const categoriesHTML = `
            <div class="container">
                <div class="categories">
                    ${categories.map(cat => `
                        <button class="category-btn ${this.currentCategory === cat ? 'active' : ''}" 
                                onclick="app.filterByCategory('${cat}')">
                            ${cat}
                        </button>
                    `).join('')}
                </div>
            </div>
        `;
        document.getElementById('root').innerHTML += categoriesHTML;
    }

    renderProducts() {
        const filteredProducts = this.currentCategory === 'Todos' 
            ? menuData.products 
            : menuData.products.filter(p => p.categoria === this.currentCategory);

        const productsHTML = `
            <div class="container">
                <div class="products-grid">
                    ${filteredProducts.map(product => `
                        <div class="product-card" onclick="app.showProductDetail(${product.id})">
                            <img src="${product.linkfoto}" alt="${product.nomeproduto}" class="product-image">
                            <div class="product-info">
                                <div class="product-name">${product.nomeproduto}</div>
                                <div class="product-description">${product.descricao}</div>
                                <div class="product-price">
                                    R$ ${Math.min(...product.availableSizes.map(s => s.price)).toFixed(2)}
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
        
        // Remove produtos antigos e adiciona novos
        const existingProducts = document.querySelector('.products-grid');
        if (existingProducts) {
            existingProducts.innerHTML = filteredProducts.map(product => `
                <div class="product-card" onclick="app.showProductDetail(${product.id})">
                    <img src="${product.linkfoto}" alt="${product.nomeproduto}" class="product-image">
                    <div class="product-info">
                        <div class="product-name">${product.nomeproduto}</div>
                        <div class="product-description">${product.descricao}</div>
                        <div class="product-price">
                            R$ ${Math.min(...product.availableSizes.map(s => s.price)).toFixed(2)}
                        </div>
                    </div>
                </div>
            `).join('');
        } else {
            document.getElementById('root').innerHTML += productsHTML;
        }
    }

    showProductDetail(productId) {
        const product = menuData.products.find(p => p.id === productId);
        const modalHTML = `
            <div class="cart-modal" style="display: block;">
                <div class="cart-content">
                    <h2>${product.nomeproduto}</h2>
                    <img src="${product.linkfoto}" alt="${product.nomeproduto}" style="width: 100%; height: 200px; object-fit: cover; border-radius: 8px; margin: 1rem 0;">
                    <p>${product.descricao}</p>
                    
                    <div style="margin: 1rem 0;">
                        <h3>Tamanhos:</h3>
                        ${product.availableSizes.map(size => `
                            <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.5rem 0; border-bottom: 1px solid #eee;">
                                <span>${size.name}</span>
                                <span>R$ ${size.price.toFixed(2)}</span>
                                <button class="btn btn-primary" onclick="app.addToCart(${product.id}, '${size.key}')">
                                    Adicionar
                                </button>
                            </div>
                        `).join('')}
                    </div>
                    
                    <button class="btn" onclick="app.closeModal()" style="margin-top: 1rem;">Fechar</button>
                </div>
            </div>
        `;
        document.body.innerHTML += modalHTML;
    }

    addToCart(productId, sizeKey) {
        const product = menuData.products.find(p => p.id === productId);
        const size = product.availableSizes.find(s => s.key === sizeKey);
        
        const cartItem = {
            id: product.id,
            nomeproduto: product.nomeproduto,
            selectedSize: size.key,
            sizeName: size.name,
            price: size.price,
            quantity: 1,
            linkfoto: product.linkfoto
        };

        const existingItem = this.cart.find(item => 
            item.id === productId && item.selectedSize === sizeKey
        );

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.cart.push(cartItem);
        }

        this.saveCart();
        this.updateCartCount();
        this.closeModal();
        alert('Produto adicionado ao carrinho!');
    }

    toggleCart() {
        this.renderCart();
    }

    renderCart() {
        const cartHTML = `
            <div class="cart-modal" style="display: block;">
                <div class="cart-content">
                    <h2>Meu Carrinho</h2>
                    
                    ${this.cart.length === 0 ? `
                        <p style="text-align: center; padding: 2rem;">Carrinho vazio</p>
                    ` : `
                        <div id="cartItems">
                            ${this.cart.map((item, index) => `
                                <div class="cart-item">
                                    <img src="${item.linkfoto}" alt="${item.nomeproduto}" class="cart-item-image">
                                    <div class="cart-item-info">
                                        <div><strong>${item.nomeproduto}</strong></div>
                                        <div>${item.sizeName}</div>
                                        <div>R$ ${item.price.toFixed(2)}</div>
                                    </div>
                                    <div class="quantity-controls">
                                        <button class="quantity-btn" onclick="app.updateQuantity(${index}, -1)">-</button>
                                        <span>${item.quantity}</span>
                                        <button class="quantity-btn" onclick="app.updateQuantity(${index}, 1)">+</button>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                        
                        <div style="margin-top: 1rem; padding-top: 1rem; border-top: 1px solid #eee;">
                            <div style="display: flex; justify-content: space-between; font-size: 1.2rem; font-weight: bold;">
                                <span>Total:</span>
                                <span>R$ ${this.getTotalPrice().toFixed(2)}</span>
                            </div>
                            
                            <button class="btn btn-success" onclick="app.checkout()" style="width: 100%; margin-top: 1rem;">
                                Fazer Pedido via WhatsApp
                            </button>
                        </div>
                    `}
                    
                    <button class="btn" onclick="app.closeModal()" style="margin-top: 1rem; width: 100%;">Fechar</button>
                </div>
            </div>
        `;
        document.body.innerHTML += cartHTML;
    }

    updateQuantity(index, change) {
        this.cart[index].quantity += change;
        
        if (this.cart[index].quantity <= 0) {
            this.cart.splice(index, 1);
        }
        
        this.saveCart();
        this.updateCartCount();
        this.closeModal();
        this.renderCart(); // Re-renderiza o carrinho
    }

    getTotalPrice() {
        return this.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    checkout() {
        if (this.cart.length === 0) {
            alert('Carrinho vazio!');
            return;
        }

        const clientName = prompt('Seu nome:');
        const clientAddress = prompt('Seu endereço:');

        if (!clientName || !clientAddress) {
            alert('Por favor, preencha seu nome e endereço!');
            return;
        }

        const orderItems = this.cart.map(item => 
            `${item.nomeproduto} - ${item.sizeName} - ${item.quantity}x - R$ ${(item.price * item.quantity).toFixed(2)}`
        ).join('%0A');

        const message = `*Novo Pedido via App:*%0A${orderItems}%0A%0A*Total Geral:* R$ ${this.getTotalPrice().toFixed(2)}%0A%0A*Nome do cliente:* ${clientName}%0A*Endereço do cliente:* ${clientAddress}`;

        const whatsappUrl = `https://wa.me/${menuData.whatsappNumber}?text=${message}`;
        
        window.open(whatsappUrl, '_blank');
        this.cart = [];
        this.saveCart();
        this.updateCartCount();
        this.closeModal();
    }

    filterByCategory(category) {
        this.currentCategory = category;
        this.renderProducts();
        
        // Atualiza botões ativos
        document.querySelectorAll('.category-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        event.target.classList.add('active');
    }

    closeModal() {
        const modal = document.querySelector('.cart-modal');
        if (modal) {
            modal.remove();
        }
    }

    updateCartCount() {
        const totalItems = this.cart.reduce((sum, item) => sum + item.quantity, 0);
        const cartCount = document.getElementById('cartCount');
        if (cartCount) {
            cartCount.textContent = totalItems;
            cartCount.style.display = totalItems > 0 ? 'flex' : 'none';
        }
    }

    saveCart() {
        localStorage.setItem('cart', JSON.stringify(this.cart));
    }

    attachEventListeners() {
        // Fechar modal clicando fora
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('cart-modal')) {
                this.closeModal();
            }
        });
    }
}

// Inicializa o app

const app = new CardapioApp();
