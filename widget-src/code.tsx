/** @jsx figma.widget.h */

const { widget } = figma;
const {
  AutoLayout,
  Text,
  Input,
  useSyncedState,
  SVG,
} = widget;

const COLORS = {
  bg: '#161616',
  textPrimary: '#C6C6C6',
  textSecondary: '#8D8D8D',
  textPlaceholder: '#6F6F6F',
  linkPrimary: '#78A9FF',
  border: '#525252',
  borderSubtle: '#393939',
  tableHeaderBg: '#262626',
  dropdownBg: '#262626',
  wipBg: '#F1C21B',
  wipText: '#161616',
  doneBg: '#CFFFCF',   // Light Green for Use Case Done
  doneText: '#156915', // Dark Green Text
  hoverBg: '#1E2C3D', // Subtle Blue Hover
  iconSlack: '#E01E5A', // Slack reddish
  iconJira: '#0052CC',  // Jira blue
  buttonPrimaryBg: '#18A0FB', // Figma Blue for Save
  buttonSecondaryBg: '#444444', // Dark gray for Cancel
};

// --- Icons ---
const ICON_CHECK_CIRCLE = (color: string) => `
<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM10 17L5 12L6.41 10.59L10 13.41L17.59 5.82L19 7.23L10 17Z" fill="${color}"/>
</svg>
`;
const ICON_SCHEDULE = (color: string) => `
<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11.99 2C6.47 2 2 6.48 2 12C2 17.52 6.47 22 11.99 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 11.99 2ZM12 20C7.58 20 4 16.42 4 12C4 7.58 7.58 4 12 4C16.42 4 20 7.58 20 12C20 16.42 16.42 20 12 20ZM12.5 7H11V13L16.25 16.15L17 14.92L12.5 12.25V7Z" fill="${color}"/>
</svg>
`;
const ICON_CANCEL = (color: string) => `
<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12 2C6.47 2 2 6.47 2 12C2 17.53 6.47 22 12 22C17.53 22 22 17.53 22 12C22 6.47 17.53 2 12 2ZM17 15.59L15.59 17L12 13.41L8.41 17L7 15.59L10.59 12L7 8.41L8.41 7L12 10.59L15.59 7L17 8.41L13.41 12L17 15.59Z" fill="${color}"/>
</svg>
`;
const ICON_TODO = (color: string) => `
<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z" fill="${color}"/>
</svg>
`;
const ICON_RULE = (color: string) => `
<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16.54 11L13 14.53L11.47 13L10.59 13.88L13 16.29L17.42 11.88L16.54 11ZM19.59 7L12.01 7C12.01 7 12 7 12 7V1.75C12 0.78 11.22 0 10.25 0H5.5L2 3.5V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V9.41L19.59 7ZM20 18H4V3.5H5.25V7H8.75V3.5H10.25V9H19.59V18H20Z" fill="${color}"/>
</svg>
`;
const ICON_CHEVRON_DOWN = (color: string) => `
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7.41 8.59L12 13.17L16.59 8.59L18 10L12 16L6 10L7.41 8.59Z" fill="${color}"/>
</svg>
`;
const ICON_ADD = (color: string) => `
<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" fill="${color}"/>
</svg>
`;
const ICON_EDIT = (color: string) => `
<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" fill="${color}"/>
</svg>
`;
const ICON_CLOSE = (color: string) => `
<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" fill="${color}"/>
</svg>
`;
const ICON_DONE = (color: string) => `
<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" fill="${color}"/>
</svg>
`;
// User-Provided Jira White Outline Logo
const ICON_JIRA = `
<svg width="24" height="24" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" fill="none">
<defs><style>.a{fill:none;stroke:#FFFFFF;stroke-width:3;stroke-linecap:round;stroke-linejoin:round;}</style></defs>
<path class="a" d="M5.5,22.9722h0a8.7361,8.7361,0,0,0,8.7361,8.7361h2.0556v2.0556A8.7361,8.7361,0,0,0,25.0278,42.5h0V22.9722Z"></path>
<path class="a" d="M14.2361,14.2361h0a8.7361,8.7361,0,0,0,8.7361,8.7361h2.0556v2.0556a8.7361,8.7361,0,0,0,8.7361,8.7361h0V14.2361Z"></path>
<path class="a" d="M22.9722,5.5h0a8.7361,8.7361,0,0,0,8.7361,8.7361h2.0556v2.0556A8.7361,8.7361,0,0,0,42.5,25.0278h0V5.5Z"></path>
</svg>
`;

