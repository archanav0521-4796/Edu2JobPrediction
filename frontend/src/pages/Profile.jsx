import React, { useState, useEffect } from 'react';
import API from '../services/api';
import SkillsSelector from '../components/SkillsSelector';
import CertificationsSelector from '../components/CertificationsSelector';
import Toast from '../components/Toast';
import { useAuth } from '../context/AuthContext';
import { User, Save, RefreshCw, GraduationCap, Building2, BookOpen, Briefcase, Link2, Pencil } from 'lucide-react';

const DEGREES = ['B.Tech', 'B.Sc', 'BCA', 'B.Com', 'M.Tech', 'M.Sc', 'MCA', 'MBA', 'Ph.D'];
const MAJORS = [
  'Computer Science', 'Software Engineering', 'Information Technology', 
  'Data Science', 'Artificial Intelligence', 'Cyber Security',
  'Electronics & Communication', 'Mechanical Engineering', 'Mathematics', 'Statistics'
];
const INDUSTRIES = [
  'IT & Software Services', 
  'Finance & FinTech', 
  'Healthcare & HealthTech', 
  'E-commerce & Retail', 
  'Consulting & Strategy', 
  'Education & EdTech', 
  'Automotive & Autonomous Systems', 
  'Aerospace & Defense', 
  'Energy & CleanTech', 
  'Telecommunications', 
  'Entertainment & Media', 
  'Biotechnology',
  'Manufacturing & Industrial',
  'Construction & Real Estate',
  'Agriculture & Food Technology',
  'Hospitality & Tourism',
  'Logistics & Supply Chain',
  'Legal Services',
  'Retail & FMCG',
  'Art, Design & Fashion',
  'Government & Public Administration',
  'Pharmaceuticals & Medical Devices',
  'Chemicals, Mining & Metals',
  'Oil, Gas & Energy Utilities',
  'Apparel & Textile Manufacturing',
  'Food & Beverage Production',
  'Aviation, Maritime & Logistics',
  'Human Resources & Recruitment',
  'Marketing, Advertising & PR',
  'Non-Profit, NGO & Social Work',
  'Media, Journalism & Publishing',
  'Environmental Conservation & Forestry',
  'Architecture, Design & Urban Planning',
  'Sports, Fitness & Wellness',
  'Academic Research & Education',
  'Banking, Insurance & Asset Management'
];
const CERTS_LIST = [
  'AWS Certified Solutions Architect',
  'Google Cloud Associate',
  'Microsoft Azure Fundamentals',
  'Oracle Java Certification',
  'Red Hat Certification',
  'Cisco CCNA',
  'Full Stack Web Development Certificate',
  'Data Science Certificate',
  'Six Sigma',
  'PMP',
  'None'
];

