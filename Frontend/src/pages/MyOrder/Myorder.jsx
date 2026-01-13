import React, { useContext, useEffect, useState, useCallback } from 'react';
import { StroreContext } from '../../context/StroreContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import EmptyState from '../../components/EmptyState/EmptyState';
import './Myorder.css';

const Myorder = () => {
  const { token, validateToken, clearUserSession, url } = useContext(StroreContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchOrders = useCallback(async (abortController) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(
          `${url}/api/order/userOrders`,
          {},
          { 
            headers: { token },
            signal: abortController.signal
          }
        );

      if (!response.data.success) {
        throw new Error(response.data.message || 'Failed to fetch orders');
      }
      
      setOrders(response.data.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
      if (axios.isCancel(error)) {
        console.log('Request cancelled');
        return;
      }
      if (error.response) {
        switch (error.response.status) {
          case 401:
            setError('Your session has expired. Please log in again.');
            clearUserSession();
            navigate('/');
            break;
          case 404:
            setError('No orders found. Start shopping!');
            break;
          default:
            setError('Failed to load orders. Please try again later.');
        }
      } else if (error.request) {
        setError('Network error. Please check your connection.');
      } else {
        setError('Failed to load orders. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
  }, [token, url, clearUserSession, navigate]);

  useEffect(() => {
    const abortController = new AbortController();
    if (!token || !validateToken(token)) {
      clearUserSession();
      alert("Please log in to view your orders.");
      navigate('/');
      return;
    }

    fetchOrders(abortController);

     return () => {
      abortController.abort();
     };
  }, [token, validateToken, clearUserSession, navigate, fetchOrders]);

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <ErrorMessage message={error} onRetry={fetchOrders} />
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <EmptyState
          message="You haven't placed any orders yet"
          linkText="Browse Menu"
          linkTo="/"
        />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 !py-8">
      <h1 className="text-3xl font-bold text-orange-600 mb-8">My Orders</h1>
      <div className="space-y-6">
        {orders.map((order) => (
          <div key={order._id} className="bg-white rounded-lg shadow-md p-6 order-card">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
              <p className="text-lg font-semibold">Order #{order._id.slice(-6)}</p>
              <p className="text-gray-600">
                {new Date(order.date).toLocaleDateString()}
              </p>
            </div>
            <div className="space-y-4 order-items-container">
              {order.items.map((item, index) => (
                <div key={index} className="flex justify-between items-center border-b pb-2">
                  <div className="flex-1 mr-4">
                    <p className="font-medium break-words">{item.name}</p>
                    <p className="text-gray-600">Quantity: {item.quantity}</p>
                  </div>
                  <p className="font-medium whitespace-nowrap">${item.price * item.quantity}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="w-full sm:w-auto">
                <p className="font-medium mb-1 sm:mb-0">Status: 
                  <span className={`ml-2 order-status ${order.Status === 'Delivered' ? 'status-delivered' : order.Status === 'Cancelled' ? 'status-cancelled' : 'status-processing'}`}>
                    {order.Status}
                  </span>
                </p>
                <p className="font-medium">Payment: 
                  <span className={`ml-2 payment-badge ${order.payment ? 'payment-paid' : 'payment-pending'}`}>
                    {order.payment ? 'Paid' : 'Pending'}
                  </span>
                </p>
              </div>
              <div className="w-full sm:w-auto text-left sm:text-right">
                <p className="text-lg font-bold text-orange-600">Total: ${order.amount}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Myorder;