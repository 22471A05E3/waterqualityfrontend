import React, { useState } from 'react';
import axios from 'axios';
import { Upload, FileText, Activity, Droplet, Thermometer, CloudRain, Wind, Zap, AlertTriangle } from 'lucide-react';

const Validation = () => {
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

  const validateWaterQuality = async (e) => {
    if (e) e.preventDefault();
    
    setLoading(true);
    setError(null);
    setPrediction(null);

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      let predictionResult;
      
      if (activeTab === 'form') {
        // Validate form data
        const ph = parseFloat(formData.ph || 0);
        if (ph >= 6.5 && ph <= 8.5) predictionResult = 'Good';
        else if (ph >= 6.0 && ph <= 9.0) predictionResult = 'Moderate';
        else predictionResult = 'Poor';
      } else {
        // Validate file data
        if (!datasetData || datasetData.length === 0) {
          throw new Error('Please upload a dataset or use the default dataset');
        }
        
        const ph = parseFloat(datasetData[0].ph || 0);
        if (ph >= 6.5 && ph <= 8.5) predictionResult = 'Good';
        else if (ph >= 6.0 && ph <= 9.0) predictionResult = 'Moderate';
        else predictionResult = 'Poor';
      }
      
      setPrediction(predictionResult);
      
      /* Actual API Integration (commented out)
      const dataToSend = activeTab === 'form' ? formData : datasetData;
      const response = await axios.post('http://localhost:5000/validate', dataToSend);
      setPrediction(response.data.prediction);
      */
      
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
    <div className="space-y-1">
      <div className="flex items-center text-sm text-gray-600">
        {React.cloneElement(icon, { className: 'h-4 w-4 mr-2 text-blue-500' })}
        {label}
      </div>
      <div className="relative rounded-md shadow-sm">
        <input
          type={type}
          name={name}
          value={formData[name]}
          onChange={handleInputChange}
          step={step}
          className="block w-full rounded-lg border-gray-300 pl-3 pr-12 py-2.5 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm border"
          placeholder={`Enter ${label.split(' ')[0].toLowerCase()}`}
          required
        />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-3 bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
            Water Quality Validation
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Enter water quality parameters manually or upload a dataset to validate water quality and ensure safe consumption
          </p>
        </div>
        
        <div className="space-y-8">
          <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100">
            <div className="border-b border-gray-200">
              <nav className="flex -mb-px">
                <button
                  onClick={() => setActiveTab('form')}
                  className={`${activeTab === 'form' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} py-4 px-6 text-center border-b-2 font-medium text-sm flex-1 flex items-center justify-center space-x-2`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span>Manual Input</span>
                </button>
                <button
                  onClick={() => setActiveTab('file')}
                  className={`${activeTab === 'file' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} py-4 px-6 text-center border-b-2 font-medium text-sm flex-1 flex items-center justify-center space-x-2`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  <span>Upload File</span>
                </button>
              </nav>
            </div>
            
            <div className="p-8">
              {activeTab === 'form' ? (
                // Manual Input Form
                <form onSubmit={validateWaterQuality} className="space-y-6">
                  <div className="space-y-1">
                    <h3 className="text-lg font-medium text-gray-900">Water Quality Parameters</h3>
                    <p className="text-sm text-gray-500">Enter the water quality measurements below</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-5">
                      {renderInputField('ph', 'pH Level', <Droplet />, 'number', '0.1')}
                      {renderInputField('hardness', 'Hardness (mg/L)', <Thermometer />)}
                      {renderInputField('solids', 'Total Dissolved Solids (ppm)', <CloudRain />)}
                      {renderInputField('chloramines', 'Chloramines (ppm)', <Zap />, 'number', '0.1')}
                    </div>
                    <div className="space-y-5">
                      {renderInputField('sulfate', 'Sulfate (mg/L)', <Activity />, 'number', '0.1')}
                      {renderInputField('conductivity', 'Conductivity (μS/cm)', <Zap />)}
                      {renderInputField('organic_carbon', 'Organic Carbon (mg/L)', <Activity />, 'number', '0.1')}
                      {renderInputField('trihalomethanes', 'Trihalomethanes (μg/L)', <AlertTriangle />, 'number', '0.1')}
                      {renderInputField('turbidity', 'Turbidity (NTU)', <Droplet />, 'number', '0.1')}
                    </div>
                  </div>
                  
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full flex justify-center items-center px-6 py-3.5 border border-transparent rounded-xl shadow-sm text-base font-semibold text-white bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:-translate-y-0.5"
                    >
                      {loading ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Validating...
                        </>
                      ) : (
                        <>
                          <svg className="-ml-1 mr-3 h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          Validate Water Quality
                        </>
                      )}
                    </button>
                  </div>
                </form>
              ) : (
                // File Upload Section
                <div className="space-y-8">
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <h3 className="text-lg font-medium text-gray-900">Upload Water Quality Data</h3>
                      <p className="text-sm text-gray-500">Upload a CSV or JSON file containing water quality measurements</p>
                    </div>
                    
                    <div className="mt-1 flex justify-center px-6 pt-10 pb-10 border-2 border-dashed border-gray-300 rounded-2xl hover:border-blue-400 transition-colors duration-200">
                      <div className="text-center">
                        <div className="mx-auto w-12 h-12 flex items-center justify-center rounded-full bg-blue-50 mb-4">
                          <Upload className="h-6 w-6 text-blue-500" />
                        </div>
                        <div className="flex flex-col sm:flex-row items-center justify-center text-sm text-gray-600">
                          <label
                            htmlFor="file-upload"
                            className="relative cursor-pointer rounded-md font-semibold text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                          >
                            <span>Upload a file</span>
                            <input 
                              id="file-upload" 
                              name="file-upload" 
                              type="file" 
                              className="sr-only" 
                              accept=".csv,.json"
                              onChange={handleFileChange}
                            />
                          </label>
                          <p className="mt-2 sm:mt-0 sm:ml-1">or drag and drop</p>
                        </div>
                        <p className="mt-1 text-xs text-gray-500">CSV or JSON up to 10MB</p>
                        
                        {selectedFile && (
                          <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-100">
                            <div className="flex items-center">
                              <FileText className="h-5 w-5 text-green-500 mr-2" />
                              <span className="text-sm font-medium text-green-800 truncate">
                                {selectedFile.name}
                              </span>
                              <span className="ml-2 text-xs text-green-600">
                                {(selectedFile.size / 1024).toFixed(1)} KB
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                    <button
                      type="button"
                      onClick={handleUseDefaultDataset}
                      className="w-full sm:w-auto flex items-center justify-center px-4 py-2.5 border border-gray-300 shadow-sm text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                    >
                      <svg className="-ml-1 mr-2 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      Use Sample Dataset
                    </button>
                    
                    <button
                      type="button"
                      disabled={!selectedFile && !useDefaultDataset}
                      onClick={validateWaterQuality}
                      className={`w-full sm:w-auto flex items-center justify-center px-6 py-2.5 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white ${!selectedFile && !useDefaultDataset ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200`}
                    >
                      <svg className="-ml-1 mr-2 h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Validate Dataset
                    </button>
                  </div>
                </div>
              )}
            </div>
            
            {prediction && (
              <div className={`p-6 ${getPredictionColor()}`}>
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-white">
                      Water Quality: {prediction}
                    </h3>
                  </div>
                </div>
              </div>
            )}
            
            {(prediction && (prediction.toLowerCase().includes('poor') || prediction.toLowerCase().includes('very poor'))) && (
              <div className="mt-6 p-4 bg-red-50 rounded-lg border border-red-100">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">Attention Required</h3>
                    <div className="mt-1 text-sm text-red-700">
                      <p>This water is not safe for consumption without proper treatment. Please consider additional purification methods.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {datasetData && datasetData.length > 1 && (
              <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-100">
                <p className="text-sm text-blue-700">
                  Showing results for the first entry in the dataset. {datasetData.length - 1} more entries available.
                </p>
              </div>
            )}
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
                    <p className="mt-1 text-sm text-gray-600">Measures carbon bound in organic compounds (mg/L). Can affect water treatment processes.</p>
                  </div>
                  
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="font-medium text-blue-800 flex items-center">
                      <AlertTriangle className="h-5 w-5 mr-2 text-blue-600" />
                      Trihalomethanes
                    </h3>
                    <p className="mt-1 text-sm text-gray-600">Disinfection byproducts (μg/L). Long-term exposure may have health risks.</p>
                  </div>
                  
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="font-medium text-blue-800 flex items-center">
                      <Droplet className="h-5 w-5 mr-2 text-blue-600" />
                      Turbidity
                    </h3>
                    <p className="mt-1 text-sm text-gray-600">Measures water clarity (NTU). High levels can indicate contamination.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
                </button>
            </div>

            {(prediction.toLowerCase().includes('poor') || prediction.toLowerCase().includes('very poor')) && (
              <div className="mt-6 p-4 bg-red-50 rounded-lg border border-red-100">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">Attention Required</h3>
                    <div className="mt-1 text-sm text-red-700">
                      <p>This water is not safe for consumption without proper treatment. Please consider additional purification methods.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {datasetData && datasetData.length > 1 && (
              <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-100">
                <p className="text-sm text-blue-700">
                  Showing results for the first entry in the dataset. {datasetData.length - 1} more entries available.
                </p>
              </div>
            )}
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
            </div>
            
            <div className="bg-gray-50 px-8 py-6 border-t border-gray-100">
              <div className="text-center">
                <p className="text-sm text-gray-500">
                  Need help interpreting your results? Contact our water quality experts.
                </p>
    </div>
    
    <div className="mt-1 flex justify-center px-6 pt-10 pb-10 border-2 border-dashed border-gray-300 rounded-2xl hover:border-blue-400 transition-colors duration-200">
      <div className="text-center">
        <div className="mx-auto w-12 h-12 flex items-center justify-center rounded-full bg-blue-50 mb-4">
          <Upload className="h-6 w-6 text-blue-500" />
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center text-sm text-gray-600">
          <label
            htmlFor="file-upload"
            className="relative cursor-pointer rounded-md font-semibold text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
          >
            <span>Upload a file</span>
            <input 
              id="file-upload" 
              name="file-upload" 
              type="file" 
              className="sr-only" 
              accept=".csv,.json"
              onChange={handleFileChange}
            />
          </label>
          <p className="mt-2 sm:mt-0 sm:ml-1">or drag and drop</p>
        </div>
        <p className="mt-1 text-xs text-gray-500">CSV or JSON up to 10MB</p>
        
        {selectedFile && (
          <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-100">
            <div className="flex items-center">
              <FileText className="h-5 w-5 text-green-500 mr-2" />
              <span className="text-sm font-medium text-green-800 truncate">
                {selectedFile.name}
              </span>
              <span className="ml-2 text-xs text-green-600">
                {(selectedFile.size / 1024).toFixed(1)} KB
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  </div>

  <div className="relative">
    <div className="absolute inset-0 flex items-center" aria-hidden="true">
      <div className="w-full border-t border-gray-200"></div>
    </div>
    <div className="relative flex justify-center">
      <span className="px-3 bg-white text-sm font-medium text-gray-500">OR</span>
    </div>
  </div>

  <div>
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

  {(prediction.toLowerCase().includes('poor') || prediction.toLowerCase().includes('very poor')) && (
    <div className="mt-6 p-4 bg-red-50 rounded-lg border border-red-100">
      <div className="flex">
        <div className="flex-shrink-0">
          <svg className="h-5 w-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-red-800">Attention Required</h3>
          <div className="mt-1 text-sm text-red-700">
            <p>This water is not safe for consumption without proper treatment. Please consider additional purification methods.</p>
          </div>
        </div>
      </div>
    </div>
  )}
  
  {datasetData && datasetData.length > 1 && (
    <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-100">
      <p className="text-sm text-blue-700">
        Showing results for the first entry in the dataset. {datasetData.length - 1} more entries available.
      </p>
    </div>
  )}
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
  </div>
  
  <div className="bg-gray-50 px-8 py-6 border-t border-gray-100">
    <div className="text-center">
      <p className="text-sm text-gray-500">
        Need help interpreting your results? Contact our water quality experts.
      </p>
      <button className="mt-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
        Contact Support
      </button>
    </div>
  </div>
</div>
export default Validation;
