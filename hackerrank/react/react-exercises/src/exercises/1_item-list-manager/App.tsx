/** item list manager */
import { useState } from 'react'
// import './App.css'

function App() {
const [items, setItems] = useState<string[]>([]);
const [input, setInput] = useState<string>("");

console.log(items);

const handleAddItem = (input: string) => {
    // TODO: Add logic to add input to items list
    if(input.length > 0){
    setItems((prev) => {
        return [...prev, input]
    })
    setInput("");
    }
};

return (
    <>
    {/* <h8k-navbar header="Item List Manager"></h8k-navbar> */}
    <div className="App">
        <h3>Item List</h3>

        <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter item"
        data-testid="input-field"
        />

        <button onClick={() => handleAddItem(input)} data-testid="add-button">
        Add Item
        </button>

        <ul data-testid="item-list">
        {items.map((item, index) => (
            <li key={index} data-testid="list-item">
            {item}
            </li>
        ))}
        </ul>
    </div>
    </>
)
}

export default App