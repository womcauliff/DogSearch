import React from 'react';
import { Button, Col, Container, Row, Spinner } from 'reactstrap';
import { useAppHook } from './useAppHook/useAppHook';
import { Statuses } from './useAppHook/types';
import { sendFetchInit } from './useAppHook/actions';
import './App.css';
import BreedSelector from '../BreedSelector/BreedSelector';
const { ERROR, IDLE, PENDING } = Statuses;

const App: React.FC = () => {
  const [state, dispatch] = useAppHook();

  return (
    <Container className="App">
      <Row>
        <Col>
          <header className="App-header">
            <h1 className="text-primary">Dogs!</h1>
          </header>
        </Col>
        <Col>
          <div className="searchbar">
            <input
              type="text"
              name="searchbar"
              id="searchbar"
              placeholder="Search"
            />
          </div>
        </Col>
      </Row>
      {state.fsmStatus === PENDING && (
        <Row>
          <Col>
            <Spinner color="primary" />
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
      {state.fsmStatus === IDLE && <BreedSelector breeds={state.breeds} />}
    </Container>
  );
};

export default App;