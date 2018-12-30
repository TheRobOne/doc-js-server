const express = require('express');
const router =  express.Router();

let Doc = require('../models/doc');

//create new doc
router.post('/add', (req, res) => {
    const query = {
        name: req.body.name
    }
    Doc.getDocs((err, docs) => {
        if(err) {
            res.status(500).send({message: 'Error while getting docs.'});
            console.log(err)
        }
        if(docs.some(doc => doc.name === req.body.name)){
            res.status(405).send({message: 'Doc with given name already exists!'});
        } else {
            Doc.addDoc(req.body, (err, doc) => {
                if(err) {
                    res.status(500).send({message: 'Error while creating new doc.'});
                    console.log(err);
                }
                res.status(201).send({message: 'Doc created sucesfully!'});
                req.io.sockets.emit('new document delivered', req.body);
            });
        }
    })
});

//get all docs, from all authors
router.get('/all', (req, res) => {
    Doc.getDocs((err, docs) => {
        if(err) {
            res.status(500).send({message: 'Error while getting docs.'});
            console.log(err)
        }
        if (docs.length === 0) {
            res.send({message: 'There are not any documents in database.'})
        } else{
            res.send(docs);
        }
    })
})

//get one doc by name
router.get('/:doc_name', (req, res) => {
    const query = {
        name: req.params.doc_name
    }
    Doc.getOneDoc(query, (err, doc) => {
        if(err){
            res.status(500).send({message: 'Error while getting doc.'});
            console.log(err);
        } 
        if(doc === null){
            res.status(404).send({message: "Document with given name doesn't exists"});
        } else{
            res.send(doc);
        }
    })
});

//update doc content and locked using doc name
router.put('/:doc_name', (req, res) => {
    const query = {
        name: req.params.doc_name
    }
    Doc.addContent(query, req.body, (err, doc) => {
        if(err){
            res.status(500).send({message: 'Error while updating doc.'});
            console.log(err);
        }
        res.send(({message: "Document updated sucesfully."}));
        if(req.body.locked){
            req.io.sockets.emit('document locked', `Document ${query} locked.`);
        } else {
            req.io.sockets.emit('document updated', `Document ${query} updated.`);
        }
    });
})

//delete doc
router.delete('/:doc_name', (req, res) => {
    const query = {
        name: req.params.doc_name
    }
    Doc.getOneDoc(query, (err, doc) => {
        if(err){
            res.status(500).send({message: 'Error while getting doc.'});
            console.log(err);
        } 
        if(doc === null){
            res.status(404).send({message: "Document with given name doesn't exists"});
        } else{
            Doc.deleteDocument(query, (err, doc) => {
                if(err){
                    res.status(500).send({message: 'Error while deleting doc.'});
                    console.log(err);
                }
                res.send(({message: "Document deleted sucesfully."}));
                req.io.sockets.emit('document deleted', doc);
            });
        }
    })
    
})


module.exports = router;