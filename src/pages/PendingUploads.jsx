import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Clock,
  AlertCircle,
  CheckCircle,
  RefreshCw,
  Trash2,
  WifiOff,
  Package,
  Calendar,
  MapPin,
  Upload
} from 'lucide-react';
import ContractorLayout from '../components/ContractorLayout';
import offlineDB, { checkOnlineStatus, syncPendingUploads } from '../utils/offlineDB';
import gsap from 'gsap';

const PendingUploads = () => {
  const [pendingUploads, setPendingUploads] = useState([]);
  const [drafts, setDrafts] = useState([]);
  const [isOnline, setIsOnline] = useState(checkOnlineStatus());
  const [isSyncing, setIsSyncing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('pending'); // 'pending' or 'drafts'

  useEffect(() => {
    loadData();

    // Listen to online/offline events
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const loadData = async () => {
    try {
      const [pending, drafts] = await Promise.all([
        offlineDB.getPendingUploads(),
        offlineDB.getDrafts()
      ]);
      
      setPendingUploads(pending.filter(p => p.status === 'pending'));
      setDrafts(drafts);
      setIsLoading(false);
    } catch (error) {
      console.error('Failed to load data:', error);
      setIsLoading(false);
    }
  };

  const handleSync = async () => {
    if (!isOnline) return;
    
    setIsSyncing(true);
    try {
      const results = await syncPendingUploads();
      console.log('Sync results:', results);
      await loadData();
    } catch (error) {
      console.error('Sync failed:', error);
    }
    setIsSyncing(false);
  };

  const handleDeletePending = async (id) => {
    if (confirm('Are you sure you want to delete this pending upload?')) {
      try {
        await offlineDB.deletePendingUpload(id);
        await loadData();
      } catch (error) {
        console.error('Failed to delete:', error);
      }
    }
  };

  const handleDeleteDraft = async (id) => {
    if (confirm('Are you sure you want to delete this draft?')) {
      try {
        await offlineDB.deleteDraft(id);
        await loadData();
      } catch (error) {
        console.error('Failed to delete:', error);
      }
    }
  };

  const handleRetry = async (id) => {
    if (!isOnline) {
      alert('Cannot retry while offline');
      return;
    }

    try {
      await offlineDB.updatePendingUpload(id, { 
        status: 'pending',
        retries: 0 
      });
      await handleSync();
    } catch (error) {
      console.error('Failed to retry:', error);
    }
  };

  const PendingCard = ({ item }) => (
    <div className="bg-white rounded-xl border border-[#E5E7EB] p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start gap-3 mb-3">
        <div className="w-12 h-12 bg-[#F59E0B]/10 rounded-lg flex items-center justify-center flex-shrink-0">
          <Clock className="w-6 h-6 text-[#F59E0B]" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-[#1A1F2E] mb-1">{item.productName || 'Product'}</h3>
          <p className="text-sm text-[#6B7280]">
            {item.category && <span className="capitalize">{item.category}</span>}
            {item.quantity && <span> • {item.quantity} {item.unit}</span>}
          </p>
        </div>
        <button
          onClick={() => handleDeletePending(item.id)}
          className="p-2 hover:bg-[#F8F9FA] rounded-lg transition-colors"
        >
          <Trash2 className="w-4 h-4 text-[#6B7280]" />
        </button>
      </div>

      <div className="space-y-2 mb-3 text-sm">
        {item.floor && (
          <div className="flex items-center gap-2 text-[#6B7280]">
            <MapPin className="w-4 h-4" />
            <span>Floor {item.floor}, {item.zone}</span>
          </div>
        )}
        <div className="flex items-center gap-2 text-[#6B7280]">
          <Calendar className="w-4 h-4" />
          <span>{new Date(item.timestamp).toLocaleString('en-IN')}</span>
        </div>
      </div>

      {item.retries > 0 && (
        <div className="flex items-center gap-2 px-3 py-2 bg-[#FEF3C7] rounded-lg mb-3">
          <AlertCircle className="w-4 h-4 text-[#F59E0B]" />
          <span className="text-xs text-[#92400E]">
            Failed {item.retries} {item.retries === 1 ? 'time' : 'times'}
          </span>
        </div>
      )}

      <div className="flex items-center gap-2">
        <button
          onClick={() => handleRetry(item.id)}
          disabled={!isOnline}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-[#E67E22] text-white rounded-lg hover:bg-[#D35400] transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
        >
          <Upload className="w-4 h-4" />
          Retry Upload
        </button>
      </div>
    </div>
  );

  const DraftCard = ({ item }) => (
    <div className="bg-white rounded-xl border border-[#E5E7EB] p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start gap-3 mb-3">
        <div className="w-12 h-12 bg-[#6B7280]/10 rounded-lg flex items-center justify-center flex-shrink-0">
          <Package className="w-6 h-6 text-[#6B7280]" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-[#1A1F2E] mb-1">{item.productName || 'Untitled Draft'}</h3>
          <p className="text-sm text-[#6B7280]">
            {item.category && <span className="capitalize">{item.category}</span>}
            {item.quantity && <span> • {item.quantity} {item.unit}</span>}
          </p>
        </div>
        <button
          onClick={() => handleDeleteDraft(item.id)}
          className="p-2 hover:bg-[#F8F9FA] rounded-lg transition-colors"
        >
          <Trash2 className="w-4 h-4 text-[#6B7280]" />
        </button>
      </div>

      <div className="flex items-center gap-2 text-sm text-[#6B7280] mb-3">
        <Calendar className="w-4 h-4" />
        <span>Saved {new Date(item.timestamp).toLocaleString('en-IN')}</span>
      </div>

      <Link
        to="/contractor/register"
        state={{ draft: item }}
        className="block w-full text-center px-4 py-2 bg-[#F8F9FA] text-[#1A1F2E] rounded-lg hover:bg-[#E5E7EB] transition-colors text-sm font-medium"
      >
        Continue Editing
      </Link>
    </div>
  );

  const EmptyState = ({ type }) => (
    <div className="flex flex-col items-center justify-center py-16 px-6">
      <div className="w-20 h-20 bg-[#F8F9FA] rounded-full flex items-center justify-center mb-4">
        {type === 'pending' ? (
          <Clock className="w-10 h-10 text-[#6B7280]" />
        ) : (
          <Package className="w-10 h-10 text-[#6B7280]" />
        )}
      </div>
      <h3 className="text-lg font-semibold text-[#1A1F2E] mb-2">
        {type === 'pending' ? 'No Pending Uploads' : 'No Drafts Saved'}
      </h3>
      <p className="text-sm text-[#6B7280] text-center max-w-sm">
        {type === 'pending'
          ? 'All your products are synced to the blockchain'
          : 'Save your work as draft to continue later'}
      </p>
    </div>
  );

  return (
    <ContractorLayout>
      <div className="min-h-screen bg-[#F8F9FA]">
        {/* Header */}
        <div className="bg-white border-b border-[#E5E7EB] sticky top-0 z-30">
          <div className="px-4 py-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-2xl font-bold text-[#1A1F2E]">
                  {activeTab === 'pending' ? 'Pending Uploads' : 'Drafts'}
                </h1>
                <p className="text-sm text-[#6B7280] mt-1">
                  {activeTab === 'pending'
                    ? `${pendingUploads.length} items waiting to sync`
                    : `${drafts.length} saved drafts`}
                </p>
              </div>
              
              {activeTab === 'pending' && (
                <button
                  onClick={handleSync}
                  disabled={!isOnline || isSyncing || pendingUploads.length === 0}
                  className="flex items-center gap-2 px-4 py-2 bg-[#E67E22] text-white rounded-xl hover:bg-[#D35400] transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                >
                  <RefreshCw className={`w-5 h-5 ${isSyncing ? 'animate-spin' : ''}`} />
                  <span className="text-sm">Sync All</span>
                </button>
              )}
            </div>

            {/* Online Status Banner */}
            {!isOnline && (
              <div className="flex items-center gap-2 px-4 py-3 bg-[#FEF3C7] border border-[#F59E0B] rounded-lg mb-4">
                <WifiOff className="w-5 h-5 text-[#F59E0B]" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-[#92400E]">You're offline</p>
                  <p className="text-xs text-[#92400E]">Items will sync when connection is restored</p>
                </div>
              </div>
            )}

            {/* Tabs */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab('pending')}
                className={`flex-1 px-4 py-3 rounded-lg font-medium transition-colors ${
                  activeTab === 'pending'
                    ? 'bg-[#E67E22] text-white'
                    : 'bg-[#F8F9FA] text-[#6B7280] hover:bg-[#E5E7EB]'
                }`}
              >
                Pending ({pendingUploads.length})
              </button>
              <button
                onClick={() => setActiveTab('drafts')}
                className={`flex-1 px-4 py-3 rounded-lg font-medium transition-colors ${
                  activeTab === 'drafts'
                    ? 'bg-[#E67E22] text-white'
                    : 'bg-[#F8F9FA] text-[#6B7280] hover:bg-[#E5E7EB]'
                }`}
              >
                Drafts ({drafts.length})
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          {isLoading ? (
            <div className="flex items-center justify-center py-16">
              <RefreshCw className="w-8 h-8 text-[#E67E22] animate-spin" />
            </div>
          ) : activeTab === 'pending' ? (
            pendingUploads.length > 0 ? (
              <div className="space-y-4">
                {pendingUploads.map(item => (
                  <PendingCard key={item.id} item={item} />
                ))}
              </div>
            ) : (
              <EmptyState type="pending" />
            )
          ) : (
            drafts.length > 0 ? (
              <div className="space-y-4">
                {drafts.map(item => (
                  <DraftCard key={item.id} item={item} />
                ))}
              </div>
            ) : (
              <EmptyState type="drafts" />
            )
          )}
        </div>
      </div>
    </ContractorLayout>
  );
};

export default PendingUploads;
