import React from 'react';
import { Button, Col, Row } from 'reactstrap';
import './ButtonGrid.css';

interface ButtonGridProps {
  elementList: string[];
  numColumns: number;
  onElementClick: (
    element: string,
    e: React.MouseEvent<HTMLButtonElement>
  ) => void;
  perColumn: number;
  selectedElement: string;
  totalElements: number;
}
/**
 * Represents a grid of buttons.
 */
const ButtonGrid: React.FC<ButtonGridProps> = props => {
  const {
    elementList,
    totalElements,
    numColumns,
    onElementClick,
    perColumn,
    selectedElement
  } = props;
  const partialList = elementList.slice(0, totalElements);
  const columns = [];

  for (let colIndex = 0; colIndex < numColumns; colIndex += 1) {
    columns.push(
      <Col key={colIndex} className="btn-col" md={12 / numColumns}>
        {partialList
          .slice(colIndex * perColumn, colIndex * perColumn + perColumn)
          .map(element => (
            <Button
              key={element}
              color={element === selectedElement ? 'primary' : 'secondary'}
              type="button"
              onClick={e => onElementClick(element, e)}
            >
              {element}
            </Button>
          ))}
      </Col>
    );
  }

  return <Row className="btn-grid">{columns}</Row>;
};

export default ButtonGrid;
