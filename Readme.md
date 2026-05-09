# Redux Complete Beginner Guide

## Table of Contents
1. [Why Redux?](#why-redux)
2. [Redux Core Concepts](#redux-core-concepts)
3. [State Mutation vs Immutation](#state-mutation-vs-immutation)
4. [Redux Fundamentals](#redux-fundamentals)
5. [Redux vs RTK (Redux Toolkit)](#redux-vs-rtk)
6. [Practical Examples](#practical-examples)
7. [Common Mistakes](#common-mistakes)

---

## Why Redux?

### Problem Without Redux

```javascript
// Without Redux - Props drilling problem
function GrandParent() {
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState('light');
  const [notifications, setNotifications] = useState([]);
  
  return (
    <Parent 
      user={user} 
      theme={theme} 
      notifications={notifications}
      setUser={setUser}
      setTheme={setTheme}
      setNotifications={setNotifications}
    />
  );
}

// Parent passes props down (even if it doesn't use them)
function Parent({ user, theme, notifications, setUser, setTheme, setNotifications }) {
  return (
    <Child 
      user={user} 
      theme={theme} 
      notifications={notifications}
      setUser={setUser}
      setTheme={setTheme}
      setNotifications={setNotifications}
    />
  );
}

// Finally uses the props
function Child({ user, theme, notifications }) {
  return <div>{user?.name} - {theme} - {notifications.length}</div>;
}
```

**Problems:**
- Props drilling (passing through multiple layers)
- Hard to maintain and refactor
- Difficult to track state changes
- Component coupling increases

### Solution With Redux

```javascript
// Redux centralized state
const store = createStore(rootReducer);

function GrandParent() {
  return <Child />; // No props needed!
}

function Child() {
  const user = useSelector(state => state.user);
  const theme = useSelector(state => state.theme);
  const notifications = useSelector(state => state.notifications);
  
  return <div>{user?.name} - {theme} - {notifications.length}</div>;
}
```

---

## Redux Core Concepts

### 1. **ACTION**

An action is a plain JavaScript object that describes WHAT happened.

```javascript
// Basic action
{
  type: 'ADD_TODO',
  payload: {
    id: 1,
    text: 'Learn Redux',
    completed: false
  }
}

// Action with just type (no payload)
{
  type: 'LOGOUT'
}

// Action creator (function that returns an action)
function addTodo(todoText) {
  return {
    type: 'ADD_TODO',
    payload: {
      text: todoText,
      id: Date.now(),
      completed: false
    }
  };
}

// Better practice - action creator
const addTodo = (todoText) => ({
  type: 'ADD_TODO',
  payload: {
    text: todoText,
    id: Date.now(),
    completed: false
  }
});
```

**Key Points:**
- Must have a `type` property
- Type is typically a STRING (uppercase by convention)
- Payload can be any data type (object, array, string, number)
- Actions are plain objects (no side effects)

### 2. **REDUCER**

A reducer is a **pure function** that takes current state and an action, then returns a new state.

```javascript
// Reducer signature
function reducer(previousState, action) {
  // Based on action.type, compute new state
  return newState;
}

// Simple reducer example
const initialState = {
  todos: [],
  loading: false
};

function todoReducer(state = initialState, action) {
  switch(action.type) {
    case 'ADD_TODO':
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            id: action.payload.id,
            text: action.payload.text,
            completed: false
          }
        ]
      };
    
    case 'REMOVE_TODO':
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload.id)
      };
    
    case 'TOGGLE_TODO':
      return {
        ...state,
        todos: state.todos.map(todo => 
          todo.id === action.payload.id 
            ? { ...todo, completed: !todo.completed }
            : todo
        )
      };
    
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload
      };
    
    default:
      return state;
  }
}
```

**Reducer Rules (PURE FUNCTION):**
1. Must be a pure function (same input = same output)
2. Cannot modify the original state
3. Cannot have side effects (API calls, timeouts, etc.)
4. Must return a new state object
5. Must have a default case that returns current state

### 3. **STORE**

The store is a single JavaScript object that holds the entire application state.

```javascript
import { createStore } from 'redux';

// Create store
const store = createStore(todoReducer);

// Get current state
const currentState = store.getState();
console.log(currentState);
// Output:
// {
//   todos: [],
//   loading: false
// }

// Subscribe to state changes
const unsubscribe = store.subscribe(() => {
  console.log('State changed!', store.getState());
});

// Stop listening to changes
unsubscribe();
```

### 4. **DISPATCH**

Dispatch sends an action to the reducer.

```javascript
// Dispatch action
store.dispatch(addTodo('Learn Redux'));
// Reducer receives action and returns new state

// Multiple dispatches
store.dispatch(addTodo('Learn RTK'));
store.dispatch(addTodo('Build Project'));
store.dispatch({ type: 'SET_LOADING', payload: true });
```

### 5. **PAYLOAD**

Payload is the data carried by the action.

```javascript
// Action without payload
{
  type: 'LOGOUT'
  // No payload
}

// Action with payload
{
  type: 'ADD_TODO',
  payload: {
    text: 'Learn Redux',
    id: 1234567890
  }
}

// Using payload in reducer
function todoReducer(state = initialState, action) {
  switch(action.type) {
    case 'ADD_TODO':
      // Access payload
      return {
        ...state,
        todos: [...state.todos, action.payload]
      };
    
    case 'UPDATE_TODO':
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload.id
            ? { ...todo, ...action.payload.updates }
            : todo
        )
      };
    
    default:
      return state;
  }
}
```

---

## State Mutation vs Immutation

### ❌ WRONG - State Mutation (Don't Do This!)

```javascript
// WRONG: Directly mutating state
function todoReducer(state = initialState, action) {
  switch(action.type) {
    case 'ADD_TODO':
      // ❌ WRONG - mutating the original state
      state.todos.push(action.payload);
      return state;
    
    case 'REMOVE_TODO':
      // ❌ WRONG - directly modifying array
      state.todos.splice(0, 1);
      return state;
    
    case 'UPDATE_TODO':
      // ❌ WRONG - directly modifying object
      const todo = state.todos.find(t => t.id === action.payload.id);
      todo.completed = !todo.completed;
      return state;
    
    default:
      return state;
  }
}
```

**Problems with mutation:**
- Redux can't detect state changes
- Time-travel debugging breaks
- Performance optimizations fail
- Multiple references point to same object

### ✅ CORRECT - State Immutation (Always Do This!)

```javascript
// ✅ CORRECT: Create new state objects

function todoReducer(state = initialState, action) {
  switch(action.type) {
    case 'ADD_TODO':
      // ✅ Create new array with spread operator
      return {
        ...state,
        todos: [
          ...state.todos,
          action.payload
        ]
      };
    
    case 'REMOVE_TODO':
      // ✅ Create new filtered array
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload.id)
      };
    
    case 'TOGGLE_TODO':
      // ✅ Create new array with mapped values
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload.id
            ? { ...todo, completed: !todo.completed }  // New object
            : todo
        )
      };
    
    case 'UPDATE_NESTED':
      // ✅ Deep copy for nested objects
      return {
        ...state,
        user: {
          ...state.user,
          profile: {
            ...state.user.profile,
            age: action.payload.age
          }
        }
      };
    
    default:
      return state;
  }
}
```

### Immutability Techniques

```javascript
// Technique 1: Spread Operator (Objects)
const oldUser = { name: 'John', age: 25 };
const newUser = { ...oldUser, age: 26 };

// Technique 2: Spread Operator (Arrays)
const oldTodos = [{ id: 1, text: 'Learn' }];
const newTodos = [...oldTodos, { id: 2, text: 'Build' }];

// Technique 3: Map (transforming arrays)
const todos = [
  { id: 1, done: false },
  { id: 2, done: false }
];
const updated = todos.map(todo =>
  todo.id === 1
    ? { ...todo, done: true }
    : todo
);

// Technique 4: Filter (removing items)
const todos = [{ id: 1 }, { id: 2 }, { id: 3 }];
const filtered = todos.filter(todo => todo.id !== 2);

// Technique 5: Array.concat (combining arrays)
const arr1 = [1, 2];
const arr2 = [3, 4];
const combined = arr1.concat(arr2); // or [...arr1, ...arr2]

// Technique 6: Object.assign
const original = { a: 1, b: 2 };
const updated = Object.assign({}, original, { b: 3 });
```

---

## Redux Fundamentals

### Complete Redux Setup

```javascript
import { createStore } from 'redux';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, useSelector, useDispatch } from 'react-redux';

// ===== 1. DEFINE INITIAL STATE =====
const initialState = {
  count: 0,
  todos: [],
  loading: false,
  error: null
};

// ===== 2. DEFINE ACTION TYPES =====
const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';
const ADD_TODO = 'ADD_TODO';
const REMOVE_TODO = 'REMOVE_TODO';

// ===== 3. CREATE ACTION CREATORS =====
export const increment = () => ({
  type: INCREMENT,
  payload: 1
});

export const decrement = () => ({
  type: DECREMENT,
  payload: 1
});

export const addTodo = (text) => ({
  type: ADD_TODO,
  payload: {
    id: Date.now(),
    text,
    completed: false
  }
});

export const removeTodo = (id) => ({
  type: REMOVE_TODO,
  payload: id
});

// ===== 4. CREATE REDUCER =====
function appReducer(state = initialState, action) {
  switch(action.type) {
    case INCREMENT:
      return {
        ...state,
        count: state.count + action.payload
      };
    
    case DECREMENT:
      return {
        ...state,
        count: state.count - action.payload
      };
    
    case ADD_TODO:
      return {
        ...state,
        todos: [...state.todos, action.payload]
      };
    
    case REMOVE_TODO:
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload)
      };
    
    default:
      return state;
  }
}

// ===== 5. CREATE STORE =====
const store = createStore(appReducer);

// ===== 6. REACT COMPONENT =====
function Counter() {
  const dispatch = useDispatch();
  const count = useSelector(state => state.count);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => dispatch(increment())}>+</button>
      <button onClick={() => dispatch(decrement())}>-</button>
    </div>
  );
}

function TodoApp() {
  const dispatch = useDispatch();
  const todos = useSelector(state => state.todos);
  const [input, setInput] = React.useState('');
  
  const handleAdd = () => {
    dispatch(addTodo(input));
    setInput('');
  };
  
  return (
    <div>
      <input 
        value={input}
        onChange={e => setInput(e.target.value)}
      />
      <button onClick={handleAdd}>Add Todo</button>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            {todo.text}
            <button onClick={() => dispatch(removeTodo(todo.id))}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ===== 7. WRAP APP WITH PROVIDER =====
function App() {
  return (
    <Provider store={store}>
      <Counter />
      <TodoApp />
    </Provider>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
```

---

## Redux vs RTK (Redux Toolkit)

### Comparison Table

| Feature | Redux | RTK |
|---------|-------|-----|
| **Boilerplate** | High (verbose) | Low (concise) |
| **Store Setup** | Manual | Automatic |
| **Immutability** | Manual (spread operator) | Automatic (Immer.js) |
| **Action Creators** | Write manually | Auto-generated |
| **Middleware** | Manual setup | Pre-configured |
| **DevTools** | Manual setup | Built-in |
| **Async Logic** | Redux-Thunk (manual) | createAsyncThunk |
| **Learning Curve** | Steeper | Easier |
| **File Size** | Larger | Smaller |

### Redux Toolkit (RTK) - Modern Approach

```javascript
// ===== RTK is the recommended way =====
import { createSlice, configureStore } from '@reduxjs/toolkit';

// ===== 1. CREATE SLICE (combines reducer + actions) =====
const todoSlice = createSlice({
  name: 'todos',
  initialState: {
    items: [],
    loading: false,
    error: null
  },
  reducers: {
    // Actions are auto-generated!
    addTodo: (state, action) => {
      // Can mutate directly - Immer.js handles immutability!
      state.items.push({
        id: Date.now(),
        text: action.payload,
        completed: false
      });
    },
    removeTodo: (state, action) => {
      state.items = state.items.filter(todo => todo.id !== action.payload);
    },
    toggleTodo: (state, action) => {
      const todo = state.items.find(t => t.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    }
  }
});

// ===== 2. EXPORT ACTIONS (auto-generated) =====
export const { addTodo, removeTodo, toggleTodo } = todoSlice.actions;

// ===== 3. CREATE STORE =====
const store = configureStore({
  reducer: {
    todos: todoSlice.reducer
  }
});

export default store;

// ===== 4. USE IN COMPONENTS (Same as Redux!) =====
function TodoApp() {
  const dispatch = useDispatch();
  const todos = useSelector(state => state.todos.items);
  
  const handleAdd = (text) => {
    dispatch(addTodo(text));
  };
  
  const handleRemove = (id) => {
    dispatch(removeTodo(id));
  };
  
  return (
    <div>
      {/* Same usage! */}
    </div>
  );
}
```

### Why RTK is Better

1. **Less Boilerplate**
   - Redux: 50+ lines for one feature
   - RTK: 20+ lines for same feature

2. **Built-in Immer.js**
   - Write mutating code (looks cleaner)
   - Automatically creates immutable updates

3. **Better DevTools Integration**
   - Redux: Manual setup
   - RTK: Automatic with configureStore

4. **Async Operations Easier**
   ```javascript
   // RTK makes async simple
   export const fetchTodos = createAsyncThunk(
     'todos/fetchTodos',
     async () => {
       const response = await fetch('/api/todos');
       return response.json();
     }
   );
   ```

---

## Practical Examples

### Example 1: Counter App

#### Redux Version (Verbose)
```javascript
// Actions
const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';

// Reducer
function counterReducer(state = 0, action) {
  switch(action.type) {
    case INCREMENT:
      return state + 1;
    case DECREMENT:
      return state - 1;
    default:
      return state;
  }
}

// Store
const store = createStore(counterReducer);

// Component
function Counter() {
  const [count, setCount] = React.useState(0);
  
  React.useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      setCount(store.getState());
    });
    return unsubscribe;
  }, []);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => store.dispatch({ type: INCREMENT })}>
        Increment
      </button>
      <button onClick={() => store.dispatch({ type: DECREMENT })}>
        Decrement
      </button>
    </div>
  );
}
```

#### RTK Version (Concise)
```javascript
// Slice
const counterSlice = createSlice({
  name: 'counter',
  initialState: 0,
  reducers: {
    increment: (state) => state + 1,
    decrement: (state) => state - 1
  }
});

export const { increment, decrement } = counterSlice.actions;

// Store
const store = configureStore({
  reducer: counterSlice.reducer
});

// Component
function Counter() {
  const dispatch = useDispatch();
  const count = useSelector(state => state);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => dispatch(increment())}>Increment</button>
      <button onClick={() => dispatch(decrement())}>Decrement</button>
    </div>
  );
}
```

### Example 2: Todo App with Async

#### RTK with Async Thunk
```javascript
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async action
export const fetchTodos = createAsyncThunk(
  'todos/fetchTodos',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('https://api.example.com/todos');
      if (!response.ok) throw new Error('Failed to fetch');
      return response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const todoSlice = createSlice({
  name: 'todos',
  initialState: {
    items: [],
    loading: false,
    error: null
  },
  reducers: {
    addTodo: (state, action) => {
      state.items.push(action.payload);
    },
    removeTodo: (state, action) => {
      state.items = state.items.filter(t => t.id !== action.payload);
    }
  },
  extraReducers: (builder) => {
    builder
      // Pending state
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // Fulfilled state
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      // Rejected state
      .addCase(fetchTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { addTodo, removeTodo } = todoSlice.actions;
export default todoSlice.reducer;

// Component
function TodoApp() {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector(state => state.todos);
  
  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);
  
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  
  return (
    <ul>
      {items.map(todo => (
        <li key={todo.id}>{todo.text}</li>
      ))}
    </ul>
  );
}
```

---

## Common Mistakes

### ❌ Mistake 1: Mutating State

```javascript
// WRONG
const todoReducer = (state = [], action) => {
  if (action.type === 'ADD_TODO') {
    state.push(action.payload); // ❌ Mutation!
    return state;
  }
  return state;
};

// CORRECT
const todoReducer = (state = [], action) => {
  if (action.type === 'ADD_TODO') {
    return [...state, action.payload]; // ✅ New array
  }
  return state;
};
```

### ❌ Mistake 2: Side Effects in Reducer

```javascript
// WRONG
const reducer = (state = {}, action) => {
  if (action.type === 'FETCH') {
    fetch('/api/data') // ❌ Side effect!
      .then(res => res.json())
      .then(data => console.log(data));
    return state;
  }
  return state;
};

// CORRECT - Use Thunks or Middleware
export const fetchData = createAsyncThunk('fetchData', async () => {
  const response = await fetch('/api/data');
  return response.json();
});
```

### ❌ Mistake 3: Not Using useSelector Properly

```javascript
// WRONG - Creates new object every render
const user = useSelector(state => ({
  name: state.user.name,
  age: state.user.age
})); // Re-renders every time because new object

// CORRECT - Use small selectors
const name = useSelector(state => state.user.name);
const age = useSelector(state => state.user.age);

// OR use reselect library
const selectUser = useSelector(createSelector(
  state => state.user,
  user => ({ name: user.name, age: user.age })
));
```

### ❌ Mistake 4: Action Type Typos

```javascript
// WRONG
store.dispatch({ type: 'ADD_TODO' }); // Dispatcher
// But reducer checks for
case 'add_todo': // No match!

// CORRECT - Use constants or RTK
export const ADD_TODO = 'ADD_TODO';

store.dispatch({ type: ADD_TODO });
case ADD_TODO:
```

### ❌ Mistake 5: Forgetting Default Case

```javascript
// WRONG
function reducer(state = initialState, action) {
  switch(action.type) {
    case 'ADD':
      return { ...state, count: state.count + 1 };
  }
  // No return - will return undefined!
}

// CORRECT
function reducer(state = initialState, action) {
  switch(action.type) {
    case 'ADD':
      return { ...state, count: state.count + 1 };
    default:
      return state; // ✅ Always return current state
  }
}
```

---

## Best Practices

1. **Use RTK (Redux Toolkit)**
   - Modern Redux standard
   - Less boilerplate
   - Better DevTools

2. **Keep Reducers Pure**
   - No side effects
   - No mutations
   - Same input = same output

3. **Use Selectors**
   ```javascript
   const selectUserName = state => state.user.name;
   const name = useSelector(selectUserName);
   ```

4. **Structure State Logically**
   ```javascript
   {
     auth: { user, token, loading },
     todos: { items, filter },
     ui: { theme, sidebarOpen }
   }
   ```

5. **Use Immer in RTK**
   - Write mutating code (looks clean)
   - RTK converts to immutable

6. **Handle Async with createAsyncThunk**
   - Loading, error, success states
   - Automatic handling of pending/fulfilled/rejected

---

## Summary

**Redux is:** A predictable state management library that uses a unidirectional data flow.

**Core concepts:**
- **Action**: Describes what happened (plain object)
- **Reducer**: Pure function that returns new state
- **Store**: Holds entire app state
- **Dispatch**: Sends action to reducer
- **Payload**: Data carried by action

**Immutability is critical:** Always create new state objects, never mutate.

**RTK is recommended:** Modern way to write Redux with less code and built-in best practices.

**Start with RTK:** Easier to learn, follows current best practices, widely used in industry.