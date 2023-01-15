const socket=io('http://localhost:8000');

const form=document.getElementById('send-container');
const messageinp=document.getElementById('messageinp');
const messagecontainer=document.querySelector('.container');
var audioEle = new Audio("ring.wav")

const append=(message,position)=>{
    const messageElement=document.createElement('div');
    messageElement.innerText=message;
    messageElement.classList.add('message');
    messageElement.classList.add(position)
    messagecontainer.append(messageElement);
    if(position=='left')
        audioEle.play();
}

const Name=prompt('Enter your name to join');

socket.emit('new-user-joined',Name);

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    let message = messageinp.value 
    append(`You: ${message}`,'right')
    socket.emit('send',message);
    messageinp.value=" ";
})

socket.on('user-joined',Name=>{                       // this "Name " comes from the server side it does not require to be exact spelling as upper name
    append(`${Name} joined the chat`,'center')
})

socket.on('receive',data=>{                       
    append(`${data.Name}: ${data.m_essage} `,'left')
})

socket.on('left',n_ame=>{
    append(`${n_ame}: leave the chat`,'center');
})
