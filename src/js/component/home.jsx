import React, {useState, useEffect} from "react";

const Home = () => {
    const [input, setInput] = useState("");
    const [todos, setTodos] = useState([]);
    const [todosEnServer, setTodosEnServer] = useState([])


    function handleInput(e) {
        setInput(e.target.value);
    };
    console.log(input)

    const handleClick = () => {
        if (input.length === 0) {
            alert("Debe ingresar un valor")
        } else {
            setTodos([...todos, {"label":input, "done":false}]);
			setInput("")
        }
    }
    console.log(todos);

    const clickBorrar = () => {
        setTodos([])
    }

    useEffect(() => {
        // crearUser() // Solo necesito esta funcion una vez     
    }, [])

//   useEffect(() => {
//     getTodos()
//   uptdateTodos()
//   },[todos])

  function crearUser(){
    fetch(`https://assets.breatheco.de/apis/fake/todos/user/tomasberni22`,
    {method: 'POST', 
    headers: {
        'Content-Type': 'application/json'},
    body: JSON.stringify([])
  })
    .then((response)=>response.json())
    .then((data)=>console.log(data))
}

    function getTodos(){
		fetch(``,
		{method: 'GET',
})
		.then((response)=>response.json())
		.then((data)=>setTodosEnServer(data))
        .then((data)=>console.log(data))
	}


    function uptdateTodos(){
		fetch(`https://assets.breatheco.de/apis/fake/todos/user/tomasberni22`,
		{method: 'PUT', 
		headers: {
			'Content-Type': 'application/json'},
		body: JSON.stringify(todos)
	  })
		.then((response)=>response.json())
		.then((data)=>console.log(todosEnServer))
	}

    function killTodos(){
		fetch(`https://assets.breatheco.de/apis/fake/todos/user/tomasberni22`,
		{method: 'DELETE', 
		headers: {
			'Content-Type': 'application/json'}
	  })
		.then((response)=>response.json())
		.then((data)=>console.log(data))
	}

    return (
        <div className="container">

            <div className="m-auto padding-top">
                <div className="p-4">
                    <h4 className="pb-3 text-light">ingrese su tarea</h4>
                    <div className="input-group mb-3">
                        <button onClick={handleClick}
                            className="btn btn-success"
                            type="button"
							style={{backgroundColor:"rgb(10, 19, 214)"}}
                            id="button-addon1">Ingresar Tarea</button>
                        <input onChange={handleInput}
                            type="text"
                            className="form-control"
                            placeholder=""
							value={input}
                            aria-label="Example text with button addon"
                            aria-describedby="button-addon1"/>
                    </div>
                    <div id="contenedorTodos" className="text-light">
                        {
                        todos.map((item, i) => (
                            <div className="row d-flex m-2"  style={{borderRadius:"30px",backgroundColor: "rgb(10, 19, 214)"}}>
                                <div className="col-6">
                                    <h5 className="m-2">{item}</h5>
                                </div>
                                <div className="col-6 text-end">
                                    <i className="fas fa-trash-alt align-items-end m-2 pt-1"
                                        onClick={
                                            () => setTodos(todos.filter((elementoDiv, currentIndex) => index != currentIndex))
                                    }></i>
                                </div>
                            </div>
                        ))
                    } </div>
                    <div id="contadorTodos">
                        <p className="text-light mt-3"> {
                            todos.length
                        }
</p>
                    </div>
                    <button onClick={clickBorrar}
                        className="btn btn-warning"
                        type="button"
                        id="button-addon1">Borrar Todo</button>
                </div>
            </div>
        </div>
    );
};

export default Home;
