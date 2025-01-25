import React, { useState } from 'react';
import SidebarContainer from './SidebarContainer';
import SidebarHeader from './SidebarHeader';
import SidebarSection from './SidebarSection';
import UserMenu from '../UserMenu/UserMenu';
import { marketingLinks, manageLinks, inboxLinks, aiLinks } from './navigation';

export default function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <SidebarContainer
      isExpanded={isExpanded}
      onExpand={setIsExpanded}
    >
      <SidebarHeader isExpanded={isExpanded} />
      
      <div className="flex-1 overflow-y-auto">
        <SidebarSection title="Marketing" links={marketingLinks} isExpanded={isExpanded} />
        <SidebarSection title="Manage" links={manageLinks} isExpanded={isExpanded} />
        <SidebarSection title="Inbox" links={inboxLinks} isExpanded={isExpanded} />
        <SidebarSection title="AI" links={aiLinks} isExpanded={isExpanded} />
      </div>

      <UserMenu username="John Doe" isExpanded={isExpanded} />
    </SidebarContainer>
  );
}