import { useState } from "react";
import { BiTrash, BiPlus } from "react-icons/bi";
import { v4 as uuidv4 } from "uuid";
import Roulette from "./Rulette";

const FormularioTexto = () => {
    const [inputList, setInputList] = useState([
        {
            id: uuidv4(),
            text: ""
        },
    ]);
    // handle input change
    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...inputList];
        list[index][name] = value;
        setInputList(list);
    };

    // handle click event of the Remove button
    const handleRemoveClick = (index) => {
        const list = [...inputList];
        list.splice(index, 1);
        setInputList(list);
    };

    // handle click event of the Add button
    const handleAddClick = () => {
        setInputList([...inputList, { text: "", id: uuidv4() }]);
    };

    const handleKeyPress = async (e) => {
        if(!e.keyCode) return;
        if (e.keyCode != 13) return;
        let newId = uuidv4();
        await setInputList([...inputList, { text: "", id: newId }]);
        let input = document.getElementById(newId);
        if (input) {
            input.focus();
        }
    }

    return (
        <div className="main-container">
            <div className="text-title">
                <h2>¡GíraloPe!</h2>
            </div>
            {/*  */}
            <div className="content">

                <Roulette data={inputList} />

                <div className="formContainer">
                    <div className="items">
                        <h3 className="cantidad">
                            Cantidad:<strong> {inputList.length}</strong>
                        </h3>
                        <ul
                            className="items"
                            style={{ listStyle: "none" }}
                        >
                            {inputList.map((x, index) => {
                                return (
                                    <li
                                        key={index}
                                        className="list-item"
                                    >
                                        <div className="item input-group">
                                            {/* <BiGridVertical /> */}
                                            <input
                                                id={x.id}
                                                name="text"
                                                placeholder="Escribe algo..."
                                                value={x.text}
                                                onChange={(e) => handleInputChange(e, index)}
                                                className="input"
                                                onKeyUpCapture={(e) => handleKeyPress(e)}
                                            />
                                            <div className="btn-box">
                                                {inputList.length !== 1 && (
                                                    <button
                                                        className="btnDelete"
                                                        onClick={() => handleRemoveClick(index)}
                                                    >
                                                        <BiTrash />
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                    <button
                        onClick={handleAddClick}
                        style={{ marginLeft: "2.1rem" }}
                        className="buttonAdd"
                    >
                        <BiPlus />
                    </button>
                </div>
            </div>

        </div>
    );
};

export default FormularioTexto;
