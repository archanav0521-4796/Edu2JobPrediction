import React, { useState, useRef, useEffect } from 'react';
import { Search, Plus, X } from 'lucide-react';

const DEFAULT_CERTS = [
  'AWS Certified Solutions Architect',
  'Google Cloud Associate',
  'Microsoft Azure Fundamentals',
  'Oracle Java Certification',
  'Red Hat Certification',
  'Cisco CCNA'
];

const CertificationsSelector = ({ selectedCerts = [], onChange }) => {
  const [search, setSearch] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const addCert = (cert) => {
    if (!selectedCerts.includes(cert)) {
      const updated = [...selectedCerts, cert];
      onChange(updated);
    }
    setSearch('');
  };

  const removeCert = (certToRemove) => {
    const updated = selectedCerts.filter(c => c !== certToRemove);
    onChange(updated);
  };

  const handleAddNewCert = () => {
    const cleanSearch = search.trim();
    if (cleanSearch && !selectedCerts.some(c => c.toLowerCase() === cleanSearch.toLowerCase())) {
      const updated = [...selectedCerts, cleanSearch];
      onChange(updated);
    }
    setSearch('');
  };

  const filteredCerts = DEFAULT_CERTS.filter(cert => 
    cert.toLowerCase().includes(search.toLowerCase()) && 
    !selectedCerts.includes(cert)
  );

  return (
    <div className="relative w-full text-left" ref={dropdownRef}>
      <label className="block text-sm font-semibold text-slate-700 mb-1.5">
        Certifications
      </label>

      {/* Selected tags display */}
      <div 
        onClick={() => setIsOpen(true)}
        className="min-h-12 w-full flex flex-wrap gap-1.5 p-2 rounded-xl border border-slate-200 bg-white shadow-sm cursor-text focus-within:border-purple-500 focus-within:ring-2 focus-within:ring-purple-200 transition-all"
      >
        {selectedCerts.length === 0 ? (
          <span className="text-slate-400 text-sm self-center px-1">Select certifications or type to add...</span>
        ) : (
          selectedCerts.map(cert => (
            <span 
              key={cert} 
              className="inline-flex items-center gap-1 bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold px-2.5 py-1 rounded-lg"
            >
              {cert}
              <button 
                type="button" 
                onClick={(e) => {
                  e.stopPropagation();
                  removeCert(cert);
                }} 
                className="text-indigo-500 hover:text-indigo-700 hover:bg-indigo-100/50 rounded p-0.5 transition-colors"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          ))
        )}
      </div>

      {/* Search dropdown menu */}
      {isOpen && (
        <div className="absolute z-50 mt-1.5 w-full bg-white border border-slate-200 rounded-xl shadow-xl p-2 animate-fade-in">
          <div className="relative flex items-center border-b border-slate-100 pb-2 mb-2">
            <Search className="absolute left-2.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search certifications..."
              className="w-full pl-9 pr-4 py-1.5 text-sm rounded-lg border border-slate-200 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
            />
          </div>

          <div className="max-h-48 overflow-y-auto flex flex-col gap-0.5">
            {filteredCerts.map(cert => (
              <button
                type="button"
                key={cert}
                onClick={() => addCert(cert)}
                className="text-left px-3 py-2 text-sm text-slate-700 hover:bg-indigo-50 hover:text-indigo-700 rounded-lg transition-colors font-medium"
              >
                {cert}
              </button>
            ))}

            {search && !DEFAULT_CERTS.some(c => c.toLowerCase() === search.trim().toLowerCase()) && (
              <button
                type="button"
                onClick={handleAddNewCert}
                className="flex items-center gap-1.5 text-left px-3 py-2 text-sm text-indigo-700 hover:bg-indigo-50 rounded-lg transition-colors font-semibold"
              >
                <Plus className="h-4 w-4" />
                Add Custom: "{search.trim()}"
              </button>
            )}

            {filteredCerts.length === 0 && !search && (
              <span className="text-center text-xs text-slate-400 py-4">All standard certifications selected</span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CertificationsSelector;
