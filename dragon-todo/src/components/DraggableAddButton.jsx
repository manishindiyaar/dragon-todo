import { Draggable } from 'react-beautiful-dnd'

const DraggableAddButton = ({ onAddClick }) => {
  return (
    <Draggable draggableId="add-button" index={0}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`add-button-container ${snapshot.isDragging ? 'dragging' : ''}`}
          onClick={onAddClick}
        >
          <div className="add-button iconBackground">
            <svg 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                d="M12 5V19M5 12H19" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <span className="add-button-text">
            {snapshot.isDragging ? 'Drop to add task' : 'Click or drag to add task'}
          </span>
        </div>
      )}
    </Draggable>
  )
}

export default DraggableAddButton
