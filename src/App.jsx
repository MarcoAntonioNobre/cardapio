import React, {useState, useEffect} from 'react';
import {Helmet} from 'react-helmet';
import {Toaster} from '@/components/ui/toaster';
import {useToast} from '@/components/ui/use-toast';
import useCart from '@/hooks/useCart';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Menu from '@/components/Menu';
import Cart from '@/components/Cart';
import {menuData} from '@/data/menu';

function App() {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('todos');
    const [searchTerm, setSearchTerm] = useState('');
    const [theme, setTheme] = useState('light');
    const {toast} = useToast();

    const {
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        cartTotal,
        cartItemsCount
    } = useCart();

    useEffect(() => {
        const root = window.document.documentElement;
        root.classList.remove('light', 'dark');
        root.classList.add(theme);
    }, [theme]);

    const handleThemeToggle = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    const handleAddToCart = (item) => {
        addToCart(item);
        toast({
            title: "Pizza no forno!",
            description: `A pizza ${item.name} foi adicionada ao carrinho.`,
            duration: 3500,
        });
    };

    const handleCheckout = () => {
        if (cart.length === 0) {
            toast({
                title: "Carrinho vazio",
                description: "Adicione produtos ao carrinho antes de finalizar o pedido.",
                variant: "destructive",
            });
            return;
        }

        const phoneNumber = "5511999999999";
        let message = "Olá, Gostaria de fazer o seguinte pedido:\n\n";

        cart.forEach(item => {
            message += `*${item.quantity}x* ${item.name}\n`;
        });

        message += `\n*Total:* R$ ${cartTotal.toFixed(2)}`;

        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

        window.open(whatsappUrl, '_blank');
    };

    const filteredItems = menuData.items.filter(item => {
        const matchesCategory = selectedCategory === 'todos' || item.category === selectedCategory;
        const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.description.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <>
            <Helmet>
                <title>Pizzaria</title>
                <meta name="description"
                      content="Explore nosso delicioso cardápio. Faça seu pedido online!"/>
            </Helmet>

            <div
                className="min-h-screen bg-orange-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 transition-colors duration-300">
                <Header
                    cartItemsCount={cartItemsCount}
                    onCartClick={() => setIsCartOpen(true)}
                    theme={theme}
                    onThemeToggle={handleThemeToggle}
                />
                <main>
                    <Hero/>
                    <Menu
                        menuData={menuData}
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                        selectedCategory={selectedCategory}
                        setSelectedCategory={setSelectedCategory}
                        filteredItems={filteredItems}
                        onAddToCart={handleAddToCart}
                    />
                </main>
                <Cart
                    isOpen={isCartOpen}
                    onClose={() => setIsCartOpen(false)}
                    cart={cart}
                    cartItemsCount={cartItemsCount}
                    cartTotal={cartTotal}
                    updateQuantity={updateQuantity}
                    removeFromCart={removeFromCart}
                    handleCheckout={handleCheckout}
                />
                <Toaster/>
            </div>
        </>
    );
}

export default App;
