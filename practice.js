let todolist = [];
let donelist = [];
let undoArrayTodo = [];

function add(item){
	todolist.push(item);
}

function done(item){

	let index = -1;
	
  for(let i=0;i<todolist.length;i++){
  	if(todolist[i] === item){
    	index = i;
      undoArrayTodo.push(i);
      break;
    }
  }
  
  donelist.push(todolist[index]);
  //let tempIndex = donelist.length - 1;
  //undoArrayDone.push(tempIndex);
  
  todolist.splice(index, 1);
}


function undo(){
    let undoItem = donelist[done.length-1];
    //console.log("got item", undoItem);
  donelist.splice(donelist.length-1, 1);
  
  //undoArrayTodo.splice(undoItem, undoArrayTodo[undoArrayTodo.length-1], 0);
    let index = undoArrayTodo[undoArrayTodo.length-1];
    //console.log(index);
    //undoArrayTodo.splice(index, 0, undoItem);
    
  
    //undoArrayTodo.splice(undoArrayTodo.length-1, 1);
    todolist.splice(index, 0, undoItem);
    undoArrayTodo.splice(undoArrayTodo.length-1, 1);
}

add("a");
add("b");
add("c");
done("b");
undo();
console.log(todolist);