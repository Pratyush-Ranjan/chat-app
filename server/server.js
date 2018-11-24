const path= require('path');
const express= require('express');
const socketIO= require('socket.io');
const http= require('http');
const moment= require ('moment');
const {Users}=require('./users'); 


const app= express();                                      //server side..(on cmd)
const port= process.env.PORT || 8000;


//defining path for public directory
const publicPath= path.join(__dirname, '../public');
app.use(express.static(publicPath));


//creating socket webserver
const server= http.createServer(app);
const io= socketIO(server);


const users= new Users();



io.on('connection',(socket)=> {
    console.log('New user connected');
                                                // when client is connected..it notifies server that new 
                                                // user is connected.(inside cmd)  
    let time= moment(); 
    time.add(330, 'minutes');
    
    
    socket.on('join', (params)=>{
        
        socket.join(params.room);
        users.removeUser(socket.id);
        users.addUser(socket.id, params.name, params.room);
        
        io.to(params.room).emit('updateUsersList', users.getUsersList(params.room));
            
        socket.emit('newMessage',{
        from:'Server',
        text:`Welcome to chat app, ${params.name}`,
        createdAt:moment(time).format('h:mm:ss a')
        }) 
        
        socket.broadcast.to(params.room).emit('newMessage',{
        from:'Server',
        text:`${params.name} joined group`,
        createdAt:moment(time).format('h:mm:ss a')
        })
    })
    
     
    socket.on('createMessage',(message)=> {
        let time= moment(); 
        time.add(330, 'minutes');
        const user= users.getUser(socket.id);
        
        console.log('createMessage', message);
        io.to(user.room).emit('newMessage',{
            from:message.from,
            text:message.text,
            createdAt:moment(time).format('h:mm:ss a')
        })     
    })
    
    
    socket.on('disconnect',()=> {

    const user= users.removeUser(socket.id);
    let time= moment(); 
    time.add(330, 'minutes');

        if(user){
            console.log(`${user.name} disconnected`);
            io.to(user.room).emit('updateUsersList', users.getUsersList(user.room));

            socket.broadcast.to(user.room).emit('newMessage', {
                from:'Server',
                text:`${user.name} left group.`,
                createdAt:moment(time).format('h:mm:ss a')    
                })
        }   
    })
                                                // when client is disconnected..it notifies server that
                                                // user is disconnected.(inside cmd)    
})

                                                

server.listen(port, ()=> {
    console.log(`local server is started at ${port}`);
})











    
    //     socket.on('createLocationMessage',(message)=>{
    //       let time= moment(); 
    //       time.add(330, 'minutes');
    //         
    //        io.emit('newLocationMessage',{
    //            from:'Admin',
    //            url:`https://www.google.com/maps?q=${message.latitude},${message.longitude}`,
    //            createdAt:moment(time).format('h:mm:ss a')
    //            
    //        })
    //    })
