import db from '../db/db';
const mongo = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;
const url = 'mongodb://localhost:27017/todos';



class TodosController {
  getAllTodos(req,res){
    console.log('enter again');
    console.log()
    mongo.connect(url,(err,db)=>{
      var results=[];
      var data1=db.collection('tododata').find();
      data1.forEach(function(doc,err){
        results.push(doc);
      },function(){
        db.close();
        res.render('viewdata',{data:results});    
      });
    });
  }

  getTodo(req, res) {
    const id=parseInt(req.params.id);
      mongo.connect(url,(err,db)=>{
        db.collection('tododata').findOne({"_id":ObjectId(req.params.id)},function(err,response){
            console.log(response);
            res.render('update',{data:response});        
        })
      });
  }

  createTodo(req, res) {
    const todo = {
      title: req.body.title,
      description: req.body.description
  } 
    req.check('title','Please enter atleast 3 character').isLength({min:3});
    req.check('description','Please enter atleast 10 character').isLength({min:10});
    var errors=req.validationErrors();
    console.log(errors);
    if(errors){
      req.session.errors=errors;
      req.session.success=false;
      res.redirect('/');
      console.log('enter');
    }
    else{
      req.session.success=true;
      req.session.errors=false;
      console.log('enter1');
    
    mongo.connect(url,(err,db)=>{
      db.collection('tododata').insertOne(todo,(err,data)=>{
        console.log('item inserted');
        db.close();
        res.redirect('/');
      });
    });
  }
  }

  updateTodo(req, res) {   
    const todo = {
      title: req.body.title,
      description: req.body.description
  } 
    req.check('title','Please enter atleast 3 character').isLength({min:3});
    req.check('description','Please enter atleast 10 character').isLength({min:10});
    var errors=req.validationErrors();
    console.log(errors);
    if(errors){
      req.session.errors=errors;
      req.session.success=false;
      res.redirect('/update/:id');
    }
    else{
      req.session.success=true;
      req.session.errors=false;
      console.log('enter1');
    
    mongo.connect(url,(err,db)=>{
      db.collection('tododata').findOneAndUpdate({"_id":ObjectId(req.params.id)},todo,(err,data)=>{
        console.log('item inserted');
        db.close();
        res.redirect('/viewall');
      });
    });
  }
}









    // let todoFound;
    // let itemIndex;
    // db.map((todo,index)=>{
    //     if(todo.id == id){
    //         todoFound = todo;
    //       itemIndex = index;
    //     }

    //     if (!todoFound) {
    //         return res.status(404).send({
    //           success: 'false',
    //           message: 'todo not found',
    //         });
    //       }
        
    //       if (!req.body.title) {
    //         return res.status(400).send({
    //           success: 'false',
    //           message: 'title is required',
    //         });
    //       } else if (!req.body.description) {
    //         return res.status(400).send({
    //           success: 'false',
    //           message: 'description is required',
    //         });
    //       }

    //       const updatedTodo = {
    //         id: todoFound.id,
    //         title: req.body.title || todoFound.title,
    //         description: req.body.description || todoFound.description,
    //       };

    //       db.splice(itemIndex, 1, updatedTodo);

    //       return res.status(201).send({
    //         success: 'true',
    //         message: 'todo added successfully',
    //         updatedTodo,
    //       });

    




    
  


  deleteTodo(req, res) {
    debugger;
    console.log(req.params);
    const id=req.params.id;
    // db.map((data,index)=>{
    //     if(data.id == id){
    //         db.splice(index,1);
    //         return res.status(200).send({
    //             success: 'true',
    //             message: 'todo delete successfully'
    //         })      
    //     }
    // });
    console.log('start');
    // mongo.connect(url,(err,db)=>{
    //   db.collection('tododata').remove({"_id":id},(err,result)=>{
    //     console.log(err);
    //     console.log(result);
    //     db.close();
    //     res.send('done');
    //   });
    // });
    console.log(id);
    mongo.connect(url,(err,db)=>{
      db.collection('tododata').deleteOne({"_id":ObjectId(id)},(err,data)=>{
        console.log('item inserted');
        db.close();
        res.send({url:'/viewall'});
      });
    });

    // return res.status(404).send({
    //     success: 'false',
    //     message: 'todo not found',
    // });
  }

}

const todoController = new TodosController();
export default todoController;