import React, { useState, useEffect } from 'react';
import { 
  ShoppingBag, Plus, Minus, Trash2, Search, Menu as MenuIcon, X, 
  CheckCircle, ArrowLeft, Clock, MapPin, Phone, ShieldCheck, Heart, Users,
  Upload, FileText, Calendar, Lock, Unlock, Settings, Palette, Edit2, Save, AlertCircle
} from 'lucide-react';

const INITIAL_THEMES = {
  classic: {
    name: "Clásico Ciao Bella (Teal)",
    primary: "teal-600",
    primaryBg: "bg-teal-600",
    primaryHover: "hover:bg-teal-700",
    primaryText: "text-teal-600",
    accentBg: "bg-teal-50",
    badgeBg: "bg-teal-100 text-teal-800",
    buttonClass: "bg-teal-600 hover:bg-teal-700 text-white"
  },
  romance: {
    name: "Romántico / Pasión (Rojo)",
    primary: "red-800",
    primaryBg: "bg-red-800",
    primaryHover: "hover:bg-red-900",
    primaryText: "text-red-800",
    accentBg: "bg-red-50",
    badgeBg: "bg-red-100 text-red-800",
    buttonClass: "bg-red-800 hover:bg-red-900 text-white"
  },
  autumn: {
    name: "Otoño Cálido",
    primary: "amber-700",
    primaryBg: "bg-amber-700",
    primaryHover: "hover:bg-amber-800",
    primaryText: "text-amber-700",
    accentBg: "bg-amber-50",
    badgeBg: "bg-amber-100 text-amber-800",
    buttonClass: "bg-amber-700 hover:bg-amber-800 text-white"
  }
};

const INITIAL_COMPANY_INFO = {
  mission: "Personas extraordinarias trabajando profesionalmente en un ambiente de paz, sirviendo pizzas, bebidas y postres excepcionales en tiempo récord, con un servicio de clase mundial.",
  vision: "Consolidarnos como la pizzería y cafetería referente en Chetumal y la región, expandiendo nuestra experiencia de paz, calidad superior y hospitalidad de clase mundial, siendo el lugar favorito donde cada cliente vive momentos extraordinarios.",
  values: "Profesionalismo, paz, respeto, calidad.",
  commitment: "En Ciao Bella Pizzería Café Bar nos comprometemos a superar tus expectativas en cada visita, cuidando cada detalle desde la selección de nuestros ingredientes artesanales hasta la calidez de nuestra atención."
};

const INITIAL_JOBS = [
  {
    id: 1,
    title: "Pizzero Artesanal con Experiencia",
    schedule: "Miércoles a Lunes (Martes descanso) | Turno vespertino",
    requirements: "Experiencia mínima de 1 año en estirado de masa a mano, manejo de hornos y preparación de ingredientes.",
    status: "Abierta",
    date: "7 de noviembre, 2026"
  },
  {
    id: 2,
    title: "Barista / Encargado de Barra",
    schedule: "Miércoles a Lunes (Martes descanso)",
    requirements: "Conocimiento en café de especialidad, frappés, chocolate tradicional y bebidas sin alcohol.",
    status: "Vacante cubierta",
    date: "1 de noviembre, 2026"
  }
];

