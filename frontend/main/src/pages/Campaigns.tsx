import React, { useState, useEffect } from 'react';
import {
  collection,
  doc,
  getDocs,
  setDoc,
  deleteDoc,
  addDoc,
} from 'firebase/firestore';
import { onAuthStateChanged, User } from 'firebase/auth';
import { db, auth } from '../firebase'; // <-- your Firebase config/auth exports
import CampaignTabs from '../components/Campaigns/CampaignTabs';
import CampaignToolbar from '../components/Campaigns/CampaignToolbar';
import CampaignTableHeader from '../components/Campaigns/CampaignTable/CampaignTableHeader';
import CampaignTableRow from '../components/Campaigns/CampaignTable/CampaignTableRow';
import CampaignForm from '../components/Campaigns/CampaignForm';
import CampaignFilters from '../components/Campaigns/CampaignFilters';
import ExportDialog from '../components/Campaigns/ExportDialog';
import { Campaign, CampaignType, CampaignStatus } from '../types/campaign';
import { useSortableData } from '../hooks/useSortableData';
import { exportToCsv } from '../utils/exportUtils';

// Define columns at the top-level scope
const columns = [
  { key: 'name', label: 'Campaign', sortable: true },
  { key: 'type', label: 'Type', sortable: true },
  { key: 'tags', label: 'Tags' },
  { key: 'status', label: 'Status', sortable: true },
  { key: 'recipients', label: 'Recipients', sortable: true },
  { key: 'openRate', label: 'Open Rate', sortable: true },
  { key: 'clickRate', label: 'Click Rate', sortable: true },
  { key: 'placedRate', label: 'Placed Rate', sortable: true },
  { key: 'createdAt', label: 'Date', sortable: true },
];


