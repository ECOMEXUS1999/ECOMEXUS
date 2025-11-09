import React, { useState, useMemo } from 'react';
import { Search, ShoppingBag, Menu, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Product data with 10+ entries
const products = [
  {
    id: 1,
    name: 'Vestido Midi Floral',
    brand: 'Estilo Zara',
    category: 'Moda femenina',
    description: 'Vestido midi con estampado floral, corte A-line, perfecto para primavera-verano',
    fobUsd: 18.50,
    suggestedArs: 28500,
    image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/f27febd7-b6c9-4ce5-b750-2e2948e548d2.png',
    alt: 'Elegant midi dress with colorful floral print on light fabric, A-line silhouette displayed on neutral background'
  },
  {
    id: 2,
    name: 'Conjunto Deportivo Premium',
    brand: 'Estilo Lululemon',
    category: 'Athleisure',
    description: 'Set de top y leggings de alta compresión, tela quick-dry, ideal para yoga y gym',
    fobUsd: 22.00,
    suggestedArs: 34000,
    image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/93f67637-22b8-4da9-bb6a-04be63e71787.png',
    alt: 'Athletic wear set featuring black sports bra and matching high-waisted leggings with modern mesh details'
  },
  {
    id: 3,
    name: 'Bolso Tote Cuero Sintético',
    brand: 'Estilo Michael Kors',
    category: 'Bolsos',
    description: 'Cartera grande tipo tote, cuero sintético premium, múltiples compartimentos',
    fobUsd: 15.75,
    suggestedArs: 24500,
    image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/45539ebf-216a-4ed2-a0fd-c08960258533.png',
    alt: 'Sophisticated tote bag in caramel synthetic leather with gold hardware and structured silhouette'
  },
  {
    id: 4,
    name: 'Zapatillas Running Pro',
    brand: 'Estilo Nike',
    category: 'Calzado',
    description: 'Zapatillas deportivas con tecnología de amortiguación, diseño ergonómico',
    fobUsd: 28.00,
    suggestedArs: 43500,
    image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/36aaf4da-58b5-496d-854d-94597e83876f.png',
    alt: 'Modern running shoes in white and electric blue with breathable mesh upper and cushioned sole'
  },
  {
    id: 5,
    name: 'Set Copas Cristal Premium',
    brand: 'Estilo Bohemia',
    category: 'Hogar',
    description: 'Juego de 6 copas de cristal tallado, elegante diseño europeo para mesa',
    fobUsd: 32.50,
    suggestedArs: 50500,
    image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/1057e4a0-cc17-4b24-88df-c1a005d7bd4f.png',
    alt: 'Set of six elegant crystal wine glasses with intricate cut patterns reflecting light on white surface'
  },
  {
    id: 6,
    name: 'Collar Piedras Naturales',
    brand: 'Estilo Pandora',
    category: 'Accesorios',
    description: 'Collar ajustable con piedras semi-preciosas, baño de oro 18k',
    fobUsd: 12.25,
    suggestedArs: 19000,
    image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/e23ff945-e63e-41cf-9d37-cb55c151681a.png',
    alt: 'Delicate gold-plated necklace featuring natural turquoise and rose quartz stones on jewelry display'
  },
  {
    id: 7,
    name: 'Blazer Oversize Lino',
    brand: 'Estilo Mango',
    category: 'Moda femenina',
    description: 'Blazer corte oversize en lino natural, forros de algodón, ideal oficina casual',
    fobUsd: 25.00,
    suggestedArs: 38500,
    image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/8891a5a8-b226-4e63-98f7-16173716a4db.png',
    alt: 'Beige linen oversized blazer with notched lapels and relaxed fit hanging on minimal background'
  },
  {
    id: 8,
    name: 'Leggings Compresión Tech',
    brand: 'Estilo Gymshark',
    category: 'Athleisure',
    description: 'Mallas de compresión gradual, costuras planas, diseño sculpt para silueta',
    fobUsd: 16.50,
    suggestedArs: 25500,
    image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/bb299da9-ac85-4399-8b36-2a938b0878bf.png',
    alt: 'Black compression leggings with subtle contouring seams and high-waisted design on athletic model'
  },
  {
    id: 9,
    name: 'Mochila Urban Classic',
    brand: 'Estilo Herschel',
    category: 'Bolsos',
    description: 'Mochila urbana resistente al agua, compartimento laptop 15", múltiples bolsillos',
    fobUsd: 19.80,
    suggestedArs: 30500,
    image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/548c8e54-5a53-4951-a968-01a627ce647b.png',
    alt: 'Navy blue urban backpack with brown leather accents and multiple compartments displayed frontally'
  },
  {
    id: 10,
    name: 'Botines Chelsea Cuero',
    brand: 'Estilo Dr. Martens',
    category: 'Calzado',
    description: 'Botines tipo Chelsea, cuero genuino, suela de goma antideslizante',
    fobUsd: 35.00,
    suggestedArs: 54000,
    image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/628543cd-9ef6-43a9-9bb3-2dcdf8b70dea.png',
    alt: 'Classic black leather Chelsea boots with elastic side panels and chunky rubber sole on grey background'
  },
  {
    id: 11,
    name: 'Juego Sábanas Premium',
    brand: 'Estilo Sheridan',
    category: 'Hogar',
    description: 'Set completo sábanas algodón egipcio 300 hilos, king size, varios colores',
    fobUsd: 42.00,
    suggestedArs: 65000,
    image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/672d2582-9685-4ff6-9cde-7662091d0ca7.png',
    alt: 'Luxurious white Egyptian cotton bedding set neatly folded showing smooth texture and quality weave'
  },
  {
    id: 12,
    name: 'Reloj Smartwatch Sport',
    brand: 'Estilo Apple Watch',
    category: 'Accesorios',
    description: 'Smartwatch deportivo con monitor cardíaco, GPS, resistente al agua 5ATM',
    fobUsd: 45.00,
    suggestedArs: 69500,
    image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/70ee53fa-023e-4c5c-baba-a3317aaff180.png',
    alt: 'Modern smartwatch with black sport band and colorful fitness display screen showing health metrics'
  }
];

const categories = [
  'Todas',
  'Moda femenina',
  'Athleisure',
  'Accesorios',
  'Bolsos',
  'Calzado',
  'Hogar'
];

export default function WholesaleCatalog() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [searchTerm, setSearchTerm] = useState('');

  // Filter products based on category and search
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesCategory = selectedCategory === 'Todas' || product.category === selectedCategory;
      const matchesSearch = searchTerm === '' || 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchTerm]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#f5f5f7]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <ShoppingBag className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">Catálogo Importados</span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              <button onClick={() => scrollToSection('categorias')} className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
                Moda femenina
              </button>
              <button onClick={() => scrollToSection('categorias')} className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
                Athleisure
              </button>
              <button onClick={() => scrollToSection('categorias')} className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
                Accesorios
              </button>
              <button onClick={() => scrollToSection('categorias')} className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
                Bolsos
              </button>
              <button onClick={() => scrollToSection('categorias')} className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
                Calzado
              </button>
              <button onClick={() => scrollToSection('categorias')} className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
                Hogar
              </button>
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-gray-700"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <nav className="md:hidden pt-4 pb-2 space-y-2">
              <button onClick={() => scrollToSection('categorias')} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                Moda femenina
              </button>
              <button onClick={() => scrollToSection('categorias')} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                Athleisure
              </button>
              <button onClick={() => scrollToSection('categorias')} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                Accesorios
              </button>
              <button onClick={() => scrollToSection('categorias')} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                Bolsos
              </button>
              <button onClick={() => scrollToSection('categorias')} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                Calzado
              </button>
              <button onClick={() => scrollToSection('categorias')} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                Hogar
              </button>
            </nav>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20 md:py-32">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Selección Mayorista Importada
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 mb-8">
            Actualizada Noviembre 2025 - Productos premium directos de origen
          </p>
          <Button
            onClick={() => scrollToSection('catalogo')}
            size="lg"
            className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-6"
          >
            Ver Catálogo Completo
          </Button>
        </div>
      </section>

      {/* Categories Section */}
      <section id="categorias" className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            Nuestras Categorías
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
            <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => { setSelectedCategory('Moda femenina'); scrollToSection('catalogo'); }}>
              <CardHeader className="text-center pb-3">
                <div className="w-16 h-16 mx-auto mb-3 bg-blue-100 rounded-full flex items-center justify-center">
                  <img src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/f176cdbd-e544-4316-818e-47f504c606af.png" alt="Icon representing womens fashion category with dress silhouette in blue tones" className="w-10 h-10" />
                </div>
                <CardTitle className="text-base md:text-lg">Moda femenina</CardTitle>
              </CardHeader>
            </Card>

            <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => { setSelectedCategory('Athleisure'); scrollToSection('catalogo'); }}>
              <CardHeader className="text-center pb-3">
                <div className="w-16 h-16 mx-auto mb-3 bg-green-100 rounded-full flex items-center justify-center">
                  <img src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/50650275-7cde-4159-bf4b-6a6b9acea659.png" alt="Icon representing athleisure category with athletic wear symbol in green tones" className="w-10 h-10" />
                </div>
                <CardTitle className="text-base md:text-lg">Athleisure</CardTitle>
              </CardHeader>
            </Card>

            <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => { setSelectedCategory('Accesorios'); scrollToSection('catalogo'); }}>
              <CardHeader className="text-center pb-3">
                <div className="w-16 h-16 mx-auto mb-3 bg-purple-100 rounded-full flex items-center justify-center">
                  <img src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/4e956b39-6e0c-4374-a51e-e89656d3305a.png" alt="Icon representing accessories category with jewelry and watch symbols in purple tones" className="w-10 h-10" />
                </div>
                <CardTitle className="text-base md:text-lg">Accesorios</CardTitle>
              </CardHeader>
            </Card>

            <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => { setSelectedCategory('Bolsos'); scrollToSection('catalogo'); }}>
              <CardHeader className="text-center pb-3">
                <div className="w-16 h-16 mx-auto mb-3 bg-pink-100 rounded-full flex items-center justify-center">
                  <img src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/b22d549d-ce0a-42b4-94e6-4b2d7eef1605.png" alt="Icon representing bags category with handbag silhouette in pink tones" className="w-10 h-10" />
                </div>
                <CardTitle className="text-base md:text-lg">Bolsos</CardTitle>
              </CardHeader>
            </Card>

            <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => { setSelectedCategory('Calzado'); scrollToSection('catalogo'); }}>
              <CardHeader className="text-center pb-3">
                <div className="w-16 h-16 mx-auto mb-3 bg-orange-100 rounded-full flex items-center justify-center">
                  <img src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/8385713c-112f-41fb-b61e-2990477692e6.png" alt="Icon representing footwear category with shoe silhouette in orange tones" className="w-10 h-10" />
                </div>
                <CardTitle className="text-base md:text-lg">Calzado</CardTitle>
              </CardHeader>
            </Card>

            <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => { setSelectedCategory('Hogar'); scrollToSection('catalogo'); }}>
              <CardHeader className="text-center pb-3">
                <div className="w-16 h-16 mx-auto mb-3 bg-yellow-100 rounded-full flex items-center justify-center">
                  <img src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/ce7b58b2-a4df-40d3-9a0b-89132425f939.png" alt="Icon representing home goods category with house and furnishing symbols in yellow tones" className="w-10 h-10" />
                </div>
                <CardTitle className="text-base md:text-lg">Hogar</CardTitle>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Catalog Section */}
      <section id="catalogo" className="py-16 md:py-24 bg-[#f5f5f7]">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            Catálogo de Productos
          </h2>

          {/* Filters */}
          <div className="max-w-4xl mx-auto mb-8 space-y-4 md:space-y-0 md:flex md:items-center md:space-x-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  type="text"
                  placeholder="Buscar por nombre o marca..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-12"
                />
              </div>
            </div>
            <div className="w-full md:w-64">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Seleccionar categoría" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <Card className="overflow-hidden hover:shadow-xl transition-shadow">
              <img
                src="https://placehold.co/400x500"
                alt="Elegant midi dress with colorful floral print on light fabric, A-line silhouette displayed on neutral background"
                className="w-full h-64 object-cover"
              />
              <CardHeader>
                <CardTitle className="text-lg">Vestido Midi Floral</CardTitle>
                <CardDescription className="text-sm text-gray-600">Estilo Zara</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-700 mb-4">
                  Vestido midi con estampado floral, corte A-line, perfecto para primavera-verano
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-600">FOB USD:</span>
                    <span className="text-lg font-bold text-blue-600">$18.50</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-600">Sugerido ARS:</span>
                    <span className="text-lg font-bold text-green-600">$28,500</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-gray-900 hover:bg-gray-800">
                  Ver Origen
                </Button>
              </CardFooter>
            </Card>

            <Card className="overflow-hidden hover:shadow-xl transition-shadow">
              <img
                src="https://placehold.co/400x500"
                alt="Athletic wear set featuring black sports bra and matching high-waisted leggings with modern mesh details"
                className="w-full h-64 object-cover"
              />
              <CardHeader>
                <CardTitle className="text-lg">Conjunto Deportivo Premium</CardTitle>
                <CardDescription className="text-sm text-gray-600">Estilo Lululemon</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-700 mb-4">
                  Set de top y leggings de alta compresión, tela quick-dry, ideal para yoga y gym
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-600">FOB USD:</span>
                    <span className="text-lg font-bold text-blue-600">$22.00</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-600">Sugerido ARS:</span>
                    <span className="text-lg font-bold text-green-600">$34,000</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-gray-900 hover:bg-gray-800">
                  Ver Origen
                </Button>
              </CardFooter>
            </Card>

            <Card className="overflow-hidden hover:shadow-xl transition-shadow">
              <img
                src="https://placehold.co/400x500"
                alt="Sophisticated tote bag in caramel synthetic leather with gold hardware and structured silhouette"
                className="w-full h-64 object-cover"
              />
              <CardHeader>
                <CardTitle className="text-lg">Bolso Tote Cuero Sintético</CardTitle>
                <CardDescription className="text-sm text-gray-600">Estilo Michael Kors</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-700 mb-4">
                  Cartera grande tipo tote, cuero sintético premium, múltiples compartimentos
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-600">FOB USD:</span>
                    <span className="text-lg font-bold text-blue-600">$15.75</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-600">Sugerido ARS:</span>
                    <span className="text-lg font-bold text-green-600">$24,500</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-gray-900 hover:bg-gray-800">
                  Ver Origen
                </Button>
              </CardFooter>
            </Card>

            <Card className="overflow-hidden hover:shadow-xl transition-shadow">
              <img
                src="https://placehold.co/400x500"
                alt="Modern running shoes in white and electric blue with breathable mesh upper and cushioned sole"
                className="w-full h-64 object-cover"
              />
              <CardHeader>
                <CardTitle className="text-lg">Zapatillas Running Pro</CardTitle>
                <CardDescription className="text-sm text-gray-600">Estilo Nike</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-700 mb-4">
                  Zapatillas deportivas con tecnología de amortiguación, diseño ergonómico
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-600">FOB USD:</span>
                    <span className="text-lg font-bold text-blue-600">$28.00</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-600">Sugerido ARS:</span>
                    <span className="text-lg font-bold text-green-600">$43,500</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-gray-900 hover:bg-gray-800">
                  Ver Origen
                </Button>
              </CardFooter>
            </Card>

            <Card className="overflow-hidden hover:shadow-xl transition-shadow">
              <img
                src="https://placehold.co/400x500"
                alt="Set of six elegant crystal wine glasses with intricate cut patterns reflecting light on white surface"
                className="w-full h-64 object-cover"
              />
              <CardHeader>
                <CardTitle className="text-lg">Set Copas Cristal Premium</CardTitle>
                <CardDescription className="text-sm text-gray-600">Estilo Bohemia</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-700 mb-4">
                  Juego de 6 copas de cristal tallado, elegante diseño europeo para mesa
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-600">FOB USD:</span>
                    <span className="text-lg font-bold text-blue-600">$32.50</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-600">Sugerido ARS:</span>
                    <span className="text-lg font-bold text-green-600">$50,500</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-gray-900 hover:bg-gray-800">
                  Ver Origen
                </Button>
              </CardFooter>
            </Card>

            <Card className="overflow-hidden hover:shadow-xl transition-shadow">
              <img
                src="https://placehold.co/400x500"
                alt="Delicate gold-plated necklace featuring natural turquoise and rose quartz stones on jewelry display"
                className="w-full h-64 object-cover"
              />
              <CardHeader>
                <CardTitle className="text-lg">Collar Piedras Naturales</CardTitle>
                <CardDescription className="text-sm text-gray-600">Estilo Pandora</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-700 mb-4">
                  Collar ajustable con piedras semi-preciosas, baño de oro 18k
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-600">FOB USD:</span>
                    <span className="text-lg font-bold text-blue-600">$12.25</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-600">Sugerido ARS:</span>
                    <span className="text-lg font-bold text-green-600">$19,000</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-gray-900 hover:bg-gray-800">
                  Ver Origen
                </Button>
              </CardFooter>
            </Card>

            <Card className="overflow-hidden hover:shadow-xl transition-shadow">
              <img
                src="https://placehold.co/400x500"
                alt="Beige linen oversized blazer with notched lapels and relaxed fit hanging on minimal background"
                className="w-full h-64 object-cover"
              />
              <CardHeader>
                <CardTitle className="text-lg">Blazer Oversize Lino</CardTitle>
                <CardDescription className="text-sm text-gray-600">Estilo Mango</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-700 mb-4">
                  Blazer corte oversize en lino natural, forros de algodón, ideal oficina casual
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-600">FOB USD:</span>
                    <span className="text-lg font-bold text-blue-600">$25.00</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-600">Sugerido ARS:</span>
                    <span className="text-lg font-bold text-green-600">$38,500</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-gray-900 hover:bg-gray-800">
                  Ver Origen
                </Button>
              </CardFooter>
            </Card>

            <Card className="overflow-hidden hover:shadow-xl transition-shadow">
              <img
                src="https://placehold.co/400x500"
                alt="Black compression leggings with subtle contouring seams and high-waisted design on athletic model"
                className="w-full h-64 object-cover"
              />
              <CardHeader>
                <CardTitle className="text-lg">Leggings Compresión Tech</CardTitle>
                <CardDescription className="text-sm text-gray-600">Estilo Gymshark</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-700 mb-4">
                  Mallas de compresión gradual, costuras planas, diseño sculpt para silueta
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-600">FOB USD:</span>
                    <span className="text-lg font-bold text-blue-600">$16.50</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-600">Sugerido ARS:</span>
                    <span className="text-lg font-bold text-green-600">$25,500</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-gray-900 hover:bg-gray-800">
                  Ver Origen
                </Button>
              </CardFooter>
            </Card>

            <Card className="overflow-hidden hover:shadow-xl transition-shadow">
              <img
                src="https://placehold.co/400x500"
                alt="Navy blue urban backpack with brown leather accents and multiple compartments displayed frontally"
                className="w-full h-64 object-cover"
              />
              <CardHeader>
                <CardTitle className="text-lg">Mochila Urban Classic</CardTitle>
                <CardDescription className="text-sm text-gray-600">Estilo Herschel</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-700 mb-4">
                  Mochila urbana resistente al agua, compartimento laptop 15 pulgadas, múltiples bolsillos
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-600">FOB USD:</span>
                    <span className="text-lg font-bold text-blue-600">$19.80</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-600">Sugerido ARS:</span>
                    <span className="text-lg font-bold text-green-600">$30,500</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-gray-900 hover:bg-gray-800">
                  Ver Origen
                </Button>
              </CardFooter>
            </Card>

            <Card className="overflow-hidden hover:shadow-xl transition-shadow">
              <img
                src="https://placehold.co/400x500"
                alt="Classic black leather Chelsea boots with elastic side panels and chunky rubber sole on grey background"
                className="w-full h-64 object-cover"
              />
              <CardHeader>
                <CardTitle className="text-lg">Botines Chelsea Cuero</CardTitle>
                <CardDescription className="text-sm text-gray-600">Estilo Dr. Martens</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-700 mb-4">
                  Botines tipo Chelsea, cuero genuino, suela de goma antideslizante
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-600">FOB USD:</span>
                    <span className="text-lg font-bold text-blue-600">$35.00</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-600">Sugerido ARS:</span>
                    <span className="text-lg font-bold text-green-600">$54,000</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-gray-900 hover:bg-gray-800">
                  Ver Origen
                </Button>
              </CardFooter>
            </Card>

            <Card className="overflow-hidden hover:shadow-xl transition-shadow">
              <img
                src="https://placehold.co/400x500"
                alt="Luxurious white Egyptian cotton bedding set neatly folded showing smooth texture and quality weave"
                className="w-full h-64 object-cover"
              />
              <CardHeader>
                <CardTitle className="text-lg">Juego Sábanas Premium</CardTitle>
                <CardDescription className="text-sm text-gray-600">Estilo Sheridan</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-700 mb-4">
                  Set completo sábanas algodón egipcio 300 hilos, king size, varios colores
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-600">FOB USD:</span>
                    <span className="text-lg font-bold text-blue-600">$42.00</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-600">Sugerido ARS:</span>
                    <span className="text-lg font-bold text-green-600">$65,000</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-gray-900 hover:bg-gray-800">
                  Ver Origen
                </Button>
              </CardFooter>
            </Card>

            <Card className="overflow-hidden hover:shadow-xl transition-shadow">
              <img
                src="https://placehold.co/400x500"
                alt="Modern smartwatch with black sport band and colorful fitness display screen showing health metrics"
                className="w-full h-64 object-cover"
              />
              <CardHeader>
                <CardTitle className="text-lg">Reloj Smartwatch Sport</CardTitle>
                <CardDescription className="text-sm text-gray-600">Estilo Apple Watch</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-700 mb-4">
                  Smartwatch deportivo con monitor cardíaco, GPS, resistente al agua 5ATM
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-600">FOB USD:</span>
                    <span className="text-lg font-bold text-blue-600">$45.00</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-600">Sugerido ARS:</span>
                    <span className="text-lg font-bold text-green-600">$69,500</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-gray-900 hover:bg-gray-800">
                  Ver Origen
                </Button>
              </CardFooter>
            </Card>
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600">No se encontraron productos con los filtros seleccionados.</p>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Catálogo Importados</h3>
              <p className="text-gray-400">
                Productos mayoristas importados de calidad premium directos de origen.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Contacto</h3>
              <div className="space-y-2 text-gray-400">
                <p>Email: ventas@catalogoimportados.com</p>
                <p>WhatsApp: +54 9 11 1234-5678</p>
                <p>Horario: Lun-Vie 9:00-18:00</p>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Información</h3>
              <div className="space-y-2 text-gray-400">
                <p>Buenos Aires, Argentina</p>
                <p>Envíos a todo el país</p>
                <p>Compra mayorista desde 10 unidades</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>© 2025 Catálogo Importados. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}