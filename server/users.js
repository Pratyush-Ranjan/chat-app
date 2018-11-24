

class Users{
    constructor(){
        this.users=[];
        
    this.addUser=(id,name,room)=>{
        const user= {id, name, room};
        this.users.push(user);
        return user;
    }

    this.removeUser=(id)=>{
        const user= this.users.filter((user)=> user.id === id)[0];
        
        if(user){
            this.users= this.users.filter((user)=> user.id !== id);
        }
        return user;
    }

    this.getUser=(id)=>{
        const user= this.users.filter((user)=> user.id === id)[0];
        return user;
    }

    this.getUsersList=(room)=>{
        const users= this.users.filter((user)=>{
            return user.room===room;
        });
        const namesArray= users.map((user)=> user.name);
        return namesArray;
    }
  }
}

    

module.exports= {Users};

