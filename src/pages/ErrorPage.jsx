import React from "react";

function ErrorPage() {
  const data = [
    {
      picture:
        "https://upload.wikimedia.org/wikipedia/commons/a/a5/Red_Kitten_01.jpg",
      message: "test",
    },
    { picture: "", message: "" },
    { picture: "", message: "" },
    { picture: "", message: "" },
    { picture: "", message: "" },
  ];

  const index = Math.floor(Math.random() * data.length);

  return (
    <>
      <div>
        <img src={data[index].picture} />
      </div>
      <div>
        <p>{data[index].message}</p>
      </div>
    </>
  );
}

export default ErrorPage;
