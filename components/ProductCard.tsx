import React, { useState, useEffect } from 'react';
import { Plus, Star, MessageSquare, ChevronDown, ChevronUp, User, Send } from 'lucide-react';
import { Product, Review } from '../types';
import { useCart } from '../context/CartContext';
import { useLocation } from '../context/LocationContext';
import { BRANCHES_DATA } from '../constants';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const { selectedState, selectedLGA } = useLocation();
  
  // Review State
  const [reviews, setReviews] = useState<Review[]>([]);
  const [showReviews, setShowReviews] = useState(false);
  
  // Form State
  const [newName, setNewName] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState('');
  const [priceRange, setPriceRange] = useState<string | null>(null);

  // Determine price range based on location
  useEffect(() => {
    if (selectedState && selectedLGA && BRANCHES_DATA[selectedState] && BRANCHES_DATA[selectedState][selectedLGA]) {
      const branches = BRANCHES_DATA[selectedState][selectedLGA];
      const items = branches.flatMap(b => b.menu).filter(m => m.itemId === product.id);
      
      if (items.length > 0) {
        setPriceRange(items[0].price_range);
      }
    } else {
        setPriceRange(null);
    }
  }, [selectedState, selectedLGA, product.id]);

  // Load reviews from LocalStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('anna_cakes_reviews');
      if (stored) {
        const allReviews: Review[] = JSON.parse(stored);
        const productReviews = allReviews.filter(r => r.productId === product.id);
        // Sort by newest first (assuming ID is timestamp)
        setReviews(productReviews.sort((a, b) => Number(b.id) - Number(a.id)));
      }
    } catch (error) {
      console.error("Failed to load reviews", error);
    }
  }, [product.id]);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const review: Review = {
      id: Date.now().toString(),
      productId: product.id,
      userName: newName.trim() || 'Happy Customer',
      rating: newRating,
      text: newComment.trim(),
      date: new Date().toLocaleDateString()
    };

    const updatedReviews = [review, ...reviews];
    setReviews(updatedReviews);

    // Save to LocalStorage
    try {
      const stored = localStorage.getItem('anna_cakes_reviews');
      const allReviews: Review[] = stored ? JSON.parse(stored) : [];
      localStorage.setItem('anna_cakes_reviews', JSON.stringify([...allReviews, review]));
    } catch (error) {
      console.error("Failed to save review", error);
    }

    // Reset Form
    setNewName('');
    setNewComment('');
    setNewRating(5);
  };

  const averageRating = reviews.length 
    ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1) 
    : null;

  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-300 overflow-hidden group flex flex-col h-full border border-gray-100 hover:border-brand-yellow">
      
      {/* Image Area */}
      <div className="relative h-64 overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide text-brand-green shadow-md">
          {product.category}
        </div>
        
        {/* Rating Badge Overlay */}
        {averageRating && (
           <div className="absolute bottom-3 right-3 bg-black/80 backdrop-blur-sm px-2 py-1 rounded-lg text-xs font-bold text-brand-yellow flex items-center gap-1 shadow-md">
             <Star size={12} fill="#FACC15" /> {averageRating} ({reviews.length})
           </div>
        )}
      </div>
      
      {/* Card Content */}
      <div className="p-5 flex flex-col flex-grow relative">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-lg text-gray-800 line-clamp-2 leading-tight">{product.name}</h3>
        </div>
        
        {/* Price Display */}
        <div className="mb-2">
           {priceRange ? (
             <div className="flex flex-col">
                <span className="font-extrabold text-xl text-brand-green">{priceRange}</span>
                <span className="text-[10px] text-gray-400">Depends on size/location</span>
             </div>
           ) : (
             <span className="font-extrabold text-xl text-brand-green">₦{product.price.toLocaleString()}</span>
           )}
        </div>
        
        <p className="text-gray-500 text-sm mb-5 line-clamp-2 flex-grow leading-relaxed">{product.description}</p>
        
        <div className="space-y-3 mt-auto">
          <button 
            onClick={() => addToCart(product)}
            className="w-full bg-brand-green hover:bg-green-800 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-colors active:scale-95 transform shadow-lg shadow-green-100"
          >
            <Plus size={20} />
            Add to Cart
          </button>

          {/* Toggle Reviews */}
          <button 
            onClick={() => setShowReviews(!showReviews)}
            className="w-full flex items-center justify-center gap-2 text-xs font-medium text-gray-400 hover:text-brand-yellow transition-colors py-1"
          >
            {showReviews ? (
              <>Hide Reviews <ChevronUp size={14} /></>
            ) : (
              <>
                <MessageSquare size={14} /> 
                {reviews.length > 0 ? `See ${reviews.length} Reviews` : 'Write a Review'} 
                <ChevronDown size={14} />
              </>
            )}
          </button>
        </div>
      </div>

      {/* Expandable Review Section */}
      {showReviews && (
        <div className="border-t border-gray-100 bg-brand-lightgreen/20 p-4 animate-in slide-in-from-top-2 duration-200">
          
          {/* Add Review Form */}
          <form onSubmit={handleSubmitReview} className="mb-6 space-y-3">
            <h4 className="font-bold text-gray-700 text-sm">Add your review</h4>
            
            {/* Star Rating Input */}
            <div className="flex gap-1 mb-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setNewRating(star)}
                  className="focus:outline-none transition-transform active:scale-110"
                >
                  <Star 
                    size={20} 
                    className={star <= newRating ? "text-brand-yellow fill-brand-yellow" : "text-gray-300"} 
                  />
                </button>
              ))}
            </div>

            <input 
              type="text"
              placeholder="Your Name (Optional)"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="w-full p-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-brand-green bg-white"
            />
            
            <div className="flex gap-2">
              <input 
                type="text"
                required
                placeholder="Share your thoughts..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="flex-grow p-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-brand-green bg-white"
              />
              <button 
                type="submit"
                className="bg-brand-green text-white p-2 rounded-lg hover:bg-green-800 transition-colors flex-shrink-0"
              >
                <Send size={18} />
              </button>
            </div>
          </form>

          {/* Reviews List */}
          {reviews.length > 0 ? (
            <div className="space-y-3 max-h-48 overflow-y-auto pr-1 custom-scrollbar">
              {reviews.map((review) => (
                <div key={review.id} className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm">
                  <div className="flex justify-between items-start mb-1">
                    <div className="flex items-center gap-1.5">
                      <div className="bg-yellow-100 p-1 rounded-full">
                        <User size={10} className="text-brand-green" />
                      </div>
                      <span className="font-bold text-xs text-gray-800">{review.userName}</span>
                    </div>
                    <span className="text-[10px] text-gray-400">{review.date}</span>
                  </div>
                  <div className="flex mb-1">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        size={10} 
                        className={i < review.rating ? "text-brand-yellow fill-brand-yellow" : "text-gray-200"} 
                      />
                    ))}
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed">{review.text}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-4 text-gray-400 text-xs italic bg-white rounded-xl border border-dashed border-gray-200">
              No reviews yet. Be the first to review!
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductCard;