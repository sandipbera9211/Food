import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'
import { assets } from '../../assets/assets'

const Order = ({url}) => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchAll = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await axios.get(`${url}/api/order/list`)

      if (response.data.success) {
        setOrders(response.data.data || [])
      } else {
        throw new Error(response.data.message || 'Failed to fetch orders')
      }
    } catch (err) {
      setError(err.message || 'An error occurred while fetching orders')
      toast.error(err.message || 'Failed to fetch orders')
    } finally {
      setLoading(false)
    }
  }

  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      const response = await axios.put(`${url}/api/order/status/${orderId}`, { status: newStatus })
      if (response.data.success) {
        toast.success('Order status updated successfully')
        fetchAll()
      } else {
        throw new Error(response.data.message || 'Failed to update order status')
      }
    } catch (err) {
      toast.error(err.message || 'Failed to update order status')
    }
  }

  useEffect(() => {
    fetchAll()
    return () => {
      // Cleanup function
      setOrders([])
      setLoading(false)
      setError(null)
    }
  }, [url])
  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold">Order Management</h3>
        <button
          onClick={fetchAll}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors flex items-center space-x-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          <span>Refresh</span>
        </button>
      </div>
      {loading ? (
        <div className="flex justify-center items-center h-48">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      ) : error ? (
        <div className="text-red-500 text-center py-4">{error}</div>
      ) : (
      <div className="space-y-4">
        {orders && orders.length > 0 ? orders.map((order, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md !p-4 hover:shadow-lg transition-shadow">
            <div className="flex items-center space-x-4">
              <img src={assets.parcel_icon} alt="Order" className="w-12 h-12" />
              <div className="flex-1">
                <div className="flex justify-between items-center !mb-2">
                  <h4 className="text-lg font-semibold">Order #{order._id?.slice(-6)}</h4>
                  <span className={`!px-3 !py-1 rounded-full text-sm font-medium ${
                    order.Status === 'Delivered' ? 'bg-green-100 text-green-800' :
                    order.Status === 'Cancelled' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {order.Status || 'Processing'}
                  </span>
                </div>
                <p className="text-gray-600">
                  {order.items && order.items.map((item, index) => (
                    <span key={item._id}>
                      {item.name} × {item.quantity}
                      {index < order.items.length - 1 ? ', ' : ''}
                    </span>
                  ))}
                </p>
                <div className="flex justify-between items-center mt-2 text-sm">
                  <span className="text-gray-500">{new Date(order.date).toLocaleDateString()}</span>
                  <span className="font-semibold text-green-600">${order.amount}</span>
                </div>
                <div className="mt-3 flex justify-end space-x-2">
                  <button
                    onClick={() => handleStatusUpdate(order._id, 'Delivered')}
                    className="px-3 py-1 text-sm bg-green-100 text-green-800 rounded-md hover:bg-green-200 transition-colors"
                    disabled={order.Status === 'Delivered' || order.Status === 'Cancelled'}
                  >
                    Mark as Delivered
                  </button>
                  <button
                    onClick={() => handleStatusUpdate(order._id, 'Cancelled')}
                    className="px-3 py-1 text-sm bg-red-100 text-red-800 rounded-md hover:bg-red-200 transition-colors"
                    disabled={order.Status === 'Delivered' || order.Status === 'Cancelled'}
                  >
                    Cancel Order
                  </button>
                </div>
              </div>
            </div>
          </div>
        )) : (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No orders found</h3>
            <p className="mt-1 text-sm text-gray-500">Get started by creating a new order.</p>
          </div>
        )}
      </div>
      )}
    </div>
  )
}

export default Order
