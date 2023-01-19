import React, {useState, useEffect} from "react";

const Home = () => {
    const [input, setInput] = useState("");
    const [todos, setTodos] = useState([]);
    //const [todosEnServer, setTodosEnServer] = useState([])


    function handleInput(e) {
        setInput(e.target.value);
    };
    console.log(input)

    const handleClick = () => {
        if (input.length === 0) { //si la longitud del input=0
            alert("Debe ingresar un valor")
        } else {
            setTodos([...todos, {label:input, done:false}]);
			setInput("")
        }
    }
    console.log(todos);

    // const clickBorrar = () => {
    //     setTodos([])
    // }


    function crearUser(){
		fetch(`https://assets.breatheco.de/apis/fake/todos/user/tomasberni223`,
		{method: 'POST', 
		headers: {
			'Content-Type': 'application/json'},
		body: JSON.stringify([])
	  })
	}


    useEffect(() => {
        // crearUser() // Solo necesito esta funcion una vez 
        getTodos()    
    }, [])

   useEffect(() => {
    //getTodos()
 uptdateTodos()
 },[todos])

 

    function getTodos(){
		fetch(`https://assets.breatheco.de/apis/fake/todos/user/tomasberni223`,
		{method: 'GET',
})
		.then((response)=>response.json())
		.then((data)=>setTodos(data))
        .then((data)=>console.log(data))
	}


    function uptdateTodos(){
		fetch(`https://assets.breatheco.de/apis/fake/todos/user/tomasberni223`,
		{method: 'PUT', 
		headers: {
			'Content-Type': 'application/json'},
		body: JSON.stringify(todos)
	  })
		.then((response)=>response.json())
	    .then((response)=>console.log(response))
	}
    console.log(todos);

    function killTodos(){
		fetch(`https://assets.breatheco.de/apis/fake/todos/user/tomasberni223`,
		{method: 'DELETE', 
		headers: {
			'Content-Type': 'application/json'}
	  })
		.then((response)=>response.json())
		.then((data)=>console.log(data))

	}
    function eliminar(id){

        setTodos(todos.filter((item, index) => index != id))

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
                        todos.map((item, id) => (
                            <div className="row d-flex m-2"  style={{borderRadius:"30px",backgroundColor: "rgb(10, 19, 214)"}}>
                                <div className="col-6">
                                    <h5 className="m-2" key={id}>{item.label}</h5>
                                </div>
                                <div className="col-6 text-end">
                                    <i className="fas fa-trash-alt align-items-end m-2 pt-1"
                                        onClick={
                                            () => eliminar(id)
                                    }></i>
                                </div>
                            </div>
                        ))
                    } </div>
                    <div id="contadorTodos">
                        <p className="text- mt-3"> Quedan {
                            todos.length
                        } tareas
</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
