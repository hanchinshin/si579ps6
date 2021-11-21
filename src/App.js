//bootstrap is on the index.html file
import { useRef, useState } from 'react';
import OutputItem from './OutputItem';

//add "s"
function addS(num) {
    if (num === 1) {
        return "";
    } else {
        return "s";
    }
}

//func from PS5
function groupBy(objects, property) {
    // If property is not a function, convert it to a function that accepts one argument (an object) and returns that object's
    // value for property (obj[property])
    if(typeof property !== 'function') {
        const propName = property;
        property = (obj) => obj[propName];
    }

    const groupedObjects = new Map(); // Keys: group names, value: list of items in that group
    for(const object of objects) {
        const groupName = property(object);
        //Make sure that the group exists
        if(!groupedObjects.has(groupName)) {
            groupedObjects.set(groupName, []);
        }
        groupedObjects.get(groupName).push(object);
    }

    // Create an object with the results. Sort the keys so that they are in a sensible "order"
    const result = {};
    for(const key of Array.from(groupedObjects.keys()).sort()) {
        result[key] = groupedObjects.get(key);
    }
    return result;
}

//PS 6 func
function App() {
  const wordInput = useRef("");
  const [savedWords, setSavedWords] = useState([]);
  const [outDescription, setOutDescription] = useState("");
  const [wordOutput, setWordOutput] = useState("");
  const link = "https://api.datamuse.com/words?"

  //get rhymes
  async function getRhymes() {
    const result = await fetch(link + "rel_rhy=" + wordInput.current.value);
    const dict = await result.json();
    setOutDescription('Words that rhyme with ' + wordInput.current.value);
    if (dict.length===0) {
      setWordOutput("(no result)");
    } else {
        const elem = dict.map((word, i) => <OutputItem description={word.word} 
        onClickSaveWords={ () => saveWords(word.word) }/>)
        setWordOutput(elem);
    }
  }

  //get synonyms
  async function getSynonyms() {
    const result = await fetch(link + "ml=" + wordInput.current.value);
    const dict = await result.json();
    setOutDescription('Words with a similar meaning to ' + wordInput.current.value);
    if (dict.length===0) {
      setWordOutput("(no result)");
    } else {
        const elem = dict.map((word, i) => <OutputItem description={word.word} 
        onClickSaveWords={ () => saveWords(word.word) }/>)
        setWordOutput(elem);
    }
  }

  //concatenate func
  function saveWords(word){
      setSavedWords(prevWords => prevWords.concat(word));
  }

  //Enter
  function onKeydown(e) {
    if(e.key === "Enter" ) {
        getRhymes();
    }
}

  //html skeleton
  return (
      <div className="container">
        <h1 className="title">SI579 PS6 </h1>
        <p> link to GitHub: https://github.com/hanchinshin/si579ps6</p>
        <div className="row">
            <div className="col">
              Saved Words:<span>{savedWords ? savedWords.join(", "):""}</span>
            </div>
        </div>
        <div className="row">
            <div className="input-group col">
                <input ref={wordInput} onKeyDown={onKeydown} className="form-control" type="text" placeholder="Enter Word"/>
                <button type="button" className="btn btn-primary" onClick={ () => getRhymes() }>Show Rhyming Words</button>
                <button type="button" className="btn btn-secondary" onClick={ () => getSynonyms() }>Show Synonyms</button>
            </div>
        </div>
        <div className="row">
            <h2 className="col" id="output_description">{outDescription}</h2>
        </div>
        <div className="row output">
            <wordOutput className="col" id="word_output">{wordOutput}</wordOutput>
            {/*  */}
        </div>
    </div>
  );
}

export default App;