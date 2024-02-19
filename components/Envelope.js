// components/Envelope.js
const Envelope = ({ onClick }) => {
  return (
    <div
      className="mb-8 text-9xl cursor-pointer mr-8 flex justify-center items-center"
      onClick={onClick}
    >
      ✉️
    </div>
  );
};

export default Envelope;
