import React, { useEffect, useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import socketio from 'socket.io-client'

import api from '../../services/api'
import './styles.css'

export default function Dash() {
   const [spots, setSpots] = useState([])
   const [request, setRequest] = useState([])

   const user_id = sessionStorage.getItem('user')
   //PARA CONECTAR COM O SOCKET
   const socket = useMemo(() => socketio('http://localhost:8888', {
      query: { user_id } //ENVIAR AO SOCKET QUEM ESTÁ LOGADO
   }), [user_id]) //SÓ FAREI A RECONEXÃO DO USUÁRIO CASO MUDE O USUÁRIO DO ID

   useEffect(() => {
      socket.on('booking_request', data => setRequest([...request, data]))
   }, [request, socket])

   useEffect(() => {
      async function loadSpots() {
         const userId = sessionStorage.getItem('user')
         const response = await api.get('/dashboard', {
            headers: { user_id: userId }
         })
         setSpots(response.data)
      }
      loadSpots()
   }, [])

   async function handleAccept(id) {
      await api.post(`/bookings/${id}/approvals`)
      setRequest(request.filter(res => res._id !== id))
   }

   async function handleReject(id) {
      await api.post(`/bookings/${id}/rejections`)
      setRequest(request.filter(res => res._id !== id))
   }

   return (
      <>
         <ul className="notifications">
            {request.map(res => (
               <li key={res._id}>
                  <p>
                     <strong>{res?.user?.email}</strong> está solicitando uma reserva em <strong>{res?.spot?.company}</strong> para a data: <strong>{res?.date}</strong>
                  </p>
                  <button className="accept" onClick={() => handleAccept(res._id)}>
                     ACEITAR
                  </button>
                  <button className="reject" onClick={() => handleReject(res._id)}>
                     REJEITAR
                  </button>
               </li>
            ))}
         </ul>
         <ul className="spot-list">
            {spots.map(res => (
               <li key={res._id}>
                  <header style={{ backgroundImage: `url(${res.thumbnail_url})` }} />
                  <strong>{res.company}</strong>
                  <span>{res.price ? `R$${res.price}/dia` : 'GRATUITO'}</span>
               </li>
            ))}
         </ul>
         <Link to="/new">
            <button type="button" className="btn">
               Cadastrar novo spot
            </button>
         </Link>
      </>
   )
}
