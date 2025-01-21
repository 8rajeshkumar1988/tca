import { database, storedb } from "@/config/config";
import { onValue, query, ref } from "firebase/database";
import { addDoc, collection, getDocs, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";

const Trivia = () => {
      const [triviaState, setTriviaState] = useState("start");
      const [trivia_list, setTrivia_list] = useState([]);
      const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
      const [selectedAnswer, setSelectedAnswer] = useState(null);
      const [isAnswered, setIsAnswered] = useState(false);
      const [score, setScore] = useState({ correct: 0, incorrect: 0 });
      const [email, setEmail] = useState("");

       useEffect(() => {
          const user = getFromLocalStorage("user");
          if (user) {
            setEmail(user.email);
          }
        }, []);
        const getFromLocalStorage = (key) => {
            try {
              const jsonString = localStorage.getItem(key);
              return jsonString ? JSON.parse(jsonString) : null;
            } catch (error) {
              console.error("Error retrieving from localStorage:", error);
              return null;
            }
          };
          
  const handleOptionSelect = (option) => {
    setSelectedAnswer(option.text); // Set the selected option
  };

  const handleSubmitAnswer = () => {
    if (!selectedAnswer) return; // Do nothing if no option is selected
    setIsAnswered(true); // Mark as answered

    const currentQuestion = trivia_list[currentQuestionIndex];
    const isCorrect = selectedAnswer === currentQuestion.answer;

    setScore((prevScore) => ({
      correct: prevScore.correct + (isCorrect ? 1 : 0),
      incorrect: prevScore.incorrect + (!isCorrect ? 1 : 0),
    }));
  };

  const handleNextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    setSelectedAnswer(null); // Reset selected answer
    setIsAnswered(false); // Reset answered state
  };
  async function saveDataToFirestore(collectionName, data) {
    try {
      const collectionRef = collection(storedb, collectionName);

      const emailQuery = query(collectionRef, where("email", "==", data.email));
      const querySnapshot = await getDocs(emailQuery);

      if (!querySnapshot.empty) {
        return { success: false, message: "Email already exists" };
      }
      const docRef = await addDoc(collectionRef, data);
      return { success: true, id: docRef.id };
    } catch (e) {
      console.error("Error adding document: ", e);
      return { success: false, error: e.message };
    }
  }


  const handleQuizSubmit = () => {
    saveDataToFirestore("trivia_submissions", {
      email: email,
      correct_answers: score.correct,
      wrong_answers: score.incorrect,
      created_at: new Date().toISOString(),
    });
  };
  const currentQuestion = trivia_list[currentQuestionIndex];
  function clearUserAndReload() {
    localStorage.removeItem("user");
    window.location.href = window.location.origin + window.location.pathname;
}

useEffect(() => {
    if (!email) return;
    const fetchTriviaData = async () => {
      try {
        const emailQuery = query(
          collection(storedb, "trivia_submissions"),
          where("email", "==", email)
        );
        const querySnapshot = await getDocs(emailQuery);
        if (querySnapshot.empty) {
          const triviaRef = ref(database, "trivia");
          const unsubscribe = onValue(triviaRef, (snapshot) => {
            const triviaData = snapshot.val();
            if (triviaData) {
              const triviaArray = Object.entries(triviaData).map(
                ([key, value]) => ({
                  id: key,
                  ...value,
                })
              );
              setTrivia_list(triviaArray);
            }
          });

          return () => unsubscribe();
        } else {
          const submissions = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          console.log("Submissions:", submissions);
          setTriviaState("review");
          setScore({
            correct: submissions[0].correct_answers,
            incorrect: submissions[0].wrong_answers,
          });
        }
      } catch (error) {
        console.error("Error fetching trivia data:", error);
      }
    };

    fetchTriviaData();
  }, [email]);
  return (
    <section
      id="trivia"
      className="section 2xl:px-[10%] px-[5%] flex w-full justify-center relative z-20"
    >
      <img
        src="/small_ring.png"
        alt="ring around live video"
        className="lg:w-[400px] w-[50vw] lg:h-[400px] h-[50vw] absolute lg:right-[50px] right-[-25vw] lg:top-auto top-[-20vw] lg:bottom-[-100px] z-[-1] mix-blend-screen custom-spin iframe_right"
      />
      <div className="lg:aspect-[16/9] aspect-[9/16] scale-75 h-auto lg:w-[75%] w-full bg-black trivia_ani">
        <div className="absolute h-full w-full flex items-center justify-center overflow-hidden">
          <img
            src="/gold_ring_complete.png"
            alt="gold_ring"
            className={`golden_ring transition-all duration-200 mix-blend-screen custom-spin ${
              triviaState == "start" ? "start_active" : ""
            } ${triviaState == "question" ? "question_active" : ""} ${
              triviaState == "review" ? "review_active" : ""
            }`}
          />
          <img
            src="/stars.png"
            alt="img frame"
            className="h-full w-full object-cover iframe_right_c custom-spin-anti"
          />
        </div>
        <div
          className={`absolute left-0 top-0 h-full w-full flex items-center justify-center flex-col duration-300 ${
            triviaState == "start"
              ? "opacity-100"
              : "opacity-0 pointer-events-none"
          }`}
        >
          <h2 className="bigtext capitalize">trivia time</h2>
          <h3 className="smalltext capitalize">show what you know</h3>
          <button
            onClick={() => {
              setTriviaState("question");
            }}
            className="uppercase cursor-pointer flex gap-2  lg:mt-[5%] mt-5  2xl:!text-2xl lg:text-xl  text-base items-center bg-[#d9d9c4] text-[#000A32] rounded-3xl py-1 px-3 "
          >
            <img className="h-6 w-4" src="/play.svg" alt="img snap" />
            let's go
          </button>
        </div>
        <div
          className={`questions absolute left-0 top-0 h-full p-4 w-full  flex items-center justify-center gap-4 flex-col duration-300 ${
            triviaState == "question"
              ? "opacity-100"
              : "opacity-0 pointer-events-none"
          }`}
        >
          <h2 className="smalltext ques mt-[50px] text-center">
            {currentQuestion && currentQuestion.question}
          </h2>

          <div className="options grid lg:grid-cols-2 grid-cols-1 gap-1">
            {currentQuestion &&
              currentQuestion.options.map((option, index) => {
                const isSelected = selectedAnswer === option.text;
                const isCorrect = option.text === currentQuestion.answer;
                const buttonStyle =
                  isAnswered && isSelected
                    ? { backgroundColor: isCorrect ? "#376B2C" : "#8E2525" }
                    : isSelected
                    ? {
                        background:
                          "linear-gradient(90deg, #D9A47B 0%, #C5A753 50%, #E3C362 100%)",
                      }
                    : {};

                return (
                  <button
                    key={index}
                    onClick={() => handleOptionSelect(option)}
                    disabled={isAnswered} // Disable after submission
                    style={buttonStyle}
                    className="relative bg-[#0A1230] lg:text-[20px] text-base text-white rounded-3xl py-0.5 px-3 min-w-[250px] uppercase  !font-thin"
                  >
                    <img
                      src="/border.png"
                      alt="border"
                      className="absolute top-[-1px] left-[-1px] h-full w-full"
                    />
                    {option.text}
                  </button>
                );
              })}
          </div>
          <div className="navigation">
            {!isAnswered && (
              <button
                onClick={handleSubmitAnswer}
                disabled={!selectedAnswer} // Inactive if no option is selected
                style={{
                  cursor: !selectedAnswer ? "not-allowed" : "pointer",
                  opacity: !selectedAnswer ? 0.6 : 1,
                }}
                className="uppercase cursor-pointer flex gap-2 lg:text-[20px] text-base lg:mt-[6%] mt-3  items-center !bg-white !text-[#000A32] rounded-3xl py-1 px-3"
              >
                Submit
                <img src="/arrow.svg" alt="arrow icon" className="h-4 w-4" />
              </button>
            )}

            {isAnswered && currentQuestionIndex < trivia_list.length - 1 && (
              <button
                onClick={handleNextQuestion}
                className="uppercase cursor-pointer flex gap-2 lg:text-[20px] text-base lg:mt-[6%] mt-3  items-center !bg-white !text-[#000A32] rounded-3xl py-1 px-3"
              >
                Next{" "}
                <img src="/arrow.svg" alt="arrow icon" className="h-4 w-4" />
              </button>
            )}

            {isAnswered && currentQuestionIndex === trivia_list.length - 1 && (
              <button
                onClick={() => {
                  handleQuizSubmit();
                  setTriviaState("review");
                }}
                className="uppercase cursor-pointer flex gap-2 lg:text-[20px] text-base lg:mt-[6%] mt-3  items-center !bg-white !text-[#000A32] rounded-3xl py-1 px-3"
              >
                Finish{" "}
                <img src="/arrow.svg" alt="arrow icon" className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
        <div
          className={`review_answer absolute  left-0 top-0 h-full w-full flex flex-col items-center justify-center duration-300 ${
            triviaState == "review"
              ? "opacity-100"
              : "opacity-0 pointer-events-none"
          }`}
        >
          <div className="flex gap-2 items-baseline">
            <p className="review_answer_ text-[#d9d9c4]">{score.correct}</p>{" "}
            <p className="review_answer___ text-[#d9d9c4]">/</p>
            <p className="review_answer__ text-white">
              {trivia_list.length
                ? trivia_list.length
                : score.correct + score.incorrect}
            </p>
          </div>
          <p className="review_answer____">
            Total Questions <br />
            Answered Correctly
          </p>
        </div>
      </div>
    </section>
  );
};

export default Trivia;
