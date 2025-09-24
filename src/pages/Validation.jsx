import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, FileText, Activity, Droplet, Thermometer, CloudRain, Zap, AlertTriangle } from 'lucide-react';
import './Validation.css';

// Function to convert array of objects to CSV string
const convertToCSV = (data) => {
  if (!data || data.length === 0) return '';
  
  // Get headers from the first object
  const headers = Object.keys(data[0]);
  
  // Create CSV content
  const csvRows = [];
  
  // Add header row
  csvRows.push(headers.join(','));
  
  // Add data rows
  for (const row of data) {
    const values = headers.map(header => {
      const escaped = ('' + row[header]).replace(/"/g, '\\"');
      return `"${escaped}"`;
    });
    csvRows.push(values.join(','));
  }
  
  return csvRows.join('\n');
};

// Function to download data as CSV file
const downloadCSV = (data, filename) => {
  const csvContent = convertToCSV(data);
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  
  // Set the download attributes
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}_${timestamp}.csv`);
  link.style.visibility = 'hidden';
  
  // Append to body, click and remove
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const Validation = () => {
  const navigate = useNavigate();
  // File upload states
  const [selectedFile, setSelectedFile] = useState(null);
  const [datasetData, setDatasetData] = useState(null);
  const [useDefaultDataset, setUseDefaultDataset] = useState(false);
  
  // Form states
  const [formData, setFormData] = useState({
    ph: '',
    hardness: '',
    solids: '',
    chloramines: '',
    sulfate: '',
    conductivity: '',
    organic_carbon: '',
    trihalomethanes: '',
    turbidity: ''
  });
  
  // Common states
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('form'); // 'form' or 'file'
  const [showTable, setShowTable] = useState(false);
  const [tableData, setTableData] = useState([]);

  // Form input change handler
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // File upload handlers
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setUseDefaultDataset(false);
      // Read the file content
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          // Parse CSV or JSON based on file type
          const content = event.target.result;
          if (file.name.endsWith('.csv')) {
            // Simple CSV parsing (for demonstration)
            const lines = content.split('\n');
            const headers = lines[0].split(',');
            const data = [];
            for (let i = 1; i < lines.length; i++) {
              if (lines[i].trim() === '') continue;
              const values = lines[i].split(',');
              const entry = {};
              headers.forEach((header, index) => {
                entry[header.trim()] = values[index] ? values[index].trim() : '';
              });
              data.push(entry);
            }
            setDatasetData(data);
          } else if (file.name.endsWith('.json')) {
            setDatasetData(JSON.parse(content));
          }
        } catch (err) {
          console.error('Error parsing file:', err);
          setError('Error parsing file. Please check the file format.');
        }
      };
      reader.readAsText(file);
    }
  };

  const handleUseDefaultDataset = () => {
    setUseDefaultDataset(true);
    setSelectedFile(null);
    // Load default dataset (mock data)
    setDatasetData([
      { ph: '7.5', hardness: '200', solids: '500', chloramines: '2.5', sulfate: '250', 
        conductivity: '400', organic_carbon: '10', trihalomethanes: '50', turbidity: '3.5' },
      { ph: '6.8', hardness: '180', solids: '480', chloramines: '2.8', sulfate: '230', 
        conductivity: '380', organic_carbon: '9.5', trihalomethanes: '45', turbidity: '3.2' }
    ]);
  };

  const validateForm = () => {
    // Check if any required field is empty
    const requiredFields = ['ph', 'hardness', 'solids', 'chloramines', 'sulfate', 'conductivity', 'organic_carbon', 'trihalomethanes', 'turbidity'];
    const emptyFields = requiredFields.filter(field => !formData[field] && formData[field] !== 0);
    
    if (emptyFields.length > 0) {
      setError(`Please fill in all required fields: ${emptyFields.join(', ')}`);
      return false;
    }
    
    // Convert all values to numbers and validate ranges
    const values = {
      ph: parseFloat(formData.ph),
      hardness: parseFloat(formData.hardness),
      solids: parseFloat(formData.solids),
      chloramines: parseFloat(formData.chloramines),
      sulfate: parseFloat(formData.sulfate),
      conductivity: parseFloat(formData.conductivity),
      organic_carbon: parseFloat(formData.organic_carbon),
      trihalomethanes: parseFloat(formData.trihalomethanes),
      turbidity: parseFloat(formData.turbidity)
    };
    
    // Validate ranges
    if (values.ph < 0 || values.ph > 14) {
      setError('pH must be between 0 and 14');
      return false;
    }
    
    if (values.hardness < 0 || values.hardness > 1000) {
      setError('Hardness must be between 0 and 1000 mg/L');
      return false;
    }
    
    // Add more validations for other fields as needed
    
    return values;
  };

  const validateWaterQuality = async (e) => {
    if (e) e.preventDefault();
    
    setLoading(true);
    setError(null);
    setPrediction(null);
    setShowTable(false);

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      let predictionResult;
      
      if (activeTab === 'form') {
        // Validate form data first
        const validatedValues = validateForm();
        if (!validatedValues) {
          setLoading(false);
          return;
        }
        
        // Use a more sophisticated prediction algorithm
        const { ph, hardness, solids, chloramines, sulfate, conductivity, organic_carbon, trihalomethanes, turbidity } = validatedValues;
        
        // Simple weighted scoring system (replace with your actual model)
        let score = 0;
        
        // pH (optimal: 6.5-8.5)
        if (ph >= 6.5 && ph <= 8.5) score += 30;
        else if (ph >= 6.0 && ph <= 9.0) score += 15;
        
        // Hardness (optimal: 150-300 mg/L)
        if (hardness >= 150 && hardness <= 300) score += 10;
        
        // Solids (TDS) (optimal: < 600 ppm)
        if (solids < 600) score += 10;
        
        // Chloramines (optimal: < 4 mg/L)
        if (chloramines < 4) score += 10;
        
        // Sulfate (optimal: < 250 mg/L)
        if (sulfate < 250) score += 10;
        
        // Conductivity (optimal: 200-800 μS/cm)
        if (conductivity >= 200 && conductivity <= 800) score += 10;
        
        // Organic Carbon (optimal: < 10 mg/L)
        if (organic_carbon < 10) score += 10;
        
        // Trihalomethanes (optimal: < 80 μg/L)
        if (trihalomethanes < 80) score += 10;
        
        // Turbidity (optimal: < 5 NTU)
        if (turbidity < 5) score += 10;
        
        // Determine prediction based on score
        if (score >= 80) predictionResult = 'Good';
        else if (score >= 50) predictionResult = 'Moderate';
        else predictionResult = 'Poor';
        
      } else {
        // File validation logic
        if (!datasetData || datasetData.length === 0) {
          throw new Error('Please upload a dataset or use the default dataset');
        }
        
        // Set table data for display
        setTableData(datasetData);
        setShowTable(true);
        
        // Simple validation based on the first record
        const ph = parseFloat(datasetData[0].ph || 0);
        if (ph >= 6.5 && ph <= 8.5) predictionResult = 'Good';
        else if (ph >= 6.0 && ph <= 9.0) predictionResult = 'Moderate';
        else predictionResult = 'Poor';
      }
      
      // Set prediction first
      setPrediction(predictionResult);
      
      // Then navigate to results page
      setTimeout(() => {
        navigate('/results', {
          state: {
            prediction: predictionResult,
            formData: activeTab === 'form' ? formData : null,
            tableData: activeTab === 'file' ? datasetData : null
          }
        });
      }, 0);
      
    } catch (err) {
      console.error('Validation error:', err);
      setError(err.message || 'Error validating water quality. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getPredictionColor = () => {
    if (!prediction) return '';
    const pred = prediction.toLowerCase();
    if (pred.includes('good')) return 'text-green-600';
    if (pred.includes('moderate')) return 'text-yellow-600';
    if (pred.includes('poor') || pred.includes('very poor')) return 'text-red-600';
    return '';
  };

  // Input field component
  const renderInputField = (name, label, icon, type = 'number', step = '0.1') => (
    <div className="form-group">
      <label className="form-label">
        {React.cloneElement(icon, { className: 'form-icon' })}
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={formData[name]}
        onChange={handleInputChange}
        step={step}
        className="form-input"
        placeholder={`Enter ${label.split(' ')[0].toLowerCase()}`}
        required
      />
    </div>
  );

  return (
    <div className="page-container relative">
      {/* Floating Contact Support Button */}
      <button 
        className="fixed bottom-8 right-8 z-50 flex items-center justify-center w-14 h-14 bg-gradient-to-r from-blue-600 to-blue-500 rounded-full shadow-lg hover:shadow-xl hover:shadow-blue-200 hover:scale-110 transition-all duration-300 transform hover:rotate-3"
        onClick={() => alert('Contact support at: support@waterqualityapp.com')}
        aria-label="Contact Support"
        title="Contact Support"
      >
        <svg 
          className="w-6 h-6 text-white" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" 
          />
        </svg>
      </button>
      <div className="hero-section">
        <h1 className="page-title">Water Quality Validation</h1>
        <p className="page-subtitle">
          Enter water quality parameters manually or upload a dataset to validate water quality and ensure safe consumption
        </p>
        
        {/* Main Card */}
        <div className="card">
          <div className="tabs">
            <button
              onClick={() => setActiveTab('form')}
              className={`tab ${activeTab === 'form' ? 'active' : ''}`}
            >
              <svg className="tab-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span>Manual Input</span>
            </button>
            <button
              onClick={() => setActiveTab('file')}
              className={`tab ${activeTab === 'file' ? 'active' : ''}`}
            >
              <svg className="tab-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              <span>Upload File</span>
            </button>
          </div>

          <div className="p-8">
            {activeTab === 'form' ? (
              // Manual Input Form
              <form onSubmit={validateWaterQuality} className="space-y-6">
                <div className="grid-cols-2">
                  {renderInputField('ph', 'pH Level', <Droplet />, 'number', '0.1')}
                  {renderInputField('hardness', 'Hardness (mg/L)', <Thermometer />)}
                  {renderInputField('solids', 'Total Dissolved Solids (ppm)', <CloudRain />)}
                  {renderInputField('chloramines', 'Chloramines (ppm)', <Zap />, 'number', '0.1')}
                  {renderInputField('sulfate', 'Sulfate (mg/L)', <Activity />, 'number', '0.1')}
                  {renderInputField('conductivity', 'Conductivity (μS/cm)', <Zap />)}
                  {renderInputField('organic_carbon', 'Organic Carbon (mg/L)', <Activity />, 'number', '0.1')}
                  {renderInputField('trihalomethanes', 'Trihalomethanes (μg/L)', <AlertTriangle />, 'number', '0.1')}
                  {renderInputField('turbidity', 'Turbidity (NTU)', <Droplet />, 'number', '0.1')}
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn btn-primary"
                  >
                    {loading ? (
                      <>
                        <svg className="spinner" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Validating...
                      </>
                    ) : (
                      <>
                        <svg className="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Validate Water Quality
                      </>
                    )}
                  </button>
                </div>

                {prediction && activeTab === 'form' && (
                  <div className={`mt-4 p-3 rounded-lg border text-sm ${
                    prediction.toLowerCase().includes('good') 
                      ? 'bg-green-50 border-green-100' 
                      : prediction.toLowerCase().includes('moderate') 
                        ? 'bg-yellow-50 border-yellow-100' 
                        : 'bg-red-50 border-red-100'
                  }`}>
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        {prediction.toLowerCase().includes('good') ? (
                          <svg className="h-3 w-3 text-green-500 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        ) : prediction.toLowerCase().includes('moderate') ? (
                          <svg className="h-3 w-3 text-yellow-500 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                          </svg>
                        ) : (
                          <svg className="h-3 w-3 text-red-500 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        )}
                      </div>
                      <div className="ml-2">
                        <h3 className={`font-medium ${
                          prediction.toLowerCase().includes('good') 
                            ? 'text-green-800' 
                            : prediction.toLowerCase().includes('moderate') 
                              ? 'text-yellow-800' 
                              : 'text-red-800'
                        }`}>
                          Water Quality: {prediction}
                        </h3>
                        <div className={`text-xs ${
                          prediction.toLowerCase().includes('good') 
                            ? 'text-green-700' 
                            : prediction.toLowerCase().includes('moderate') 
                              ? 'text-yellow-700' 
                              : 'text-red-700'
                        }`}>
                          {prediction.toLowerCase().includes('good') ? (
                            <p>This water is safe for consumption. The quality parameters are within acceptable limits.</p>
                          ) : prediction.toLowerCase().includes('moderate') ? (
                            <p>This water quality is moderate. It may require some treatment before consumption.</p>
                          ) : (
                            <p>This water is not safe for consumption without proper treatment.</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </form>
            ) : (
              <div className="space-y-6">
                {/* Stylish File Upload Section */}
                <div className="form-group">
                  <label className="form-label">
                    <Upload className="form-icon" />
                    Upload Water Quality Data
                  </label>
                  
                  <div className="relative">
                    <div 
                      className={`form-input flex flex-col items-center justify-center text-center p-4 cursor-pointer transition-all duration-200 ease-in-out ${
                        selectedFile 
                          ? 'border-green-400 bg-gradient-to-br from-green-50 to-green-100 shadow-sm min-h-[120px]' 
                          : 'border-blue-200 bg-gradient-to-br from-white to-blue-50 hover:border-blue-400 hover:shadow-sm hover:shadow-blue-100/50 min-h-[160px]'
                      }`}
                      onClick={() => document.getElementById('file-upload').click()}
                    >
                      {selectedFile ? (
                        <div className="w-full">
                          <div className="flex items-center justify-between w-full space-x-2">
                            <div className="flex items-center space-x-2 flex-1 min-w-0">
                              <div className="p-1 rounded-lg bg-green-100 text-green-500 flex-shrink-0 shadow-inner">
                                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                              </div>
                              <div className="text-left min-w-0">
                                <p className="text-xs font-medium text-gray-800 truncate">
                                  {selectedFile.name}
                                </p>
                                <p className="text-[10px] text-gray-500 flex items-center mt-0.5">
                                  <span className="inline-flex items-center px-1.5 py-0.5 rounded-md text-[10px] font-medium bg-blue-50 text-blue-700 mr-1.5">
                                    {selectedFile.name.split('.').pop().toUpperCase()}
                                  </span>
                                  <span>{(selectedFile.size / 1024).toFixed(1)} KB</span>
                                </p>
                              </div>
                            </div>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedFile(null);
                              }}
                              className="p-1.5 text-gray-400 hover:bg-gray-100 hover:text-red-500 rounded-lg transition-all duration-150 focus:outline-none focus:ring-1 focus:ring-red-200"
                              title="Remove file"
                            >
                              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          </div>
                          <div className="mt-2 w-full bg-gray-100 rounded-full h-1 overflow-hidden">
                            <div className="bg-green-500 h-1 rounded-full" style={{ width: '100%' }}></div>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          <div className="p-1.5 rounded-md bg-gradient-to-br from-blue-50 to-blue-100 text-blue-500 inline-flex items-center justify-center shadow-inner">
                            <Upload className="h-4 w-4" strokeWidth={1.5} />
                          </div>
                          <div className="space-y-1.5">
                            <p className="text-xs font-medium text-gray-800">
                              Click to upload or drag and drop
                            </p>
                            <p className="text-[10px] text-gray-500 bg-white/50 rounded-full px-2 py-0.5 inline-block border border-gray-200">
                              CSV or JSON (max. 10MB)
                            </p>
                          </div>
                          <button 
                            type="button"
                            className="mt-2 px-3 py-1.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-xs font-medium rounded-md shadow-sm hover:shadow-md transform hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-1"
                            onClick={(e) => {
                              e.stopPropagation();
                              document.getElementById('file-upload').click();
                            }}
                          >
                            Choose File
                          </button>
                        </div>
                      )}
                      <input 
                        id="file-upload" 
                        name="file-upload" 
                        type="file" 
                        className="sr-only" 
                        accept=".csv,.json"
                        onChange={handleFileChange}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="relative mt-6 mb-6">
                  <div className="absolute inset-0 flex items-center" aria-hidden="true">
                    <div className="w-full border-t border-gray-200"></div>
                  </div>
                  <div className="relative flex justify-center">
                    <span className="px-3 bg-white text-sm font-medium text-gray-500">OR</span>
                  </div>
                </div>

                <div className="mb-6">
                  <button
                    type="button"
                    onClick={handleUseDefaultDataset}
                    className="w-full flex justify-center items-center px-6 py-3.5 border border-gray-200 rounded-xl shadow-sm text-base font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 transform hover:-translate-y-0.5"
                  >
                    <FileText className="-ml-1 mr-3 h-5 w-5 text-gray-400" />
                    Use Sample Dataset
                  </button>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={validateWaterQuality}
                    disabled={loading || (!selectedFile && !useDefaultDataset)}
                    className="w-full flex justify-center items-center px-4 py-3 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <Activity className="animate-spin -ml-1 mr-2 h-4 w-4" />
                        Validating...
                      </>
                    ) : (
                      <>
                        <Droplet className="-ml-1 mr-2 h-4 w-4" />
                        Validate Water Quality
                      </>
                    )}
                  </button>
                </div>

                {datasetData && datasetData.length > 1 && (
                  <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-100">
                    <p className="text-sm text-blue-700">
                      Showing results for the first entry in the dataset. {datasetData.length - 1} more entries available.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
          </div>
          
          <div className="mt-12 bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
            <div className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">About Water Quality Parameters</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="font-medium text-blue-800 flex items-center">
                      <Droplet className="h-5 w-5 mr-2 text-blue-600" />
                      pH Level
                    </h3>
                    <p className="mt-1 text-sm text-gray-600">Measures how acidic/basic water is (0-14 scale, 7 is neutral). Optimal range: 6.5-8.5</p>
                  </div>
                  
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="font-medium text-blue-800 flex items-center">
                      <Thermometer className="h-5 w-5 mr-2 text-blue-600" />
                      Hardness
                    </h3>
                    <p className="mt-1 text-sm text-gray-600">Concentration of calcium and magnesium ions (mg/L). High levels can cause scaling.</p>
                  </div>
                  
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="font-medium text-blue-800 flex items-center">
                      <CloudRain className="h-5 w-5 mr-2 text-blue-600" />
                      Total Dissolved Solids (TDS)
                    </h3>
                    <p className="mt-1 text-sm text-gray-600">Total dissolved inorganic salts and organic matter (ppm). Affects taste and health.</p>
                  </div>
                  
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="font-medium text-blue-800 flex items-center">
                      <Zap className="h-5 w-5 mr-2 text-blue-600" />
                      Chloramines
                    </h3>
                    <p className="mt-1 text-sm text-gray-600">Disinfectants used in water treatment (ppm). High levels can affect taste and smell.</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="font-medium text-blue-800 flex items-center">
                      <Activity className="h-5 w-5 mr-2 text-blue-600" />
                      Sulfate
                    </h3>
                    <p className="mt-1 text-sm text-gray-600">Naturally occurring substance (mg/L). High levels can cause a laxative effect.</p>
                  </div>
                  
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="font-medium text-blue-800 flex items-center">
                      <Zap className="h-5 w-5 mr-2 text-blue-600" />
                      Conductivity
                    </h3>
                    <p className="mt-1 text-sm text-gray-600">Measures water's ability to conduct electricity (μS/cm). Indicates dissolved ion concentration.</p>
                  </div>
                  
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="font-medium text-blue-800 flex items-center">
                      <Activity className="h-5 w-5 mr-2 text-blue-600" />
                      Organic Carbon
                    </h3>
                    <p className="mt-1 text-sm text-gray-600">Amount of carbon in organic compounds (mg/L). Affects disinfection byproducts.</p>
                  </div>
                  
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="font-medium text-blue-800 flex items-center">
                      <AlertTriangle className="h-5 w-5 mr-2 text-blue-600" />
                      Trihalomethanes
                    </h3>
                    <p className="mt-1 text-sm text-gray-600">Disinfection byproducts (μg/L) that can be harmful in high concentrations.</p>
                  </div>
                </div>
              </div>
            
            <div className="bg-gray-50 px-8 py-6 border-t border-gray-100">
              <div className="text-center">
                <p className="text-sm text-gray-500">
                  Need help interpreting your results? Contact our water quality experts.
                </p>
                <button
                  type="button"
                  className="btn btn-primary mt-4"
                  onClick={() => {
                    alert('Contact support feature coming soon!');
                  }}
                >
                  <svg className="btn-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Contact Support
                </button>
              </div>
            </div>
          </div>
          
          {/* Data Table Section */}
          {showTable && tableData.length > 0 && (
            <div className="mt-8">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">Uploaded Data Preview</h3>
                <button
                  onClick={() => downloadCSV(tableData, 'water_quality_data')}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  <svg className="-ml-1 mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Download as CSV
                </button>
              </div>
              <div className="overflow-x-auto bg-white rounded-lg shadow">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      {Object.keys(tableData[0]).map((key) => (
                        <th 
                          key={key}
                          scope="col" 
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          {key.replace(/_/g, ' ')}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {tableData.slice(0, 10).map((row, index) => (
                      <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        {Object.values(row).map((value, i) => (
                          <td key={i} className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                            {value}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
                {tableData.length > 10 && (
                  <div className="px-6 py-3 bg-gray-50 text-right text-sm text-gray-500">
                    Showing 10 of {tableData.length} records
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Validation;
