function indexnotas(req, res){
req.getConnection((err, conn) => {
conn.query('SELECT * FROM notas', (err, notas) => {
if (err){
   res.json(err);
}

res.render('notas/indexnotas', { notas });
});
});



}

function crear(req, res){

    res.render('notas/crear');
}

function store(req, res) {
    const data = req.body;

    req.getConnection((err, conn) => {
        conn.query('INSERT INTO notas SET ?', [data], (err, rows)=> {
           res.redirect('/notas');
        });
    });
}

function destroy(req, res) {
    const id = req.body.id;
    req.getConnection((err, conn) => {
        conn.query('DELETE FROM notas WHERE id = ?', [id], (err, rows) => {
res.redirect('/notas');
        });
    });
}

function edit(req, res) {
    const id = req.params.id;
    



    req.getConnection((err, conn) => {
conn.query('SELECT * FROM notas WHERE id = ?',[id], (err, notas) => {
if (err){
   res.json(err);
}
res.render('notas/edit', { notas });
});
});

}

function update(req, res){
const id = req.params.id;
const data = req.body;

req.getConnection((err, conn) => {
conn.query('UPDATE notas SET ? WHERE id = ?', [data, id], (err, rows) => {
res.redirect('/notas');
});
});

}

module.exports = {
    indexnotas: indexnotas,
    crear: crear,
    store: store,
    destroy: destroy,
    edit: edit,
    update: update,
}