// User-Provided Slack White Logo
const ICON_SLACK = `
<svg width="24" height="24" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#FFFFFF">
<path d="M19.955 23.108c-1.74 0-3.151-1.411-3.151-3.151s1.411-3.151 3.151-3.151h7.889c1.74 0 3.151 1.411 3.151 3.151s-1.411 3.151-3.151 3.151v0zM19.955 24.693c1.739 0 3.149 1.41 3.149 3.149s-1.41 3.149-3.149 3.149c-1.738 0-3.148-1.408-3.149-3.146v-3.152zM23.108 12.044c0 1.74-1.411 3.151-3.151 3.151s-3.151-1.411-3.151-3.151v0-7.888c0-1.74 1.411-3.151 3.151-3.151s3.151 1.411 3.151 3.151v0zM24.693 12.044c0.001-1.738 1.41-3.147 3.148-3.147s3.148 1.41 3.148 3.149c0 1.738-1.408 3.147-3.145 3.149h-3.152zM12.044 8.893c1.736 0.005 3.142 1.413 3.142 3.15s-1.406 3.146-3.142 3.15h-7.888c-1.736-0.005-3.142-1.413-3.142-3.15s1.406-3.146 3.142-3.15h0zM12.044 7.305c-1.736-0.002-3.143-1.41-3.143-3.147 0-1.738 1.409-3.147 3.147-3.147s3.145 1.408 3.147 3.144v3.149zM8.893 19.955c0.005-1.736 1.413-3.142 3.15-3.142s3.146 1.406 3.15 3.142v7.889c-0.005 1.736-1.413 3.142-3.15 3.142s-3.146-1.406-3.15-3.142v-0zM7.305 19.955c-0.001 1.737-1.41 3.145-3.147 3.145s-3.147-1.409-3.147-3.147c0-1.738 1.408-3.146 3.145-3.147h3.149z" fill="#FFFFFF"></path>
</svg>
`;
const ICON_LINK = (color: string) => `
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M3.9 12C3.9 10.29 5.29 8.9 7 8.9H11V7H7C4.24 7 2 9.24 2 12C2 14.76 4.24 17 7 17H11V15.1H7C5.29 15.1 3.9 13.71 3.9 12ZM8 13H16V11H8V13ZM17 7H13V8.9H17C18.71 8.9 20.1 10.29 20.1 12C20.1 13.71 18.71 15.1 17 15.1H13V17H17C19.76 17 22 14.76 22 12C22 9.24 19.76 7 17 7Z" fill="${color}"/>
</svg>
`;

const ICON_CODE = (color: string) => `
<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z" fill="${color}"/>
</svg>
`;

const ICON_APPROVAL = (color: string) => `
<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="${color}"/>
</svg>
`;

const ICON_BUG = (color: string) => `
<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M20 8h-2.81c-.45-.78-1.07-1.45-1.82-1.96L17 4.41 15.59 3l-2.17 2.17C12.96 5.06 12.49 5 12 5c-.49 0-.96.06-1.41.17L8.41 3 7 4.41l1.62 1.63C7.88 6.55 7.26 7.22 6.81 8H4v2h2.09c-.05.33-.09.66-.09 1v1H4v2h2v1c0 .34.04.67.09 1H4v2h2.81c1.04 1.79 2.97 3 5.19 3s4.15-1.21 5.19-3H20v-2h-2.09c.05-.33.09-.66.09-1v-1h2v-2h-2v-1c0-.34-.04-.67-.09-1H20V8zm-6 8h-4v-2h4v2zm0-4h-4v-2h4v2z" fill="${color}"/>
</svg>
`;

const getStatusIcon = (status: string, color: string) => {
  switch (status) {
    case 'To do': return ICON_TODO(color);
    case 'In progress': return ICON_SCHEDULE(color);
    case 'Waiting for approval': return ICON_APPROVAL(color);
    case 'In QA': return ICON_BUG(color);
    case 'Blocked': return ICON_CANCEL(color);
    case 'Ready for dev': return ICON_CODE(color);
    case 'Shipped':
    case 'Done': return ICON_CHECK_CIRCLE(color);
    default: return ICON_TODO(color);
  }
};