// 1. Skeleton component
function CampaignsSkeleton() {
  return (
    <div className="space-y-4">
      {/* Title Placeholder */}
      <div className="h-6 bg-gray-200 rounded w-1/3" />
      <div className="h-4 bg-gray-200 rounded w-1/4" />

      {/* Table Placeholder */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            {/* Table header skeleton */}
            <thead>
              <tr>
                {Array.from({ length: 9 }).map((_, i) => (
                  <th key={i} className="px-6 py-3 bg-gray-100">
                    <div className="h-3 bg-gray-200 rounded" />
                  </th>
                ))}
              </tr>
            </thead>
            {/* Table body skeleton rows */}
            <tbody>
              {Array.from({ length: 5 }).map((_, rowIdx) => (
                <tr key={rowIdx} className="border-b">
                  {Array.from({ length: 9 }).map((_, colIdx) => (
                    <td key={colIdx} className="px-6 py-4">
                      <div className="h-3 bg-gray-200 rounded" />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default function Campaigns() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [user, setUser] = useState<User | null>(null);

  // 2. Introduce loading state
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [activeTab, setActiveTab] = useState<'all' | 'draft' | 'sent'>('all');
  const [search, setSearch] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | undefined>();
  const [filters, setFilters] = useState({
    types: [] as CampaignType[],
    statuses: [] as CampaignStatus[],
    dateRange: {
      start: '',
      end: '',
    },
  });

  useEffect(() => {
    // Auth listener
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser || null);
    });
    return () => unsubscribe();
  }, []);

  // 3. Fetch campaigns from Firestore when we have a user
  useEffect(() => {
    if (!user?.uid) {
      // If there's no user, we can clear or do nothing
      setCampaigns([]);
      setIsLoading(false);
      return;
    }

    const fetchCampaigns = async () => {
      setIsLoading(true);
      try {
        const campaignsRef = collection(db, 'CampaignCollection', user.uid, 'Campaigns');
        const snapshot = await getDocs(campaignsRef);

        const fetchedCampaigns: Campaign[] = snapshot.docs.map((docSnap) => {
          const data = docSnap.data() as Omit<Campaign, 'id'>;
          return {
            id: docSnap.id,
            ...data,
          };
        });

        setCampaigns(fetchedCampaigns);
      } catch (error) {
        console.error('Error fetching campaigns:', error);
      } finally {
        // 4. Toggle loading off when done (success or error)
        setIsLoading(false);
      }
    };

    fetchCampaigns();
  }, [user]);

  const { items: sortedCampaigns, requestSort, sortConfig } = useSortableData(campaigns);

  const filteredCampaigns = sortedCampaigns.filter((campaign) => {
    const matchesSearch = campaign.name.toLowerCase().includes(search.toLowerCase());
    const matchesTab =
      activeTab === 'all' ||
      (activeTab === 'draft' && campaign.status === 'draft') ||
      (activeTab === 'sent' && campaign.status === 'completed');
    const matchesType =
      filters.types.length === 0 || filters.types.includes(campaign.type);
    const matchesStatus =
      filters.statuses.length === 0 || filters.statuses.includes(campaign.status);
    const matchesDateRange =
      (!filters.dateRange.start ||
        new Date(campaign.createdAt) >= new Date(filters.dateRange.start)) &&
      (!filters.dateRange.end || new Date(campaign.createdAt) <= new Date(filters.dateRange.end));

    return matchesSearch && matchesTab && matchesType && matchesStatus && matchesDateRange;
  });

  const counts = {
    all: campaigns.length,
    draft: campaigns.filter((c) => c.status === 'draft').length,
    sent: campaigns.filter((c) => c.status === 'completed').length,
  };

  const handleCreateCampaign = () => {
    setSelectedCampaign(undefined);
    setIsFormOpen(true);
  };

  const handleEditCampaign = (campaign: Campaign) => {
    setSelectedCampaign(campaign);
    setIsFormOpen(true);
  };

  const handleDuplicateCampaign = async (campaign: Campaign) => {
    if (!user?.uid) return;

    try {
      const campaignsRef = collection(db, 'CampaignCollection', user.uid, 'Campaigns');
      await addDoc(campaignsRef, {
        ...campaign,
        name: `${campaign.name} (Copy)`,
        status: 'draft' as CampaignStatus,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });

      // Update local state or refetch
      setCampaigns((prev) => [
        ...prev,
        {
          ...campaign,
          id: crypto.randomUUID(), // temp ID
          name: `${campaign.name} (Copy)`,
          status: 'draft',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ]);
    } catch (error) {
      console.error('Error duplicating campaign:', error);
    }
  };

  const handleDeleteCampaign = async (campaign: Campaign) => {
    if (!user?.uid) return;

    try {
      await deleteDoc(doc(db, 'CampaignCollection', user.uid, 'Campaigns', campaign.id));
      setCampaigns((prev) => prev.filter((c) => c.id !== campaign.id));
    } catch (error) {
      console.error('Error deleting campaign:', error);
    }
  };

  const handleSaveCampaign = async (campaignData: Partial<Campaign>) => {
    if (!user?.uid) return;

    try {
      if (campaignData.id) {
        const docRef = doc(db, 'CampaignCollection', user.uid, 'Campaigns', campaignData.id);
        await setDoc(
          docRef,
          {
            ...campaignData,
            updatedAt: new Date().toISOString(),
          },
          { merge: true },
        );
      } else {
        const campaignsRef = collection(db, 'CampaignCollection', user.uid, 'Campaigns');
        await addDoc(campaignsRef, {
          ...campaignData,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        });
      }

      // Optionally refetch or update local state
      const campaignsRef = collection(db, 'CampaignCollection', user.uid, 'Campaigns');
      const snapshot = await getDocs(campaignsRef);
      const updatedCampaigns = snapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        ...docSnap.data(),
      })) as Campaign[];
      setCampaigns(updatedCampaigns);
    } catch (error) {
      console.error('Error saving campaign:', error);
    }

    setIsFormOpen(false);
  };

  const handleExport = () => {
    setIsExportOpen(true);
  };

  const handleExportConfirm = (fileName: string) => {
    exportToCsv(filteredCampaigns, fileName);
  };

  // 5. Conditionally render either the skeleton or the main UI
  if (isLoading) {
    return (
      <div className="p-8">
        <CampaignsSkeleton />
      </div>
    );
  }

  // If not loading, show the real UI
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Campaigns</h1>
        <p className="mt-1 text-sm text-gray-500">
          Create and manage your marketing campaigns
        </p>
      </div>

      <CampaignTabs
        activeTab={activeTab}
        onTabChange={setActiveTab}
        counts={counts}
      />

      <CampaignToolbar
        search={search}
        onSearchChange={setSearch}
        onFilter={() => setIsFiltersOpen(true)}
        onExport={handleExport}
        onCreateCampaign={handleCreateCampaign}
      />

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <CampaignTableHeader
              columns={columns}
              sortConfig={sortConfig}
              onSort={requestSort}
            />
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredCampaigns.map((campaign) => (
                <CampaignTableRow
                  key={campaign.id}
                  campaign={campaign}
                  onEdit={handleEditCampaign}
                  onDuplicate={handleDuplicateCampaign}
                  onDelete={handleDeleteCampaign}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <CampaignForm
        campaign={selectedCampaign}
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSave={handleSaveCampaign}
      />

      <CampaignFilters
        isOpen={isFiltersOpen}
        onClose={() => setIsFiltersOpen(false)}
        filters={filters}
        onFiltersChange={setFilters}
      />

      <ExportDialog
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        onExport={handleExportConfirm}
      />
    </div>
  );
}
