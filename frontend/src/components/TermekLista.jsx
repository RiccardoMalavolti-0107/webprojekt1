import { useState, useEffect } from 'react';

import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8001',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default function TermekLista() {
  const [termekek, setTermekek] = useState([]);

  useEffect(() => {
    const fetchTermekek = async () => {
      try {
        const response = await api.get('/termekek');
        setTermekek(response.data);
      } catch (error) {
        console.error('Hiba a termékek lekérésekor:', error);
      }
    };

    fetchTermekek();
  }, []);

  return (
    <div>
      <h2>Termékek</h2>
      <ul>
        {
          termekek.map((termek) => (
            <li key={termek.id}>
              <h3>{termek.nev}</h3>
              <p>Ár: {termek.ar} Ft</p>
              <p>Készlet: {termek.keszlet}</p>
            </li>
          ))
        }
      </ul>
    </div>
  );
}