'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Save, X, RefreshCw } from 'lucide-react';

interface Collection {
  name: string;
  type: string;
}

interface CollectionData {
  collectionName: string;
  data: any[];
  count: number;
  loading: boolean;
  error: string | null;
}

interface FormData {
  [key: string]: any;
}

export default function AdminPage() {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [collectionsData, setCollectionsData] = useState<Record<string, CollectionData>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [expandedCollections, setExpandedCollections] = useState<Set<string>>(new Set());
  
  // CRUD state
  const [showCreateModal, setShowCreateModal] = useState<string | null>(null);
  const [editingDoc, setEditingDoc] = useState<{ collection: string; doc: any } | null>(null);
  const [formData, setFormData] = useState<FormData>({});
  const [saving, setSaving] = useState(false);

  // Auto-load collections on mount
  useEffect(() => {
    fetchCollections();
  }, []);

  const fetchCollections = async () => {
    try {
      setLoading(true);
      setError('');

      const response = await fetch('/api/admin/collections');

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch collections');
      }

      const data = await response.json();
      setCollections(data.collections || []);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch collections');
      console.error('Error fetching collections:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchCollectionData = async (collectionName: string) => {
    // Initialize collection data
    setCollectionsData(prev => ({
      ...prev,
      [collectionName]: {
        collectionName,
        data: [],
        count: 0,
        loading: true,
        error: null,
      },
    }));

    try {
      const response = await fetch(`/api/admin/collections/${collectionName}?limit=1000`);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch collection data');
      }

      const data = await response.json();
      setCollectionsData(prev => ({
        ...prev,
        [collectionName]: {
          collectionName,
          data: data.data || [],
          count: data.count || 0,
          loading: false,
          error: null,
        },
      }));
    } catch (err: any) {
      setCollectionsData(prev => ({
        ...prev,
        [collectionName]: {
          collectionName,
          data: [],
          count: 0,
          loading: false,
          error: err.message || 'Failed to fetch data',
        },
      }));
    }
  };

  const fetchAllData = async () => {
    await fetchCollections();
    
    // Wait a bit then fetch all collection data
    setTimeout(() => {
      collections.forEach(col => {
        fetchCollectionData(col.name);
      });
    }, 500);
  };

  const toggleCollection = (collectionName: string) => {
    const newExpanded = new Set(expandedCollections);
    if (newExpanded.has(collectionName)) {
      newExpanded.delete(collectionName);
    } else {
      newExpanded.add(collectionName);
      // Fetch data if not already loaded
      if (!collectionsData[collectionName]) {
        fetchCollectionData(collectionName);
      }
    }
    setExpandedCollections(newExpanded);
  };

  // CRUD Operations
  const handleCreate = (collectionName: string) => {
    setFormData({});
    setShowCreateModal(collectionName);
    setEditingDoc(null);
  };

  const handleEdit = (collectionName: string, doc: any) => {
    // Remove _id from form data for editing
    const { _id, ...rest } = doc;
    setFormData(rest);
    setEditingDoc({ collection: collectionName, doc });
    setShowCreateModal(null);
  };

  const handleDelete = async (collectionName: string, docId: string) => {
    if (!confirm('Are you sure you want to delete this document?')) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/collections/${collectionName}/${docId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to delete document');
      }

      // Refresh collection data
      await fetchCollectionData(collectionName);
      setError('');
    } catch (err: any) {
      setError(err.message || 'Failed to delete document');
      console.error('Error deleting document:', err);
    }
  };

  const handleSave = async () => {
    if (!showCreateModal && !editingDoc) return;

    const collectionName = showCreateModal || editingDoc?.collection;
    if (!collectionName) return;

    try {
      setSaving(true);
      setError('');

      let response;
      if (editingDoc) {
        // Update existing document
        response = await fetch(`/api/admin/collections/${collectionName}/${editingDoc.doc._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
      } else {
        // Create new document
        response = await fetch(`/api/admin/collections/${collectionName}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to save document');
      }

      // Refresh collection data
      await fetchCollectionData(collectionName);
      
      // Close modal
      setShowCreateModal(null);
      setEditingDoc(null);
      setFormData({});
      setError('');
    } catch (err: any) {
      setError(err.message || 'Failed to save document');
      console.error('Error saving document:', err);
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setShowCreateModal(null);
    setEditingDoc(null);
    setFormData({});
  };

  const updateFormField = (key: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  const formatValue = (value: any): string => {
    if (value === null || value === undefined) return 'null';
    if (typeof value === 'object') {
      return JSON.stringify(value, null, 2);
    }
    return String(value);
  };

  const formatDate = (value: any): string => {
    if (!value) return '';
    try {
      const date = new Date(value);
      return date.toLocaleString();
    } catch {
      return String(value);
    }
  };

  // Get sample document to infer fields
  const getSampleDoc = (collectionName: string) => {
    const data = collectionsData[collectionName]?.data || [];
    return data[0] || {};
  };

  const getFormFields = (collectionName: string) => {
    // If editing, use ALL fields from the document being edited (including null/undefined values)
    if (editingDoc && editingDoc.doc) {
      const { _id, createdAt, updatedAt, __v, ...rest } = editingDoc.doc;
      const fields = Object.keys(rest);
      // Sort fields to put common ones first
      const commonFields = ['name', 'title', 'description', 'type', 'category', 'status'];
      const sortedFields = [
        ...commonFields.filter(f => fields.includes(f)),
        ...fields.filter(f => !commonFields.includes(f))
      ];
      return sortedFields.length > 0 ? sortedFields : ['name', 'description'];
    }
    
    // If creating, ALWAYS use fields from sample document (don't use formData keys)
    const sample = getSampleDoc(collectionName);
    const fields = Object.keys(sample).filter(key => key !== '_id' && key !== 'createdAt' && key !== 'updatedAt' && key !== '__v');
    
    // Sort fields to put common ones first
    const commonFields = ['name', 'title', 'description', 'type', 'category', 'status', 'sr_no', 'item_name', 'quantity', 'location', 'notes'];
    const sortedFields = [
      ...commonFields.filter(f => fields.includes(f)),
      ...fields.filter(f => !commonFields.includes(f))
    ];
    
    return sortedFields.length > 0 ? sortedFields : ['name', 'description']; // Default fields
  };

  // Color palette for collections
  const getCollectionColor = (index: number) => {
    const colors = [
      'from-blue-500 to-cyan-500',
      'from-purple-500 to-pink-500',
      'from-green-500 to-emerald-500',
      'from-orange-500 to-red-500',
      'from-indigo-500 to-blue-500',
      'from-teal-500 to-cyan-500',
      'from-rose-500 to-pink-500',
      'from-amber-500 to-yellow-500',
    ];
    return colors[index % colors.length];
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 text-white">
            🔐 Admin Dashboard
          </h1>
          <p className="text-slate-300">
            View and manage all collections and data from ConnectNest database
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-900/50 border-2 border-red-500 text-red-100 p-4 rounded-lg mb-6 shadow-lg">
            <strong className="font-semibold">Error: </strong>{error}
          </div>
        )}

        {/* Collections List */}
        {collections.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold text-white">
                Collections <span className="text-cyan-400">({collections.length})</span>
              </h2>
              <div className="flex gap-2">
                <button
                  onClick={fetchCollections}
                  disabled={loading}
                  className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-slate-600 disabled:to-slate-700 disabled:cursor-not-allowed text-white rounded-lg text-sm font-medium transition-all shadow-lg flex items-center gap-2"
                >
                  {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
                  Refresh
                </button>
                <button
                  onClick={() => {
                    const allExpanded = new Set(collections.map(c => c.name));
                    setExpandedCollections(allExpanded);
                    collections.forEach(col => {
                      if (!collectionsData[col.name]) {
                        fetchCollectionData(col.name);
                      }
                    });
                  }}
                  className="px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white rounded-lg text-sm font-medium transition-all shadow-lg"
                >
                  Expand All
                </button>
                <button
                  onClick={fetchAllData}
                  disabled={loading}
                  className="px-4 py-2 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 disabled:from-slate-600 disabled:to-slate-700 disabled:cursor-not-allowed text-white rounded-lg text-sm font-medium transition-all shadow-lg"
                >
                  Load All Data
                </button>
              </div>
            </div>

            {collections.map((collection, index) => {
              const isExpanded = expandedCollections.has(collection.name);
              const collectionData = collectionsData[collection.name];
              const data = collectionData?.data || [];
              const count = collectionData?.count || 0;
              const isLoading = collectionData?.loading || false;
              const hasError = collectionData?.error || null;
              const colorGradient = getCollectionColor(index);

              return (
                <div
                  key={collection.name}
                  className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-xl shadow-2xl overflow-hidden border-2 border-slate-600 hover:border-cyan-500 transition-all"
                >
                  <div className={`bg-gradient-to-r ${colorGradient} px-6 py-4`}>
                    <div className="flex items-center justify-between">
                      <button
                        onClick={() => toggleCollection(collection.name)}
                        className="flex items-center gap-3 hover:opacity-90 transition-opacity flex-1 text-left"
                      >
                        <span className="text-2xl text-white font-bold">{isExpanded ? '▼' : '▶'}</span>
                        <span className="font-bold text-xl text-white">
                          {collection.name}
                        </span>
                        {collectionData && (
                          <span className="text-sm text-white/80 bg-white/20 px-2 py-1 rounded-full">
                            {count} docs
                          </span>
                        )}
                        {isLoading && (
                          <span className="text-sm text-white bg-white/20 px-2 py-1 rounded-full">Loading...</span>
                        )}
                        {hasError && (
                          <span className="text-sm text-white bg-red-500/50 px-2 py-1 rounded-full">Error</span>
                        )}
                      </button>
                      {isExpanded && (
                        <button
                          onClick={() => handleCreate(collection.name)}
                          className="px-4 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white rounded-lg text-sm font-semibold transition-all shadow-lg flex items-center gap-2 border border-white/30"
                          title="Create new document"
                        >
                          <Plus className="w-4 h-4" />
                          Create
                        </button>
                      )}
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="p-6 bg-slate-800/50">
                      {isLoading && (
                        <div className="text-center py-12">
                          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-cyan-500 border-t-transparent"></div>
                          <p className="mt-4 text-slate-300">Loading data...</p>
                        </div>
                      )}

                      {hasError && (
                        <div className="bg-red-900/50 border-2 border-red-500 text-red-100 p-4 rounded-lg">
                          <strong className="font-semibold">Error: </strong>{hasError}
                        </div>
                      )}

                      {!isLoading && !hasError && data.length === 0 && (
                        <div className="text-center py-12">
                          <p className="text-slate-400 mb-4">No documents found in this collection</p>
                          <button
                            onClick={() => handleCreate(collection.name)}
                            className="px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-lg text-sm font-semibold transition-all shadow-lg flex items-center gap-2 mx-auto"
                          >
                            <Plus className="w-5 h-5" />
                            Create First Document
                          </button>
                        </div>
                      )}

                      {!isLoading && !hasError && data.length > 0 && (
                        <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
                          {data.map((doc: any, docIndex: number) => (
                            <div
                              key={doc._id || docIndex}
                              className="bg-gradient-to-br from-slate-700 to-slate-600 rounded-lg p-5 border-2 border-slate-500 group hover:border-cyan-400 hover:shadow-xl transition-all"
                            >
                              <div className="flex items-start justify-between mb-4 pb-3 border-b border-slate-500">
                                <div className="text-xs font-mono text-cyan-300 bg-slate-800 px-3 py-1 rounded">
                                  ID: {String(doc._id).substring(0, 24)}...
                                </div>
                                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                  <button
                                    onClick={() => handleEdit(collection.name, doc)}
                                    className="p-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg transition-all shadow-lg"
                                    title="Edit document"
                                  >
                                    <Edit2 className="w-4 h-4" />
                                  </button>
                                  <button
                                    onClick={() => handleDelete(collection.name, doc._id)}
                                    className="p-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-lg transition-all shadow-lg"
                                    title="Delete document"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {Object.entries(doc).map(([key, value]) => (
                                  <div key={key} className="break-words bg-slate-800/50 p-3 rounded-lg border border-slate-600">
                                    <div className="text-xs font-bold text-cyan-400 uppercase mb-2 tracking-wide">
                                      {key}
                                    </div>
                                    <div className="text-sm text-slate-100">
                                      {key.includes('date') || key.includes('Date') || key.includes('createdAt') || key.includes('updatedAt') ? (
                                        <span className="font-mono text-yellow-300">{formatDate(value)}</span>
                                      ) : typeof value === 'object' ? (
                                        <pre className="text-xs bg-slate-900 text-green-300 p-2 rounded overflow-x-auto border border-slate-700">
                                          {formatValue(value)}
                                        </pre>
                                      ) : (
                                        <span className="font-mono text-white">{formatValue(value)}</span>
                                      )}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {collections.length === 0 && !loading && (
          <div className="text-center py-12">
            {error ? (
              <div className="bg-red-900/50 border-2 border-red-500 rounded-lg p-6 max-w-md mx-auto">
                <p className="mb-4 text-red-100">{error}</p>
                <button
                  onClick={fetchCollections}
                  className="px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg font-semibold transition-all shadow-lg"
                >
                  Retry
                </button>
              </div>
            ) : (
              <div className="text-slate-300">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-cyan-500 border-t-transparent mb-4"></div>
                <p>Loading collections...</p>
              </div>
            )}
          </div>
        )}

        {/* Create/Edit Modal */}
        {(showCreateModal || editingDoc) && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border-2 border-slate-600">
              <div className="sticky top-0 bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 border-b-2 border-slate-600 px-6 py-4 flex items-center justify-between shadow-lg">
                <div className="flex items-center gap-3">
                  <div className={`w-1 h-8 rounded-full ${editingDoc ? 'bg-yellow-500' : 'bg-green-500'}`}></div>
                  <h3 className="text-xl font-bold text-white">
                    {editingDoc ? '✏️ Edit Document' : '➕ Create New Document'}
                  </h3>
                </div>
                <button
                  onClick={handleCancel}
                  className="p-2 hover:bg-slate-600 rounded-lg transition-colors text-white hover:rotate-90 transform duration-200"
                  title="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="p-6 space-y-5 bg-slate-800/30">
                {getFormFields(showCreateModal || editingDoc?.collection || '').map((field) => {
                  const value = formData[field];
                  // Handle null, undefined, and empty values
                  const displayValue = value === null || value === undefined ? '' : value;
                  const isObject = typeof displayValue === 'object' && displayValue !== null && !Array.isArray(displayValue) || (Array.isArray(displayValue));
                  
                  return (
                    <div key={field} className="space-y-2">
                      <label className="block text-sm font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-2">
                        <span className="w-2 h-2 bg-cyan-500 rounded-full"></span>
                        {field}
                      </label>
                      {isObject || (typeof displayValue === 'string' && (displayValue.startsWith('{') || displayValue.startsWith('['))) ? (
                        <textarea
                          value={typeof displayValue === 'string' ? displayValue : JSON.stringify(displayValue, null, 2)}
                          onChange={(e) => {
                            try {
                              const parsed = JSON.parse(e.target.value);
                              updateFormField(field, parsed);
                            } catch {
                              updateFormField(field, e.target.value);
                            }
                          }}
                          className="admin-textarea w-full px-4 py-3 border-2 border-slate-600 rounded-lg bg-slate-700 placeholder:text-slate-500 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 focus:bg-slate-700 focus:outline-none font-mono text-sm transition-all shadow-inner"
                          style={{ 
                            color: '#ffffff',
                            backgroundColor: '#334155'
                          }}
                          rows={6}
                          placeholder={`Enter ${field} (JSON format)`}
                        />
                      ) : (
                        <input
                          type="text"
                          value={String(displayValue)}
                          onChange={(e) => {
                            // Try to parse as number or boolean
                            let parsed: any = e.target.value;
                            if (parsed === 'true') parsed = true;
                            else if (parsed === 'false') parsed = false;
                            else if (!isNaN(Number(parsed)) && parsed !== '') parsed = Number(parsed);
                            updateFormField(field, parsed);
                          }}
                          className="admin-input w-full px-4 py-3 border-2 border-slate-600 rounded-lg bg-slate-700 placeholder:text-slate-500 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 focus:bg-slate-700 focus:outline-none transition-all shadow-inner"
                          style={{ 
                            color: '#ffffff',
                            backgroundColor: '#334155'
                          }}
                          placeholder={`Enter ${field}...`}
                        />
                      )}
                      {displayValue !== '' && displayValue !== null && displayValue !== undefined && (
                        <div className="text-xs text-slate-400 mt-1">
                          <span>Type: <span className="text-cyan-300 font-semibold">{Array.isArray(displayValue) ? 'Array' : typeof displayValue === 'object' ? 'Object' : typeof displayValue}</span></span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="sticky bottom-0 bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 border-t-2 border-slate-600 px-6 py-4 flex items-center justify-between">
                <div className="text-xs text-slate-400">
                  {editingDoc ? 'Editing existing document' : 'Creating new document'}
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleCancel}
                    className="px-6 py-2.5 border-2 border-slate-500 text-slate-300 rounded-lg hover:bg-slate-600 hover:text-white hover:border-slate-400 transition-all font-semibold shadow-md"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-slate-600 disabled:to-slate-700 disabled:cursor-not-allowed text-white rounded-lg font-semibold transition-all shadow-lg flex items-center gap-2 min-w-[120px] justify-center"
                  >
                    {saving ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Saving...</span>
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4" />
                        <span>Save</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
