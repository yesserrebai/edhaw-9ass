export const LightSwitchOn = ({ size = 24, className = "" }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 100 140" 
    className={className}
  >
    <rect x="10" y="10" width="80" height="120" rx="8" ry="8" fill="#e5e7eb" stroke="#9ca3af" strokeWidth="1"/>
    
    <circle cx="20" cy="20" r="2" fill="#9ca3af"/>
    <circle cx="80" cy="20" r="2" fill="#9ca3af"/>
    <circle cx="20" cy="120" r="2" fill="#9ca3af"/>
    <circle cx="80" cy="120" r="2" fill="#9ca3af"/>
    
    <rect x="25" y="40" width="50" height="60" rx="4" ry="4" fill="#d1d5db" stroke="#6b7280" strokeWidth="1"/>
    
    <rect x="30" y="45" width="40" height="25" rx="2" ry="2" fill="#9ca3af" stroke="#6b7280" strokeWidth="1"/>
    <rect x="32" y="47" width="36" height="21" rx="1" ry="1" fill="#d1d5db"/>
    <rect x="30" y="68" width="40" height="2" fill="#6b7280"/>
  </svg>
);

export const LightSwitchOff = ({ size = 24, className = "" }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 100 140" 
    className={className}
  >
    <rect x="10" y="10" width="80" height="120" rx="8" ry="8" fill="#f8f9fa" stroke="#d6d9dc" strokeWidth="1"/>
    
    <circle cx="20" cy="20" r="2" fill="#9ca3af"/>
    <circle cx="80" cy="20" r="2" fill="#9ca3af"/>
    <circle cx="20" cy="120" r="2" fill="#9ca3af"/>
    <circle cx="80" cy="120" r="2" fill="#9ca3af"/>
    
    <rect x="25" y="40" width="50" height="60" rx="4" ry="4" fill="#ffffff" stroke="#bcc1c6" strokeWidth="1"/>
    
    <rect x="30" y="75" width="40" height="25" rx="2" ry="2" fill="#e9ecef" stroke="#adb5bd" strokeWidth="1"/>
    <rect x="32" y="77" width="36" height="21" rx="1" ry="1" fill="#f1f3f4"/>
    <rect x="30" y="72" width="40" height="2" fill="#ced4da"/>
  </svg>
);