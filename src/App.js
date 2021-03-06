import React, {useCallback, useRef, useState, useReducer} from 'react';
import TodoTemplate from './components/TodoTemplate'
import TodoInsert from './components/TodoInsert'
import TodoList from './components/TodoList'

/**
 * 렉 유발 함수
const createBulkTodos = () => {
  const array = [];
  for(let a = 1; a <= 2500; a++){
    array.push({
      id:a,
      text:`할일 ${a}`,
      checked: false,
    });
  }
  return array;
}
 **/
const App = () => {
  const [todos, setTodos] = useState([]);
  // 고유값으로 사용될 id
  // ref를 사용하여 변수에 담기
  const nextId = useRef(1);

  const onInsert = useCallback(
    text => {
      const todo = {
        id: nextId.current,
        text,
        checked:false,
      };
      setTodos(todos => todos.concat(todo));
      nextId.current += 1;
    },
    [],
  );

  const onRemove = useCallback(
    id => {
        setTodos(todos => todos.filter(todo => todo.id !== id));
    },
    [],
  );

  const onToggle = useCallback(
    id => {
      setTodos(todos =>
        todos.map(todo =>
          todo.id === id ? { ...todo, checked: !todo.checked } : todo,
        ),
      );
    },
    [],
  );


  return (
    <TodoTemplate>
      <TodoInsert onInsert={onInsert}/>
      <TodoList todos={todos} onRemove={onRemove} onToggle={onToggle}/>
    </TodoTemplate>
  );
}

export default App;
