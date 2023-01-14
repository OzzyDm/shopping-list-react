import { useContext, useEffect, useState, useRef } from "react";
import { ItemContext } from "../../App";
import styles from "./ItemCard.module.scss";
import { AiFillEdit, AiOutlineCheck, AiOutlineUndo } from "react-icons/ai";
import { BsFillTrashFill } from "react-icons/bs";
import "aos/dist/aos.css";
import Aos from "aos";

function ItemCard(props) {
  const listState = useContext(ItemContext);
  const [isEditing, setIsEditing] = useState(false);
  const text = useRef();

  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  const completeHandler = () => {
    listState.list.find((item) => item.id === props.id);
    const itemIndex = listState.list.findIndex((item) => item.id === props.id);
    listState.setList((previousState) => {
      previousState[itemIndex].completed = !previousState[itemIndex].completed;
      return [...previousState];
    });
  };

  const removeItemHandler = () => {
    listState.setList((previousState) => {
      return [...previousState.filter((item) => item.id !== props.id)];
    });
  };

  const editHandler = (e) => {
    console.log(e.target.textContent);
    listState.list.find((item) => item.id === props.id);
    const itemIndex = listState.list.findIndex((item) => item.id === props.id);
    listState.setList((previousState) => {
      previousState[itemIndex].text = e.target.textContent;
      return [...previousState];
    });
  };

  const onEditHandler = () => {
    setIsEditing(!isEditing);
    text.current.value.focus();
    console.log(text);
  };

  return (
    <li className={styles.card} data-aos="fade-down">
      <input
        onInput={editHandler}
        className={styles}
        value={props.text}
        disabled={!isEditing}
        ref={text}
      ></input>
      <div>
        <button className={styles.button} onClick={onEditHandler}>
          <AiFillEdit />
        </button>
        {!props.status && (
          <button onClick={completeHandler} className={styles.button}>
            <AiOutlineCheck />
          </button>
        )}
        {props.status && (
          <button onClick={completeHandler} className={styles.button}>
            <AiOutlineUndo />
          </button>
        )}
        <button onClick={removeItemHandler} className={styles.button}>
          <BsFillTrashFill />
        </button>
      </div>
    </li>
  );
}

export default ItemCard;
