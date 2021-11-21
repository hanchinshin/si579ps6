function OutputItem(parameter) {
    return(<ul>
            <li key={parameter.kv}>
                {parameter.description}<button className="btn btn-outline-success" onClick={parameter.onClickSaveWords}>save</button>
            </li>
            </ul>)
}

export default OutputItem;