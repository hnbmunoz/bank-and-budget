import React,{ useState, useEffect } from "react";
import ExpenseForm from "./ExpenseForm";
import { GlowingButton } from "../../../../components/button"

const NewExpense = ({ getUserCode}) => {
  const [isEditing, setIsEditing] = useState(false);
  const saveExpenseData = () => {
    setIsEditing(false);
  };

  const startEditingHandler = () => {
    setIsEditing(true);

  };

  const stopEditingHandler = () => {
    setIsEditing(false);
  };


  useEffect(() => {
    let hideThisForm = document.querySelector('.hideThisCard')    
    if (isEditing) {
      hideThisForm.style.opacity = "0"
    } else {
      hideThisForm.style.opacity = "1"
    }

  },[isEditing])
  return (
    <div className="">
      <div className="modal-header">
        Expenses
      </div>     
      {isEditing && (
        <ExpenseForm
          getUserCode={getUserCode}
          onSubmit={saveExpenseData}
          onCancel={stopEditingHandler}
        />
      )}

      {!isEditing && (
        // <button onClick={startEditingHandler}>Add New Expense</button>
        <div className="flex-row" style={{justifyContent: "center"}}>
        <GlowingButton buttonClick={startEditingHandler} displayText="Add new Expense"/>
        </div>
      )}
    </div>
  );
};

export default NewExpense;
