
import { useState, useEffect } from "react";
import ProductCard from "@/components/ProductCard";
import Header from "@/components/Header";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface CartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
  stock: number;
}

const products = [
  {
    id: 1,
    title: "Premium Wireless Headphones",
    price: 299.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80",
    category: "electronics",
    rating: 4.5,
    description: "High-quality wireless headphones with noise cancellation and premium sound quality.",
    stock: 15
  },
  {
    id: 2,
    title: "Smart Fitness Watch",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80",
    category: "electronics",
    rating: 4.8,
    description: "Advanced fitness tracking with heart rate monitoring and sleep analysis.",
    stock: 20
  },
  {
    id: 3,
    title: "Portable Bluetooth Speaker",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&q=80",
    category: "electronics",
    rating: 4.2,
    description: "Waterproof portable speaker with 20-hour battery life and deep bass.",
    stock: 30
  },
  {
    id: 4,
    title: "Designer Leather Wallet",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=500&q=80",
    category: "fashion",
    rating: 4.6,
    description: "Handcrafted genuine leather wallet with RFID protection.",
    stock: 25
  },
  {
    id: 5,
    title: "Aromatherapy Diffuser",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1602928321679-560bb453f190?w=500&q=80",
    category: "home",
    rating: 4.4,
    description: "Modern essential oil diffuser with LED mood lighting and timer settings.",
    stock: 40
  },
  {
    id: 6,
    title: "Smart Home Security Camera",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1557324232-b8917d3c3dcb?w=500&q=80",
    category: "electronics",
    rating: 4.7,
    description: "1080p HD security camera with night vision and motion detection.",
    stock: 18
  },
  {
    id: 7,
    title: "Organic Green Tea Set",
    price: 34.99,
    image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=500&q=80",
    category: "food",
    rating: 4.3,
    description: "Premium organic green tea collection with ceramic teapot.",
    stock: 50
  },
  {
    id: 8,
    title: "Vintage Polaroid Camera",
    price: 159.99,
    image: "https://images.unsplash.com/photo-1485833077593-4278bba3f11f?w=500&q=80",
    category: "electronics",
    rating: 4.1,
    description: "Classic instant camera with modern features and vintage aesthetics.",
    stock: 12
  },
  {
    id: 9,
    title: "Professional DSLR Camera",
    price: 899.99,
    image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=500&q=80",
    category: "electronics",
    rating: 4.7,
    description: "High-end DSLR camera with advanced features for professional photography.",
    stock: 10
  },
  {
    id: 10,
    title: "Gaming Laptop",
    price: 1299.99,
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=500&q=80",
    category: "electronics",
    rating: 4.6,
    description: "Powerful gaming laptop with high-performance graphics and processing.",
    stock: 15
  },
  {
    id: 11,
    title: "Smart Home Hub",
    price: 149.99,
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=500&q=80",
    category: "electronics",
    rating: 4.4,
    description: "Central hub for controlling all your smart home devices.",
    stock: 30
  },
  {
    id: 12,
    title: "Mechanical Keyboard",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=500&q=80",
    category: "electronics",
    rating: 4.5,
    description: "Premium mechanical keyboard with customizable RGB lighting.",
    stock: 25
  },
  {
    id: 13,
    title: "Ergonomic Office Chair",
    price: 299.99,
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=500&q=80",
    category: "home",
    rating: 4.6,
    description: "Comfortable office chair with adjustable lumbar support.",
    stock: 20
  },
  {
    id: 14,
    title: "Wireless Earbuds",
    price: 159.99,
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=500&q=80",
    category: "electronics",
    rating: 4.3,
    description: "True wireless earbuds with active noise cancellation.",
    stock: 40
  },
  {
    id: 15,
    title: "Smart Watch",
    price: 249.99,
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=500&q=80",
    category: "electronics",
    rating: 4.5,
    description: "Advanced smartwatch with health monitoring features.",
    stock: 35
  },
  {
    id: 16,
    title: "Bluetooth Car Adapter",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=500&q=80",
    category: "electronics",
    rating: 4.2,
    description: "Easily connect your phone to your car's audio system.",
    stock: 50
  },
  {
    id: 17,
    title: "Smart LED Bulbs",
    price: 19.99,
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=500&q=80",
    category: "home",
    rating: 4.5,
    description: "Control your lighting with your smartphone.",
    stock: 100
  },
  {
    id: 18,
    title: "Portable Charger",
    price: 39.99,
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=500&q=80",
    category: "electronics",
    rating: 4.4,
    description: "High-capacity power bank for on-the-go charging.",
    stock: 60
  },
  {
    id: 19,
    title: "Fitness Resistance Bands",
    price: 24.99,
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=500&q=80",
    category: "fitness",
    rating: 4.6,
    description: "Versatile resistance bands for home workouts.",
    stock: 80
  },
  {
    id: 20,
    title: "Yoga Mat",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=500&q=80",
    category: "fitness",
    rating: 4.7,
    description: "Non-slip yoga mat for all types of workouts.",
    stock: 70
  },
  {
    id: 21,
    title: "Electric Kettle",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=500&q=80",
    category: "home",
    rating: 4.5,
    description: "Quickly boil water for tea or coffee.",
    stock: 40
  },
  {
    id: 22,
    title: "Air Fryer",
    price: 99.99,
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=500&q=80",
    category: "home",
    rating: 4.8,
    description: "Healthier frying with less oil.",
    stock: 30
  },
  {
    id: 23,
    title: "Instant Pot",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=500&q=80",
    category: "home",
    rating: 4.7,
    description: "Multi-cooker for quick and easy meals.",
    stock: 25
  },
  {
    id: 24,
    title: "Electric Toothbrush",
    price: 59.99,
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=500&q=80",
    category: "health",
    rating: 4.6,
    description: "Advanced toothbrush for superior cleaning.",
    stock: 50
  },
  {
    id: 25,
    title: "Water Bottle",
    price: 19.99,
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=500&q=80",
    category: "fitness",
    rating: 4.5,
    description: "Durable water bottle for hydration on the go.",
    stock: 100
  },
  {
    id: 26,
    title: "Fitness Tracker",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=500&q=80",
    category: "fitness",
    rating: 4.4,
    description: "Track your fitness goals and progress.",
    stock: 60
  },
  {
    id: 27,
    title: "Smart Scale",
    price: 39.99,
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=500&q=80",
    category: "health",
    rating: 4.6,
    description: "Measure your weight and body composition.",
    stock: 50
  },
  {
    id: 28,
    title: "Pet Camera",
    price: 99.99,
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=500&q=80",
    category: "pets",
    rating: 4.5,
    description: "Monitor your pets while you're away.",
    stock: 20
  },
  {
    id: 29,
    title: "Dog Bed",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=500&q=80",
    category: "pets",
    rating: 4.7,
    description: "Comfortable bed for your furry friend.",
    stock: 30
  },
  {
    id: 30,
    title: "Cat Tree",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=500&q=80",
    category: "pets",
    rating: 4.6,
    description: "Multi-level tree for climbing and scratching.",
    stock: 25
  },
  {
    id: 31,
    title: "Bird Feeder",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=500&q=80",
    category: "pets",
    rating: 4.5,
    description: "Attract birds to your garden.",
    stock: 40
  },
  {
    id: 32,
    title: "Fish Tank",
    price: 149.99,
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=500&q=80",
    category: "pets",
    rating: 4.8,
    description: "Beautiful tank for your aquatic pets.",
    stock: 15
  },
  {
    id: 33,
    title: "Guitar",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=500&q=80",
    category: "music",
    rating: 4.6,
    description: "Acoustic guitar for beginners and pros.",
    stock: 20
  },
  {
    id: 34,
    title: "Piano",
    price: 499.99,
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=500&q=80",
    category: "music",
    rating: 4.7,
    description: "Digital piano with weighted keys.",
    stock: 10
  },
  {
    id: 35,
    title: "Violin",
    price: 299.99,
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=500&q=80",
    category: "music",
    rating: 4.5,
    description: "Beautiful violin for classical music.",
    stock: 15
  },
  {
    id: 36,
    title: "Drum Set",
    price: 399.99,
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=500&q=80",
    category: "music",
    rating: 4.6,
    description: "Complete drum set for aspiring drummers.",
    stock: 5
  },
  {
    id: 37,
    title: "Headphones Stand",
    price: 19.99,
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=500&q=80",
    category: "music",
    rating: 4.4,
    description: "Stylish stand for your headphones.",
    stock: 50
  },
  {
    id: 38,
    title: "Music Stand",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=500&q=80",
    category: "music",
    rating: 4.5,
    description: "Adjustable stand for sheet music.",
    stock: 40
  },
  {
    id: 39,
    title: "Metronome",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=500&q=80",
    category: "music",
    rating: 4.6,
    description: "Essential tool for musicians.",
    stock: 60
  },
  {
    id: 40,
    title: "Guitar Picks",
    price: 9.99,
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=500&q=80",
    category: "music",
    rating: 4.5,
    description: "Pack of guitar picks for every player.",
    stock: 100
  },
  {
    id: 41,
    title: "Saxophone",
    price: 799.99,
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=500&q=80",
    category: "music",
    rating: 4.8,
    description: "Professional saxophone for jazz musicians.",
    stock: 8
  },
  {
    id: 42,
    title: "Trumpet",
    price: 499.99,
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=500&q=80",
    category: "music",
    rating: 4.7,
    description: "High-quality trumpet for orchestras.",
    stock: 10
  },
  {
    id: 43,
    title: "Flute",
    price: 299.99,
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=500&q=80",
    category: "music",
    rating: 4.6,
    description: "Beautiful flute for classical music.",
    stock: 12
  },
  {
    id: 44,
    title: "Clarinet",
    price: 399.99,
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=500&q=80",
    category: "music",
    rating: 4.5,
    description: "Professional clarinet for orchestras.",
    stock: 5
  },
  {
    id: 45,
    title: "Music Theory Book",
    price: 19.99,
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=500&q=80",
    category: "music",
    rating: 4.8,
    description: "Essential reading for all musicians.",
    stock: 50
  },
  {
    id: 46,
    title: "Piano Bench",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=500&q=80",
    category: "music",
    rating: 4.6,
    description: "Comfortable bench for piano players.",
    stock: 20
  },
  {
    id: 47,
    title: "Guitar Strap",
    price: 19.99,
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=500&q=80",
    category: "music",
    rating: 4.5,
    description: "Stylish strap for your guitar.",
    stock: 100
  },
  {
    id: 48,
    title: "Drumsticks",
    price: 9.99,
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=500&q=80",
    category: "music",
    rating: 4.4,
    description: "Durable drumsticks for every drummer.",
    stock: 80
  },
  {
    id: 49,
    title: "Sheet Music Organizer",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=500&q=80",
    category: "music",
    rating: 4.6,
    description: "Keep your sheet music organized.",
    stock: 60
  },
  {
    id: 50,
    title: "Premium Coffee Maker",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=500&q=80",
    category: "home",
    rating: 4.6,
    description: "Professional-grade coffee maker with programmable settings.",
    stock: 15
  }
];

