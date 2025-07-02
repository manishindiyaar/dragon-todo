# Dragon Todo

A simple drag-and-drop todo application built with React. Organize your tasks across three columns: Todo, In Progress, and Completed.

## Features



- **Drag and Drop**: Move tasks between columns by dragging
- **Add Tasks**: Drag the "Add Task" button to any column to create new tasks
- **Task Details**: Each task has a title, description, and priority level
- **Three Columns**: Todo, In Progress, and Completed
- **Clean Interface**: Simple and focused design

## this is how it looks. ( i have added my fav bg color in each component)
![Dragon Todo App Screenshot](/actual_ui.png)



## How It Works

1. **Adding Tasks**: Drag the "+ Add Task" button from the bottom to any column (Todo, In Progress, or Completed)
2. **Moving Tasks**: Drag existing tasks between columns to update their status
3. **Task Information**: Each task shows its title, description, and priority level
4. **Deleting Tasks**: Remove tasks you no longer need

## Tech Stack

- **React 19** - UI framework
- **Vite** - Build tool and dev server
- **@hello-pangea/dnd** - Drag and drop functionality
- **Styled Components** - CSS-in-JS styling


## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/manishindiyaar/dragon-todo.git
cd dragon-todo
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and go to `http://localhost:5173`

## Project Structure

```
dragon-todo/
├── src/
│   ├── components/
│   │   ├── TaskModal.jsx          # Modal for adding/editing tasks
│   │   └── DraggableAddButton.jsx # Draggable add button component
│   ├── App.jsx                    # Main application component
│   ├── App.css                    # Application styles
│   ├── index.css                  # Global styles
│   └── main.jsx                   # Application entry point
├── public/                        # Static assets
├── package.json                   # Dependencies and scripts
└── vite.config.js                # Vite configuration
```

## How to Use

1. **Start with the default task** - There's a sample task to show you how it works
2. **Add new tasks** - Drag the "+ Add Task" button to any column
3. **Fill in task details** - Add title, description, and set priority
4. **Move tasks around** - Drag tasks between Todo, In Progress, and Completed
5. **Delete completed tasks** - Remove tasks you no longer need

## Development

The app uses React hooks for state management and @hello-pangea/dnd for drag-and-drop functionality. Tasks are stored in local state and organized by column.

### Key Components

- **App.jsx** - Main component handling drag-and-drop logic and task state
- **TaskModal.jsx** - Modal component for creating and editing tasks
- **DraggableAddButton.jsx** - Special draggable button for adding new tasks