const STATUS_STYLES: Record<string, { bg: string, text: string, iconColor: string }> = {
  'To do': { bg: '#444444', text: '#EDEDED', iconColor: '#999999' },
  'In progress': { bg: '#FFF8B6', text: '#8A6D0B', iconColor: '#D9B918' },
  'Waiting for approval': { bg: '#D4EFFF', text: '#0C4B75', iconColor: '#3D86BF' },
  'Blocked': { bg: '#7F1D1D', text: '#FFC7C7', iconColor: '#E66A6A' },
  'Ready for dev': { bg: '#CFFFCF', text: '#156915', iconColor: '#3DA83D' },
  'In QA': { bg: '#D4EFFF', text: '#0C4B75', iconColor: '#3D86BF' },
  'Shipped': { bg: '#CFFFCF', text: '#156915', iconColor: '#3DA83D' },
  'Done': { bg: '#CFFFCF', text: '#156915', iconColor: '#3DA83D' },
};

const DESIGN_STATUS_OPTIONS = ['To do', 'In progress', 'Waiting for approval', 'Blocked', 'Ready for dev'];
const DEV_STATUS_OPTIONS = ['To do', 'In progress', 'In QA', 'Blocked', 'Shipped'];

const formatDate = (timestamp: number) => {
  const date = new Date(timestamp);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = ('0' + date.getMinutes()).slice(-2);
  const ampm = hours >= 12 ? 'pm' : 'am';
  let displayHours = hours % 12;
  displayHours = displayHours ? displayHours : 12; // the hour '0' should be '12'
  return `${day} ${month} ${year}, ${displayHours}:${minutes}${ampm}`;
};