const INITIAL_PRODUCTS = [
  { id: 'p1', name: 'Pizza Margarita Artesanal', category: 'Pizzas', price: 195, description: 'Salsa de tomate casera, mozzarella fresco, albahaca orgánica y aceite de oliva virgen extra.', image: 'https://images.unsplash.com/photo-1604382355076-af4b0eb60143?w=500&q=80', isPizza: true },
  { id: 'p2', name: 'Pizza Pepperoni Ciao Bella', category: 'Pizzas', price: 220, description: 'Doble pepperoni artesanal, mezcla de quesos melt y toque de orégano siciliano.', image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=500&q=80', isPizza: true },
  { id: 'p3', name: 'Pizza Cuatro Quesos', category: 'Pizzas', price: 245, description: 'Mozzarella, provolone, gorgonzola y parmesano reggianito sobre base blanca.', image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&q=80', isPizza: true },
  
  { id: 'b1', name: 'Café Latte de la Casa', category: 'Café', price: 65, description: 'Espresso doble de grano seleccionado con leche vaporizada cremosa.', image: 'https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?w=500&q=80', options: ['Caliente', 'Frío'] },
  { id: 'b2', name: 'Capuchino Artesanal', category: 'Café', price: 70, description: 'Equilibrio perfecto entre espresso, leche vaporizada y capa de espuma aterciopelada.', image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=500&q=80', options: ['Caliente', 'Frío'] },
  { id: 'b3', name: 'Café Espresso Americano', category: 'Café', price: 50, description: 'Extracción precisa y aromática de café de altura.', image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=500&q=80', options: ['Caliente', 'Frío'] },

  { id: 's1', name: 'Chocolate Abuelita Tradicional', category: 'Sin Café', price: 60, description: 'El auténtico sabor del chocolate caliente espumoso preparado artesanalmente.', image: 'https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?w=500&q=80', options: ['Caliente', 'Frío'] },
  { id: 's2', name: 'Tisana frutal o Té Chai', category: 'Sin Café', price: 55, description: 'Infusión aromática de frutos rojos o especias chai reconfortantes.', image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=500&q=80', options: ['Caliente', 'Frío'] },

  { id: 'f1', name: 'Frappé Moka Ciao Bella', category: 'Frappés', price: 85, description: 'Café espresso, chocolate artesanal, leche y hielo frappé con crema batida.', image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=500&q=80' },
  { id: 'f2', name: 'Frappé Caramelo Macchiato', category: 'Frappés', price: 85, description: 'Deliciosa combinación de espresso, leche, hielo y jarabe de caramelo.', image: 'https://images.unsplash.com/photo-1587049352847-4a222e784d38?w=500&q=80' },
  { id: 'f3', name: 'Frappé Oreo Cookies & Cream', category: 'Frappés', price: 90, description: 'Crema batida, galleta Oreo triturada y base cremosa sin café.', image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=500&q=80' },

  { id: 'm1', name: 'Clericot de la Casa (Sin Alcohol)', category: 'Sin Alcohol', price: 75, description: 'Refrescante mezcla de jugos naturales, frutas de temporada y toque frutal.', image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=500&q=80' },
  { id: 'm2', name: 'Sangría Ciao Bella (Sin Alcohol)', category: 'Sin Alcohol', price: 75, description: 'Bebida frutal espumosa con notas cítricas y manzana fresca.', image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=500&q=80' },
  { id: 'm3', name: 'Mezcalita Tropical Viridiana', category: 'Sin Alcohol', price: 80, description: 'Mocktail cítrico con maracuyá, jarabe artesanal y escarchado de sal de gusano.', image: 'https://images.unsplash.com/photo-1536935338788-846bb9981813?w=500&q=80' },

  { id: 'd1', name: 'Rol de Canela Glaseado', category: 'Panadería', price: 55, description: 'Recién horneado, suave, con glaseado de queso crema y canela fina.', image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500&q=80' },
  { id: 'd2', name: 'Pay de Limón Artesanal', category: 'Panadería', price: 65, description: 'Base crujiente de galleta con crema de limón real y merengue tostado.', image: 'https://images.unsplash.com/photo-1519869325930-281384150729?w=500&q=80' },
  { id: 'd3', name: 'Brownie con Nuez y Helado', category: 'Panadería', price: 75, description: 'Fudge de chocolate calientito acompañado de una bola de helado de vainilla.', image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=500&q=80' }
];

const PROMOTIONS = [
  { id: 1, day: "Miércoles", title: "2x1 en Café Americano y Latte", desc: "Disfruta el doble de energía de miércoles por la tarde.", active: false },
  { id: 2, day: "Jueves", title: "Pizza Familiar + Bebida Gratis", desc: "En la compra de cualquier pizza grande, llévate una jarra de clericot sin alcohol.", active: false },
  { id: 3, day: "Viernes", title: "Noche de Postres al 50%", desc: "En la compra de cualquier bebida, el segundo postre tiene mitad de precio.", active: false },
  { id: 4, day: "Sábado", title: "Sábado Romántico Ciao Bella", desc: "Ambiente especial, música en vivo y degustación de mocktails.", active: true },
  { id: 5, day: "Domingo", title: "Familiar Domingo de Pizzas", desc: "15% de descuento en la segunda pizza de especialidad.", active: false }
];

const INGREDIENTES_EXTRA = [
  { name: 'Pepperoni Extra', price: 35 },
  { name: 'Queso Extra Mozzarella', price: 40 },
  { name: 'Champiñones Frescos', price: 30 },
  { name: 'Tocino Crujiente', price: 35 },
  { name: 'Orilla Rellena de Queso', price: 55 }
];

export default function App() {
  const [currentView, setCurrentView] = useState('menu'); 
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [promotions, setPromotions] = useState(PROMOTIONS);
  const [companyInfo, setCompanyInfo] = useState(INITIAL_COMPANY_INFO);
  const [jobs, setJobs] = useState(INITIAL_JOBS);
  const [themeKey, setThemeKey] = useState('classic');
  const [heroImage, setHeroImage] = useState('https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1200&q=80');

  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [searchQuery, setSearchQuery] = useState('');

  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [tableNumber, setTableNumber] = useState('');
  const [orderNotes, setOrderNotes] = useState('');

  const [halfPizzaModal, setHalfPizzaModal] = useState(false);
  const [half1, setHalf1] = useState('');
  const [half2, setHalf2] = useState('');

  const [buildPizzaModal, setBuildPizzaModal] = useState(false);
  const [buildBase, setBuildBase] = useState('Salsa de Tomate y Mozzarella');
  const [buildIngredients, setBuildIngredients] = useState([]);

  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [adminUser, setAdminUser] = useState('');
  const [adminPass, setAdminPass] = useState('');
  const [editingProduct, setEditingProduct] = useState(null);

  const [applyingJob, setApplyingJob] = useState(null);
  const [applicantName, setApplicantName] = useState('');
  const [applicantPhone, setApplicantPhone] = useState('');
  const [applicantCV, setApplicantCV] = useState('');

  const currentTheme = INITIAL_THEMES[themeKey] || INITIAL_THEMES.classic;

  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#/admin') {
        setCurrentView('admin');
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    if (window.location.hash === '#/admin') {
      setCurrentView('admin');
    }
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const categories = ['Todas', 'Pizzas', 'Café', 'Sin Café', 'Frappés', 'Sin Alcohol', 'Panadería'];

  const filteredProducts = products.filter(p => {
    const matchesCategory = selectedCategory === 'Todas' || p.category === selectedCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const addToCart = (product, customOption = '') => {
    const cartId = customOption ? `${product.id}-${customOption}` : product.id;
    const existing = cart.find(item => item.cartId === cartId);
    if (existing) {
      setCart(cart.map(item => item.cartId === cartId ? { ...item, qty: item.qty + 1 } : item));
    } else {
      setCart([...cart, { ...product, cartId, customOption, qty: 1 }]);
    }
    setIsCartOpen(true);
  };

  const updateQty = (cartId, delta) => {
    setCart(cart.map(item => {
      if (item.cartId === cartId) {
        const newQty = item.qty + delta;
        return newQty > 0 ? { ...item, qty: newQty } : null;
      }
      return item;
    }).filter(Boolean));
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

  const checkoutWhatsApp = () => {
    if (!customerName.trim()) {
      alert("Por favor ingresa tu nombre para el pedido.");
      return;
    }
    let message = `🍕 *NUEVO PEDIDO - CIAO BELLA* ☕\n`;
    message += `👤 *Cliente:* ${customerName}\n`;
    if (tableNumber) message += `🪑 *Mesa / Envío:* ${tableNumber}\n`;
    message += `--------------------------------\n`;
    cart.forEach(item => {
      message += `• ${item.qty}x ${item.name} ${item.customOption ? `(${item.customOption})` : ''} - $${item.price * item.qty}\n`;
    });
    message += `--------------------------------\n`;
    message += `💰 *TOTAL: $${cartTotal}*\n`;
    if (orderNotes) message += `📝 *Notas:* ${orderNotes}\n`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/529831015415?text=${encoded}`, '_blank');
  };

  const handleAddHalfPizza = () => {
    if (!half1 || !half2) {
      alert("Por favor selecciona ambas mitades.");
      return;
    }
    const p1Obj = products.find(p => p.id === half1);
    const p2Obj = products.find(p => p.id === half2);
    const maxPrice = Math.max(p1Obj.price, p2Obj.price);

    const customPizza = {
      id: `half-${Date.now()}`,
      name: `Pizza Mitad ${p1Obj.name} y Mitad ${p2Obj.name}`,
      category: 'Pizzas',
      price: maxPrice,
      description: `Combinación personalizada de dos especialidades.`,
      image: p1Obj.image
    };
    addToCart(customPizza);
    setHalfPizzaModal(false);
    setHalf1('');
    setHalf2('');
  };

  const handleAddCustomPizza = () => {
    const extraTotal = buildIngredients.reduce((sum, ing) => sum + ing.price, 0);
    const basePrice = 225 + extraTotal;
    const customPizza = {
      id: `custom-${Date.now()}`,
      name: `Pizza Armada (${buildBase})`,
      category: 'Pizzas',
      price: basePrice,
      description: `Base: ${buildBase}. Ingredientes: ${buildIngredients.map(i => i.name).join(', ') || 'Ninguno'}.`,
      image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&q=80'
    };
    addToCart(customPizza);
    setBuildPizzaModal(false);
    setBuildIngredients([]);
  };

  const submitApplication = (e) => {
    e.preventDefault();
    if (!applicantName || !applicantPhone) {
      alert("Por favor completa tu nombre y teléfono.");
      return;
    }
    alert(`¡Gracias ${applicantName}! Tu postulación para "${applyingJob.title}" ha sido enviada con éxito. Nos pondremos en contacto contigo.`);
    setApplyingJob(null);
    setApplicantName('');
    setApplicantPhone('');
    setApplicantCV('');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setCurrentView('menu')}>
            <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center shadow-inner border border-amber-100">
              <span className="text-2xl">🍕</span>
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-slate-900 leading-none">Ciao Bella</h1>
              <span className="text-xs font-medium text-slate-500 uppercase tracking-widest">Pizzería Café Bar</span>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-2">
            <button 
              onClick={() => setCurrentView('menu')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${currentView === 'menu' ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'}`}
            >
              Menú & Pedidos
            </button>
            <button 
              onClick={() => setCurrentView('corazon')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center space-x-1.5 ${currentView === 'corazon' ? 'bg-red-800 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'}`}
            >
              <Heart className="w-4 h-4 text-red-500" />
              <span>El Corazón</span>
            </button>
            <button 
              onClick={() => setCurrentView('empleo')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center space-x-1.5 ${currentView === 'empleo' ? 'bg-teal-700 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'}`}
            >
              <Users className="w-4 h-4" />
              <span>Únete a Nuestro Equipo</span>
            </button>
          </div>

          <div className="flex items-center space-x-3">
            {currentView === 'menu' && (
              <button 
                onClick={() => setIsCartOpen(true)}
                className={`relative px-4 py-2.5 rounded-full ${currentTheme.buttonClass} flex items-center space-x-2 shadow-md transition-transform active:scale-95`}
              >
                <ShoppingBag className="w-5 h-5" />
                <span className="font-semibold text-sm">
                  {cart.reduce((sum, item) => sum + item.qty, 0)}
                </span>
              </button>
            )}

            <button 
              onClick={() => {
                if (currentView === 'admin') {
                  setCurrentView('menu');
                  window.location.hash = '';
                } else {
                  setCurrentView('admin');
                  window.location.hash = '/admin';
                }
              }}
              className="p-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition"
              title="Panel Administrativo"
            >
              <Settings className="w-5 h-5" />
            </button>
          </div>

        </div>

        <div className="md:hidden flex items-center justify-around bg-white border-t border-slate-100 py-2.5 px-2">
          <button 
            onClick={() => setCurrentView('menu')}
            className={`text-xs font-medium px-3 py-1.5 rounded-lg ${currentView === 'menu' ? 'bg-slate-900 text-white' : 'text-slate-600'}`}
          >
            Menú
          </button>
          <button 
            onClick={() => setCurrentView('corazon')}
            className={`text-xs font-medium px-3 py-1.5 rounded-lg ${currentView === 'corazon' ? 'bg-red-800 text-white' : 'text-slate-600'}`}
          >
            El Corazón
          </button>
          <button 
            onClick={() => setCurrentView('empleo')}
            className={`text-xs font-medium px-3 py-1.5 rounded-lg ${currentView === 'empleo' ? 'bg-teal-700 text-white' : 'text-slate-600'}`}
          >
            Bolsa de Trabajo
          </button>
        </div>
      </header>

      {currentView === 'menu' && (
        <main>
          <div className="relative bg-slate-900 text-white py-20 px-4 overflow-hidden">
            <div className="absolute inset-0 z-0 opacity-40">
              <img src={heroImage} alt="Ciao Bella Interior" className="w-full h-full object-cover" />
            </div>
            <div className="relative z-10 max-w-4xl mx-auto text-center space-y-4">
              <span className="px-3 py-1 rounded-full bg-white/20 text-xs font-semibold tracking-wider uppercase backdrop-blur-sm">
                Bienvenidos a
              </span>
              <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight font-serif">Ciao Bella</h2>
              <p className="text-lg text-slate-200 max-w-2xl mx-auto font-light">
                Disfruta de nuestras deliciosas pizzas artesanales, café de especialidad y cocteles únicos, donde inició México, Chetumal.
              </p>
              
              <div className="pt-4 flex flex-wrap justify-center gap-3 text-xs md:text-sm">
                <span className="bg-black/40 backdrop-blur-md px-4 py-2 rounded-full flex items-center space-x-2 border border-white/10">
                  <MapPin className="w-4 h-4 text-teal-400" />
                  <span>Blvd Bahía, Chetumal</span>
                </span>
                <span className="bg-black/40 backdrop-blur-md px-4 py-2 rounded-full flex items-center space-x-2 border border-white/10">
                  <Phone className="w-4 h-4 text-teal-400" />
                  <span>983 101 5415</span>
                </span>
                <span className="bg-black/40 backdrop-blur-md px-4 py-2 rounded-full flex items-center space-x-2 border border-white/10">
                  <Clock className="w-4 h-4 text-teal-400" />
                  <span>Mié - Lun (Martes Cerrado)</span>
                </span>
              </div>
            </div>
          </div>

          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20 mb-12">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-slate-900 flex items-center space-x-2">
                <span>🔥 Promociones de la Semana</span>
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {promotions.map((promo) => (
                <div key={promo.id} className={`p-4 rounded-2xl shadow-sm border transition-all ${promo.active ? 'bg-gradient-to-br from-red-50 to-amber-50 border-red-200 shadow-md ring-2 ring-red-500/20' : 'bg-white border-slate-200'}`}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500">{promo.day}</span>
                    {promo.active && <span className="text-xs bg-red-600 text-white px-2 py-0.5 rounded-full font-bold animate-pulse">Hoy</span>}
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm mb-1">{promo.title}</h4>
                  <p className="text-xs text-slate-600">{promo.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 flex flex-wrap gap-4">
            <button 
              onClick={() => setHalfPizzaModal(true)}
              className="flex-1 min-w-[240px] bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white p-4 rounded-2xl shadow-md flex items-center justify-center space-x-3 transition transform active:scale-[0.99]"
            >
              <span className="text-2xl">🍕✂️</span>
              <div className="text-left">
                <div className="font-bold">Pedir Pizza de Mitades</div>
                <div className="text-xs text-amber-100">Combina tus dos especialidades favoritas</div>
              </div>
            </button>

            <button 
              onClick={() => setBuildPizzaModal(true)}
              className="flex-1 min-w-[240px] bg-gradient-to-r from-slate-900 to-slate-800 hover:from-black hover:to-slate-900 text-white p-4 rounded-2xl shadow-md flex items-center justify-center space-x-3 transition transform active:scale-[0.99]"
            >
              <span className="text-2xl">👨‍🍳✨</span>
              <div className="text-left">
                <div className="font-bold">Arma Tu Propia Pizza</div>
                <div className="text-xs text-slate-300">Elige base, quesos e ingredientes a tu gusto</div>
              </div>
            </button>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
              
              <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-5 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap transition-all ${selectedCategory === cat ? currentTheme.buttonClass : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="relative w-full md:w-72">
                <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Buscar platillo o bebida..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-full border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm shadow-sm"
                />
              </div>

            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <div key={product.id} className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden flex flex-col justify-between hover:shadow-md transition-all group">
                  <div>
                    <div className="relative h-48 overflow-hidden bg-slate-100">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                      />
                      <span className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-slate-800 shadow-sm">
                        ${product.price}
                      </span>
                      <span className="absolute top-3 left-3 bg-slate-900/80 text-white backdrop-blur-md px-3 py-1 rounded-full text-xs font-medium">
                        {product.category}
                      </span>
                    </div>

                    <div className="p-5">
                      <h4 className="font-bold text-lg text-slate-900 mb-1">{product.name}</h4>
                      <p className="text-sm text-slate-600 line-clamp-2">{product.description}</p>
                    </div>
                  </div>

                  <div className="p-5 pt-0">
                    {product.options ? (
                      <div className="flex gap-2">
                        {product.options.map(opt => (
                          <button
                            key={opt}
                            onClick={() => addToCart(product, opt)}
                            className={`flex-1 py-2.5 rounded-xl text-xs font-bold border border-slate-200 hover:border-teal-600 hover:text-teal-600 transition flex items-center justify-center space-x-1`}
                          >
                            <Plus className="w-3.5 h-3.5" />
                            <span>{opt}</span>
                          </button>
                        ))}
                      </div>
                    ) : (
                      <button
                        onClick={() => addToCart(product)}
                        className={`w-full py-3 rounded-xl ${currentTheme.buttonClass} font-semibold text-sm flex items-center justify-center space-x-2 shadow-sm transition transform active:scale-98`}
                      >
                        <Plus className="w-4 h-4" />
                        <span>Agregar al Pedido</span>
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      )}

      {currentView === 'corazon' && (
        <div className="max-w-5xl mx-auto px-4 py-12">
          <div className="text-center space-y-4 mb-12">
            <span className="px-3.5 py-1 rounded-full bg-red-100 text-red-800 text-xs font-bold uppercase tracking-wider">
              Nuestra Esencia
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold font-serif text-slate-900">El Corazón de Ciao Bella</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Conoce los principios, la visión y el compromiso humano que hacen posible cada taza de café y cada pizza excepcional.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-red-50 rounded-full -mr-16 -mt-16 pointer-events-none"></div>
              <h3 className="text-xl font-bold text-slate-900 mb-3 flex items-center space-x-2">
                <span>🎯</span>
                <span>Misión</span>
              </h3>
              <p className="text-slate-700 leading-relaxed text-lg">
                {companyInfo.mission}
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-teal-50 rounded-full -mr-16 -mt-16 pointer-events-none"></div>
              <h3 className="text-xl font-bold text-slate-900 mb-3 flex items-center space-x-2">
                <span>🔭</span>
                <span>Visión</span>
              </h3>
              <p className="text-slate-700 leading-relaxed text-lg">
                {companyInfo.vision}
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white p-8 md:p-12 rounded-3xl shadow-lg mb-12">
            <h3 className="text-2xl font-bold mb-4 font-serif">Nuestros Valores Fundamentales</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {companyInfo.values.split(',').map((val, idx) => (
                <div key={idx} className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10 text-center">
                  <span className="block text-xl mb-1">✨</span>
                  <span className="font-semibold text-lg capitalize">{val.trim()}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 text-center space-y-4">
            <h3 className="text-2xl font-bold text-slate-900 font-serif">Nuestro Compromiso Contigo</h3>
            <p className="text-slate-600 max-w-3xl mx-auto leading-relaxed">
              {companyInfo.commitment}
            </p>
          </div>
        </div>
      )}

      {currentView === 'empleo' && (
        <div className="max-w-5xl mx-auto px-4 py-12">
          <div className="text-center space-y-4 mb-12">
            <span className="px-3.5 py-1 rounded-full bg-teal-100 text-teal-800 text-xs font-bold uppercase tracking-wider">
              Únete a Nuestro Equipo
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold font-serif text-slate-900">Forma Parte de Ciao Bella</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Buscamos personas apasionadas, profesionales y con deseos de trascender en un ambiente de paz y hospitalidad de clase mundial.
            </p>
          </div>

          <div className="space-y-6">
            {jobs.map(job => (
              <div key={job.id} className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-slate-100 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div className="space-y-2">
                  <div className="flex items-center space-x-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${job.status === 'Abierta' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-700'}`}>
                      {job.status}
                    </span>
                    <span className="text-xs text-slate-400">Publicado el {job.date}</span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">{job.title}</h3>
                  <p className="text-sm text-slate-600"><strong>Horario:</strong> {job.schedule}</p>
                  <p className="text-sm text-slate-600"><strong>Requisitos:</strong> {job.requirements}</p>
                </div>

                {job.status === 'Abierta' ? (
                  <button
                    onClick={() => setApplyingJob(job)}
                    className="w-full md:w-auto px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-2xl shadow-sm transition"
                  >
                    Postularme Ahora
                  </button>
                ) : (
                  <button disabled className="w-full md:w-auto px-6 py-3 bg-slate-100 text-slate-400 font-semibold rounded-2xl cursor-not-allowed">
                    Vacante Cubierta
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {currentView === 'admin' && (
        <div className="max-w-6xl mx-auto px-4 py-12">
          {!isAdminLoggedIn ? (
            <div className="max-w-md mx-auto bg-white p-8 rounded-3xl shadow-lg border border-slate-100">
              <div className="text-center space-y-2 mb-6">
                <div className="w-12 h-12 bg-slate-900 text-white rounded-2xl mx-auto flex items-center justify-center">
                  <Lock className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold">Panel de Administrador</h3>
                <p className="text-xs text-slate-500">Ingresa tus credenciales para gestionar Ciao Bella</p>
              </div>

              <form onSubmit={(e) => {
                e.preventDefault();
                if (adminUser === 'admin' && adminPass === 'password') {
                  setIsAdminLoggedIn(true);
                } else {
                  alert("Credenciales incorrectas (Usa admin / password)");
                }
              }} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Usuario</label>
                  <input 
                    type="text" 
                    value={adminUser}
                    onChange={(e) => setAdminUser(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-teal-500 text-sm"
                    placeholder="admin"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Contraseña</label>
                  <input 
                    type="password" 
                    value={adminPass}
                    onChange={(e) => setAdminPass(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-teal-500 text-sm"
                    placeholder="password"
                  />
                </div>
                <button type="submit" className="w-full py-3 bg-slate-900 text-white font-bold rounded-xl shadow hover:bg-black transition">
                  Iniciar Sesión
                </button>
              </form>
            </div>
          ) : (
            <div className="space-y-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
                <div>
                  <h3 className="text-2xl font-bold text-slate-900">Panel de Control Ciao Bella</h3>
                  <p className="text-sm text-slate-500">Gestiona menús, precios, filosofía, vacantes y colores de temporada.</p>
                </div>
                <button 
                  onClick={() => setIsAdminLoggedIn(false)}
                  className="px-4 py-2 bg-red-50 text-red-700 font-semibold rounded-xl text-sm hover:bg-red-100 transition"
                >
                  Cerrar Sesión
                </button>
              </div>

              <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 space-y-4">
                <h4 className="font-bold text-lg text-slate-900 flex items-center space-x-2">
                  <Palette className="w-5 h-5 text-teal-600" />
                  <span>Paleta de Colores de Temporada</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {Object.keys(INITIAL_THEMES).map(key => (
                    <button
                      key={key}
                      onClick={() => setThemeKey(key)}
                      className={`p-4 rounded-2xl border text-left transition ${themeKey === key ? 'border-teal-600 bg-teal-50/50 ring-2 ring-teal-600/20' : 'border-slate-200 hover:bg-slate-50'}`}
                    >
                      <div className="font-bold text-slate-900">{INITIAL_THEMES[key].name}</div>
                      <div className="text-xs text-slate-500 mt-1">Activar tema visual</div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 space-y-4">
                <h4 className="font-bold text-lg text-slate-900">Editar "El Corazón de la Empresa"</h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Misión</label>
                    <textarea 
                      value={companyInfo.mission}
                      onChange={(e) => setCompanyInfo({...companyInfo, mission: e.target.value})}
                      className="w-full p-3 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-teal-500"
                      rows="2"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Visión</label>
                    <textarea 
                      value={companyInfo.vision}
                      onChange={(e) => setCompanyInfo({...companyInfo, vision: e.target.value})}
                      className="w-full p-3 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-teal-500"
                      rows="2"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Valores (separados por coma)</label>
                    <input 
                      type="text" 
                      value={companyInfo.values}
                      onChange={(e) => setCompanyInfo({...companyInfo, values: e.target.value})}
                      className="w-full p-3 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="font-bold text-lg text-slate-900">Gestión de Menú y Precios</h4>
                  <button 
                    onClick={() => {
                      const newProd = {
                        id: `prod-${Date.now()}`,
                        name: 'Nuevo Platillo / Bebida',
                        category: 'Pizzas',
                        price: 100,
                        description: 'Descripción deliciosa de la nueva especialidad.',
                        image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=500&q=80'
                      };
                      setProducts([newProd, ...products]);
                      setEditingProduct(newProd);
                    }}
                    className="px-4 py-2 bg-teal-600 text-white font-semibold rounded-xl text-sm hover:bg-teal-700 transition flex items-center space-x-1"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Añadir Producto</span>
                  </button>
                </div>

                <div className="divide-y divide-slate-100">
                  {products.map(prod => (
                    <div key={prod.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-center space-x-4">
                        <img src={prod.image} alt={prod.name} className="w-16 h-16 rounded-xl object-cover" />
                        <div>
                          <h5 className="font-bold text-slate-900">{prod.name}</h5>
                          <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 font-medium">{prod.category}</span>
                          <p className="text-xs text-slate-500 mt-1">${prod.price} - {prod.description}</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <button 
                          onClick={() => setEditingProduct(prod)}
                          className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition flex items-center space-x-1"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                          <span>Editar</span>
                        </button>
                        <button 
                          onClick={() => setProducts(products.filter(p => p.id !== prod.id))}
                          className="p-1.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl transition"
                          title="Eliminar"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="font-bold text-lg text-slate-900">Gestión de Vacantes (Bolsa de Trabajo)</h4>
                  <button 
                    onClick={() => {
                      const newJob = {
                        id: Date.now(),
                        title: 'Nuevo Puesto Vacante',
                        schedule: 'Miércoles a Lunes',
                        requirements: 'Requisitos del puesto...',
                        status: 'Abierta',
                        date: '7 de noviembre, 2026'
                      };
                      setJobs([newJob, ...jobs]);
                    }}
                    className="px-4 py-2 bg-teal-600 text-white font-semibold rounded-xl text-sm hover:bg-teal-700 transition flex items-center space-x-1"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Publicar Vacante</span>
                  </button>
                </div>

                <div className="space-y-4">
                  {jobs.map(job => (
                    <div key={job.id} className="p-4 rounded-2xl border border-slate-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${job.status === 'Abierta' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-700'}`}>
                            {job.status}
                          </span>
                          <span className="text-xs text-slate-400">Fecha: {job.date}</span>
                        </div>
                        <h5 className="font-bold text-slate-900">{job.title}</h5>
                        <p className="text-xs text-slate-600">{job.requirements}</p>
                      </div>

                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => {
                            setJobs(jobs.map(j => j.id === job.id ? { ...j, status: j.status === 'Abierta' ? 'Vacante cubierta' : 'Abierta' } : j));
                          }}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${job.status === 'Abierta' ? 'bg-amber-100 text-amber-800 hover:bg-amber-200' : 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'}`}
                        >
                          {job.status === 'Abierta' ? 'Marcar Cubierta' : 'Abrir Vacante'}
                        </button>
                        <button
                          onClick={() => setJobs(jobs.filter(j => j.id !== job.id))}
                          className="p-2 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}
        </div>
      )}

      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsCartOpen(false)}></div>
          <div className="absolute inset-y-0 right-0 max-w-full flex">
            <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
              
              <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                <h3 className="text-xl font-bold text-slate-900 flex items-center space-x-2">
                  <ShoppingBag className="w-5 h-5 text-teal-600" />
                  <span>Tu Pedido Ciao Bella</span>
                </h3>
                <button onClick={() => setIsCartOpen(false)} className="p-2 rounded-full hover:bg-slate-100 transition">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {cart.length === 0 ? (
                  <div className="text-center py-16 space-y-3">
                    <span className="text-4xl">🛒</span>
                    <p className="text-slate-500 text-sm">Tu carrito está vacío. ¡Agrega tus platillos y bebidas favoritas!</p>
                  </div>
                ) : (
                  cart.map(item => (
                    <div key={item.cartId} className="flex items-center justify-between bg-slate-50 p-4 rounded-2xl border border-slate-100">
                      <div className="space-y-1">
                        <h4 className="font-bold text-slate-900 text-sm">{item.name}</h4>
                        {item.customOption && <span className="text-xs bg-teal-100 text-teal-800 px-2 py-0.5 rounded-full font-medium">{item.customOption}</span>}
                        <div className="text-xs text-slate-500">${item.price} c/u</div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <div className="flex items-center space-x-1 bg-white border border-slate-200 rounded-xl p-1">
                          <button onClick={() => updateQty(item.cartId, -1)} className="p-1 hover:bg-slate-100 rounded-lg"><Minus className="w-3 h-3" /></button>
                          <span className="text-xs font-bold px-2">{item.qty}</span>
                          <button onClick={() => updateQty(item.cartId, 1)} className="p-1 hover:bg-slate-100 rounded-lg"><Plus className="w-3 h-3" /></button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {cart.length > 0 && (
                <div className="p-6 border-t border-slate-100 bg-slate-50 space-y-4">
                  <div className="space-y-3">
                    <input
                      type="text"
                      placeholder="Tu Nombre *"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-sm focus:ring-2 focus:ring-teal-500"
                    />
                    <input
                      type="text"
                      placeholder="Número de Mesa o Dirección de Entrega"
                      value={tableNumber}
                      onChange={(e) => setTableNumber(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-sm focus:ring-2 focus:ring-teal-500"
                    />
                    <textarea
                      placeholder="Notas adicionales (ej. sin cebolla, bien caliente...)"
                      value={orderNotes}
                      onChange={(e) => setOrderNotes(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-sm focus:ring-2 focus:ring-teal-500"
                      rows="2"
                    />
                  </div>

                  <div className="flex justify-between items-center pt-2 font-bold text-lg">
                    <span>Total a Pagar:</span>
                    <span className="text-teal-600">${cartTotal}</span>
                  </div>

                  <button
                    onClick={checkoutWhatsApp}
                    className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl shadow-lg transition flex items-center justify-center space-x-2"
                  >
                    <span>Enviar Pedido por WhatsApp</span>
                  </button>
                </div>
              )}

            </div>
          </div>
        </div>
      )}

      {halfPizzaModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-6 shadow-2xl">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold font-serif">Pizza de Mitades Personalizada</h3>
              <button onClick={() => setHalfPizzaModal(false)} className="p-2 rounded-full hover:bg-slate-100"><X className="w-5 h-5" /></button>
            </div>
            <p className="text-xs text-slate-500">El precio final corresponderá a la mitad de mayor valor.</p>
            
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Primera Mitad</label>
                <select 
                  value={half1} 
                  onChange={(e) => setHalf1(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-200 text-sm bg-white"
                >
                  <option value="">Selecciona especialidad...</option>
                  {products.filter(p => p.category === 'Pizzas').map(p => (
                    <option key={p.id} value={p.id}>{p.name} (${p.price})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Segunda Mitad</label>
                <select 
                  value={half2} 
                  onChange={(e) => setHalf2(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-200 text-sm bg-white"
                >
                  <option value="">Selecciona especialidad...</option>
                  {products.filter(p => p.category === 'Pizzas').map(p => (
                    <option key={p.id} value={p.id}>{p.name} (${p.price})</option>
                  ))}
                </select>
              </div>
            </div>

            <button
              onClick={handleAddHalfPizza}
              className="w-full py-3.5 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-2xl shadow transition"
            >
              Añadir Pizza de Mitades al Pedido
            </button>
          </div>
        </div>
      )}

      {buildPizzaModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold font-serif">Arma Tu Propia Pizza (Base $225)</h3>
              <button onClick={() => setBuildPizzaModal(false)} className="p-2 rounded-full hover:bg-slate-100"><X className="w-5 h-5" /></button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Elige tu Base</label>
                <select 
                  value={buildBase} 
                  onChange={(e) => setBuildBase(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-200 text-sm bg-white"
                >
                  <option value="Salsa de Tomate y Mozzarella">Salsa de Tomate Tradicional y Mozzarella</option>
                  <option value="Base Blanca con 4 Quesos">Base Blanca con Mezcla de Quesos</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-2">Ingredientes Extras</label>
                <div className="space-y-2">
                  {INGREDIENTES_EXTRA.map(ing => {
                    const isSelected = buildIngredients.some(i => i.name === ing.name);
                    return (
                      <div 
                        key={ing.name} 
                        onClick={() => {
                          if (isSelected) {
                            setBuildIngredients(buildIngredients.filter(i => i.name !== ing.name));
                          } else {
                            setBuildIngredients([...buildIngredients, ing]);
                          }
                        }}
                        className={`p-3 rounded-xl border flex justify-between items-center cursor-pointer transition ${isSelected ? 'border-teal-600 bg-teal-50' : 'border-slate-200'}`}
                      >
                        <span className="text-sm font-medium">{ing.name}</span>
                        <span className="text-xs font-bold text-teal-700">+${ing.price}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center pt-2 font-bold text-lg">
              <span>Total Estimado:</span>
              <span className="text-teal-600">${225 + buildIngredients.reduce((sum, i) => sum + i.price, 0)}</span>
            </div>

            <button
              onClick={handleAddCustomPizza}
              className="w-full py-3.5 bg-slate-900 hover:bg-black text-white font-bold rounded-2xl shadow transition"
            >
              Añadir Pizza Personalizada
            </button>
          </div>
        </div>
      )}

      {editingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-6 shadow-2xl">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold font-serif">Editar Producto</h3>
              <button onClick={() => setEditingProduct(null)} className="p-2 rounded-full hover:bg-slate-100"><X className="w-5 h-5" /></button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Nombre</label>
                <input 
                  type="text" 
                  value={editingProduct.name}
                  onChange={(e) => setEditingProduct({...editingProduct, name: e.target.value})}
                  className="w-full p-3 rounded-xl border border-slate-200 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Precio ($)</label>
                <input 
                  type="number" 
                  value={editingProduct.price}
                  onChange={(e) => setEditingProduct({...editingProduct, price: Number(e.target.value)})}
                  className="w-full p-3 rounded-xl border border-slate-200 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Categoría</label>
                <select
                  value={editingProduct.category}
                  onChange={(e) => setEditingProduct({...editingProduct, category: e.target.value})}
                  className="w-full p-3 rounded-xl border border-slate-200 text-sm bg-white"
                >
                  {categories.filter(c => c !== 'Todas').map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Descripción</label>
                <textarea 
                  value={editingProduct.description}
                  onChange={(e) => setEditingProduct({...editingProduct, description: e.target.value})}
                  className="w-full p-3 rounded-xl border border-slate-200 text-sm"
                  rows="2"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">URL de Imagen</label>
                <input 
                  type="text" 
                  value={editingProduct.image}
                  onChange={(e) => setEditingProduct({...editingProduct, image: e.target.value})}
                  className="w-full p-3 rounded-xl border border-slate-200 text-sm"
                />
              </div>
            </div>

            <button
              onClick={() => {
                setProducts(products.map(p => p.id === editingProduct.id ? editingProduct : p));
                setEditingProduct(null);
              }}
              className="w-full py-3.5 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-2xl shadow transition"
            >
              Guardar Cambios
            </button>
          </div>
        </div>
      )}

      {applyingJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-6 shadow-2xl">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-xl font-bold font-serif">Postularse a Vacante</h3>
                <p className="text-xs text-teal-600 font-semibold">{applyingJob.title}</p>
              </div>
              <button onClick={() => setApplyingJob(null)} className="p-2 rounded-full hover:bg-slate-100"><X className="w-5 h-5" /></button>
            </div>

            <form onSubmit={submitApplication} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Nombre Completo *</label>
                <input 
                  type="text" 
                  required
                  value={applicantName}
                  onChange={(e) => setApplicantName(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-200 text-sm"
                  placeholder="Tu nombre completo"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Teléfono de Contacto *</label>
                <input 
                  type="tel" 
                  required
                  value={applicantPhone}
                  onChange={(e) => setApplicantPhone(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-200 text-sm"
                  placeholder="983 000 0000"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Enlace de CV o Breve Experiencia</label>
                <textarea 
                  value={applicantCV}
                  onChange={(e) => setApplicantCV(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-200 text-sm"
                  placeholder="Cuéntanos brevemente tu experiencia o pega un enlace a tu CV..."
                  rows="3"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-2xl shadow transition"
              >
                Enviar Postulación
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
