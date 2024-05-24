import React, { useState } from 'react';

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState('');
  const [selectedTodos, setSelectedTodos] = useState({});

  const addTodo = () => {
    if (input.trim() !== '') {
      setTodos([...todos, { id: Date.now(), text: input, completed: false }]);
      setInput('');
    }
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
    setSelectedTodos(prev => {
      const newSelected = { ...prev };
      delete newSelected[id];
      return newSelected;
    });
  };

  const startEdit = (id, text) => {
    setEditId(id);
    setEditText(text);
  };

  const confirmEdit = () => {
    setTodos(todos.map(todo => todo.id === editId ? { ...todo, text: editText } : todo));
    setEditId(null);
    setEditText('');
  };

  const toggleSelectTodo = (id) => {
    setSelectedTodos(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const toggleCompleteTodo = (id) => {
    setTodos(todos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo));
  };

  const activeTodos = todos.filter(todo => !todo.completed);
  const completedTodos = todos.filter(todo => todo.completed);

  return (
    <div className='max-w-lg mx-auto bg-white px-5 py-4'>
      <div className='text-center'>
        <h1 className='font-bold text-2xl'>Todo List</h1>
      </div>

      <div className='text-left mt-4'>
        <h1 className='font-bold text-2xl border-b-2 border-black'>Add Items</h1>
        <div className='flex justify-start items-center gap-5 mt-4'>
          <input
            type='text'
            className='w-full border-b-2 border-black outline-none'
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button className='bg-blue-500 text-white px-4 py-2 rounded' onClick={addTodo}>
            Add Todo
          </button>
        </div>
      </div>

      <div className='text-left mt-6'>
        <h1 className='font-bold text-2xl border-b-2 border-black'>Active Todos</h1>
        <ul className='mt-4'>
          {activeTodos.map((todo) => (
            <li key={todo.id} className='flex justify-between items-center mt-2'>
              <div className='flex items-center'>
              
                <input
                  type='checkbox'
                  className='mr-2'
                  checked={todo.completed}
                  onChange={() => toggleCompleteTodo(todo.id)}
                />
                {editId === todo.id ? (
                  <input
                    type='text'
                    className='w-full border-b-2 border-black outline-none'
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                  />
                ) : (
                  <span>{todo.text}</span>
                )}
              </div>
     
                <div className='flex gap-2'>
                  {editId === todo.id ? (
                    <button className='bg-green-500 text-white px-4 py-2 rounded' onClick={confirmEdit}>
                      Save
                    </button>
                  ) : (
                    <button className='bg-yellow-500 text-white px-4 py-2 rounded' onClick={() => startEdit(todo.id, todo.text)}>
                      Edit
                    </button>
                  )}
                  <button className='bg-red-500 text-white px-4 py-2 rounded' onClick={() => deleteTodo(todo.id)}>
                    Delete
                  </button>
                </div>
              
            </li>
          ))}
        </ul>
      </div>

      <div className='text-left mt-6'>
        <h1 className='font-bold text-2xl border-b-2 border-black'>Completed Todos</h1>
        <ul className='mt-4'>
          {completedTodos.map((todo) => (
            <li key={todo.id} className='flex justify-between items-center mt-2'>
              <div className='flex items-center'>
                <input
                  type='checkbox'
                  className='mr-2'
                  checked={!!selectedTodos[todo.id]}
                  onChange={() => toggleSelectTodo(todo.id)}
                />
                <input
                  type='checkbox'
                  className='mr-2'
                  checked={todo.completed}
                  onChange={() => toggleCompleteTodo(todo.id)}
                />
                {editId === todo.id ? (
                  <input
                    type='text'
                    className='w-full border-b-2 border-black outline-none'
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                  />
                ) : (
                  <span className='line-through'>{todo.text}</span>
                )}
              </div>
              {selectedTodos[todo.id] && (
                <div className='flex gap-2'>
                  {editId === todo.id ? (
                    <button className='bg-green-500 text-white px-4 py-2 rounded' onClick={confirmEdit}>
                      Save
                    </button>
                  ) : (
                    <button className='bg-yellow-500 text-white px-4 py-2 rounded' onClick={() => startEdit(todo.id, todo.text)}>
                      Edit
                    </button>
                  )}
                  <button className='bg-red-500 text-white px-4 py-2 rounded' onClick={() => deleteTodo(todo.id)}>
                    Delete
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Todo;
