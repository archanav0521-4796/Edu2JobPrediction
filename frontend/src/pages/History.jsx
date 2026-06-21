import React, { useState, useEffect, useMemo } from 'react';
import API from '../services/api';
import Toast from '../components/Toast';
import { History, Search, RefreshCw, Trash2 } from 'lucide-react';
import { 
  ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, 
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, PieChart, Pie, Cell, 
  BarChart, Bar 
} from 'recharts';

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#0088fe', '#00c49f', '#ffbb28', '#ff8042', '#a4de6c'];

const PredictionHistoryPage = () => {
  const [historyList, setHistoryList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');

  // Filters State
  const [roleFilter, setRoleFilter] = useState('All');
  const [industryFilter, setIndustryFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this prediction history record?")) {
      return;
    }
    try {
      await API.delete(`/predictions/history/${id}`);
      setToastMessage('Record deleted successfully');
      setToastType('success');
      fetchHistory();
    } catch (error) {
      setToastMessage('Failed to delete history record');
      setToastType('error');
    }
  };

  // Load history data from server (we can retrieve the full details from `/predictions/history` or custom endpoint)
  // Wait! In order to get the full profile attributes for table (Degree, Major, CGPA, Exp, Certs, Industry, Skills, Predicted Role, Date),
  // we can fetch the detailed predictions records from the server!
  // Wait! The backend has `PredictionRepository.findByUserIdOrderByPredictionDateDesc(Long userId)`.
  // Wait! Let's check: does `/api/predictions/history` return `PredictionHistoryDto` which only has (id, predictionId, predictionDate, topJobRole, confidenceScore)?
  // Yes. BUT wait! The backend also has predictions table which stores ALL details!
  // Can we fetch predictions details directly? Let's check: does the controller have an endpoint for predictions?
  // Let's look at `PredictionController.java`:
  // It has `/api/predictions/history` which returns history DTOs.
  // Oh! We can write an endpoint or just modify `/api/predictions/history` to return the FULL details (since it's a history log, returning full details makes the history page much richer)!
  // Wait! Let's modify `PredictionHistoryDto.java` and `PredictionService.java` to return the full prediction fields!
  // Let's check what fields the table in the video displays:
  // Degree, Major, CGPA, Experience, Certifications, Industry Preference, Skills, Predicted Role, Date.
  // Yes! The table displays ALL these columns!
  // If `PredictionHistoryDto` only returns topJobRole, then we wouldn't have the other fields to display in the table or analyze in the charts!
  // Let's update `PredictionHistoryDto.java` and `PredictionService.java` to map and return ALL fields!
  // That will make it extremely easy to display them in the table and plot them in charts!

  // First, let's write the frontend code of `History.jsx` assuming we have these fields.
  // The fields in `PredictionHistoryDto` will be:
  // `id`, `predictionId`, `predictionDate`, `degree`, `major`, `cgpa`, `yearsOfExperience`, `certificationsList`, `industryPreference`, `skillsList`, `topJobRole`, `confidenceScore`.
  // Let's build the React page accordingly!

  const fetchHistory = async () => {
    try {
      const response = await API.get('/predictions/history');
      setHistoryList(response.data);
    } catch (error) {
      setToastMessage('Failed to fetch history logs');
      setToastType('error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  // Filter lists of roles and industries for dropdown options
  const uniqueRoles = useMemo(() => {
    const roles = historyList.map(item => item.topJobRole);
    return ['All', ...new Set(roles)];
  }, [historyList]);

  const uniqueIndustries = useMemo(() => {
    const industries = historyList.map(item => item.industryPreference);
    return ['All', ...new Set(industries)];
  }, [historyList]);

  // Apply filters to history list
  const filteredList = useMemo(() => {
    return historyList.filter(item => {
      const matchesRole = roleFilter === 'All' || item.topJobRole === roleFilter;
      const matchesIndustry = industryFilter === 'All' || item.industryPreference === industryFilter;
      
      const searchLower = searchQuery.toLowerCase().trim();
      const matchesSearch = !searchLower || 
        (item.topJobRole && item.topJobRole.toLowerCase().includes(searchLower)) ||
        (item.degree && item.degree.toLowerCase().includes(searchLower)) ||
        (item.major && item.major.toLowerCase().includes(searchLower)) ||
        (item.skillsList && item.skillsList.toLowerCase().includes(searchLower));
        
      return matchesRole && matchesIndustry && matchesSearch;
    });
  }, [historyList, roleFilter, industryFilter, searchQuery]);

  // --- Chart 1: Predicted Roles Over Time ---
  const lineChartData = useMemo(() => {
    // Group counts of predictions by month/date
    const counts = {};
    filteredList.forEach(item => {
      const date = new Date(item.predictionDate);
      const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      counts[key] = (counts[key] || 0) + 1;
    });
    return Object.entries(counts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [filteredList]);

  // --- Chart 2: Skill Frequency Radar ---
  const radarChartData = useMemo(() => {
    const counts = {};
    filteredList.forEach(item => {
      if (item.skillsList) {
        const skills = item.skillsList.split(',').map(s => s.trim());
        skills.forEach(s => {
          if (s) counts[s] = (counts[s] || 0) + 1;
        });
      }
    });
    return Object.entries(counts)
      .map(([subject, count]) => ({ subject, A: count, fullMark: 10 }))
      .sort((a, b) => b.A - a.A)
      .slice(0, 10); // show top 10 skills
  }, [filteredList]);

  // --- Chart 3: Industry Preference Distribution ---
  const pieChartData = useMemo(() => {
    const counts = {};
    filteredList.forEach(item => {
      const key = item.industryPreference || 'Not Specified';
      counts[key] = (counts[key] || 0) + 1;
    });
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [filteredList]);

  // --- Chart 4: Certifications Count ---
  const certificationsChartData = useMemo(() => {
    const counts = {};
    filteredList.forEach(item => {
      if (item.certificationsList) {
        const certs = item.certificationsList.split(',').map(c => c.trim());
        certs.forEach(c => {
          if (c && c.toLowerCase() !== 'none') {
            counts[c] = (counts[c] || 0) + 1;
          }
        });
      }
    });
    return Object.entries(counts).map(([name, count]) => ({ name, count }));
  }, [filteredList]);

  // --- Chart 5: Certification by Predicted Role ---
  const certByRoleData = useMemo(() => {
    const counts = {};
    filteredList.forEach(item => {
      const role = item.topJobRole;
      counts[role] = (counts[role] || 0) + 1;
    });
    return Object.entries(counts).map(([name, count]) => ({ name, count }));
  }, [filteredList]);

  // --- Table 6: Top Skill Pairs (Co-occurrence) ---
  const topSkillPairs = useMemo(() => {
    const pairCounts = {};
    filteredList.forEach(item => {
      if (item.skillsList) {
        const skills = item.skillsList.split(',').map(s => s.trim()).filter(Boolean);
        // Compute combinations of pairs
        for (let i = 0; i < skills.length; i++) {
          for (let j = i + 1; j < skills.length; j++) {
            const s1 = skills[i];
            const s2 = skills[j];
            // Sort to make pair key order-independent
            const key = s1 < s2 ? `${s1} | ${s2}` : `${s2} | ${s1}`;
            pairCounts[key] = (pairCounts[key] || 0) + 1;
          }
        }
      }
    });
    return Object.entries(pairCounts)
      .map(([pair, count]) => {
        const [skillA, skillB] = pair.split(' | ');
        return { skillA, skillB, count };
      })
      .sort((a, b) => b.count - a.count)
      .slice(0, 5); // top 5 co-occurring pairs
  }, [filteredList]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
  };

  if (loading && historyList.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-purple-200 border-t-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 w-full animate-fade-in space-y-8">
      {/* Header & Filters */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <History className="h-8 w-8 text-purple-600" />
            Prediction History & Analysis
          </h1>
          <p className="text-slate-500 mt-1">Filter prediction history and view analytics charts</p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 items-center">
          {/* Search bar */}
          <div className="relative flex items-center">
            <Search className="absolute left-3.5 h-3.5 w-3.5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search history..."
              className="pl-9 pr-4 py-2 w-56 rounded-xl border border-slate-200 bg-white text-xs focus:outline-none focus:ring-2 focus:ring-purple-200 transition-all text-slate-700"
            />
          </div>

          {/* Role Filter */}
          <div className="flex items-center gap-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Filter by Role:</label>
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs focus:outline-none text-slate-700"
            >
              {uniqueRoles.map(role => <option key={role} value={role}>{role}</option>)}
            </select>
          </div>

          {/* Industry Filter */}
          <div className="flex items-center gap-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Filter by Industry:</label>
            <select
              value={industryFilter}
              onChange={(e) => setIndustryFilter(e.target.value)}
              className="rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs focus:outline-none text-slate-700"
            >
              {uniqueIndustries.map(ind => <option key={ind} value={ind}>{ind}</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* Main Table Card */}
      <div className="glass-card rounded-3xl overflow-hidden shadow-md border border-slate-200/80 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-400 font-bold uppercase">
                <th className="px-5 py-4">Degree</th>
                <th className="px-5 py-4">Major</th>
                <th className="px-5 py-4 text-center">CGPA</th>
                <th className="px-5 py-4 text-center">Experience</th>
                <th className="px-5 py-4">Certifications</th>
                <th className="px-5 py-4">Industry Preference</th>
                <th className="px-5 py-4">Skills</th>
                <th className="px-5 py-4">Predicted Role</th>
                <th className="px-5 py-4">Date</th>
                <th className="px-5 py-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
              {filteredList.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/50">
                  <td className="px-5 py-3.5">{item.degree}</td>
                  <td className="px-5 py-3.5">{item.major}</td>
                  <td className="px-5 py-3.5 text-center">{item.cgpa?.toFixed(2)}</td>
                  <td className="px-5 py-3.5 text-center">{item.yearsOfExperience}</td>
                  <td className="px-5 py-3.5 truncate max-w-[150px]" title={item.certificationsList}>
                    {item.certificationsList || 'None'}
                  </td>
                  <td className="px-5 py-3.5">{item.industryPreference}</td>
                  <td className="px-5 py-3.5 truncate max-w-[180px]" title={item.skillsList}>
                    {item.skillsList}
                  </td>
                  <td className="px-5 py-3.5 font-bold text-slate-900">{item.topJobRole}</td>
                  <td className="px-5 py-3.5">{formatDate(item.predictionDate)}</td>
                  <td className="px-5 py-3.5 text-center">
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="text-rose-500 hover:text-rose-700 hover:bg-rose-50 p-1.5 rounded-lg transition-colors"
                      title="Delete prediction"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}

              {filteredList.length === 0 && (
                <tr>
                  <td colSpan="10" className="text-center py-12 text-slate-400">
                    No prediction records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Analytics Charts Grid */}
      {filteredList.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
          
          {/* Chart 1: Predicted Roles Over Time */}
          <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-sm flex flex-col justify-between min-h-[300px]">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">Predicted Roles Over Time</h3>
            <div className="h-48 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={lineChartData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                  <YAxis tick={{ fontSize: 10 }} allowDecimals={false} />
                  <Tooltip />
                  <Line type="monotone" dataKey="count" stroke="#7c3aed" strokeWidth={2.5} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Chart 2: Skill Frequency Radar */}
          <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-sm flex flex-col justify-between min-h-[300px]">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">Skill Frequency Radar</h3>
            <div className="h-48 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" radius="70%" data={radarChartData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="subject" tick={{ fontSize: 9 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 'auto']} tick={{ fontSize: 8 }} />
                  <Radar name="Skills" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Chart 3: Industry Preference Distribution */}
          <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-sm flex flex-col justify-between min-h-[300px]">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">Industry Preference Distribution</h3>
            <div className="h-48 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieChartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={45}
                    outerRadius={70}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {pieChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend tick={{ fontSize: 9 }} iconSize={8} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Chart 4: Certifications Count */}
          <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-sm flex flex-col justify-between min-h-[300px]">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">Certifications Count</h3>
            <div className="h-48 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={certificationsChartData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" tick={{ fontSize: 9 }} />
                  <YAxis tick={{ fontSize: 10 }} allowDecimals={false} />
                  <Tooltip />
                  <Bar dataKey="count" fill="#82ca9d" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Chart 5: Certification by Predicted Role */}
          <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-sm flex flex-col justify-between min-h-[300px]">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">Certification by Predicted Role</h3>
            <div className="h-48 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={certByRoleData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                  <XAxis type="number" tick={{ fontSize: 10 }} allowDecimals={false} />
                  <YAxis type="category" dataKey="name" tick={{ fontSize: 9 }} width={100} />
                  <Tooltip />
                  <Bar dataKey="count" fill="#ffbb28" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Table 6: Top Skill Pairs (Co-occurrence) */}
          <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-sm flex flex-col justify-between min-h-[300px]">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">Top Skill Pairs (Co-occurrence)</h3>
            <div className="overflow-y-auto flex-1 text-[11px] font-semibold text-slate-700">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-slate-100 text-slate-400 uppercase text-[9px] font-bold">
                    <th className="py-2">Skill A</th>
                    <th className="py-2">Skill B</th>
                    <th className="py-2 text-right">Count</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {topSkillPairs.map((pair, i) => (
                    <tr key={i}>
                      <td className="py-2 text-purple-700">{pair.skillA}</td>
                      <td className="py-2 text-indigo-700">{pair.skillB}</td>
                      <td className="py-2 text-right font-bold text-slate-900">{pair.count}</td>
                    </tr>
                  ))}
                  {topSkillPairs.length === 0 && (
                    <tr>
                      <td colSpan="3" className="text-center py-8 text-slate-400">
                        No significant skill co-occurrences.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

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

export default PredictionHistoryPage;
