import {useState} from 'react'

function NamePicker(props){
    const [showInput, setShowInput] = useState(false)
    const [username, setUsername] = useState(
        localStorage.getItem('username') || ''
    )

    function save(){
        props.saveName(username)
        setShowInput(false)
        localStorage.setItem('username',username)
    }
    
    function keyPressed(e){
        if(e.key==='Enter') {
            save()
        }
    }

    if (showInput) {
        return <div className="name-picker">
            <input value={username} className="input-user"
                onChange={e=> setUsername(e.target.value)}
                onKeyPress={keyPressed}
            />
            <button onClick={save} className="save-user">✓</button>
        </div>
    }

    return <div className="name-picker">
        <div>{username}</div>
        <button onClick={()=> setShowInput(true)} className="edit-user">✎</button>
    </div>
}

export default NamePicker