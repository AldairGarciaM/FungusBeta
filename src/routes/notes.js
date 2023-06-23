const express = require('express');
const router = express.Router();

const Note = require('../models/Notes');
const { isAuthenticated } = require('../helpers/navegacion');

router.get('/notes/add', isAuthenticated ,(req, res) =>{
    res.render('notes/newnotes');
});


//Guardar la informacion insertada
router.post('/notes/newnotes', isAuthenticated, async (req, res) => {
    const { tipo,
            cod, 
            title, 
            description, 
            materia,
            familia,
            des,
            origen,
            propiedades,
            formula,

            color,
            rgb,
            densidad,
            unidad,
            refraccion,
            solido,
            ph,
            lipico,

            modo,
            precauciones,
            conclusiones,}= req.body;
    const error = [];
    if(!title) {
        error.push({text: 'Inserte un titulo'});
    }
    if(!description) {
        error.push({text: 'Escribe una descripcion'});
    }
    if(error.length > 0){
        res.render('notes/newnotes', {
            error,
            tipo,
            cod,
            title,
            description,
            materia,
            familia,
            des,
            origen,
            propiedades,
            formula,

            color,
            rgb,
            densidad,
            unidad,
            refraccion,
            solido,
            ph,
            lipico,

            modo,
            precauciones,
            conclusiones,
        });
    }else{
        const newNotes = new Note({ tipo,
                                    cod,
                                    title, 
                                    description,
                                    materia,
                                    familia,
                                    des,
                                    origen,
                                    propiedades,
                                    formula,
                                
                                    color,
                                    rgb,
                                    densidad,
                                    unidad,
                                    refraccion,
                                    solido,
                                    ph,
                                    lipico,

                                    modo,
                                    precauciones,
                                    conclusiones,
                                });
        newNotes.user = req.user.id;
        await newNotes.save();
        req.flash('succes_msg', 'Se guardo un nuevo dato');
        res.redirect('/notes');
    }
});

//Ver cartas de datos
router.get('/notes', isAuthenticated , async (req, res) => {
    await Note.find({user: req.user.id}).sort({ date: 'desc'}).then(documentos => {
        const contexto = {
            notes: documentos.map(documento => {
            return {
                title: documento.title,
                description: documento.description,
                cod: documento.cod,
                tipo: documento.tipo,
                date: documento.date,
                _id: documento._id
            }
          })
        }
        res.render('notes/allnotes', {
            notes: contexto.notes }) 
      })
});

router.get('/notes/:tipo', isAuthenticated, async (req, res) =>{
    var hongo = {tipo: req.params.tipo};
    await Note.find( hongo,{tipo: "Hongo"}.then(dato => {
        const ver = {
            title: dato.title,
            description: dato.description,
            cod: dato.cod,
            tipo: dato.tipo,
            date: dato.date,
        }
        res.render('notes/allnotes', {note: ver});
    }))
});

//Ver los datos almacenados
router.get('/notes/view/:id', isAuthenticated ,async (req, res) => {
    await Note.findById(req.params.id).then(datos =>{
        console.log(datos);
        const mostrar = {
            tipo: datos.tipo,
            cod: datos.cod,
            title: datos.title,
            description: datos.description,
            materia: datos.materia,
            familia: datos.familia,
            des: datos.des,
            origen: datos.origen,
            propiedades: datos.propiedades,
            formula: datos.formula,

            color: datos.color,
            rgb: datos.rgb,
            densidad: datos.densidad,
            unidad: datos.unidad,
            refraccion: datos.refraccion,
            solido: datos.solido,
            ph: datos.ph,
            lipico: datos.lipico,

            modo: datos.modo,
            precauciones: datos.precauciones,
            conclusiones: datos.conclusiones,
        }
        res.render('notes/infonotes', {note: mostrar})
    })
});


//Dirigir a editar datos
router.get('/notes/edit/:id', isAuthenticated ,async (req, res) => {
    const note = await Note.findById(req.params.id).lean();
    res.render('notes/editnotes', {note});
});


//Editar datos
router.put('/notes/editnotes/:id', isAuthenticated ,async (req,res) => {
    const { tipo,
            cod,
            title, 
            description, 
            materia,
            familia,
            des,
            origen,
            propiedades,
            formula,

            color,
            rgb,
            densidad,
            unidad,
            refraccion,
            solido,
            ph,
            lipico,

            modo,
            precauciones,
            conclusiones,} = req.body;
    await Note.findByIdAndUpdate(req.params.id, {tipo,
                                                cod,
                                                title, 
                                                description, 
                                                materia,
                                                familia,
                                                des,
                                                origen,
                                                propiedades,
                                                formula,

                                                color,
                                                rgb,
                                                densidad,
                                                unidad,
                                                refraccion,
                                                solido,
                                                ph,
                                                lipico,

                                                modo,
                                                precauciones,
                                                conclusiones,}).lean();
    req.flash('succes_msg', 'Los datos se actualizaron correctamente')
    res.redirect('/notes');
});


//Eliminar carta de datos
router.delete('/notes/delete/:id', isAuthenticated ,async (req,res) => {
    await Note.findByIdAndDelete(req.params.id).lean();
    req.flash('succes_msg', 'Datos eliminados correctamente')
    res.redirect('/notes');
})

module.exports = router;