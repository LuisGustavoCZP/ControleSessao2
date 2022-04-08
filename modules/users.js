const users = [];

function indexOf (user) 
{
    for (let i = 0; i < users.length; i++)
    {
        const suser = users[i];
        if(suser.name == user.name && suser.pass == user.pass) return i;
    }
    return -1;
}

function create (user)
{
    const userid = users.length;
    users.push(user);
    return userid;
}

function login (req, res) 
{
    const token = req.cookies["token"];
    if(!token) 
    {
        let hasacc = true;
        console.log(req.body);
        const nuser = {name:req.body["usuario"], pass:req.body["password"]};
        let userID = indexOf(nuser);
        if(userID == -1) 
        {
            userID = create(nuser);
            hasacc = false;
        } //
        res.cookie('token', `${userID}`, { maxAge: 900000, httpOnly: true });
        const page = `<form action="" method="post"><input type="submit" value="Enviar"/></form>`;
        res.send(page);
    } 
    else
    {
        const user = users[token];
        if(!user) 
        {
            res.cookie('token', ``, { maxAge: 0, httpOnly: true });
            const page = `<h2>Falha no carregamento do token</h2>`;
            res.send(page);
        } 
        else 
        {
            const page = `<h2>Bem vindo ${user.name}</h2>`;
            res.send(page);
        }
        //console.log(token);
        
    }
}

function main (req, res) 
{
    res.sendFile(`${__dirname.replace("modules", "src")}/login.html`);
}

module.exports = {main, login, users};
