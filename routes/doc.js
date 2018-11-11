const express = require('express');
const router =  express.Router();

let Doc = require('../models/doc');

router.post('/add', (req, res) => {
    const query = {
        name: req.body.name
    }
    Doc.getDocs(query, (err, docs) => {
        if(err) {
            res.status(500).send({message: 'Error while getting docs.'});
            console.log(err)
        }
        if(docs.length > 0){
            res.status(405).send({message: 'Doc with given name already exists!'});
        } else {
            Doc.addDoc(req.body, (err, doc) => {
                if(err) {
                    res.status(500).send({message: 'Error while creating new doc.'});
                    console.log(err);
                }
                res.status(201).send({message: 'Doc created sucesfully!'});
            });
        }
    })
});

router.get('/:user_id/all', (req, res) => {
    const query = {
        user_id: req.params.user_id
    }
    Doc.getDocs(query, (err, docs) => {
        if(err) {
            res.status(500).send({message: 'Error while getting docs.'});
            console.log(err)
        }
        if (docs.length === 0) {
            res.send({message: 'There are not any documents for user with given id.'})
        } else{
            res.send(docs);
        }
    })
})

router.get('/:user_id/:doc_name', (req, res) => {
    const query = {
        user_id: req.params.user_id,
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

router.put('/:user_id/:doc_name', (req, res) => {
    const query = {
        user_id: req.params.user_id,
        name: req.params.doc_name
    }
    Doc.addContent(query, req.body, (err, doc) => {
        if(err){
            res.status(500).send({message: 'Error while getting doc.'});
            console.log(err);
        }
        res.send(({message: "Document updated sucesfully."}));
    });
})

router.delete('/:user_id/:doc_name', (req, res) => {
    const query = {
        user_id: req.params.user_id,
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
            });
        }
    })
    
})


module.exports = router;