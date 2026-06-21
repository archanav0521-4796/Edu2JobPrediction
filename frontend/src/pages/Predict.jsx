import React, { useState, useEffect } from 'react';
import API from '../services/api';
import SkillsSelector from '../components/SkillsSelector';
import Toast from '../components/Toast';
import { Brain, RefreshCw, GraduationCap, Briefcase, Award, ArrowRight, CheckCircle2, Pencil } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const DEGREES = ['B.Tech', 'B.Sc', 'BCA', 'B.Com', 'M.Tech', 'M.Sc', 'MCA', 'MBA', 'Ph.D', 'MBBS', 'Diploma', 'BA', 'B.Ed'];
const MAJORS = [
  'Computer Science', 'Software Engineering', 'Information Technology', 
  'Data Science', 'Artificial Intelligence', 'Cyber Security',
  'Electronics & Communication', 'Mechanical', 'Civil', 'Electrical',
  'Mathematics', 'Statistics', 'Marketing', 'Finance', 'Human Resources', 'Economics'
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
  'AWS Certified Solutions Architect - Associate',
  'AWS Certified Developer - Associate',
  'Microsoft Certified: Azure Administrator Associate',
  'Microsoft Certified: Azure Developer Associate',
  'Google Cloud Certified Professional Cloud Architect',
  'Google Cloud Certified Professional Data Engineer',
  'CompTIA Security+',
  'Certified Information Systems Security Professional (CISSP)',
  'Certified Kubernetes Administrator (CKA)',
  'HashiCorp Certified: Terraform Associate',
  'Cisco Certified Network Associate (CCNA)',
  'Cisco Certified Network Professional (CCNP)',
  'Salesforce Certified Administrator',
  'Salesforce Certified Platform Developer I',
  'Oracle Certified Professional: Java SE 17 Developer',
  'PMP (Project Management Professional)',
  'PMI Agile Certified Practitioner (PMI-ACP)',
  'Scrum Alliance Certified ScrumMaster (CSM)',
  'TensorFlow Developer Certificate',
  'None'
];

