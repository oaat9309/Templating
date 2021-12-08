const express = require("express")
const app = express();
const path = require('path');
const redditData = require('./data.json')

app.use(express.static(path.join(__dirname, "public")))

app.set('view engine', 'ejs')
//path.join 뒤에 오는건 views 폴더의 절대 경로를 지정한 것으로, js 파일이 실행되는 디렉토리와 상관없이 잘 실해되도록 지정하는것
app.set('views', path.join(__dirname, "/views"))

app.get("/", (req, res) => {
    res.render("home")
})

app.get('/cats', (req, res) => {
    const cats = [
        'Blue', 'Rock', 'Cheese'
    ]
    res.render('cats', { cats })
})

app.get('/rand', (req, res) => {
    const num = Math.floor(Math.random()*10) + 1;
    res.render('random', { num, title: "random" })
})

app.get('/r/:subreddit', (req, res) => {
    const { subreddit } = req.params;
    const data = redditData[subreddit];
    if (data) {
        res.render('subreddit', { ...data })
    }
    else {
        res.render('notFound', {subreddit})
    }
    
})

app.listen(3000, () => {
    console.log("listening on port 3000")
})