const Profile = () => {
  const { user: authUser } = useAuth();
  
  // Tabs: 'professional' or 'personal'
  const [activeTab, setActiveTab] = useState('professional');

  // Professional Details State
  const [degree, setDegree] = useState('');
  const [major, setMajor] = useState('');
  const [cgpa, setCgpa] = useState('');
  const [yearsOfExperience, setYearsOfExperience] = useState(0);
  const [industryPreference, setIndustryPreference] = useState('');
  const [skills, setSkills] = useState([]);
  const [certifications, setCertifications] = useState([]);
  
  // Personal Details State
  const [phoneNumber, setPhoneNumber] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [address, setAddress] = useState('');

  // 10th Grade
  const [schoolName10th, setSchoolName10th] = useState('');
  const [board10th, setBoard10th] = useState('');
  const [yearPassed10th, setYearPassed10th] = useState('');

  // 12th/Diploma
  const [schoolName12th, setSchoolName12th] = useState('');
  const [board12th, setBoard12th] = useState('');
  const [yearPassed12th, setYearPassed12th] = useState('');
  const [type12th, setType12th] = useState('12th');

  // Undergraduate
  const [universityNameUG, setUniversityNameUG] = useState('');
  const [yearPassedUG, setYearPassedUG] = useState('');

  // Employment
  const [employmentStatus, setEmploymentStatus] = useState('Unemployed');
  const [companyName, setCompanyName] = useState('');
  const [jobRole, setJobRole] = useState('');
  const [employmentExperience, setEmploymentExperience] = useState(0);

  // Links
  const [linkedinProfile, setLinkedinProfile] = useState('');
  const [githubProfile, setGithubProfile] = useState('');
  const [resumeLink, setResumeLink] = useState('');

  // Titles
  const [roleTitle, setRoleTitle] = useState('');
  const [companyTitle, setCompanyTitle] = useState('');

  const [isProfessionalEditable, setIsProfessionalEditable] = useState(false);
  const [isPersonalEditable, setIsPersonalEditable] = useState(false);
  const [profilePicture, setProfilePicture] = useState('');

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 1024 * 1024) {
        setToastMessage('Image size must be less than 1MB');
        setToastType('error');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result);
        setToastMessage('Image uploaded successfully! Click Save to apply changes.');
        setToastType('success');
      };
      reader.readAsDataURL(file);
    }
  };

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState({});
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');

  const fetchProfile = async () => {
    try {
      const response = await API.get('/profile');
      const data = response.data;
      
      setDegree(data.degree || '');
      setMajor(data.major || '');
      setCgpa(data.cgpa !== null ? data.cgpa.toString() : '');
      setYearsOfExperience(data.yearsOfExperience || 0);
      setIndustryPreference(data.industryPreference || '');
      setSkills(data.skills || []);
      
      // Load certifications
      setCertifications(data.certifications || []);
      setProfilePicture(data.profilePicture || '');

      // Personal Info
      setPhoneNumber(data.phoneNumber || '');
      setAge(data.age !== null ? data.age.toString() : '');
      setGender(data.gender || '');
      setAddress(data.address || '');

      // 10th
      setSchoolName10th(data.schoolName10th || '');
      setBoard10th(data.board10th || '');
      setYearPassed10th(data.yearPassed10th !== null ? data.yearPassed10th.toString() : '');

      // 12th
      setSchoolName12th(data.schoolName12th || '');
      setBoard12th(data.board12th || '');
      setYearPassed12th(data.yearPassed12th !== null ? data.yearPassed12th.toString() : '');
      setType12th(data.type12th || '12th');

      // UG
      setUniversityNameUG(data.universityNameUG || '');
      setYearPassedUG(data.yearPassedUG !== null ? data.yearPassedUG.toString() : '');

      // Employment
      setEmploymentStatus(data.employmentStatus || 'Unemployed');
      setCompanyName(data.companyName || '');
      setJobRole(data.jobRole || '');
      setEmploymentExperience(data.employmentExperience || 0);

      // Links
      setLinkedinProfile(data.linkedinProfile || '');
      setGithubProfile(data.githubProfile || '');
      setResumeLink(data.resumeLink || '');

      // Titles
      setRoleTitle(data.roleTitle || '');
      setCompanyTitle(data.companyTitle || '');

      // Auto-unlock fields if they are completely empty (so user can fill them in for the first time without clicking edit)
      if (!data.degree && !data.major && !data.industryPreference && (!data.skills || data.skills.length === 0)) {
        setIsProfessionalEditable(true);
      } else {
        setIsProfessionalEditable(false);
      }

      if (!data.phoneNumber && !data.address && !data.schoolName10th && !data.universityNameUG) {
        setIsPersonalEditable(true);
      } else {
        setIsPersonalEditable(false);
      }
    } catch (error) {
      setToastMessage('Failed to load profile details');
      setToastType('error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const validate = () => {
    const tempErrors = {};
    if (activeTab === 'professional') {
      if (!degree) tempErrors.degree = 'Degree is required';
      if (!major) tempErrors.major = 'Major is required';
      
      const parsedCgpa = parseFloat(cgpa);
      if (!cgpa) {
        tempErrors.cgpa = 'CGPA is required';
      } else if (isNaN(parsedCgpa) || parsedCgpa < 0 || parsedCgpa > 10.0) {
        tempErrors.cgpa = 'CGPA must be between 0.0 and 10.0';
      }
      if (!industryPreference) tempErrors.industryPreference = 'Industry preference is required';
    } else {
      // Personal validations
      if (age) {
        const parsedAge = parseInt(age);
        if (isNaN(parsedAge) || parsedAge <= 0) {
          tempErrors.age = 'Age must be a valid number';
        }
      }
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSaving(true);
    try {
      const payload = {
        degree,
        major,
        cgpa: cgpa ? parseFloat(cgpa) : null,
        yearsOfExperience: parseInt(yearsOfExperience) || 0,
        industryPreference,
        skills,
        certifications,
        profilePicture,

        phoneNumber,
        age: age ? parseInt(age) : null,
        gender,
        address,

        schoolName10th,
        board10th,
        yearPassed10th: yearPassed10th ? parseInt(yearPassed10th) : null,

        schoolName12th,
        board12th,
        yearPassed12th: yearPassed12th ? parseInt(yearPassed12th) : null,
        type12th,

        universityNameUG,
        yearPassedUG: yearPassedUG ? parseInt(yearPassedUG) : null,

        employmentStatus,
        companyName,
        jobRole,
        employmentExperience: parseInt(employmentExperience) || 0,

        linkedinProfile,
        githubProfile,
        resumeLink,

        roleTitle,
        companyTitle
      };

      await API.put('/profile', payload);
      setToastMessage('Profile updated successfully!');
      setToastType('success');
      setIsProfessionalEditable(false);
      setIsPersonalEditable(false);
      fetchProfile(); // Reload data
    } catch (error) {
      setToastMessage('Failed to save profile changes.');
      setToastType('error');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-purple-200 border-t-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 w-full animate-fade-in">
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        
        {/* Left Panel: Profile Summary Card */}
        <div className="w-full lg:w-1/3 space-y-6">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-md relative overflow-hidden text-center">
            {/* Avatar Circle */}
            <div className="mx-auto h-20 w-20 rounded-full border-4 border-purple-100 flex items-center justify-center mb-4 shadow-inner relative overflow-hidden bg-purple-600 text-white text-3xl font-bold group">
              {profilePicture ? (
                <img 
                  src={profilePicture} 
                  alt="Profile" 
                  className="h-full w-full object-cover" 
                />
              ) : (
                authUser?.fullName?.charAt(0).toUpperCase()
              )}
              
              {/* Profile picture overlay for upload */}
              {(isProfessionalEditable || isPersonalEditable) && (
                <label className="absolute inset-0 bg-black/50 flex items-center justify-center cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-[10px] font-bold text-white uppercase tracking-wider">Upload</span>
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleImageUpload} 
                    className="hidden" 
                  />
                </label>
              )}
            </div>
            
            {/* Name & Details */}
            <h2 className="text-xl font-bold text-slate-800 uppercase">{authUser?.fullName}</h2>
            <p className="text-slate-400 text-xs mt-0.5">{authUser?.email}</p>
            
            {roleTitle && (
              <span className="text-[10px] font-bold tracking-wider text-purple-700 bg-purple-50 px-3 py-1 rounded-full border border-purple-100 mt-3 inline-block uppercase">
                {roleTitle} {companyTitle ? `@ ${companyTitle}` : ''}
              </span>
            )}

            {/* Counts metrics */}
            <div className="grid grid-cols-3 gap-2 border-t border-slate-100 pt-5 mt-5">
              <div>
                <span className="text-xl font-extrabold text-slate-700 block">{skills.length}</span>
                <span className="text-[9px] font-semibold text-slate-400 uppercase tracking-wider block">Skills</span>
              </div>
              <div className="border-x border-slate-100">
                <span className="text-xl font-extrabold text-slate-700 block">{yearsOfExperience}</span>
                <span className="text-[9px] font-semibold text-slate-400 uppercase tracking-wider block">Years Exp</span>
              </div>
              <div>
                <span className="text-xl font-extrabold text-slate-700 block">{certifications.length}</span>
                <span className="text-[9px] font-semibold text-slate-400 uppercase tracking-wider block">Certs</span>
              </div>
            </div>

            {/* Sidebar Tabs Selectors */}
            <div className="flex flex-col gap-2.5 mt-6 border-t border-slate-100 pt-5">
              <button
                type="button"
                onClick={() => setActiveTab('professional')}
                className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold text-left transition-all ${
                  activeTab === 'professional' 
                    ? 'bg-purple-600 text-white shadow-md shadow-purple-600/10' 
                    : 'bg-slate-50 text-slate-500 hover:bg-slate-100'
                }`}
              >
                Prediction Required Details
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('personal')}
                className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold text-left transition-all ${
                  activeTab === 'personal' 
                    ? 'bg-purple-600 text-white shadow-md shadow-purple-600/10' 
                    : 'bg-slate-50 text-slate-500 hover:bg-slate-100'
                }`}
              >
                Personal Details
              </button>
            </div>

            {/* Quick Information */}
            <div className="mt-6 border-t border-slate-100 pt-5 text-left bg-slate-50/50 p-4 rounded-2xl border border-slate-100">
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Quick Information</h4>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between border-b border-slate-100 pb-1.5">
                  <span className="text-slate-400">Degree</span>
                  <span className="font-bold text-slate-700">{degree || 'Not specified'}</span>
                </div>
                <div className="flex justify-between border-b border-slate-100 pb-1.5">
                  <span className="text-slate-400">Major</span>
                  <span className="font-bold text-slate-700">{major || 'Not specified'}</span>
                </div>
                <div className="flex justify-between border-b border-slate-100 pb-1.5">
                  <span className="text-slate-400">CGPA</span>
                  <span className="font-bold text-slate-700">{cgpa ? parseFloat(cgpa).toFixed(2) : 'Not specified'}</span>
                </div>
                <div className="flex justify-between border-b border-slate-100 pb-1.5">
                  <span className="text-slate-400">Industry Preference</span>
                  <span className="font-bold text-slate-700">{industryPreference || 'Not specified'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Certified</span>
                  <span className="font-bold text-slate-700 truncate max-w-[150px]" title={certifications.join(', ') || 'None'}>
                    {certifications[0] || 'None'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel: Form Fields Content */}
        <div className="w-full lg:w-2/3">
          <form onSubmit={handleSave} className="space-y-6">
            
            {/* If tab is 'professional' */}
            {activeTab === 'professional' && (
              <div className="glass-card p-6 sm:p-8 rounded-3xl space-y-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-bold text-slate-800">Professional Details</h2>
                    <p className="text-xs text-slate-400 mt-1">Manage your professional information and skills</p>
                  </div>
                  {!isProfessionalEditable && (
                    <button
                      type="button"
                      onClick={() => setIsProfessionalEditable(true)}
                      className="flex items-center gap-1 bg-purple-50 hover:bg-purple-100 text-purple-700 font-bold py-1.5 px-3 rounded-xl text-[10px] transition-all border border-purple-100 uppercase"
                    >
                      <Pencil className="h-3 w-3" />
                      Edit Details
                    </button>
                  )}
                </div>

                <fieldset disabled={!isProfessionalEditable} className="space-y-6 w-full border-none p-0 m-0">

                <div className="space-y-5">
                  <h3 className="text-sm font-bold text-purple-700 border-b border-slate-100 pb-2">Education & Experience</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Degree */}
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Degree</label>
                      <select
                        value={degree}
                        onChange={(e) => setDegree(e.target.value)}
                        className="w-full rounded-xl border border-slate-200 bg-white p-3 text-xs focus:outline-none focus:ring-2 focus:ring-purple-200"
                      >
                        <option value="">Select Degree</option>
                        {DEGREES.map(deg => <option key={deg} value={deg}>{deg}</option>)}
                      </select>
                    </div>

                    {/* Major */}
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Major</label>
                      <select
                        value={major}
                        onChange={(e) => setMajor(e.target.value)}
                        className="w-full rounded-xl border border-slate-200 bg-white p-3 text-xs focus:outline-none focus:ring-2 focus:ring-purple-200"
                      >
                        <option value="">Select Major</option>
                        {MAJORS.map(m => <option key={m} value={m}>{m}</option>)}
                      </select>
                    </div>

                    {/* CGPA */}
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">CGPA</label>
                      <input
                        type="number"
                        step="0.01"
                        value={cgpa}
                        onChange={(e) => setCgpa(e.target.value)}
                        className="w-full rounded-xl border border-slate-200 bg-white p-3 text-xs focus:outline-none focus:ring-2 focus:ring-purple-200"
                        placeholder="e.g. 9.1"
                      />
                    </div>

                    {/* Experience */}
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Experience (Years)</label>
                      <input
                        type="number"
                        min="0"
                        value={yearsOfExperience}
                        onChange={(e) => setYearsOfExperience(Math.max(0, parseInt(e.target.value) || 0))}
                        className="w-full rounded-xl border border-slate-200 bg-white p-3 text-xs focus:outline-none focus:ring-2 focus:ring-purple-200"
                        placeholder="e.g. 1"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-5 pt-4">
                  <h3 className="text-sm font-bold text-purple-700 border-b border-slate-100 pb-2">Skills & Preferences</h3>
                  
                  <div className="space-y-4">
                    {/* SkillsSelector */}
                    <SkillsSelector selectedSkills={skills} onChange={setSkills} disabled={!isProfessionalEditable} />

                    {/* Certifications Dropdown */}
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Certification</label>
                      <select
                        value={certifications[0] || ''}
                        onChange={(e) => setCertifications(e.target.value ? [e.target.value] : [])}
                        className="w-full rounded-xl border border-slate-200 bg-white p-3.5 text-xs focus:outline-none focus:ring-2 focus:ring-purple-200"
                      >
                        <option value="">Select Certification</option>
                        {CERTS_LIST.map(cert => <option key={cert} value={cert}>{cert}</option>)}
                      </select>
                    </div>

                    {/* Industry Preference */}
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Industry Preference</label>
                      <select
                        value={industryPreference}
                        onChange={(e) => setIndustryPreference(e.target.value)}
                        className="w-full rounded-xl border border-slate-200 bg-white p-3.5 text-xs focus:outline-none focus:ring-2 focus:ring-purple-200"
                      >
                        <option value="">Select Industry</option>
                        {INDUSTRIES.map(ind => <option key={ind} value={ind}>{ind}</option>)}
                      </select>
                    </div>

                    {/* Title Header settings (Not in main form but nice customization) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Custom Header Role Title</label>
                        <input
                          type="text"
                          value={roleTitle}
                          onChange={(e) => setRoleTitle(e.target.value)}
                          className="w-full rounded-xl border border-slate-200 bg-white p-3 text-xs focus:outline-none focus:ring-2 focus:ring-purple-200"
                          placeholder="e.g. Machine Learning Trainee"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Custom Header Company Title</label>
                        <input
                          type="text"
                          value={companyTitle}
                          onChange={(e) => setCompanyTitle(e.target.value)}
                          className="w-full rounded-xl border border-slate-200 bg-white p-3 text-xs focus:outline-none focus:ring-2 focus:ring-purple-200"
                          placeholder="e.g. Infosys Spring Board"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                </fieldset>
              </div>
            )}

            {/* If tab is 'personal' */}
            {activeTab === 'personal' && (
              <div className="glass-card p-6 sm:p-8 rounded-3xl space-y-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-bold text-slate-800">Personal Details</h2>
                    <p className="text-xs text-slate-400 mt-1">Update your personal information and background</p>
                  </div>
                  {!isPersonalEditable && (
                    <button
                      type="button"
                      onClick={() => setIsPersonalEditable(true)}
                      className="flex items-center gap-1 bg-purple-50 hover:bg-purple-100 text-purple-700 font-bold py-1.5 px-3 rounded-xl text-[10px] transition-all border border-purple-100 uppercase"
                    >
                      <Pencil className="h-3 w-3" />
                      Edit Details
                    </button>
                  )}
                </div>

                <fieldset disabled={!isPersonalEditable} className="space-y-6 w-full border-none p-0 m-0">

                {/* Section A: Account Information */}
                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-purple-700 border-b border-slate-100 pb-2">Account Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Username</label>
                      <input
                        type="text"
                        value={authUser?.fullName || ''}
                        disabled
                        className="w-full rounded-xl border border-slate-100 bg-slate-50 p-3 text-xs font-medium text-slate-500 cursor-not-allowed"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Email</label>
                      <input
                        type="email"
                        value={authUser?.email || ''}
                        disabled
                        className="w-full rounded-xl border border-slate-100 bg-slate-50 p-3 text-xs font-medium text-slate-500 cursor-not-allowed"
                      />
                    </div>
                  </div>
                </div>

                {/* Section B: Personal Details */}
                <div className="space-y-4 pt-4">
                  <h3 className="text-sm font-bold text-purple-700 border-b border-slate-100 pb-2">Personal Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Phone Number</label>
                      <input
                        type="text"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className="w-full rounded-xl border border-slate-200 bg-white p-3 text-xs focus:outline-none focus:ring-2 focus:ring-purple-200"
                        placeholder="e.g. 9876543210"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Age</label>
                      <input
                        type="number"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        className="w-full rounded-xl border border-slate-200 bg-white p-3 text-xs focus:outline-none focus:ring-2 focus:ring-purple-200"
                        placeholder="e.g. 21"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Gender</label>
                      <select
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        className="w-full rounded-xl border border-slate-200 bg-white p-3 text-xs focus:outline-none focus:ring-2 focus:ring-purple-200"
                      >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Address</label>
                    <textarea
                      rows="2"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-white p-3 text-xs focus:outline-none focus:ring-2 focus:ring-purple-200"
                      placeholder="Enter full address"
                    />
                  </div>
                </div>

                {/* Section C: Educational Details */}
                <div className="space-y-4 pt-4">
                  <h3 className="text-sm font-bold text-purple-700 border-b border-slate-100 pb-2">Educational Details</h3>
                  
                  {/* 10th Grade */}
                  <div className="space-y-2">
                    <span className="text-xs font-bold text-slate-600 block">10th Grade</span>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <input
                        type="text"
                        value={schoolName10th}
                        onChange={(e) => setSchoolName10th(e.target.value)}
                        className="w-full rounded-xl border border-slate-200 bg-white p-2.5 text-xs"
                        placeholder="School Name"
                      />
                      <input
                        type="text"
                        value={board10th}
                        onChange={(e) => setBoard10th(e.target.value)}
                        className="w-full rounded-xl border border-slate-200 bg-white p-2.5 text-xs"
                        placeholder="Board (e.g. SSC)"
                      />
                      <input
                        type="number"
                        value={yearPassed10th}
                        onChange={(e) => setYearPassed10th(e.target.value)}
                        className="w-full rounded-xl border border-slate-200 bg-white p-2.5 text-xs"
                        placeholder="Year Passed Out"
                      />
                    </div>
                  </div>

                  {/* 12th / Diploma */}
                  <div className="space-y-2 pt-2">
                    <span className="text-xs font-bold text-slate-600 block">12th/Diploma</span>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <select
                        value={type12th}
                        onChange={(e) => setType12th(e.target.value)}
                        className="w-full rounded-xl border border-slate-200 bg-white p-2.5 text-xs"
                      >
                        <option value="12th">12th</option>
                        <option value="Diploma">Diploma</option>
                      </select>
                      <input
                        type="text"
                        value={schoolName12th}
                        onChange={(e) => setSchoolName12th(e.target.value)}
                        className="w-full rounded-xl border border-slate-200 bg-white p-2.5 text-xs col-span-1 md:col-span-2"
                        placeholder="School/College Name"
                      />
                      <input
                        type="number"
                        value={yearPassed12th}
                        onChange={(e) => setYearPassed12th(e.target.value)}
                        className="w-full rounded-xl border border-slate-200 bg-white p-2.5 text-xs"
                        placeholder="Year Passed Out"
                      />
                    </div>
                  </div>

                  {/* Undergraduate Details */}
                  <div className="space-y-2 pt-2">
                    <span className="text-xs font-bold text-slate-600 block">Undergraduate Details</span>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input
                        type="text"
                        value={universityNameUG}
                        onChange={(e) => setUniversityNameUG(e.target.value)}
                        className="w-full rounded-xl border border-slate-200 bg-white p-2.5 text-xs"
                        placeholder="University Name (e.g. VIT)"
                      />
                      <input
                        type="number"
                        value={yearPassedUG}
                        onChange={(e) => setYearPassedUG(e.target.value)}
                        className="w-full rounded-xl border border-slate-200 bg-white p-2.5 text-xs"
                        placeholder="Graduation Year"
                      />
                    </div>
                  </div>
                </div>

                {/* Section D: Employment Details */}
                <div className="space-y-4 pt-4">
                  <h3 className="text-sm font-bold text-purple-700 border-b border-slate-100 pb-2">Employment Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Employment Status</label>
                      <select
                        value={employmentStatus}
                        onChange={(e) => {
                          const status = e.target.value;
                          setEmploymentStatus(status);
                          if (status === 'Unemployed') {
                            setCompanyName('');
                            setJobRole('');
                            setEmploymentExperience(0);
                          }
                        }}
                        className="w-full rounded-xl border border-slate-200 bg-white p-3 text-xs focus:outline-none focus:ring-2 focus:ring-purple-200"
                      >
                        <option value="Unemployed">Unemployed</option>
                        <option value="Employed">Employed</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Company Name</label>
                      {employmentStatus === 'Unemployed' ? (
                        <select
                          value={companyName}
                          onChange={(e) => setCompanyName(e.target.value)}
                          className="w-full rounded-xl border border-slate-200 bg-white p-3 text-xs focus:outline-none focus:ring-2 focus:ring-purple-200"
                        >
                          <option value="">NULL</option>
                        </select>
                      ) : (
                        <input
                          type="text"
                          value={companyName}
                          onChange={(e) => setCompanyName(e.target.value)}
                          className="w-full rounded-xl border border-slate-200 bg-white p-3 text-xs focus:outline-none"
                          placeholder="e.g. Infosys Spring Board"
                        />
                      )}
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Job Role</label>
                      <input
                        type="text"
                        value={jobRole}
                        onChange={(e) => setJobRole(e.target.value)}
                        className="w-full rounded-xl border border-slate-200 bg-white p-3 text-xs"
                        placeholder="e.g. Machine learning trainee"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Experience (Years)</label>
                      <input
                        type="number"
                        min="0"
                        value={employmentExperience}
                        onChange={(e) => setEmploymentExperience(Math.max(0, parseInt(e.target.value) || 0))}
                        className="w-full rounded-xl border border-slate-200 bg-white p-3 text-xs"
                        placeholder="e.g. 1"
                      />
                    </div>
                  </div>
                </div>

                {/* Section E: Additional Details */}
                <div className="space-y-4 pt-4">
                  <h3 className="text-sm font-bold text-purple-700 border-b border-slate-100 pb-2">Additional Details</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">LinkedIn Profile</label>
                      <input
                        type="text"
                        value={linkedinProfile}
                        onChange={(e) => setLinkedinProfile(e.target.value)}
                        className="w-full rounded-xl border border-slate-200 bg-white p-2.5 text-xs"
                        placeholder="LinkedIn Profile URL"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">GitHub Profile</label>
                      <input
                        type="text"
                        value={githubProfile}
                        onChange={(e) => setGithubProfile(e.target.value)}
                        className="w-full rounded-xl border border-slate-200 bg-white p-2.5 text-xs"
                        placeholder="GitHub Profile URL"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Resume Link</label>
                      <input
                        type="text"
                        value={resumeLink}
                        onChange={(e) => setResumeLink(e.target.value)}
                        className="w-full rounded-xl border border-slate-200 bg-white p-2.5 text-xs"
                        placeholder="Resume Link URL"
                      />
                    </div>
                  </div>
                </div>
                </fieldset>
              </div>
            )}

            {/* Save Buttons */}
            <div className="flex justify-end pt-2">
              <button
                type="submit"
                disabled={saving || (!isProfessionalEditable && !isPersonalEditable)}
                className="flex items-center gap-1.5 bg-purple-600 hover:bg-purple-700 text-white font-bold py-3.5 px-10 rounded-2xl shadow-lg shadow-purple-600/10 active:scale-98 transition-all disabled:opacity-50 text-xs uppercase tracking-wider"
              >
                {saving ? (
                  <>
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4" />
                    Save
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

      </div>



      {toastMessage && (
        <Toast 
          message={toastMessage} 
          type={toastType} 
          onClose={() => setToastMessage('')} 
        />
      )}
    </div>
  );
};

export default Profile;
