const router = require('express').Router();

const db = require('./db.js');


//get all posts
router.get('/', (req,res) => {
    db.find()
    .then(posts => {
        res.status(200).json(posts);
    })
    .catch(err => {
        res.status(500).json({ error: "The posts information could not be retrieved." })
    })
})

//get post by id
router.get('/:id', (req,res) => {
    db.findById(req.params.id)
    .then( post => {
        if (post === null || post === undefined || post === {}){
            res.status(404).json({ message: "The post with the specified ID does not exist." });
        } else {
            res.status(200).json(post);
        }
    })
    .catch(err => {
        res.status(500).json({ error: "The post information could not be retrieved." })
    })
})

//get all comments from post with specified id
router.get('/:id/comments', (req, res) => {
    db.findPostComments(req.params.id)
    .then( comments => {
        if(comments === null || comments === undefined || comments === {}){
            res.status(404).json({ message: "The post with the specified ID does not exist." })
        } else {
            res.status(200).json(comments)
        }
    })
    .catch(err => {
        res.status(500).json({ error: "The comments information could not be retrieved." })
    })
})

//post new blog post

router.post('/', async (req, res) => {
    await db.insert(req.body)
    .then( postID => {
        console.log(postID);
        
        if (req.body.title === undefined || req.body.contents === null || postID === undefined){
            res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
        } else {
            res.status(201).json(req.body)
        }
    })
    .catch(err => {
        res.status(500).json({ error: "There was an error while saving the post to the database" })
    })
    // console.log('line 53: ',db.findById(postID).then((post) => post))
})

//post comment to a blog post with specified id

router.post('/:id/comments', (req,res) => {
    db.insertComment(req.body)
    .then(commentID => {
        console.log(req.body);
        console.log(commentID)
        if(commentID === null || req.body.text === null || req.body.post_id === null){
            res.status(404).json({ message: "The post with the specified ID does not exist." })
        } else {
            res.status(201).json(req.body)
        }
    })
    .catch(err => {
        res.status(500).json({ message: "The post with the specified ID does not exist." })
    })
})

//put which updates a blog post with updated data

router.put('/:id', (req, res) => {
    db.update(req.params.id, req.body)
    .then( post => {
        console.log(post)
        if(req.params.id === undefined || req.params.id === null || post === null){
            res.status(404).json({ message: "The post with the specified ID does not exist." })
        } else if (req.body.title === undefined || req.body.contents === undefined){
            res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
        }  else {
            res.status(200).json(req.body)
        }
    })
    .catch(err => {
        res.status(500).json({ error: "The post information could not be modified." })
    })
})

//delete a blog post with specified id

router.delete('/:id', (req, res) => {
    db.remove(req.params.id)
    .then(post => {
        console.log(post)
        if(req.params.id === null || post === null){
            res.status(404).json({ message: "The post with the specified ID does not exist." })
        } else {
            res.status(200).json({message: `${post} posts were removed. Post ID ${req.params.id} was deleted`})
        }
    })
    .catch(err => {
        res.status(500).json({ error: "The post could not be removed" })
    }) 
})









module.exports = router;