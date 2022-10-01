import { useEffect, useState } from "react";
// import { Button } from "ui";

// turbo/no-undeclared-env-vars
const API_HOST = process.env.NEXT_PUBLIC_API_HOST || "http://localhost:3002";

export default function ApiPage() {
  const [name, setName] = useState("");
  const [response, setResponse] = useState(null);
  const [error, setError] = useState();

  useEffect(() => {
    setResponse(null);
    setError(undefined);
  }, [name]);

  const onChange = (e) =>
    setName(e.target.value);

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await fetch(`${API_HOST}/message/${name}`);
      const response = await result.json();
      setResponse(response);
    } catch (err) {
      console.error(err);
      setError("Unable to fetch response");
    }
  };

  const onReset = () => {
    setName("");
  };

  return (
    <div>
      <h1>Web</h1>
      <form onSubmit={onSubmit}>
        <label htmlFor="name">Name </label>
        <input
          type="text"
          name="name"
          id="name"
          value={name}
          onChange={onChange}
        ></input>
        <button type="submit">Submit</button>
      </form>
      {error && (
        <div>
          <h3>Error</h3>
          <p>{error}</p>
        </div>
      )}
      {response && (
        <div>
          <h3>Greeting</h3>
          <p>{response.message}</p>
          <button onClick={onReset}>Reset</button>
        </div>
      )}
    </div>
  );
}