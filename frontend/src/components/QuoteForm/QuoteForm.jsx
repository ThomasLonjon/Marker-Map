function QuoteForm({ placeName, setPlaceName }) {
  const handleSubmit = (event) => event.preventDefault();

  const handleChange = (event) => {
    setPlaceName(event.target.value);
  };

  return (
    <form className="QuoteForm" onSubmit={handleSubmit}>
      <label htmlFor="character">Nom du lieu</label>
      <input id="name" name="character" type="text" value={placeName} onChange={handleChange} />
    </form>
  );
}

export default QuoteForm;
