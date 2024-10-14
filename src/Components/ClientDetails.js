import React from "react";

const ClientDetails = ({ clientName, clientAddress }) => {
  return (
    <>
      <section className="mt-10">
        <h2 className="text-2xl uppercase font-bold mb-1">{clientName}</h2>
        <h2>{clientAddress}</h2>
      </section>
    </>
  );
};

export default ClientDetails;
