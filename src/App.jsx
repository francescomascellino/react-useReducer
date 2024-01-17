import { useEffect, useState } from 'react'

import './App.css'

import UserForm from './assets/components/UserForm'

function App() {
    const [count, setCount] = useState(0)

    // DEFINE THE DATA STATE
    const [data, setData] = useState([]);

    // API CALL ON STATE CHANGE USING useEffect
    useEffect(() => {

        // HTTP REQUEST WITH FETCH API
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then((response) => response.json())
            .then((data) => {

                // GIVES TO THE data State THE data RESPONSE VALUE
                setData(data);
                console.log(data);
            });
    },

        // RUNS THE EFFECT ONLY ONCE WHEN THE COMPONENT IS RENDERED
        []
    );

    // NOT USED YET
    /*     const [users, manageUsers] = useState([]);
    
        function addUser(user) {
            manageUsers([...users, user]);
        }; */

    return (
        <>

            <div className="container mb-3">
                <div className="row">
                    <div className="col">
                        <button onClick={() => setCount((count) => count + 1)}>
                            count is {count}
                        </button>
                    </div>
                </div>
            </div>

            <div className="container mb-3">
                <div className="row justify-content-center">

                    <div className="col">

                        <UserForm
                        // NOT USED YET
                        // addUser={addUser}
                        // users={users}
                        />

                    </div>

                </div>
            </div>

            <h1 className="text-light mb-3">Posts from API</h1>

            <div id="container" className="posts-list">

                {
                    data.map((ApiPost) => (
                        <div className='bg-light rounded p-2 my-3' key={ApiPost.id}>

                            <div>
                                <span>
                                    {ApiPost.userId}
                                </span>
                            </div>

                            <h4>Title: {ApiPost.title}
                            </h4>

                            <p>
                                {ApiPost.body}
                            </p>
                        </div>

                    ))
                }

            </div>

        </>
    )
}

export default App
