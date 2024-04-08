import { Todo } from "@prisma/client";

//! Funciones para interactuar con un backend que maneja operaciones CRUD (PUT, POST, GET, DELETE) => Está diseñada para trabajar con
//! una API Restful que maneje solicitudes HTTP
//? Lo que hace este helpers es invocar estas peticiones HTTP para usarlas como funciones invocables.


// Creamos función asíncrona que va a retornar una promesa con el tipado Todo 
// Le pasamos los valores que va a recibir que vamos a querer actualizar, en este caso queremos que el todo pase de completado a sin completar o viceversa
export const updateTodo = async(id:string, complete:boolean):Promise<Todo> => {
    // Esto será lo que queremos mandar a la petición PUT
    const body = {complete: complete}

    // Creamos peticion HTTP que llamamos del lado del cliente
    const todo = await fetch(`/api/todos/${id}`, { // => GET
        method: 'PUT',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json'
        },
      //! Revalidar cache con API Restful con =>  cache: ''
    }).then((res) => res.json());

    //console.log(todo)
    return todo;
}

export const createTodo = async(description:string):Promise<Todo> => {
    const body = {description: description}

    const todo = await fetch('/api/todos', {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((res) => res.json()) 
    return todo
}

export const deleteCompleted = async():Promise<Todo> => {

    const todo = await fetch('/api/todos', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((res) => res.json()) 
    return todo
}