import React from "react";

export default function Question({ question, onAnswer, selected, showResult }) {
  if (!question) {
    return null;
  }

  const getButtonClass = (option) => {
    if (!showResult) return "";
    if (option === selected && option === question.answer) return "selected correct";
    if (option === selected && option !== question.answer) return "selected incorrect";
    if (option === question.answer) return "correct";
    return "disabled-option";
  };

  return (
    <>
      {/* ✅ CAMBIO PRINCIPAL: 
        La bandera ahora está DENTRO del h2 junto con el texto.
        El antiguo <div className="flag-container"> se ha eliminado.
      */}
      <h2 className="country-question">
        {question.type === "flag" && question.flag && (
          <img
            src={question.flag}
            alt="Bandera"
            className="inline-flag" // Usaremos esta nueva clase para darle el estilo
          />
        )}
        <span>{question.question}</span>
      </h2>

      <div className="posible-answers">
        {question.options.map((opt, idx) => (
          <button
            key={idx}
            className={getButtonClass(opt)}
            onClick={() => onAnswer(opt)}
            disabled={showResult}
          >
            <span className="option-text">{opt}</span>
            <span className="feedback-icon">
            {/* Si la respuesta es correcta, siempre muestra el check ✔️ */}
            {showResult && opt === question.answer && '✔️'}
            
            {/* Si se seleccionó una respuesta y es incorrecta, muestra la X ✖️ */}
            {showResult && selected === opt && selected !== question.answer && '✖️'}
          </span>
                    </button>
        ))}
      </div>
    </>
  );
}