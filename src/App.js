import data from "./data";
import data2 from "./data2";
import { useState } from "react";

const App = () => {
    const dataBody = data.data; // 데이터를 불러와요
    const { groupList, countList, titleList } = dataBody; // 그룹리스트, 카운트리스트, 타이틀리스트로 데이터를 나눠요
    const [selection, setSelection] = useState(titleList); // 선택 State
    let selects = [];
    let finalMessage = null; // 마지막에 삽입될 결과 문구예요
    const onChange = (event) => {
        // 드랍다운 선택 메뉴가 바뀌면
        const groupIndex = event.target.id;
        const userSelection = event.target.value; // 선택 항목을 가져와요
        let oldSelection = [...selection];
        oldSelection[groupIndex] = userSelection;
        setSelection(oldSelection); // 상태를 업데이트해요
    };
    for (let i = 0; i < groupList.length; i++) {
        let { title, options } = groupList[i];
        let optionTags = [
            <option key={-1} value={titleList[i]}>
                {titleList[i]}
            </option>
        ]; // 초기 옵션 태그를 만들어요
        for (let j = 0; j < options.length; j++) {
            let count = 0;
            for (let countListItem of countList) {
                if (countListItem.combination[i] === options[j]) {
                    // 콤비네이션과 옵션이 같을 때
                    count += countListItem.remainCount; // 물품의 수량을 가산해요
                }
            }
            if (count === 0) {
                // count가 0이면 품절이에요
                optionTags.push(
                    <option key={j} value={options[j]} disabled>
                        {options[j] + " (품절)"}
                    </option>
                );
            } else if (i === groupList.length - 1) {
                // 가장 마지막 그룹에는 수량을 표시해줘요
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
        let isSelectionTitle; // 선택값과 기본값이 같은지 확인해요
        if (i > 0 && selection[i - 1] === titleList[i - 1]) {
            // 바로 이전 단계의 그룹을 선택하지 않았다면
            isSelectionTitle = true;
        }
        selects.push(
            <p key={i}>
                <select
                    name={title}
                    id={i}
                    onChange={onChange}
                    disabled={isSelectionTitle}
                    value={selection[i]}
                >
                    {optionTags}
                </select>
            </p>
        );
    }
    if (
        selection.every((item, index) => {
            return item !== titleList[index];
        }) // 모든 선택값이 초기값과 다르다면, 즉, 사용자가 모두 선택을 했을 때는
    ) {
        finalMessage = <p>{selection.join("/")}</p>; // 최종 메시지를 삽입해요
    }
    return (
        <div>
            {selects}
            {finalMessage}
        </div>
    );
};

export default App;
