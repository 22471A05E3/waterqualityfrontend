import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Download, ArrowLeft } from 'lucide-react';

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = location;
  
  // If no state is provided, redirect to home
  React.useEffect(() => {
    if (!state) {
      navigate('/');
    }
  }, [state, navigate]);
  
  // Destructure with default empty object to prevent errors
  const { prediction, formData, tableData } = state || {};

  const downloadPDF = async () => {
    try {
      // Import jsPDF and autoTable directly
      const jsPDF = (await import('jspdf')).default;
      const autoTable = (await import('jspdf-autotable')).default;
      
      // Create a new PDF document with proper configuration
      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });
      
      // Manually initialize autoTable
      if (typeof autoTable === 'function') {
        // AutoTable is properly initialized as a function
        window.jspdf = window.jspdf || {};
        window.jspdf.jsPDF = window.jspdf.jsPDF || jsPDF;
      }
      
      // Add title
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(20);
      doc.setTextColor(37, 99, 235);
      doc.text('Water Quality Analysis Report', 105, 20, { align: 'center' });
      
      // Add date
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      doc.setTextColor(100, 116, 139);
      doc.text(`Generated on: ${new Date().toLocaleString()}`, 14, 30);
      
      // Add prediction
      doc.setFontSize(16);
      doc.setTextColor(0, 0, 0);
      doc.text('Prediction:', 14, 50);
      doc.setTextColor(37, 99, 235);
      doc.text(prediction, 50, 50);
      
      // Add data table
      if (tableData && tableData.length > 0) {
        const headers = [Object.keys(tableData[0]).map(key => 
          key.replace(/_/g, ' ').toUpperCase()
        )];
        
        const data = tableData.map(row => 
          Object.values(row).map(value => 
            value !== null && value !== undefined ? String(value) : 'N/A'
          )
        );
        
        // Use autoTable directly
        autoTable(doc, {
          head: headers,
          body: data,
          startY: 60,
          headStyles: {
            fillColor: [37, 99, 235],
            textColor: 255,
            fontStyle: 'bold',
            halign: 'center'
          },
          bodyStyles: {
            textColor: [0, 0, 0],
            fontSize: 10,
            cellPadding: 3,
          },
          alternateRowStyles: {
            fillColor: [241, 245, 249]
          },
          margin: { top: 10 },
          styles: { overflow: 'linebreak' },
          columnStyles: {
            0: { cellWidth: 'auto', minCellHeight: 10 },
            1: { cellWidth: 'auto' },
            // Add more column styles if needed
          },
          didDrawPage: function (data) {
            // Add page numbers
            const pageSize = doc.internal.pageSize;
            const pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight();
            doc.text(
              'Page ' + doc.internal.getNumberOfPages(),
              14,
              pageHeight - 10
            );
          }
        });
      } else if (formData) {
        const formDataArray = Object.entries(formData).map(([key, value]) => ({
          parameter: key.replace(/_/g, ' ').toUpperCase(),
          value: value !== null && value !== undefined ? String(value) : 'N/A'
        }));
        
        // Use autoTable directly
        autoTable(doc, {
          head: [['PARAMETER', 'VALUE']],
          body: formDataArray.map(item => [item.parameter, item.value]),
          startY: 60,
          headStyles: {
            fillColor: [37, 99, 235],
            textColor: 255,
            fontStyle: 'bold',
            halign: 'center'
          },
          bodyStyles: {
            textColor: [0, 0, 0],
            fontSize: 10,
            cellPadding: 3,
          },
          alternateRowStyles: {
            fillColor: [241, 245, 249]
          },
          margin: { top: 10 },
          columnStyles: {
            0: { cellWidth: 70, fontStyle: 'bold' },
            1: { cellWidth: 'auto' }
          }
        });
      }
      
      // Save the PDF
      doc.save('water_quality_report.pdf');
      
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please try again.');
    }
  };

  if (!prediction) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">No Results Found</h2>
          <p className="text-gray-600 mb-6">Please go back and validate water quality first.</p>
          <button
            onClick={() => navigate('/')}
            className="btn btn-primary inline-flex items-center"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Validation
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-500 px-6 py-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">Water Quality Analysis Results</h2>
              <button
                onClick={downloadPDF}
                className="btn btn-primary inline-flex items-center"
              >
                <Download className="w-4 h-4 mr-2" />
                Download Report
              </button>
            </div>
          </div>

          {/* Results */}
          <div className="p-6">
            <div className={`mb-8 p-4 rounded-lg ${
              prediction.toLowerCase().includes('good') ? 'bg-green-50 text-green-800' :
              prediction.toLowerCase().includes('moderate') ? 'bg-yellow-50 text-yellow-800' :
              'bg-red-50 text-red-800'
            }`}>
              <h3 className="text-lg font-semibold mb-2">Prediction: {prediction}</h3>
              <p className="text-sm">
                {prediction.toLowerCase().includes('good') 
                  ? 'The water quality is good and safe for consumption.'
                  : prediction.toLowerCase().includes('moderate')
                    ? 'The water quality is moderate. Some treatment may be required.'
                    : 'The water quality is poor. Treatment is recommended before consumption.'
                }
              </p>
            </div>

            {/* Data Table */}
            {tableData && tableData.length > 0 && (
              <div className="mt-8">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Analysis Data</h3>
                <div className="overflow-x-auto border rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        {Object.keys(tableData[0]).map((key) => (
                          <th 
                            key={key}
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            {key.replace(/_/g, ' ')}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {tableData.slice(0, 5).map((row, index) => (
                        <tr key={index}>
                          {Object.entries(row).map(([key, value]) => (
                            <td key={key} className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                              {value}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Form Data */}
            {formData && (
              <div className="mt-8">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Water Parameters</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(formData).map(([key, value]) => (
                    <div key={key} className="bg-gray-50 p-4 rounded-lg">
                      <div className="text-sm font-medium text-gray-500">
                        {key.replace(/_/g, ' ').toUpperCase()}
                      </div>
                      <div className="mt-1 text-lg font-semibold text-gray-900">
                        {value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
            <div className="flex justify-end">
              <button
                onClick={() => navigate('/')}
                className="btn btn-outline"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Validation
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;
