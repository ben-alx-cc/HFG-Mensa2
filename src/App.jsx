import React, { useState } from 'react';
import { ShoppingCart, Plus, Minus, Trash2, CreditCard, X, Check, Star, Sparkles } from 'lucide-react';

const App = () => {
  const [balance, setBalance] = useState(25.00);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [totalSpent, setTotalSpent] = useState(0);
  const [loyaltyPoints, setLoyaltyPoints] = useState(0);
  const [cartAnimation, setCartAnimation] = useState(false);
  const [fireworks, setFireworks] = useState([]);
  const [showLoyaltyCard, setShowLoyaltyCard] = useState(false);

  // Speisekarte Daten
  const menuItems = {
    hauptgerichte: [
      { id: 1, name: 'Pasta Arrabiata', price: 3.50, category: 'Hauptgerichte', vegan: true },
      { id: 2, name: 'Vegetarisches Curry', price: 4.20, category: 'Hauptgerichte', vegetarian: true },
      { id: 3, name: 'Gemüse-Pfanne Asia', price: 3.80, category: 'Hauptgerichte', vegan: true },
      { id: 4, name: 'Schnitzel mit Pommes', price: 4.50, category: 'Hauptgerichte' },
      { id: 5, name: 'Linsen-Dal', price: 3.20, category: 'Hauptgerichte', vegan: true },
      { id: 6, name: 'Pizza Margherita', price: 3.90, category: 'Hauptgerichte', vegetarian: true },
    ],
    suppen: [
      { id: 7, name: 'Tomatensuppe', price: 2.50, category: 'Suppen & Salate', vegan: true },
      { id: 8, name: 'Kürbissuppe', price: 2.80, category: 'Suppen & Salate', vegetarian: true },
      { id: 9, name: 'Caesar Salad', price: 3.50, category: 'Suppen & Salate', vegetarian: true },
      { id: 10, name: 'Gemischter Salat', price: 2.90, category: 'Suppen & Salate', vegan: true },
    ],
    beilagen: [
      { id: 11, name: 'Pommes Frites', price: 1.50, category: 'Beilagen', vegan: true },
      { id: 12, name: 'Reis', price: 1.20, category: 'Beilagen', vegan: true },
      { id: 13, name: 'Kartoffeln', price: 1.30, category: 'Beilagen', vegan: true },
      { id: 14, name: 'Gemüse der Saison', price: 1.80, category: 'Beilagen', vegan: true },
    ],
    desserts: [
      { id: 15, name: 'Schoko-Pudding', price: 1.50, category: 'Desserts', vegetarian: true },
      { id: 16, name: 'Obstsalat', price: 1.80, category: 'Desserts', vegan: true },
      { id: 17, name: 'Tiramisu', price: 2.20, category: 'Desserts', vegetarian: true },
      { id: 18, name: 'Apfelkuchen', price: 1.90, category: 'Desserts', vegetarian: true },
    ],
    getraenke: [
      { id: 19, name: 'Kaffee', price: 1.50, category: 'Getränke', vegan: true },
      { id: 20, name: 'Cappuccino', price: 2.00, category: 'Getränke', vegetarian: true },
      { id: 21, name: 'Club Mate', price: 2.50, category: 'Getränke', vegan: true },
      { id: 22, name: 'Wasser 0,5l', price: 1.00, category: 'Getränke', vegan: true },
      { id: 23, name: 'Apfelsaft', price: 1.80, category: 'Getränke', vegan: true },
      { id: 24, name: 'Tee', price: 1.20, category: 'Getränke', vegan: true },
    ],
  };

  // Warenkorb-Funktionen
  const addToCart = (item) => {
    const existingItem = cart.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
      setCart(cart.map(cartItem =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      ));
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const updateQuantity = (itemId, change) => {
    setCart(cart.map(item => {
      if (item.id === itemId) {
        const newQuantity = item.quantity + change;
        return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const removeFromCart = (itemId) => {
    setCart(cart.filter(item => item.id !== itemId));
  };

  const getTotalPrice = () => {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  };

  const handleCheckout = () => {
    const total = getTotalPrice();
    if (total > balance) {
      alert('Nicht genug Guthaben!');
      return;
    }
    
    // Guthaben abziehen
    setBalance(balance - total);
    
    // Treuepunkte berechnen
    const newTotalSpent = totalSpent + total;
    const newPoints = Math.floor(newTotalSpent / 5);
    const oldPoints = Math.floor(totalSpent / 5);
    const pointsEarned = newPoints - oldPoints;
    
    setTotalSpent(newTotalSpent);
    setLoyaltyPoints(newPoints);
    
    // Feuerwerk für jeden neuen Treuepunkt
    if (pointsEarned > 0) {
      triggerFireworks(pointsEarned);
    }
    
    setCart([]);
    setShowCheckout(true);
    setShowCart(false);
    setTimeout(() => setShowCheckout(false), 3000);
  };

  const triggerFireworks = (count) => {
    for (let i = 0; i < count; i++) {
      setTimeout(() => {
        const newFirework = {
          id: Date.now() + i,
          particles: Array.from({ length: 20 }, (_, j) => ({
            id: j,
            x: Math.random() * 100 - 50,
            y: Math.random() * 100 - 50,
            color: ['#FF6B35', '#E63946', '#FFD700', '#FF1493'][Math.floor(Math.random() * 4)],
          }))
        };
        setFireworks(prev => [...prev, newFirework]);
        setTimeout(() => {
          setFireworks(prev => prev.filter(fw => fw.id !== newFirework.id));
        }, 1500);
      }, i * 300);
    }
  };

  const handleCartClick = () => {
    setCartAnimation(true);
    setShowCart(!showCart);
    setTimeout(() => setCartAnimation(false), 600);
  };

  // Menu Item Card Component
  const MenuItemCard = ({ item }) => (
    <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-2">
        <div className="flex-1">
          <h3 className="font-semibold text-gray-800">{item.name}</h3>
          <div className="flex gap-2 mt-1">
            {item.vegan && (
              <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">Vegan</span>
            )}
            {item.vegetarian && !item.vegan && (
              <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">Vegetarisch</span>
            )}
          </div>
        </div>
        <span className="font-bold text-hfg-orange text-lg">{item.price.toFixed(2)}€</span>
      </div>
      <button
        onClick={() => addToCart(item)}
        className="w-full mt-3 bg-hfg-orange hover:bg-hfg-red text-white py-2 rounded-md transition-colors flex items-center justify-center gap-2"
      >
        <Plus size={18} />
        Hinzufügen
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-hfg-dark">HfG Mensa</h1>
              <p className="text-sm text-gray-600">Bonus Karte</p>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowLoyaltyCard(!showLoyaltyCard)}
                className="flex items-center gap-2 bg-gradient-to-r from-hfg-orange to-hfg-red text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all"
              >
                <Star size={20} fill="white" />
                <span className="font-semibold">{loyaltyPoints}</span>
              </button>
              <div className="text-right">
                <p className="text-sm text-gray-600">Guthaben</p>
                <p className="text-xl font-bold text-hfg-orange">{balance.toFixed(2)}€</p>
              </div>
              <button
                onClick={handleCartClick}
                className={`relative bg-hfg-orange hover:bg-hfg-red text-white p-3 rounded-full transition-all ${
                  cartAnimation ? 'animate-cart-bounce' : ''
                }`}
              >
                <ShoppingCart size={24} className={cartAnimation ? 'animate-spin-once' : ''} />
                {getTotalItems() > 0 && (
                  <span className="absolute -top-2 -right-2 bg-hfg-red text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold animate-pulse">
                    {getTotalItems()}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Hauptgerichte */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-hfg-dark mb-6">Hauptgerichte</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {menuItems.hauptgerichte.map(item => (
              <MenuItemCard key={item.id} item={item} />
            ))}
          </div>
        </section>

        {/* Suppen & Salate */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-hfg-dark mb-6">Suppen & Salate</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {menuItems.suppen.map(item => (
              <MenuItemCard key={item.id} item={item} />
            ))}
          </div>
        </section>

        {/* Beilagen */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-hfg-dark mb-6">Beilagen</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {menuItems.beilagen.map(item => (
              <MenuItemCard key={item.id} item={item} />
            ))}
          </div>
        </section>

        {/* Desserts */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-hfg-dark mb-6">Desserts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {menuItems.desserts.map(item => (
              <MenuItemCard key={item.id} item={item} />
            ))}
          </div>
        </section>

        {/* Getränke */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-hfg-dark mb-6">Getränke</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {menuItems.getraenke.map(item => (
              <MenuItemCard key={item.id} item={item} />
            ))}
          </div>
        </section>
      </main>

      {/* Warenkorb Sidebar */}
      {showCart && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setShowCart(false)} />
          <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl flex flex-col">
            <div className="p-6 border-b flex justify-between items-center">
              <h2 className="text-2xl font-bold text-hfg-dark">Warenkorb</h2>
              <button onClick={() => setShowCart(false)} className="p-2 hover:bg-gray-100 rounded-full">
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {cart.length === 0 ? (
                <div className="text-center py-12">
                  <ShoppingCart size={64} className="mx-auto text-gray-300 mb-4" />
                  <p className="text-gray-500">Dein Warenkorb ist leer</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map(item => (
                    <div key={item.id} className="bg-gray-50 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-semibold text-gray-800">{item.name}</h3>
                          <p className="text-sm text-gray-600">{item.price.toFixed(2)}€</p>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="bg-white border border-gray-300 p-1 rounded hover:bg-gray-100"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="font-semibold w-8 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="bg-white border border-gray-300 p-1 rounded hover:bg-gray-100"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                        <span className="font-bold text-hfg-orange">
                          {(item.price * item.quantity).toFixed(2)}€
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-6 border-t bg-gray-50">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-semibold">Gesamt</span>
                  <span className="text-2xl font-bold text-hfg-orange">
                    {getTotalPrice().toFixed(2)}€
                  </span>
                </div>
                <button
                  onClick={handleCheckout}
                  disabled={getTotalPrice() > balance}
                  className="w-full bg-hfg-orange hover:bg-hfg-red disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
                >
                  <CreditCard size={20} />
                  {getTotalPrice() > balance ? 'Nicht genug Guthaben' : 'Jetzt bezahlen'}
                </button>
                {getTotalPrice() > balance && (
                  <p className="text-sm text-red-500 text-center mt-2">
                    Es fehlen {(getTotalPrice() - balance).toFixed(2)}€
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Checkout Success Message */}
      {showCheckout && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-8 max-w-sm mx-4 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
              <Check size={32} className="text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Bezahlung erfolgreich!</h3>
            <p className="text-gray-600 mb-4">
              Ausgegeben: {totalSpent.toFixed(2)}€ (Gesamt)
            </p>
            <p className="text-lg font-semibold text-hfg-orange">
              Neues Guthaben: {balance.toFixed(2)}€
            </p>
            {loyaltyPoints > 0 && (
              <div className="mt-4 p-3 bg-gradient-to-r from-hfg-orange to-hfg-red rounded-lg">
                <div className="flex items-center justify-center gap-2 text-white">
                  <Star size={20} fill="white" />
                  <span className="font-bold">{loyaltyPoints} Treuepunkte</span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Bonuskarte Modal */}
      {showLoyaltyCard && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full overflow-hidden shadow-2xl">
            <div className="bg-gradient-to-br from-hfg-orange via-hfg-red to-hfg-dark p-6 text-white relative overflow-hidden">
              <button 
                onClick={() => setShowLoyaltyCard(false)}
                className="absolute top-4 right-4 text-white hover:bg-white/20 rounded-full p-1"
              >
                <X size={24} />
              </button>
              <div className="absolute top-0 right-0 opacity-10">
                <Sparkles size={120} />
              </div>
              <h2 className="text-2xl font-bold mb-2">HfG Bonuskarte</h2>
              <p className="text-sm opacity-90">Sammle Punkte bei jedem Einkauf!</p>
            </div>
            
            <div className="p-6">
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-hfg-orange to-hfg-red rounded-full mb-4 shadow-lg">
                  <Star size={48} fill="white" className="text-white" />
                </div>
                <h3 className="text-4xl font-bold text-hfg-dark mb-2">{loyaltyPoints}</h3>
                <p className="text-gray-600">Treuepunkte</p>
              </div>

              <div className="space-y-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-700 font-semibold">Gesamt ausgegeben</span>
                    <span className="text-hfg-orange font-bold">{totalSpent.toFixed(2)}€</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-hfg-orange to-hfg-red h-full transition-all duration-500 rounded-full"
                      style={{ width: `${((totalSpent % 5) / 5) * 100}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Noch {(5 - (totalSpent % 5)).toFixed(2)}€ bis zum nächsten Punkt
                  </p>
                </div>

                <div className="grid grid-cols-5 gap-2">
                  {[...Array(10)].map((_, i) => (
                    <div
                      key={i}
                      className={`aspect-square rounded-lg flex items-center justify-center ${
                        i < loyaltyPoints
                          ? 'bg-gradient-to-br from-hfg-orange to-hfg-red shadow-md'
                          : 'bg-gray-200'
                      }`}
                    >
                      <Star
                        size={20}
                        fill={i < loyaltyPoints ? 'white' : 'transparent'}
                        className={i < loyaltyPoints ? 'text-white' : 'text-gray-400'}
                      />
                    </div>
                  ))}
                </div>

                <div className="bg-gradient-to-r from-hfg-orange/10 to-hfg-red/10 rounded-lg p-4 border-2 border-hfg-orange/20">
                  <p className="text-sm text-center text-gray-700">
                    <strong>🎉 Jede 5€</strong> = 1 Treuepunkt<br/>
                    Sammle 10 Punkte für eine Überraschung!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Feuerwerk Animation */}
      {fireworks.map(firework => (
        <div key={firework.id} className="fixed top-1/2 left-1/2 z-[60] pointer-events-none">
          {firework.particles.map(particle => (
            <div
              key={particle.id}
              className="absolute w-3 h-3 rounded-full animate-firework"
              style={{
                backgroundColor: particle.color,
                '--tx': `${particle.x}vw`,
                '--ty': `${particle.y}vh`,
                boxShadow: `0 0 10px ${particle.color}`,
              }}
            />
          ))}
        </div>
      ))}

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes firework {
          0% {
            transform: translate(0, 0) scale(1);
            opacity: 1;
          }
          100% {
            transform: translate(var(--tx), var(--ty)) scale(0);
            opacity: 0;
          }
        }
        
        @keyframes spin-once {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @keyframes cart-bounce {
          0%, 100% { transform: scale(1); }
          25% { transform: scale(1.2) rotate(10deg); }
          50% { transform: scale(1.1) rotate(-10deg); }
          75% { transform: scale(1.15) rotate(5deg); }
        }
        
        .animate-firework {
          animation: firework 1.5s ease-out forwards;
        }
        
        .animate-spin-once {
          animation: spin-once 0.6s ease-in-out;
        }
        
        .animate-cart-bounce {
          animation: cart-bounce 0.6s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default App;

