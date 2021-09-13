import React from "react";
import { GetGuestList, VerifyDarkPair } from "../../script";
import SelectItems from "../selectItems";
import SquareButton from "../squareButton";

export default function DarkPairForm (props){
    const baseState = [["Select guest", -1], ...GetGuestList().map((x, y) => ([x[0], y]))];
    const [stateSelect, setStateSelect] = React.useState({"selectOne": baseState, "selectTwo": baseState});
    const [selected, setSelected] = React.useState({"selectedOne": "", "selectedTwo": ""});

    function removeDuplicate(...x){
        if(x[0] !== undefined){
            //format the array
            let array = [...GetGuestList().map((x, y) => ([x[0], y]))];
            if(x[0] !== "-1"){
                array.splice(parseInt(x[0]), 1);
            }
            array = [["Select guest", -1], ...array];
            
            //decide which select will get it
            if(x[1] === "one"){
                setStateSelect((state) => ({...state, "selectTwo": [...array]}));
                setSelected((state) => ({...state, "selectedOne": x[0].toString()}));
            }
            else{
                setStateSelect((state) => ({...state, "selectOne": [...array]}));
                setSelected((state) => ({...state, "selectedTwo": x[0].toString()}));
            }
        }
    }

    return(
        <>
            <SelectItems value={props.valueOne} content={stateSelect["selectOne"]} function={removeDuplicate} select={"one"} theme={props.theme}/>
            <SelectItems value={props.valueTwo} content={stateSelect["selectTwo"]} function={removeDuplicate} select={"two"} theme={props.theme}/>
            <a href="#" onClick={
                () => (stateSelect["selectOne"].length !== baseState.length && stateSelect["selectTwo"].length !== baseState.length) ?
                props.function(selected["selectedOne"], selected["selectedTwo"], props.id) :
                false
            }>
                <SquareButton button={(stateSelect["selectOne"].length !== baseState.length && stateSelect["selectTwo"].length !== baseState.length && VerifyDarkPair(stateSelect["selectOne"], stateSelect["selectTwo"]))}/>
            </a>
        </>
    );
}
