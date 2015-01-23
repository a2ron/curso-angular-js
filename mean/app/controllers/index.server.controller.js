exports.render = function(req, res)
{
    console.log(req.user);
    res.render('index', {
        title: 'Sky Power',
        userFullName: req.user ? req.user.nombre + " " + req.user.apellidos : ''
    });
};