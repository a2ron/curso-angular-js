exports.render = function(req, res)
{
    console.log(req.user);
    res.render('index', {
        title: 'Sky Power',
        user: JSON.stringify(req.user),
        nombre: req.user ? req.user["nombre"] : null
    });
};