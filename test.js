


var APP_ID = 'rTq933HWXJLMEuTQhofMXh20-gzGzoHsz';
var APP_KEY = 'cuzcstRNw4qpv870DoXykSyM';

AV.init({
  appId: APP_ID,
  appKey: APP_KEY
});

var query = new AV.Query('Message')
query.find().then((message)=>{
  let array = message.map((item)=>item.attributes)
  array.forEach((item)=>{
   let li = document.createElement('li')
   li.innerText = item.words
   let messageList  =  document.querySelector('#messageList')
   messageList.appendChild(li)
  })
})

let myForm = document.querySelector('#postMessage')

myForm.addEventListener('submit',(e)=>{
  e.preventDefault()
  let content = myForm.querySelector('input[name=content]').value
  var Message = AV.Object.extend('Message');
  var message = new Message();
  message.save({
    words: `${content}`
  }).then(function(object) {
    myForm.querySelector('input[name=content]').value = ``
    console.log(object);
    let li = document.createElement('li')
    li.innerText = object.attributes.words
    let messageList  =  document.querySelector('#messageList')
    messageList.appendChild(li)
  })
})
