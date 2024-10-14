import React from "react";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";

const TableForm = ({
  description,
  setDescription,
  quantity,
  setQuantity,
  price,
  setPrice,
  amount,
  setAmount,
  list,
  setList,
  total,
  setTotal,
  totalWithGst,
  setTotalWithGst, // new prop for setting total with GST
}) => {
  const [isEditing, setEditing] = useState(false);

  //Submit Form Function
  const handleSubmit = (e) => {
    e.preventDefault();

    const newItems = {
      id: uuidv4(),
      description,
      quantity,
      price,
      amount,
    };
    setDescription("");
    setQuantity("");
    setPrice("");
    setAmount("");
    setList([...list, newItems]);
    console.log(list);
  };

  //calculate item amount function
  useEffect(() => {
    const calculateAmount = () => {
      setAmount(quantity * price);
    };
    calculateAmount();
  }, [price, quantity, setAmount]);

  // calculate Total amount of item in table
  useEffect(() => {
    let sum = list.reduce((acc, row) => acc + (row.amount || 0), 0); // Calculate sum of amounts
    setTotal(sum);
    setTotalWithGst(sum * 1.18); // Calculate total with GST (18%)
  }, [list, setTotal, setTotalWithGst]); // Include setTotalWithGst in dependency array

  //Edit Button
  const editrow = (id) => {
    const editingRow = list.find((row) => row.id === id);
    setList(list.filter((row) => row.id !== id));
    setEditing(true);
    setDescription(editingRow.description);
    setQuantity(editingRow.quantity);
    setPrice(editingRow.price);
  };

  //Delete Function
  const deleteRow = (id) => {
    setList(list.filter((row) => row.id !== id));
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <label htmlFor="description">Item Description</label>
          <input
            type="text"
            name="description"
            id="description"
            placeholder="Item Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="quantity">Quantity</label>
          <input
            type="text"
            name="quantity"
            id="quantity"
            placeholder="quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="price">Price</label>
          <input
            type="text"
            name="price"
            id="price"
            placeholder="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="amount">Amount</label>
          <p>{amount}</p>
        </div>

        <button
          type="submit"
          className="mb-5 bg-blue-500 text-white font-bold py-2 px-8 rounded shadow border-2 border-blue-500 hover:bg-transparent hover:text-blue-500 transition-all duration-300"
        >
          Add Item
        </button>
      </form>

      {/* Table item */}
      <table width="100%" className="mb-10">
        <thead>
          <tr className="bg-gray-100 p-1">
            <td className="font-bold">Description</td>
            <td className="font-bold">Quantity</td>
            <td className="font-bold">Price</td>
            <td className="font-bold">Amount</td>
          </tr>
        </thead>
        <tbody>
          {list.map(({ id, description, quantity, price, amount }) => (
            <tr key={id}>
              <td>{description}</td>
              <td>{quantity}</td>
              <td>{price}</td>
              <td className="amount">{amount}</td>
              <td>
                <button onClick={() => deleteRow(id)}>
                  <AiOutlineDelete className="text-red-500 font-bold text-xl" />
                </button>
              </td>
              <td>
                <button onClick={() => editrow(id)}>
                  <AiOutlineEdit className="text-green-500 font-bold text" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex flex-col items-end mt-4">
        <div className="flex justify-between w-full text-gray-800">
          <span className="font-bold text-lg">Total:</span>
          <span className="text-lg">{total.toLocaleString()}/-</span>
        </div>
        <div className="flex justify-between w-full text-gray-600">
          <span className="font-medium">Total with GST (18%):</span>
          <span className="text-lg">{totalWithGst.toLocaleString()}/-</span>
        </div>
      </div>
    </>
  );
};

export default TableForm;
