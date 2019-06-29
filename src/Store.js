import React from 'react'
import io from 'socket.io-client'

export const CTX = React.createContext();

const initialState = {
    general: [{from: 'john', msg: 'hello world'}, {from: 'bill', msg: 'hello world'}, {from: 'alex', msg: 'hello world !!!'}],
    topic2: [{from: 'jack', msg: 'hello eeeee '}, {from: 'max', msg: 'hello  eeeee !!!'}],
    topic3: [{from: 'jack', msg: 'hello'}, {from: 'max', msg: 'hello !!!'}],
}

function reducer(state, action) {
    const {from, msg, topic} = action.payload;
    switch (action.type) {
        case 'RECEIVE_MESSAGE':
            return {
                ...state,
                [topic]: [
                    ...state[topic],
                    {from, msg}
                ]
            }
        default: return state;
    }
}

// [action.payload.topic]: [
//     ...state[action.payload.topic],
//     {
//         from: action.paylaod.form,
//         msg: action.paylaod.msg
//     }
// ]

let socket;

function sendChatActions(value) {
    console.log(value)
    socket.emit('chat message', value)
}

export default function Store(props) {
    const [allChats, dispatch] = React.useReducer(reducer, initialState);

    const user = 'bill' + Math.random(1000).toFixed()

    if(!socket) {
        socket = io(':3001')
        socket.on('chat message', function(msg){
            console.log('Soket emit', msg)
            dispatch({type:'RECEIVE_MESSAGE',payload: msg})
        })
    }

    return (
        <CTX.Provider value={{allChats, sendChatActions, user}}>
            {props.children}
        </CTX.Provider>
    )
}
