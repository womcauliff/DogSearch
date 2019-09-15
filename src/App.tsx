import React from 'react';
import { Button, Col, Container, Row, Spinner } from 'reactstrap';
import { useAppHook } from './customHooks/useAppHook/useAppHook';
import { Statuses } from './customHooks/useAppHook/types';
import { sendFetchInit } from './customHooks/useAppHook/actions';
import './App.css';
import ButtonGrid from './ButtonGrid/ButtonGrid';
const { ERROR, IDLE, PENDING } = Statuses;

const App: React.FC = () => {
  const [state, dispatch] = useAppHook();
  const breedDisplayNames: string[] = state.breeds.map(
    breedObj => breedObj.displayName
  );

  return (
    <Container className="App">
      <Row>
        <Col>
          <header className="App-header">
            <h1 className="text-primary">Dogs! {state.fsmStatus}</h1>
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
      {state.fsmStatus === IDLE && (
        <ButtonGrid
          elementList={breedDisplayNames}
          totalElements={12}
          numColumns={4}
          perColumn={3}
        />
      )}
    </Container>
  );
};

export default App;
