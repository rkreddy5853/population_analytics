import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Container, Table, FormControl, InputLabel, Typography, Paper } from '@mui/material';

const PageContainer = styled(Container)`
  padding-top: 50px;
  padding-bottom: 50px;
`;

const TitleText = styled(Typography)`
  font-size: 3rem;
  margin-bottom: 20px;
  text-align: center;
  color: black; /* Black title color */
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  background-color: #d5d3dc;
  transition: background-color 0.3s ease; /* Add transition effect */
  &:hover {
    background-color: #c1bfd6; /* Lighter background on hover */
  }
`;

const StyledTable = styled(Table)`
  width: 100%;
  margin-top: 20px;
  margin-bottom: 20px;
  border: 2px solid black; /* Black border color */
  border-collapse: collapse;
  background-color: #d5d3dc;
`;

const TableHeader = styled.th`
  background-color: black; /* Black background color */
  color: white;
  text-align: center;
  border: 1px solid black; /* Black border color */
  padding: 12px;
  background-color: #d5d3dc;
  transition: background-color 0.3s ease; /* Add transition effect */
  &:hover {
    background-color: #c1bfd6; /* Lighter background on hover */
  }
`;

const TableRow = styled.tr`
  &:hover {
    background-color: #ecf0f1; /* Lighter gray background on hover */
  }
`;

const TableCell = styled.td`
  padding: 12px;
  text-align: center; /* Center the text in the cell */
  border: 1px solid black; /* Black border color */
`;

const PaginationButtons = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const PaginationButton = styled.button`
  background-color: #333; /* Darker background color */
  color: #fff;
  border: none;
  padding: 10px 15px;
  margin: 0 5px;
  cursor: pointer;
  transition: background-color 0.3s ease; /* Add transition effect */
  &:hover {
    background-color: #555; /* Darker background on hover */
  }
`;

const Population = () => {
  const [countriesData, setCountriesData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [countriesPerPage] = useState(40);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('asc'); // 'asc' for ascending, 'desc' for descending
  const [sortColumn, setSortColumn] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/countries');
        setCountriesData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  // Sorting function
  const sortData = (column, order) => {
    const sortedData = [...countriesData].sort((a, b) => {
      if (column === 'population') {
        return order === 'asc' ? a.population - b.population : b.population - a.population;
      }
      return order === 'asc' ? a[column].localeCompare(b[column]) : b[column].localeCompare(a[column]);
    });
    setCountriesData(sortedData);
  };

  // Pagination
  const indexOfLastCountry = currentPage * countriesPerPage;
  const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;
  const currentCountries = countriesData.slice(indexOfFirstCountry, indexOfLastCountry);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(countriesData.length / countriesPerPage); i++) {
    pageNumbers.push(i);
  }

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSortToggle = (column) => {
    const newOrder = sortColumn === column && sortOrder === 'asc' ? 'desc' : 'asc';
    setSortOrder(newOrder);
    setSortColumn(column);
    sortData(column, newOrder);
  };

  return (
    <PageContainer>
      <TitleText variant="h1" component="div" color="black" gutterBottom>
        Population Analytics Dashboard
      </TitleText>
      <Typography variant="body1" component="p" align="center" color="textSecondary" paragraph>
        Explore country-by-country population data
      </Typography>
      <Paper elevation={3} style={{ padding: '20px' }}>
        <FormControl variant="outlined" style={{ marginBottom: '20px' }}>
          <InputLabel>Search by Country:</InputLabel>
          <FormControl
            type="text"
            placeholder="Enter country name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            label="Search by Country"
          />
         </FormControl>
        <StyledTable>
          <thead>
            <TableRow>
              <TableHeader>Sl. No</TableHeader>
              <TableHeader onClick={() => handleSortToggle('name')} style={{ cursor: 'pointer' }}>
                Country
              </TableHeader>
              <TableHeader onClick={() => handleSortToggle('population')} style={{ cursor: 'pointer' }}>
                Population
              </TableHeader>
              {/* Add more headers as needed */}
            </TableRow>
          </thead>
          <tbody>
            {currentCountries
              .filter((country) => country.name.toLowerCase().includes(searchTerm.toLowerCase()))
              .map((country, index) => (
                <TableRow key={country.alpha3Code}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{country.name}</TableCell>
                  <TableCell>{country.population}</TableCell>
                  {/* Add more cells as needed */}
                </TableRow>
              ))}
          </tbody>
        </StyledTable>
        <PaginationButtons>
          {pageNumbers.map((number) => (
            <PaginationButton key={number} onClick={() => handlePageClick(number)}>
              {number}
            </PaginationButton>
          ))}
        </PaginationButtons>
      </Paper>
    </PageContainer>
  );
};

export default Population;