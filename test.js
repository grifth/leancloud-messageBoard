
!function(){
  let view = document.querySelector('#message')
  let model = {
    fetch(){
      var query = new AV.Query('Message')
      return  query.find()
    },
    save(content){
        var Message = AV.Object.extend('Message');
        var message = new Message();

        return  message.save({
          words: `${content}`
        })
    }
  }
  let controller = {
      view :null,
      messageList:null,
      model:null,
      myForm:null,
     init(view){
       this.view = view
       this.messageList  =  view.querySelector('#messageList')
       this.myForm = view.querySelector('#postMessage')
       this.initAv()
       this.fetchData()
       this.bindEvents()
     },
     initAv(){
       var APP_ID = 'rTq933HWXJLMEuTQhofMXh20-gzGzoHsz';
       var APP_KEY = 'cuzcstRNw4qpv870DoXykSyM';

       AV.init({
         appId: APP_ID,
         appKey: APP_KEY
       });
     },
     fetchData(){
       var query = new AV.Query('Message')
       model.fetch().then((message)=>{
         let array = message.map((item)=>item.attributes)
         array.forEach((item)=>{
          let li = document.createElement('li')
          li.innerText = item.words
          this.messageList.appendChild(li)
         })
       })
     },
     bindEvents(){
         this.myForm.addEventListener('submit',(e)=>{
         e.preventDefault()
             this.x()
       })
     },
     x(){
       let form = this.myForm
       let content = form.querySelector('input[name=content]').value
       var Message = AV.Object.extend('Message');
       var message = new Message();
       // message.save({
       //   words: `${content}`
       // })
       model.save(content).then(function(object) {
         form.querySelector('input[name=content]').value = ``
         let li = document.createElement('li')
         li.innerText = object.attributes.words
         let messageList  =  document.querySelector('#messageList')
         messageList.appendChild(li)
       })
     }
  }
  controller.init(view,model)
}.call()
