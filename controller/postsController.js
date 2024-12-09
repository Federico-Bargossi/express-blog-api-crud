const posts = require("../data");


const index = (req, res) => {
    const queryString = req.query;
    let postsDaInviare = posts;
    if(queryString.tags !== undefined){
        postsDaInviare = posts.filter((curePost) => curePost.tags.includes(queryString.tags));
    }
    const result = {
        posts: postsDaInviare,
        totale: postsDaInviare.length
    }
    res.json(result);
}

const show = (req, res) => {
    const bachecaId = parseInt(req.params.id);
    const curePost = posts.find((curePost) => bachecaId === curePost.id);
    if (curePost === undefined) {
        res.statusCode = 404;
        res.json({
            error: true,
            message: "Post non trovato",
        })
    } else {
        res.json(curePost);
    }
}

const create = (req,res) => {
    const newwPost = req.body;
    //calcolo il successivo id
    const lastPostIndex = posts.length - 1;
    const lastPost = posts[lastPostIndex];
    const nextIndex = lastPost.id + 1 ;
    newwPost.id = nextIndex;
    posts.push(newwPost);
    res.statusCode = 201
    res.json(newwPost)
}

const update = (req, res) => {
    const bachecaId = parseInt(req.params.id);
    const updatePost = req.body;
    console.log(updatePost);
    const indexYoUpdate = posts.findIndex((curePost) => curePost.id === bachecaId);
    if(indexYoUpdate === -1){
        res.statusCode = 404;
        res.json({
            error: true,
            message: "Post non trovato"
        })
    }else{
    console.log(indexYoUpdate);
    updatePost.id = indexYoUpdate + 1;
    posts[indexYoUpdate] = updatePost ;
    res.json(updatePost);
    }
}


const modify = (req, res) => {
    const bachecaId = req.params.id;
    res.json("Qui aggiorno alcuni dati di un post con id " + bachecaId);
}

const destroy = (req, res) => {
    const bachecaId = parseInt(req.params.id);
    const curePost = posts.findIndex((curePost) => bachecaId === curePost.id);
    if (curePost === -1) {
        res.statusCode = 404;
        res.json({
            error: true,
            message: "Post non trovato"
        });
    } else {
        posts.splice(curePost, 1);
        res.sendStatus(204);
        console.log(posts);
    }
}

module.exports = {
    index,
    show,
    create,
    update,
    modify,
    destroy
}