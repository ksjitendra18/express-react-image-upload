import React, { FormEvent, useRef, useState } from "react";

const App = () => {
  const [loading, setLoading] = useState(false);
  const imageRef = useRef<HTMLInputElement | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      const file = imageRef?.current?.files?.[0];

      if (!file) {
        return;
      }
      formData.append("image", file!);

      const res = await fetch("http://localhost:5000/register", {
        method: "POST",
        body: formData,
      });
      const resData = await res.json();

      console.log("resData", resData);
    } catch (error) {
      console.log("error while uploading");
    } finally {
      setLoading(false);
    }
  };
  return (
    <main>
      <h1 className="text-center my-5">Form</h1>
      <form
        className="mx-3 md:max-w-3xl md:mx-auto "
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <input
          className="px-20 block w-full py-20 rounded-md border-dashed border-2"
          ref={imageRef}
          type="file"
          accept="image/*"
        />

        <button className="bg-blue-600 mx-auto block w-fit my-5 text-white rounded-md px-7 py-2">
          {loading ? "Submitting" : "Submit"}
        </button>
      </form>
    </main>
  );
};

export default App;
