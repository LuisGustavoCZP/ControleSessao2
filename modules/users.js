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
        //console.log(token);
        const page = `<h2>Bem vindo ${users[token].name}</h2>`;
        res.send(page);
    }
}

function main (req, res) 
{
    res.sendFile(`${__dirname.replace("modules", "src")}/login.html`);
}

module.exports = {main, login, users};
