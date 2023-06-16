import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import './App.css';

const BASE_URL = 'https://my-json-server.typicode.com/Llang8/cars-api';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;

  input {
    padding: 10px;
    margin-bottom: 10px;
    width: 300px;
    border: 1px solid #ccc;
  }

  button {
    padding: 10px 20px;
    background-color: #4caf50;
    color: #fff;
    border: none;
    cursor: pointer;
  }
`;

const CarContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 20px;
  margin-top: 20px;
`;

const CarCard = styled.div`
  border: 1px solid #ccc;
  padding: 20px;
  text-align: left;

  h3 {
    margin-bottom: 10px;
  }

  p {
    margin-bottom: 5px;
  }
`;

const Home = () => {
  return (
    <Container>
      <Title>Welcome to Matrix Car Dashboard</Title>
      <Link to="/signup">
        <button>Sign Up</button>
      </Link>
      <Link to="/signin">
        <button>Sign In</button>
      </Link>
      <Link to="/carlist">
        <button>Car Inventory</button>
      </Link>
    </Container>
  );
};

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BASE_URL}/users`, {
        username,
        password,
      });
      console.log(response.data); // Assuming the response contains user information or token
      // Reset form inputs
      setUsername('');
      setPassword('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
      <Title>Sign Up</Title>
      <Form onSubmit={handleSignUp}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Sign Up</button>
      </Form>
      <p>
        Already have an account? <Link to="/signin">Sign In</Link>
      </p>
    </Container>
  );
};

const SignIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BASE_URL}/login`, {
        username,
        password,
      });
      console.log(response.data); // Assuming the response contains user information or token
      // Reset form inputs
      setUsername('');
      setPassword('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
      <Title>Sign In</Title>
      <Form onSubmit={handleSignIn}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Sign In</button>
      </Form>
      <p>
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </p>
    </Container>
  );
};

const CarList = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/cars`);
        setCars(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCars();
  }, []);

  return (
    <Container>
      <Title>Available Cars</Title>
      <CarContainer>
        {cars.map((car) => (
          <CarCard key={car.id}>
            <h3>{car.make}</h3>
            <p>Model: {car.modelName}</p>
            <p>Year: {car.year}</p>
            <p>Price: ${car.price}</p>
          </CarCard>
        ))}
      </CarContainer>
    </Container>
  );
};

const App = () => {
  return (
    <Router>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/carlist">Car Inventory</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/carlist" element={<CarList />} />
      </Routes>
    </Router>
  );
};

export default App;

