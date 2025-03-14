import React, { useState } from 'react';
import '../styles/calendar.css'; 
import { useParams } from 'react-router-dom';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [tasks, setTasks] = useState({}); // Store tasks by date (e.g., { "5-January-2025": 'Event Description' })

  const param = useParams();
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const getDaysInMonth = (currentDate) => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (currentDate) => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    return new Date(year, month, 1).getDay();
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, currentDate.getDate()));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, currentDate.getDate()));
  };

  const handleAddTask = (day, id) => {
    const monthName = monthNames[currentDate.getMonth()];  // Get the current month name
    const year = currentDate.getFullYear();  // Get the current year
    const taskDateKey = `${day}-${monthName}-${year}`;  // Construct a unique key with day, month, and year
    console.log(taskDateKey);
    const taskDescription = prompt(`Enter the task description for ${day} ${monthName}:`);
    if (taskDescription) {
      
      setTasks({
        ...tasks,
        [taskDateKey]: taskDescription,  // Store the task with the unique key
      });
      
      // Now send the data to the server
      const data = {
        id: param.id,  // The id could be the project id, user id, or whatever you need to send
        taskDateKey: taskDateKey,
        taskDescription: taskDescription,
      };
  
      // Send POST request using fetch
      fetch('http://localhost:3000/api/taskadd', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),  // Send the data as JSON
      })
        .then(response => response.json())
        .then(result => {
          if (result.success) {
            console.log('Task added successfully');
          } else {
            console.log('Failed to add task:', result.error);
          }
        })
        .catch(error => {
          console.error('Error adding task:', error);
        });
    }
  };
  

  const handleDeleteTask = (taskDateKey) => {
    const data = {
      id: param.id,  // The id could be the project id, user id, or whatever you need to send
      taskDateKey: taskDateKey,
      taskDescription : tasks[taskDateKey],
    };
   
    // Send DELETE request to the backend
    fetch('http://localhost:3000/api/taskdelete', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),  // Send the data as JSON
    })
      .then(response => response.json())
      .then(result => {
        if (result.success) {
          console.log('Task deleted successfully');  // Corrected log message
        } else {
          console.log('Failed to delete task:', result.error);
        }
      })
      .catch(error => {
        console.error('Error deleting task:', error);  // Corrected log message
      });
  
    // Update the state to remove the task locally
    const updatedTasks = { ...tasks };
    delete updatedTasks[taskDateKey];
    setTasks(updatedTasks);
  };
  

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDayOfMonth = getFirstDayOfMonth(currentDate);
    const days = [];

    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="empty-day"></div>);
    }

    for (let i = 1; i <= daysInMonth; i++) {
      const isToday = i === currentDate.getDate() && currentDate.getMonth() === new Date().getMonth() && currentDate.getFullYear() === new Date().getFullYear();
      const taskDateKey = `${i}-${monthNames[currentDate.getMonth()]}-${currentDate.getFullYear()}`;
      const isEventDay = tasks[taskDateKey];
      
      days.push(
        <div
          key={i}
          className={`calendar-day ${isToday ? 'today' : ''} ${isEventDay ? 'event' : ''}`}
          onClick={() => handleAddTask(i)}
        >
          {i}
        </div>
      );
    }

    return days;
  };

  return (
    <>
      <div className="calendar-container">
        <div className="calendar-header">
          <button onClick={handlePrevMonth} className="calendar-button">
            &lt; Prev
          </button>
          <h2 className="calendar-month-year">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h2>
          <button onClick={handleNextMonth} className="calendar-button">
            Next &gt;
          </button>
        </div>
        <div className="calendar-grid">
          {daysOfWeek.map((day) => (
            <div key={day} className="calendar-day-of-week">
              {day}
            </div>
          ))}
          {renderCalendar()}
        </div>
      </div>

      <div className="task-list">
        List of Events
        {Object.keys(tasks).map((key) => (
          <div key={key} className="task">
            <strong>{key}:</strong> {tasks[key]}
            <button onClick={() => handleDeleteTask(key)}>Delete</button>
          </div>
        ))}
      </div>
    </>
  );
};

export default Calendar;
