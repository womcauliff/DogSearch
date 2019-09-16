import React, { useState } from 'react';
import {
  Button,
  Col,
  Container,
  Row,
  Spinner,
  Input,
  InputGroup
} from 'reactstrap';
import { useAppHook } from './useAppHook/useAppHook';
import { Statuses } from './useAppHook/types';
import { sendFetchInit } from './useAppHook/actions';
import './App.css';
import BreedSelector from '../BreedSelector/BreedSelector';
const { ERROR, IDLE, PENDING } = Statuses;

const App: React.FC = () => {
  const [state, dispatch] = useAppHook();

  const [searchbar, setSearchbar] = useState('');
  const filteredBreeds = state.breeds.filter(breed =>
    breed.displayName.includes(searchbar)
  );

  return (
    <Container className="App">
      <Row className="header-row">
        <Col sm={12} md={6}>
          <header className="App-header">
            <h1 className="text-primary">Dogs!</h1>
          </header>
        </Col>
        <Col className="searchbar-col" sm={12} md={6}>
          <InputGroup>
            <Input
              type="text"
              name="searchbar"
              id="searchbar"
              placeholder="Search"
              value={searchbar}
              onChange={e => setSearchbar(e.target.value)}
            />
          </InputGroup>
        </Col>
      </Row>
      {state.fsmStatus === PENDING && (
        <Row>
          <Col>
            <Spinner color="primary" />
            <h2 className="loading-text">Loading Dog Breeds...</h2>
          </Col>
        </Row>
      )}
      {state.fsmStatus === ERROR && (
        <Row>
          <Col>
            <h2>Something went wrong while loading the dogs:</h2>
            <h3>{state.errorMessage}</h3>
            <Button
              color="danger"
              type="button"
              onClick={() => dispatch(sendFetchInit())}
            >
              Try Again?
            </Button>
          </Col>
        </Row>
      )}
      {state.fsmStatus === IDLE && <BreedSelector breeds={filteredBreeds} />}
    </Container>
  );
};

export default App;
