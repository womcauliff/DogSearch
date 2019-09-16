import React from 'react';
import { Button, Card, CardImg, Col, Row, Spinner } from 'reactstrap';
import './BreedSelector.css';
import ButtonGrid from '../ButtonGrid';
import { Breed } from '../App/useAppHook/getAllBreeds';
import { Statuses } from './useBreedSelectorHook/types';
import { sendBreedButtonClicked } from './useBreedSelectorHook/actions';
import { useBreedSelectorHook } from './useBreedSelectorHook/useBreedSelectorHook';

interface BreedSelectorProps {
  breeds: Breed[];
}

/**
 * Manages the user's selection of breed buttons and the corresponding images.
 */
const BreedSelector: React.FC<BreedSelectorProps> = props => {
  const [state, dispatch] = useBreedSelectorHook(props.breeds);
  const { fsmStatus, imageURLs, selectedBreed } = state;

  const breedDisplayNames: string[] = props.breeds.map(
    breedObj => breedObj.displayName
  );

  return (
    <>
      {props.breeds.length === 0 ? (
        <Row>
          <Col>
            <h2>No Breed Matches Found.</h2>
          </Col>
        </Row>
      ) : (
        <ButtonGrid
          elementList={breedDisplayNames}
          selectedElement={state.selectedBreed}
          totalElements={12}
          numColumns={4}
          perColumn={3}
          onElementClick={(displayName: string) => {
            dispatch(sendBreedButtonClicked(displayName));
          }}
        />
      )}
      {fsmStatus === Statuses.PENDING && (
        <Row>
          <Col>
            <Spinner color="primary" />
            <h2 className="loading-text">Loading...</h2>
          </Col>
        </Row>
      )}
      {fsmStatus === Statuses.ERROR && (
        <Row>
          <Col>
            <h2>Something went wrong while loading the dogs:</h2>
            <h3>{state.errorMessage}</h3>
            <Button
              color="danger"
              type="button"
              onClick={() =>
                dispatch(sendBreedButtonClicked(state.selectedBreed))
              }
            >
              Try Again?
            </Button>
          </Col>
        </Row>
      )}
      {fsmStatus === Statuses.IDLE && selectedBreed !== '' && (
        <Row>
          <Col>
            <h2>
              Done!{' '}
              <span role="img" aria-label="dog face">
                🐶
              </span>
            </h2>
          </Col>
        </Row>
      )}
      {fsmStatus === Statuses.IDLE && (
        <Row className="image-grid bg-light">
          {imageURLs.slice(0, 51).map((imageURL, i) => (
            <Col sm="4" key={i}>
              <Card inverse>
                <CardImg width="100%" src={imageURL} alt="Card image cap" />{' '}
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </>
  );
};

export default BreedSelector;
