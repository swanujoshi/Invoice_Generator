import React from "react";

const Table = ({ list, total, totalWithGst }) => {
  return (
    <>
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
              <td>{amount}</td>
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

export default Table;
