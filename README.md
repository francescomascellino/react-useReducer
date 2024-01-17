# Basics

## Initialize a new project
```bash
npm create vite@latest . -- --template react
```

## Components

### Import a component
```js
import Posts from './Posts'
```

### Render a component:
```js
{
    posts.map((post) => (

        <Posts
        key={post.id}
        avatar={post.author.image}
        // OTHER PROPS
    />

    ))
}
```
```js
{
    posts.filter((post) => post.likes > 80).map((post) => (

        <Posts
            key={post.id}
            avatar={post.author.image}
            author={post.author.name}
            // OTHER PROPS
        />

    ))
}
```

### Component *(Posts.jsx)*
```js
import './Posts.scss'

import { useState } from 'react'

function Posts({ prop1, prop2, ecc }) {

    // LOGIC

    return (
        <>

            /* MARRKUP */

        </>
    )
}

export default Posts
```

## useState Hook Basics

### Import the *useState* Hook
```js
import { useState } from 'react'
```

### Declare State values:
```js
// LIKED STATE (like IS FALSE BY DEFAULT)
const [like, setLike] = useState(false);

// +1/-1 LIKE STATE (liveValue TAKES THE likes PROP VALUE)
const [likeValue, manageLikeValue] = useState(likes);
```

### Manage the State values
```js
// WHEN THE LIKE BUTTON IS CLICKED...
// IF THE POST HAS NOT BEEN LIKED YET
const manageLike = (e) => {
    e.preventDefault();

    // CHANGES like FROM FALSE TO TRUE
    if (!like) {

        // CHANGES like FROM FALSE TO TRUE
        setLike((like) => !like);

        // INCREASES likeValue BY 1
        manageLikeValue((likeValue) => likeValue + 1);
    } else {
        // CHANGES like FROM FALSE TO TRUE
        setLike((like) => !like);

        // DECREASES likeValue BY 1
        manageLikeValue((likeValue) => likeValue - 1);
    }

}
```

### Recall the function to render the new values:
```js
<a className={`like-button  js-like-button border ${!like ? "" : "like-button--liked"}`} href="#" data-postid={id} onClick={manageLike}>
```

### Pass a function that alter the *State* as a prop
```js
const [posts, managePosts] = useState([
    {
        "id": 1,

        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",

        "media": "https://unsplash.it/600/300?image=171",

        "author": {
            "name": "Phil Mangione",
            "image": "https://unsplash.it/300/300?image=15"
        },

        "likes": 80,
        'likeClass': '',
        "created": "2021-06-25"
    },

    // ECC

]);
```
```js
const addPost = (post) => {
    managePosts([...posts, post]);
};
```
```js
<PostForm
    addPost={addPost}
    posts={posts}
/>
```

### Use the function passed as a prop to pass values to the component's parent
```js
const handleClick = () => {

    const post = {

        id: posts.length + 1,

        // ECC

    };

    addPost(post);

}
```
```js
<button onClick={handleClick}>Add Post</button>
```

## Use a form to add new cards

### Form
```js
// HANDLE THE SUBMIT EVENT WITH THE "handleSubmit" FUNCTION
<form action="" onSubmit={handleSubmit} className="bg-light rounded">

    {/* AUTHOR NAME FORM */}
    <div className="mb-3 p-3">
            <label htmlFor="" className="form-label">Author</label>
            <input
                type="text"
                name="author"
                id="author"
                className="form-control"
                placeholder="Rick Sanchez"
                aria-describedby="helpId"
                value={formPayload.author} // ADD A DEFAULT VALUE FOR THE FORM FIELDS
                onChange={handleInputChange} // DEFINE THE FORM VALUES ON CHANGE WITH A FUNCTION
            />
        <small id="helpId" className="text-muted">Enter your name</small>
    </div >

    // OTHER CODE

    {/* SUBMIT BUTTON */}
    <div className="text-center py-2">
        <button type="submit" className="btn btn-dark">Add Post</button>
    </div>

</form>
```

### Define default form values with a state that manages the form payload
```js
// FORM PAYLOAD STATE
const [formPayload, setFormPayload] = useState({
        author: "",
        avatarUrl: "",
        content: "",
        mediaUrl: "",
    });
```

### Assign new values at the input change
```js
const handleInputChange = (e) => {
        const { name, value } = e.target; // TAKES THE INPUT "name" AND "value" FROM THE EVENT TARGET (THE FORM FIELD)
        setFormPayload({
            ...formPayload,

            // EXAMPLE: author: "VALUE OF THE INPUT FIELD"
            [name]: value,

        })
    };
```

### Handle the submit event
```js
const handleSubmit = (e) => {

        // PREVENT THE PAGE FROM RELOADING
        e.preventDefault();

        const post = {

            id: posts.length + 1,

            // ASSIGN THE FORM PAYLOAD VALUES TO THE NEW POST VALUES
            content: formPayload.content,

            media: formPayload.mediaUrl,

            author: {
                "name": formPayload.author,
                "image": formPayload.avatarUrl
            },

            likes: Math.floor(Math.random() * 100),

            created: new Date(),

        };

        addPost(post);

        console.log(post);

    }
```

## useEffect basics

### Import the *useState* Hook
```js
import { useEffect, useState } from 'react'
```

### Define the "efffect"
```js
useEffect(() => {
    localStorage.setItem("count", count.toString()); // LOCAL STORAGE TEST
    document.title = `Count is ${count}`;
},
    // [] MEANS THE EFFECT WILL RUN ONCE AND NEVER AGAIN.
    // [count] MEANS THE EFFECT WILL RUN EVERY TIME count CHANGES.
    // WRITE NOTHING (EVENT THE BRACLETS) IF YOU WANT THAT THE EFFECT WILL RUN EVERY TIME THERE IS A CHANGE
    [count]
);
```

### Example of Http Request with useState at the loading of a component
```js
// DEFINE THE DATA STATE
const [data, setData] = useState(null);

// API CALL ON STATE CHANGE USING useEffect
useEffect(() => {

    // HTTP REQUEST WITH FETCH API
    fetch('https://jsonplaceholder.typicode.com/posts/1')
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
```