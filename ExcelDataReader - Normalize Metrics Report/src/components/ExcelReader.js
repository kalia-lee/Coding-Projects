import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import PerformanceTable from './PerformanceTable';
import './ExcelReader.css';
import { Form, InputGroup } from "react-bootstrap";

function ExcelReader() {
  const [excelData, setExcelData] = useState([]);
  const [performaceAverageData, setPerformaceAverageData] = useState([]);
  const [error, setError] = useState("");

  const handleFileRead = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    const errorMessage = validateUserInput(file);
 
    if (errorMessage === "") {
      reader.onload = async (event) => {
        const data = event.target?.result;
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1, blankrows: false });
        
        jsonData.shift();
        setExcelData(jsonData);
      };
  
      reader.readAsArrayBuffer(file);
    } else {
      setError(errorMessage);
    }
  };

  const validateUserInput = (file) => {
    const extension = file?.type;
    const size = Math.round((file?.size / 1024));
    let error = ""; 

    if (!extension.startsWith("xls") && !extension.includes('csv')) {
      error = "Please check the file type";
    } else if (size > 2048) {
      error = "File too big. Please select a file less than 2MB";
    }

    return error;
  }

  useEffect(() => {
    setError("");
    let minMaxValues = [];
    let normalizedData = [];

    const calculateMinMaxOf2DIndex = () => {
      const minMax = [];

      // Index 0 will be our location name - we will be traversing this list as if it were a record in the data set
      minMax.push(["Location Name"]);
  
      // Grab the values in the column (i), and find the min / max 
      if(excelData.length > 0 ) {
        for(var i = 1; i < excelData[1].length; i++) {
          var values = excelData.map(e => e[i]);
          minMax.push({
            min: Math.min(...values),
            max: Math.max(...values),
          })
        }
        minMaxValues = minMax;
      }
    }
  
    const calculateNormalization = () => {
      for(var i = 0; i < excelData.length; i++) {
        for(var j = 1; j < excelData[i].length; j++) {
          const min = minMaxValues[j].min;
          const max = minMaxValues[j].max; 
  
          const normalizedValue = (excelData[i][j] - min) / (max - min);
  
          excelData[i][j] = normalizedValue;
        }
      }
      normalizedData = excelData;
    }
  
    const calculatePerformaceAverageData = () => {
      let performaceAverages = [];
  
      for(var i = 0; i < normalizedData.length; i++) {
        let name = normalizedData[i][0];
        // slice - Do not calculate the "Location Name"
        let sum = normalizedData[i].slice(1).reduce((a,b) => a + b );
        let average = (sum / (normalizedData[i].length - 1)).toFixed(4);
        performaceAverages.push({
          "id": i,
          "locationName": name,
          "average": average
        })
      }
  
      setPerformaceAverageData(performaceAverages.sort((a,b) => b.average - a.average));
    }
    calculateMinMaxOf2DIndex();
    calculateNormalization();
    calculatePerformaceAverageData();
  }, [excelData]); 

  return (
    <div>
      <div className='upload'>
        <b>Upload Data</b>
        <input type="file" onChange={handleFileRead} />
        {error && (
          <span style={{marginTop: '10px'}}className="label error">{error}</span>
        )}
      </div>
      {performaceAverageData && (
        <PerformanceTable data={performaceAverageData}/>
      )}
    </div>
  );
}

export default ExcelReader;
