const multer = require('multer')
const { resolve, extname, basename } = require('path')

module.exports = {
  storage: multer.diskStorage({
    destination: resolve(__dirname, '..', '..', 'uploads'), //DESTINO PARA SALVAR
    filename: (req, file, cb) => { //NOME DO ARQUIVO (PADRÃO É UM CÓDIGO ALEATÓRIO)
      const ext = extname(file.originalname)
      const name = basename(file.originalname, ext)
      cb(null, `${name}-${Date.now()}${ext}`) //JUNTAR O NOME DO ARQUIVO COM A DATA ATUAL, E INDICAR A EXTENSÃO A PARTIR DO ARQUIVO ORIGINAL
    }
  })
}