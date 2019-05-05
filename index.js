import express from 'express';
import todoController from './todosController/todos';

const ObjectId = require('mongodb').ObjectID;
const router = express.Router();

router.get('/',(req,res,next)=>{
    
    console.log(req.session.errors);
    res.render('index', {success:req.session.success,errors:req.session.errors});
    console.log('/')
    req.session.errors=false;    
    console.log(req.session.errors)
});
// router.get('/viewall',(req,res,next)=>{
//     res.render('viewdata');    
// });

// router.get('/update/:id',(req,res)=>{
    
//     mongo.connect(url,(err,db)=>{
//         db.collection('tododata').find({"_id":ObjectId(req.params.id)},function(err,res){
//             console.log(res);
//             res.render('update',{data:res});        
//         })
//     });


//     console.log(req.params);    
    
// });

router.get('/update/:id',todoController.getTodo);
router.get('/viewall', todoController.getAllTodos);
router.get('/api/v1/todos/:id', todoController.getTodo);
router.post('/api/v1/todos', todoController.createTodo);
router.post('/api/v1/todos/:id', todoController.updateTodo);
//todoController.deleteTodo
router.delete('/api/v1/todos/:id', todoController.deleteTodo);

export default router;