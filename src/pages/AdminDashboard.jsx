import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';

function AdminDashboard() {
  const { state, dispatch } = useApp();
  const [activeTab, setActiveTab] = useState('services');
  const [editingService, setEditingService] = useState(null);
  const [newService, setNewService] = useState({ title: '', description: '', icon: '' });

  const handleAddService = (e) => {
    e.preventDefault();
    if (newService.title && newService.description && newService.icon) {
      dispatch({
        type: 'ADD_SERVICE',
        payload: newService
      });
      setNewService({ title: '', description: '', icon: '' });
    }
  };

  const handleUpdateService = (e) => {
    e.preventDefault();
    if (editingService) {
      dispatch({
        type: 'UPDATE_SERVICE',
        payload: editingService
      });
      setEditingService(null);
    }
  };

  const handleDeleteService = (id) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      dispatch({
        type: 'DELETE_SERVICE',
        payload: id
      });
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <Link 
              to="/" 
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              ← Back to Site
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-600">Total Services</h3>
            <p className="text-3xl font-bold text-blue-600">{state.services.length}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-600">Contact Messages</h3>
            <p className="text-3xl font-bold text-green-600">{state.contactMessages.length}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-600">Testimonials</h3>
            <p className="text-3xl font-bold text-purple-600">{state.testimonials.length}</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow">
          <div className="border-b">
            <nav className="flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab('services')}
                className={`py-4 border-b-2 font-medium text-sm ${
                  activeTab === 'services'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Manage Services
              </button>
              <button
                onClick={() => setActiveTab('messages')}
                className={`py-4 border-b-2 font-medium text-sm ${
                  activeTab === 'messages'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Contact Messages
              </button>
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'services' && (
              <div>
                {/* Add New Service Form */}
                <div className="mb-8 p-6 bg-gray-50 rounded-lg">
                  <h3 className="text-lg font-semibold mb-4">Add New Service</h3>
                  <form onSubmit={handleAddService} className="space-y-4">
                    <div className="grid md:grid-cols-3 gap-4">
                      <input
                        type="text"
                        placeholder="Service Title"
                        value={newService.title}
                        onChange={(e) => setNewService({...newService, title: e.target.value})}
                        className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                      <input
                        type="text"
                        placeholder="Icon (emoji)"
                        value={newService.icon}
                        onChange={(e) => setNewService({...newService, icon: e.target.value})}
                        className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                      <button
                        type="submit"
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Add Service
                      </button>
                    </div>
                    <textarea
                      placeholder="Service Description"
                      value={newService.description}
                      onChange={(e) => setNewService({...newService, description: e.target.value})}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows="3"
                      required
                    />
                  </form>
                </div>

                {/* Services List */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Current Services</h3>
                  {state.services.map((service) => (
                    <div key={service.id} className="border rounded-lg p-4">
                      {editingService && editingService.id === service.id ? (
                        <form onSubmit={handleUpdateService} className="space-y-4">
                          <div className="grid md:grid-cols-2 gap-4">
                            <input
                              type="text"
                              value={editingService.title}
                              onChange={(e) => setEditingService({...editingService, title: e.target.value})}
                              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <input
                              type="text"
                              value={editingService.icon}
                              onChange={(e) => setEditingService({...editingService, icon: e.target.value})}
                              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                          <textarea
                            value={editingService.description}
                            onChange={(e) => setEditingService({...editingService, description: e.target.value})}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            rows="3"
                          />
                          <div className="space-x-2">
                            <button
                              type="submit"
                              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                            >
                              Save
                            </button>
                            <button
                              type="button"
                              onClick={() => setEditingService(null)}
                              className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
                            >
                              Cancel
                            </button>
                          </div>
                        </form>
                      ) : (
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <div className="flex items-center mb-2">
                              <span className="text-2xl mr-3">{service.icon}</span>
                              <h4 className="text-xl font-semibold">{service.title}</h4>
                            </div>
                            <p className="text-gray-600">{service.description}</p>
                          </div>
                          <div className="space-x-2 ml-4">
                            <button
                              onClick={() => setEditingService(service)}
                              className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteService(service.id)}
                              className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'messages' && (
              <div>
                <h3 className="text-lg font-semibold mb-4">Contact Messages</h3>
                {state.contactMessages.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">No messages yet.</p>
                ) : (
                  <div className="space-y-4">
                    {state.contactMessages.map((message) => (
                      <div key={message.id} className="border rounded-lg p-4 bg-white">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-semibold text-lg">{message.name}</h4>
                          <span className="text-sm text-gray-500">
                            {formatDate(message.timestamp)}
                          </span>
                        </div>
                        <p className="text-blue-600 mb-2">{message.email}</p>
                        <p className="text-gray-700 whitespace-pre-wrap">{message.message}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