const ITEMS_PER_PAGE = 12;

const Index = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [currentPage, setCurrentPage] = useState(1);
  const { toast } = useToast();

  useEffect(() => {
    const filtered = products.filter((product) => {
      const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
    setFilteredProducts(filtered);
    setCurrentPage(1);
  }, [searchTerm, selectedCategory]);

  const handleAddToCart = (product: typeof products[0]) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id && item.quantity < item.stock
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });

    toast({
      title: "Added to cart",
      description: `${product.title} has been added to your cart`,
    });
  };

  const handleUpdateQuantity = (itemId: number, newQuantity: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleRemoveItem = (itemId: number) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  const handleCheckout = () => {
    toast({
      title: "Order placed successfully!",
      description: "Thank you for your purchase. Your order will be processed shortly.",
    });
    setCartItems([]);
    localStorage.removeItem('cart_items');
  };

  const categories = ["all", ...new Set(products.map(p => p.category))];
  
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className="min-h-screen flex flex-col">
      <Header 
        onSearch={setSearchTerm}
        cartItems={cartItems}
        onCheckout={handleCheckout}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
      />
      <main className="flex-1 container py-8">
        <div className="mb-8">
          <Tabs defaultValue="all" onValueChange={setSelectedCategory}>
            <TabsList className="mb-4">
              {categories.map((category) => (
                <TabsTrigger key={category} value={category} className="capitalize">
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
          <div className="md:hidden mb-4">
            <Input
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <ScrollArea className="h-[calc(100vh-12rem)]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {paginatedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground">No products found matching your criteria.</p>
            </div>
          )}
          {filteredProducts.length > 0 && (
            <div className="mt-8">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious 
                      onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                      className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
                    />
                  </PaginationItem>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <PaginationItem key={page}>
                      <PaginationLink
                        onClick={() => setCurrentPage(page)}
                        isActive={currentPage === page}
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  <PaginationItem>
                    <PaginationNext 
                      onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                      className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </ScrollArea>
      </main>
    </div>
  );
};

export default Index;
