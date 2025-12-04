import React, { useEffect, useState } from 'react';
import { Clock, ShoppingBag, Bitcoin, CreditCard, Banknote, Calendar, ChevronRight } from 'lucide-react';
import { useNavigation } from '../context/NavigationContext';

interface OrderRecord {
  id: string;
  date: string;
  total: number;
  method: string;
  items?: any[];
}

const OrderHistory: React.FC = () => {
    const { navigateTo } = useNavigation();
    const [orders, setOrders] = useState<OrderRecord[]>([]);

    useEffect(() => {
        try {
            const history = JSON.parse(localStorage.getItem('order_history') || '[]');
            setOrders(history);
        } catch (e) {
            console.error("Failed to load history", e);
            setOrders([]);
        }
    }, []);

    const formatDate = (dateString: string) => {
        try {
            return new Date(dateString).toLocaleDateString('en-NG', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        } catch (e) {
            return dateString;
        }
    };

    const getPaymentIcon = (method: string) => {
        switch (method) {
            case 'bitcoin': return <Bitcoin size={16} className="text-orange-500" />;
            case 'cash': return <Banknote size={16} className="text-green-600" />;
            case 'card': default: return <CreditCard size={16} className="text-blue-500" />;
        }
    };

    if (orders.length === 0) {
        return (
            <div className="container mx-auto px-4 py-20 text-center">
                <div className="bg-gray-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Clock size={48} className="text-gray-400" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">No Past Orders</h2>
                <p className="text-gray-500 mb-8">You haven't placed any orders yet. Time to get some food!</p>
                <button 
                    onClick={() => navigateTo('menu', 'All')}
                    className="bg-brand-orange text-white px-8 py-3 rounded-full font-bold shadow-lg hover:bg-orange-600 transition-colors"
                >
                    Browse Menu
                </button>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8 pb-20 max-w-3xl">
            <h1 className="text-2xl font-bold text-gray-800 mb-8 flex items-center gap-2">
                <Clock className="text-brand-orange" /> Order History
            </h1>

            <div className="space-y-4">
                {orders.map((order, index) => (
                    <div key={index} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                            
                            {/* Left Side: ID & Date */}
                            <div>
                                <div className="flex items-center gap-3 mb-1">
                                    <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs font-mono font-bold">
                                        #{order.id}
                                    </span>
                                    <div className="flex items-center gap-1 text-xs text-gray-400">
                                        <Calendar size={12} />
                                        {formatDate(order.date)}
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 mt-2">
                                    {order.items && order.items.length > 0 ? (
                                        <span className="text-sm text-gray-600">
                                            {order.items.length} items • {order.items.map(i => i.name).slice(0, 2).join(', ')} 
                                            {order.items.length > 2 && '...'}
                                        </span>
                                    ) : (
                                        <span className="text-sm text-gray-600">Order details unavailable</span>
                                    )}
                                </div>
                            </div>

                            {/* Right Side: Total & Method */}
                            <div className="flex flex-row md:flex-col justify-between items-center md:items-end gap-2 md:gap-0 border-t md:border-0 border-gray-100 pt-3 md:pt-0">
                                <span className="font-bold text-xl text-gray-800">
                                    ₦{order.total?.toLocaleString()}
                                </span>
                                <div className="flex items-center gap-1.5 bg-gray-50 px-3 py-1 rounded-full border border-gray-100">
                                    {getPaymentIcon(order.method)}
                                    <span className="text-xs font-medium capitalize text-gray-600">{order.method}</span>
                                </div>
                            </div>

                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OrderHistory;