const Predict = () => {
  const { user: authUser } = useAuth();

  // Prediction Parameters
  const [degree, setDegree] = useState('');
  const [major, setMajor] = useState('');
  const [cgpa, setCgpa] = useState('');
  const [yearsOfExperience, setYearsOfExperience] = useState('');
  const [industryPreference, setIndustryPreference] = useState('');
  const [skills, setSkills] = useState([]);
  const [certifications, setCertifications] = useState([]);

  // Profile data cache (for Left sidebar summary)
  const [profileData, setProfileData] = useState(null);
  const [profilePicture, setProfilePicture] = useState('');
  
  const [loading, setLoading] = useState(true);
  const [predicting, setPredicting] = useState(false);
  const [savingProfile, setSavingProfile] = useState(false);
  const [isPredictEditable, setIsPredictEditable] = useState(false);
  const [results, setResults] = useState(null);
  const [importSuccess, setImportSuccess] = useState(false);

  const [errors, setErrors] = useState({});
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');

  const fetchProfile = async () => {
    try {
      const response = await API.get('/profile');
      setProfileData(response.data);
      if (response.data) {
        setDegree(response.data.degree || '');
        setMajor(response.data.major || '');
        setCgpa(response.data.cgpa !== null ? response.data.cgpa.toString() : '');
        setYearsOfExperience(response.data.yearsOfExperience !== null ? response.data.yearsOfExperience.toString() : '');
        setIndustryPreference(response.data.industryPreference || '');
        setSkills(response.data.skills || []);
        setCertifications(response.data.certifications || []);
        setProfilePicture(response.data.profilePicture || '');

        // Auto-unlock prediction fields if they are completely empty
        if (!response.data.degree && !response.data.major && !response.data.industryPreference && (!response.data.skills || response.data.skills.length === 0)) {
          setIsPredictEditable(true);
        } else {
          setIsPredictEditable(false);
        }
      } else {
        setIsPredictEditable(true);
      }
    } catch (error) {
      setToastMessage('Failed to load profile summary');
      setToastType('error');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveProfile = async () => {
    setSavingProfile(true);
    try {
      const payload = {
        degree,
        major,
        cgpa: parseFloat(cgpa) || 0.0,
        yearsOfExperience: parseInt(yearsOfExperience) || 0,
        industryPreference,
        skills,
        certifications
      };
      await API.put('/profile', payload);
      setToastMessage('Profile and prediction details saved successfully!');
      setToastType('success');
      setIsPredictEditable(false);
      fetchProfile();
    } catch (error) {
      setToastMessage('Failed to save profile details');
      setToastType('error');
    } finally {
      setSavingProfile(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleImport = () => {
    if (profileData) {
      setDegree(profileData.degree || '');
      setMajor(profileData.major || '');
      setCgpa(profileData.cgpa !== null ? profileData.cgpa.toString() : '');
      setYearsOfExperience(profileData.yearsOfExperience !== null ? profileData.yearsOfExperience.toString() : '');
      setIndustryPreference(profileData.industryPreference || '');
      setSkills(profileData.skills || []);
      setCertifications(profileData.certifications || []);
      setImportSuccess(true);
      setToastMessage('Details imported successfully!');
      setToastType('success');
      setTimeout(() => setImportSuccess(false), 3000);
    }
  };

  const handleClear = () => {
    setDegree('');
    setMajor('');
    setCgpa('');
    setYearsOfExperience('');
    setIndustryPreference('');
    setSkills([]);
    setCertifications([]);
    setResults(null);
  };

  const validate = () => {
    const tempErrors = {};
    if (!degree) tempErrors.degree = 'Degree is required';
    if (!major) tempErrors.major = 'Major is required';
    if (!cgpa) tempErrors.cgpa = 'CGPA/COPA is required';
    if (yearsOfExperience === '') tempErrors.yearsOfExperience = 'Experience is required';
    if (!industryPreference) tempErrors.industryPreference = 'Industry is required';

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handlePredict = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setPredicting(true);
    try {
      const payload = {
        degree,
        major,
        cgpa: parseFloat(cgpa) || 0.0,
        yearsOfExperience: parseInt(yearsOfExperience) || 0,
        industryPreference,
        skills,
        certifications
      };

      const response = await API.post('/predictions/predict', payload);
      setResults(response.data);
      setToastMessage('Prediction generated successfully!');
      setToastType('success');
    } catch (error) {
      setToastMessage('Failed to make prediction.');
      setToastType('error');
    } finally {
      setPredicting(false);
    }
  };

  const getMatchLevel = (percent) => {
    if (percent >= 80) return { label: 'EXCELLENT MATCH', color: 'border-emerald-200 text-emerald-600 bg-emerald-50' };
    if (percent >= 60) return { label: 'GOOD MATCH', color: 'border-yellow-200 text-yellow-600 bg-yellow-50' };
    if (percent >= 40) return { label: 'FAIR MATCH', color: 'border-orange-200 text-orange-600 bg-orange-50' };
    return { label: 'LOW MATCH', color: 'border-rose-200 text-rose-600 bg-rose-50' };
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
        
        {/* Left Panel: Profile Summary Actions */}
        <div className="w-full lg:w-1/3 space-y-6">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-md relative overflow-hidden text-center">
            {/* Avatar Circle */}
            <div className="mx-auto h-20 w-20 rounded-full border-4 border-purple-100 flex items-center justify-center mb-4 shadow-inner relative overflow-hidden bg-purple-600 text-white text-3xl font-bold">
              {profilePicture ? (
                <img 
                  src={profilePicture} 
                  alt="Profile" 
                  className="h-full w-full object-cover" 
                />
              ) : (
                authUser?.fullName?.charAt(0).toUpperCase()
              )}
            </div>
            
            <h2 className="text-xl font-bold text-slate-800 uppercase">{authUser?.fullName}</h2>
            <p className="text-slate-400 text-xs mt-0.5">{authUser?.email}</p>
            
            {profileData?.roleTitle && (
              <span className="text-[10px] font-bold tracking-wider text-purple-700 bg-purple-50 px-3 py-1 rounded-full border border-purple-100 mt-3 inline-block uppercase">
                {profileData.roleTitle}
              </span>
            )}

            {/* Quick stats */}
            <div className="grid grid-cols-3 gap-2 border-t border-slate-100 pt-5 mt-5">
              <div>
                <span className="text-xl font-extrabold text-slate-700 block">{profileData?.skills?.length || 0}</span>
                <span className="text-[9px] font-semibold text-slate-400 uppercase tracking-wider block">Skills</span>
              </div>
              <div className="border-x border-slate-100">
                <span className="text-xl font-extrabold text-slate-700 block">{profileData?.yearsOfExperience || 0}</span>
                <span className="text-[9px] font-semibold text-slate-400 uppercase tracking-wider block">Years Exp</span>
              </div>
              <div>
                <span className="text-xl font-extrabold text-slate-700 block">{profileData?.certifications?.length || 0}</span>
                <span className="text-[9px] font-semibold text-slate-400 uppercase tracking-wider block">Certs</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2 mt-6">
              <button
                type="button"
                onClick={handleImport}
                className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-bold py-2.5 px-3 rounded-xl text-xs shadow-md transition-all active:scale-95 flex items-center justify-center gap-1"
              >
                Import My Details
              </button>
              <button
                type="button"
                onClick={handleClear}
                className="flex-1 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-600 font-bold py-2.5 px-3 rounded-xl text-xs transition-all active:scale-95"
              >
                Clear All
              </button>
            </div>

            {/* Current Profile Summary */}
            <div className="mt-6 border-t border-slate-100 pt-5 text-left">
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Current Profile</h4>
              <div className="space-y-2.5 text-xs">
                <div className="flex justify-between border-b border-slate-100 pb-1.5">
                  <span className="text-slate-400">Degree</span>
                  <span className="font-bold text-slate-700">{profileData?.degree || 'Not specified'}</span>
                </div>
                <div className="flex justify-between border-b border-slate-100 pb-1.5">
                  <span className="text-slate-400">Major</span>
                  <span className="font-bold text-slate-700">{profileData?.major || 'Not specified'}</span>
                </div>
                <div className="flex justify-between border-b border-slate-100 pb-1.5">
                  <span className="text-slate-400">CGPA</span>
                  <span className="font-bold text-slate-700">{profileData?.cgpa !== null ? profileData?.cgpa.toFixed(2) : 'Not specified'}</span>
                </div>
                <div className="flex justify-between border-b border-slate-100 pb-1.5">
                  <span className="text-slate-400">Experience</span>
                  <span className="font-bold text-slate-700">{profileData?.yearsOfExperience || 0} years</span>
                </div>
                <div className="flex justify-between border-b border-slate-100 pb-1.5">
                  <span className="text-slate-400">Industry Preference</span>
                  <span className="font-bold text-slate-700">{profileData?.industryPreference || 'Not specified'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Certified</span>
                  <span className="font-bold text-slate-700 truncate max-w-[150px]">
                    {profileData?.certifications?.[0] || 'None'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel: Job Prediction Form & Output Cards */}
        <div className="w-full lg:w-2/3 space-y-8">
          
          {/* Prediction input form */}
          <div className="glass-card p-6 sm:p-8 rounded-3xl space-y-6">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-xl font-bold text-slate-800">Job Role Prediction</h2>
                <p className="text-xs text-slate-400 mt-1">Enter your details to discover your ideal job role</p>
              </div>
              {!isPredictEditable && (
                <button
                  type="button"
                  onClick={() => setIsPredictEditable(true)}
                  className="flex items-center gap-1 bg-purple-50 hover:bg-purple-100 text-purple-700 font-bold py-1.5 px-3 rounded-xl text-[10px] transition-all border border-purple-100 uppercase"
                >
                  <Pencil className="h-3 w-3" />
                  Edit Details
                </button>
              )}
            </div>

            <form onSubmit={handlePredict} className="space-y-5">
              <fieldset disabled={!isPredictEditable} className="space-y-5 w-full border-none p-0 m-0">
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-purple-700 border-b border-slate-100 pb-1">Education & Experience</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Degree */}
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Degree</label>
                    <select
                      value={degree}
                      onChange={(e) => setDegree(e.target.value)}
                      className={`w-full rounded-xl border p-3 text-xs focus:outline-none focus:ring-2 focus:ring-purple-200 ${
                        errors.degree ? 'border-rose-300' : 'border-slate-200'
                      }`}
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
                      className={`w-full rounded-xl border p-3 text-xs focus:outline-none focus:ring-2 focus:ring-purple-200 ${
                        errors.major ? 'border-rose-300' : 'border-slate-200'
                      }`}
                    >
                      <option value="">Select Major</option>
                      {MAJORS.map(m => <option key={m} value={m}>{m}</option>)}
                    </select>
                  </div>

                  {/* CGPA (Labeled COPA in prediction form to match video) */}
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">COPA</label>
                    <input
                      type="number"
                      step="0.01"
                      value={cgpa}
                      onChange={(e) => setCgpa(e.target.value)}
                      className={`w-full rounded-xl border p-3 text-xs focus:outline-none focus:ring-2 focus:ring-purple-200 ${
                        errors.cgpa ? 'border-rose-300' : 'border-slate-200'
                      }`}
                      placeholder="e.g. 9.1"
                    />
                  </div>

                  {/* Experience */}
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Experience (years)</label>
                    <input
                      type="number"
                      value={yearsOfExperience}
                      onChange={(e) => setYearsOfExperience(e.target.value)}
                      className={`w-full rounded-xl border p-3 text-xs focus:outline-none focus:ring-2 focus:ring-purple-200 ${
                        errors.yearsOfExperience ? 'border-rose-300' : 'border-slate-200'
                      }`}
                      placeholder="e.g. 1"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4 pt-2">
                <h3 className="text-sm font-bold text-purple-700 border-b border-slate-100 pb-1">Skills & Preferences</h3>
                
                <div className="space-y-4">
                  {/* SkillsSelector */}
                  <SkillsSelector selectedSkills={skills} onChange={setSkills} disabled={!isPredictEditable} />

                  {/* Certification select */}
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Certification</label>
                    <select
                      value={certifications[0] || ''}
                      onChange={(e) => setCertifications(e.target.value ? [e.target.value] : [])}
                      className="w-full rounded-xl border border-slate-200 bg-white p-3.5 text-xs focus:outline-none"
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
                      className={`w-full rounded-xl border p-3.5 text-xs focus:outline-none ${
                        errors.industryPreference ? 'border-rose-300' : 'border-slate-200'
                      }`}
                    >
                      <option value="">Select Industry</option>
                      {INDUSTRIES.map(ind => <option key={ind} value={ind}>{ind}</option>)}
                    </select>
                  </div>
                </div>
              </div>

              </fieldset>

              {/* Predict button */}
              <button
                type="submit"
                disabled={predicting}
                className="w-full flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-4 rounded-xl text-xs uppercase tracking-wider transition-all disabled:opacity-50 mt-4 active:scale-98"
              >
                {predicting ? (
                  <>
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    Predicting...
                  </>
                ) : (
                  <>
                    <Brain className="h-4 w-4" />
                    Predict Job Role
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Results display */}
          {results && (
            <div className="space-y-5 animate-fade-in">
              <div className="border-b border-slate-200 pb-3 flex justify-between items-end">
                <h3 className="text-xl font-bold text-slate-800">Prediction Results</h3>
                <span className="text-xs font-semibold text-[#6f42c1] bg-[#6f42c1]/5 px-3 py-1 rounded-full border border-[#6f42c1]/10">
                  {results.recommendations.length} Roles Found
                </span>
              </div>

              {/* List of matching cards */}
              <div className="flex flex-col gap-4">
                {results.recommendations.map((rec, index) => {
                  const percent = rec.confidencePercentage;
                  const matchInfo = getMatchLevel(percent);
                  
                  // Rank border styling matching reference video
                  let borderClass = 'border-l-4 border-l-slate-400 border border-slate-200/80';
                  if (index === 0) {
                    borderClass = 'border-l-4 border-l-emerald-500 border border-slate-200/80';
                  } else if (index === 1) {
                    borderClass = 'border-l-4 border-l-amber-500 border border-slate-200/80';
                  } else if (index === 2) {
                    borderClass = 'border-l-4 border-l-sky-500 border border-slate-200/80';
                  }

                  // Emoji mapping matching video aesthetics
                  let emoji = '🎯';
                  const roleLower = rec.jobRole.toLowerCase();
                  if (roleLower.includes('software')) emoji = '🎯';
                  else if (roleLower.includes('data')) emoji = '📊';
                  else if (roleLower.includes('civil')) emoji = '🏗️';
                  else if (roleLower.includes('mechanical')) emoji = '🔧';
                  else if (roleLower.includes('electrical')) emoji = '⚡';
                  else if (roleLower.includes('cloud')) emoji = '☁️';
                  else if (roleLower.includes('devops')) emoji = '⚙️';
                  else if (roleLower.includes('security')) emoji = '🛡️';
                  else if (roleLower.includes('ai') || roleLower.includes('learning')) emoji = '🧠';

                  return (
                    <div 
                      key={rec.jobRole} 
                      className={`rounded-2xl p-6 bg-white shadow-md flex flex-col gap-3 relative transition-all ${borderClass}`}
                    >
                      <div className="flex justify-between items-start gap-4">
                        <div>
                          <h4 className="text-lg font-bold text-slate-800 flex items-center gap-1.5">
                            <span>{emoji}</span> {rec.jobRole}
                          </h4>
                          <span className={`text-[10px] font-bold border px-2.5 py-0.5 rounded-full mt-1.5 inline-block ${matchInfo.color}`}>
                            {matchInfo.label}
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="text-xl font-extrabold text-emerald-500 block">{percent.toFixed(1)}% Match</span>
                        </div>
                      </div>

                      {/* Progress bar */}
                      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-emerald-500 rounded-full transition-all duration-1000"
                          style={{ width: `${percent}%` }}
                        />
                      </div>

                      <p className="text-xs text-slate-500 leading-relaxed mt-1">
                        {rec.explanation}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* Save details & prediction button */}
              <div className="pt-4 flex justify-end">
                <button
                  type="button"
                  onClick={handleSaveProfile}
                  disabled={savingProfile || !isPredictEditable}
                  className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 px-6 rounded-xl text-xs uppercase tracking-wider transition-all disabled:opacity-50 active:scale-95 shadow-md flex items-center gap-1.5"
                >
                  {savingProfile ? (
                    <>
                      <RefreshCw className="h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="h-4 w-4" />
                      Save
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

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

export default Predict;
