import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../index.css";


function Quiz() {
  const [quizData, setQuizData] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!quizData.QUname || !quizData.animalLove) {
      console.log("Enter all the required fields");
    } else {
      navigate("/fgpass");
    }
    // if (){}
  };

  const handleChange = (e) => {
    setQuizData({ ...quizData, [e.target.name]: e.target.value.trim() });
    console.log(quizData);
  };

  return (
    <>
      <div className="card flex w-[440px] my-96 flex-col items-center justify-center text-center">
        <form
          id="qzC"
          className=" fixed w-1/2 bg-amber-50"
          onSubmit={handleSubmit}
        >
          <h1 className="text-3xl font-bold" id="qzH">
            Quiz
          </h1>
          <p className="qs text-2xl font-medium">What's your name?</p>
          <input type="text" name="QUname" id="quiz0" onChange={handleChange} />
          <p className="qs text-2xl font-medium">You love animals?</p>
          <div className="w-96 justify-around text-2xl font-medium" id="quiz1">
            <label htmlFor="animalLove">
              <input
                type="radio"
                name="animalLove"
                id="Yes"
                value="Yes"
                onClick={handleChange}
              />
              <span>Yes</span>
            </label>

            <label htmlFor="animalLove">
              <input
                type="radio"
                name="animalLove"
                id="No"
                value="No"
                onClick={handleChange}
              />
              <span>No</span>
            </label>
          </div>
          <button type="submit" id="qzBtn">
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export default Quiz;
