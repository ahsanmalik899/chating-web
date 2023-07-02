const socket = io.connect('http://localhost:3000')
const name = prompt('enter your name').toLocaleUpperCase();
const right =document.getElementById('right');
var adio = new Audio('AA.wav');
const messagebox =document.getElementById('messagebox');
const append=(message,cll)=>{
    const element= document.createElement('div');
    element.innerText=message;
    element.classList.add(cll);
    right.append(element);
    if (cll=='send'){

    }else{

    
 adio.play();
    }
 
}

socket.emit('joint',name);
socket.on('joint', name=> {
    append(`${name} joint the chat`,'join');
});

document.getElementById("form").addEventListener("submit", function(event){
    event.preventDefault();
    const message=messagebox.value;
    append(`you# ${message}`,'send');
    socket.emit('send',message);
    document.getElementById('messagebox').value='';
  });
  socket.on('resived', data=> {
    append(`${data.name}#   ${data.message}`,'recived');
});
socket.on('left', data=> {
    append(`${name} left the chat`,'join');
});
