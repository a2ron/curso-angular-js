exports.render = function(req, res)
{
    req.user = {_id: '54cd3a2642b0435f05ed57dc',
        nombre: 'Admin',
        apellidos: '-',
        email: 'aarr90@gmail.com',
        username: 'aarr90',
        __v: 0};
    
    console.log(req.user);  
    res.render('index', {
        user: (req.user) ? req.user.nombre + " " + req.user.apellidos : null,
        title: 'Check My Money'
    });
};