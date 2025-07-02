import { useState } from 'react'
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd'
import './App.css'
import TaskModal from './components/TaskModal'

function App() {
  const [tasks, setTasks] = useState({
    'todo': [
      {
        id: 'task-1',
        title: 'default task(u can remove it)',
        description: 'This is a sample task to show the interface',
        priority: 'medium',
        createdAt: new Date().toISOString()
      }
    ],
    'in-progress': [],
    'completed': [],
    'add-button': [
      {
        id: 'add-button',
        title: '+ Add Task',
        isAddButton: true
      }
    ]
  })
  
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [targetColumn, setTargetColumn] = useState('')

  const handleDragEnd = (result) => {
    // This is destructuring the result object from react-beautiful-dnd's onDragEnd event
    // destination: where the dragged item was dropped (contains droppableId and index)
    // source: where the drag started from (contains droppableId and index)
    // draggableId: the ID of the item being dragged
    // This is used to handle drag and drop functionality for tasks between columns
    const { destination, source, draggableId } = result

    if (!destination) return

    // Handle dropping the add button
    if (draggableId === 'add-button') {
      // Only allow dropping on task columns
      if (['todo', 'in-progress', 'completed'].includes(destination.droppableId)) {
        setTargetColumn(destination.droppableId)
        setIsModalOpen(true)
      }
      return
    }

    // Handle task reordering
    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return
    }

    // Don't allow dropping regular tasks in the add-button area
    if (destination.droppableId === 'add-button') {
      return
    }

    const sourceColumn = source.droppableId
    const destColumn = destination.droppableId

    const newTasks = { ...tasks }
    const sourceItems = [...newTasks[sourceColumn]]
    const destItems = sourceColumn === destColumn ? sourceItems : [...newTasks[destColumn]]

    const [removed] = sourceItems.splice(source.index, 1)

    if (sourceColumn === destColumn) {
      sourceItems.splice(destination.index, 0, removed)
      newTasks[sourceColumn] = sourceItems
    } else {
      destItems.splice(destination.index, 0, removed)
      newTasks[sourceColumn] = sourceItems
      newTasks[destColumn] = destItems
    }

    setTasks(newTasks)
  }

  const addTask = (taskData) => {
    const newTask = {
      id: `task-${Date.now()}`,
      ...taskData,
      createdAt: new Date().toISOString()
    }

    setTasks(prev => ({
      ...prev,
      [targetColumn]: [...prev[targetColumn], newTask]
    }))

    setIsModalOpen(false)
    setTargetColumn('')
  }

  const deleteTask = (taskId, columnId) => {
    setTasks(prev => ({
      ...prev,
      [columnId]: prev[columnId].filter(task => task.id !== taskId)
    }))
  }

  const columns = [
    { id: 'todo', title: 'To Do', color: '#ff6b6b' },
    { id: 'in-progress', title: 'In Progress', color: '#4ecdc4' },
    { id: 'completed', title: 'Completed', color: '#45b7d1' }
  ]

  return (


    <div className="app">

          
      <div className="app-header" >
        <h1 className="app-title">Todo</h1>
        <p className="app-subtitle">pls drag this in any section to add task</p>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="board">
          {/* Add Button Area */}
          <Droppable droppableId="add-button">
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="add-button-area"
              >
                {tasks['add-button'].map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={`add-button-container ${snapshot.isDragging ? 'dragging' : ''}`}
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
                          {snapshot.isDragging ? 'Drop to add task' : 'Drag to add task'}
                        </span>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          
          <div className="columns">
            {columns.map((column) => (
              <div key={column.id} className="column">
                <div className="column-header" style={{ borderColor: column.color }}>
                  <h3 className="column-title">{column.title}</h3>
                  <span className="task-count">{tasks[column.id].length}</span>
                </div>

                <Droppable droppableId={column.id}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className={`column-content ${snapshot.isDraggingOver ? 'drag-over' : ''}`}
                    >
                      {tasks[column.id].map((task, index) => (
                        <Draggable key={task.id} draggableId={task.id} index={index}>
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={`task-card ${snapshot.isDragging ? 'dragging' : ''}`}
                            >
                              <div className="task-header">
                                <h4 className="task-title">{task.title}</h4>
                                <button
                                  className="delete-btn"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    deleteTask(task.id, column.id)
                                  }}
                                >
                                  ×
                                </button>
                              </div>
                              {task.description && (
                                <p className="task-description">{task.description}</p>
                              )}
                              <div className="task-footer">
                                <span className="task-priority" data-priority={task.priority}>
                                  {task.priority}
                                </span>
                                <span className="task-date">
                                  {new Date(task.createdAt).toLocaleDateString()}
                                </span>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            ))}
          </div>
        </div>
      </DragDropContext>

      <TaskModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setTargetColumn('')
        }}
        onSubmit={addTask}
        columnTitle={columns.find(col => col.id === targetColumn)?.title || ''}
      />
    </div>
  )
}

export default App
