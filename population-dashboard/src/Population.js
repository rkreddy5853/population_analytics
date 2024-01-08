// Population.js

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Container, Table, FormControl, InputLabel, Typography, Paper } from '@mui/material';
import { Link } from 'react-router-dom';
import { fetchData } from './api';

const PageContainer = styled(Container)`
  padding-top: 50px;
  padding-bottom: 50px;
`;

const TitleText = styled(Typography)`
  font-size: 3rem;
  margin-bottom: 20px;
  text-align: center;
  color: black;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  background-color: #d5d3dc;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #c1bfd6;
  }
`;

const StyledTable = styled(Table)`
  width: 100%;
  margin-top: 20px;
  margin-bottom: 20px;
  border: 2px solid black;
  border-collapse: collapse;
  background-color: #d5d3dc;
`;

const TableHeader = styled.th`
  background-color: black;
  color: black;
  text-align: center;
  border: 1px solid black;
  padding: 12px;
  background-color: #d5d3dc;
`;

const TableRow = styled.tr`
  &:hover {
    background-color: #ecf0f1;
  }
`;

const TableCell = styled.td`
  padding: 12px;
  text-align: center;
  border: 1px solid black;
`;

const PaginationButtons = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const PaginationButton = styled.button`
  background-color: black;
  color: #fff;
  border: none;
  padding: 10px 15px;
  margin: 0 5px;
  cursor: pointer;
`;

const AnalyticsLink = styled(Link)`
  text-decoration: none;
  color: black;
  margin: 20px;
  font-size: 1.5rem;
  padding: 10px;
  border: 2px solid black;
  border-radius: 5px;

  &:hover {
    background-color: #c1bfd6;
  }
`;

const Population = () => {
  const [countriesData, setCountriesData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [countriesPerPage] = useState(40);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [sortColumn, setSortColumn] = useState(null);

  useEffect(() => {
    const fetchDataAndSetState = async () => {
      const data = await fetchData();
      setCountriesData(data);
    };

    fetchDataAndSetState();
  }, []);

  // Pagination
  const indexOfLastCountry = currentPage * countriesPerPage;
  const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;
  const currentCountries = countriesData.slice(indexOfFirstCountry, indexOfLastCountry);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(countriesData.length / countriesPerPage); i++) {
    pageNumbers.push(i);
  }

  // ... (Rest of the code)

  return (
    <PageContainer>
      <TitleText variant="h1" component="div" color="black" gutterBottom>
        Population Analytics Dashboard
      </TitleText>
      <AnalyticsLink to="/analytics">Go to Analytics</AnalyticsLink>
      <Typography variant="body1" component="p" align="center" color="textSecondary" paragraph>
        Explore country-by-country population data
      </Typography>
      <Paper elevation={3} style={{ padding: '20px' }}>
        {/* ... (Search and Sorting UI components) */}
        <StyledTable>
          <thead>
            <TableRow>
              <TableHeader>Sl. No</TableHeader>
              <TableHeader>Country</TableHeader>
              <TableHeader>Population</TableHeader>
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
                </TableRow>
              ))}
          </tbody>
        </StyledTable>
        <PaginationButtons>
          {pageNumbers.map((number) => (
            <PaginationButton key={number} onClick={() => setCurrentPage(number)}>
              {number}
            </PaginationButton>
          ))}
        </PaginationButtons>
      </Paper>
    </PageContainer>
  );
};
export default Population;