function ProjectDetailsWidget() {
  const [title, setTitle] = useSyncedState('title', '');
  const [description, setDescription] = useSyncedState('description', '');
  const [designStatus, setDesignStatus] = useSyncedState('designStatus', 'Ready for dev');
  const [devStatus, setDevStatus] = useSyncedState('devStatus', 'To do');
  const [isDesignDropdownOpen, setIsDesignDropdownOpen] = useSyncedState('isDesignDropdownOpen', false);
  const [isDevDropdownOpen, setIsDevDropdownOpen] = useSyncedState('isDevDropdownOpen', false);
  const [lastUpdated, setLastUpdated] = useSyncedState('lastUpdated', Date.now());

  const updateTimestamp = () => setLastUpdated(Date.now());

  const [owners, setOwners] = useSyncedState('owners_v8', {
    design: '',
    product: '',
    engineering: '',
    qa: '',
  });

  const [links, setLinks] = useSyncedState('links_v9', [
    { type: 'slack', label: 'Slack channel', url: '' },
    { type: 'jira', label: 'Jira ticket', url: '' },
  ]);

  // Link editing state
  const [editingLinkIndex, setEditingLinkIndex] = useSyncedState('editingLinkIndex', null as number | null);

  // Add/Edit Link Form State
  const [isAddingLink, setIsAddingLink] = useSyncedState('isAddingLink', false);
  const [newLinkName, setNewLinkName] = useSyncedState('newLinkName', '');
  const [newLinkUrl, setNewLinkUrl] = useSyncedState('newLinkUrl', '');

  // Use Case Editing State
  const [editingUseCaseIndex, setEditingUseCaseIndex] = useSyncedState('editingUseCaseIndex', null as number | null);


  const [details, setDetails] = useSyncedState('details', {
    problemStatement: '',
    personas: '',
    assumptions: '',
  });

  const [useCases, setUseCases] = useSyncedState('useCases', [{ title: '', link: '', status: 'WIP' }]);

  // --- Handlers ---

  const handleTitleChange = (e: { characters: string }) => { setTitle(e.characters); updateTimestamp(); };
  const handleDescriptionChange = (e: { characters: string }) => { setDescription(e.characters); updateTimestamp(); };

  const toggleDesignDropdown = () => {
    const willOpen = !isDesignDropdownOpen;
    setIsDesignDropdownOpen(willOpen);
    if (willOpen) setIsDevDropdownOpen(false);
  };

  const toggleDevDropdown = () => {
    const willOpen = !isDevDropdownOpen;
    setIsDevDropdownOpen(willOpen);
    if (willOpen) setIsDesignDropdownOpen(false);
  };

  const handleSetDesignStatus = (status: string) => { setDesignStatus(status); setIsDesignDropdownOpen(false); updateTimestamp(); };
  const handleSetDevStatus = (status: string) => { setDevStatus(status); setIsDevDropdownOpen(false); updateTimestamp(); };

  const handleUpdateOwner = (role: string, e: { characters: string }) => {
    const newOwners = { ...owners };
    (newOwners as any)[role] = e.characters;
    setOwners(newOwners);
    updateTimestamp();
  };

  const handleOpenAddLink = () => {
    setNewLinkName('');
    setNewLinkUrl('');
    setIsAddingLink(true);
    setEditingLinkIndex(null);
  };

  const handleCancelLink = () => {
    setIsAddingLink(false);
    setEditingLinkIndex(null);
  };

  const handleSaveLink = () => {
    const isFixedType = editingLinkIndex !== null && ['slack', 'jira'].includes(links[editingLinkIndex].type);

    if (editingLinkIndex === null) {
      // Creating New Link
      if (newLinkName && newLinkUrl) {
        setLinks([...links, { type: 'custom', label: newLinkName, url: newLinkUrl }]);
        setIsAddingLink(false);
        setEditingLinkIndex(null);
        updateTimestamp();
      }
    } else {
      // Updating Existing Link
      // Custom Name Check
      if (!isFixedType && !newLinkName) return;

      const nl = [...links];
      if (!isFixedType) nl[editingLinkIndex].label = newLinkName;
      nl[editingLinkIndex].url = newLinkUrl; // Allow empty

      setLinks(nl);
      setIsAddingLink(false);
      setEditingLinkIndex(null);
      updateTimestamp();
    }
  };

  const handleRemoveLink = (idx: number) => {
    const nl = [...links];
    nl.splice(idx, 1);
    setLinks(nl);
    setEditingLinkIndex(null);
    setIsAddingLink(false);
    updateTimestamp();
  };

  const handleEditLink = (idx: number) => {
    if (editingLinkIndex === idx) {
      // Toggle off if clicking edit again
      setEditingLinkIndex(null);
    } else {
      setEditingLinkIndex(idx);
      setNewLinkName(links[idx].label || '');
      setNewLinkUrl(links[idx].url || '');
      setIsAddingLink(false); // Ensure "Add" is closed
    }
  };

  const handleOpenUrl = (url?: string) => {
    if (url && (url.startsWith('http') || url.startsWith('https'))) {
      figma.openExternal(url);
    } else {
      figma.notify('Invalid URL');
    }
  };

  const handleUpdateDetail = (key: string, e: { characters: string }) => { setDetails({ ...details, [key]: e.characters }); updateTimestamp(); };
  const handleUpdateUseCaseTitle = (idx: number, e: { characters: string }) => { const n = [...useCases]; n[idx].title = e.characters; setUseCases(n); updateTimestamp(); };

  const handleUpdateUseCaseLink = (idx: number, e: { characters: string }) => {
    const n = [...useCases];
    n[idx].link = e.characters;
    setUseCases(n);
    updateTimestamp();
  };

  const handleToggleUseCaseStatus = (idx: number) => {
    const n = [...useCases];
    // Toggle between WIP and Done
    n[idx].status = n[idx].status === 'Done' ? 'WIP' : 'Done';
    setUseCases(n);
    updateTimestamp();
  };

  const handleRemoveUseCase = (idx: number) => { const n = [...useCases]; n.splice(idx, 1); setUseCases(n); setEditingUseCaseIndex(null); updateTimestamp(); };
  const handleAddUseCase = () => { setUseCases([...useCases, { title: '', link: '', status: 'WIP' }]); updateTimestamp(); };

  const handleEditUseCase = (idx: number) => {
    // Toggle edit mode for this row
    if (editingUseCaseIndex === idx) {
      setEditingUseCaseIndex(null);
    } else {
      setEditingUseCaseIndex(idx);
    }
  };


  // --- Render Helpers ---

  const renderStatusOption = (opt: string, type: 'design' | 'dev') => {
    const style = STATUS_STYLES[opt] || STATUS_STYLES['To do'];
    return (
      <AutoLayout
        key={opt}
        fill={style.bg}
        padding={{ horizontal: 16, vertical: 4 }}
        cornerRadius={100}
        onClick={() => type === 'design' ? handleSetDesignStatus(opt) : handleSetDevStatus(opt)}
        horizontalAlignItems="center"
        verticalAlignItems="center"
        spacing={8}
      >
        <SVG src={getStatusIcon(opt, style.iconColor)} width={16} height={16} />
        <Text fontSize={16} fontWeight={600} fill={style.text}>{opt}</Text>
      </AutoLayout>
    );
  };

  const renderCurrentStatusPill = (label: string, status: string, onClick: () => void) => {
    const style = STATUS_STYLES[status] || STATUS_STYLES['To do'];
    return (
      <AutoLayout
        direction="horizontal"
        verticalAlignItems="center"
        spacing={8}
        padding={{ horizontal: 16, vertical: 4 }}
        cornerRadius={100}
        fill={style.bg}
        onClick={onClick}
      >
        <Text fontSize={12} fill={style.text} letterSpacing={0.32} fontWeight={400}>{label}</Text>
        <AutoLayout height={12} width={1} fill={style.text} opacity={0.3} />
        <SVG src={getStatusIcon(status, style.iconColor)} width={16} height={16} />
        <Text fontSize={16} fill={style.text} fontWeight={600}>{status}</Text>
        <SVG src={ICON_CHEVRON_DOWN(style.text)} width={24} height={24} />
      </AutoLayout>
    );
  };

  const renderLinkForm = (showNameInput: boolean) => (
    <AutoLayout direction="vertical" padding={12} cornerRadius={8} fill={COLORS.dropdownBg} spacing={12} width="fill-parent">
      {showNameInput && (
        <Input
          value={newLinkName}
          placeholder="Link name"
          fontSize={14}
          fill={COLORS.textPrimary}
          width="fill-parent"
          inputFrameProps={{ fill: '#333333', cornerRadius: 4, padding: 8 }}
          onTextEditEnd={(e) => setNewLinkName(e.characters)}
        />
      )}
      <Input
        value={newLinkUrl}
        placeholder="URL"
        fontSize={14}
        fill={COLORS.textPrimary}
        width="fill-parent"
        inputFrameProps={{ fill: '#333333', cornerRadius: 4, padding: 8 }}
        onTextEditEnd={(e) => setNewLinkUrl(e.characters)}
      />
      <AutoLayout direction="horizontal" spacing={8} horizontalAlignItems="end" width="fill-parent">
        <AutoLayout padding={{ vertical: 6, horizontal: 12 }} fill={COLORS.buttonSecondaryBg} cornerRadius={4} onClick={handleCancelLink}>
          <Text fontSize={12} fill="#FFFFFF">Cancel</Text>
        </AutoLayout>
        <AutoLayout padding={{ vertical: 6, horizontal: 12 }} fill={COLORS.buttonPrimaryBg} cornerRadius={4} onClick={handleSaveLink}>
          <Text fontSize={12} fill="#FFFFFF">Save</Text>
        </AutoLayout>
      </AutoLayout>
    </AutoLayout>
  );

  return (
    <AutoLayout direction="vertical" padding={48} spacing={32} cornerRadius={20} fill={COLORS.bg} width={1171}>
      {/* HEADER */}
      <AutoLayout direction="vertical" spacing={16} width="fill-parent">
        <Input value={title || ''} placeholder="Project title" fontSize={42} fill={COLORS.textPrimary} width="fill-parent" onTextEditEnd={handleTitleChange} />
        <Input value={description || ''} placeholder="Add a description..." fontSize={16} fill={COLORS.textPlaceholder} width="fill-parent" onTextEditEnd={handleDescriptionChange} />

        <AutoLayout direction="horizontal" spacing={12} zIndex={10} overflow="visible">
          {renderCurrentStatusPill("DESIGN", designStatus || 'Ready for dev', toggleDesignDropdown)}
          {renderCurrentStatusPill("DEV", devStatus || 'To do', toggleDevDropdown)}
        </AutoLayout>

        {(isDesignDropdownOpen || isDevDropdownOpen) && (
          <AutoLayout direction="vertical" padding={8} cornerRadius={8} fill={COLORS.dropdownBg} stroke={COLORS.border} strokeWidth={1} spacing={8} width="fill-parent" maxWidth={600}>
            <Text fontSize={14} fill={COLORS.textSecondary}>{isDesignDropdownOpen ? 'Select design status' : 'Select dev status'}</Text>
            <AutoLayout direction="horizontal" wrap={true} spacing={8} width="fill-parent">
              {isDesignDropdownOpen ? DESIGN_STATUS_OPTIONS.map(opt => renderStatusOption(opt, 'design')) : DEV_STATUS_OPTIONS.map(opt => renderStatusOption(opt, 'dev'))}
            </AutoLayout>
          </AutoLayout>
        )}
      </AutoLayout>

      {/* TEAM & LINKS */}
      <AutoLayout direction="horizontal" spacing={32} width="fill-parent" zIndex={20}>
        <AutoLayout direction="vertical" spacing={16} width="fill-parent">
          {['design', 'product', 'engineering', 'qa'].map(role => {
            const label = (role === 'qa' ? 'QA' : role.charAt(0).toUpperCase() + role.slice(1)) + ' owner';
            const value = (owners as any)[role] || '';

            return (
              <AutoLayout key={role} direction="horizontal" verticalAlignItems="center" spacing={30} height={40}>
                <AutoLayout width={129}><Text fontSize={14} fill={COLORS.textSecondary}>{label}</Text></AutoLayout>
                <Input
                  value={value}
                  placeholder="Add owner..."
                  fontSize={14}
                  fill={COLORS.textPrimary}
                  placeholderColor={COLORS.textPlaceholder}
                  width="fill-parent"
                  onTextEditEnd={(e) => handleUpdateOwner(role, e)}
                />
              </AutoLayout>
            );
          })}
        </AutoLayout>

        <AutoLayout direction="vertical" spacing={16} width="fill-parent">
          {links.map((link, idx) => {
            const isEditing = editingLinkIndex === idx;
            const isCustom = link.type === 'custom';
            // Determine if Name Input is needed (Custom only)
            const showNameInput = isCustom;

            // Determine Icon
            let iconSvg = ICON_LINK(COLORS.textPlaceholder);
            if (link.type === 'slack') iconSvg = ICON_SLACK;
            else if (link.type === 'jira') iconSvg = ICON_JIRA;
            else if (isCustom) iconSvg = ICON_LINK(COLORS.textPrimary); // Custom links have white icon

            // Conditional Hover State: Only if link has valid URL, OR if active (though here it's about hover)
            // User requested: "Don't make the links blue on hover for slack and jira when it is in not provided state."
            const hasUrl = !!link.url;
            const hoverStyle = hasUrl ? { fill: COLORS.hoverBg } : undefined;
            const textHoverStyle = hasUrl ? { fill: COLORS.linkPrimary } : undefined;

            return (
              <AutoLayout key={idx} direction="vertical" width="fill-parent" spacing={8}>
                {/* 1. Main Link Row (Always Visible) */}
                <AutoLayout
                  direction="horizontal"
                  verticalAlignItems="center"
                  spacing={8}
                  height={40}
                  padding={8}
                  cornerRadius={8}
                  hoverStyle={hoverStyle}
                  width="fill-parent"
                >
                  {/* Content Area (Clickable for Link) */}
                  <AutoLayout
                    direction="horizontal"
                    verticalAlignItems="center"
                    spacing={8}
                    width="fill-parent"
                    onClick={hasUrl ? () => handleOpenUrl(link.url) : () => handleEditLink(idx)} // If empty, click opens edit? OR just no-op. Let's redirect to edit if empty for better UX? Or stick to strict "Not provided".
                  // Sticking to: Click opens URL if present.
                  >
                    <SVG src={iconSvg} width={24} height={24} />
                    <AutoLayout direction="horizontal" spacing={8} verticalAlignItems="center">
                      <Text fontSize={14} fill={COLORS.textPrimary} hoverStyle={textHoverStyle}>{link.label || 'Link'}</Text>
                      {!link.url && (link.type === 'slack' || link.type === 'jira') && (
                        <Text fontSize={12} fill={COLORS.textSecondary} italic={true}>(Not provided)</Text>
                      )}
                    </AutoLayout>
                  </AutoLayout>

                  {/* Actions Area (Clickable for Edit/Remove) */}
                  <AutoLayout direction="horizontal" spacing={8}>
                    <AutoLayout onClick={() => handleEditLink(idx)} padding={4} cornerRadius={4} hoverStyle={{ fill: '#3E3E3E' }}>
                      <SVG src={ICON_EDIT('#999999')} width={16} height={16} />
                    </AutoLayout>
                    {isCustom && (
                      <AutoLayout onClick={() => handleRemoveLink(idx)} padding={4} cornerRadius={4} hoverStyle={{ fill: '#3E3E3E' }}>
                        <SVG src={ICON_CLOSE('#999999')} width={16} height={16} />
                      </AutoLayout>
                    )}
                  </AutoLayout>
                </AutoLayout>

                {/* 2. Edit Form (Below Row) */}
                {isEditing && renderLinkForm(showNameInput)}

              </AutoLayout>
            );
          })}

          {isAddingLink ? (
            renderLinkForm(true) // Always show name input for new links
          ) : (
            <AutoLayout direction="horizontal" verticalAlignItems="center" spacing={8} onClick={handleOpenAddLink} padding={8} cornerRadius={8} hoverStyle={{ fill: COLORS.hoverBg }}>
              <SVG src={ICON_ADD(COLORS.linkPrimary)} width={16} height={16} />
              <Text fontSize={16} fill={COLORS.linkPrimary}>Add link</Text>
            </AutoLayout>
          )}

        </AutoLayout>
      </AutoLayout>

      <AutoLayout width="fill-parent" height={1} fill={COLORS.borderSubtle} />

      {/* DETAILS */}
      <AutoLayout direction="vertical" spacing={32}>
        <AutoLayout direction="vertical" spacing={16} width={612}>
          <Text fontSize={16} fill={COLORS.textSecondary} fontWeight={700}>PROBLEM STATEMENT</Text>
          <Input value={details.problemStatement || ''} placeholder="Add details..." fontSize={16} fill={COLORS.textPlaceholder} width="fill-parent" onTextEditEnd={(e) => handleUpdateDetail('problemStatement', e)} />
        </AutoLayout>
        <AutoLayout direction="vertical" spacing={16} width={612}>
          <Text fontSize={16} fill={COLORS.textSecondary} fontWeight={700}>WHO ARE WE SOLVING FOR?</Text>
          <Input value={details.personas || ''} placeholder="Add personas..." fontSize={16} fill={COLORS.textPlaceholder} width="fill-parent" onTextEditEnd={(e) => handleUpdateDetail('personas', e)} />
        </AutoLayout>
        <AutoLayout direction="vertical" spacing={16} width={612}>
          <Text fontSize={16} fill={COLORS.textSecondary} fontWeight={700}>ASSUMPTIONS</Text>
          <Input value={details.assumptions || ''} placeholder="Add assumptions..." fontSize={16} fill={COLORS.textPlaceholder} width="fill-parent" onTextEditEnd={(e) => handleUpdateDetail('assumptions', e)} />
        </AutoLayout>
      </AutoLayout>

      <AutoLayout width="fill-parent" height={1} fill={COLORS.borderSubtle} />

      {/* USE CASES */}
      <AutoLayout direction="vertical" spacing={12} width="fill-parent">
        <Text fontSize={16} fill={COLORS.textSecondary} fontWeight={700}>USE CASES</Text>
        <AutoLayout direction="vertical" width="fill-parent" cornerRadius={8} stroke={COLORS.border} strokeWidth={1}>
          <AutoLayout direction="horizontal" width="fill-parent" fill={COLORS.tableHeaderBg} height={40}>
            <AutoLayout padding={12} width="fill-parent"><Text fontSize={16} fontWeight={700} fill={COLORS.textSecondary}>Use case</Text></AutoLayout>
            <AutoLayout padding={12} width={169}><Text fontSize={16} fontWeight={700} fill={COLORS.textSecondary}>Section link</Text></AutoLayout>
            <AutoLayout padding={12} width={206}><Text fontSize={16} fontWeight={700} fill={COLORS.textSecondary}>Status</Text></AutoLayout>
            <AutoLayout padding={12} width={48} />
          </AutoLayout>
          <AutoLayout width="fill-parent" height={1} fill={COLORS.border} />
          {useCases.map((uc, idx) => {
            const isEditing = editingUseCaseIndex === idx;
            const isDone = uc.status === 'Done';

            return (
              <AutoLayout key={idx} direction="vertical" width="fill-parent">
                <AutoLayout direction="horizontal" width="fill-parent">
                  <AutoLayout padding={12} width="fill-parent">
                    <Input value={uc.title || ''} placeholder="Title..." fontSize={16} fill={COLORS.textPrimary} width="fill-parent" onTextEditEnd={(e) => handleUpdateUseCaseTitle(idx, e)} />
                  </AutoLayout>

                  {/* Refined Link Column: Input if Editing, else Check URL */}
                  <AutoLayout padding={12} width={169} direction="horizontal" spacing={8} verticalAlignItems="center">
                    {isEditing ? (
                      <AutoLayout width="fill-parent" direction="horizontal" spacing={4} verticalAlignItems="center">
                        <Input
                          value={uc.link || ''}
                          placeholder="Link URL"
                          fontSize={14}
                          fill={COLORS.textPrimary}
                          width="fill-parent"
                          height={28}
                          inputFrameProps={{ fill: '#333333', cornerRadius: 4, padding: 4 }}
                          onTextEditEnd={(e) => handleUpdateUseCaseLink(idx, e)}
                        />
                        {/* Tick Icon to Save */}
                        <AutoLayout onClick={() => handleEditUseCase(idx)} padding={4} cornerRadius={4} hoverStyle={{ fill: '#3E3E3E' }}>
                          <SVG src={ICON_DONE(COLORS.linkPrimary)} width={14} height={14} />
                        </AutoLayout>
                      </AutoLayout>
                    ) : (
                      <AutoLayout width="fill-parent" direction="horizontal" spacing={4} verticalAlignItems="center">
                        <Text
                          fontSize={16}
                          fill={uc.link ? COLORS.linkPrimary : COLORS.textPlaceholder}
                          fontWeight={400}
                          textDecoration={uc.link ? 'underline' : 'none'}
                          onClick={() => uc.link ? handleOpenUrl(uc.link) : handleEditUseCase(idx)}
                        >
                          {uc.link ? 'Go to' : 'Add URL'}
                        </Text>
                        {/* Edit Pencil Icon (Always Visible) */}
                        <AutoLayout onClick={() => handleEditUseCase(idx)} padding={4} cornerRadius={4} hoverStyle={{ fill: '#3E3E3E' }}>
                          <SVG src={ICON_EDIT(COLORS.textSecondary)} width={14} height={14} />
                        </AutoLayout>
                      </AutoLayout>
                    )}
                  </AutoLayout>

                  {/* Status Column */}
                  <AutoLayout padding={12} width={206} verticalAlignItems="center">
                    <AutoLayout
                      padding={{ vertical: 2, horizontal: 8 }}
                      fill={isDone ? COLORS.doneBg : COLORS.wipBg} // Green or Yellow
                      cornerRadius={4}
                      onClick={() => handleToggleUseCaseStatus(idx)} // Click to Toggle
                    >
                      <Text fontSize={14} fill={isDone ? COLORS.doneText : COLORS.wipText} fontWeight={600}>{uc.status || 'WIP'}</Text>
                    </AutoLayout>
                  </AutoLayout>

                  {/* Actions Column */}
                  <AutoLayout padding={12} width={48} verticalAlignItems="center" horizontalAlignItems="center" spacing={4}>
                    <AutoLayout onClick={() => handleRemoveUseCase(idx)} padding={4} cornerRadius={4} hoverStyle={{ fill: '#3E3E3E' }}>
                      <Text fontSize={16} fill={COLORS.textSecondary}>×</Text>
                    </AutoLayout>
                  </AutoLayout>
                </AutoLayout>
                {idx < useCases.length - 1 ? (
                  <AutoLayout width="fill-parent" height={1} fill={COLORS.border} />
                ) : null}
              </AutoLayout>
            );
          })}
        </AutoLayout>
        <AutoLayout direction="horizontal" verticalAlignItems="center" spacing={8} onClick={handleAddUseCase}>
          <SVG src={ICON_ADD(COLORS.linkPrimary)} width={16} height={16} />
          <Text fontSize={16} fill={COLORS.linkPrimary}>Add use case</Text>
        </AutoLayout>
      </AutoLayout>

      {/* FOOTER - LAST UPDATED */}
      <AutoLayout width="fill-parent" horizontalAlignItems="end">
        <Text fontSize={12} fill={COLORS.textSecondary}>Last updated on {formatDate(lastUpdated)}</Text>
      </AutoLayout>
    </AutoLayout>
  );
}

widget.register(ProjectDetailsWidget);