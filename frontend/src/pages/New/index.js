import React, { useState, useMemo } from 'react'
//useMemo É USADO PARA OBSERVAR O VALOR DE UMA VARIÁVEL, TODA VEZ QUE ELA ALTERAR, GERA UM NOVO VALOR

import api from '../../services/api'
import camera from '../../assets/camera.svg'
import './styles.css'

export default function New({ history }) {
   const [company, setCompany] = useState('')
   const [techs, setTechs] = useState('')
   const [price, setPrice] = useState('')
   const [thumbnail, setThumbnail] = useState(null)

   const preview = useMemo(() => { //RECEBE UMA FUNÇÃO E UM ARRAY PARA INDICAR QUANDO DEVE SER ALTERADO
      //SE EXISTIR ALGO NA VARIÁVEL, CHAMA A VARIÁVEL GLOBAL URL, CRIA UMA URL TEMPORÁRIA QUE NÃO FOI FEITA O UPLOAD, E PASSO A VARIÁVEL DE IMAGEM COMO PARÀMETRO
      return thumbnail ? URL.createObjectURL(thumbnail) : null
   }, [thumbnail])

   async function handleAdd(e) {
      e.preventDefault()
      const user_id = sessionStorage.getItem('user')
      const data = new FormData() //USAR POR CONTA DA REQUISIÇÃO NÃO SER EM JSON
      data.append('thumbnail', thumbnail) //ADICIONAR UMA INFORMAÇÃO NESTE OBJETO
      data.append('company', company) //ADICIONAR UMA INFORMAÇÃO NESTE OBJETO
      data.append('techs', techs) //ADICIONAR UMA INFORMAÇÃO NESTE OBJETO
      data.append('price', price) //ADICIONAR UMA INFORMAÇÃO NESTE OBJETO

      await api.post('/spots', data, { headers: { user_id } })

      history.push('/dashboard')
   }

   return (
      <form onSubmit={handleAdd}>
         <label id="thumbnail" style={{ backgroundImage: `url(${preview})` }} className={thumbnail ? 'has-thumbnail' : ''}>
            <input type="file" onChange={e => setThumbnail(e.target.files[0])} />
            <img src={camera} alt="Selecione a imagem" />
         </label>

         <label htmlFor="company">EMPRESA *</label>
         <input type="text" id="company" placeholder="Sua empresa incrível" value={company} onChange={e => setCompany(e.target.value)} />

         <label htmlFor="techs">TECNOLOGIAS * <span>(separadas por vírgula)</span></label>
         <input type="text" id="techs" placeholder="Quais tecnologias usam?" value={techs} onChange={e => setTechs(e.target.value)} />

         <label htmlFor="price">VALOR DA DIÁRIA * <span>(em branco para gratuito)</span></label>
         <input type="text" id="price" placeholder="Valor cobrado por dia" value={price} onChange={e => setPrice(e.target.value)} />

         <button className="btn" type="submit">
            Cadastrar
         </button>
      </form>
   )
}
