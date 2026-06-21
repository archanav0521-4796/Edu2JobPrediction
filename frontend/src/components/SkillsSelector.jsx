import React, { useState, useRef, useEffect } from 'react';
import { Search, Plus, X, ChevronDown } from 'lucide-react';

const DEFAULT_SKILLS = [
  // Programming & Languages
  'Java', 'Python', 'C', 'C++', 'JavaScript', 'TypeScript', 'Kotlin', 'Swift', 'Go', 'Rust', 'Ruby', 'PHP',
  // Frontend & Design
  'React', 'Angular', 'Vue.js', 'Next.js', 'Tailwind CSS', 'HTML', 'CSS', 'Figma', 'UI/UX Design',
  // Backend & Microservices
  'Spring Boot', 'Node.js', 'Express.js', 'Django', 'FastAPI', 'GraphQL',
  // Databases & Storage
  'SQL', 'MySQL', 'PostgreSQL', 'MongoDB', 'Redis', 'Firebase', 'Elasticsearch',
  // AI, ML & Data Science
  'Machine Learning', 'Data Analysis', 'Artificial Intelligence', 'Deep Learning', 'TensorFlow', 'PyTorch', 'Natural Language Processing (NLP)', 'Computer Vision', 'Statistics',
  // Cloud, DevOps & Infrastructure
  'Cloud Computing', 'AWS', 'Google Cloud (GCP)', 'Microsoft Azure', 'Docker', 'Kubernetes', 'CI/CD Pipelines', 'Git', 'Terraform',
  // Testing & Agile
  'Selenium', 'QA Automation', 'Jira', 'Agile Methodology',
  // Business & Non-IT Engineering
  'Accounting', 'Financial Modeling', 'Risk Analysis', 'AutoCAD', 'Circuit Design', 'SolidWorks', 'Thermodynamics', 'VHDL'
];

const SkillsSelector = ({ selectedSkills = [], onChange, disabled = false }) => {
  const [search, setSearch] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const toggleSkill = (skill) => {
    if (selectedSkills.includes(skill)) {
      onChange(selectedSkills.filter(s => s !== skill));
    } else {
      onChange([...selectedSkills, skill]);
    }
  };

  const removeSkill = (skillToRemove) => {
    onChange(selectedSkills.filter(s => s !== skillToRemove));
  };

  const handleAddNewSkill = () => {
    const cleanSearch = search.trim();
    if (cleanSearch && !selectedSkills.some(s => s.toLowerCase() === cleanSearch.toLowerCase())) {
      onChange([...selectedSkills, cleanSearch]);
    }
    setSearch('');
  };

  const filteredSkills = DEFAULT_SKILLS.filter(skill => 
    skill.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="relative w-full text-left" ref={dropdownRef}>
      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
        Skills
      </label>

      {/* Dropdown Display Button */}
      <button
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-xs shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-200 transition-all text-slate-700 ${
          disabled ? 'opacity-70 bg-slate-50/50 cursor-not-allowed' : ''
        }`}
      >
        <span>
          {selectedSkills.length === 0 
            ? 'Select skills' 
            : `${selectedSkills.length} skill${selectedSkills.length > 1 ? 's' : ''} selected`}
        </span>
        <span className="text-slate-500 text-[10px]">
          {isOpen ? '▲' : '▼'}
        </span>
      </button>

      {/* Search dropdown menu */}
      {isOpen && (
        <div className="absolute z-50 mt-1.5 w-full bg-white border border-slate-200 rounded-xl shadow-xl p-2.5 animate-fade-in">
          <div className="relative flex items-center border-b border-slate-100 pb-2 mb-2">
            <Search className="absolute left-2.5 h-3.5 w-3.5 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search skills..."
              className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
            />
          </div>

          <div className="max-h-48 overflow-y-auto flex flex-col gap-0.5 pr-1">
            {filteredSkills.map(skill => {
              const isSelected = selectedSkills.includes(skill);
              return (
                <div
                  key={skill}
                  onClick={() => toggleSkill(skill)}
                  className="flex items-center gap-2.5 px-3 py-2 text-xs text-slate-700 hover:bg-slate-50 rounded-lg cursor-pointer transition-colors font-medium"
                >
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => {}} // toggled by parent div click
                    className="rounded border-slate-300 text-purple-600 focus:ring-purple-500 h-3.5 w-3.5"
                  />
                  <span>{skill}</span>
                </div>
              );
            })}

            {search && !DEFAULT_SKILLS.some(s => s.toLowerCase() === search.trim().toLowerCase()) && (
              <button
                type="button"
                onClick={handleAddNewSkill}
                className="flex items-center gap-1.5 text-left px-3 py-2 text-xs text-purple-700 hover:bg-purple-50 rounded-lg transition-colors font-semibold"
              >
                <Plus className="h-3.5 w-3.5" />
                Add Custom: "{search.trim()}"
              </button>
            )}

            {filteredSkills.length === 0 && !search && (
              <span className="text-center text-xs text-slate-400 py-4">No skills match search</span>
            )}
          </div>
        </div>
      )}

      {/* Selected tags display underneath */}
      {selectedSkills.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-2.5">
          {selectedSkills.map(skill => (
            <span 
              key={skill} 
              className="inline-flex items-center gap-1 bg-sky-50 border border-sky-100 text-sky-700 text-xs font-semibold px-2.5 py-1 rounded-lg"
            >
              {skill}
              {!disabled && (
                <button 
                  type="button" 
                  onClick={() => removeSkill(skill)} 
                  className="text-sky-500 hover:text-sky-700 hover:bg-sky-100 rounded p-0.5 transition-colors"
                >
                  <X className="h-3 w-3" />
                </button>
              )}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default SkillsSelector;
