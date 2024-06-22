import data from "./data";
import data2 from "./data2";
import { useState } from "react";

const App = () => {
    const dataBody = data.data;
    const { groupList, countList, titleList } = dataBody;
    const [selection, setSelection] = useState(titleList);
    let selects = [];
    let finalMessage = null;
    const onChange = (event) => {
        const groupIndex = event.target.id;
        const userSelection = event.target.value;
        let oldSelection = [...selection];
        oldSelection[groupIndex] = userSelection;
        setSelection(oldSelection);
    };
    for (let i = 0; i < groupList.length; i++) {
        let { title, options } = groupList[i];
        let optionTags = [
            <option key={-1} value={titleList[i]}>
                {titleList[i]}
            </option>
        ];
        for (let j = 0; j < options.length; j++) {
            let count = 0;
            for (let countListItem of countList) {
                if (countListItem.combination[i] === options[j]) {
                    count += countListItem.remainCount;
                }
            }
            if (count === 0) {
                optionTags.push(
                    <option key={j} value={options[j]} disabled>
                        {options[j] + " (품절)"}
                    </option>
                );
            } else if (i === groupList.length - 1) {
                optionTags.push(
                    <option key={j} value={options[j]}>
                        {options[j] + " (" + count + "개 구매 가능)"}
                    </option>
                );
            } else {
                optionTags.push(
                    <option key={j} value={options[j]}>
                        {options[j]}
                    </option>
                );
            }
        }
        let isSelectionTitle;
        if (i > 0 && selection[i - 1] === titleList[i - 1]) {
            isSelectionTitle = true;
        }
        selects.push(
            <p key={i}>
                <select
                    name={title}
                    id={i}
                    onChange={onChange}
                    disabled={isSelectionTitle}
                >
                    {optionTags}
                </select>
            </p>
        );
    }
    if (
        selection.every((item, index) => {
            return item !== titleList[index];
        })
    ) {
        finalMessage = <p>{selection.join("/")}</p>;
    }
    return (
        <div>
            {selects}
            {finalMessage}
        </div>
    );
};

export default App;
